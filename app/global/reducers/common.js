import { TOGGLE_NAVBAR, CHANGE_MODAL_MSG, HIDE_MODAL, TOGGLE_VIDEOMIRROR, SET_NOTICEDATA, SET_ISCHECKMORE, SET_SCREENSHARE } from '../actionTypes/common';

const initialState = {
  visible: '',
  modalIsShow: false,
  modalMessage: {},
  isVideoMirror: true, // 视频镜像
  noticeData: {},
  isCheckMore: false,
  screenShare: {
    hasShare: false,
    userId: '',
  },
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_NAVBAR: {
      return {
        ...state,
        visible: payload.visible,
      };
    }
    case CHANGE_MODAL_MSG: {
      return {
        ...state,
        modalIsShow: true,
        modalMessage: {
          ...state.modalMessage,
          ...payload,
        },
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modalIsShow: false,
        modalMessage: {},
      };
    }
    case TOGGLE_VIDEOMIRROR: {
      return {
        ...state,
        isVideoMirror: payload.isVideoMirror,
      };
    }
    case SET_NOTICEDATA: {
      return {
        ...state,
        noticeData: payload.data,
      };
    }
    case SET_ISCHECKMORE: {
      return {
        ...state,
        isCheckMore: payload,
      };
    }
    case SET_SCREENSHARE: {
      return {
        ...state,
        screenShare: { ...payload },
      };
    }
    default: {
      return state;
    }
  }
}
