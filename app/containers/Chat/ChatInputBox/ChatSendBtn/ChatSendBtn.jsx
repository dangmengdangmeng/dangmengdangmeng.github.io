/* 聊天区-发送按钮 */
import React, { useState, useEffect } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { Event, SessionRoom, ROOM_ROLE } from '@global/roomConstants';
const { chatSendBtn, question } = YsGlobal.languageInfo.chat;

const ChatSendBtn = props => {
  /* 处理用户属性改变 */
  const myself = SessionRoom.getMyself() || {};
  const [disablechat, setDisableChat] = useState(myself.disablechat);
  useEffect(() => {
    const userPropertiesUpdate = data => {
      const { id, properties } = data;
      const user = SessionRoom.getUser(id);
      if (myself.id === user.id) {
        for (const [key] of Object.entries(properties)) {
          switch (key) {
            case 'disablechat':
              setDisableChat(user.disablechat);
              break;
            default:
              break;
          }
        }
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);
  const { selectChat, liveAllNoChatSpeaking, isTeacher, handleEditableOnButtonClick } = props;
  const { isLiveRoom } = JSON.parse(props.roomInfo);
  const isDisabledChat = (isLiveRoom ? liveAllNoChatSpeaking : disablechat) && !isTeacher;
  const text = myself.role !== ROOM_ROLE.STUDENT ? question.answerStatus : chatSendBtn.subBtn;
  return (
    <button type="button" className="sendBtn" onClick={() => handleEditableOnButtonClick()} disabled={isDisabledChat}>
      {selectChat === 0 ? chatSendBtn.sendBtn : text}
    </button>
  );
};
export default ChatSendBtn;
