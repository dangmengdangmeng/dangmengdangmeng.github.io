import React from 'react';
import { connect } from 'react-redux';
import { Event, SessionRoom, ROOM_ROLE, PUBLISH_STATE, BASE_WIDTH, BASE_NUMBER, ROOM_STATE } from '@global/roomConstants';
// import { YsGlobal } from '../../global/handleGlobal';
import Actions from '@global/actions';
import Signalling from '@global/services/SignallingService';
import { YsGlobal } from '@global/handleGlobal';
import StudentVideo from './StudentVideo';
import TeacherVideo from '../TeacherVideo/TeacherVideo';
import './studentVideoList.scss';

const headerHeight = 0.44;
const footerHeight = 0.44;
class StudentVideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeightCover: false,
      lines: 0,
    };
    this.videoListRef = React.createRef() || {};
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    Event.on('video-state-changed', this.videoStateChanged.bind(this), this.listernerBackupid);
    Event.on('user-leave', this.handleUserLeave, this.listernerBackupid);
    Event.on('user-properties-update', this.userPropertiesUpdate.bind(this), this.listernerBackupid); // 用户属性改变
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    Event.on('recv-del-msg', this.handlerDelmsg.bind(this), this.listernerBackupid);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate(prevProps) {
    const { studentStreamList, teacherId, focusVideoId, isVideoLayout, roomStatus } = this.props;
    if (
      isVideoLayout &&
      (prevProps.isVideoLayout !== isVideoLayout ||
        studentStreamList.length !== prevProps.studentStreamList.length ||
        teacherId !== prevProps.teacherId ||
        (focusVideoId && !prevProps.focusVideoId) ||
        (!focusVideoId && prevProps.focusVideoId))
    ) {
      this.handleWindowResize();
    }
    if (prevProps.roomStatus !== ROOM_STATE.CONNECTED && roomStatus === ROOM_STATE.CONNECTED) {
      this.initStreamList();
      this.handleWindowResize();
      const myself = SessionRoom.getMyself();
      const { isLiveRoom } = JSON.parse(this.props.roomInfo);
      if (!isLiveRoom && !this.props.isClassBegin && myself.role !== 0) {
        const addStreamInfo = { streamUserId: myself.id, videoFlag: true, audioFlag: false, publishstate: 3 };
        this.handleAddStream(addStreamInfo, myself.id);
      }
    }

    // const videolength = teacherId ? studentStreamList.length + 1 : studentStreamList.length;
    // const myself = SessionRoom.getMyself() || {};
    // if (focusVideoId === myself.id && videolength === 1) {
    //   this.exitFocusLayout();
    // }
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  // 接收到发布信令时的处理方法
  handlePubMsg(pubMsgData) {
    const { name } = pubMsgData;
    if (name === 'ClassBegin') {
      const list = JSON.parse(JSON.stringify(this.props.studentStreamList));
      const myself = SessionRoom.getMyself();
      Actions.setStudentStreamList(list.filter(item => item.streamUserId !== myself.id));
    }
    if (name === 'LiveAllNoAudio') {
      let list = JSON.parse(JSON.stringify(this.props.studentStreamList));
      list = list.map(item => {
        if (!this.isTeacher(item.streamUserId)) {
          const tmp = Object.assign(item, { audioFlag: false, publishstate: 2 });
          return tmp;
        }
        return item;
      });
      Actions.setStudentStreamList(list);
    }
  }

  handlerDelmsg(pubMsgData) {
    const { name } = pubMsgData;
    if (name === 'LiveAllNoAudio') {
      let list = JSON.parse(JSON.stringify(this.props.studentStreamList));
      list = list.map(item => {
        if (!this.isTeacher(item.streamUserId)) {
          const tmp = Object.assign(item, { audioFlag: true, publishstate: 2 });
          return tmp;
        }
        return item;
      });
      Actions.setStudentStreamList(list);
    }
  }

  isTeacher = userId => {
    const user = SessionRoom.getUser(userId);
    return user.role === ROOM_ROLE.TEACHER;
  };

  videoStateChanged = data => {
    const { userId, videoPublished, audioPublished, publishstate } = data;
    if (!this.isTeacher(userId)) {
      const addStreamInfo = { streamUserId: userId, videoFlag: videoPublished, audioFlag: audioPublished, publishstate };
      this.handleAddStream(addStreamInfo, userId);
    }
  };

  initStreamList = () => {
    const users = SessionRoom.getUsers();
    let studentStreamList = [];
    const list = JSON.parse(JSON.stringify(this.props.studentStreamList));
    for (const user of Object.values(users)) {
      if (user.role !== 0 && user.publishstate !== 0) {
        const addStreamInfo = { streamUserId: user.id, videoFlag: false, audioFlag: false, publishstate: user.publishstate };
        studentStreamList = [...list, ...studentStreamList, addStreamInfo];
      }
    }
    Actions.setStudentStreamList(studentStreamList);
  };

  handleAddStream(addStreamInfo, userId) {
    let list = JSON.parse(JSON.stringify(this.props.studentStreamList));
    const hasStream = list.find(item => item.streamUserId === userId);
    if (hasStream) {
      Object.assign(hasStream, addStreamInfo);
    } else {
      list = [...list, addStreamInfo];
    }
    list = list.filter(item => item.publishstate !== PUBLISH_STATE.NONE);
    Actions.setStudentStreamList(list);
  }

  /* 处理用户属性改变 */
  userPropertiesUpdate = data => {
    const { properties, id } = data;
    const user = SessionRoom.getUser(id);
    if (user.role !== 0) {
      for (const [key, value] of Object.entries(properties)) {
        switch (key) {
          case 'publishstate': {
            let list = JSON.parse(JSON.stringify(this.props.studentStreamList));
            if (value === 0) {
              const myself = SessionRoom.getMyself();
              Actions.setStudentStreamList(list.filter(item => item.streamUserId !== id));
              if (this.props.focusVideoId === id && myself.publishstate !== 0) {
                this.exitFocusLayout();
              }
              if (id === myself.id) {
                Actions.setDoubleVideoId('');
                Signalling.sendSignallingDoubleClickVideo({}, undefined, true);
              }
            } else {
              const hasStream = list.find(item => item.streamUserId === id);
              if (!hasStream) {
                const addStreamInfo = { streamUserId: id, videoFlag: false, audioFlag: false, publishstate: value };
                list = [...list, addStreamInfo];
                Actions.setStudentStreamList(list);
              }
            }
            break;
          }
          default:
            break;
        }
      }
    }
  };

  handleUserLeave = handleData => {
    const { user } = handleData;
    const myself = SessionRoom.getMyself();
    const list = JSON.parse(JSON.stringify(this.props.studentStreamList));
    Actions.setStudentStreamList(list.filter(item => item.streamUserId !== user.id));
    if (this.props.focusVideoId === user.id && myself.publishstate !== 0) {
      this.exitFocusLayout();
    }
    if (this.props.doubleVideoId === user.id) {
      Actions.setDoubleVideoId('');
    }
    Actions.exchangeOne2oneVideoLayout(false);
  };

  createVideo = () => {
    const { videoDragInfo, studentStreamList, onetoone } = this.props;
    const newStudentStreamList = studentStreamList.sort((a, b) => {
      return a.streamUserId.localeCompare(b.streamUserId);
    });
    return newStudentStreamList.map((streamInfo, index) => {
      return (
        <StudentVideo
          key={streamInfo.streamUserId}
          streamInfo={streamInfo}
          videoDragInfo={videoDragInfo}
          onetoone={onetoone}
          orderIndex={index + 2}
          total={newStudentStreamList.length + 1}
        />
      );
    });
  };

  setVideoNum = () => {
    const { studentStreamList, teacherId } = this.props;
    return teacherId ? `video-width-${studentStreamList.length + 1}` : `video-width-${studentStreamList.length}`;
  };

  handleWindowResize = () => {
    const { focusVideoId, isVideoLayout } = this.props;
    if (!isVideoLayout) {
      return;
    }
    if (focusVideoId) {
      this.handleFocusLayout();
      return;
    }
    this.handleVideoLayout();
  };

  handleVideoLayout() {
    const { studentStreamList, teacherId } = this.props;
    const { videowidth, videoheight } = JSON.parse(this.props.roomInfo);
    let videoScale = Number(videowidth) / Number(videoheight);
    // 视频区宽高 = 页面宽高 - padding
    const videoWidth = YsGlobal.isMobile ? window.innerWidth : window.innerWidth - (1.16 * 2 * window.innerWidth * 100) / 1920;
    const videoHeight = YsGlobal.isMobile ? window.innerHeight : window.innerHeight - ((headerHeight + footerHeight) * window.innerWidth * 100) / 1920;
    const layoutVideolength = teacherId ? studentStreamList.length + 1 : studentStreamList.length;
    if (layoutVideolength === 5 || layoutVideolength === 6) {
      videoScale = (videoScale * 3) / 2;
    } else if (layoutVideolength === 7 || layoutVideolength === 8) {
      videoScale = (videoScale * 4) / 2;
    } else if (layoutVideolength >= 10 && layoutVideolength <= 12) {
      videoScale = (videoScale * 4) / 3;
    } else if (layoutVideolength >= 13 && layoutVideolength <= 15) {
      videoScale = (videoScale * 5) / 3;
    } else if (layoutVideolength > 15) {
      videoScale = (videoScale * 6) / 3;
    }
    if (videoWidth / videoHeight > videoScale) {
      this.setState({ isHeightCover: true });
    } else {
      this.setState({ isHeightCover: false });
    }
  }

  handleFocusLayout() {
    const { studentStreamList, teacherId } = this.props;
    const { videowidth, videoheight } = JSON.parse(this.props.roomInfo);
    const videoScale = Number(videowidth) / Number(videoheight);
    const rightVideolength = teacherId ? studentStreamList.length : studentStreamList.length - 1;
    const defalutFontSize = (window.innerWidth / BASE_WIDTH) * BASE_NUMBER;
    const videoListNode = this.videoListRef.current ? this.videoListRef.current : {};
    const videoListHeight = videoListNode.clientHeight;
    // 一列视频总高度 = （一个视频高度 + 一个视频底部margin）* 视频个数 - 一个底部margin
    const oneLineVideoH = (((4.25 - 0.12) / videoScale + 0.03) * rightVideolength - 0.03) * defalutFontSize;
    this.setState({ lines: Math.ceil(rightVideolength / 6) });
    if (oneLineVideoH > videoListHeight) {
      this.setState({ isHeightCover: false });
    } else {
      this.setState({ isHeightCover: false });
    }
  }

  exitFocusLayout() {
    Actions.setFocusVideoId('');
    const data = { roomLayout: 'videoLayout' };
    Signalling.sendSignallingSetRoomLayout(data, false);
  }

  toggleFoldVideo() {
    Actions.exchangeOne2oneVideoLayout(this.props.isExchangeOne2oneLayout, !this.props.isFoldedOne2oneLayout);
  }

  hasTeacherVideo() {
    const { isVideoLayout, isFullScreen, isClassBegin, teacherId } = this.props;
    const myself = SessionRoom.getMyself() || {};
    const { maxVideo, isLiveRoom } = JSON.parse(this.props.roomInfo);
    return (
      ((!isClassBegin && (teacherId === myself.id || isLiveRoom)) || (isClassBegin && teacherId)) &&
      !YsGlobal.isMobile &&
      (maxVideo > 2 || (maxVideo === 2 && isVideoLayout) || isLiveRoom) &&
      !isFullScreen
    );
  }

  render() {
    const { isHeightCover, lines } = this.state;
    const { isVideoLayout, focusVideoId, teacherId, studentStreamList, onetoone, isExchangeOne2oneLayout, isFoldedOne2oneLayout } = this.props;
    const { maxVideo, videowidth, videoheight, isLiveRoom } = JSON.parse(this.props.roomInfo);
    const scale = Number(videowidth) / Number(videoheight);
    const scaleClassName = Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? 'four-to-three' : 'sixteen-to-nine';
    const isTopRightPosition = onetoone === 'nested' && !isVideoLayout && !isExchangeOne2oneLayout;
    const focusVideoName = focusVideoId && focusVideoId === teacherId ? `focus-video` : '';
    return (
      <div
        id="student-video-list"
        className={[
          'student-video-list',
          !isVideoLayout && !focusVideoId && studentStreamList.length > 6 ? 'two-rows' : '',
          focusVideoId && lines ? `lines-${lines}` : '',
          isVideoLayout ? 'video-Layout-box' : '',
          focusVideoId ? 'focus-Layout-box' : '',
          this.setVideoNum(),
          isHeightCover ? 'height-cover' : '',
          isTopRightPosition ? 'topright' : '',
          isTopRightPosition && isFoldedOne2oneLayout ? 'topright-folded' : '',
          !isVideoLayout && !focusVideoId && !isLiveRoom && studentStreamList.length === 0 && maxVideo === 2 ? 'occupation-sidebar' : '',
          !isVideoLayout && !focusVideoId && this.props.isClassBegin ? 'class-occupation-sidebar' : '',
          scaleClassName,
        ]
          .filter(cls => !!cls)
          .join(' ')}
        ref={this.videoListRef}
      >
        {/* {直播占位图} */}
        {this.hasTeacherVideo() && (
          <div className={`teacher-video video-Layout ${focusVideoName}`}>
            <TeacherVideo isTeacher />
          </div>
        )}
        {this.createVideo()}
        {onetoone === 'nested' && !isExchangeOne2oneLayout && !isVideoLayout && (
          <div className={`foldedvideoBtn-box ${isFoldedOne2oneLayout ? 'folded' : 'unfold'}`}>
            <span className={`flodedvideoBtn ${isFoldedOne2oneLayout ? 'folded' : 'unfold'}`} onClick={this.toggleFoldVideo.bind(this)}></span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isClassBegin: state.classroom.isClassBegin,
  roomStatus: state.classroom.roomStatus,
  isVideoLayout: state.classroom.isVideoLayout,
  videoDragInfo: state.video.videoDragInfo,
  focusVideoId: state.video.focusVideoId,
  studentStreamList: state.video.studentStreamList,
  isExchangeOne2oneLayout: state.classroom.isExchangeOne2oneLayout,
  isFoldedOne2oneLayout: state.classroom.isFoldedOne2oneLayout,
  teacherId: state.user.teacherId,
  doubleVideoId: state.video.doubleVideoId,
  isFullScreen: state.whiteboard.isFullScreen,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StudentVideoList);
