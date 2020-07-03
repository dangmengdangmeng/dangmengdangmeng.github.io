import store from '@app/store';
import { YsGlobal } from '@global/handleGlobal';
import { TOGGLE_NAVBAR, CHANGE_MODAL_MSG, HIDE_MODAL, TOGGLE_VIDEOMIRROR, SET_NOTICEDATA, SET_ISCHECKMORE, SET_SCREENSHARE } from '../actionTypes/common';

const { alert } = YsGlobal.languageInfo;
const toggleNavbar = activeName => {
  let active = activeName;
  if (store.getState().common.visible === activeName) {
    active = '';
  }
  return store.dispatch({
    type: TOGGLE_NAVBAR,
    payload: {
      visible: active,
    },
  });
};

const changeModalMsg = (msg, callback) => {
  store.dispatch({
    type: CHANGE_MODAL_MSG,
    payload: {
      type: msg.type, // 'alert','comfirm','costom'
      message: msg.message,
      title: msg.title || (!msg.title && msg.type === 'alert' ? alert.prompInfo : alert.confirmInfo),
      cancleBtn: msg.cancleBtn || '取消',
      okBtn: msg.okBtn || '确定',
      customContent: msg.customContent,
      callback(answer, message) {
        if (callback && typeof callback === 'function') {
          let res = callback(answer, message);
          if (res === undefined) {
            res = true;
          }
          return res;
        }
        return true;
      },
    },
  });
};

const hideModal = () =>
  store.dispatch({
    type: HIDE_MODAL,
    payload: {},
  });

const toggleVideoMirror = flag =>
  store.dispatch({
    type: TOGGLE_VIDEOMIRROR,
    payload: {
      isVideoMirror: flag,
    },
  });

const setNoticeData = data =>
  store.dispatch({
    type: SET_NOTICEDATA,
    payload: {
      data,
    },
  });

const toggleIscheckMore = data =>
  store.dispatch({
    type: SET_ISCHECKMORE,
    payload: data,
  });

const setScreenShare = shareInfo =>
  store.dispatch({
    type: SET_SCREENSHARE,
    payload: shareInfo,
  });

export default {
  toggleNavbar,
  changeModalMsg,
  hideModal,
  toggleVideoMirror,
  setNoticeData,
  toggleIscheckMore,
  setScreenShare,
};
