import React, { Component } from 'react';
import { Event, SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import ChatInputBtn from './ChatInputBtn/ChatInputBtn';
import ChatSubject from './ChatSubject/ChatSubject';
import ChatSendBtn from './ChatSendBtn/ChatSendBtn';
const { chatSendBtn } = YsGlobal.languageInfo.chat;
const { chatInput, chatSubject } = YsGlobal.languageInfo.chat;
export class ChatInputBoxMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disablechat: false,
    };
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    Event.on('user-properties-update', this.userPropertiesUpdate.bind(this), this.listernerBackupid); // 用户属性改变
  }

  userPropertiesUpdate = data => {
    const { id, properties } = data;
    const user = SessionRoom.getUser(id);
    const myself = SessionRoom.getMyself() || {};
    if (myself.id === user.id) {
      this.setState({
        disablechat: properties.disablechat,
      });
    }
  };

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
  }

  keyboardClick() {
    this.props.setqqFaceShow();
  }

  setPrivatePageIsShow(value) {
    this.props.setnameListIsShow(value);
  }

  privateHandle(id, nickname) {
    this.props.handleUserChange({
      selectUserID: id,
      selectUserNickname: nickname,
    });
  }

  handleInputOnFocus() {
    this.props.setqqFaceShow();
  }

  render() {
    const EmoticonArrUI = this.props.EmoticonArrUI();
    const { selectFuc, selectChat, roleSelectShow, chatRoleSelectIndex } = this.props;
    const myself = SessionRoom.getMyself() || {};
    const isDisabledChat = this.state.disablechat && myself.role === 2;
    const { canChat } = YsGlobal.roomConfigItem;
    const banChatClassName = !canChat && !this.props.isClassBegin && !(myself.role === 0 || myself.role === 1) ? 'ban-chat' : '';
    const { isLiveRoom } = JSON.parse(this.props.roomInfo);
    return (
      <React.Fragment>
        <div className={`chat-input-mobile ${banChatClassName}`}>
          <div className="chat-inputbox">
            {isLiveRoom && selectChat === 0 && (
              <div
                onClick={() => selectFuc('flowers')}
                className={`icon flowers ${isDisabledChat ? 'disabledFlower' : 'yesFlower'} ${this.props.flowersNum > 0 ? '' : 'cur'}`}
                title={chatInput.flowersTitle}
              >
                <span className="flowersNum">{this.props.flowersNum} </span>
              </div>
            )}

            <div className="chat-subject2">
              {isLiveRoom && selectChat === 0 && (
                <div className="privateChat2">
                  {chatInput.toSomeOnem}
                  <label onClick={this.setPrivatePageIsShow.bind(this, true)}>{this.props.selectUserNickname || chatInput.owner}</label>:
                </div>
              )}
              <input
                className="input"
                type="text"
                value={this.props.chatMsg}
                onFocus={this.handleInputOnFocus.bind(this)}
                onChange={e => this.props.setChatMsg(e)}
                maxLength="140"
                placeholder={isDisabledChat ? chatSubject.forbid : chatSubject.maxNumber}
                disabled={isDisabledChat}
                onKeyDown={e => this.props.handleEditableOnKeyDown(e)}
              />
            </div>

            {selectChat === 0 && (
              <React.Fragment>
                <div onClick={() => selectFuc('emotion')} className={`mr12 biaoqing ${this.props.qqFaceShow ? 'hide' : ''}`} title={chatInput.phiz}></div>

                <div
                  onClick={this.keyboardClick.bind(this)}
                  className={`mr12 biaoqinghas ${this.props.qqFaceShow ? '' : 'hide'}`}
                  title={chatInput.keyCode}
                ></div>
              </React.Fragment>
            )}

            {/* 看谁消息 */}
            {isLiveRoom && selectChat === 0 && (
              <div className="tosee-box mr12">
                <div
                  onClick={() => selectFuc('tosee')}
                  className={`icon_kejian_mobileIcon ${chatRoleSelectIndex !== 0 || roleSelectShow ? 'cur' : ''} ${
                    roleSelectShow ? 'in' : ''
                  } cursee${chatRoleSelectIndex}`}
                  disabled={false}
                  title={chatInput.justLook}
                />
                <ul className={roleSelectShow ? 'roleSelect icon-modal' : 'roleSelect icon-modal hide'}>
                  <li className={chatRoleSelectIndex === 0 ? 'active' : ''} onClick={() => selectFuc('selectRole', 0)}>
                    {chatInput.allMsg}
                  </li>
                  <li className={chatRoleSelectIndex === 2 ? 'active' : ''} onClick={() => selectFuc('selectRole', 2)}>
                    {chatInput.onlyAnchor}
                  </li>
                  <li className={chatRoleSelectIndex === 1 ? 'active' : ''} onClick={() => selectFuc('selectRole', 1)}>
                    {chatInput.lookMe}
                  </li>
                </ul>
              </div>
            )}
            {selectChat === 0 && <div className="sendMsg" onClick={() => this.props._commonHandleClick()} />}

            {selectChat !== 0 && (
              <div className="sendQuestionBtn" onClick={() => this.props._commonHandleClick()}>
                {chatSendBtn.sendBtn}
              </div>
            )}
          </div>

          <ul className={`chat-qqFaceBox ${this.props.qqFaceShow ? '' : 'hide'}`}>{EmoticonArrUI}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export class ChatInputDefault extends Component {
  render() {
    // this.props.selectChat !== 2 只有不是上麦tab栏才显示inputBox
    const { canChat } = YsGlobal.roomConfigItem;
    const myself = SessionRoom.getMyself() || {};
    const banChatClassName = !canChat && !this.props.isClassBegin && !(myself.role === 0 || myself.role === 1) ? 'ban-chat' : '';
    return (
      <React.Fragment>
        {!this.props.inputHide && this.props.selectChat !== 2 && !YsGlobal.playback && (
          <div className={`chat-input ${banChatClassName}`} onMouseLeave={() => this.props.handleOnMouseLeave()}>
            <ChatInputBtn {...this.props} />
            <ChatSubject onRef={this.props.onRef} {...this.props} />
            <ChatSendBtn {...this.props} roomInfo={this.props.roomInfo} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ChatInputDefault;
