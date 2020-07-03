/*
 * 工具条组件
 * */
import React, { Fragment } from 'react';

import WhiteboardService from '@global/services/WhiteboardService';
import { YsGlobal } from '@global/handleGlobal';
import { Event, SessionRoom, ROOM_ROLE, videoDrawInstanceId } from '@global/roomConstants';
import Icon from '@components/Icon';
import ToolPenList from './ToolPenList/index';
import ToolText from './ToolText/index';
import ToolShapeList from './ToolShapeList/index';
import ToolEraser from './ToolEraser/index';

import './static/sass/toolsBar.scss';
import './static/font/style.css';
const { tools } = YsGlobal.languageInfo.whiteboard;
class WhiteboardToolsBar extends React.Component {
  constructor(props) {
    super(props);
    const mySelf = SessionRoom.getMyself() || {};
    this.state = {
      show: true,
      isActive: 'tool_mouse',
      eraserDisabled: false,
      clearDisabled: false,
      redoDisabled: false,
      undoDisabled: false,
      eraserWidth: 15,
      fontFamily: '微软雅黑',
      fontSize: 48,
      penWidth: 5,
      shapeWidth: 5,
      primaryColor: mySelf.primaryColor,
      pen: 'tool_pencil',
      shape: 'tool_rectangle_empty',
      showSelectType: '', // penPanel：画笔选择框，shapePanel：形状选择框，textPanel：文字选择框，eraserPanel：橡皮选择框
    };
    this.activeInstanceId = 'default';
    this.isMoreWhiteboard = YsGlobal.roomConfigItem.isMoreWhiteboard;
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    Event.on('receiveWhiteboardSDKAction', this.receiveWhiteboardSDKAction.bind(this), this.listernerBackupid); // 监听room事件：room-delete-file
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
  }

  // 处理白板回调数据状态
  receiveWhiteboardSDKAction(data) {
    const { action, cmd = {}, source } = data;
    if (action === 'currentWhiteboardId' && this.state.showSelectType) {
      this.setState({
        showSelectType: '',
      });
    }
    if (action === 'moduleTriggerClick') {
      this.activeInstanceId = source;
      const { openFileList = {} } = this.props;
      const hasPptPlayMp4 = Object.values(openFileList).find(item => item.instanceId === source && item.mediaStatus === 'pause');
      if (hasPptPlayMp4) {
        WhiteboardService.getYsWhiteBoardManager().triggerEvent('viewStateUpdate', videoDrawInstanceId);
      }
      if (cmd.viewState && cmd.viewState.action && !hasPptPlayMp4) {
        const {
          action_undo: { disabled: undoDisabled },
          action_redo: { disabled: redoDisabled },
          action_clear: { disabled: clearDisabled },
        } = cmd.viewState.action;
        const {
          tool_eraser: { disabled: eraserDisabled },
        } = cmd.viewState.tool;
        this.setState({
          clearDisabled,
          redoDisabled,
          undoDisabled,
          eraserDisabled,
        });
      }
    }
    const { updateViewState, viewState } = cmd;
    if (!updateViewState || !viewState) {
      return;
    }
    let {
      pen,
      shape,
      isActive,
      eraserDisabled,
      clearDisabled,
      redoDisabled,
      undoDisabled,
      fontSize,
      penWidth,
      shapeWidth,
      fontFamily,
      primaryColor,
      eraserWidth,
    } = this.state;
    switch (action) {
      case 'viewStateUpdate':
        {
          const { tool = {}, action: toolAction = {}, other = {} } = viewState;
          const { action_clear: actionClear = {}, action_redo: actionRedo = {}, action_undo: actionUndo = {} } = toolAction;
          Object.entries(tool).forEach(([key]) => {
            if (key === 'tool_pencil' || key === 'tool_highlighter' || key === 'tool_line' || key === 'tool_arrow') {
              if (tool[key].isUse) {
                pen = key;
              }
            }
            if (key === 'tool_rectangle_empty' || key === 'tool_rectangle' || key === 'tool_ellipse_empty' || key === 'tool_ellipse') {
              if (tool[key].isUse) {
                shape = key;
              }
            }
            if (tool[key].isUse) {
              isActive = key;
            }
            eraserDisabled = tool.tool_eraser.disabled;
          });
          clearDisabled = actionClear.disabled;
          redoDisabled = actionRedo.disabled;
          undoDisabled = actionUndo.disabled;

          fontSize = other.fontSize || fontSize;
          penWidth = other.pencilWidth || penWidth;
          shapeWidth = other.shapeWidth || shapeWidth;
          fontFamily = other.fontFamily || fontFamily;
          primaryColor = other.primaryColor || primaryColor;
          eraserWidth = other.eraserWidth || eraserWidth;
          const videoMarkContainerEle = document.getElementById('videoMarkContainer');
          if (videoMarkContainerEle) {
            if (isActive === 'tool_mouse') {
              videoMarkContainerEle.style.pointerEvents = 'none';
            } else {
              videoMarkContainerEle.style.pointerEvents = '';
            }
          }
          this.setState({
            pen,
            shape,
            isActive,
            eraserDisabled,
            clearDisabled,
            redoDisabled,
            undoDisabled,
            fontSize,
            penWidth,
            shapeWidth,
            fontFamily,
            primaryColor,
            eraserWidth,
          });
        }
        break;
      default:
        break;
    }
  }

  toggle() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  openToolMouse(type) {
    this._changeWBTool(type);
    this.setState({
      isActive: type,
    });
  }

  showShapeList() {
    const { shape, showSelectType } = this.state;
    this._changeWBTool(shape);
    this.setState({
      isActive: shape,
      showSelectType: showSelectType === 'shapePanel' ? '' : 'shapePanel',
    });
  }

  showPenList() {
    const { pen, showSelectType } = this.state;
    this._changeWBTool(pen);
    this.setState({
      isActive: pen,
      showSelectType: showSelectType === 'penPanel' ? '' : 'penPanel',
    });
  }

  changePen(e) {
    if (e.target.dataset.type) {
      this._changeWBTool(e.target.dataset.type);
      this.setState({
        isActive: e.target.dataset.type,
        pen: e.target.dataset.type,
      });
    }
    e.stopPropagation();
  }

  hideAllSelectBox() {
    this.setState({
      showSelectType: '',
    });
  }

  setLineColor(hexColor) {
    if (hexColor) {
      this.setState(
        {
          primaryColor: hexColor,
        },
        () => {
          this._changeWBConfig({ primaryColor: hexColor });
        },
      );
    }
  }

  getWidthByType(value, type) {
    if (!type) return false;
    let width = 0;
    switch (type) {
      case 'line':
      case 'shape':
      case 'text':
      case 'eraser':
        width = Math.ceil(Number(value));
        if (width === 0) {
          width = 1;
        }
        break;
      default:
        break;
    }
    return width;
  }

  onAfterChangePenLineWidth(value) {
    const width = this.getWidthByType(value, 'line');
    this.setState({
      penWidth: width,
    });
    this._changeWBConfig({ pencilWidth: width });
  }

  onAfterChangeShapeLineWidth(value) {
    const width = this.getWidthByType(value, 'shape');
    this._changeWBConfig({ shapeWidth: width });
  }

  openToolLaser(type) {
    this._changeWBTool(type);
    this.setState({
      isActive: type,
      showSelectType: '',
    });
  }

  openToolText(type) {
    const { showSelectType } = this.state;
    this._changeWBTool(type);
    this.setState({
      isActive: type,
      showSelectType: showSelectType === 'textPanel' ? '' : 'textPanel',
    });
  }

  changeFontFamily(e) {
    if (e && e.target && e.target.dataset.fontfamily) {
      this.setState({ fontFamily: e.target.dataset.fontfamily });
      this._changeWBConfig({ fontFamily: e.target.dataset.fontfamily });
    }
    e.stopPropagation();
  }

  changeFontSize(value) {
    const width = this.getWidthByType(value, 'text');
    this.setState({ fontSize: width });
    this._changeWBConfig({ fontSize: width });
  }

  changeShape(e) {
    if (e && e.target && e.target.dataset.type) {
      this._changeWBTool(e.target.dataset.type);
      this.setState({
        isActive: e.target.dataset.type,
      });
    }
    e.stopPropagation();
  }

  openToolEraser(type) {
    const { showSelectType } = this.state;
    this._changeWBTool(type);
    this.setState({
      isActive: type,
      showSelectType: showSelectType === 'eraserPanel' ? '' : 'eraserPanel',
    });
  }

  changeEraser(e) {
    if (e && e.stopPropagation) {
      return e.stopPropagation();
    }
    return false;
  }

  onAfterChangeEraserWidth(value) {
    const width = Math.floor(this.getWidthByType(value, 'eraser'));
    this._changeWBConfig({ eraserWidth: width });
  }

  openToolUndo() {
    this._handleWBAction('undo');
    this.hideAllSelectBox();
  }

  openToolRedo() {
    this._handleWBAction('redo');
    this.hideAllSelectBox();
  }

  openToolClear() {
    this._handleWBAction('clear');
    this.hideAllSelectBox();
  }

  /* 改变使用的画笔工具 */
  _changeWBTool(type) {
    const { instanceId, openFileList = {} } = this.props;
    if (this.isMoreWhiteboard) {
      WhiteboardService.getYsWhiteBoardManager().useMoreWhiteboardTool(type);
      const hasMediaFile = Object.values(openFileList).find(item => ['mp4', 'webm'].includes(item.fileType)) || {};
      if (hasMediaFile) {
        WhiteboardService.getYsWhiteBoardManager().useWhiteboardTool(type, videoDrawInstanceId);
      }
    } else {
      WhiteboardService.getYsWhiteBoardManager().useWhiteboardTool(type, instanceId);
      WhiteboardService.getYsWhiteBoardManager().useWhiteboardTool(type, videoDrawInstanceId);
    }
  }

  /* 改变使用的工具配置，颜色、宽度、字体等 */
  _changeWBConfig(config) {
    const { instanceId, openFileList = {} } = this.props;
    if (this.isMoreWhiteboard) {
      WhiteboardService.getYsWhiteBoardManager().changeMoreWhiteBoardConfigration(config);
      const hasMediaFile = Object.values(openFileList).find(item => ['mp4', 'webm'].includes(item.fileType)) || {};
      if (hasMediaFile) {
        WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(config, videoDrawInstanceId);
      }
    } else {
      WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(config, instanceId);
      WhiteboardService.getYsWhiteBoardManager().changeWhiteBoardConfigration(config, videoDrawInstanceId);
    }
  }

  /* 处理白板动作，撤销、恢复、清除 */
  _handleWBAction(actionType) {
    const { instanceId, openFileList = {} } = this.props;
    if (this.isMoreWhiteboard) {
      const activeFile = Object.values(openFileList).find(item => item.instanceId === this.activeInstanceId) || {};
      if (['mp4', 'webm'].includes(activeFile.fileType) || activeFile.mediaStatus === 'pause') {
        WhiteboardService.getYsWhiteBoardManager()[actionType](videoDrawInstanceId);
      } else {
        WhiteboardService.getYsWhiteBoardManager()[actionType](this.activeInstanceId);
      }
    } else {
      WhiteboardService.getYsWhiteBoardManager()[actionType](instanceId);
      WhiteboardService.getYsWhiteBoardManager()[actionType](videoDrawInstanceId);
    }
  }

  render() {
    const {
      show,
      isActive,
      eraserDisabled,
      clearDisabled,
      redoDisabled,
      undoDisabled,
      showSelectType,
      eraserWidth,
      fontFamily,
      fontSize,
      penWidth,
      primaryColor,
      pen,
      shape,
      shapeWidth,
    } = this.state;

    const mySelf = SessionRoom.getMyself() || {};

    const penProps = {
      showPenList: this.showPenList.bind(this),
      showSelectType,
      changePen: this.changePen.bind(this),
      hideAllSelectBox: this.hideAllSelectBox.bind(this),
      setLineColor: this.setLineColor.bind(this),
      onAfterChangePenLineWidth: this.onAfterChangePenLineWidth.bind(this),
      pen,
      isActive,
      primaryColor,
      penWidth,
    };

    const textProps = {
      openToolText: this.openToolText.bind(this, 'tool_text'),
      changePen: this.changePen.bind(this),
      hideAllSelectBox: this.hideAllSelectBox.bind(this),
      changeFontFamily: this.changeFontFamily.bind(this),
      setLineColor: this.setLineColor.bind(this),
      changeFontSize: this.changeFontSize.bind(this),
      primaryColor,
      fontFamily,
      showSelectType,
      isActive,
      fontSize,
      fontoptionsIsShow: mySelf.role === ROOM_ROLE.STUDENT,
    };

    const shapeProps = {
      showShapeList: this.showShapeList.bind(this),
      showSelectType,
      changeShape: this.changeShape.bind(this),
      hideAllSelectBox: this.hideAllSelectBox.bind(this),
      setLineColor: this.setLineColor.bind(this),
      onAfterChangeShapeLineWidth: this.onAfterChangeShapeLineWidth.bind(this),
      shape,
      isActive,
      primaryColor,
      shapeWidth,
    };

    const eraserProps = {
      openToolEraser: this.openToolEraser.bind(this, 'tool_eraser'),
      changeEraser: this.changeEraser.bind(this),
      hideAllSelectBox: this.hideAllSelectBox.bind(this),
      onAfterChangeEraserWidth: this.onAfterChangeEraserWidth.bind(this),
      eraserDisabled,
      isActive,
      showSelectType,
      eraserWidth,
    };
    return this.props.canDraw && this.props.isClassBegin ? (
      <ul
        className="tool-Bar-container"
        style={{ display: show ? 'block' : 'none' }}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <li className="tool-option tool_mouse" onClick={this.openToolMouse.bind(this, 'tool_mouse')} title={tools.tool_mouse}>
          <Icon active={isActive === 'tool_mouse'} type="pointer" />
        </li>
        {!YsGlobal.isMobile && (
          <li className="tool-option tool_laser" onClick={this.openToolLaser.bind(this, 'tool_laser')} title={tools.tool_laserPen}>
            <Icon active={isActive === 'tool_laser'} type="focus" />
          </li>
        )}
        <ToolPenList {...penProps} />
        <ToolText {...textProps} />
        <ToolShapeList {...shapeProps} />
        <ToolEraser {...eraserProps} />
        {mySelf.role !== ROOM_ROLE.STUDENT && (
          <Fragment>
            <li
              className={`tool-option tool_undo ${undoDisabled ? 'disabled' : ''} ${isActive === 'tool_undo' ? 'active' : ''}`}
              onClick={this.openToolUndo.bind(this, 'tool_undo')}
              title={tools.tool_revoke}
            >
              <Icon type="undo" disable={undoDisabled} />
            </li>
            <li
              className={`tool-option tool_redo ${redoDisabled ? 'disabled' : ''} ${isActive === 'tool_redo' ? 'active' : ''}`}
              onClick={this.openToolRedo.bind(this)}
              title={tools.tool_recovery}
            >
              <Icon type="redo" disable={redoDisabled} />
            </li>
            <li
              className={`tool-option tool_clear ${clearDisabled ? 'disabled' : ''} ${isActive === 'tool_clear' ? 'active' : ''}`}
              onClick={this.openToolClear.bind(this)}
              title={tools.tool_clear}
            >
              <Icon disable={clearDisabled} type="clean" />
            </li>
          </Fragment>
        )}
      </ul>
    ) : (
      ''
    );
  }
}
export default WhiteboardToolsBar;
