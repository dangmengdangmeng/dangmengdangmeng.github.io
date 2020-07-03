import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import WhiteboardService from '@global/services/WhiteboardService';
import FetchService from '@global/services/FetchService';
import { Event, SessionRoom, videoDrawInstanceId, ROOM_STATE } from '@global/roomConstants';
import { connect } from 'react-redux';
import VideoMark from '@containers/VideoMark/VideoMark';
import TeacherVideoContainer from '@containers/TeacherVideo/TeacherVideoContainer';
import Signalling from '@global/services/SignallingService';
import { FileItemEvent } from '@containers/CourseList/service/service';
import PropTypes from 'prop-types';
import { getFileType } from '@utils/ysUtils';
import UserService from '@global/services/UserService';
import { YsGlobal } from '@global/handleGlobal';
import actions from '@global/actions';
import store from '@app/store';
import { mediaManager } from '@global/modules/Media';
import { setUserProperty } from '@utils/sign';
import Actions from '../../global/actions/whiteboard';

import './static/sass/mainWhiteboard.scss';
import './static/sass/documentToolbar.scss';
import './static/sass/moreWhiteboard.scss';

const { whiteboard } = YsGlobal.languageInfo;
const colors = [
  '#9B9B9B',
  '#FF7EA1',
  '#FF3B58',
  '#F08218',
  '#B66700',
  '#8F4200',
  '#FF7500',
  '#FFD100',
  '#FFF600',
  '#ABD500',
  '#78BC24',
  '#2EA937',
  '#16B4A4',
  '#40C3FF',
  '#008DEB',
  '#0043FF',
  '#BFC7FF',
  '#E352FF',
  '#76288B',
  '#412088',
  '#0F2378',
];
const WHITE_BOARD_CONTAINER_ID = 'big_literally_wrap'; // 白板容器的id
const _div = document.createElement('div');
_div.style = {
  width: '100%',
  height: '100%',
};
let moreWBState = {};
const moduleData = {};
let media = {};
let hasShowPage = false;
const BaseWhiteboard = props => {
  const { isMoreWhiteboard: isMoreWb } = YsGlobal.roomConfigItem;
  const [reloadStatus, setReloadStatus] = useState('reload'); // reloading时为正在重新加载状态
  const [currFileInfo, setCurrFileInfo] = useState({});
  const { mp4Status, isClassBegin, hasShare, screenShareUserId, isFullScreen, file, activeToggle, isConnected } = props;
  const { selectedFileID, fileList } = JSON.parse(file);

  useEffect(() => {
    const handleWindowResize = () => {
      setTimeout(() => {
        const WBScale = getWBScale();
        WhiteboardService.calcWBSize(WBScale);
      }, 30);
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const currFile = fileList.filter(_file => _file.fileid === selectedFileID);
    if (currFile.length) {
      setCurrFileInfo(currFile[0]);
    } else {
      setCurrFileInfo({});
    }
  }, [file]);

  const whiteboardCallBack = (action, cmd, instanceId = 'default') => {
    const { isMoreWhiteboard } = YsGlobal.roomConfigItem;
    Event.trigger('receiveWhiteboardSDKAction', { action, cmd, source: instanceId });
    const mySelf = SessionRoom.getMyself() || {};
    switch (action) {
      case 'viewStateUpdate': {
        const { fullScreen } = cmd.viewState;
        const { fileid, page = {} } = cmd.viewState;
        YsGlobal.currentFile = {
          fileId: fileid,
          currentPage: page.currentPage,
        };
        actions.setOpenFile(fileid, page.currentPage);
        Actions.setIsFullscreen(fullScreen, instanceId);
        break;
      }
      case 'mediaPlayerNotice': {
        const { playerType, type, userid, attributes } = cmd;
        let windowModule = null;
        const { whiteboardId, fileid, url } = attributes;
        const mediaId = [whiteboardId, fileid].join('_');
        const medias = mediaManager.getMediaById(mediaId);
        if (medias.length < 1) {
          medias.push(
            mediaManager.updateMedia({
              id: mediaId,
              url,
              status: type,
            }),
          );
        }
        if (type === 'end') {
          medias.forEach(({ hash }) => {
            mediaManager.removeMedia(hash);
          });
        }
        if (isMoreWhiteboard) {
          windowModule = WhiteboardService.getYsWhiteBoardManager()
            .getWindowModules()
            .find(it => it.instanceId === cmd.attributes.whiteboardId);
          if (playerType === 'videoPlayer' && windowModule && windowModule.moduleEles && windowModule.moduleEles.container) {
            if (type === 'play' || type === 'end') {
              const videoMarkContainer = windowModule.moduleEles.container.querySelector('.video-mark-container');
              if (videoMarkContainer) {
                ReactDOM.unmountComponentAtNode(_div);
                windowModule.moduleEles.container.removeChild(_div);
              }
            } else if (type === 'pause' && isClassBegin) {
              windowModule.moduleEles.container.appendChild(_div);
              ReactDOM.render(<VideoMark />, _div);
            }
          }
        }
        if (['play', 'pause'].includes(type)) {
          media = {
            attributes,
            userId: userid,
          };
        }
        if (playerType === 'videoPlayer') {
          if (type === 'play') {
            Actions.setWBVideoStatus('play');
          } else if (type === 'pause') {
            if (userid === SessionRoom.getMyself().id) {
              // const data = { videoRatio: attributes.width / attributes.height };
              // Signalling.sendVideoMark(data);
              if (!isMoreWhiteboard) {
                WhiteboardService.getYsWhiteBoardManager().useWhiteboardTool('tool_pencil', videoDrawInstanceId);
              }
            }
            Actions.setWBVideoStatus('pause');
          } else if (type === 'end') {
            if ([0, 1].includes(SessionRoom.getMyself().role)) {
              Signalling.sendVideoMark({}, true);
            }
            Actions.setWBVideoStatus('end');
          }
          if (isMoreWhiteboard && [0, 1].includes(mySelf.role) && cmd.attributes.source === 'dynamicPPT') {
            const haseClose = !!(windowModule && windowModule.moduleEles && windowModule.moduleEles.container.querySelectorAll('.close-mp4-btn').length > 0);
            if (type === 'end' && haseClose) {
              windowModule.moduleEles.container.removeChild(windowModule.moduleEles.container.querySelector('.close-mp4-btn'));
            }
            if (type !== 'end' && !haseClose) {
              const close = document.createElement('div');
              close.classList.add('close-mp4-btn');
              close.onclick = closeMp4;
              windowModule.moduleEles.container.appendChild(close);
            }
          }
        } else if (playerType === 'audioPlayer') {
          if (windowModule && mySelf.role === 2) {
            const { module } = windowModule.moduleEles;
            module.classList.add('student');
          }
          if (type === 'play') {
            Actions.setWBMp3Status('play');
          } else if (type === 'pause') {
            Actions.setWBMp3Status('pause');
          } else if (type === 'end') {
            Actions.setWBMp3Status('end');
          }
        }
        break;
      }
      case 'documentLoadSuccess': {
        setReloadStatus('reload');
        break;
      }
      case 'MoreWhiteboardGlobalState': {
        moreWBState = cmd;
        break;
      }
      case 'moreWhiteboardCreated': {
        if (!instanceId) return;
        moduleData[instanceId] = moduleData[instanceId] || {};
        moduleData[instanceId].fileInfo = cmd.fileInfo;
        break;
      }
      case 'MoreWhiteboardState': {
        if (!instanceId) return;
        moduleData[instanceId] = moduleData[instanceId] || {};
        moduleData[instanceId].state = cmd;
        break;
      }
      case 'moduleTriggerClick': {
        activeToggle('');
        break;
      }
      case 'ElementEvent': {
        const { data = {}, type } = cmd;
        if (type === 'pause') {
          if (data.pause) {
            Signalling.sendVideoMark({ videoRatio: data.width / data.height });
            if (!isMoreWhiteboard) {
              WhiteboardService.getYsWhiteBoardManager().useWhiteboardTool('tool_pencil', videoDrawInstanceId);
            }
          } else {
            Signalling.sendVideoMark({}, true);
          }
        }
        break;
      }
      default:
        break;
    }
  };

  const getWBScale = () => {
    const { isLiveRoom, maxVideo } = store.getState().classroom.roomInfo;
    if (isLiveRoom) {
      return 16 / 9;
    }
    return maxVideo > 2 ? 2 / 1 : 4 / 3;
  };

  /**
   * 获取语言类型
   * @returns {'zh'|'tw'|'en'}
   */
  const getlanguageType = () => {
    if (YsGlobal.languageName === 'zh-tw') {
      return 'tw';
    }
    if (YsGlobal.languageName === 'chinese') {
      return 'zh';
    }
    return 'en';
  };

  /* 初始化白板 */
  const initWhiteboardDefault = async () => {
    const { isSupportPageTrun, isMoreWhiteboard } = YsGlobal.roomConfigItem;
    const mySelf = SessionRoom.getMyself() || {};
    const parentNode = document.getElementById(WHITE_BOARD_CONTAINER_ID); // 挂载白板的节点
    const whiteboardConfigration = {
      more: {
        use: isMoreWhiteboard,
        operation: [0, 1].includes(SessionRoom.getMyself().role),
      },
      defaultWhiteboardScale: getWBScale(),
      isPlayback: YsGlobal.playback,
      synchronization: !!(isClassBegin && [0, 1].includes(mySelf.role)), // 是否同步给其它用户,没上课不同步
      canDraw: false, // 可画权限 , 授权可画
      canPage: [0, 1].includes(mySelf.role) || (mySelf.role === 2 && isSupportPageTrun && (isClassBegin ? mySelf.canDraw : true)),
      actionClick: [0, 1].includes(mySelf.role),
      addPage: false, // 加页权限(注：加页权限和翻页权限同时为true时才能加页)
      primaryColor: '#FF0000',
      pptVolumeSynchronization: [0, 1].includes(mySelf.role), // PPT音量是否同步
      isOnlyUndoRedoClearMyselfShape: mySelf.role === 2, // 是否只撤销、恢复、清除自己的画笔,默认false
      documentToolBarConfig: {
        isDrag: true,
        isLoadFullScreen: true, // 是否加载全屏，false
        isLoadRemark: true, // 是否加载文档备注，false
        isLoadVolume: true, // 是否加载动态ppt音量设置，false
        initDragPosition: {
          left: 50,
          top: 96.5,
        },
        fullScreenElementId: 'white_board_outer_layout',
      },
      isLoadWhiteboardToolBar: false,
      fontSize: 48,
      canRemark: true,
      videoPlayerConfig: {
        controlPermissions: {
          hasPlayOrPause: [0, 1].includes(mySelf.role), // 播放暂停权限,默认true
          hasChangeProgress: [0, 1].includes(mySelf.role), // 改变进度权限，默认true
          hasClose: [0, 1].includes(mySelf.role), // 关闭权限，默认true
        },
      },
      audioPlayerConfig: {
        // 音频播放器配置
        isLoadControl: true, // 是否加载控制器,默认true(注：不提供给用户，自己内部使用)
        controlPermissions: {
          hasPlayOrPause: [0, 1].includes(mySelf.role), // 播放暂停权限,默认true
          hasChangeProgress: [0, 1].includes(mySelf.role), // 改变进度权限，默认true
          hasClose: [0, 1].includes(mySelf.role), // 关闭权限，默认true
        },
      },
      clickCapture: true, // 白板画笔是否穿透
      canWBPinch: mySelf.role === 2 && YsGlobal.isMobile, // 是否能双指缩放
      backgroundColor: YsGlobal.isMobile ? '#DCE2F1' : '#2E3037',
      loadDynamicPptView: !isMoreWhiteboard, // 加载动态ppt视图
      loadH5DocumentView: !isMoreWhiteboard, // 加载h5课件视图
      isLoadAudioPlayer: !isMoreWhiteboard,
      isLoadVideoPlayer: !isMoreWhiteboard,
      languageType: getlanguageType(),
    };
    WhiteboardService.getYsWhiteBoardManager().createMainWhiteboard(parentNode, whiteboardConfigration, whiteboardCallBack);
    if (!hasShowPage && !YsGlobal.playback && (!isMoreWhiteboard || !isClassBegin)) {
      const { fileid, currpage } = YsGlobal.defaultFile;
      actions.setOpenFile(fileid, currpage);
      WhiteboardService.getYsWhiteBoardManager().changeDocument(fileid ? FetchService.getFileinfo(fileid) : YsGlobal.defaultFile, currpage);
      let instanceId = '';
      Object.entries(moduleData).forEach(([key, data]) => {
        if (data.fileInfo.fileid === fileid) instanceId = key;
      });
      WhiteboardService.getYsWhiteBoardManager().moreWhiteboardStateChange({
        full: true,
        instanceId,
      });
    }
  };

  const initMoreWb = async () => {
    const { isSupportPageTrun, isMoreWhiteboard } = YsGlobal.roomConfigItem;
    const parentNode = document.getElementById(WHITE_BOARD_CONTAINER_ID); // 挂载白板的节点
    WhiteboardService.getYsWhiteBoardManager().useMoreWb(isMoreWhiteboard, {
      operation: [0, 1].includes(SessionRoom.getMyself().role),
      parentNode,
      receiveActionCommand: whiteboardCallBack,
      defaultWhiteboardScale: getWBScale(),
      isPlayback: YsGlobal.playback,
      synchronization: !!(isClassBegin && [0, 1].includes(mySelf.role)), // 是否同步给其它用户,没上课不同步
      canDraw: false, // 可画权限 , 授权可画
      canPage: [0, 1].includes(mySelf.role) || (mySelf.role === 2 && isSupportPageTrun && (isClassBegin ? mySelf.canDraw : true)),
      actionClick: [0, 1].includes(mySelf.role),
      addPage: false, // 加页权限(注：加页权限和翻页权限同时为true时才能加页)
      primaryColor: '#FF0000',
      pptVolumeSynchronization: [0, 1].includes(mySelf.role), // PPT音量是否同步
      isOnlyUndoRedoClearMyselfShape: mySelf.role === 2, // 是否只撤销、恢复、清除自己的画笔,默认false
      documentToolBarConfig: {
        isDrag: true,
        isLoadFullScreen: true, // 是否加载全屏，false
        isLoadRemark: true, // 是否加载文档备注，false
        isLoadVolume: true, // 是否加载动态ppt音量设置，false
        initDragPosition: {
          left: 50,
          top: 96.5,
        },
        fullScreenElementId: 'white_board_outer_layout',
      },
      isLoadWhiteboardToolBar: false,
      fontSize: 48,
      canRemark: true,
      videoPlayerConfig: {
        controlPermissions: {
          hasPlayOrPause: [0, 1].includes(mySelf.role), // 播放暂停权限,默认true
          hasChangeProgress: [0, 1].includes(mySelf.role), // 改变进度权限，默认true
          hasClose: [0, 1].includes(mySelf.role), // 关闭权限，默认true
        },
      },
      audioPlayerConfig: {
        // 音频播放器配置
        isLoadControl: true, // 是否加载控制器,默认true(注：不提供给用户，自己内部使用)
        controlPermissions: {
          hasPlayOrPause: [0, 1].includes(mySelf.role), // 播放暂停权限,默认true
          hasChangeProgress: [0, 1].includes(mySelf.role), // 改变进度权限，默认true
          hasClose: [0, 1].includes(mySelf.role), // 关闭权限，默认true
        },
      },
      clickCapture: true, // 白板画笔是否穿透
      canWBPinch: mySelf.role === 2 && YsGlobal.isMobile, // 是否能双指缩放
      backgroundColor: '#2E3037',
      loadDynamicPptView: !isMoreWhiteboard, // 加载动态ppt视图
      loadH5DocumentView: !isMoreWhiteboard, // 加载h5课件视图
      isLoadAudioPlayer: !isMoreWhiteboard,
      isLoadVideoPlayer: !isMoreWhiteboard,
      languageType: getlanguageType(),
    });
  };

  useEffect(() => {
    return () => {
      WhiteboardService.getYsWhiteBoardManager().destroyMainWhiteboard(); // 销毁白板
    };
  }, []);

  useEffect(() => {
    const userPropertiesUpdate = data => {
      const { isSupportPageTrun } = YsGlobal.roomConfigItem;
      const { id, properties } = data;
      const user = SessionRoom.getUser(id);
      const mySelf = SessionRoom.getMyself() || {};
      if (user.id === SessionRoom.getMyself().id) {
        Object.entries(properties).forEach(([key, value]) => {
          if (key === 'candraw') {
            let color = user.primaryColor;
            if (value && user.role !== 0 && user.primaryColor && user.primaryColor === '#FF0000') {
              const users = SessionRoom.getUsers();

              const colorArr = Object.values(users).map(it => it.primaryColor);
              const noIncludes = colors.filter(it => !colorArr.includes(it));
              if (noIncludes.length) {
                color = noIncludes[parseInt(Math.random() * noIncludes.length, 10)];
              } else {
                color = colors[parseInt(Math.random() * colors.length, 10)];
              }
              UserService.changeVideoUserPen(user.id, color);
            }
            const config = {
              // 改变主白板配置项（授权更新后）
              canDraw: isClassBegin && value, // 可画权限 , 授权可画
              canPage: value && ([0, 1].includes(mySelf.role) || (mySelf.role === 2 && isSupportPageTrun)), // 翻页权限 , 如果有授权或者是学生且有支持翻页的配置项则能翻页
              actionClick: isClassBegin && value, // 动态PPT、H5文档等动作点击权限 , 授权可点
              synchronization: isClassBegin && value,
              primaryColor: [0, 1].includes(mySelf.role) ? mySelf.primaryColor : color,
            };
            WhiteboardService.getYsWhiteBoardManager().changeMoreWbBaseConfig({
              operation: [0, 1].includes(SessionRoom.getMyself().role),
              synchronization: !!(isClassBegin && value),
            });
            WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(config, 'default');
            const WindowModules = WhiteboardService.getYsWhiteBoardManager().getWindowModules();
            WindowModules.forEach(item => {
              WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(config, item.instanceId);
            });
          }
        });
      }
    };
    const handlePubMsg = pubMsgData => {
      const { isSupportPageTrun, isMoreWhiteboard } = YsGlobal.roomConfigItem;
      const mySelf = SessionRoom.getMyself() || {};
      const { name, fromID, isNowMsg, data } = pubMsgData;
      if (name === 'ClassBegin') {
        const wbConfig = {
          isConnectedRoom: isConnected,
          synchronization: [0, 1].includes(mySelf.role) || mySelf.candraw,
          canPage: [0, 1].includes(mySelf.role) || (mySelf.candraw && mySelf.role === 2 && isSupportPageTrun),
          addPage: [0, 1].includes(mySelf.role) || (mySelf.candraw && mySelf.role === 2 && isSupportPageTrun),
          actionClick: [0, 1].includes(mySelf.role) || (mySelf.candraw && mySelf.role === 2 && isSupportPageTrun),
          canDraw: [0, 1].includes(mySelf.role) || mySelf.candraw,
        };
        WhiteboardService.getYsWhiteBoardManager().changeMoreWbBaseConfig({
          operation: [0, 1].includes(SessionRoom.getMyself().role),
          synchronization: !!([0, 1].includes(mySelf.role) || mySelf.candraw),
        });
        WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(wbConfig, 'default');
        const WindowModules = WhiteboardService.getYsWhiteBoardManager().getWindowModules();
        WindowModules.forEach(item => {
          WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(wbConfig, item.instanceId);
        });
        if (fromID === mySelf.id) {
          const sort = JSON.parse(JSON.stringify(moreWBState.sort || []));
          if (isMoreWhiteboard) {
            sort.forEach(id => {
              const { fileInfo, state } = moduleData[id];
              if (!fileInfo) return;
              WhiteboardService.getYsWhiteBoardManager().changeDocument(
                fileInfo.fileId ? FetchService.getFileinfo(fileInfo.fileId) : YsGlobal.defaultFile,
                props.openFileList[fileInfo.fileid].currpage,
              );
              const { msgId } = WhiteboardService.getYsWhiteBoardManager().getWindowModules(id).additionalData || {};
              Signalling.moreWhiteboardState(
                id,
                {
                  ...state,
                  instanceId: id,
                },
                msgId,
              );
            });
            Signalling.moreWhiteboardGlobalState(moreWBState);
          } else {
            const { currentPage } = YsGlobal.currentFile;
            WhiteboardService.getYsWhiteBoardManager().changeDocument(
              YsGlobal.currentFile.fileId ? FetchService.getFileinfo(YsGlobal.currentFile.fileId) : YsGlobal.defaultFile,
              currentPage,
            );
          }
        } else {
          WhiteboardService.getYsWhiteBoardManager().destroyMoreWhiteboards();
        }
      }
      if (name === 'ShowPage' && !isNowMsg) {
        hasShowPage = true;
      }
      if (name === 'CloseMedia') {
        const { attributes } = data;
        YsGlobal.roomClient.removeInjectStreamUrl(attributes.url);
      }
    };
    const roomConnected = () => {
      const { isMoreWhiteboard } = YsGlobal.roomConfigItem;
      const mySelf = SessionRoom.getMyself() || {};
      WhiteboardService.getYsWhiteBoardManager().changeCommonWhiteBoardConfigration({
        isConnectedRoom: isConnected,
        webAddress: {
          ...YsGlobal.serviceInfo,
          hostname: YsGlobal.serviceInfo.host,
        },
        docAddress: {
          ...YsGlobal.docAddress,
          hostname: YsGlobal.docAddress.host,
        },
        backupDocAddressList: YsGlobal.backupDocAddressList,
        myRole: SessionRoom.getMyself().role,
        isPlayback: YsGlobal.playback,
        myName: SessionRoom.getMyself().nickname,
        myUserId: SessionRoom.getMyself().id,
      });
      if (isMoreWhiteboard) initMoreWb();
      FetchService.getRoomFile().then(res => {
        if (res.result === 0) {
          const { roomfile } = res;
          actions.setFileList(roomfile);
          YsGlobal.defaultFile =
            roomfile.find(_file => {
              return +_file.type === 1 && getFileType(_file.filetype) !== 'mp3' && getFileType(_file.filetype) !== 'mp4';
            }) || FileItemEvent.addWhiteBoardInfo();
        } else {
          actions.setFileList([]);
        }
        initWhiteboardDefault();
        const WBScale = getWBScale();
        WhiteboardService.calcWBSize(WBScale);
        // 进入房间把老师和助教的画笔权限改为true
        if ([0, 1].includes(mySelf.role)) {
          setUserProperty(mySelf.id, { candraw: true });
        }
      });
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    Event.on('signal-connected', roomConnected, listernerBackupid); // 房间连接成功
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [isConnected, props.openFileList]);

  useEffect(() => {
    if (mp4Status === 'end') {
      props.changAllFullFn(false);
    }
  }, [mp4Status]);

  const closeMp4 = () => {
    const { userId, attributes } = media;
    const mySelf = SessionRoom.getMyself() || {};
    if (userId === mySelf.id) {
      YsGlobal.roomClient.removeInjectStreamUrl(attributes.url);
    } else {
      Signalling.closeMedia({ attributes }, userId);
    }
  };

  const reloadDoc = () => {
    if (YsGlobal.currentFile.fileId === 0) return;
    setReloadStatus('reloading');
    WhiteboardService.getYsWhiteBoardManager().reloadCurrentDocument();
  };
  const mySelf = SessionRoom.getMyself() || {};
  return (
    <>
      {isFullScreen && (
        <div className="fullscreen-teacher">
          <TeacherVideoContainer isTeacher />
        </div>
      )}
      {!isMoreWb && [0, 1].includes(mySelf.role) && mp4Status !== 'end' && <button className="close-mp4-btn" onClick={closeMp4} />}
      {selectedFileID !== 0 && !['mp3', 'mp4'].includes(currFileInfo.filetype) && (
        <div className={`course-reload ${reloadStatus}`} onClick={reloadDoc}>
          {whiteboard[reloadStatus]}
        </div>
      )}
      {/* 白板最外层包裹 */}
      <div id={WHITE_BOARD_CONTAINER_ID} className={`big-literally-wrap ${screenShareUserId === mySelf.id && hasShare ? 'has-share' : ''}`} />
      {/* 白板画笔工具 */}
      {isClassBegin && !isMoreWb && mp4Status === 'pause' && <VideoMark />}
    </>
  );
};

BaseWhiteboard.propTypes = {
  isFullScreen: PropTypes.bool,
};

const mapStateToProps = ({ classroom, whiteboard: wb, common, file }) => ({
  isConnected: classroom.roomStatus === ROOM_STATE.CONNECTED,
  isClassBegin: classroom.isClassBegin,
  mp4Status: wb.mp4Status,
  isFullScreen: wb.isFullScreen,
  fullInstanceId: wb.fullInstanceId,
  hasShare: common.screenShare.hasShare,
  screenShareUserId: common.screenShare.userId,
  file: JSON.stringify(file),
  openFileList: file.openFileList,
});
const mapDispatchToProps = () => ({
  changAllFullFn: data => {
    actions.changeAllFull(data);
  },
  activeToggle: type => {
    actions.toggleNavbar(type);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseWhiteboard);
