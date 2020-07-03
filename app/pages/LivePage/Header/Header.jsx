import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Event, SessionRoom } from '@global/roomConstants';
import Actions from '@global/actions';
import './static/sass/index.scss';
import { YsGlobal } from '@global/handleGlobal';
import ClockTime from '@containers/ClockTime/ClockTime';

const {
  header: headerLanguage,
  pagesText: { navBarInner },
} = YsGlobal.languageInfo;
const Header = props => {
  const { onlineStudentNum } = props;
  const [isShowNetworkQuality, setIsShowNetworkQuality] = useState(false);
  const [packetsLostRate, setPacketsLostRate] = useState(0);
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    /* 处理音视频状态改变 */
    const videoStateChanged = data => {
      const { userId, publishstate } = data;
      if (userId === SessionRoom.getMyself().id) {
        if (publishstate === 0) {
          setIsShowNetworkQuality(false);
        } else {
          setIsShowNetworkQuality(true);
        }
      }
    };
    const streamNetworkQuality = data => {
      if (!data[0]) {
        return;
      }
      const { quality } = data[0] || {};
      const { video: videoQuality } = quality || {};
      const { packetsLostRate: videoPacketsLostRate, rtt } = videoQuality || {};
      setPacketsLostRate(videoPacketsLostRate);
      setDelay(rtt);
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('video-state-changed', videoStateChanged, listernerBackupid);
    Event.on('stream-network-quality', streamNetworkQuality, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);
  const { serial } = JSON.parse(props.roomInfo);
  const { isShowStudentNum } = YsGlobal.roomConfigItem;
  return (
    <div className="header" id="header">
      <div className="nav-bar">
        {isShowNetworkQuality && (
          <>
            <div>
              {headerLanguage.packetlossLanguage} :&nbsp;{`${packetsLostRate}%`}
            </div>
            <div className="interdelay">
              {headerLanguage.delayLanguage} :&nbsp;<i>{delay}</i>ms
            </div>
          </>
        )}
        {isShowStudentNum && !YsGlobal.playback && <div className="student-num">{`${headerLanguage.onlineNumber}${onlineStudentNum}`}</div>}
      </div>
      <div className="room nav-bar">
        <div className="roomserial">
          {headerLanguage.roomNoLanguage} :&nbsp;{serial}
        </div>
        <div className="clockIcon">
          {navBarInner.inClass} :&nbsp;
          <ClockTime />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  headerState: {
    ...state.ys.networkState,
  },
  navBarState: {
    ...state.common,
  },
  onlineStudentNum: state.user.onlineStudentNum,
  mp4Status: state.whiteboard.mp4Status,
  confirmState: state.device.settingConfirmBtnState,
  isFullScreen: state.whiteboard.isFullScreen,
  isBigRoom: state.classroom.isBigRoom,
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = dispatch => ({
  activeToggle: type => {
    dispatch(Actions.toggleNavbar(type));
  },
  changeApplyWheat: data => {
    Actions.applyWheatState(data);
  },
  clickConfirmBtn: state => {
    Actions.setConfirmBtnState(state);
  },
  chengeIsCheckMore: data => {
    Actions.toggleIscheckMore(data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
