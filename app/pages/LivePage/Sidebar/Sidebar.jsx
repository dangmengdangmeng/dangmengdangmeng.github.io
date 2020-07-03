import React, { useState, useEffect, useRef } from 'react';
import './sidebar.scss';
import WhiteboardService from '@global/services/WhiteboardService';
import Signalling from '@global/services/SignallingService';
import TeacherVideoContainer from '@containers/TeacherVideo/TeacherVideoContainer';
import { Event, ROOM_ROLE, SessionRoom } from '@global/roomConstants';
import Actions from '@global/actions';
import { connect } from 'react-redux';
import StudentVideoList from '../../../containers/StudentVideoList/StudentVideoList';
const isTeacher = () => {
  const user = SessionRoom.getMyself() || {};
  return user.role === ROOM_ROLE.TEACHER || user.role === ROOM_ROLE.ASSISTANT;
};
const Sidebar = props => {
  const { isVideoLayout, isClassBegin, doubleVideoId, isFullScreen, isExchangeOne2oneLayout } = props;
  const { maxVideo, videoheight, videowidth, isLiveRoom } = JSON.parse(props.roomInfo);
  let headerHeight;
  let setSideBarWBtnHeight;
  let maxTop;
  const [onetooneLayout, setOnetoOneLayout] = useState('');

  const sideWidth = useRef(null);
  const $sideBar = useRef(null);
  const $setSideBarW = useRef(null);
  const $setSideBarWBtn = useRef(null);
  // 计算双师布局的被折叠的视频top值
  const computedTop = _isExchangeOne2oneLayout => {
    const studentVideoList = document.querySelector('.student-video-list');
    const sidebar = document.querySelector('.sidebar');
    const placeholderBg = document.querySelector('.placeholder-bg');
    if (_isExchangeOne2oneLayout) {
      const scale = Number(videowidth) / Number(videoheight);
      const placeholderBgH = window.innerWidth / 2 / scale;
      placeholderBg.style.top = `${(sidebar.clientHeight - placeholderBgH) / 2}px`;
      studentVideoList.style.top = `auto`;
    } else {
      const scale = Number(videowidth) / Number(videoheight);
      const placeholderBgH = window.innerWidth / 2 / scale;
      studentVideoList.style.top = `${(sidebar.clientHeight - placeholderBgH) / 2}px`;
      placeholderBg.style.top = `auto`;
    }
  };
  useEffect(() => {
    if (onetooneLayout === 'nested' && !isVideoLayout) {
      computedTop(isExchangeOne2oneLayout);
    }
  }, [onetooneLayout, isExchangeOne2oneLayout, isVideoLayout]);
  useEffect(() => {
    if (!$sideBar || !$sideBar.current || maxVideo > 2) return;
    // 拖拽初始化
    initSideWidthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleResize = _isExchangeOne2oneLayout => {
    // 改变大小后重新计算sidebar的高度
    const scale = Number(videowidth) / Number(videoheight);
    const widthDefault = (document.querySelector('.sidebar').clientHeight / 2) * scale;
    const widthMax = Math.floor(document.documentElement.clientWidth / 2);
    sideWidth.current = Object.assign({}, sideWidth.current, { widthDefault, widthMax });
    let w = widthDefault;
    if (!onetooneLayout) {
      w = widthDefault;
      Actions.setVideoLayout(false, '');
      setOnetoOneLayout('');
    } else {
      w = widthMax;
      Actions.setVideoLayout(false, 'nested');
      setOnetoOneLayout('nested');
    }
    $sideBar.current.style.width = `${w}px`;
    WhiteboardService.calcWBSize();
    if (onetooneLayout === 'nested') {
      computedTop(_isExchangeOne2oneLayout);
    }
  };
  useEffect(() => {
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('window-resize', () => handleResize(isExchangeOne2oneLayout), listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onetooneLayout, isExchangeOne2oneLayout]);
  useEffect(() => {
    // 监听布局改变信令
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    if (maxVideo === 2) {
      Event.on(
        'recv-pub-msg',
        pubMsgData => {
          const { name, data } = pubMsgData;
          if (name === 'one2oneVideoSwitchLayout' && data.one2one === 'nested') {
            Actions.setVideoLayout(false, 'nested');
            setOnetoOneLayout('nested');
            setSideWidth('nested');
          }
        },
        listernerBackupid,
      );
      Event.on(
        'recv-del-msg',
        delMsgData => {
          const { name } = delMsgData;
          if (name === 'one2oneVideoSwitchLayout') {
            Actions.setVideoLayout(false, '');
            setOnetoOneLayout('');
            setSideWidth('');
          }
        },
        listernerBackupid,
      );
    }
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [maxVideo]);

  // 拖拽初始化
  const initSideWidthData = () => {
    const scale = Number(videowidth) / Number(videoheight);
    const widthDefault = (document.querySelector('.sidebar').clientHeight / 2) * scale;
    const widthMax = Math.floor(document.documentElement.clientWidth / 2);
    sideWidth.current = Object.assign({}, sideWidth.current, { widthDefault, widthMax });
    setSideWidth();
  };

  const setSideWidth = (one2one, isNeedTransition = true) => {
    if (isNeedTransition) {
      $sideBar.current.style.transition = 'width ease 0.3s';
    }
    switch (one2one) {
      case 'nested':
        $sideBar.current.style.width = `${sideWidth.current.widthMax}px`;
        break;
      default:
        $sideBar.current.style.width = `${sideWidth.current.widthDefault}px`;
        break;
    }
    setTimeout(() => {
      WhiteboardService.calcWBSize();
    }, 30);
  };

  const likeDrag = () => {
    const { widthDefault, widthMax } = sideWidth.current;
    let w = widthDefault;
    let type = 'defaultLayout';
    if (onetooneLayout) {
      w = widthDefault;
      setOnetoOneLayout('');
    } else {
      w = widthMax;
      setOnetoOneLayout('nested');
      type = 'nested';
    }
    $sideBar.current.style.width = `${w}px`;
    Actions.setVideoLayout(false, w === widthDefault ? '' : 'nested');
    WhiteboardService.calcWBSize();
    // 发送信令
    Signalling.sendSignallingSetone2oneVideoLayout(type, Boolean(w === widthDefault));
  };

  const setMouseTop = clientY => {
    let top = clientY - headerHeight - setSideBarWBtnHeight / 2;
    top = top < 0 ? 0 : top;
    top = top >= maxTop ? maxTop : top;
    $setSideBarWBtn.current.style.top = `${top}px`;
  };

  const mouEnterSetSideBarW = ev => {
    const oEvent = ev || window.event;
    headerHeight = document.getElementById('header').offsetHeight;
    setSideBarWBtnHeight = $setSideBarWBtn.current.offsetHeight;
    maxTop = $setSideBarW.current.offsetHeight - setSideBarWBtnHeight;
    setMouseTop(oEvent.clientY);
    $setSideBarW.current.onmousemove = mouMoveSetSideBarW;
    $setSideBarW.current.onmouseleave = mouOutSetSideBarW;
  };
  const mouMoveSetSideBarW = ev => {
    const oEvent = ev || window.event;
    setMouseTop(oEvent.clientY);
  };
  const mouOutSetSideBarW = () => {
    $setSideBarW.current.onmousemove = null;
    $setSideBarW.current.onmouseleave = null;
  };

  return (
    <div className="sidebar" ref={$sideBar}>
      {!isVideoLayout && !isFullScreen && <TeacherVideoContainer onetoone={onetooneLayout} isTeacher />}
      {maxVideo <= 2 && !isLiveRoom && <StudentVideoList onetoone={onetooneLayout} />}
      {maxVideo === 2 && isTeacher() && !doubleVideoId && (
        <div
          ref={$setSideBarW}
          className="changeSidebarSizeBox"
          style={{ display: !isVideoLayout && isClassBegin ? 'block' : 'none' }}
          onMouseDown={likeDrag.bind(this)}
          onMouseEnter={mouEnterSetSideBarW.bind(this)}
        >
          <span ref={$setSideBarWBtn} className="changeSidebarSizeBtn"></span>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = ({ classroom, video, whiteboard }) => {
  return {
    isVideoLayout: classroom.isVideoLayout,
    isClassBegin: classroom.isClassBegin,
    isFoldedOne2oneLayout: classroom.isFoldedOne2oneLayout,
    doubleVideoId: video.doubleVideoId,
    isFullScreen: whiteboard.isFullScreen,
    isExchangeOne2oneLayout: classroom.isExchangeOne2oneLayout,
    roomInfo: JSON.stringify(classroom.roomInfo),
  };
};

export default connect(mapStateToProps)(Sidebar);
