import { Event, SessionRoom, ROOM_STATE } from '@global/roomConstants';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import { windowClose } from '@utils/ysUtils';
import store from '@app/store';
import { giftPush } from '@containers/Gift/Gift';
import { setLiveAllNoChatSpeaking } from '@containers/Chat/state/actions';
import { mediaManager } from '@global/modules/Media';
import RoomService from './RoomService';
import UserService from './UserService';
import DeviceService from './DeviceService';
import { setUserProperty } from '../../utils/sign';
import Signalling from './SignallingService.ts';

const { video, serviceText } = YsGlobal.languageInfo;
const { roomListner } = serviceText;
class RoomListener {
  constructor() {
    this.instance = null;
    this.audioError = false;
    this.videoError = false;
    Event.on('signal-connected', this.roomConnected.bind(this)); // 房间连接成功
    Event.on('signal-reconnect', this.signalReconnect.bind(this)); // 房间断开连接
    Event.on('user-properties-update', this.userPropertiesUpdate.bind(this)); // 用户属性改变
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this));
    Event.on('recv-del-msg', this.handleDelMsg.bind(this));
    Event.on('peer-evicted', this.handleUserEvicted.bind(this));
    Event.on('user-join', this.roomParticipantJoin.bind(this));
    Event.on('user-leave', this.roomParticipantLeave.bind(this));
    Event.on('stream-init-error', this.streamInitError.bind(this));
    Event.on('stream-publish-error', this.streamPublishError.bind(this));
    Event.on('stream-subscribe-error', this.streamSubscribeError.bind(this));
    Event.on('channel-limit-mode', this.channelLimitMode.bind(this));
    Event.on('need-reload-page', this.needReloadPage.bind(this));
    Event.on('webapi-getConfig-result', this.getConfigResult.bind(this));
    this.userStreamError();
  }

  /**
   *  roomlistener实例
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomListener();
    }
    return this.instance;
  }

  roomConnected(data) {
    const { currServerTs } = data;
    YsGlobal.connectServerTime = currServerTs;
    YsGlobal.curServiceTime = currServerTs;
    const { roomName, isLiveRoom, isMettingRoom } = store.getState().classroom.roomInfo;
    document.title = roomName;
    if (!YsGlobal.isMobile) {
      YsGlobal.roomClient.enableAudioVolumeIndicator(200);
    }
    UserService.setTeacherId();
    UserService.getMySelfGift();
    DeviceService.getSystemInfo();

    if (isLiveRoom) {
      YsGlobal.isCheckVideoDevice = true;
    }

    // TODO roomMsgList待处理
    RoomService.handleRoomConfig();
    Actions.setRoomStatus(ROOM_STATE.CONNECTED);
    if (isMettingRoom) {
      UserService.autoStartAV();
    }
    const isVideoMirror = JSON.parse(localStorage.getItem('isVideoMirror')) === null ? true : JSON.parse(localStorage.getItem('isVideoMirror'));
    UserService.setVideoMirror(isVideoMirror);
    // 本地存储自己被踢出的时间，没有超过3分钟不能进去
    const myselfInfo = SessionRoom.getMyself();
    if (localStorage.getItem('kicks')) {
      const kicks = JSON.parse(localStorage.getItem('kicks'));
      const kickOne = kicks.find(it => it.id === myselfInfo.id);
      if (kickOne && kickOne.limit > Date.now()) {
        YsGlobal.roomClient.evictUser(kickOne.id, 1, roomListner.okBtn);
      }
    }
  }

  signalReconnect() {
    Actions.setRoomStatus(ROOM_STATE.DISCONNECT);
    Actions.initClassRoomState();
    Actions.initModulesState();
    Actions.initVideoState();
  }

  userPropertiesUpdate(data) {
    const { properties, id, fromID } = data;
    const user = SessionRoom.getUser(id);
    if (properties.giftnumber === 0) return;
    if (properties.giftnumber && id !== fromID) {
      if (user.publishstate !== 0) {
        giftPush(user);
      }
    }
    const { publishstate, giftnumber, disablechat } = properties;
    if (user.role !== 0 && (publishstate !== undefined || giftnumber !== undefined || disablechat !== undefined)) {
      UserService.getUsers();
    }
  }

  handlePubMsg(pubMsgData) {
    const { name, data, ts, isNowMsg } = pubMsgData;
    if (YsGlobal.newPlayback && ts && isNowMsg) {
      // 新版回放中 校正上课时间
      YsGlobal.curServiceTime = ts;
    }
    // this._saveMsglist(pubMsgData);
    switch (name) {
      case 'ClassBegin':
        mediaManager.clean();
        RoomService.handleBeginClass(pubMsgData);
        if (isNowMsg) {
          YsGlobal.curServiceTime = ts;
        }
        window.localStorage.removeItem('remind');
        break;
      case 'Notice_PrepareRoomEnd':
        RoomService.handleRoomEndNotice(pubMsgData);
        break;
      case 'doubleClickVideo':
        Actions.setDoubleVideoId(data.doubleId);
        break;
      case 'Notice_BigRoom_Usernum': {
        const { rolenums = {} } = data;
        Actions.setOnlineStudentNum(rolenums[2]);
        break;
      }
      case 'Notice_EvictAllRoomUser':
        // 所有人都被踢出
        RoomService.handleEndClass();
        break;
      case 'LiveNoticeInform': {
        Actions.setNoticeData(data);
        break;
      }
      case 'LiveAllNoAudio':
        Actions.setIsAllNoAudio(true);
        break;
      case 'LiveAllNoChatSpeaking':
        setLiveAllNoChatSpeaking(data.isAllBanSpeak);
        RoomService.userListData(true);
        break;
      case 'UpdateTime':
        YsGlobal.curServiceTime = ts;
        break;
      default:
        break;
    }
  }

  handleDelMsg(delMsgData) {
    const { name } = delMsgData;
    switch (name) {
      case 'ClassBegin':
        RoomService.handleEndClass(delMsgData);
        break;
      case 'Notice_PrepareRoomEnd':
        RoomService.handleRoomEndNotice(delMsgData);
        break;
      case 'doubleClickVideo':
        Actions.setDoubleVideoId('');
        break;
      case 'LiveAllNoAudio':
        Actions.setIsAllNoAudio(false);
        break;
      case 'LiveAllNoChatSpeaking':
        setLiveAllNoChatSpeaking(false);
        RoomService.userListData(false);
        break;
      default:
        break;
    }
  }

  handleUserEvicted(data) {
    const { reason } = data;
    const myself = SessionRoom.getMyself();
    if (reason === 1) {
      if (localStorage.getItem('kicks')) {
        const kicks = JSON.parse(localStorage.getItem('kicks'));
        kicks.push({ id: myself.id, limit: Date.now() + 3 * 60 * 1000 });
        localStorage.setItem('kicks', JSON.stringify(kicks));
      } else {
        localStorage.setItem('kicks', JSON.stringify([{ id: myself.id, limit: Date.now() + 3 * 60 * 1000 }]));
      }
    }
    Actions.changeModalMsg(
      {
        type: 'alert',
        title: roomListner.msgTitle,
        okBtn: roomListner.okBtn,
        message: (reason === 1 && roomListner.removeUser) || roomListner.leaveMsg,
      },
      () => {
        YsGlobal.roomClient.leaveChannel();
        windowClose();
        document.documentElement.style.pointerEvents = 'none';
      },
    );
  }

  /**
   * 触发流初始化时的错误
   * @param {[
   * {type: "video_device", errflag: "NOT_ALLOWED_ERROR", message: "Permission denied"},
   * {type: "audio_deivce", errflag: "NOT_ALLOWED_ERROR", message: "Permission denied"},
   * {type: "screen", errflag: "SCREEN_PLUGIN_NOT_INSTALL_EDPROPERLY", message: "plugin not install edproperly"},
   * ]} errInfo 错误信息
   * errflag有以下值：
   * “NOT_SUPPORT”: 浏览器不支持。
   * “INVALID_ARG”: 无效的参数。
   * “NOT_ALLOWED_ERROR”: 用户拒绝授予对应的摄像头或麦克风权限。
   * “NOT_READABL_EERROR”: 摄像头或麦克风被占用。
   * “ABORT_ERROR”: 设备中止错误。
   * “NOT_FOUND_ERROR”: 没有找到设备。
   * “OVER_CONSTRAINED_ERROR”: 配置的约束无法满足要求错误。
   * “SECURITY_ERROR”: 安全错误,网页使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。
   * “TYPE_ERROR”: 设备约束都设置为false了。
   * “REQ_TIMEOUT”: 请求设备/屏幕共享超时。
   * “SCREEN_FAIL”: 屏幕/程序流获取失败。
   * “SCREEN_PLUGIN_NOT_INSTALL_EDPROPERLY”: 用户尝试在 Chrome 上进行屏幕共享，但未安装屏幕共享插件，或使用了错误的 extensionId。
   * “UNDEFINED_ERROR”: 未定义错误。
   */
  streamInitError(data) {
    const { errInfo = [] } = data;
    const mySelf = SessionRoom.getMyself();
    let videoError = false;
    let audioError = false;
    errInfo.forEach(item => {
      if (item.type === 'video_device' && item.errflag) {
        mySelf.hasvideo && UserService.setAvFialCode(item.errflag, 'vfail');
        videoError = true;
        if (item.errflag === 'NOT_ALLOWED_ERROR') {
          const publishstate = mySelf.hasaudio ? 1 : 4;
          setUserProperty(mySelf.id, { publishstate });
        }
      }
      if (item.type === 'audio_deivce' && item.errflag) {
        mySelf.hasaudio && UserService.setAvFialCode(item.errflag, 'afail');
        audioError = true;
        if (item.errflag === 'NOT_ALLOWED_ERROR') {
          const publishstate = mySelf.hasvideo ? 2 : 4;
          setUserProperty(mySelf.id, { publishstate });
        }
      }
    });
    if (audioError && videoError) {
      audioError = false;
      videoError = false;
      const { teacherId } = store.getState().user;
      const { isLiveRoom } = store.getState().classroom.roomInfo;
      if (isLiveRoom) {
        Signalling.sendSignallingGetUserMediaError({ errorType: 3, name: mySelf.nickname }, teacherId);
      }
      setUserProperty(mySelf.id, { publishstate: 4 });
    }
  }

  /**
   * 触发流发布失败的错误
   * @param {string} errInfo 错误原因
   * 有以下值：
   * "STREAM_ALREADY_PUBLISHED": 该 stream 已经发布
   * "INVALID_LOCAL_STREAM": 传入的 stream 格式非法。
   * "STREAM_NOT_INITED": 本地流没有初始化完成。
   * "SIGNAL_NOT_CONNECT": 当前不在频道中，可能是没有加入频道或者是网络波动导致暂时断开连接。
   * "PUBLISH_STREAM_LIMIT": 发布的音视频最大路数超过限制。
   * “PUB_SETREMOTEDESC_FAIL”: 浏览器setRemoteDescription失败
   * @param {object} stream 失败的流对象
   */
  streamPublishError(data) {
    const { errInfo, stream } = data;
    const mySelf = SessionRoom.getMyself();
    switch (errInfo) {
      case 'PUBLISH_STREAM_LIMIT': {
        setUserProperty(mySelf.id, { publishstate: 0 });
        break;
      }
      case 'PUB_SETREMOTEDESC_FAIL': {
        const type = stream.getType();
        if (type === 'video') {
          mySelf.hasvideo && UserService.setAvFialCode('FAILED_TO_DESCRIPTE', 'vfail');
        } else if (type === 'audio') {
          mySelf.hasaudio && UserService.setAvFialCode('FAILED_TO_DESCRIPTE', 'afail');
        }
        if (type === 'media' || type === 'screen') {
          Actions.changeModalMsg(
            {
              type: 'alert',
              title: roomListner.msgTitle,
              okBtn: roomListner.okBtn,
              message: video.publishESCFall,
            },
            () => {},
          );
        }
        break;
      }
    }
  }

  /**
   * 触发流订阅失败的错误
   * @param {string} errInfo 错误原因
   * 有以下值：
   * "STREAM_ALREADY_SUBSCRIBED": 该 stream 已经订阅。
   * "STREAM_NOT_YET_PUBLISHED": 指定的 stream 还没有发布。
   * "INVALID_REMOTE_STREAM": 传入的 stream 格式非法。
   * "SIGNAL_NOT_CONNECT": 当前不在频道中，可能是没有加入频道或者是网络波动导致暂时断开连接。
   * “SUB_SETREMOTEDESC_FAIL”: 浏览器setRemoteDescription失败
   * @param {object} stream 失败的流对象
   */
  streamSubscribeError(data) {
    const { errInfo, stream } = data;
    const mySelf = SessionRoom.getMyself();
    switch (errInfo) {
      case 'SUB_SETREMOTEDESC_FAIL': {
        const type = stream.getType();
        if (type === 'video') {
          mySelf.hasvideo && UserService.setAvFialCode('FAILED_TO_DESCRIPTE', 'vfail');
        } else if (type === 'audio') {
          mySelf.hasaudio && UserService.setAvFialCode('FAILED_TO_DESCRIPTE', 'afail');
        }
        if (type === 'media' || type === 'screen') {
          Actions.changeModalMsg(
            {
              type: 'alert',
              title: roomListner.msgTitle,
              okBtn: roomListner.okBtn,
              message: video.subscribeESCFall,
            },
            () => {},
          );
        }
        break;
      }
    }
  }

  channelLimitMode() {
    Actions.setIsBigRoom(true);
  }

  needReloadPage() {
    window.location.reload();
  }

  /**
   * 用户突然加入
   */
  roomParticipantJoin(data) {
    const { id, user, isNowUser } = data;
    if (user.role === 0) {
      Actions.setTeacherId(id);
    }
    UserService.getUsers();
    if (!isNowUser) {
      RoomService.checkRoleConflict(user);
    }
  }

  /**
   * 用户离开
   */
  roomParticipantLeave(data) {
    const { user, reasoncode } = data;
    if (user.role === 0 && reasoncode !== 3) {
      Actions.setTeacherId('');
      Actions.setTeacherUserStream({});
    }
    UserService.getUsers();
    UserService.setTeacherId();
  }

  /* 转换设备失败的code，转为用户属性afail/vfail的值 */
  userStreamError() {
    const _videoQualityStats = [];
    const _audioQualityStats = [];
    Event.on('stream-network-quality', data => {
      const mySelf = SessionRoom.getMyself();
      const myQuality = data.find(item => item.stream.getId().substr(0, 36) === mySelf.id);
      if (myQuality && myQuality.quality) {
        if (_videoQualityStats.length >= 10) {
          _videoQualityStats.shift();
          _audioQualityStats.shift();
        }
        _videoQualityStats.push(myQuality.quality.video);
        _audioQualityStats.push(myQuality.quality.audio);
        if (_videoQualityStats.length < 10) {
          return;
        }
        if (
          _videoQualityStats.every(item => !item.frameRate) ||
          _videoQualityStats.every(item => !item.bps) ||
          _videoQualityStats.every(item => !item.resolutionWidth) ||
          _videoQualityStats.every(item => !item.resolutionHeight)
        ) {
          mySelf.hasvideo && UserService.setAvFialCode('NO_STREAM', 'vfail');
        } else {
          mySelf.vfail !== 0 && UserService.setAvFialCode('OK', 'vfail');
        }
        if (_audioQualityStats.every(item => !item.bps)) {
          mySelf.hasaudio && [1, 3].includes(mySelf.publishstate) && UserService.setAvFialCode('NO_STREAM', 'afail');
        } else {
          mySelf.afail !== 0 && UserService.setAvFialCode('OK', 'afail');
        }
      }
    });
  }

  getConfigResult(data) {
    const { backcourseaddr } = data;
    YsGlobal.backupDocAddressList = backcourseaddr;
  }

  _saveMsglist(pubMsgData) {
    // const { name, isNowMsg } = pubMsgData;
    // if (isNowMsg) {
    //   return;
    // }
    // if (name === 'VideoAttribute') {
    //   YsGlobal.msgList.push(pubMsgData);
    // }
  }
}

export default RoomListener.getInstance();
