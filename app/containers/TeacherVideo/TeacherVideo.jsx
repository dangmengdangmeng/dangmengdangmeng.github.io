import React from 'react';
import { connect } from 'react-redux';
import { SessionRoom, ROOM_ROLE } from '@global/roomConstants';
import VideoService from '@global/services/VideoService';
import GlobalControlBtn from '@containers/GlobalControlBtn/GlobalControlBtn';
import TeacherBaseVideo from './TeacherBaseVideo/TeacherBaseVideo';
import { videoDragHOC } from '../../components/video/videoDragHOC';
import { videoResizeHOC } from '../../components/video/videoResizeHOC';
import './teacherVideo.scss';

const TeacherVideo = props => {
  const {
    isVideoLayout,
    doubleVideoId,
    isClassBegin,
    studentStreamListLength,
    teacherId,
    onetoone,
    videoDragProps = {},
    videoSizeProps = {},
    isFullScreen,
    roomInfo,
  } = props;
  const { maxVideo, isLiveRoom, videowidth, videoheight } = JSON.parse(roomInfo);
  const scale = Number(videowidth) / Number(videoheight);
  const scaleClassName = Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? 'four-to-three' : 'sixteen-to-nine';
  const mySelf = SessionRoom.getMyself() || {};
  const { dragSource, videoDrag = {}, videoDragStyle = {} } = videoDragProps;
  const { mouseMove, mouseDown, videoResizeStyle = {} } = videoSizeProps;
  const isTeacher = mySelf.role === ROOM_ROLE.TEACHER || mySelf.role === ROOM_ROLE.ASSISTANT;
  const doubleClickVideo = () => {
    // 课件全屏不能双击
    const canDoubleClick = isClassBegin && !isFullScreen && isTeacher;
    if (!canDoubleClick || onetoone || isLiveRoom || (!isLiveRoom && maxVideo === 2)) {
      return;
    }
    VideoService.handleDoubleClickVideo(teacherId, videoDrag.isDrag);
  };

  const setVideoStyle = () => {
    if (isVideoLayout) {
      // 视频布局时，样式由父元素类名控制
      return {};
    }
    if (doubleVideoId && doubleVideoId === teacherId) {
      // 双击视频全屏时，计算视频高度
      // return VideoService.setDoubleVideoHeight(doubleVideoId, studentStreamListLength);
      return {};
    }
    return Object.assign({}, videoDragStyle, videoResizeStyle);
  };

  const doubleVideoClassName = doubleVideoId && doubleVideoId === teacherId ? `full-screen-video` : '';
  return (
    <div
      id={`baseVideoBox_${teacherId}`}
      ref={dragSource}
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
      onDoubleClick={doubleClickVideo}
      className={`teacher-video-box ${scaleClassName} ${doubleVideoClassName} ${maxVideo === 2 ? 'onlyOne' : ''}`}
      style={setVideoStyle()}
    >
      {isClassBegin && maxVideo !== 2 && !isLiveRoom && isTeacher && !isVideoLayout && <GlobalControlBtn distinction="top" />}
      <TeacherBaseVideo doubleVideoClassName={doubleVideoClassName} onetoone={onetoone} />
    </div>
  );
};

const mapStateToProps = state => ({
  isClassBegin: state.classroom.isClassBegin,
  doubleVideoId: state.video.doubleVideoId,
  videoDragInfo: state.video.videoDragInfo,
  streamInfo: state.video.teacherUserStream,
  isVideoLayout: state.classroom.isVideoLayout,
  studentStreamListLength: state.video.studentStreamList.length,
  teacherId: state.user.teacherId,
  isFullScreen: state.whiteboard.isFullScreen,
  roomStatus: state.classroom.roomStatus,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(videoResizeHOC(videoDragHOC(TeacherVideo)));
