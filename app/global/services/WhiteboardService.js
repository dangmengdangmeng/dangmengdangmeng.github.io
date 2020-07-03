import { BASE_WIDTH, BASE_NUMBER, WB_CONTAINER_ID } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import store from '@app/store';

const WHITE_BOARD_CONTAINER_ID = 'big_literally_wrap'; // 白板容器的id
class WhiteboardService {
  constructor() {
    this.ysWhiteBoardManager = undefined;
  }

  getYsWhiteBoardManager() {
    return this.ysWhiteBoardManager;
  }

  setYsWhiteBoardManager(value) {
    this.ysWhiteBoardManager = value;
  }

  initWB() {
    let whiteboardManager;
    // 新版回放
    if (YsGlobal.newPlayback) {
      whiteboardManager = window.YSPlayerSDK.getWhiteBoardManager(YsGlobal.roomClient, undefined, true);
    } else {
      whiteboardManager = new window.YSWhiteBoardManager(YsGlobal.roomClient, undefined, true);
    }
    this.setYsWhiteBoardManager(whiteboardManager);
  }

  calcWBSize() {
    if (YsGlobal.isMobile) {
      return;
    }
    const defalutFontSize = (window.innerWidth / BASE_WIDTH) * BASE_NUMBER;
    const wbContainer = document.getElementById(WB_CONTAINER_ID);
    const wbRoot = document.getElementById(WHITE_BOARD_CONTAINER_ID);
    const sidebar = document.querySelector('.sidebar');
    const videoListEle = document.getElementById('student-video-list');
    if (!wbRoot || !wbContainer || !videoListEle) return;
    const { isLiveRoom, maxVideo } = store.getState().classroom.roomInfo;
    const minusHeight = maxVideo <= 2 && !isLiveRoom ? 1.04 * defalutFontSize : videoListEle.clientHeight + 1.04 * defalutFontSize;
    wbContainer.style.height = `${window.innerHeight - minusHeight}px`;
    if (sidebar) {
      wbContainer.style.width = `calc(100vw - ${sidebar.style.width}`;
    }
    const { clientWidth: pWidth, clientHeight: pHeight } = wbContainer;
    const getWBScale = () => {
      if (isLiveRoom) {
        return 16 / 9;
      }
      return maxVideo > 2 ? 2 / 1 : 4 / 3;
    };
    const WBScale = getWBScale();
    let width = 0;
    let height = 0;
    if (pWidth / pHeight > WBScale) {
      height = pHeight;
      width = pHeight * WBScale;
    } else {
      width = pWidth;
      height = pWidth / WBScale;
    }
    wbRoot.style.width = `${width}px`;
    wbRoot.style.height = `${height}px`;
  }
}
export default new WhiteboardService();
