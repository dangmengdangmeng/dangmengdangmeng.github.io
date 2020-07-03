import React from 'react';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import TeacherVideo from './TeacherVideo';
import './teacherVideo.scss';

const TeacherVideoContainer = props => {
  const { isVideoLayout, studentStreamListLength, onetoone, isExchangeOne2oneLayout, isFoldedOne2oneLayout, videoDragProps = {}, isFullScreen } = props;
  const { videowidth, videoheight } = JSON.parse(props.roomInfo);
  const scale = Number(videowidth) / Number(videoheight);
  const scaleClassName = Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? 'four-to-three' : 'sixteen-to-nine';
  const { videoDrag = {} } = videoDragProps;

  const toggleFoldVideo = () => {
    Actions.exchangeOne2oneVideoLayout(isExchangeOne2oneLayout, !isFoldedOne2oneLayout);
  };

  const isTopRightPosition = onetoone === 'nested' && !isVideoLayout && isExchangeOne2oneLayout;
  return (
    <div
      className={`${videoDrag.isDrag && isFullScreen ? '' : 'placeholder-bg'} ${scaleClassName} ${isTopRightPosition ? 'topright' : ''} ${
        isTopRightPosition && isFoldedOne2oneLayout ? 'topright-folded' : ''
      }`}
    >
      <TeacherVideo />
      {onetoone === 'nested' && !isVideoLayout && studentStreamListLength === 1 && isExchangeOne2oneLayout && (
        <div className={`foldedvideoBtn-box ${isFoldedOne2oneLayout ? 'folded' : 'unfold'}`}>
          <span className={`flodedvideoBtn ${isFoldedOne2oneLayout ? 'folded' : 'unfold'}`} onClick={toggleFoldVideo.bind(this)}></span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isVideoLayout: state.classroom.isVideoLayout,
  studentStreamListLength: state.video.studentStreamList.length,
  isExchangeOne2oneLayout: state.classroom.isExchangeOne2oneLayout,
  isFoldedOne2oneLayout: state.classroom.isFoldedOne2oneLayout,
  isFullScreen: state.whiteboard.isFullScreen,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherVideoContainer);
