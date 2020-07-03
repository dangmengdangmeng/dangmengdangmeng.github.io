import { Event, SessionRoom, ROOM_ROLE } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import store from '@app/store';
import UserService from '@global/services/UserService';
import { setChatNoticeBoard, addChatList, setChatListFilter } from '../state/actions';
import { getSendTime } from '../utils';
import { roleMap } from '../constent';
const { chatInput, errorNotice } = YsGlobal.languageInfo.chat;
class ChatContainerListener {
  constructor() {
    this.instance = null;
    this.listernerBackupid = new Date();
    this.store = store;
    this.addChatTimer = '';
    Event.on('signal-connected', this.roomConnected.bind(this), this.listernerBackupid); // 房间连接成功
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    Event.on('recv-del-msg', this.handleDelMsg.bind(this), this.listernerBackupid);
    this.roomParticipantJoin();
    this.roomParticipantLeave();
    this.roomTextMessage();
    // this.textMessageFilter();
  }

  /**
   *  roomlistener实例
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatContainerListener();
    }
    return this.instance;
  }

  // 监听房间连接事件
  roomConnected() {
    this.getAllInfo();
  }

  handlePubMsg(pubMsgData) {
    const time = getSendTime(YsGlobal.playback, pubMsgData.ts);
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    const mySelf = SessionRoom.getMyself();
    switch (pubMsgData.name) {
      // 公告
      case 'LiveNoticeBoard': {
        this.store.dispatch(setChatNoticeBoard(pubMsgData.data.text));
        break;
      }
      // 全体禁言
      case 'LiveAllNoChatSpeaking': {
        if ((pubMsgData.toID !== '__all' && pubMsgData.toID !== this.myId) || (!isLiveRoom && mySelf.role === ROOM_ROLE.STUDENT)) {
          break;
        }
        let test = chatInput.bannedToPost;
        if (pubMsgData.toID === mySelf.id) {
          test = chatInput.forbiddenToChat;
        }
        const chatObj = {
          time,
          msgtype: 'notice',
          data: {
            test,
          },
          id: new Date().getTime(),
        };
        this.addChatList(chatObj);
        break;
      }
      case 'LiveAllNoAudio': {
        if (![0, 1].includes(mySelf.role) && mySelf.hasaudio && [1, 3].includes(mySelf.publishstate)) {
          UserService.changeUserAudio(mySelf);
        }
        break;
      }
      // 送花
      case 'LiveGivigGifts': {
        const { filterCondition } = store.getState().chat;
        const tempObj = {
          time,
          msgtype: 'notice',
          type: 'flowers',
          data: {
            test: `${pubMsgData.data.nickname}${chatInput.toTeacher}`,
            num: pubMsgData.data.num,
          },
          id: new Date().getTime(),
          fromID: pubMsgData.fromID,
        };
        if (filterCondition === mySelf.id && filterCondition !== pubMsgData.fromID && mySelf.role === 2) {
          return;
        }
        this.addChatList(tempObj);
        break;
      }
      // 获奖消息
      case 'LiveLuckDrawResult': {
        const { winners = [] } = pubMsgData.data;
        const _winners = Array.isArray(winners) ? winners : winners.winners;
        if (_winners.find(it => it.buddyid === mySelf.id)) {
          const test = chatInput.congratulateWinner;
          const chatObj = {
            time,
            msgtype: 'notice',
            data: {
              test,
            },
            id: new Date().getTime(),
          };
          this.addChatList(chatObj);
        }
        break;
      }
      case 'GetUserMediaError': {
        const data = pubMsgData.data || {};
        const chatObj = {
          time,
          msgtype: 'notice',
          data: {
            test: errorNotice.getMediaErrorBefore + data.name + errorNotice.getMediaErrorBack,
          },
          id: new Date().getTime(),
        };
        this.addChatList(chatObj);
        break;
      }
      default:
        break;
    }
  }

  handleDelMsg(delMsgData) {
    const time = getSendTime(YsGlobal.playback, delMsgData.ts);
    let chatObj;
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    const mySelf = SessionRoom.getMyself();
    switch (delMsgData.name) {
      // 全体禁言
      case 'LiveAllNoChatSpeaking':
        if (!isLiveRoom && mySelf.role === ROOM_ROLE.STUDENT) {
          break;
        }
        chatObj = {
          time,
          msgtype: 'notice',
          isme: mySelf,
          data: {
            test: chatInput.LiftAllGagOrders,
          },
          id: new Date().getTime(),
        };
        this.addChatList(chatObj);
        break;
      case 'LiveAllNoAudio': {
        if (![0, 1].includes(mySelf.role) && mySelf.hasaudio && [2, 4].includes(mySelf.publishstate)) {
          UserService.changeUserAudio(mySelf);
        }
        break;
      }
      default:
        break;
    }
  }

  // 参与者加入房间事件
  roomParticipantJoin() {
    Event.on(
      'user-join',
      param => {
        const { id, isNowUser } = param;
        if (isNowUser) {
          const user = SessionRoom.getUser(id);
          if (+user.role === 4) return; // 不是巡检员,才提醒
          this.getAllInfo(user);
          const time = getSendTime(YsGlobal.playback, user.joinTs);
          let test = chatInput.joinLive;
          const roleName = roleMap[user.role] ? `(${roleMap[user.role]}) ` : ' ';
          test = `${user.nickname} ${roleName}${test}`;
          // if (+user.role === 0) this.teacherId = user.id;
          const chatObj = {
            time,
            msgtype: 'notice',
            data: { test },
            id: new Date().getTime(),
          };
          this.addChatList(chatObj);
        }
      },
      this.listernerBackupid,
    );
  }

  // 用户离开事件
  roomParticipantLeave() {
    Event.on(
      'user-leave',
      param => {
        const { user, reasoncode } = param;
        // 1、xx主动退出
        // 2、xx离开教室(离开原因）
        // 离开原因根据广生的传值显示：
        // 0：未知原因（unknown reason）
        // 2、Socket断开（Socket disconnect）
        // 3、被踢出（Kicked out）
        // 4、相同用户进入（Same identity）
        // 5、服务器关闭房间（Server shutdown room）
        if (+user.role === 4) return; // 不是巡检员,才提醒
        const time = getSendTime(YsGlobal.playback, user.leaveTs);
        let test = chatInput.leaveLive;
        const roleName = roleMap[user.role] ? `(${roleMap[user.role]}) ` : ' ';
        let leaveReason = '';
        switch (+reasoncode) {
          case 1:
            leaveReason = '';
            break;
          case 2:
            // leaveReason = `(${chatInput.socket})`;
            leaveReason = `(code 2)`;
            break;
          case 3:
            if (user.role === 0) {
              // leaveReason = `(${chatInput.sameIdentity})`;
              leaveReason = `(code 4)`;
            } else {
              // leaveReason = `(${chatInput.kickedOut})`;
              leaveReason = `(code 3)`;
            }
            break;
          case 4:
            // leaveReason = `(${chatInput.sameIdentity})`;
            leaveReason = `(code 4)`;
            break;
          case 5:
            // leaveReason = `(${chatInput.serverShutdown})`;
            leaveReason = `(code 5)`;
            break;
          case 0:
            // leaveReason = `(${chatInput.unknownReason})`;
            leaveReason = `(code 0)`;
            break;
          default:
            leaveReason = '';
            break;
        }
        test = `${user.nickname} ${roleName}${test}${leaveReason}`;
        const chatObj = {
          time,
          msgtype: 'notice',
          data: { test },
          id: new Date().getTime(),
        };
        this.addChatList(chatObj);
      },
      this.listernerBackupid,
    );
  }

  // 聊天消息事件
  roomTextMessage() {
    Event.on(
      'recv-chat-msg',
      param => {
        const mySelf = SessionRoom.getMyself();
        const { isLiveRoom } = store.getState().classroom.roomInfo;
        // 判断是否是聊天中的消息
        if (!param || param.extraData.type !== 0) return;
        const { fromID, message, extraData } = param;
        const { sendTs, role, toUserID, nickname, toUserNickname, type } = extraData;
        // const time = getSendTime();
        // 判断当前发消息人是不是老师或者助教
        const isTeacher = +role === 0 || +role === 1;

        // 如果指定了接收人(toUserID) 那么只有发送人和接收人能受到这个消息
        const isHasTouserId = Boolean(toUserID && toUserID.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
        if (isHasTouserId && toUserID !== mySelf.id && fromID !== mySelf.id && !isTeacher) return;
        // 如果是私聊 处理下名字
        const toWho = `${fromID === mySelf.id ? chatInput.mine : nickname} ${chatInput.dui} ${fromID === mySelf.id ? toUserNickname : chatInput.you} ${
          chatInput.said
        }:`;
        const chatData = {
          sendTs, // 时间
          strmsg: message,
          who: !isHasTouserId ? nickname : toWho, // 昵称 或谁对谁说
          fromName: nickname, // 发消息人的昵称
          toUserID,
          chatType: type, // 消息类型 暂时没有过
          id: param.extraData.id || new Date().getTime(), // 消息id
          isMe: fromID === mySelf.id, // 是不是自己发的
          roleNum: role, // 发消息的人的角色
          // isTeacher: isTeacher, // 是不是老师
          fromID, // 发消息人的id
          msgtype: param.extraData.msgtype || 'text', // 消息类型
        };

        YsGlobal.chatList.push(chatData);
        const { isBigRoom } = store.getState().classroom;
        if (isLiveRoom || isBigRoom) {
          this.bigRoomAddChatList(YsGlobal.chatList);
        } else {
          this.addChatList(chatData);
        }
      },
      this.listernerBackupid,
    );
  }

  bigRoomAddChatList() {
    // 50毫秒内处理一批聊天消息，利用延时器50毫秒后空出主线程给其他事件
    if (this.addChatTimer) {
      return;
    }
    const addTimer = YsGlobal.isMobile ? 100 : 50;
    this.addChatTimer = setTimeout(() => {
      this.addChatList(YsGlobal.chatList);
      YsGlobal.chatList = [];
      clearTimeout(this.addChatTimer);
      this.addChatTimer = null;
    }, addTimer);
  }

  // 监听从输入框过来的过滤消息事件
  textMessageFilter() {
    Event.on(
      'textMessageFilter',
      param => {
        const { teacherId } = store.getState().user;
        const mySelf = SessionRoom.getMyself();
        // 0-所有，1-自己，2-老师
        let filterId = 'none';
        if (param === 1) {
          filterId = mySelf.id;
        }
        if (param === 2) {
          filterId = teacherId;
        }
        this.store.dispatch(setChatListFilter(filterId));
      },
      this.listernerBackupid,
    );
  }

  // 将收到的消息放到消息列表中
  addChatList(chatData) {
    // // 更新滚动条位置
    this.store.dispatch(addChatList(chatData));
  }

  // 清除监听事件
  removeBackupListerner() {
    // Event.offAllByMarkId(this.listernerBackupid);
  }

  // 助教加入房间获取其他人的设备信息和sdk版本
  getAllInfo(user) {
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    const mySelf = SessionRoom.getMyself();
    if (isLiveRoom || mySelf.role !== 1) {
      return;
    }
    const time = getSendTime();
    if (user) {
      const roleName = roleMap[user.role] ? `(${roleMap[user.role]}) ` : `(${chatInput.whoJoin}) `;
      const test = `${user.nickname} ${roleName} ${chatInput.joinLive}, ${chatInput.useDevicetype}:${user.devicetype}, ${chatInput.sdkVersion}:${user.sdk_sdkversion}`;
      const chatObj = {
        time,
        msgtype: 'notice',
        data: { test },
        id: new Date().getTime(),
      };
      this.addChatList(chatObj);
      return;
    }
    const { userList } = this.store.getState().user;
    const id = new Date().getTime();
    userList.forEach((item, index) => {
      const roleName = roleMap[item.role] ? `(${roleMap[item.role]}) ` : `(${chatInput.whoJoin}) `;
      const test = `${item.nickname} ${roleName} ${chatInput.joinLive}, ${chatInput.useDevicetype}:${item.devicetype}, ${chatInput.sdkVersion}:${item.sdk_sdkversion}`;
      const chatObj = {
        time,
        msgtype: 'notice',
        data: { test },
        id: id + index,
      };
      this.addChatList(chatObj);
    });
  }
}

export default ChatContainerListener;
