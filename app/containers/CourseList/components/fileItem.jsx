import React from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom, ROOM_ROLE } from '@global/roomConstants';
import WhiteboardService from '@global/services/WhiteboardService';
import { connect } from 'react-redux';
import globalActions from '@global/actions';
import { getFileType } from '@utils/ysUtils';
import FetchService from '@global/services/FetchService';
import Icon from '@components/Icon';
import { mediaManager } from '@global/modules/Media';
import SignallingService from '../../../global/services/SignallingService.ts';

const {
  courseList: { fileFilterInner, fileProgressBarInner, serviceInner },
} = YsGlobal.languageInfo;

const FileItem = ({ file, openFile, openFileList, hasShare, setOpenFile, fileList, roomInfo }) => {
  const mySelf = SessionRoom.getMyself() || {};
  const { isLiveRoom, isMoreWhiteboard } = roomInfo;
  const serFileName = isLiveRoom || !isMoreWhiteboard ? serviceInner.blackboardFileName : serviceInner.serFileName;
  const getIconClass = () => {
    if (['png', 'jpeg', 'bmp', 'gif', 'jpg'].includes(file.filetype)) {
      return 'png';
    }
    if (['pptx', 'ppt'].includes(file.filetype)) {
      return 'pptx';
    }
    if (['word', 'doc', 'docx'].includes(file.filetype)) {
      return 'word';
    }
    if (['whiteboard', 'html', 'pdf', 'excle', 'txt', 'zip', 'mp3', 'mp4'].includes(file.filetype)) {
      return file.filetype;
    }
    return undefined;
  };

  const getEyeClassName = () => {
    if (['mp3', 'mp4'].includes(getFileType(file.filetype))) {
      const { mediaStatus } = openFile || {};
      if (!mediaStatus) return 'play';
      return mediaStatus === 'play' ? 'pause' : 'play';
    }
    return openFile ? 'eye_open' : 'eye_close';
  };

  const open = () => {
    if (['mp3', 'mp4'].includes(file.filetype)) {
      const { mediaStatus, instanceId, fileId } = openFile || {};
      Object.values(openFileList)
        .filter(item => ['mp3', 'mp4'].includes(item.filetype) && item.fileId !== fileId)
        .forEach(item => {
          const medias = mediaManager.getMediaById([item.instanceId, item.fileId].join('_'));
          medias.forEach(media => media.remove());
        });
      if (['play', 'pause'].includes(mediaStatus)) {
        const medias = mediaManager.getMediaById([instanceId, fileId].join('_'));
        medias.forEach(media => media.pause(mediaStatus === 'play'));
      }
    }
    if (hasShare && (file.filetype === 'mp4' || file.filetype === 'mp3')) {
      // eslint-disable-next-line no-alert
      alert(fileFilterInner.cantOpenMsg);
      return;
    }
    if (!openFile) {
      setOpenFile(file.fileid, file.currentPage || 1);
      WhiteboardService.getYsWhiteBoardManager().changeDocument(file, file.currentPage || 1);
    }
  };

  const onClickDeleteFile = (e, fileId) => {
    e.stopPropagation();
    globalActions.changeModalMsg(
      {
        type: 'comfirm',
        title: '',
        okBtn: fileProgressBarInner.confirm,
        cancleBtn: fileProgressBarInner.cancel,
        message: fileProgressBarInner.removeFile,
      },
      answer => {
        if (answer) {
          FetchService.deleteRoomFile(fileId).then(res => {
            if (res.result === 0) {
              console.error('上层调用deleteRoomFile');
            }
          });
        }
        if (YsGlobal.roomConfigItem.isMoreWhiteboard) {
          SignallingService.moreWhiteboardShowPage(`docModule_${fileId}`, {}, true);
        }
      },
    );
  };
  return (
    <div className="fileItem" onClick={() => open(file)}>
      <span className={`fileListIcon ${getIconClass()}`}></span>
      <span className="fileListTest">{file.fileid === 0 ? serFileName : file.filename}</span>
      <Icon type={getEyeClassName()} />
      {mySelf.role !== ROOM_ROLE.STUDENT && (
        <Icon className={file.filetype === 'whiteboard' ? 'visibility-h' : ''} type="clean" onClick={e => onClickDeleteFile(e, file.fileid)} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  hasShare: state.common.screenShare.hasShare,
  openFileList: state.file.openFileList,
  fileList: state.file.fileList,
  roomInfo: state.classroom.roomInfo,
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FileItem);
