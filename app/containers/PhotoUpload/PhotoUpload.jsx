import React from 'react';
import { Event } from '@global/roomConstants';
import Actions from '@global/actions';
import UploadFileFrom from 'UploadFileFrom';
import { FileItemEvent, FileListEvent } from '@containers/CourseList/service/service';
import { connect } from 'react-redux';
import FetchService from '@global/services/FetchService';
import WhiteboardService from '@global/services/WhiteboardService';
import store from '@app/store';

const invalidType = ['zip'];
class PhotoUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      imgflag: 1,
    };
    this.size = 1 * 1024 * 1024; /* 上传图片默认参数 */
    this.accept = '.png,.gif,.jpg,.jpeg'; /* 上传图片默认参数 */
  }

  componentDidMount() {
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid); // 监听room事件：room-add-file
  }

  handlePubMsg(pubMsgData) {
    const { name, data } = pubMsgData;
    if (name === 'DocumentChange') {
      const { isDel } = data;
      if (isDel) {
        // this.handlerRoomDeleteFile(pubMsgData);
      } else {
        console.error('图片上传+++++++++', pubMsgData);
        this.handlerRoomAddFile(pubMsgData);
      }
    }
  }

  handlerRoomAddFile(receiveEventData) {
    const { fileid } = receiveEventData.message;
    const { fileSortType, isAsc } = this.props;
    const fileInfo = FetchService.getFileinfo(fileid) || {};
    let fileList = [...this.props.fileList, fileInfo];
    fileList = FileListEvent._sortFileList(fileList, { fileSortType, isAsc });
    this.props.updateFileList(fileList);
    this.props.setOpenFile(fileid, 1);
    WhiteboardService.getYsWhiteBoardManager().changeDocument(fileInfo, fileInfo.currpage);
  }

  uploadFile(formData, filename, filetype) {
    this.setState({
      imgflag: this.state.imgflag + 1,
    });
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    if (invalidType.includes(filetype) && isLiveRoom) {
      this.uploadCancel();
      return;
    }
    FetchService.uploadRoomFile(
      formData,
      // 上传状态
      code => {
        if (code !== 0) {
          FileItemEvent.fileUploadErrorCode(code);
        }
      },
    );
  }

  render() {
    const { imgflag } = this.state;
    return (
      <div>
        <div className="photoUpload">
          <div className="phototext">
            <UploadFileFrom isPhoto isWritedbFromUploadFile externalUploadFileCallback={this.uploadFile.bind(this)} accept={this.accept} flag={imgflag} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { file } = state;
  return {
    fileList: file.fileList,
    fileSortType: file.fileSortType,
    isAsc: file.isAsc,
  };
};
const mapDispatchToProps = () => ({
  updateFileList: data => Actions.updateFileList(data),
  setOpenFile: data => Actions.setOpenFile(data),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhotoUpload);
