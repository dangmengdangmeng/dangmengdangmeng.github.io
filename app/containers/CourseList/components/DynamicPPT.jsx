/* eslint-disable react/button-has-type */
/**
 * 课件上传进度条
 */
import React from 'react';
import { Event, FILETYPE } from '@global/roomConstants';
import UploadFileFrom from 'UploadFileFrom';
import Signalling from '@global/services/SignallingService';
import FetchService from '@global/services/FetchService';
import { YsGlobal } from '@global/handleGlobal';
import { connect } from 'react-redux';
import { FileItemEvent } from '../service/service';
import Actions from '../actions';

const { courseList } = YsGlobal.languageInfo;
const { fileProgressBarInner, serviceInner } = courseList;
const invalidType = ['zip'];
class DynamicPPT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      currProgressText: '0%',
      showProgress: false,
      isTrans: false,
      fileInfoObj: null,
    };
    this.AJAXCancel = null;
    this.uploadCancel = this.uploadCancel.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
  }

  componentDidMount() {
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
  }

  handlePubMsg(pubMsgData) {
    switch (pubMsgData.name) {
      case 'DocTransformComplete': {
        // 文件转换成功
        if (this.state.isTrans) {
          const { fileInfoObj } = this.state;
          // 动态课件转换成功发信令
          Signalling.sendSignallingFromDocumentChange(fileInfoObj, false);
          this.uploadSuccess();
          this.props.upFilePPT(false);
        }
        break;
      }
    }
  }

  uploadFile(formData, filename, filetype) {
    const isDynamicppt = Number(formData.get('dynamicppt'));
    if (this.props.isCurrentUpFile_ppt && isDynamicppt) return;
    const { isLiveRoom } = JSON.parse(this.props.roomInfo);
    if (invalidType.includes(filetype) && isLiveRoom) {
      this.setState({
        showProgress: true,
        currProgressText: FileItemEvent.fileUploadErrorCode(-4),
      });
      this.uploadCancel();
      return;
    }
    const id = new Date().getTime();
    this.setState({
      fileInfoObj: null,
    });
    this.setState(() => ({
      showProgress: true,
    }));
    this.props.clickEffect(false);
    this.AJAXCancel = FetchService.uploadRoomFile(
      formData,
      // 上传状态
      (code, fileInfoObj) => {
        if (code === 0) {
          if (isDynamicppt) {
            this.setState({
              fileInfoObj,
              isTrans: true,
            });
            this.props.upFilePPT(true);
          } else {
            this.uploadSuccess();
          }
        } else {
          this.setState({
            percent: 100,
            currProgressText: FileItemEvent.fileUploadErrorCode(code),
          });
          this.uploadCancel(id);
        }
      },
      // 上传进度
      number => {
        if (number >= 100) {
          if (filetype !== 'mp3' && filetype !== 'mp4') {
            this.setState({
              percent: 100,
              currProgressText: fileProgressBarInner.fileConversionPPT,
            });
          } else {
            this.setState({
              percent: 100,
              currProgressText: '100%',
            });
            if (this.props.isCurrentUpFile_ppt) {
              this.setState({
                currProgressText: fileProgressBarInner.fileConversionPPTPPT,
              });
            }
          }
          this.props.clickEffect(true);
          this.props.uploading(false);
        } else {
          this.props.uploading(true);
          this.setState({
            percent: number,
            currProgressText: `${number}%`,
          });
        }
      },
    );
  }

  uploadSuccess() {
    const timer = setTimeout(() => {
      this.setState(() => ({
        showProgress: false,
      }));
      this.props.clickDisable();
      clearTimeout(timer);
    }, 500);
  }

  uploadCancel() {
    if (this.AJAXCancel && typeof this.AJAXCancel.abort === 'function') {
      this.AJAXCancel.abort();
    }
    const timer = setTimeout(() => {
      this.setState({
        showProgress: false,
      });
      this.props.clickDisable();
      clearTimeout(timer);
    }, 2000);
    return false;
  }

  render() {
    const { percent, currProgressText, showProgress } = this.state;
    const { fileType, uploadFileFromFlag, uploadType, roomInfo } = this.props;
    const { isLiveRoom } = JSON.parse(roomInfo);
    const uploadFiles = isLiveRoom ? FILETYPE.liveAccpet : FILETYPE.documentFileListAccpet;
    const accept = uploadType === 'upLoadMore' ? uploadFiles : FILETYPE.dynamicPPT;
    return (
      <div className="progress-bar-box" style={{ display: this.props.isCurrentUpFile_ppt || showProgress ? 'flex' : 'none' }}>
        <span className="progress-bar" style={{ width: `${percent}%` }}>
          <span className="curr-progress">{currProgressText}</span>
        </span>
        <button
          style={{
            display: currProgressText === fileProgressBarInner.fileConversionPPT ? 'none' : 'block',
          }}
          className="cancel-file-upload"
          onClick={this.uploadCancel}
        />
        <UploadFileFrom
          isWritedbFromUploadFile
          accept={accept}
          fileType={fileType}
          flag={uploadFileFromFlag}
          externalUploadFileCallback={this.uploadFile}
          uploadType={uploadType}
          size={YsGlobal.MAX_FILE_SIZE}
          maxFileAlertText={serviceInner.fileSizeLimit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { file } = state;
  return {
    isCurrentUpFile_ppt: file.isCurrentUpFile_ppt,
    roomInfo: JSON.stringify(state.classroom.roomInfo),
  };
};

const mapDispatchToProps = () => ({
  upFilePPT: data => Actions.currentIsUpFile(data),
  uploading: data => Actions.uploadingpptFn(data),
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicPPT);
