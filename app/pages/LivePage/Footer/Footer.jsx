import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SessionRoom, ROOM_ROLE, Event } from '@global/roomConstants';
import Actions from '@global/actions';
import './static/sass/index.scss';
import { YsGlobal } from '@global/handleGlobal';
import DeviceService from '@global/services/DeviceService';
import DeviceSetting from '@containers/Device/DeviceSetting';
import BanAudio from '@containers/GlobalControlBtn/BanAudio/BanAudio';
import UserService from '@global/services/UserService';
import { fullScreen, exitFullscreen, getFullscreenElement } from '@utils/ysUtils';
import Icon from '@components/Icon';
import ClassButton from './ClassButton/ClassButton';
import SwitchLayout from './SwitchLayout/SwitchLayout';
import Shuffling from './Shuffling/Shuffling';
import VideoDevice from './VideoDevice/VideoDevice';
import AudioOutput from './AudioOutput/AudioOutput';

const {
  header: headerLanguage,
  pagesText: { navBarInner },
  video,
} = YsGlobal.languageInfo;

const Footer = props => {
  const {
    activeToggle,
    navBarState,
    mp4Status,
    chatState,
    changeApplyWheat,
    clickConfirmBtn,
    isBigRoom,
    teacherUserStream,
    studentStreamList,
    device,
    updateDeviceList,
    setChatIndex,
    isAllNoAudio,
  } = props;
  const { isClassBegin } = props.headerState;
  const mySelf = SessionRoom.getMyself() || {};
  const [title, setTitle] = useState(navBarInner.fullScreen);
  const [roomIsFullscreen, setRoomIsFullscreen] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [deviceType, setdeviceType] = useState('');
  const [showParentPanel, setShowParentPanel] = useState(false);

  useEffect(() => {
    const handleKeyup = () => {
      if (!(document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.webkitFullScreen || document.msFullScreen || false)) {
        setRoomIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleKeyup);
    document.addEventListener('webkitfullscreenchange', handleKeyup);
    document.addEventListener('mozfullscreenchange', handleKeyup);
    document.addEventListener('MSFullscreenChange', handleKeyup);
    document.addEventListener('msfullscreenchange', handleKeyup);
    document.addEventListener('fullscreeneventchange', handleKeyup);
    return () => {
      document.removeEventListener('fullscreenchange', handleKeyup);
      document.removeEventListener('webkitfullscreenchange', handleKeyup);
      document.removeEventListener('mozfullscreenchange', handleKeyup);
      document.removeEventListener('MSFullscreenChange', handleKeyup);
      document.removeEventListener('msfullscreenchange', handleKeyup);
      document.removeEventListener('fullscreeneventchange', handleKeyup);
    };
  }, []);

  function changeChatStatus(type) {
    switch (chatState) {
      case '': {
        Actions.setModuleStatus('chat', type);
        break;
      }
      case 'chatsBtn': {
        if (type === 'chatsBtn') {
          Actions.setModuleStatus('chat', '');
        } else {
          Actions.setModuleStatus('chat', type);
        }
        break;
      }
      case 'inquiry': {
        if (type === 'chatsBtn') {
          Actions.setModuleStatus('chat', type);
        } else {
          Actions.setModuleStatus('chat', '');
        }
        break;
      }
    }
    if (type === 'chatsBtn') {
      setShowTips(false);
    } else {
      setShowInquiry(false);
    }
  }
  const changeFullscreen = () => {
    if (getFullscreenElement()) {
      exitFullscreen();
      setTitle(navBarInner.fullScreen);
      setRoomIsFullscreen(false);
    } else {
      fullScreen();
      setTitle(navBarInner.exitFullScreen);
      setRoomIsFullscreen(true);
    }
  };
  useEffect(() => {
    const handlePubMsg = pubMsgData => {
      const { name, data } = pubMsgData;
      if (name === 'LiveQuestions') {
        data.extraData = { type: data.type, msgtype: data.msgtype };
        handleRoomTextMessage(data);
      }
    };
    const handleRoomTextMessage = param => {
      // 判断是否是聊天中的消息
      if (!param || ![0, 1].includes(param.extraData.type)) return;
      if (param.extraData.msgtype === 'text') {
        switch (chatState) {
          case '': {
            if (param.extraData.type === 0) {
              setShowTips(true);
            } else {
              setShowInquiry(true);
            }
            break;
          }
          case 'chatsBtn': {
            if (param.extraData.type === 1) {
              setShowInquiry(true);
            }
            break;
          }
          case 'inquiry': {
            if (param.extraData.type === 0) {
              setShowTips(true);
            }
            break;
          }
        }
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('recv-chat-msg', handleRoomTextMessage, listernerBackupid);
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [chatState]);
  const changeDevice = (type, deviceId) => {
    const { useDevices } = device;
    useDevices[type] = deviceId;
    updateDeviceList({ useDevices });
    DeviceService.setDevices({ selectDeviceInfo: useDevices });
  };

  const changeDeviceDetail = type => {
    setdeviceType(type);
    activeToggle('deviceSetting');
    DeviceService.getDevicesList();
    changeApplyWheat(false);
    clickConfirmBtn('waiting');
  };

  const switchAudio = () => {
    if ([0].includes(mySelf.role) || (![0].includes(mySelf.role) && isClassBegin && mySelf.publishstate)) {
      UserService.changeUserAudio(mySelf);
    }
  };

  const switchVideo = () => {
    if ([0].includes(mySelf.role) || (![0].includes(mySelf.role) && isClassBegin && mySelf.publishstate)) {
      UserService.changeUserVideo(mySelf);
    }
  };

  const { isLiveRoom, isClassRoom, isMettingRoom, maxVideo } = JSON.parse(props.roomInfo);
  const { isCheckAudioOutput, isCheckVideoDevice } = YsGlobal;
  const hasSwitchLayout = isClassBegin && (isClassRoom || isMettingRoom) && mp4Status === 'end';
  let selfStream;
  if (isClassBegin) {
    if (mySelf.role === ROOM_ROLE.TEACHER) {
      selfStream = teacherUserStream;
    } else {
      selfStream = studentStreamList.find(stream => stream.streamUserId === mySelf.id);
    }
  } else if (mySelf.role === ROOM_ROLE.TEACHER) {
    selfStream = teacherUserStream;
  }

  let audioTitle;
  let videoTitle;
  let audioWarn = false;
  let videoWarn = false;
  if (isClassBegin) {
    if (selfStream) {
      const { audioFlag, videoFlag } = selfStream;
      audioTitle = audioFlag ? video.closeAudio : video.openAudio;
      videoTitle = videoFlag ? video.closeVideo : video.openVideo;
      audioWarn = !audioFlag;
      videoWarn = !videoFlag;
    } else {
      audioTitle = video.selectAudio;
      videoTitle = video.selectVideo;
    }
  } else {
    audioTitle = video.selectAudio;
    videoTitle = video.selectVideo;
    audioWarn = false;
    videoWarn = false;
  }

  const audioDisable = mySelf.role === 2 && mySelf.publishstate !== 0 && isAllNoAudio;

  return (
    <div
      className="footer"
      id="footer"
      style={{ zIndex: `${showParentPanel || ((isCheckAudioOutput || isCheckVideoDevice) && navBarState.visible === 'deviceSetting') ? '250' : '228'}` }}
    >
      <div className="footer_left">
        <Icon
          className={`btn-audio ${audioTitle === video.selectAudio ? 'select-audio' : ''}`}
          title={audioTitle}
          onClick={switchAudio}
          type="microphone"
          warn={audioWarn}
          disable={audioDisable}
        />
        <AudioOutput {...device} changeDevice={changeDevice} changeDeviceDetail={changeDeviceDetail} setShowParentPanel={setShowParentPanel} />
        <Icon
          className={`btn-video ${videoTitle === video.selectVideo ? 'select-video' : ''}`}
          title={videoTitle}
          onClick={switchVideo}
          type="camera"
          warn={videoWarn}
        />
        <VideoDevice {...device} changeDevice={changeDevice} changeDeviceDetail={changeDeviceDetail} setShowParentPanel={setShowParentPanel} />
        {(isCheckAudioOutput || isCheckVideoDevice) && navBarState.visible === 'deviceSetting' && <DeviceSetting deviceType={deviceType} />}
      </div>
      <div className="footer_center">
        <div
          className={`footer-icon ${chatState === 'chatsBtn' ? 'open' : ''}`}
          onClick={() => {
            setChatIndex(0);
            changeChatStatus('chatsBtn');
          }}
          title={headerLanguage.chatsBtn}
        >
          <Icon title={headerLanguage.chatsBtn} type="message" />
          {showTips && <i className="tips"></i>}
        </div>
        {isLiveRoom && isClassBegin && (
          <div
            className={`footer-icon ${chatState === 'inquiry' ? 'open' : ''}`}
            onClick={() => {
              setChatIndex(1);
              changeChatStatus('inquiry');
            }}
            title={headerLanguage.inquiryLanguage}
          >
            <Icon title={headerLanguage.inquiryLanguage} type="quiz" />
            {showInquiry && <i className="tips"></i>}
          </div>
        )}
        {!isLiveRoom && !isBigRoom && !YsGlobal.playback && <Shuffling />}
        {hasSwitchLayout && <SwitchLayout />}
        {!isLiveRoom && [0, 1].includes(mySelf.role) && maxVideo !== 2 && <BanAudio />}
        <div className="footer-icon" title={title} onClick={changeFullscreen}>
          <Icon title={title} type={roomIsFullscreen ? 'full_exit_course' : 'fullscreen'} />
        </div>
      </div>
      <div className="footer_right">{mySelf.role === ROOM_ROLE.TEACHER && <ClassButton isClassBegin={isClassBegin} />}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  headerState: {
    ...state.ys.networkState,
    ...{
      isClassBegin: state.classroom.isClassBegin,
    },
  },
  navBarState: {
    ...state.common,
  },
  device: {
    ...state.device,
  },
  studentStreamList: state.video.studentStreamList,
  teacherUserStream: state.video.teacherUserStream,
  onlineStudentNum: state.user.onlineStudentNum,
  mp4Status: state.whiteboard.mp4Status,
  confirmState: state.device.settingConfirmBtnState,
  isFullScreen: state.whiteboard.isFullScreen,
  isBigRoom: state.classroom.isBigRoom,
  chatState: state.Modules.chat.chatState,
  isClassBegin: state.classroom.isClassBegin,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
  isAllNoAudio: state.classroom.isAllNoAudio,
});

const mapDispatchToProps = dispatch => ({
  activeToggle: type => {
    dispatch(Actions.toggleNavbar(type));
  },
  changeApplyWheat: data => {
    Actions.applyWheatState(data);
  },
  clickConfirmBtn: state => {
    Actions.setConfirmBtnState(state);
  },
  chengeIsCheckMore: data => {
    Actions.toggleIscheckMore(data);
  },
  updateDeviceList: data => {
    dispatch(Actions.updateDeviceList(data));
  },
  setChatIndex: index => {
    Actions.setChatIndex(index);
    Actions.setPrivata({ selectUserID: '' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
