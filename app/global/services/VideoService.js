import store from '@app/store';
import Signalling from '@global/services/SignallingService';
import Actions from '@global/actions';
import { SessionRoom, BASE_WIDTH, BASE_NUMBER, WB_CONTAINER_ID } from '@global/roomConstants';
import { YsGlobal } from '../handleGlobal.ts';

const headerHeight = 0.44;
class VideoService {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new VideoService();
    }
    return this.instance;
  }

  /* 设置双击视频时的高度 */
  setDoubleVideoHeight = (doubleVideoId, bottomStreamListLength) => {
    const { videowidth, videoheight, maxVideo } = store.getState().classroom.roomInfo;
    const scale = Number(videowidth) / Number(videoheight);
    const { teacherId } = store.getState().user;
    const bottomVideoNum = doubleVideoId && doubleVideoId !== teacherId ? bottomStreamListLength - 1 : bottomStreamListLength;
    if (YsGlobal.isMobile) {
      const swiperBox = document.getElementById(WB_CONTAINER_ID);
      if (swiperBox && swiperBox.getBoundingClientRect) {
        return {
          height: `${swiperBox.clientHeight}px`,
          top: `${swiperBox.getBoundingClientRect().top}px`,
        };
      }
    }
    if (bottomVideoNum === 0 || maxVideo === 2) {
      return { height: `calc(100vh - ${headerHeight}rem)` };
    }
    if (bottomVideoNum <= 6) {
      return { height: `calc(100vh - ${headerHeight}rem - (((100vw - 4.22rem) / 6 - 0.05rem) / ${scale} + 0.1rem))` };
    }
    if (bottomVideoNum > 6 && bottomVideoNum <= 8) {
      // 高度 = 总高度 - 头部高度 - （一个视频高度 + 0.1rem的margin）
      return { height: `calc(100vh - ${headerHeight}rem - (((100vw - 4.22rem) / ${bottomVideoNum} - 0.05rem) / ${scale} + 0.1rem))` };
    }
    // 高度 = 总高度 - 头部高度 - （两个视频高度 + 0.15rem的margin）
    return { height: `calc(100vh - ${headerHeight}rem - ((((100vw - 4.22rem) / 8 - 0.05rem) / ${scale}) * 2 + 0.15rem))` };
  };

  /**
   * 处理视频双击
   * @param {string} streamUserId 当前点击的视频的用户id
   * @param {boolean} videoIsDrag 这个视频是否拖拽出来了
   */
  handleDoubleClickVideo = (streamUserId, videoIsDrag) => {
    const { doubleVideoId, videoDragInfo, focusVideoId } = store.getState().video;
    const { isVideoLayout } = store.getState().classroom;
    const { isLiveRoom } = store.getState().classroom.roomInfo;
    if (isVideoLayout) {
      this.handleFocusLayout(streamUserId, focusVideoId);
      return;
    }
    if (videoIsDrag) {
      // 拖拽还原
      Actions.deleteVideoDragInfo(streamUserId);
      Signalling.sendVideoAttribute({}, streamUserId, true);
      return;
    }
    const userInfo = SessionRoom.getUser(streamUserId) || {};
    if (isLiveRoom && userInfo.role === 2) {
      return;
    }
    if (doubleVideoId === streamUserId) {
      // 视频双击全屏还原
      Actions.setDoubleVideoId('');
      Signalling.sendSignallingDoubleClickVideo({}, undefined, true);
    } else {
      for (const value of Object.values(videoDragInfo)) {
        // 所有视频拖拽还原
        Actions.deleteVideoDragInfo(value.userId);
        Signalling.sendVideoAttribute({}, value.userId, true);
      }
      Actions.setDoubleVideoId(streamUserId);
      const signallData = {
        doubleId: streamUserId,
      };
      Signalling.sendSignallingDoubleClickVideo(signallData, streamUserId);
    }
  };

  /**
   * 处理焦点布局
   * @param {string} streamUserId 当前点击的视频的用户id
   * @param {string} focusVideoId 当前处于焦点中心的视频id
   */
  handleFocusLayout(streamUserId, focusVideoId) {
    if (focusVideoId !== streamUserId) {
      Actions.setFocusVideoId(streamUserId);
      const data = { roomLayout: 'focusLayout', focusVideoId: streamUserId };
      Signalling.sendSignallingSetRoomLayout(data, false);
    } else {
      Actions.setFocusVideoId('');
      const data = { roomLayout: 'videoLayout' };
      Signalling.sendSignallingSetRoomLayout(data, false);
    }
  }

  getInitVideoSize = () => {
    const { studentStreamList } = store.getState().video;
    const { videowidth, videoheight } = store.getState().classroom.roomInfo;
    const defalutFontSize = (window.innerWidth / BASE_WIDTH) * BASE_NUMBER;
    const videoScale = Number(videowidth) / Number(videoheight);
    const contentW = window.innerWidth;
    const wbContainer = document.getElementById(WB_CONTAINER_ID);
    if (!wbContainer) {
      return {
        initVideoWidth: 0,
        initVideoHeight: 0,
      };
    }
    let initVideoWidth = 0;
    let initVideoHeight = 0;
    if (YsGlobal.isMobile) {
      initVideoWidth = contentW / 4;
      initVideoHeight = initVideoWidth / videoScale;
    } else {
      initVideoHeight = wbContainer.clientHeight / 6;
      initVideoWidth = initVideoHeight * videoScale;
    }
    return {
      initVideoWidth,
      initVideoHeight,
    };
  };
}

export default VideoService.getInstance();
