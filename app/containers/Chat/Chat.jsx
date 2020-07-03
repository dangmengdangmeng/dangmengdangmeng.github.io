import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '@containers/Chat/state/actions';
import ChatContainer from './ChatContainer/ChatContainer';
import QuestionAndAnswer from './QuestionAndAnswer/QuestionMsgList';
import ChatInputBox from './ChatInputBox/ChatInputBox';

import './static/Sass/chat.scss';
const ChatBox = props => {
  const { isFromMobile, selectChat, selectMobileChat } = props;

  return (
    <div className={`chat-container${isFromMobile ? ' mobile-chat' : ''}`}>
      {isFromMobile ? (
        <React.Fragment>
          {selectMobileChat === 0 && <ChatContainer isShow noticeNotShow />}
          {selectMobileChat === 1 && <QuestionAndAnswer isShow />}
          <ChatInputBox {...props} selectChat={selectMobileChat} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ChatContainer isShow={selectChat === 0} />
          <QuestionAndAnswer isShow={selectChat === 1} />
          <ChatInputBox {...props} />
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({ chat, classroom, video }) => {
  return {
    selectChat: chat.selectChat,
    isClassBegin: classroom.isClassBegin,
    videoLen: video.studentStreamList.length + 1, // 学生视频长度 + 1个老师的视频
  };
};

const mapDispatchToProps = () => {
  return {
    setChatIndex: index => {
      Actions.setChatIndex(index);
      Actions.setPrivata({ selectUserID: '' });
    },
  };
};

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
