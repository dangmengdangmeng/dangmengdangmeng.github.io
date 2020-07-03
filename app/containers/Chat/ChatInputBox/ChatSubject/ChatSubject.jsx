/* 聊天区-输入框 */
import React, { useEffect, useState } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { Event, SessionRoom } from '@global/roomConstants';
import { connect } from 'react-redux';
const { chatSubject } = YsGlobal.languageInfo.chat;
const ChatSubjectC = props => {
  const { selectUserID, chatMsg, handleEditableOnKeyDown, selectChat, selectUserNickname, isTeacher } = props;
  const myself = SessionRoom.getMyself() || {};
  const [disablechat, setDisableChat] = useState(myself.disablechat);
  /* 处理用户属性改变 */
  useEffect(() => {
    const userPropertiesUpdate = data => {
      const { id, properties } = data;
      const user = SessionRoom.getUser(id);
      if (myself.id === user.id) {
        for (const [key, value] of Object.entries(properties)) {
          switch (key) {
            case 'disablechat':
              setDisableChat(value);
              break;
            default:
              break;
          }
        }
        // setDisableChat(user.disablechat);
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);
  const isDisabledChat = disablechat && !isTeacher;
  return (
    <div className="chat-subject">
      <div className={`privateChat${selectChat === 0 && selectUserID !== '' ? '' : ' hide'}`}>
        {chatSubject.onGoing}&nbsp;
        <label className="label_user">{selectUserNickname}</label>
        &nbsp;{chatSubject.private}：
      </div>
      <textarea
        className={`inputContentEditable${selectChat === 0 && selectUserID !== '' ? ' mt' : ''}`}
        style={{ fontSize: `${props.fontSize / 100}rem` }}
        value={chatMsg}
        onChange={e => props.setChatMsg(e)}
        maxLength="140"
        ref={props.onRef}
        placeholder={isDisabledChat ? chatSubject.forbid : chatSubject.maxNumber}
        disabled={isDisabledChat}
        onKeyDown={e => handleEditableOnKeyDown(e)}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.chat.fontData.nowFont,
  };
};

// 连接组件
export default connect(mapStateToProps)(ChatSubjectC);
