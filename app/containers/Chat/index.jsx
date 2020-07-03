import React, { Fragment } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import Actions from '@global/actions';
import Chat from './Chat';
import ClassNotice from './ClassNotice/ClassNotice';
import chatContainerListener from './ChatContainer/ChatContainerListener';
import questionsListener from './QuestionAndAnswer/QuestionsListener';
const { chat: lang } = YsGlobal.languageInfo;

chatContainerListener.getInstance();
questionsListener.getInstance();
// 导出聊天模块
export function MobileChat(props) {
  return (
    <Fragment>
      <Chat selectMobileChat={0} isFromMobile {...props} />
    </Fragment>
  );
}

// 导出提问模块
export function MobileChatQusetions(props) {
  return (
    <Fragment>
      <Chat selectMobileChat={1} isFromMobile {...props} />
    </Fragment>
  );
}
// chat窗口
export function ChatWindow(props) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        {props.selectChat === 0 ? lang.chatWindowTitle : lang.chatTitleBoxInner.ask}
        <span onClick={() => Actions.setModuleStatus('chat', '')} className="countdown-close">
          ×
        </span>
      </div>
      <Chat {...props} />
    </div>
  );
}
export default ChatWindow;
export { ClassNotice, ChatWindow as Chat };
// export default MobileChat;
