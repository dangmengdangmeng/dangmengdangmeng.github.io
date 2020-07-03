import { connect } from 'react-redux';
import RoomService from '@global/services/RoomService';
import { Event, ROOM_STATE, SessionRoom } from '@global/roomConstants';
import React from 'react';
import VoteMobile from '@containers/Vote/VoteMobile';
import { YsGlobal } from '@global/handleGlobal';
import NetworkJitter from '@containers/NetworkJitter/NetworkJitter';
import Answer from '@containers/Answer/Answer'; // 投票答题
import CountDown from '@containers/CountDown/CountDown'; // 计时器
import PhotoUpload from '@containers/PhotoUpload/PhotoUpload';
import LuckyDrawMobile from './LuckyDraw/LuckyDrawMobile';
import TeacherVideoMobile from './TeacherVideoMobile/TeacherVideoMobile';
import DialogOut from '../../components/Dialog/DialogOut';
import ChatNameList from '../../containers/Chat/ChatInputBox/chatNameList';
import Action from '../../global/actions';
import RoomLoading from '../../containers/RoomLoading/RoomLoading';

import NavbarMobile from './Navbar/Navbar';
import './mobilePage.scss';
import './StudentVideoListMobile/studentVideoListMobile.scss';
import './StudentVideoListMobile/studentVideoMobile.scss';

const { pagesText } = YsGlobal.languageInfo;
const { livePageInner } = pagesText;

class MobilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCanDraw: false,
      swiperIndex: 0,
    };
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    RoomService.initRoom();
    this.disablePageZooming();
    Event.on('window-resize', this.handleResize.bind(this), this.listernerBackupid);
    Event.on('user-properties-update', this.userPropertiesUpdate.bind(this), this.listernerBackupid); // 用户属性改变
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    Action.setPageOrientation(window.orientation);
    this.changePageLayout(window.orientation);
  }

  /* 禁止移动端浏览器自动缩放的行为 */
  disablePageZooming() {
    document.addEventListener(
      'touchstart',
      event => {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
    let lastTouchEnd = 0;
    document.addEventListener(
      'touchend',
      event => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false,
    );
    document.addEventListener('gesturestart', event => {
      event.preventDefault();
    });

    document.body.addEventListener(
      'touchmove',
      e => {
        const chatContainer = document.querySelector('.chat-container');
        const classNameList = e.target && e.target.className.split(' ').filter(i => i);
        if (chatContainer && classNameList.length && chatContainer.querySelector(`.${classNameList[0]}`)) {
          return;
        }
        e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
      },
      { passive: false },
    );
  }

  userPropertiesUpdate(data) {
    const { id, properties } = data;
    if (id === SessionRoom.getMyself().id && properties.candraw !== undefined) {
      this.setState({
        isCanDraw: properties.candraw,
      });
    }
  }

  componentWillUnmount() {
    YsGlobal.roomClient.leaveChannel();;
  }

  handlePubMsg = pubMsgData => {
    const { name } = pubMsgData;
    if (name === 'ClassBegin') {
      this.changePageLayout(window.orientation);
    }
  };

  handleResize() {
    setTimeout(() => {
      const mobilePage = document.getElementById('mobilePage');
      if (mobilePage) {
        // 解決移动端safari有地址栏和工具栏时，自动横屏再转回来页面高度就会不对：
        mobilePage.style.height = `${window.innerHeight}px`;
      }
    }, 300);
    Action.setPageOrientation(window.orientation);
    this.changePageLayout(window.orientation);
  }

  changePageLayout(orientation) {
    document.body.style.setProperty('--width-primary', `${window.innerHeight}px`);
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      document.body.style.height = `${(document.documentElement.clientWidth / window.screen.width) * window.screen.height}px}`;
    }
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    const videoList = document.querySelector('.student-video-list');
    if (orientation !== 0 && this.props.isClassBegin) {
      const diff = Math.abs(document.documentElement.clientHeight - window.innerHeight);
      if (diff !== 0 && videoList) {
        document.querySelector('.student-video-list').style.paddingBottom = '50px';
      } else if (videoList) {
        document.querySelector('.student-video-list').style.paddingBottom = '0';
      }
      Action.setVideoLayout(true);
    } else if (videoList) {
      document.querySelector('.student-video-list').style.paddingBottom = 'auto';
      Action.setVideoLayout(false);
    }
  }

  getSwiperIndex(index) {
    this.setState({
      swiperIndex: index,
    });
  }

  renderLivePage(toolsBoxState) {
    const { luckyDraw, callRoll, vote } = toolsBoxState;
    const { isShowOutLive, roomStatus, answerState, pageOrientation, mp4Status } = this.props;
    const { isLiveRoom } = JSON.parse(this.props.roomInfo);
    const { isSupportPageTrun } = YsGlobal.roomConfigItem;
    const { isCanDraw, swiperIndex } = this.state;
    const studentPageClassName = !this.props.isClassBegin && !isLiveRoom && isSupportPageTrun ? 'isSupportPageTrun' : 'noSupportPageTrun';
    const rotateClassName = pageOrientation === 0 ? '' : 'rotate-90';
    return (
      <div id="mobilePage" className={`mobile-page ${studentPageClassName} ${rotateClassName}`}>
        {<NetworkJitter show={roomStatus === ROOM_STATE.DISCONNECT} />}
        {isShowOutLive && <DialogOut />}
        {/* 跟谁聊天 */}
        <ChatNameList />
        <TeacherVideoMobile />
        {/* isVideoLayout && !isLiveRoom && <StudentVideoList /> */}
        <div className="container">
          <NavbarMobile getSwiperIndex={this.getSwiperIndex.bind(this)} />
          {['winners', 'lottery'].includes('' || luckyDraw.luckyState || callRoll.callRollState) && (
            <div className={`module-mask ${['winners'].includes(luckyDraw.luckyState) ? 'allMask' : 'halfMask'}`}>
              <LuckyDrawMobile />
            </div>
          )}
          {!isLiveRoom && ['answerSelecting', 'stoped'].includes(answerState) && <Answer />}
          {!isLiveRoom && <CountDown />}
          {!isLiveRoom && isCanDraw && !swiperIndex && mp4Status === 'end' && <PhotoUpload />}
        </div>
        {vote.voteState !== 'isSetVoteInfo' && vote.voteState !== '' ? <VoteMobile /> : undefined}
        {roomStatus === ROOM_STATE.INIT && <RoomLoading roomStatus={roomStatus} />}
      </div>
    );
  }

  renderClassEnd() {
    return (
      <div className="connect-loading">
        <div className="loading_inner">{livePageInner.classOver}</div>
      </div>
    );
  }

  render() {
    const { roomStatus, toolsBoxState } = this.props;
    if (roomStatus !== ROOM_STATE.END) {
      return this.renderLivePage(JSON.parse(toolsBoxState));
    }
    return this.renderClassEnd();
  }
}

const mapStateToProps = state => ({
  toolsBoxState: JSON.stringify(state.Modules),
  roomStatus: state.classroom.roomStatus,
  isClassBegin: state.classroom.isClassBegin,
  isShowMask: state.Modules.isShowMask,
  isShowOutLive: state.Modules.isShowOutLive,
  answerState: state.Modules.answer.answerState,
  isVideoLayout: state.classroom.isVideoLayout,
  pageOrientation: state.classroom.pageOrientation,
  mp4Status: state.whiteboard.mp4Status,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({
  setMaskIsShow: data => {
    Action.isShowMobilemask(data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MobilePage);
