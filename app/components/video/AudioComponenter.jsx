import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Event, SessionRoom } from '@global/roomConstants';

const CHAT_AUDIO = 'chatAudio';
const AudioComponenter = props => {
  const { audioStream, volume } = props;
  const { streamUserId, audioFlag } = audioStream;

  useEffect(() => {
    return () => {
      if (streamUserId) {
        SessionRoom.unplayAudio(streamUserId);
      }
    };
  }, [streamUserId]);

  useEffect(() => {
    const myUserId = SessionRoom.getMyself().id || undefined;
    if (streamUserId !== myUserId) {
      if (audioFlag) {
        SessionRoom.playAudio(streamUserId, {}, playError => {
          if (playError && playError.errflag === 'NOT_ALLOWED_ERROR') {
            Event.trigger('audio-play-error', {
              userId: streamUserId,
            });
          }
        });
      } else {
        // eslint-disable-next-line no-unused-expressions
        streamUserId && SessionRoom.unplayAudio(streamUserId);
      }
    }
  }, [audioFlag, volume, streamUserId]);

  return <div className="chat-audio" id={`${CHAT_AUDIO}_${streamUserId}`} />;
};
AudioComponenter.propTypes = {
  audioStream: PropTypes.object, // 用户流信息
  volume: PropTypes.number, // 播放音量值。取值区间[0,100]，初始值为100
};
AudioComponenter.defaultProps = {
  volume: 100,
};
export default AudioComponenter;
