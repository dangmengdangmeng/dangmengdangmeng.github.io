import { Event, BASE_NUMBER, BASE_WIDTH, Logger } from '@global/roomConstants';
import { getLanguageName, getLanguage } from '../utils/index';
import { IYsGlobal } from './types/Global';
import { getUrlParams, getServiceInfo } from '@app/utils/url';

const video = getUrlParams('video') || '';
const YsGlobal: IYsGlobal = {
  playback: /index.html#\/(replay|playback)/g.test(window.location.href), // 是否回放
  newPlayback: getUrlParams('playback'),//新的回放
  loginType: <0 | 1 | 2 | 4 | -1 | 88>Number(getUrlParams('logintype')),
  joinUrl: window.location.href,
  entryUserId: getUrlParams('entryUserId'),
  domain: getUrlParams('domain'),
  roomType: parseInt(getUrlParams('roomtype'), 10),
  roomClient: {},
  ysVersion: '3.0.0.3',
  updateTime: '2020070215',
  languageName: getLanguageName(),
  languageInfo: {}, // YsGlobal.languageName === 'chinese' ? chineseLanguage : englishLanguage;
  connectServerTime: '', // 房间连接时的服务器时间
  roomConfigItem: {}, // 房间配置
  roomInfo: {
    videoheight: Number(video.split('*')[1]),
    videowidth: Number(video.split('*')[0]),
  }, // 房间配置
  isMobile: Boolean(navigator.userAgent.match(/AppleWebKit.*Mobile.*/)),
  msgList: [],
  videoSizeMouseMoveEventName: '', // 鼠标移动触发事件的名字（视频拉伸中用到）
  videoSizeMouseUpEventName: '', // 鼠标抬起触发事件的名字（视频拉伸中用到）
  isVideoStretch: false, // 是否是拉伸状态
  isCheckVideoDevice: true, // 是否检测视频设备
  isCheckAudioOutput: true, // 是否检测扬声器设备
  isWheatCheckEquipment: true, // 上麦前检测设备
  isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent), // 是否Safari浏览器
  chatList: [],
  currentFile: {
    fileId: 0,
    currentPage: 1,
  },
  serviceInfo: {
    protocol: 'https',
    host: 'api.roadofcloud.net',
    port: 443,
    webRequest: 'https://api.roadofcloud.net:443',
  },
  docAddress: {
    protocol: 'https',
    host: 'api.roadofcloud.net',
    port: 443,
  },
  backupDocAddressList: [],
  jumpurl: getUrlParams('jumpurl') ? decodeURIComponent(getUrlParams('jumpurl')) : '',
  MAX_FILE_SIZE: 300 * 1024 * 1024, // 文件上传最大300M
  defaultFile: {},
}; // 当前显示的课件
Logger.info(`jumpurl :${YsGlobal.jumpurl}`);

window.YsGlobal = YsGlobal;

(() => {
  const initRoomInfo = () => {
    document.documentElement.style.fontSize = `${(window.innerWidth / BASE_WIDTH) * BASE_NUMBER}px`;
    document.documentElement.setAttribute('data-version', YsGlobal.ysVersion);
    document.documentElement.setAttribute('data-language', YsGlobal.languageName);
    document.documentElement.setAttribute('data-updateTime', YsGlobal.updateTime);
    if (YsGlobal.playback) {
      document.documentElement.style.pointerEvents = 'none';
    }
    
    YsGlobal.isCheckAudioOutput = !YsGlobal.isSafari;
    YsGlobal.languageInfo = getLanguage(YsGlobal.languageName);
    
    const { courseList } = YsGlobal.languageInfo;
    const { serviceInner } = courseList;
    YsGlobal.defaultFile = {
      fileid: 0,
      companyid: '',
      filename: serviceInner.serFileName,
      uploadusername: '',
      downloadpath: '',
      swfpath: '',
      isContentDocument: false,
      filetype: 'whiteboard',
      currpage: 1,
      pagenum: 1,
      dynamicppt: 0,
      filecategory: 0, // 0:课堂 ， 1：系统
      fileprop: 0, // 0：普通文档 ， 1-2：动态ppt(1-旧版，2-新版) ， 3：h5文档
      type: 1,
    }
    YsGlobal.serviceInfo = Object.assign(YsGlobal.serviceInfo, getServiceInfo());
  };
  initRoomInfo();

  const handleWindowResize = () => {
    document.documentElement.style.fontSize = `${(window.innerWidth / BASE_WIDTH) * BASE_NUMBER}px`;
    Event.trigger('window-resize');
  };
  window.removeEventListener('resize', handleWindowResize);
  window.addEventListener('resize', handleWindowResize);
})();

export { YsGlobal };
