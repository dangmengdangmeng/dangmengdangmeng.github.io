import { ROOM_STATE, ROOM_TYPE } from '@global/roomConstants';
import { getUrlParams } from '../../utils/url.ts';
import {
  SET_ROOM_STATUS,
  BEGIN_CLASS,
  SET_IS_CLASS_BEGIN,
  SET_STUDENT_COUNT,
  SWITCH_LAYOUT,
  EXCHANGE_ONE2ONELAYOUT,
  INIT_CLASSROOM_STATE,
  SET_PAGE_ORIENTATION,
  SET_IS_ALL_NO_AUDIO,
  SET_IS_BIG_ROOM,
  SET_ROOM_INFO,
} from '../actionTypes/classroom';

const video = getUrlParams('video') || '';
const isMobile = navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
const roomType = parseInt(getUrlParams('roomtype'), 10);
const initialState = {
  roomStatus: ROOM_STATE.INIT, // connected 房间链接成功
  classBeginTime: '',
  isClassBegin: '',
  studentCount: 0,
  isVideoLayout: roomType === ROOM_TYPE.MEETING_ROOM && !isMobile,
  isNested: '',
  isExchangeOne2oneLayout: false,
  isFoldedOne2oneLayout: false,
  pageOrientation: 0,
  isAllNoAudio: false,
  isBigRoom: false,
  roomInfo: {
    videoheight: Number(video.split('*')[1]),
    videowidth: Number(video.split('*')[0]),
  },
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ROOM_STATUS: {
      return {
        ...state,
        roomStatus: payload,
      };
    }
    case SET_ROOM_INFO: {
      return {
        ...state,
        roomInfo: {
          ...state.roomInfo,
          ...payload,
        },
      };
    }
    case SET_IS_CLASS_BEGIN: {
      return {
        ...state,
        isClassBegin: payload,
      };
    }
    case SET_IS_BIG_ROOM: {
      return {
        ...state,
        isBigRoom: payload,
      };
    }
    case BEGIN_CLASS: {
      return {
        ...state,
        classBeginTime: payload.time,
      };
    }
    case SET_STUDENT_COUNT: {
      return {
        ...state,
        studentCount: payload.studentCount,
      };
    }
    case SWITCH_LAYOUT: {
      return {
        ...state,
        isVideoLayout: payload.isVideoLayout,
        isNested:payload.isNested,
      };
    }
    case EXCHANGE_ONE2ONELAYOUT: {
      return {
        ...state,
        isExchangeOne2oneLayout: payload.isExchangeOne2oneLayout,
        isFoldedOne2oneLayout: payload.isFoldedOne2oneLayout,
      };
    }
    case SET_PAGE_ORIENTATION: {
      return {
        ...state,
        pageOrientation: payload.pageOrientation,
      };
    }
    case SET_IS_ALL_NO_AUDIO: {
      return {
        ...state,
        isAllNoAudio: payload.isAllNoAudio,
      };
    }
    case INIT_CLASSROOM_STATE: {
      return {
        ...state,
        classBeginTime: '',
        isClassBegin: '',
        studentCount: 0,
        isVideoLayout: false,
      };
    }
    default: {
      return state;
    }
  }
}
