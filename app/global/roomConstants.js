/**
 * YS常量
 */
// import { getUrlParams } from '@app/utils/url';

// export const YS = window.YS || {};
// export const L = window.L || {};
// eslint-disable-next-line import/no-mutable-exports
// export let liveRoom = {};
// const isPlayback = getUrlParams('playback');
// if (isPlayback) {
//   liveRoom = window.YSPlayerSDK.getPlayerRoom();
//   window.liveRoom = liveRoom;
// } else {
//   liveRoom = YS.Room && YS.Room();
// }
import 'ys-ppapi-session/src/main';

export const { Event, Logger, Room: SessionRoom } = window.YSSession;
export const DeviceManager = SessionRoom.getDeviceManager();

/**
 * 发布音视频状态
 */
export const PUBLISH_STATE = {
  NONE: 0,
  AUDIOONLY: 1,
  VIDEOONLY: 2,
  BOTH: 3,
  MUTEALL: 4,
};

export const ROOM_STATE = {
  INIT: 'initialize',
  CONNECTED: 'connected',
  DISCONNECT: 'disconnect',
  EXPIRED: 'expired',
  END: 'end',
};

/* 房间类型 */
export const ROOM_TYPE = {
  CLASS_ROOM: 3, // 小班课
  LIVE_ROOM: 4, // 直播
  MEETING_ROOM: 6, // 会议
};

/**
 * 用户角色
 */
export const ROOM_ROLE = {
  TEACHER: 0, // 老师（主讲）
  ASSISTANT: 1, // 助教
  STUDENT: 2, // 学生
  PATROL: 4, // 巡检员（巡课）
  PLAYBACK: -1, // 回放者
};

/* 上传文件的类型 */
const imgFileListAccpetArr = ['jpg', 'jpeg', 'png', 'bmp', 'gif']; // 图片类型
const mediaFileListAccpetArr = ['mp3', 'mp4']; // 媒体文件类型数组
const h5DocumentFileListAccpetArr = ['zip']; // H5文件类型数组  //xgd 2017-09-21
const documentFileListAccpetArr = ['xls', 'xlsx', 'doc', 'docx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'mp3', 'mp4', 'zip', 'ppt', 'pptx']; // 普通文件类型数组
const liveAccpetArr = ['xls', 'xlsx', 'doc', 'docx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'mp3', 'mp4', 'ppt', 'pptx']; // 普通文件类型数组
const dynamicPPTArr = ['ppt', 'pptx'];
export const FILETYPE = {
  imgFileListAccpetArr,
  documentFileListAccpetArr,
  mediaFileListAccpetArr,
  h5DocumentFileListAccpetArr, // xgd 2017-09-21
  imgFileListAccpet: `.${imgFileListAccpetArr.join(',.')}`,
  documentFileListAccpet: `.${documentFileListAccpetArr.join(',.')}`,
  liveAccpet: `.${liveAccpetArr.join(',.')}`,
  dynamicPPT: `.${dynamicPPTArr.join(',.')}`,
  mediaFileListAccpet: `.${mediaFileListAccpetArr.join(',.')}`,
  h5DocumentFileListAccpet: `.${h5DocumentFileListAccpetArr.join(',.')}`,
};
const isMobile = navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
export const BASE_WIDTH = isMobile ? 750 : 1920;
export const BASE_NUMBER = 100;
export const VIDEO_DRAG_BOUND_ID = 'big_literally_wrap';
export const WB_CONTAINER_ID = 'white_board_outer_layout'; // 白板外层id
export const videoDrawInstanceId = 'videoDrawBoard';

// export const PROCESS_ENV = process.env.SERVICE_ENV === 'production' ? 'interaction' : 'demo';
