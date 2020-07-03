import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import './videoComponent.scss';

// const { video } = YsGlobal.languageInfo;

const CHAT_VIDEO = 'chatVideo';
const VideoComponenter = props => {
  const { videoStream, isVideoMirror, videoFit } = props;
  const { streamUserId, videoFlag, publishstate } = videoStream;
  useEffect(() => {
    return () => {
      if (streamUserId) {
        SessionRoom.unplayVideo(streamUserId);
      }
    };
  }, []);

  useEffect(() => {
    if (streamUserId) {
      if (videoFlag) {
        SessionRoom.playVideo(streamUserId, `${CHAT_VIDEO}_${streamUserId}`, { fit: videoFit, loader: false });
      } else if (videoFlag === false) {
        SessionRoom.unplayVideo(streamUserId);
      }
    }
  }, [streamUserId, videoFit, videoFlag]);

  const hasLoading = publishstate === 3 || publishstate === 2;
  const myself = SessionRoom.getMyself() || {};
  const configVideoMirror = YsGlobal.roomConfigItem.isVideoMirror;
  const VideoMirror = !configVideoMirror ? isVideoMirror && myself.id === streamUserId : isVideoMirror;
  return (
    <div className={`chat-video ${VideoMirror ? 'video-mirror' : ''}`} id={`${CHAT_VIDEO}_${streamUserId}`}>
      {hasLoading && <span className="video-loading" />}
    </div>
  );
};
VideoComponenter.propTypes = {
  videoStream: PropTypes.object, // 用户流信息
  videoFit: PropTypes.string, // 'cover'|'contain', 剪裁参数
};
VideoComponenter.defaultProps = {
  videoFit: 'cover',
};
export default VideoComponenter;
