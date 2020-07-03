import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
// import UserService from '@global/services/UserService';
import Actions from '@global/actions';
import { getSendTime } from '@containers/Chat/utils';
import { Event } from '@global/roomConstants';
import Icon from '@components/Icon';
import './BanAudio.scss';
const BanAudio = props => {
  const { isClassBegin, addChatList, isAllNoAudio } = props;

  const { userListInner } = YsGlobal.languageInfo;
  useEffect(() => {
    const handlePubMsg = pubMsgData => {
      const { name, ts } = pubMsgData;
      if (name === 'LiveAllNoAudio') {
        const test = userListInner.button.audio.on.title;
        const chatObj = {
          time: getSendTime(YsGlobal.playback, ts),
          msgtype: 'notice',
          data: {
            test,
          },
          id: new Date().getTime(),
        };
        addChatList(chatObj);
      }
    };
    const handleDelMsg = delMsgData => {
      const { name, ts } = delMsgData;
      if (name === 'LiveAllNoAudio') {
        const test = userListInner.button.audio.off.title;
        const chatObj = {
          time: getSendTime(YsGlobal.playback, ts),
          msgtype: 'notice',
          data: {
            test,
          },
          id: new Date().getTime(),
        };
        addChatList(chatObj);
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    Event.on('recv-del-msg', handleDelMsg, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 全体禁音
  const banAudio = () => {
    Signalling.sendSignallingToAllNoAudio(isAllNoAudio);
  };

  return (
    <React.Fragment>
      <li
        onClick={banAudio}
        className={`footer-icon ${isClassBegin === '' ? 'disabled' : ''}`}
        title={!isAllNoAudio ? userListInner.button.audio.on.title : userListInner.button.audio.off.title}
      >
        <Icon title={!isAllNoAudio ? userListInner.button.audio.on.title : userListInner.button.audio.off.title} type="microphone" warn={isAllNoAudio}/>
      </li>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    ...state.chat.privateData,
    liveAllNoChatSpeaking: state.chat.liveAllNoChatSpeaking,
    userListData: state.user.userList,
    videoDragInfo: state.video.videoDragInfo,
    isClassBegin: state.classroom.isClassBegin,
    isVideoLayout: state.classroom.isVideoLayout,
    isAllNoAudio: state.classroom.isAllNoAudio,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChatList: data => {
      dispatch(Actions.addChatList(data));
    },
  };
};

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(BanAudio);
