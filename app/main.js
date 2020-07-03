import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DeviceService from '@global/services/DeviceService';
import { YsGlobal } from '@global/handleGlobal';
import { ROOM_TYPE } from '@global/roomConstants';
import Actions from '@global/actions';
import './global/services/RoomListener';
// import FontFaceObserver from 'fontfaceobserver';

import App from './pages/app';
import store from './store';
import 'styles/theme.scss';
import 'fonts/iconfont.css';

const roomInfo = {
  isClassRoom: false,
  isLiveRoom: false,
  isMettingRoom: false,
};
if (YsGlobal.roomType === ROOM_TYPE.CLASS_ROOM) {
  roomInfo.isClassRoom = true;
} else if (YsGlobal.roomType === ROOM_TYPE.LIVE_ROOM) {
  roomInfo.isLiveRoom = true;
} else if (YsGlobal.roomType === ROOM_TYPE.MEETING_ROOM) {
  roomInfo.isMettingRoom = true;
}
Actions.setRoomInfo(roomInfo);

const MOUNT_NODE = document.getElementById('app');
if (YsGlobal.playback || YsGlobal.isMobile || (!YsGlobal.isCheckAudioOutput && !YsGlobal.isCheckVideoDevice)) {
  ReactDOM.render(
    <Provider store={store}>
      <App needDetection={false} />
    </Provider>,
    MOUNT_NODE,
  );
} else {
  DeviceService.checkNeedDetectionDevice(needDetection => {
    ReactDOM.render(
      <Provider store={store}>
        <App needDetection={needDetection} />
      </Provider>,
      MOUNT_NODE,
    );
  });
}
