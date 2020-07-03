import React from 'react';
import { SessionRoom } from '@global/roomConstants';
import './NoMic.scss';
import { YsGlobal } from '@global/handleGlobal';
const { noMicType, noMac } = YsGlobal.languageInfo.video;
const NoMic = props => {
  const { userId, afail, hasaudio } = props;
  const user = SessionRoom.getUser(userId) || {};
  return (
    <div className="video-info-box">
      <span className="user-name">{user.nickname}</span>
      {!(YsGlobal.isSafari && YsGlobal.isMobile) && (
        <div className="volume-box mic-width">
          {!hasaudio && <div className="nomac">{noMac}</div>}
          {hasaudio && !!afail && <div className="nomac">{`${noMicType[afail]}`}</div>}
        </div>
      )}
    </div>
  );
};

export default NoMic;
