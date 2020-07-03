import React from 'react';
import { SessionRoom, PUBLISH_STATE } from '@global/roomConstants';
import './videoBackGround.scss';
import { YsGlobal } from '@global/handleGlobal';

const { video } = YsGlobal.languageInfo;
const VideoBackGround = props => {
  const { publishstate, teacherId } = props;
  const setBg = () => {
    if (publishstate === PUBLISH_STATE.AUDIOONLY || publishstate === PUBLISH_STATE.MUTEALL) {
      return 'teacher-close-camera';
    }
    return 'teacher-placeholder-bg';
  };
  const mySelf = SessionRoom.getMyself() || {};
  return (
    <div className={`video-bg ${setBg()}`}>{teacherId && !publishstate && mySelf.role !== 0 && <span className="reminder">{video.videoReminder}</span>}</div>
  );
};
export default React.memo(VideoBackGround);
