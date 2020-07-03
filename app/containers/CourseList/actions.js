import store from '@app/store';
import { SET_FILE_LIST, UPDATE_FILE_LIST, CURRENT_FILE, UPLOADING_PPT, SET_OPEN_FILE_ID, DEL_OPEN_FILE_ID, SET_MEDIA_STATUS } from './action-type';

const setFileList = fileList =>
  store.dispatch({
    type: SET_FILE_LIST,
    payload: {
      fileList,
    },
  });
const updateFileList = fileList =>
  store.dispatch({
    type: UPDATE_FILE_LIST,
    payload: {
      fileList,
    },
  });

// 是否正在上传ppt课件
const currentIsUpFile = data =>
  store.dispatch({
    type: CURRENT_FILE,
    payload: data,
  });

const uploadingpptFn = data =>
  store.dispatch({
    type: UPLOADING_PPT,
    payload: data,
  });

const setOpenFile = (fileId, currpage = 1) => {
  store.dispatch({
    type: SET_OPEN_FILE_ID,
    payload: { openFile: { fileId, currpage } },
  });
};

const delOpenFile = fileId =>
  store.dispatch({
    type: DEL_OPEN_FILE_ID,
    payload: { fileId },
  });

const setMediaStatus = (fileId, mediaStatus) =>
  store.dispatch({
    type: SET_MEDIA_STATUS,
    payload: { fileId, mediaStatus },
  });
export default {
  setFileList,
  updateFileList,
  currentIsUpFile,
  uploadingpptFn,
  setOpenFile,
  setMediaStatus,
  delOpenFile,
};
