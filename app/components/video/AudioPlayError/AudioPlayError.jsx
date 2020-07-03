import React, { useEffect, useState } from 'react';
import { Event, SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import './AudioPlayError.scss';

const {
  video: { audioPlayErr1, audioPlayErrReload, audioPlayErr2 },
} = YsGlobal.languageInfo;
const CHAT_AUDIO = 'chatAudio';
const AudioPlayError = props => {
  const { audioStream } = props;
  const { streamUserId, audioFlag } = audioStream;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const audioPlayError = data => {
      const { userId } = data;
      if (userId === streamUserId) {
        setShow(true);
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('audio-play-error', audioPlayError, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [streamUserId]);

  const handleReloadAudio = () => {
    if (streamUserId && audioFlag) {
      SessionRoom.resumeAudio(streamUserId);
    }
    setShow(false);
  };

  return (
    <div className="audio-play-error" style={{ display: show ? 'flex' : 'none' }}>
      {audioPlayErr1}
      <button className="audio-play-reload" onClick={handleReloadAudio}>
        {audioPlayErrReload}
      </button>
      {audioPlayErr2}
    </div>
  );
};

export default AudioPlayError;
