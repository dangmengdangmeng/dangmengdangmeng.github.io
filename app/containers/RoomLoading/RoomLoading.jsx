import React from 'react';
import { ROOM_STATE } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import './RoomLoading.scss';
import loadingImg from './img/room_loading.gif';

const { liveMobilePage, pagesText } = YsGlobal.languageInfo;
const RoomLoading = props => {
  const { roomStatus } = props;
  let text = '';
  if (YsGlobal.playback) {
    text = pagesText.livePageInner.intoBack;
  } else if (roomStatus === ROOM_STATE.EXPIRED) {
    text = liveMobilePage.expired;
  } else {
    text = liveMobilePage.enterLanguage;
  }
  return (
    <div className="room-loading">
      <img className="loading-img" src={loadingImg} alt={text} />
      <div className="loading-inner">{text}</div>
    </div>
  );
};

export default RoomLoading;
