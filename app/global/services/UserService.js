import { SessionRoom, ROOM_ROLE, PUBLISH_STATE } from '@global/roomConstants';
import Actions from '@global/actions';
import store from '@app/store';
import { YsGlobal } from '../handleGlobal.ts';
import { setUserProperty } from '../../utils/sign';
import FetchService from './FetchService';

class UserService {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  // 获取用户信息
  getUser(userId) {
    return SessionRoom.getUser(userId);
  }

  // 用户加入或者离开，小班课的人数更新
  getUsers() {
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    if (isLiveRoom) {
      return;
    }
    const userList = SessionRoom.getUsers();
    const list = [];
    let studentCount = 0;
    for (const value of Object.values(userList)) {
      list.push({ ...value });
      if (value.role === 2) studentCount += 1;
    }
    Actions.setUserList(list);
    Actions.setStudentCount(studentCount);
  }

  setTeacherId() {
    const users = SessionRoom.getUsers();
    for (const value of Object.values(users)) {
      if (value.role === ROOM_ROLE.TEACHER) {
        Actions.setTeacherId(value.id);
      }
    }
  }

  /* 用户功能-上下讲台信令的发送 */
  userPlatformUpOrDown(user) {
    const userPropertyData = {};
    const { isMettingRoom } = store.getState().classroom.roomInfo;
    if (user.publishstate === PUBLISH_STATE.NONE) {
      if (user.hasvideo) {
        userPropertyData.publishstate = user.hasaudio ? PUBLISH_STATE.BOTH : PUBLISH_STATE.VIDEOONLY;
      } else {
        userPropertyData.publishstate = user.hasaudio ? PUBLISH_STATE.AUDIOONLY : PUBLISH_STATE.MUTEALL;
      }
      // 移动浏览器直接改变属性值
      if (user.devicetype === 'MobileBrowser') {
        userPropertyData.publishstate = 3;
        userPropertyData.hasaudio = true;
        userPropertyData.hasvideo = true;
      }
    } else {
      userPropertyData.publishstate = PUBLISH_STATE.NONE;
      // 用户下台排到最后
      // const { userList } = store.getState().user;
      // const pushDown = userList.find(it => it.id === user.id);
      // const index = userList.findIndex(it => it.id === user.id);
      // userList.splice(index, 1);
      // userList.push(pushDown);
      // Actions.setUserList(userList);
    }
    const { isAllNoAudio } = store.getState().classroom;
    if (isAllNoAudio && user.role !== 0) {
      if (userPropertyData.publishstate === PUBLISH_STATE.AUDIOONLY) {
        userPropertyData.publishstate = PUBLISH_STATE.MUTEALL;
      } else if (userPropertyData.publishstate === PUBLISH_STATE.BOTH) {
        userPropertyData.publishstate = PUBLISH_STATE.VIDEOONLY;
      }
    }
    if (user.role !== ROOM_ROLE.ASSISTANT && user.role !== ROOM_ROLE.TEACHER && userPropertyData.publishstate === PUBLISH_STATE.NONE && user.candraw) {
      // 如果不是助教和老师, 如果下台并且当前可画,则设置不可画
      userPropertyData.candraw = false;
    }
    if (isMettingRoom && userPropertyData.publishstate === PUBLISH_STATE.BOTH) {
      userPropertyData.candraw = true;
    }
    setUserProperty(user.id, userPropertyData);
  }

  autoStartAV() {
    const mySelf = SessionRoom.getMyself();
    const { autoStartAV } = YsGlobal.roomConfigItem;
    const users = SessionRoom.getUsers() || {};
    const usersNum = Object.values(users).filter(item => item.publishstate > 0).length;
    const { maxVideo } = store.getState().classroom.roomInfo;
    if (mySelf.publishstate > 0) {
      return;
    }
    if (mySelf.role === ROOM_ROLE.TEACHER) {
      this.userPlatformUpOrDown(mySelf);
    } else if (autoStartAV && mySelf.role === 2 && usersNum < maxVideo) {
      this.userPlatformUpOrDown(mySelf);
    }
  }

  /* 用户功能-打开关闭音频 */
  changeUserAudio(user) {
    const data = {};
    if (user.publishstate === PUBLISH_STATE.AUDIOONLY) {
      // 之前状态为1 ==>变为4
      data.publishstate = PUBLISH_STATE.MUTEALL;
    } else if (user.publishstate === PUBLISH_STATE.VIDEOONLY) {
      // 之前状态为2 ==>变为3
      data.publishstate = PUBLISH_STATE.BOTH;
    } else if (user.publishstate === PUBLISH_STATE.BOTH) {
      // 之前状态为3 ==>变为2
      data.publishstate = PUBLISH_STATE.VIDEOONLY;
    } else if (user.publishstate === PUBLISH_STATE.MUTEALL) {
      // 之前状态为4 ==>变为1
      data.publishstate = PUBLISH_STATE.AUDIOONLY;
    } else if (user.publishstate === PUBLISH_STATE.NONE) {
      // 之前状态为0 ==>变为1
      data.publishstate = PUBLISH_STATE.AUDIOONLY;
    }
    setUserProperty(user.id, data);
  }

  /* 用户功能-打开关闭视频 */
  changeUserVideo(user) {
    const data = {};
    if (user.publishstate === PUBLISH_STATE.AUDIOONLY) {
      // 之前状态为1 ==>变为3
      data.publishstate = PUBLISH_STATE.BOTH;
    } else if (user.publishstate === PUBLISH_STATE.VIDEOONLY) {
      // 之前状态为2 ==>变为4
      data.publishstate = PUBLISH_STATE.MUTEALL;
    } else if (user.publishstate === PUBLISH_STATE.BOTH) {
      // 之前状态为3 ==>变为1
      data.publishstate = PUBLISH_STATE.AUDIOONLY;
    } else if (user.publishstate === PUBLISH_STATE.MUTEALL) {
      // 之前状态为4 ==>变为2
      data.publishstate = PUBLISH_STATE.VIDEOONLY;
    } else if (user.publishstate === PUBLISH_STATE.NONE) {
      // 之前状态为0 ==>变为2
      data.publishstate = PUBLISH_STATE.VIDEOONLY;
    }
    setUserProperty(user.id, data);
  }

  /* 改变用户的画笔权限 */
  changeUserCandraw(user) {
    const data = {};
    data.candraw = !user.candraw;
    // 之前状态为0 ==>变为4
    if (user.publishstate === PUBLISH_STATE.NONE) {
      data.publishstate = PUBLISH_STATE.MUTEALL;
    }
    setUserProperty(user.id, data);
  }

  /* 单独用户禁言 */
  userBanSpeak(user, disablechat) {
    const data = {
      disablechat: disablechat !== undefined ? disablechat : !user.disablechat,
    };
    setUserProperty(user.id, data);
  }

  /* 改变用户画笔颜色 */
  changeVideoUserPen(userId, primaryColor) {
    setUserProperty(userId, { primaryColor });
  }

  /* 给用户发奖杯 */
  sendUserGift(user) {
    const participantIdJson = {
      [user.id]: user.nickname,
    };
    FetchService.sendGift(participantIdJson).then(data => {
      if (user && data.result === 0) {
        let giftnumber = parseInt(user.giftnumber, 10) || 0;
        giftnumber += 1;
        const propertyInfo = {
          giftnumber,
        };
        setUserProperty(user.id, propertyInfo);
      }
    });
  }

  /* 获取自己礼物数 */
  getMySelfGift() {
    const mySelf = SessionRoom.getMyself();
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    if (mySelf.role === ROOM_ROLE.STUDENT && !isLiveRoom) {
      FetchService.getGiftInfo(mySelf.id).then(res => {
        if (res.result === 0) {
          const { giftinfo = [] } = res;
          const giftInfo = giftinfo[0] || {};
          const propertyInfo = {
            giftnumber: parseInt(giftInfo.giftnumber, 10),
          };
          setUserProperty(mySelf.id, propertyInfo);
        }
      });
    }
  }

  // 强制镜像 自己的远端视频
  setVideoMirror(isVideoMirror) {
    const { isVideoMirror: configVideoMirror } = YsGlobal.roomConfigItem;
    if (!configVideoMirror) {
      return;
    }
    const data = {};
    const mySelf = SessionRoom.getMyself();
    data.isVideoMirror = isVideoMirror;
    setUserProperty(mySelf.id, data);
  }

  /* 转换设备失败的code，转为用户属性afail/vfail的值 */
  setAvFialCode(deviceCode, type) {
    let failc = 1;
    /* failc:
        0 设备流正常
        1 未知错误
        2 没找到设备 
        3 没有授权
        4 设备占用
        5 约束无法获取设备流
        6 约束都为false
        7 获取设备流超时
        8 设备流没有数据
        9 设置描述信息失败
    */
    switch (deviceCode) {
      case 'OK':
        failc = 0;
        break;
      case 'NOT_FOUND_ERROR':
        failc = 2;
        break;
      case 'NOT_ALLOWED_ERROR':
        failc = 3;
        break;
      case 'NOT_READABL_EERROR':
        failc = 4;
        break;
      case 'OVER_CONSTRAINED_ERROR':
        failc = 5;
        break;
      case 'TYPE_ERROR':
        failc = 6;
        break;
      case 'REQ_TIMEOUT':
        failc = 7;
        break;
      case 'NO_STREAM':
        failc = 8;
        break;
      case 'FAILED_TO_DESCRIPTE':
        failc = 9;
        break;
      default:
        break;
    }
    const data = {};
    const mySelf = SessionRoom.getMyself();
    data[type] = failc;
    setUserProperty(mySelf.id, data);
  }
}

export default UserService.getInstance();
