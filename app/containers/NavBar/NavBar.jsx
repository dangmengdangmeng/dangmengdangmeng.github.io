import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import { SessionRoom, ROOM_ROLE, Event } from '@global/roomConstants';
import './navBar.scss';
import { YsGlobal } from '@global/handleGlobal';
import CourseList from '@containers/CourseList/CourseList';
import ToolsBox from '@containers/ToolsBox/ToolsBox';
import UserList from '@containers/UserList/UserList';
import ToolBar from '@containers/WhiteboardToolsBar/WhiteboardToolsBar';
import Icon from '@components/Icon';

const { navBarInner } = YsGlobal.languageInfo.pagesText;
const moduleData = {};
const NavBar = props => {
  const { isLiveRoom, isClassRoom } = JSON.parse(props.roomInfo);
  const [canDraw, setCandraw] = useState(false);
  const [isShowToolsBox, setIsShowToolsBox] = useState(false);
  const [showBrush, setShowBrush] = useState(true);
  const mySelf = SessionRoom.getMyself() || {};
  const { navBarState: navState, activeToggle, isClassBegin, isVideoLayout, mp4Status, doubleVideoId, file } = props;
  const { openFileList } = JSON.parse(file);
  const { hasScreenShare, isSupportPageTrun } = YsGlobal.roomConfigItem;
  const navBarState = JSON.parse(navState);
  const [toolbarWithMP4, setToolbarWithMP4] = useState(true);
  const { hasShare } = navBarState.screenShare;
  const toolsBoxInfo = {
    hasShareBtn: isClassBegin && hasScreenShare && ([0, 1].includes(mySelf.role) || (mySelf.role === 2 && !isLiveRoom)),
    hasCallRollBtn: isLiveRoom,
    hasLuckDrawBtn: isLiveRoom && isClassBegin,
    hasVoteBtn: isLiveRoom && isClassBegin,
    hasNoticeBoardBtn: isLiveRoom,
    hasNoticeInformBtn: isLiveRoom,
    hasUpDataPicture: isClassBegin && mySelf.role !== ROOM_ROLE.PATROL,
    hasAnswerBtn: isClassBegin && isClassRoom && [0, 1].includes(mySelf.role),
    hasTeacherCountDownBtn: isClassBegin && isClassRoom && [0, 1].includes(mySelf.role),
    hasResponderBtn: isClassBegin && isClassRoom && [0, 1].includes(mySelf.role),
  };

  useEffect(() => {
    let boole = false;
    for (const value of Object.values(toolsBoxInfo)) {
      if (value) {
        boole = true;
        break;
      }
    }
    setIsShowToolsBox(boole);
  }, [toolsBoxInfo]);

  /* 处理用户属性改变 */
  useEffect(() => {
    const userPropertiesUpdate = data => {
      const { id, properties } = data;
      if (id === SessionRoom.getMyself().id && properties.candraw !== undefined) {
        setCandraw(properties.candraw);
        setIsShowToolsBox(properties.candraw);
        toolsBoxInfo.hasUpDataPicture = properties.candraw;
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    Event.on('receiveWhiteboardSDKAction', receiveWhiteboardSDKAction, listernerBackupid); // 监听room事件：room-delete-file
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [toolsBoxInfo.hasUpDataPicture]);

  /**
   * 处理白板sdk返回的数据
   * @params {sting} action 动作
   * @params {object} cmd 当前动作携带的数据
   */
  const receiveWhiteboardSDKAction = data => {
    const { action, cmd = {}, source: instanceId } = data;
    switch (action) {
      case 'mediaPlayerNotice': {
        const { playerType, type } = cmd;
        if (playerType === 'videoPlayer' && type === 'end') {
          setToolbarWithMP4(true);
        }
        break;
      }
      case 'MoreWhiteboardState': {
        if (!instanceId) return;
        moduleData[instanceId] = moduleData[instanceId] || {};
        moduleData[instanceId].state = cmd;
        if (moduleData[instanceId].fileInfo && moduleData[instanceId].fileInfo.filetype === 'mp4' && mp4Status !== 'end') {
          if (cmd.full) setToolbarWithMP4(false);
          else setToolbarWithMP4(true);
        }
        break;
      }
      default:
        break;
    }
  };
  return (
    <ul className={`navbar-container ${hasShare ? 'has-share' : ''}`}>
      <li
        style={{ display: mySelf.role !== ROOM_ROLE.STUDENT ? 'block' : 'none' }}
        className={`${navBarState.visible === 'userList' ? 'show' : ''} user-list-btn`}
        onClick={() => {
          activeToggle('userList');
        }}
        title={isLiveRoom ? navBarInner.userList : navBarInner.roster}
      >
        <Icon title={isLiveRoom ? navBarInner.userList : navBarInner.roster} type="roster" />
        <UserList show={navBarState.visible === 'userList'} />
      </li>
      <li
        style={{
          display:
            mySelf.role !== ROOM_ROLE.STUDENT && ((!isVideoLayout && !doubleVideoId) || (!isClassBegin && !isLiveRoom && isSupportPageTrun)) ? 'block' : 'none',
        }}
        className={`${navBarState.visible === 'courseList' ? 'show' : ''} course-list-btn`}
        onClick={() => {
          activeToggle('courseList');
        }}
        title={isLiveRoom ? navBarInner.fileList : navBarInner.courseLib}
      >
        <Icon title={isLiveRoom ? navBarInner.fileList : navBarInner.courseLib} type="course" />
        <CourseList isSupportPageTrun={mySelf.role === ROOM_ROLE.STUDENT} />
      </li>
      {!isVideoLayout && ((!YsGlobal.roomConfigItem.isMoreWhiteboard && mp4Status === 'end') || YsGlobal.roomConfigItem.isMoreWhiteboard) && !doubleVideoId && (
        <li
          style={{ display: (mySelf.role !== ROOM_ROLE.STUDENT || canDraw) && isShowToolsBox ? 'block' : 'none' }}
          className={`${navBarState.visible === 'toolBar' ? 'show' : ''} tool-box-btn`}
          onClick={() => {
            activeToggle('toolBar');
          }}
          title={navBarInner.tools}
        >
          <Icon title={navBarInner.tools} type="tools" />
          <ToolsBox toolsBoxInfo={JSON.stringify(toolsBoxInfo)} isSupportPageTrun={mySelf.role === ROOM_ROLE.STUDENT && canDraw} />
        </li>
      )}
      {!isVideoLayout && canDraw && isClassBegin && !YsGlobal.playback && toolbarWithMP4 && (
        <li
          className="tool-option-btn"
          title={navBarInner.brushTool}
          onClick={() => {
            setShowBrush(!showBrush);
          }}
        >
          <Icon title={navBarInner.brushTool} type="brush" />
          {showBrush && <ToolBar instanceId="default" canDraw={canDraw} isClassBegin={isClassBegin} openFileList={openFileList} {...props} />}
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = state => ({
  navBarState: JSON.stringify({
    ...state.common,
  }),
  mp4Status: state.whiteboard.mp4Status,
  isVideoLayout: state.classroom.isVideoLayout,
  isClassBegin: state.classroom.isClassBegin,
  doubleVideoId: state.video.doubleVideoId,
  file: JSON.stringify(state.file),
  roomInfo: JSON.stringify(state.classroom.roomInfo),
});

const mapDispatchToProps = dispatch => ({
  activeToggle: type => {
    dispatch(Actions.toggleNavbar(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
