import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Event, SessionRoom, ROOM_ROLE } from '@global/roomConstants';
import * as Actions from '@containers/Chat/state/actions';
import { YsGlobal } from '@global/handleGlobal';
import store from '@app/store';
import { toTwo, DissFrequent } from '../utils';
import { sendTextMessage } from '../../../utils/sign';
import { EmoticonArray, emoticonImg, emoticonImg2 } from '../constent';
import { ChatInputDefault, ChatInputBoxMobile } from './index';
// eslint-disable-next-line import/extensions
import Signalling from '../../../global/services/SignallingService';
import FetchService from '../../../global/services/FetchService';
const { chatInput } = YsGlobal.languageInfo.chat;
const SEND_GIFTS_NUM = 1;
const chatTimer = new DissFrequent(3);
const questionTimer = new DissFrequent(3);

class InputBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      qqFaceShow: false, // 表情选择弹框
      roleSelectShow: false, // 角色选择弹框，看自己/看主播
      chatRoleSelectIndex: 0, // 0-所有，1-自己，2-老师
      imgFlag: 1, // 发送图片
      canSendGifts: true,
      chatMsg: '',
      disablechat: false,
    };

    this.size = 1 * 1024 * 1024; /* 上传图片默认参数 */
    this.accept = '.png,.gif,.jpg,.jpeg'; /* 上传图片默认参数 */
    this.addFlowerTime = 10 * 1000; // 5 * 60 * 1000; // 送花时间
    this.addFlowerInterval = undefined; // 送花时间计时器
    this.toUserID = ''; // 提问人id
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    this._initState();
    Event.on('recv-del-msg', this.handleDelMsg.bind(this), this.listernerBackupid);
    Event.on('onAnsClick', this.handlerOnAnsClick.bind(this), this.listernerBackupid); // 提问时老师点击回复
    Event.on('user-properties-update', this.userPropertiesUpdate.bind(this), this.listernerBackupid); // 用户属性改变
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
    chatTimer.clear();
    questionTimer.clear();
  }

  // 花名册禁言
  userPropertiesUpdate(data) {
    const { id } = data;
    const user = SessionRoom.getUser(id);
    const myself = SessionRoom.getMyself() || {};
    if (myself.id === id && user.disablechat !== this.state.disablechat) {
      this.setState({
        disablechat: user.disablechat,
      });
      const chatObj = {
        msgtype: 'notice',
        data: { test: user.disablechat ? chatInput.forbiddenToChat : chatInput.toChat },
        id: new Date().getTime(),
      };
      this.props.addChatList(chatObj);
    }
  }

  handleDelMsg(delMsgData) {
    const mySelf = SessionRoom.getMyself();
    switch (delMsgData.name) {
      case 'ClassBegin':
        window.sessionStorage.removeItem(`${mySelf.id}_CanSendGifts`);
        break;
    }
  }

  /* 回复提问 */
  handlerOnAnsClick(data) {
    this.props.handleUserChange({
      selectUserID: data.associatedMsgID,
      selectUserQuestion: data.associatedMsgQuestion,
    });
    this.toUserID = data.toUserID;
    if (!this.props.isFromMobile) {
      this.onRef.focus();
    }
  }

  /* 图标选择 */
  select(handle, role = 0) {
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    const disablechat = isLiveRoom ? this.props.liveAllNoChatSpeaking : this.state.disablechat;
    if (!this.isTeacher() && disablechat && handle !== 'selectRole' && handle !== 'tosee') {
      return;
    }
    const handlers = {
      tosee: () => {
        this.setState({ roleSelectShow: !this.state.roleSelectShow });
      }, // 看谁消息
      selectRole: () => this.handlerMessageFilter(role), // 看谁消息
      pic: () => {
        this.setState({ imgFlag: this.state.imgFlag + 1 });
      }, // 图片上传
      notalking: () => this.handlerSendAllNoTalk(), // 禁言
      emotion: () => this.handleEmotionClick(this), // 表情
      flowers: () => this.handeSendlFlowers(), // 送花
    };
    (handlers[handle] || (() => {}))();
  }

  /* 看谁消息 */
  handlerMessageFilter(role) {
    const mySelf = SessionRoom.getMyself();
    const { teacherId } = this.props;
    if (!this.isTeacher()) {
      this.setState({ roleSelectShow: false });
    }
    if (this.props.selectChat === 0) {
      // 聊天
      this.setState({ qqFaceShow: false, chatRoleSelectIndex: role });
      // eslint-disable-next-line
      this.props.setChatListFilter(role === 1 ? mySelf.id : role === 2 ? teacherId : 'none');
      const chatObj = {
        msgtype: 'notice',
        fromID: mySelf.id,
        // eslint-disable-next-line
        data: { test: role === 1 ? chatInput.openOnlyme : role === 2 ? chatInput.openAnchor : chatInput.openAllMsg },
        id: new Date().getTime(),
      };
      // this.props.clearChatList();
      this.props.addChatList(chatObj);
    }
    /* else {暂时去掉提问的‘看谁消息’
      // 提问
      this.setState({ qqFaceShow: false, quesRoleSelectIndex: role });
      this.props.setQuestionListFilter(role === 1 ? chatContainerListener.mySelf.id : role === 2 ? teacherId : 'none');

      const msgData = {
        questionMsg: role === 1 ? chatInput.openOnlyme : role === 2 ? chatInput.openAnchor : chatInput.openAllMsg,
        msgtype: 'notice', // 消息类型
      };
      const chatObj = [new Date().getTime(), msgData];
      this.props.setQuestionList(chatObj);
    } */
  }

  /* 禁言 */
  handlerSendAllNoTalk() {
    let isDelMsg = false;
    if (!this.props.liveAllNoChatSpeaking) {
      Signalling.sendSignallingToAllNoChatSpeaking(isDelMsg, { isAllBanSpeak: true });
    } else {
      isDelMsg = true;
      Signalling.sendSignallingToAllNoChatSpeaking(isDelMsg, { isAllBanSpeak: false });
    }
  }

  /* 送花 */
  handeSendlFlowers() {
    const mySelf = SessionRoom.getMyself();
    const { teacherId } = this.props;
    const { serial } = store.getState().classroom.roomInfo;
    if (window.sessionStorage[`${mySelf.id}_CanSendGifts`] === 'true') {
      const teacherInfo = SessionRoom.getUser(teacherId);
      const ajaxData = {
        serial,
        senderid: mySelf.id,
        sendername: mySelf.nickname,
        flowerid: teacherId, // 老师id
        flowername: teacherInfo.nickname, // 老师昵称
        number: SEND_GIFTS_NUM,
      };
      FetchService.sendFlowers(ajaxData).then(() => {
        const data = {
          nickname: mySelf.nickname,
          num: SEND_GIFTS_NUM,
        };
        Signalling.sendSignallingToSendGifts(data);
      });
      window.sessionStorage[`${mySelf.id}_CanSendGifts`] = 'false';
      this.setState({
        canSendGifts: false,
      });
      this._handleSendGiftTimer();
    }
  }

  /* 表情点击 */
  handleEmotionClick() {
    if (!this.props.isFromMobile) {
      this.onRef.focus();
    }
    this.setState({
      qqFaceShow: !this.state.qqFaceShow,
      roleSelectShow: false,
    });
  }

  /* 选择表情 */
  handleFaceOnClick(icon, isMobile = false) {
    if (isMobile) {
      this.setState({
        chatMsg: this.state.chatMsg + icon,
      });
    } else {
      this.onRef.focus();
      this.setState({
        qqFaceShow: false,
        chatMsg: this.state.chatMsg + icon,
      });
    }
  }

  setqqFaceShow() {
    this.setState({
      qqFaceShow: false,
    });
  }

  /* 鼠标离开 隐藏弹框 */
  handleOnMouseLeave() {
    this.setState({
      roleSelectShow: false,
      qqFaceShow: false,
    });
  }

  /* 发送消息 回车发送 */
  handleEditableOnKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this._commonHandleClick();
    } else if (e.ctrlKey && e.keyCode === 86) {
      e.preventDefault();
    }
  }

  /* 发送消息 */
  handleEditableOnButtonClick() {
    this._commonHandleClick();
  }

  /* 表情icon转文字 */
  qqfaceToTxt(source) {
    let _source = source;
    Object.keys(emoticonImg2).forEach(key => {
      _source = _source.replace(new RegExp(key, 'g'), emoticonImg2[key]);
    });
    return _source;
  }

  /* 发送消息 公共方法 */
  _commonHandleClick() {
    const { selectChat } = this.props;
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    if (isLiveRoom && !this.isTeacher() ? this.props.liveAllNoChatSpeaking : this.state.disablechat) {
      return;
    }
    if (!this.state.chatMsg) {
      return;
    }
    if (selectChat === 0 && chatTimer.surplus() > 0 && !this.isTeacher()) {
      const chatObj = {
        msgtype: 'notice',
        data: { test: `${chatInput.textWrong1}${chatTimer.surplus()}${chatInput.textWrong2}` },
        id: new Date().getTime(),
      };
      this.props.addChatList(chatObj);
      return;
    }
    if (selectChat === 1 && questionTimer.surplus() > 0 && !this.isTeacher()) {
      const msgData = {
        questionMsg: `${chatInput.textWrong1}${questionTimer.surplus()}${chatInput.textWrong2}`,
        msgtype: 'notice', // 消息类型
      };
      const chatObj = [new Date().getTime(), msgData];
      this.props.setQuestionList(chatObj);
      return;
    }

    this._handleInputToSend({
      value: this.qqfaceToTxt(this.state.chatMsg),
      msgtype: 'text',
    });

    this.setState({
      chatMsg: '',
    });
  }

  /* 发送图片成功回调 */
  uploadSuccess(res) {
    this._handleInputToSend({
      value: res.swfpath,
      msgtype: 'onlyimg',
    });
  }

  setChatMsg(data) {
    this.setState({
      chatMsg: data.target.value,
    });
  }

  /* 发送消息 todo */
  _handleInputToSend(data) {
    if (data.value && data.value.trim()) {
      const { selectChat, selectUserID, selectUserNickname } = this.props;
      let id;
      if (selectChat === 0) {
        id = this._getDataID('chat_');
      } else if (selectUserID && this.isTeacher()) {
        id = selectUserID;
      } else {
        id = this._getDataID('quiz_');
      }
      const dataToServer = {
        msg: data.value,
        type: selectChat,
        id,
        time: `${toTwo(new Date().getHours())}:${toTwo(new Date().getMinutes())}`,
        toUserID: '',
        toUserNickname: selectUserNickname,
        msgtype: data.msgtype,
        // 由于服务器分服，对sender数据做兼容性处理 , tudo
        sender: {
          id: SessionRoom.getMyself().id,
          role: SessionRoom.getMyself().role,
          nickname: SessionRoom.getMyself().nickname,
        },
      };
      let toId = '';
      let isToSender;
      switch (selectChat) {
        case 0: // 若为chat界面
          if (selectUserID) {
            toId = selectUserID;
            isToSender = true;
            dataToServer.toUserID = selectUserID;
          }
          sendTextMessage(dataToServer, toId, isToSender);
          break;
        case 1: // 若为question界面
          if (selectUserID && this.isTeacher()) {
            // 回复学生提问
            this.props.handleUserChange({ selectUserID: '' });
            dataToServer.toUserID = this.toUserID;
            dataToServer.selectUserQuestion = this.props.selectUserQuestion;
            Signalling.sendSignallingToLiveQuestions(false, dataToServer.id, dataToServer);
          } else if (this.isTeacher()) {
            // 老师发布提问
            dataToServer.hasPassed = true;
            Signalling.sendSignallingToLiveQuestions(false, dataToServer.id, dataToServer);
          } else {
            // 学生发布提问
            toId = '__allSuperUsers';
            isToSender = true;
            dataToServer.hasPassed = false;
            let newQuestionItem = {
              time: dataToServer.time, // 时间
              questionMsg: dataToServer.msg,
              answerMsg: '',
              who: dataToServer.sender.nickname, // 昵称
              fromName: dataToServer.sender.nickname, // 发消息人的昵称
              toUserID: dataToServer.toUserID,
              chatType: dataToServer.type, // 消息类型 暂时没有过
              id: dataToServer.id, // 消息id
              roleNum: dataToServer.sender.role, // 发消息的人的角色
              fromID: dataToServer.sender.id, // 发消息人的id
              msgtype: 'text', // 消息类型
              questionType: 'question', // 问题消息类型 有三种 question pass answer
            };
            this.props.setQuestionList([dataToServer.id, newQuestionItem]);
            sendTextMessage(dataToServer, toId, isToSender);
          }
          break;
        case undefined:
        default:
          break;
      }
    }
  }

  /* 发送消息id */
  _getDataID(type) {
    // let dataID = type + SessionRoom.getMyself().id + '_' + getGUID().getGUIDDate() + getGUID().getGUIDTime()
    // type值为  聊天 chat_    提问 quiz_
    const dataID = `${type + SessionRoom.getMyself().id}_${new Date().getTime()}`;
    return dataID;
  }

  /* 加载表情数组 */
  _loadExpressionArray() {
    const EmoticonArrUI = [];
    for (const i in EmoticonArray) {
      if (Object.prototype.hasOwnProperty.call(EmoticonArray, i)) {
        EmoticonArrUI.push(
          <li key={i} onClick={() => this.handleFaceOnClick(emoticonImg[EmoticonArray[i]], this.props.isFromMobile)}>
            <span>{emoticonImg[EmoticonArray[i]]}</span>
          </li>,
        );
      }
    }
    return EmoticonArrUI;
  }

  /* 处理送花的时间 */
  _handleSendGiftTimer() {
    const mySelf = SessionRoom.getMyself();
    window.clearInterval(this.addFlowerInterval);
    this.addFlowerInterval = window.setTimeout(() => {
      window.sessionStorage[`${mySelf.id}_CanSendGifts`] = 'true';
      this.setState({
        canSendGifts: true,
      });
      window.clearInterval(this.addFlowerInterval);
    }, this.addFlowerTime);
  }

  _initState() {
    const mySelf = SessionRoom.getMyself();
    let canSendGifts;
    if (window.sessionStorage[`${mySelf.id}_CanSendGifts`] === 'false') {
      canSendGifts = false;
      this._handleSendGiftTimer();
    } else {
      window.sessionStorage[`${mySelf.id}_CanSendGifts`] = 'true';
      canSendGifts = true;
    }
    this.setState({
      canSendGifts,
    });
  }

  isTeacher = () => {
    const user = SessionRoom.getMyself() || {};
    return user.role === ROOM_ROLE.TEACHER || user.role === ROOM_ROLE.ASSISTANT;
  };

  render() {
    const chatBtnHandlers = () => {
      return {
        selectFuc: this.select.bind(this),
        handleOnMouseLeave: this.handleOnMouseLeave.bind(this),
        uploadSuccess: this.uploadSuccess.bind(this),
        EmoticonArrUI: this._loadExpressionArray.bind(this),
      };
    };
    return (
      <React.Fragment>
        {this.props.isFromMobile && !this.isTeacher() ? (
          <ChatInputBoxMobile
            {...this.state}
            {...this.props}
            roomInfo={this.props.roomInfo}
            isClassBegin={this.props.isClassBegin}
            selectFuc={this.select.bind(this)}
            EmoticonArrUI={this._loadExpressionArray.bind(this)}
            setqqFaceShow={this.setqqFaceShow.bind(this)}
            setChatMsg={this.setChatMsg.bind(this)}
            handleEditableOnKeyDown={this.handleEditableOnKeyDown.bind(this)}
            _commonHandleClick={this._commonHandleClick.bind(this)}
          />
        ) : (
          <ChatInputDefault
            // eslint-disable-next-line no-return-assign
            onRef={el => (this.onRef = el)}
            {...this.state}
            {...this.props}
            roomInfo={this.props.roomInfo}
            isClassBegin={this.props.isClassBegin}
            accept={this.accept}
            size={this.size}
            isTeacher={this.isTeacher()}
            {...chatBtnHandlers()}
            handleEditableOnKeyDown={this.handleEditableOnKeyDown.bind(this)}
            setChatMsg={this.setChatMsg.bind(this)}
            handleEditableOnButtonClick={this.handleEditableOnButtonClick.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.chat.privateData,
    liveAllNoChatSpeaking: state.chat.liveAllNoChatSpeaking,
    liveChatList: state.chat.liveChatList,
    filterCondition: state.chat.filterCondition,
    teacherId: state.user.teacherId,
    isClassBegin: state.classroom.isClassBegin,
    roomInfo: JSON.stringify(state.classroom.roomInfo),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUserChange: data => {
      Actions.setPrivata(data);
    },
    clearChatList: () => {
      dispatch(Actions.clearChatList());
    },
    addChatList: data => {
      dispatch(Actions.addChatList(data));
    },
    setQuestionList: data => {
      dispatch(Actions.setQuestionList(data));
    },
    setChatListFilter: filterId => {
      Actions.setChatListFilter(filterId);
    },
    setQuestionListFilter: filterId => {
      Actions.setQuestionListFilter(filterId);
    },
    setnameListIsShow: filterId => {
      Actions.setnameListIsShow(filterId);
    },
  };
};

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
