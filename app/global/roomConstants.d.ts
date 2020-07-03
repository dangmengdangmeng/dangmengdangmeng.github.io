import { IUser } from "./types/User";

/**
 * YS常量
 */
export declare const YS: any;
export declare const L: any;

declare interface IUserProperties {
  [propName: string]: any;
}

declare interface IDelMsgParams {
  msgName: string;
  msgId: string;
  toId: string;
}

declare interface IPubMsgParams extends IDelMsgParams {
  save: boolean;
  data: any;
  expiresabs: number;
  associatedMsgID: string;
  associatedUserID: string;
  type: string;
  write2DB: boolean;
  actions: any;
  modify: number;
  do_not_replace: boolean; // 老师和助教不能同时操作，后操作的服务器直接丢弃,(目前直播才有用)
}

declare interface IProfile {
  width: number;
  height: number;
  maxfps: number;
  [propName: string]: any;
}

declare interface ScreenInfo {
  electronblackwinlist: string[];
  types: string[];
  electron: {
    blackwinlist: string[];
    lang: 'zh-CN' | 'es-GB';
    style: any;
  };
}

declare type MediaType = 'video' | 'file' | 'media' | 'screen';
declare type StreamType = 0 | 1; // 0: big, 1: small

// eslint-disable-next-line import/no-mutable-exports
export declare const liveRoom: {
  addEventListener: (eventType: string, listener: (e: any) => void, backupid?: string) => void;
  batchChangeUserProperty: (ids: string[], toID: string, properties: IUserProperties) => void;
  changeMyDisableAudioState: (disableaudio: boolean) => void;
  changeMyDisableVideoState: (disablevideo: boolean) => void;
  changeUserProperty: (id: string | {ids: string[]}, toID: string, properties: IUserProperties) => void;
  changeUserPropertyByRole: (roles: number[], toID: string, properties: IUserProperties) => void;
  changeUserPublish: (id: string, publishstate: number, videoinputDeviceId: string) => void;
  changeUserShare: (id: string, publishstate: number, type: string) => void;
  checkInit: (onFailure: Function, isLog?: boolean) => void;
  delMsg: (params: IDelMsgParams) => void
  deleteFile: (fileid: string | number, callback?: (code: number, response: any) => void) => void;
  deleteRoomFile: (fileid: string | number, onSuccess?: (code: number, response: any) => void, onFailure?: (code: number, response: any) => void) => void;
  destroyServerRoom: () => void;
  dispatchEvent: (event: {
    type: string;
    message?: any;
  }, log?: boolean) => void;
  enableDualStream: (flag: boolean) => void;
  eventLog: (evjson: any) => void;
  evictUser: (id: string, causeJson?: any) => void;
  getAudioVolume: (userId: string, onVolume: Function, onFailure: Function, type: MediaType) => void;
  getDeviceMgr: () => any; // todo define type
  getDocServerList: () => any[]; // todo define type
  getFileList: () => any[]; // todo define type
  getFileinfo: (fileid: string | number) => any; // todo define type
  getIp: (success: Function, failure?: (error: any) => void) => void;
  getMySelf: () => IUser;
  getNativeInterface: (onFailure: (error: string) => void) => any;
  getPlaybackInterface: () => {
    handlerDuration: (e: any) => void;
    handlerPlaybackEnd: () => void;
    handlerPlaybackUpdateTime: (e: any) => void;
    joinPlaybackRoom: (e: any, t: any, i: any, o: any, r: any, n: any, a: any) => void;
    onHandlerDuration: (e: any) => void;
    onHandlerPlaybackEnd: () => void;
    onHandlerPlaybackUpdateTime: (e: any) => void;
    onJoinPlaybackRoom: (e: any, t: any, i: any, o: any, r: any, n: any, a: any) => void;
    onPausePlayback: (e: any, t: any) => void;
    onPlaybackClearAll: () => void;
    onSeekPlayback: (e: any, t: any) => void;
    pausePlayback: (e: any, t: any) => void;
    playbackClearAll: () => void;
    seekPlayback: (e: any, t: any) => void;
  };
  getRoomProperties: () => any;
  getRoomUser: (userId: string, onSuccess: (user: IUser) => void, onFailure: (error: string) => void) => void;
  getRoomUserNum: (onSuccess: (num: number) => void, roles: number[], onFailure?: (error: any) => void, search?: string) => void;
  getRoomUsers: (onSuccess: (users: IUser[], total: number) => void, start: number, max: number, roles: number[], onFailure?: (error: any) => void, search?: string) => void;
  getStreamStats: (peerId: string, callback: any) => void;
  getUploadFileParams: (filename: string, filetype: string, isWritedb: boolean, qRCodeId: string) => {
    serial: string; // 会议id
    userid: string; // 用户id
    sender: string; // 用户名
    conversion: number; // 是否进行文档转换
    isconversiondone: 0 | 1; // 表示是否从客户端进行转换   1：客户端转换 0：否
    writedb: 0 | 1; // 是否写数据库 1：写  0：不写
    fileoldname: string; // 原文件名(如果是原文件)
    filetype: string; // 文件类型(如果是原文件)
    alluser: number; // 是否对所有人可见
    qRCodeId?: string; // 二维码ID
  };
  getUser: (id: string) => IUser;
  getUsers: () => { [userid: string]: IUser };
  getVideoProfile: (videoinputDeviceId: string) => any;
  init: (appKey: string, onSuccess: Function, onFailure: (error: any) => void, isCheckDevice?: boolean, options?: {
    isEncryption: boolean; // 是否进行私有加密
    ys_invalidappkey: boolean; // 是否不验证企业key，默认验证
    onDecode: (appKey: string) => string; // 私有解密函数
    autoSubscribeAV: boolean; // 是否自动订阅音视频数据 , 如果为true则订阅过程中会接收服务器的音视频数据,否则不接收服务器音视频数据,只有调用playAudio/playVideo才会取服务器的相关音视频数据 , 默认为false
    isGetFileList: boolean; // 是否获取文件列表，缺省为false
    ys_multistream: boolean; // 是否是多流模式
    useServerScreenRecording: boolean; // 是否使用离屏录制，默认为false
    ys_use_secure_socket: boolean; // 是否使用https，默认为true
    ys_max_reconnect_count: number;
    ys_room_test_sdk: boolean; // 是否是测试sdk，默认为false
    safariOnlySubscibe: boolean; // safari是否只订阅而不发布，用于只看的一端，原因是safari枚举河北需要授权才有设备id
    isMix: boolean; // 是否混音
    useHttpProtocol: boolean;
    ys_host: string;
    ys_port: number;
    isCheckDevice: boolean;
    findAvailabilityDevice: boolean; // 是否寻找可用的设备
  }) => void;
  isPlayAudio: (url: string, isPlay: boolean, attrs: { [attrName: string]: any }) => void;
  joinPlaybackRoom: (host: string, port: number, params: {
    recordfilepath: string; // 回放录制件地址, 必须的
    roomtype: number; // 房间类型,
    serial: string | number; // 房间号,
    domain: string; // 公司的企业域名标识,
    host: string; // php请求域名
  }, onFailure: (error: any) => void, testip: string, testport: string, oldInitPlaybackInterface: boolean) => void;
  joinRoomEx: (roomId: string, nickName: string, userId: string, userJsonOptions?: { [props: string]: any }) => void;
  joinroom: (host: string, port: string | number, nickName: string, userId: string, roomJsonOptions: {
    serial: string; // 房间ID，String类型；
    password: string; // 房间密码，String类型，不同用户角色对应不同密码,
    checkroomParamsUrl: string; // 加入房间的地址串（内部使用）
    group: string[]; // 所属的组, Array
    recordLang: "zh-cn" | "en-us"; // "zh-cn" "en-us"
  }, userJsonOptions: { [attrName: string]: any }, testip: string, testport: string | number) => void;
  leaveroom: (force: boolean) => void;
  liveSimulateServerCommunicationInterface: (interfaceName: string) => void;
  localStreams: { [streamId: string]: any };
  pausePlayback: (bPause: boolean, onFailure: (error: any) => void) => void;
  pauseShareMedia: (bPause: boolean, onFailure: (error: any) => void) => void;
  playAudio: (userId: string, onFailure: (error: any) => void) => void;
  playRemoteMedia: (userId: string, elementId: string, options?: {
    audio: boolean; // 音频开启
    video: boolean; // 视频开启
    loader: boolean; // 是否显示加载中,默认true
  }, onFailure?: (error: any) => void) => void;
  playRemoteMediaFile: (userId: string, elementId: string, options?: {
    loader: boolean; // 是否显示加载中,默认true
  }, onFailure?: (error: any) => void) => void;
  playRemoteScreen: (userId: string, elementId: string, options?: { [attrName: string]: any }, onFailure?: (error: any) => void) => void;
  playVideo: (userId: string, elementId: string, options?: {
    mirror: boolean; // 是否开启视频镜像,默认false
    loader: boolean; // 是否显示加载中,默认true
  }, onFailure?: (error: any) => void, videoinputDeviceId?: string) => void;
  playVideoOnDemand: (url: string, parentID: string, opt?: { [attrName: string]: any }) => void;
  pubMsg: (params: IPubMsgParams) => void;
  publishAudio: () => void;
  publishVideo: (videoinputDeviceId: string) => void;
  registerAudioVolumeListener: (userId: string, msInterval: number, onVolume: Function, onFailure?: (error: any) => void, type?: string) => void;
  registerLogListener: (logListener: (logs: any[], level: 'DEBUG' | 'TRACE' | 'INFO' | 'WARNING' | 'ERROR') => void) => void;
  registerRoomWhiteBoardDelegate: (whiteboardManagerInstance: any) => void; // todo：整理白板管理器类型
  remoteStreams: { [propName: string]: any }
  removeAllEventListener: (eventTypeArr: string[]) => void;
  removeBackupListerner: (ebackupid: string) => void;
  removeEventListener: (eventType: string, listener: (recvEventData: any) => void) => void;
  reportDocServer: (docServer: string) => void;
  requestServerList: (host: string, port: string | number, onSuccess: Function, onFailure?: (error: any) => void, options?: {
    protocol: 'http'; // 可以配置协议protocol
    selfip: string; // 当前服务器ip，在用户属性里可以取到
  }) => void;
  seekMedia: (positionPercent: number, onFailure?: (error: any) => void) => void;
  seekPlayback: (positionTime: number, onFailure?: (error: any) => void) => void;
  sendMessage: (textMessage: string, toID: string, extendJson?: string | { [propName: string]: any }, options?: {
    isToSender: true; // 注意只有发给指定用户/特殊用户且自己需要收到时才传该参数
  }) => void;
  setAutoProcessDeviceChangeEvent: (autoProcess: boolean) => void;
  setLocalStreamAttributes: (attrs: { [attrName: string]: any }, videoinputDeviceId: string) => void;
  setLocalVideoMirror: (isMirror: boolean, videoinputDeviceId: string) => void;
  setLogIsDebug: (isDebug: boolean, logLevel: 0 | 1 | 2 | 3 | 4 | 5, isFormatLog: boolean) => void;
  setLogLevel: (level: '0' | '1' | '2' | '3' | '4' | '5') => void;
  setMute: (userId: string, type: MediaType, isMute: boolean) => void;
  setNoticeInterval: (interval: number) => void;
  setRemoteAudioVolume: (volume: number, userId: string, onFailure?: (error: any) => void, type?: MediaType) => void;
  setRemoteDefaultVideoStreamType: (streamType: StreamType) => void;
  setRemoteVideoStreamType: (streamType: StreamType, userId: string, deviceId: string) => void;
  setSmallStreamParameter: (profile: { [propName: string]: any }) => void;
  setStreamProcessor: (callback: Function) => void;
  setVideoProfile: (profile: IProfile, onFailure?: (error: any) => void, videoinputDeviceId?: string) => void;
  setVolume: (userId: string, type: MediaType, volume: number) => void;
  shareSceenIsNeedPlugin: () => any;
  startAudioMix: (url: string, opts: { [propName: string]: any }) => any;
  startLocalFileAudioMix: (onCallback: Function, opts: { [propName: string]: any }) => any;
  startServerRecord: (spec?: { [propName: string]: any }) => void;
  startShareMedia: (url: string, isVideo: boolean, onFailure?: (error: any) => void, options?: { [propName: string]: any }) => void;
  startShareScreen: (screenInfo: ScreenInfo, onFailure?: (error: any) => void) => void;
  stopAllAudioMix: () => any;
  stopAllLocalFileAudioMix: () => any;
  stopAudioMix: (url: string, opts: { [propName: string]: any }) => any;
  stopLocalFileAudioMix: (fileid: string, opts: { [propName: string]: any }) => any;
  stopServerRecord: () => void;
  stopShareLocalMedia: (onFailure?: (error: any) => void, onSuccess?: Function, options?: { [propName: string]: any }) => void;
  stopShareMedia: (onFailure?: (error: any) => void, onSuccess?: Function, options?: { [propName: string]: any }) => void;
  stopShareScreen: (onFailure?: (error: any) => void) => void;
  stopVideoOnDemand: (parentID: string) => void;
  switchOnlyAudioRoom: (isSwitch: boolean) => void;
  switchServer: (serverName: string) => void;
  switchUserMediaLine: (userId: string, medialine: string) => void;
  switchServerByName: (serverName: string) => void;
  takePhoto: (format: any, userId: string, deviceId: string) => void;
  uninit: (onSuccess?: Function, onFailure?: (error: any) => void) => void;
  unplayAudio: (userId: string, onFailure?: (error: any) => void) => void;
  unplayRemoteMedia: (userId: string, onFailure?: (error: any) => void) => void;
  unplayRemoteMediaFile: (userId: string, onFailure?: (error: any) => void) => void;
  unplayRemoteScreen: (userId: string, onFailure?: (error: any) => void) => void;
  unplayVideo: (userId: string, onFailure?: (error: any) => void, videoinputDeviceId?: string, options?: { [propName: string]: any }) => void;
  unpublishAudio: () => void;
  unpublishVideo: (videoinputDeviceId: string) => void;
  unregisterAudioVolumeListener: (userId: string, onFailure?: (error: any) => void, type?: MediaType) => void;
  updateVideoPlayerOptions: (options: { [propName: string]: any }, userid: string, onFailure?: (error: any) => void, type?: MediaType, videoinputDeviceId?: string) => void;
  uploadFile: (data: {
    filename: string; // 文件的名字, String
    filetype: string; // 文件的类型, String
    isWritedb: boolean; // 是否写入数据库（默认写入）, Boolean
    qRCodeId: string; // 二维码上传的唯一id, String
    dynamicppt: boolean; // 是否是动态ppt
  }, callback?: (code: number, response: any) => void, progressListenCallback?: (event: any, per: number) => void) => void;
  uploadRoomFile: (filename: string, filetype: string, filedata: { [propName: string]: any }, onSuccess?: Function, onProgress?: Function, onFailure?: (error: any) => void, options?: { [propName: string]: any }) => void;
  _onSendFailNohearEventLog: (streamId: string) => boolean;
  _onSendFailNoseeEventLog: (streamId: string) => boolean;
};

export declare const SessionRoom: {
  getMyself: () => IUser;
  getUser: (id: string) => IUser;
  getUsers: () => { [userid: string]: IUser };
}

export declare const Logger: {
  error: (data: any) => void;
  warning: (data: any) => void;
  info: (data: any) => void;
}

export declare const Event: {
  on: (eventType: string, listener: Function, markid?: string|number) => void;
  trigger: (eventType: string, evtmsg?: any) => void;
  offAllByMarkId: (markid: string|number) => void;
}

/**
 * 发布音视频状态
 */
export declare const PUBLISH_STATE: {
  NONE: 0;
  AUDIOONLY: 1;
  VIDEOONLY: 2;
  BOTH: 3;
  MUTEALL: 4;
};

export declare const ROOM_STATE: {
  INIT: 'initialize',
  CONNECTED: 'connected',
  DISCONNECT: 'disconnect',
  END: 'end',
};

/* 房间类型 */
export declare const ROOM_TYPE: {
  CLASS_ROOM: 3; // 小班课
  LIVE_ROOM: 4; // 直播
  MEETING_ROOM: 6; // 会议
};

/**
 * 用户角色
 */
export declare const ROOM_ROLE: {
  TEACHER: 0; //老师（主讲）
  ASSISTANT: 1; //助教
  STUDENT: 2; //学生
  AUDIT: 3; //旁听（直播用户） todo 目前没有
  PATROL: 4; //巡检员（巡课） todo 目前没有
  SYSTEM_ADMIN: 10; //系统管理员
  ENTERPRISE_ADMIN: 11; //企业管理员
  ADMIN: 12; //管理员
  PLAYBACK: -1; //回放者
};

/* 上传文件的类型 */
type imgFileAccpet = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
type mediaAccpet = ['mp3', 'mp4']
type h5DocAccpet = ['zip']
type docFileAccpet = ['xls', 'xlsx', 'doc', 'docx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'mp3', 'mp4', 'zip', 'ppt', 'pptx'];
type liveAccpet = ['xls', 'xlsx', 'doc', 'docx', 'txt', 'pdf', 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'mp3', 'mp4', 'ppt', 'pptx']; // 普通文件类型数组
type dynamicPPTAccpet = ['ppt', 'pptx'];
export declare const FILETYPE: {
  imgFileListAccpetArr: imgFileAccpet;
  documentFileListAccpetArr: docFileAccpet;
  mediaFileListAccpetArr: mediaAccpet;
  h5DocumentFileListAccpetArr: h5DocAccpet; // xgd 2017-09-21
  imgFileListAccpet: string;
  documentFileListAccpet: string;
  liveAccpet: string;
  dynamicPPT: string;
  mediaFileListAccpet: string;
  h5DocumentFileListAccpet: string;
};
export declare const BASE_WIDTH: 750 | 1920;
export declare const BASE_NUMBER: 100;
export declare const VIDEO_DRAG_BOUND_ID: 'big_literally_wrap';
export declare const WB_CONTAINER_ID: 'white_board_outer_layout'; // 白板外层id

// export declare const PROCESS_ENV = process.env.SERVICE_ENV === 'production' ? 'interaction' : 'demo';
