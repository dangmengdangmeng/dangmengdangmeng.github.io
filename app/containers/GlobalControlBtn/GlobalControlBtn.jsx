import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import UserService from '@global/services/UserService';
import Actions from '@global/actions';
import { SessionRoom } from '@global/roomConstants';
import Icon from '@components/Icon';

const GlobalControlBtn = props => {
  const { liveAllNoChatSpeaking, videoDragInfo, distinction, isClassBegin, isVideoLayout } = props;

  const { userListInner } = YsGlobal.languageInfo;
  const [showBans, setShowBans] = useState(true);
  useEffect(() => {
    setShowBans(!isVideoLayout);
  }, [isVideoLayout]);

  // 全体禁言
  const banWord = () => {
    Signalling.sendSignallingToAllNoChatSpeaking(liveAllNoChatSpeaking, { isAllBanSpeak: !liveAllNoChatSpeaking });
  };

  // 给所有人奖杯
  const giveAllCup = () => {
    if (isClassBegin) {
      const roomUsers = SessionRoom.getUsers() || {};
      for (const user of Object.values(roomUsers)) {
        if (user.role !== 0 && user.role !== 1 && user.publishstate !== 0) {
          UserService.sendUserGift(user);
        }
      }
    }
  };

  // 全部恢复
  const recovery = () => {
    if (isClassBegin) {
      for (const value of Object.values(videoDragInfo)) {
        Actions.deleteVideoDragInfo(value.userId);
        Signalling.sendVideoAttribute({}, value.userId, true);
      }
    }
  };

  return (
    <div className={`BanChat ${distinction === 'bottom' && showBans ? '' : 'short'}`}>
      <div className="ban-chat-container">
        <Icon title={userListInner.button.trophy.title} onClick={giveAllCup} type="gift"/>
        <Icon title={userListInner.button.restoreDrag.title} onClick={recovery} type="undo"/>
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(GlobalControlBtn);
