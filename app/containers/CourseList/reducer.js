import { YsGlobal } from '@global/handleGlobal';
import { getFileType } from '@utils/ysUtils';
import { SET_FILE_LIST, UPDATE_FILE_LIST, CURRENT_FILE, UPLOADING_PPT, SET_OPEN_FILE_ID, DEL_OPEN_FILE_ID, SET_MEDIA_STATUS } from './action-type';
import { FileItemEvent } from './service/service';
const initialState = {
  fileList: [],
  fileSortType: 'fileid', // 排序类型 , fileid / filetype / filename
  isAsc: true, // 默认升序
  selectedFileID: FileItemEvent.addWhiteBoardInfo().fileid,
  isCurrentUpFile_ppt: false,
  uploadingPPT: false,
  // openFileIdArr: [], // 已经打开的非媒体课件id
  openFileList: {}, // 已经打开的课件 fileId-课件id，fileType-课件类型，mediaStatus-媒体课件播放状态，currpage-课件当前页, instanceId-该课件所在白板的实例id
  mediaStatusInfo: {}, // 媒体课件状态
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // 是否正在上传ppt课件
    case UPLOADING_PPT:
      return {
        ...state,
        uploadingPPT: payload,
      };
    // 是否正在转换ppt课件
    case CURRENT_FILE:
      return {
        ...state,
        isCurrentUpFile_ppt: payload,
      };

    // 新增课件列表
    case SET_FILE_LIST: {
      return {
        ...state,
        fileList: payload.fileList,
      };
    }
    // 更新课件列表
    case UPDATE_FILE_LIST: {
      return {
        ...state,
        fileList: payload.fileList,
      };
    }
    case SET_OPEN_FILE_ID: {
      const { openFile } = payload;
      const openFileList = Object.assign({}, state.openFileList);
      const setFile = openFile.fileId === 0 ? FileItemEvent.addWhiteBoardInfo() : state.fileList.find(file => file.fileid === openFile.fileId);
      if (setFile) {
        const isSetMediaFile = ['mp3', 'mp4'].includes(getFileType(setFile.filetype));
        if (!YsGlobal.roomConfigItem.isMoreWhiteboard) {
          // 不是多白板模式最多只保留一个媒体课件和一个文档课件
          for (const value of Object.values(openFileList)) {
            if (isSetMediaFile) {
              if (['mp3', 'mp4'].includes(getFileType(value.fileType))) {
                delete openFileList[value.fileId];
              }
            } else if (!['mp3', 'mp4'].includes(getFileType(value.fileType))) {
              delete openFileList[value.fileId];
            }
          }
        }
        openFileList[openFile.fileId] = Object.assign({}, openFileList[openFile.fileId], openFile, { fileType: setFile.filetype });
      }
      return {
        ...state,
        openFileList,
      };
    }
    case DEL_OPEN_FILE_ID: {
      const { fileId } = payload;
      const openFileList = Object.assign({}, state.openFileList);
      delete openFileList[fileId];
      return {
        ...state,
        openFileList,
      };
    }
    case SET_MEDIA_STATUS: {
      const { fileId, mediaStatus } = payload;
      const openFileList = Object.assign({}, state.openFileList);
      openFileList[fileId] = Object.assign({}, openFileList[fileId], mediaStatus);
      return {
        ...state,
        openFileList,
      };
    }
    default:
      return state;
  }
}
