import React from 'react';
import { WB_CONTAINER_ID } from '@global/roomConstants';
import { connect } from 'react-redux';
import DeskTopSharing from '@containers/ShareSmart/deskTopSharing/DeskTopSharing'; // 共享
import { YsGlobal } from '@global/handleGlobal';
import RaiseHand from '@containers/RaiseHand/RaiseHand';
import NavBar from '@containers/NavBar/NavBar';
import BaseWhiteboard from './BaseWhiteboard';

const MainWhiteboardSmart = props => {
  const { isShowWhiteBoardLay, isMp4AllFull } = props;
  const mobileIsfullScreen = isMp4AllFull ? 'mp4-full-screen' : '';
  const { isMoreWhiteboard } = YsGlobal.roomConfigItem;
  const { maxVideo } = JSON.parse(props.roomInfo);
  return (
    <div id={WB_CONTAINER_ID} className={`white-board-outer-layout ${mobileIsfullScreen} ${isMoreWhiteboard ? 'isMoreWhiteboard' : ''}`}>
      <BaseWhiteboard />
      {<DeskTopSharing />}
      {!YsGlobal.playback && <NavBar />}
      <div className="white-board-lay" style={{ display: `${isShowWhiteBoardLay ? 'block' : 'none'}` }} />
      {maxVideo > 2 && <RaiseHand />}
    </div>
  );
};

const mapStateToProps = state => ({
  isShowWhiteBoardLay: state.whiteboard.isShowWhiteBoardLay,
  isMp4AllFull: state.Modules.isMp4AllFull,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainWhiteboardSmart);
