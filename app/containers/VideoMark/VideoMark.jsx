import React, { PureComponent } from 'react';
import { Event, SessionRoom, videoDrawInstanceId } from '@global/roomConstants';
import whiteboardService from '@global/services/WhiteboardService';
import './VideoMark.scss';
import { YsGlobal } from '@global/handleGlobal';

export default class VideoMark extends PureComponent {
  ref = null;

  isCreated = false;

  state = {
    activeTool: 'tool_pencil',
    pencilWidth: 5,
    primaryColor: '#FF0000',
    isShowPenList: false,
    isShowEraser: false,
  };

  wbManager = null;

  listernerBackupid = `${new Date().getTime()}_${Math.random()}`;

  constructor() {
    super();
    Event.on(
      'recv-pub-msg',
      pubMsgData => {
        this.getPubHandler(pubMsgData.name)(pubMsgData.data);
      },
      this.listernerBackupid,
    );
    Event.on(
      'recv-del-msg',
      delMsgData => {
        this.getDelHandler(delMsgData.name)(delMsgData.data);
      },
      this.listernerBackupid,
    );
    this.wbManager = whiteboardService.getYsWhiteBoardManager();
  }

  whiteBoardCallback(action, cmd, instanceId = videoDrawInstanceId) {
    Event.trigger('receiveWhiteboardSDKAction', { action, cmd, source: instanceId });
  }

  componentWillUnmount() {
    this.wbManager.destroyExtendWhiteboard(videoDrawInstanceId);
    this.wbManager.resetWhiteboardData(videoDrawInstanceId);
    Event.offAllByMarkId(this.listernerBackupid);
  }

  getPubHandler(handlerName) {
    const handlers = {
      VideoWhiteboard: ({ videoRatio }) => {
        if (!this.ref || this.isCreated) return;
        let whiteboardToolBarConfig = {
          defaultWhiteboardScale: videoRatio,
          initWhiteboardProductionOptions: {
            proprietaryTools: true,
            isBaseboard: false,
            associatedMsgID: 'VideoWhiteboard',
          },
          canDraw: [0, 1].includes(SessionRoom.getMyself().role),
          // defaultWhiteboardScale:16/9 ,
          backgroundColor: 'transparent',
          primaryColor: '#FF0000',
          eraserWidth: 30,
          pencilWidth: 5,
          shapeWidth: 5,
          fontSize: 48,
          isLoadWhiteboardToolBar: false,
          isLoadDocumentToolBar: false,
          loadDynamicPptView: false, // 加载动态ppt视图
          loadH5DocumentView: false, // 加载h5课件视图
          isLoadAudioPlayer: false,
          isLoadVideoPlayer: false,
        };
        if (YsGlobal.roomConfigItem.isMoreWhiteboard) {
          const defaultConfig = whiteboardService.getYsWhiteBoardManager().getConfig();
          whiteboardToolBarConfig = {
            ...whiteboardToolBarConfig,
            ...defaultConfig,
            defaultWhiteboardScale: videoRatio,
            initWhiteboardProductionOptions: {
              proprietaryTools: true,
              isBaseboard: false,
              associatedMsgID: 'VideoWhiteboard',
            },
            canDraw: [0, 1].includes(SessionRoom.getMyself().role),
            backgroundColor: 'transparent',
          };
        }
        whiteboardService
          .getYsWhiteBoardManager()
          .createExtendWhiteboard(this.ref, videoDrawInstanceId, whiteboardToolBarConfig, this.whiteBoardCallback.bind(this));
        this.isCreated = true;
      },
    };
    return handlers[handlerName] || (() => {});
  }

  getDelHandler(handlerName) {
    const handlers = {
      VideoWhiteboard: () => {
        this.wbManager.destroyExtendWhiteboard(videoDrawInstanceId);
        this.wbManager.resetWhiteboardData(videoDrawInstanceId);
        this.isCreated = false;
      },
      ClassBegin: () => {
        this.wbManager.destroyExtendWhiteboard(videoDrawInstanceId);
        this.wbManager.resetWhiteboardData(videoDrawInstanceId);
      },
    };
    return handlers[handlerName] || (() => {});
  }

  render() {
    return (
      // eslint-disable-next-line no-return-assign
      <div id="videoMarkContainer" className="video-mark-container" ref={ref => (this.ref = ref)} />
    );
  }
}
