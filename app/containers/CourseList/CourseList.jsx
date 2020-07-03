import React from 'react';
import { connect } from 'react-redux';
import { SessionRoom, Event } from '@global/roomConstants';
import WhiteboardService from '@global/services/WhiteboardService';
import { YsGlobal } from '@global/handleGlobal';
import FetchService from '@global/services/FetchService';
import Actions from './actions';
import { FileItemEvent, FileListEvent } from './service/service';
import FileListContent from './components/FileListContent';

import './static/sass/index.scss';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    this.whiteBoard = FileItemEvent.addWhiteBoardInfo();
  }

  componentDidMount() {
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    Event.on('receiveWhiteboardSDKAction', this.receiveWhiteboardSDKAction.bind(this), this.listernerBackupid); // 监听room事件：room-delete-file
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
  }

  handlerRoomAddFile(pubMsgData) {
    const { data, fromID } = pubMsgData;
    const {
      filedata: { fileid },
    } = data;
    const { fileSortType, isAsc } = this.props;
    const _isServer = SessionRoom.getUser(fromID) && SessionRoom.getUser(fromID).id;
    const fileInfo = !_isServer ? data.filedata : FetchService.getFileinfo(fileid) || {};
    // 通过后台上传的自己加入fileList
    let fileList = !_isServer ? [...this.props.fileList, fileInfo] : [...this.props.fileList];
    fileList = FileListEvent._sortFileList(fileList, { fileSortType, isAsc });
    this.props.updateFileList(fileList);
    if (!fileInfo.dynamicppt && fileInfo.filetype !== 'mp3' && fileInfo.filetype !== 'mp4') {
      if (!YsGlobal.roomConfigItem.isMoreWhiteboard || fromID !== '__YSServer') {
        this.props.setOpenFile(fileid, 1);
      }
      // if (fromID === SessionRoom.getMyself().id) {
      WhiteboardService.getYsWhiteBoardManager().changeDocument(fileInfo, fileInfo.currpage);
      // }
    }
  }

  handlePubMsg(pubMsgData) {
    const { name, data } = pubMsgData;
    if (name === 'DocumentChange') {
      const { isDel } = data;
      if (isDel) {
        this.handlerRoomDeleteFile(pubMsgData);
      } else {
        this.handlerRoomAddFile(pubMsgData);
      }
    }
  }

  handlerRoomDeleteFile(pubMsgData) {
    const { data, fromID } = pubMsgData;
    const {
      filedata: { fileid },
    } = data;
    const { setOpenFile, openFileList, updateFileList, fileList: oldFileList } = this.props;
    const _isServer = SessionRoom.getUser(fromID) && SessionRoom.getUser(fromID).id;
    const fileList = oldFileList.filter(fileItem => fileItem.fileid !== (!_isServer ? `${fileid}` : fileid)); // 后台删除课件是数字，就转化为字符串班
    Actions.delOpenFile(fileid);
    updateFileList([].concat(fileList));
    // 如果是多課件，銷毀白板
    if (YsGlobal.roomConfigItem.isMoreWhiteboard) {
      WhiteboardService.getYsWhiteBoardManager().destroyMoreWhiteboards(`docModule_${fileid}`);
    }
    // 如果是單課件，切換文件   当前文件打开状态，并只有自己删除的文件才能发送切换文档的消息
    if (openFileList[fileid] && (!_isServer || fromID === SessionRoom.getMyself().id) && !YsGlobal.roomConfigItem.isMoreWhiteboard) {
      const fileIndex = oldFileList.findIndex(fileData => fileData.fileid === (!_isServer ? `${fileid}` : fileid)); // 后台删除课件是数字，就转化为字符串班
      const file = fileIndex > 0 ? oldFileList[fileIndex - 1] : FileItemEvent.addWhiteBoardInfo();
      setOpenFile(file.fileid, 1);
      WhiteboardService.getYsWhiteBoardManager().changeDocument(file, file.currpage);
    }
  }

  /**
   * 处理白板sdk返回的数据
   * @params {sting} action 动作
   * @params {object} cmd 当前动作携带的数据
   */
  receiveWhiteboardSDKAction(data) {
    const { action, cmd = {}, source } = data;
    const { viewState, type, attributes } = cmd;
    const { setOpenFile } = this.props;
    switch (action) {
      case 'viewStateUpdate':
        {
          const { fileid, page } = viewState;
          const { updateFileList, fileList: oldFileList } = this.props;
          const curFile = oldFileList.find(fileItem => fileItem.fileid === fileid);
          if (curFile) {
            curFile.currentPage = page.currentPage;
            updateFileList([].concat(oldFileList));
          }
          setOpenFile(Number(fileid), page.currentPage);
        }
        break;
      case 'mediaPlayerNotice':
        if (type === 'play') {
          Actions.setMediaStatus(attributes.fileid, { mediaStatus: 'play', instanceId: source });
        } else if (type === 'pause') {
          Actions.setMediaStatus(attributes.fileid, { mediaStatus: 'pause', instanceId: source });
        } else if (type === 'end') {
          Actions.setMediaStatus(attributes.fileid, { mediaStatus: 'end', instanceId: source });
          Actions.delOpenFile(attributes.fileid);
        }
        break;
      // case 'moreWhiteboardCreated':
      //   {
      //     const { fileInfo } = cmd;
      //   }
      //   break;
      case 'moreWhiteboardDestory':
        {
          const { fileInfo } = cmd;
          Actions.delOpenFile(fileInfo.fileid);
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <article
        style={{ top: this.props.isSupportPageTrun ? '-40px' : '0' }}
        className="courseware-box"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span className="triangle"></span>
        <div className="courseware_content">
          <FileListContent {...this.props} whiteBoard={this.whiteBoard} />
        </div>
      </article>
    );
  }
}
const mapStateToProps = state => {
  const { file } = state;
  return {
    fileList: file.fileList,
    fileSortType: file.fileSortType,
    isAsc: file.isAsc,
    openFileList: file.openFileList,
  };
};

const mapDispatchToProps = () => ({
  updateFileList: data => Actions.updateFileList(data),
  upFilePPT: data => Actions.currentIsUpFile(data),
  setOpenFile: (...data) => Actions.setOpenFile(...data),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
