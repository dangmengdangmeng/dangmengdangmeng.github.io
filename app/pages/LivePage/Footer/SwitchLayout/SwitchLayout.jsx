import React, { useEffect } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import Actions from '@global/actions';
import { Event, SessionRoom } from '@global/roomConstants';
import { connect } from 'react-redux';
import Signalling from '@global/services/SignallingService';
import { exitFullscreen } from '@utils/ysUtils';
import Icon from '@components/Icon';
import store from '@app/store';
const { footer } = YsGlobal.languageInfo;

const SwitchLayout = props => {
  const { isVideoLayout, videoDragInfo, screenShare } = props;
  const switchLayout = () => {
    if (!isVideoLayout) {
      for (const value of Object.values(videoDragInfo)) {
        Actions.deleteVideoDragInfo(value.userId);
        Signalling.sendVideoAttribute({}, value.userId, true);
      }
      Actions.setDoubleVideoId('');
      Signalling.sendSignallingDoubleClickVideo({}, undefined, true);
    }
    Actions.setVideoLayout(!isVideoLayout);
    Actions.setFocusVideoId('');
    const { isMettingRoom, maxVideo } = store.getState().classroom.roomInfo;
    const data = { roomLayout: !isVideoLayout ? 'videoLayout' : 'aroundLayout' };
    const isDel = isMettingRoom ? !isVideoLayout : isVideoLayout;
    Signalling.sendSignallingSetRoomLayout(data, isDel);
    if (maxVideo === 2) {
      Actions.exchangeOne2oneVideoLayout(false);
    }
  };

  const setRoomLayout = handleData => {
    const { name, data } = handleData;
    if (name === 'SetRoomLayout') {
      exitFullscreen();
      Actions.setIsFullscreen(false);
      if (data.roomLayout === 'videoLayout') {
        Actions.setVideoLayout(true);
        Actions.setFocusVideoId('');
      } else if (data.roomLayout === 'focusLayout') {
        Actions.setVideoLayout(true);
        Actions.setFocusVideoId(data.focusVideoId);
      } else if (data.roomLayout === 'aroundLayout') {
        Actions.setVideoLayout(false);
      }
      const { maxVideo } = store.getState().classroom.roomInfo;
      if (maxVideo === 2) {
        Actions.exchangeOne2oneVideoLayout(false);
      }
    }
  };

  useEffect(() => {
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on(
      'recv-pub-msg',
      pubMsgData => {
        setRoomLayout(pubMsgData);
      },
      listernerBackupid,
    );
    Event.on(
      'recv-del-msg',
      delMsgData => {
        const { name } = delMsgData;
        if (name === 'SetRoomLayout') {
          const { isMettingRoom, maxVideo } = store.getState().classroom.roomInfo;
          Actions.setVideoLayout(isMettingRoom);
          Actions.setFocusVideoId('');
          if (maxVideo === 2) {
            Actions.exchangeOne2oneVideoLayout(false);
          }
        }
      },
      listernerBackupid,
    );
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);

  const hasSwitchLayout = [0, 1].includes(SessionRoom.getMyself().role);
  return (
    !screenShare.hasShare &&
    hasSwitchLayout && (
      <div className="footer-icon" onClick={switchLayout} title={!isVideoLayout ? footer.tileLayout : footer.videoLayout}>
        <Icon title={!isVideoLayout ? footer.tileLayout : footer.videoLayout} type={isVideoLayout ? 'layout_default' : 'layout_video'} />
      </div>
    )
  );
};

const mapStateToProps = state => {
  return {
    isVideoLayout: state.classroom.isVideoLayout,
    roomStatus: state.classroom.roomStatus,
    screenShare: state.common.screenShare,
    videoDragInfo: state.video.videoDragInfo,
    ...state.chat,
  };
};

export default connect(mapStateToProps)(SwitchLayout);
