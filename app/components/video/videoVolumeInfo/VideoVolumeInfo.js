import React, { useState, useEffect } from 'react';
import { Event, SessionRoom } from '@global/roomConstants';
import './videoVolumeInfo.scss';
import { YsGlobal } from '@global/handleGlobal';

const VideoVolumeInfo = props => {
  const { audioFlag, userId } = props;
  const [volumeWidth, setVolumeWidth] = useState(0);

  useEffect(() => {
    const volumeChange = volumeInfoArr => {
      const volumeInfo = volumeInfoArr.find(item => item.stream.getUserId() === userId);
      if (volumeInfo) {
        const volumeNum = volumeInfo.volume;
        setVolumeWidth(volumeNum * 2 + 10 /* (0.3 * (volumeNum / 100) + Math.ceil(volumeNum / 20) * 0.06) * 4 */);
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('stream-volume-indicator', volumeChange, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [userId]);
  const user = SessionRoom.getUser(userId) || {};
  return (
    <div className="video-info-box">
      <span className="user-name">{user.nickname}</span>
      {!(YsGlobal.isSafari && YsGlobal.isMobile) && (
        <div className="volume-box">
          <span className={`volume-icon ${!audioFlag ? 'volume-close' : ''}`} />
          <div className="volume-bar-down">
            <div className="volume-bar-item"></div>
            <div className="volume-bar-item"></div>
            <div className="volume-bar-item"></div>
            <div className="volume-bar-up" style={{ width: `${volumeWidth}%` }}>
              <div className="volume-up-container">
                <div className="volume-bar-item"></div>
                <div className="volume-bar-item"></div>
                <div className="volume-bar-item"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoVolumeInfo;
