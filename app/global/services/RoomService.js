import { SessionRoom, ROOM_STATE, ROOM_ROLE, ROOM_TYPE, Logger } from '@global/roomConstants';
import Actions from '@global/actions';
import { getDeviceTypeDetail } from '@utils/ysUtils';
import WhiteboardService from '@global/services/WhiteboardService';
import FetchService from '@global/services/FetchService';
import { YsGlobal } from '@global/handleGlobal';
import store from '@app/store';
import Signalling from '@global/services/SignallingService';
import { getUrlParams } from '../../utils/url.ts';
import UserService from './UserService';

class RoomService {
  constructor() {
    this.instance = null;
    this.roomEndNoticeTimer = '';
    this.teacherLeaveTimer = '';
  }

  // room实例
  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomService();
    }
    return this.instance;
  }

  // 房间初始化
  initRoom() {
    const { host } = YsGlobal.serviceInfo;
    const checkParams = {
      param: getUrlParams('param'),
      restrict: 0, // TODO:有缓存的servername就传servername否则传0
      domain: YsGlobal.domain,
      roomtype: YsGlobal.roomType,
      clientType: 1, // 1:PC 2:Android ,3:IOS , 4:PC客户端
    };
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    SessionRoom.checkRoom(host, undefined, checkParams)
      .then(data => {
        if (data.result !== 0) {
          this.joinRoomErrorAlert(data.result);
        } else {
          this.setRoomInfo(data);
          const { ClassDocServerAddr, httpsport } = data;
          YsGlobal.docAddress = {
            host: ClassDocServerAddr,
            port: httpsport,
            protocol: 'https',
          };
          const config = {
            hostname: host,
            mode: isLiveRoom ? 'live' : 'rtc',
          };
          YsGlobal.roomClient = SessionRoom.createClient(config);
          WhiteboardService.initWB();
          this.joinRoom();
        }
      })
      .catch(err => {
        Logger.error('checkRoom失败:', err);
      });
  }

  // 进入房间
  joinRoom() {

    const { serial, roomrole, nickname, thirdid, ipinfo = {},urlhead } = store.getState().classroom.roomInfo;
    // const { country, city, area, perators, selfip } = ipinfo;
    const { audioinput: hasaudio, videoinput: hasvideo } = store.getState().device.hasdevice;
    const userproperties = {
      id: YsGlobal.entryUserId || thirdid || '', // 用户的唯一标识
      role: roomrole,
      nickname,
      devicetype: getDeviceTypeDetail(),
      version: YsGlobal.ysVersion,
      disablechat: false,
      candraw: false,
      giftnumber: 0,
      primaryColor: '#FF0000', // 视频右上角的画笔颜色
      // servername: name, // 信令线路名
      // ys_ip: selfip, // 本地ip
      // ys_area: `${country}.${city}.${area}`, // 国家+城市+地区
      // ys_carrier: perators, // 运营商
      hasaudio,
      hasvideo,
    };
    const mediaLine = localStorage.getItem('mediaLine');
    if (mediaLine) {
      // 媒体线路名,有缓存则传缓存的medialine
      userproperties.medialine = mediaLine;
    }
    const appid = 'evxOd5CnQn4831dw';
    const server = {
      server: `${urlhead}.roadofcloud.net`,
    };
    SessionRoom.init(appid, server)
      .then(() => {
        SessionRoom.joinRoom(serial, { userproperties })
          .then(joinData => {
            if (!YsGlobal.entryUserId) {
              window.history.replaceState({}, 'entry', `${decodeURIComponent(window.location.href)}&entryUserId=${joinData}`);
            }
          })
          .catch(err => {
            Logger.error('加入房间失败', err);
          });
      })
      .catch(err => {
        Logger.error('初始化失败', err);
      });
  }

  /* 回放进入房间 */
  joinRoomPlayback() {
    const { host, port } = YsGlobal.serviceInfo;
    const path = getUrlParams('path');
    const playbackParams = {
      roomtype: getUrlParams('roomtype'),
      serial: getUrlParams('serial'),
      recordfilepath: `http://${/\//g.test(path.charAt(path.length - 1)) ? path : `${path}/`}`,
      domain: getUrlParams('domain'),
      host: getUrlParams('host'),
    };
    // liveRoom.joinPlaybackRoom(host, port, playbackParams);
  }

  /* 处理上课后逻辑 */
  handleBeginClass(handleMsg) {
    const { isMettingRoom } = store.getState().classroom.roomInfo;
    const { ts } = handleMsg;
    Logger.info('BeginClass ts', ts);
    Actions.beginClass(ts);
    Actions.setIsClassBegin(true);
    if (isMettingRoom) return;
    UserService.autoStartAV();
  }

  /* 处理下课后逻辑 */
  handleEndClass(message) {
    const { fromID } = message || {};
    const mySelf = SessionRoom.getMyself();
    Actions.beginClass('');
    Actions.setRoomStatus(ROOM_STATE.END);
    Actions.setIsClassBegin(false);
    if (fromID === mySelf.id) {
      Signalling.destroyServerRoom();
    }
    YsGlobal.roomClient.leaveChannel();
    if (YsGlobal.jumpurl) {
      window.location.href = YsGlobal.jumpurl;
    }
  }

  /* 处理房间配置项逻辑 */
  handleRoomConfig() {
    const { autoClassBegin } = YsGlobal.roomConfigItem;
    const myself = SessionRoom.getMyself();
    const { isClassBegin } = store.getState().classroom;
    const { isMettingRoom } = store.getState().classroom.roomInfo;
    if (isMettingRoom && myself.role === 0) {
      // Signalling.sendSignallingSetRoomLayout({ roomLayout: 'videoLayout' }, false);
      if (!isClassBegin) {
        FetchService.roomStart();
      }
    } else if (myself.role === 0 && autoClassBegin && !isClassBegin) {
      FetchService.roomStart();
    }
  }

  /**
   * 检测身份冲突
   * @param {any} user 要检测的用户
   */
  checkRoleConflict(user) {
    if (YsGlobal.playback) {
      return;
    }
    if (SessionRoom.getMyself().id !== user.id) {
      if (user.role === ROOM_ROLE.TEACHER && SessionRoom.getMyself().role === ROOM_ROLE.TEACHER) {
        YsGlobal.roomClient.evictUser(user.id);
      }
    }
  }

  /* 设置房间配置项 */
  setConfigItems(chairmancontrol = '', room) {
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    const config = {
      autoClassBegin: !!parseInt(chairmancontrol.substr(32, 1), 10) && !isLiveRoom, // 自动上课
      isSupportPageTrun: !!parseInt(chairmancontrol.substr(38, 1), 10) && !isLiveRoom, // 是否允许学生操作翻页
      hasScreenShare: !!parseInt(room.sharedesk, 10), // 桌面共享
      autoStartAV: !!parseInt(chairmancontrol.substr(23, 1), 10) && !isLiveRoom, // 自动开启音视频
      isShowStudentNum: !!parseInt(chairmancontrol.substr(200, 1), 10) && isLiveRoom, // 显示观众在线人数
      banPrivateChat: !!parseInt(chairmancontrol.substr(202, 1), 10) && isLiveRoom, // 禁止私聊
      canChat: isLiveRoom ? !!parseInt(chairmancontrol.substr(201, 1), 10) : !parseInt(chairmancontrol.substr(119, 1), 10), // 允许课前互动（聊天）
      isVideoMirror: !!parseInt(chairmancontrol.substr(148, 1), 10) && !isLiveRoom, // 强制镜像
      isMoreWhiteboard: !!parseInt(room.chairmancontrol.substr(150, 1), 10) && !isLiveRoom,
      // isMoreWhiteboard: true,
    };
    return config;
  }

  joinRoomErrorAlert(ret) {
    let text = '';
    const { roomListner } = YsGlobal.languageInfo.serviceText;
    switch (ret) {
      case -1:
        text = roomListner.code_1;
        break;
      case 3001:
        text = roomListner.code_3001;
        break;
      case 3002:
        text = roomListner.code_3002;
        break;
      case 3003:
        text = roomListner.code_3003;
        Actions.setRoomStatus(ROOM_STATE.EXPIRED);
        break;
      case 4007:
        text = roomListner.code_4007;
        break;
      case 4008:
        text = roomListner.code_4008;
        break;
      case 4110:
        text = roomListner.code_4110;
        break;
      case 4109:
        text = roomListner.code_4109;
        break;
      case 4103:
        text = roomListner.code_4103;
        break;
      case 4112:
        text = roomListner.code_4112;
        break;
      default:
        text = roomListner.lostClass;
        break;
    }
    Actions.changeModalMsg(
      {
        type: 'alert',
        message: text,
      },
      () => {
        document.documentElement.style.pointerEvents = 'none';
      },
    );
  }

  setRoomInfo(roominfo) {
    const { room, roomrole, nickname, thirdid, ipinfo = {} } = roominfo;
    const roomType = parseInt(room.roomtype, 10);
    const roomInfo = {
      roomrole,
      nickname,
      thirdid,
      ipinfo,
      createtime: room.createtime,
      endtime: room.endtime,
      starttime: room.starttime,
      serial: room.serial,
      roomName: room.roomname,
      companyid: room.companyid, // 企业id
      isLiveRoom: false, // 直播
      isClassRoom: false, // 小班课
      isMettingRoom: false, // 会议
      isMoreWhiteboard: false,
      roomType,
      maxVideo: parseInt(room.maxvideo, 10) || 0,
      doorChain: room.door_chain,
    };
    if (roomType === 0 || roomType === ROOM_TYPE.CLASS_ROOM) {
      roomInfo.isClassRoom = true;
    } else if (roomType === ROOM_TYPE.LIVE_ROOM) {
      roomInfo.isLiveRoom = true;
    } else if (roomType === ROOM_TYPE.MEETING_ROOM) {
      roomInfo.isMettingRoom = true;
    }
    // roomInfo.isClassRoom = false;
    // roomInfo.isMettingRoom = true;
    // roomInfo.isLiveRoom = true;
    Actions.setRoomInfo(roomInfo);
    YsGlobal.roomConfigItem = this.setConfigItems(room.chairmancontrol, room);
  }

  /* 处理房间即将离开提示 */
  handleRoomEndNotice(message) {
    const { data = {} } = message;
    const { roomListner } = YsGlobal.languageInfo.serviceText;
    const { countdown = 120, reason, classDelay } = data;
    const mySelf = SessionRoom.getMyself() || {};
    if (mySelf.role === 88 || YsGlobal.playback) {
      return;
    }
    // reason值为-1时，音视频已经发布过了（已经上课了），老师退出房间超过8分钟但是没有超过10分钟且在超过10分钟前又进入房间，则取消房间即将关闭
    // reason值为1时，音视频已经发布过了（已经上课了），但是老师退出房间达到8分钟，2分钟后房间即将关闭
    // reason值为2时，表示房间预约时间已到，30分钟后房间即将关闭
    // classDelay没传时，走30分钟后房间即将关闭
    // classDelay为-1时，表示不强制下课
    // classDelay为m分钟时，表示过m分钟下课
    // reason值为3时，表示已经超过房间预约时间28分钟，2分钟后房间即将关闭， 目前已废弃
    let text = '';
    if (reason === -1) {
      clearTimeout(this.teacherLeaveTimer);
    }
    if (reason === 1) {
      this.teacherLeaveTimer = setTimeout(() => {
        clearTimeout(this.teacherLeaveTimer);
        text = roomListner.roomEndNotice_1;
        Actions.changeModalMsg(
          {
            type: 'alert',
            message: text,
          },
          () => {
            this.handleEndClass();
            document.documentElement.style.pointerEvents = 'none';
          },
        );
      }, countdown * 1000);
      return;
    }
    if (reason === 2 && mySelf.role === 0) {
      if (classDelay) {
        if (classDelay === -1) {
          text = roomListner.roomEndNotice_NoMinutes;
        } else {
          text = `${roomListner.roomEndNotice_MinutesBefore}${classDelay}${roomListner.roomEndNotice_MinutesAfter}`;
        }
      } else if (classDelay !== 0) {
        text = roomListner.roomEndNotice_2;
      }
      Actions.changeModalMsg({
        type: 'alert',
        message: text,
      });
    }
  }

  // 重置用户属性
  userListData(liveAllNoChatSpeaking) {
    const mySelf = SessionRoom.getMyself() || {};
    if (mySelf.role !== 2) return;
    if ((liveAllNoChatSpeaking && !mySelf.disablechat) || (!liveAllNoChatSpeaking && mySelf.disablechat)) {
      UserService.userBanSpeak(mySelf);
    }
  }
}

export default RoomService.getInstance();
