import store from '@app/store';
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

/**
 * 房间状态
 * @param {String} status 房间状态
 */
const setRoomStatus = status =>
  store.dispatch({
    type: SET_ROOM_STATUS,
    payload: status,
  });

/**
 * 开始上课
 * @param {*} payload
 */
const beginClass = time =>
  store.dispatch({
    type: BEGIN_CLASS,
    payload: {
      time,
    },
  });

/**
 * 是否已上课
 * @param {*} payload
 */
const setIsClassBegin = isClassBegin =>
  store.dispatch({
    type: SET_IS_CLASS_BEGIN,
    payload: isClassBegin,
  });

const setStudentCount = count => {
  store.dispatch({
    type: SET_STUDENT_COUNT,
    payload: {
      studentCount: count,
    },
  });
};

const setVideoLayout = (isVideoLayout, isNested = '') =>
  store.dispatch({
    type: SWITCH_LAYOUT,
    payload: {
      isVideoLayout,
      isNested,
    },
  });

const exchangeOne2oneVideoLayout = (isExchangeOne2oneLayout, isFoldedOne2oneLayout = false) =>
  store.dispatch({
    type: EXCHANGE_ONE2ONELAYOUT,
    payload: {
      isExchangeOne2oneLayout,
      isFoldedOne2oneLayout,
    },
  });

const initClassRoomState = () => {
  store.dispatch({
    type: INIT_CLASSROOM_STATE,
  });
};

const setPageOrientation = pageOrientation => {
  store.dispatch({
    type: SET_PAGE_ORIENTATION,
    payload: {
      pageOrientation,
    },
  });
};

const setIsAllNoAudio = isAllNoAudio => {
  store.dispatch({
    type: SET_IS_ALL_NO_AUDIO,
    payload: {
      isAllNoAudio,
    },
  });
};

const setIsBigRoom = isBigRoom =>
  store.dispatch({
    type: SET_IS_BIG_ROOM,
    payload: isBigRoom,
  });

const setRoomInfo = roomInfo =>
  store.dispatch({
    type: SET_ROOM_INFO,
    payload: roomInfo,
  });

export default {
  setRoomStatus,
  beginClass,
  setIsClassBegin,
  setStudentCount,
  setVideoLayout,
  exchangeOne2oneVideoLayout,
  initClassRoomState,
  setPageOrientation,
  setIsAllNoAudio,
  setIsBigRoom,
  setRoomInfo,
};
