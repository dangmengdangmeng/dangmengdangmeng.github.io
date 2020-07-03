import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SessionRoom, Event, ROOM_ROLE } from '@global/roomConstants';
import Actions from '@global/actions';
import Signalling from '@global/services/SignallingService';
import VideoService from '@global/services/VideoService';
import { YsGlobal } from '@global/handleGlobal';
import VideoBackGround from '../../components/video/VideoBackGround/VideoBackGround';
import VideoComponenter from '../../components/video/VideoComponenter';
import AudioComponenter from '../../components/video/AudioComponenter';
import OtherVideoBtn from './OtherVideoBtn/OtherVideoBtn';
import VideoVolumeInfo from '../../components/video/videoVolumeInfo/VideoVolumeInfo';
import NoMic from '../../components/video/NoMic/NoMic';
import NoVideo from '../../components/video/NoVideo/NoVideo';
import VideoUserPen from '../../components/video/VideoUserPen/VideoUserPen';
import AudioPlayError from '../../components/video/AudioPlayError/AudioPlayError';
import Gift from './Gift/Gift';
import { videoDragHOC } from '../../components/video/videoDragHOC';
import { videoResizeHOC } from '../../components/video/videoResizeHOC';

import './studentVideo.scss';

const StudentVideo = props => {
  const {
    streamInfo,
    isClassBegin,
    isVideoMirror,
    isVideoLayout,
    doubleVideoId,
    focusVideoId,
    videoDragProps = {},
    videoSizeProps = {},
    onetoone,
    roomInfo,
    total,
    orderIndex,
  } = props;
  const { maxVideo, videowidth, videoheight, isClassRoom, isLiveRoom } = JSON.parse(roomInfo);
  const { dragSource, videoDrag = {}, videoDragStyle = {} } = videoDragProps;
  const { mouseMove, mouseDown, videoResizeStyle = {} } = videoSizeProps;
  const mySelfInfo = SessionRoom.getMyself() || {};
  const user = SessionRoom.getUser(streamInfo.streamUserId) || {};
  const { afail: aFail, hasaudio: hasAudio } = user;
  const [draw, setDraw] = useState(user.candraw);
  const [raiseHand, setRaiseHand] = useState(false);
  const [giftnumber, setGiftNumber] = useState(user.giftnumber || 0);
  const [afail, setAfail] = useState(aFail);
  const [hasaudio, setHasaudio] = useState(hasAudio !== undefined ? hasAudio : true);
  const scale = Number(videowidth) / Number(videoheight);
  const [compelVideoMirror, setCompelVideoMirror] = useState(user.isVideoMirror);
  useEffect(() => {
    return () => {
      if (doubleVideoId === streamInfo.streamUserId) {
        // 视频全屏还原
        Actions.setDoubleVideoId('');
        Signalling.sendSignallingDoubleClickVideo({}, undefined, true);
      }
    };
  }, [doubleVideoId, streamInfo.streamUserId]);

  useEffect(() => {
    /* 处理用户属性改变 */
    const userPropertiesUpdate = data => {
      const { properties, id } = data;
      if (id === streamInfo.streamUserId) {
        for (const [key, value] of Object.entries(properties)) {
          switch (key) {
            case 'candraw':
              setDraw(value);
              break;
            case 'giftnumber':
              setGiftNumber(value);
              break;
            case 'raisehand':
              setRaiseHand(value);
              break;
            case 'afail':
              setAfail(value);
              break;
            case 'hasaudio':
              setHasaudio(value);
              break;
            case 'isVideoMirror':
              setCompelVideoMirror(value);
              break;
            default:
              break;
          }
        }
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamInfo.streamUserId]);

  const doubleClickVideo = () => {
    const canDoubleClick = isClassBegin && [0, 1].includes(mySelfInfo.role);
    if (!canDoubleClick || onetoone || isLiveRoom || (!isLiveRoom && maxVideo === 2)) {
      return;
    }
    VideoService.handleDoubleClickVideo(streamInfo.streamUserId, videoDrag.isDrag);
  };

  const setVideoStyle = () => {
    if (isVideoLayout) {
      // 视频布局时，样式由父元素类名控制
      return {};
    }
    if (doubleVideoId === streamInfo.streamUserId) {
      // 双击视频全屏时，计算视频高度
      // return VideoService.setDoubleVideoHeight(doubleVideoId, studentStreamListLength);
      return {};
    }
    return Object.assign({}, videoDragStyle, videoResizeStyle);
  };
  const hasOtherVideoBtn = (mySelfInfo.role === 0 || mySelfInfo.role === 1) && user.role !== 1;
  const scaleClassName = Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? 'four-to-three' : 'sixteen-to-nine';
  const doubleVideoClassName = doubleVideoId === streamInfo.streamUserId ? `full-screen-video` : '';
  const focusVideoName = focusVideoId === streamInfo.streamUserId ? `focus-video` : '';

  const videoFit = focusVideoName || doubleVideoClassName ? 'contain' : 'cover';

  const showNoMic = (_hasaudio, _afail) => {
    if (!_hasaudio) {
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      // 安卓的情况，hasaudio是true,就不用了考虑了
      if (_afail === undefined) {
        return false;
      }
      return !!_afail;
    }
  };
  const configVideoMirror = YsGlobal.roomConfigItem.isVideoMirror;
  const propsVideoMirror = configVideoMirror ? compelVideoMirror : isVideoMirror;
  // 计算平铺布局，谁是最后一行
  const computedLastRow = length => {
    const box = [];
    if (length < 3) {
      return box;
    }
    let row = 3;
    let line = 0;
    if (length >= 9) {
      line = Math.ceil(length / row);
      const other = line * (row - 1);
      let n = other;
      while (n < length) {
        n += 1;
        box.push(n);
      }
    } else if (length === 3) {
      box.push(2, 3);
    } else if (length === 5) {
      box.push(3, 4, 5);
    } else {
      row = 2;
      line = Math.ceil(length / row);
      const other = line * (row - 1);
      let n = other;
      while (n < length) {
        n += 1;
        box.push(n);
      }
    }
    return box;
  };
  return (
    <div
      id={`baseVideoBox_${streamInfo.streamUserId}`}
      ref={dragSource}
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
      onDoubleClick={doubleClickVideo}
      className={`student-video video-Layout ${doubleVideoClassName} ${focusVideoName} ${!isVideoLayout && !focusVideoId && maxVideo === 2 ? 'onlyOne' : ''} 
      ${computedLastRow(total).includes(orderIndex) && isVideoLayout ? 'last-row' : ''}`}
      style={setVideoStyle()}
    >
      <div className={`base-video ${scaleClassName}`}>
        {isClassBegin && <NoVideo userId={streamInfo.streamUserId} />}
        <VideoBackGround publishstate={streamInfo.publishstate} />
        <VideoComponenter videoStream={streamInfo} isVideoMirror={propsVideoMirror} videoFit={videoFit} />
        {isClassBegin && <VideoUserPen userId={streamInfo.streamUserId} />}
        {!!raiseHand && <em className={`iconfont icon-hand ${draw ? 'has-draw' : ''}`}></em>}
        <AudioComponenter audioStream={streamInfo} />
        {isClassRoom && user.role === 2 && <Gift giftnumber={giftnumber} />}
        {hasOtherVideoBtn && (
          <OtherVideoBtn roomInfo={roomInfo} streamInfo={streamInfo} draw={draw} hasVideoRestoreBtn={videoDrag.isDrag} onetoone={onetoone} />
        )}
        {!showNoMic(hasaudio, afail) && <VideoVolumeInfo isClassBegin={isClassBegin} audioFlag={streamInfo.audioFlag} userId={streamInfo.streamUserId} />}
        {showNoMic(hasaudio, afail) && <NoMic isClassBegin={isClassBegin} userId={streamInfo.streamUserId} afail={afail} hasaudio={hasaudio} />}
        {!YsGlobal.playback && <AudioPlayError audioStream={streamInfo} />}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  isClassBegin: state.classroom.isClassBegin,
  isVideoMirror: state.common.isVideoMirror,
  videoDragInfo: state.video.videoDragInfo,
  isVideoLayout: state.classroom.isVideoLayout,
  studentStreamListLength: state.video.studentStreamList.length,
  doubleVideoId: state.video.doubleVideoId,
  isAllNoAudio: state.classroom.isAllNoAudio,
  focusVideoId: state.video.focusVideoId,
  teacherId: state.user.teacherId,
  roomStatus: state.classroom.roomStatus,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(videoResizeHOC(videoDragHOC(StudentVideo)));
