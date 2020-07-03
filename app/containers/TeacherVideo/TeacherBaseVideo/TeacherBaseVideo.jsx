import React from 'react';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom, Event, ROOM_ROLE, ROOM_STATE } from '@global/roomConstants';
import VideoComponenter from '../../../components/video/VideoComponenter';
import AudioComponenter from '../../../components/video/AudioComponenter';
import VideoBackGround from '../../../components/video/VideoBackGround/VideoBackGround';
import VideoVolumeInfo from '../../../components/video/videoVolumeInfo/VideoVolumeInfo';
import NoMic from '../../../components/video/NoMic/NoMic';
import NoVideo from '../../../components/video/NoVideo/NoVideo';
import ScrollBanner from '../../../components/video/ScrollBanner/ScrollBanner';
import VideoUserPen from '../../../components/video/VideoUserPen/VideoUserPen';
import AudioPlayError from '../../../components/video/AudioPlayError/AudioPlayError';

class TeacherBaseVideo extends React.Component {
  constructor(props) {
    super(props);
    const { afail, hasaudio: hasAudio } = SessionRoom.getUser(props.teacherId) || {};
    this.state = {
      afail,
      hasaudio: hasAudio !== undefined ? hasAudio : true,
      compelVideoMirror: this.props.isVideoMirror,
    };
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    Event.on('video-state-changed', this.videoStateChanged.bind(this), this.listernerBackupid);
    Event.on('user-properties-update', this.userPropertiesUpdate.bind(this), this.listernerBackupid); // 用户属性改变
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
  }

  componentDidUpdate(prevProps) {
    const { teacherId, roomStatus } = this.props;
    if (prevProps.teacherId !== teacherId && teacherId) {
      const { afail, hasaudio: hasAudio } = SessionRoom.getUser(this.props.teacherId) || {};
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        afail,
        hasaudio: hasAudio !== undefined ? hasAudio : true,
      });
    }
    if (prevProps.roomStatus !== ROOM_STATE.CONNECTED && roomStatus === ROOM_STATE.CONNECTED) {
      this.initTeacherStream();
      this.initState();
    }
  }

  initState() {
    const { teacherUserStream } = this.props;
    const mySelfInfo = SessionRoom.getMyself() || {};
    let userStream = JSON.parse(JSON.stringify(teacherUserStream));
    if (mySelfInfo.role === ROOM_ROLE.TEACHER && !this.props.isClassBegin) {
      let _publishstate = 0;
      if (mySelfInfo.hasvideo) {
        _publishstate = mySelfInfo.hasaudio ? 3 : 2;
      } else {
        _publishstate = mySelfInfo.hasaudio ? 1 : 4;
      }
      userStream = { streamUserId: mySelfInfo.id, videoFlag: mySelfInfo.hasvideo, publishstate: _publishstate };
    }
    Actions.setTeacherUserStream(userStream);
  }

  isTeacher = userId => {
    const user = SessionRoom.getUser(userId);
    return user.role === ROOM_ROLE.TEACHER;
  };

  videoStateChanged = data => {
    const { userId, videoPublished, audioPublished, publishstate } = data;
    const { teacherUserStream, getPublishstate } = this.props;
    if (this.isTeacher(userId)) {
      const userStream = Object.assign({}, teacherUserStream, { streamUserId: userId, videoFlag: videoPublished, audioFlag: audioPublished, publishstate });
      Actions.setTeacherUserStream(userStream);
      if (getPublishstate && typeof getPublishstate === 'function') {
        getPublishstate(publishstate);
      }
    }
  };

  initTeacherStream = () => {
    const { teacherId, teacherUserStream } = this.props;
    if (!teacherId) {
      return;
    }
    const user = SessionRoom.getUsers(teacherId);
    if (user.publishstate !== 0 && !Object.keys(teacherUserStream).length) {
      const userStream = Object.assign({}, teacherUserStream, { streamUserId: user.id, videoConfig: false, audioFlag: false, publishstate: 4 });
      Actions.setTeacherUserStream(userStream);
    }
  };

  /* 处理用户属性改变 */
  userPropertiesUpdate = data => {
    const { properties, id } = data;
    const user = SessionRoom.getUser(id);
    if (user.role === ROOM_ROLE.TEACHER) {
      for (const [key, value] of Object.entries(properties)) {
        switch (key) {
          case 'hasvideo': {
            this.initState();
            break;
          }
          case 'afail': {
            this.setState({
              afail: value,
            });
            break;
          }
          case 'hasaudio': {
            this.setState({
              hasaudio: value,
            });
            break;
          }
          case 'publishstate': {
            const { teacherUserStream } = this.props;
            if (value !== 0 && !Object.keys(teacherUserStream).length) {
              const userStream = Object.assign({}, teacherUserStream, { streamUserId: user.id, videoConfig: false, audioFlag: false, publishstate: value });
              Actions.setTeacherUserStream(userStream);
            }
            break;
          }
          case 'isVideoMirror': {
            this.setState({
              compelVideoMirror: value,
            });
            break;
          }
          default:
            break;
        }
      }
    }
  };

  showNoMic(_hasaudio, _afail) {
    if (!_hasaudio) {
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      // 安卓的情况，hasaudio是true,就不用了考虑了
      if (_afail === undefined) {
        return false;
      }
      return !!_afail;
    }
  }

  hasStreamUserId(_isClassBegin, _id, _teacherId) {
    // 如果自己是老师，始终显示 Novideo
    if (_id === _teacherId) {
      return true;
    }
    // 如果不是老师，上课后才显示
    if (_isClassBegin) {
      return true;
    }
    return false;
  }

  render() {
    const { afail, hasaudio, compelVideoMirror } = this.state;
    const { isClassBegin, focusVideoId, isVideoMirror, teacherUserStream: userStream, pageOrientation, teacherId, roomInfo } = this.props;
    const { isLiveRoom, doorChain } = JSON.parse(roomInfo);
    const mySelfInfo = SessionRoom.getMyself() || {};
    const isfocusVideo = focusVideoId && focusVideoId === teacherId;
    const videoFit = pageOrientation || isfocusVideo || this.props.doubleVideoClassName ? 'contain' : 'cover';
    const isMobileOnwheat = Boolean(this.props.studentStreamList && this.props.studentStreamList.length > 0 && YsGlobal.isMobile);
    const configVideoMirror = YsGlobal.roomConfigItem.isVideoMirror;
    const propsVideoMirror = configVideoMirror ? compelVideoMirror : isVideoMirror;
    return (
      <>
        <VideoBackGround publishstate={userStream.publishstate} teacherId={teacherId} />
        {teacherId && this.hasStreamUserId(isClassBegin, mySelfInfo.id, teacherId) && <NoVideo userId={teacherId} />}
        {teacherId && this.hasStreamUserId(isClassBegin, mySelfInfo.id, teacherId) && (
          <VideoComponenter videoStream={userStream} isVideoMirror={propsVideoMirror} videoFit={videoFit} />
        )}
        {isClassBegin && !isLiveRoom && <VideoUserPen userId={userStream.streamUserId} />}
        <AudioComponenter audioStream={userStream} />
        {((!isClassBegin && mySelfInfo.role === ROOM_ROLE.TEACHER) ||
          !(this.showNoMic(hasaudio, afail) && userStream.publishstate !== undefined && userStream.publishstate !== 0)) &&
          !isMobileOnwheat &&
          this.hasStreamUserId(isClassBegin, mySelfInfo.id, teacherId) && (
            <VideoVolumeInfo isClassBegin={isClassBegin} audioFlag={userStream.audioFlag} userId={userStream.streamUserId} />
          )}
        {isClassBegin && isLiveRoom && doorChain && <ScrollBanner roomInfo={roomInfo} />}
        {((!isClassBegin && mySelfInfo.role === ROOM_ROLE.TEACHER) || this.showNoMic(hasaudio, afail)) &&
          !isMobileOnwheat &&
          this.hasStreamUserId(isClassBegin, mySelfInfo.id, teacherId) && (
            <NoMic isClassBegin={isClassBegin} audioFlag={userStream.audioFlag} userId={userStream.streamUserId} afail={afail} hasaudio={hasaudio} />
          )}
        {!YsGlobal.playback && <AudioPlayError audioStream={userStream} />}
      </>
    );
  }
}
const mapStateToProps = state => ({
  isClassBegin: state.classroom.isClassBegin,
  roomStatus: state.classroom.roomStatus,
  isVideoMirror: state.common.isVideoMirror,
  teacherUserStream: state.video.teacherUserStream,
  studentStreamList: state.video.studentStreamList,
  teacherId: state.user.teacherId,
  pageOrientation: state.classroom.pageOrientation,
  focusVideoId: state.video.focusVideoId,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherBaseVideo);
