import React, { Component } from 'react';
import store from '@app/store';
import { Event } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import ChatItemRecord from './components/ChatItemRecord';
import ChatItemImg from './components/ChatItemImg';
import ChatItemNotice from './components/ChatItemNotice';

class ChatItem extends Component {
  headerNameClick = () => {
    const chatMsgData = this.props.contents || {};
    const { banPrivateChat } = YsGlobal.roomConfigItem;
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    if (chatMsgData.isMe || !isLiveRoom || banPrivateChat) return;

    /* 点击用户名称 私聊 */
    const selectUserID = chatMsgData.fromID;
    const selectUserNickname = chatMsgData.fromName;
    const users = this.props.userListArr;
    let flag = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === selectUserID) {
        flag = true;
        this.props.handleUserChange({
          selectUserID,
          selectUserNickname,
        });
        break;
      }
    }
    if (!flag) {
      const data = {};
      const userArr = [];
      data.id = selectUserID;
      data.nickname = selectUserNickname;
      userArr.push(data);
      this.props.handleUserChange({
        selectUserID,
        selectUserNickname,
        userListArr: userArr,
      });
    }
  };

  // 加载完成 通知容器组件更新 滚动条置底
  onLoads = () => {
    Event.trigger('chatScrollChange');
  };

  render() {
    const { contents: item, index } = this.props;
    return (
      <React.Fragment>
        <li className="chat-item-warp">
          {item.msgtype === 'text' ? <ChatItemRecord contents={item} index={index} headerNameClick={this.headerNameClick} onLoads={this.onLoads} /> : null}
          {item.msgtype === 'onlyimg' ? <ChatItemImg contents={item} index={index} headerNameClick={this.headerNameClick} onLoads={this.onLoads} /> : null}
          {item.msgtype === 'notice' ? <ChatItemNotice contents={item} index={index} onLoads={this.onLoads} /> : null}
        </li>
      </React.Fragment>
    );
  }
}
export default ChatItem;
