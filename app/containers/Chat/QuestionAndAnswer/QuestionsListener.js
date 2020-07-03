import { SessionRoom, Event, ROOM_ROLE } from '@global/roomConstants';
// import { YsGlobal } from '@global/handleGlobal';
import store from '@app/store';
import { setQuestionList, delQuestionList, setQuestionListFilter } from '../state/actions';

import { getSendTime } from '../utils';

class QuestionsListener {
  constructor() {
    this.instance = null;
    this.listernerBackupid = new Date();

    this.store = store;

    this.roomTextMessage();
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    // this.textMessageFilter();
  }

  // 创建实例
  static getInstance() {
    if (!this.instance) {
      this.instance = new QuestionsListener();
    }
    return this.instance;
  }

  // 聊天消息事件
  roomTextMessage() {
    Event.on(
      'recv-chat-msg',
      param => {
        if (!param || param.extraData.type !== 1) return;
        const mySelf = SessionRoom.getMyself();
        let msgObj;
        // 如果是自己发的(助教和老师不可能发这个消息 就不判断了) 就添加系统公告
        if (param.extraData.sender && param.extraData.sender.id === mySelf.id) {
          // msgObj = this.addSystemMsg(param);
          return;
        }

        // 只有老师和助教可以看到学生的提问
        if (mySelf.role === 0 || mySelf.role === 1) {
          msgObj = this.addQuestionsItem(param, 'question');
        }
        if (msgObj) {
          store.dispatch(setQuestionList(msgObj));
        }
      },
      this.listernerBackupid,
    );
  }

  handlePubMsg(pubMsgData) {
    let itemObj;
    let msgObj;
    let questionType;
    switch (pubMsgData.name) {
      case 'LiveQuestions':
        if (pubMsgData.data.type !== 1) return;
        // 如果delQuestionMsgId中有数据说明这条pubmsg是在删除指定的消息
        if (pubMsgData.data.delQuestionMsgId) {
          this.store.dispatch(delQuestionList(pubMsgData.data.delQuestionMsgId));
          return;
        }
        // 判断 根据信令中消息的状态 更新当前的状态
        questionType = 'pass';
        itemObj = this.store.getState().chat.questionListObj[pubMsgData.data.id] || {};

        if (itemObj.questionType === 'question') {
          questionType = 'pass';
        }
        if (itemObj.questionType === 'pass') {
          questionType = 'answer';
        }

        msgObj = this.addQuestionsItem({ ...pubMsgData, message: pubMsgData.data }, questionType);
        if (msgObj) {
          store.dispatch(setQuestionList(msgObj));
        }
        break;
      default:
        break;
    }
  }

  // 筛选消息列表 --本地行为
  textMessageFilter() {
    Event.on(
      'textMessageFilter',
      param => {
        const { teacherId } = store.getState().user;
        // 0-所有，1-自己，2-老师
        let filterId = 'none';
        if (param === 1) {
          filterId = SessionRoom.getMyself().id;
        }
        if (param === 2) {
          filterId = teacherId;
        }
        store.dispatch(setQuestionListFilter(filterId));
      },
      this.listernerBackupid,
    );
  }

  // 清除监听事件
  removeBackupListerner() {
    // console.error('清除监听事件====>')
    // Event.offAllByMarkId(this.listernerBackupid);
  }

  // 添加公告
  addSystemMsg(param) {
    const time = getSendTime();
    const chatId = `${param.extraData.id || new Date().getTime()}_systemMsg`;
    const msgData = {
      time, // 时间
      questionMsg: param.extraData.msg,
      msgtype: 'systemMsg', // 消息类型
    };
    return [chatId, msgData];
  }

  // 添加提问
  addQuestionsItem(param, questionType) {
    const time = getSendTime();
    const { message, extraData } = param;
    const sender = message.sender || extraData.sender;
    let chatId = message.id || extraData.id || new Date().getTime();
    let newItem = {
      time, // 时间
      questionMsg: typeof param.message === 'string' ? param.message : param.message.msg,
      answerMsg: '',
      who: sender.nickname, // 昵称
      fromName: sender.nickname, // 发消息人的昵称
      toUserID: message.toUserID || extraData.toUserID,
      chatType: message.type || extraData.type, // 消息类型 暂时没有过
      id: chatId, // 消息id
      roleNum: sender.role, // 发消息的人的角色
      fromID: sender.id, // 发消息人的id
      msgtype: 'text', // 消息类型
      questionType, // 问题消息类型 有三种 question pass answer
    };
    const oldItem = this.store.getState().chat.questionListObj[chatId];

    // 如果是回复 就更新消息中的问题和回复
    if (questionType === 'answer') {
      newItem.answerMsg = newItem.questionMsg;
      newItem.questionMsg = oldItem.questionMsg;
      if (!this.isTeacher()) {
        chatId = chatId + 'answer';
        newItem.id = chatId;
      }
    }

    // 如果是通过 就用消息对象中的原有消息对象把 消息状态改pass
    if (questionType === 'pass') {
      if (oldItem) {
        oldItem.questionType = 'pass';
        newItem = oldItem;
      } else {
        newItem.who = message.toUserNickname || newItem.who;
        if (param.message.selectUserQuestion) {
          newItem.questionType = 'answer';
          newItem.answerMsg = newItem.questionMsg;
          newItem.questionMsg = param.message.selectUserQuestion;
          if (!this.isTeacher()) {
            chatId = chatId + 'answer';
            newItem.id = chatId;
          }
        }
      }
    }
    return [chatId, newItem];
  }

  isTeacher() {
    const user = SessionRoom.getMyself() || {};
    return user.role === ROOM_ROLE.TEACHER || user.role === ROOM_ROLE.ASSISTANT;
  }
}

export default QuestionsListener;
