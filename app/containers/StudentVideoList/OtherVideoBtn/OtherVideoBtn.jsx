import React from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom, PUBLISH_STATE } from '@global/roomConstants';
import UserService from '@global/services/UserService';
import FetchService from '@global/services/FetchService';
import Actions from '@global/actions';
import Signalling from '@global/services/SignallingService';
import Icon from '@components/Icon';
import './otherVideoBtn.scss';
import store from '@app/store';
const { video } = YsGlobal.languageInfo;
const OtherVideoBtn = props => {
  const { streamInfo = {}, draw, hasVideoRestoreBtn, onetoone, roomInfo } = props;
  const { videoFlag, audioFlag, publishstate } = streamInfo;
  const user = SessionRoom.getUser(streamInfo.streamUserId) || {};

  const switchAudio = () => {
    UserService.changeUserAudio(user);
  };

  const switchVideo = () => {
    UserService.changeUserVideo(user);
  };

  const switchDraw = () => {
    UserService.changeUserCandraw(user);
  };

  const switchPlatform = () => {
    UserService.userPlatformUpOrDown(user);
  };

  const sendTrophy = () => {
    UserService.sendUserGift(user);
  };

  const videoRestore = () => {
    Actions.deleteVideoDragInfo(streamInfo.streamUserId);
    Signalling.sendVideoAttribute({}, streamInfo.streamUserId, true);
  };

  const handleVideoCapture = () => {
    const canvasDom = document.createElement('canvas');
    canvasDom.id = 'videoCaptureCanvas';
    const videoBox = document.getElementById(`baseVideoBox_${streamInfo.streamUserId}`);
    if (videoBox) {
      const _video = videoBox.querySelector('video');
      const vWidth = _video.offsetWidth;
      const vHeight = _video.offsetHeight;

      canvasDom.width = vWidth;
      canvasDom.height = vHeight;
      canvasDom.getContext('2d').drawImage(_video, 0, 0, vWidth, vHeight);
      const dataURL = canvasDom.toDataURL('image/jpeg'); // 转换图片为dataURL
      const blob = _dataURLtoBlob(dataURL);

      const { id, nickname } = SessionRoom.getMyself();
      const { serial } = store.getState().classroom.roomInfo;
      const formData = new FormData();
      formData.append('serial', serial);
      formData.append('userid', id);
      formData.append('sender', nickname);
      formData.append('conversion', '1'); // 是否进行文档转换
      formData.append('isconversiondone', '0'); // 表示是否从客户端进行转换   1：客户端转换 0：否
      formData.append('writedb', '1'); // 是否写数据库 1：写  0：不写
      formData.append('alluser', '1');
      formData.append('fileoldname', `tmp_${Date.now()}.jpg`);
      formData.append('filetype', 'jpg');
      formData.append('filedata', blob, `tmp_${Date.now()}.jpg`);
      FetchService.uploadRoomFile(formData, () => {});
    }
  };

  const _dataURLtoBlob = dataurl => {
    // 将base64格式图片转换为文件形式
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let num = bstr.length;
    const u8arr = new Uint8Array(num);
    while (num > 0) {
      num -= 1;
      u8arr[num] = bstr.charCodeAt(num);
    }
    return new Blob([u8arr], { type: mime });
  };

  const exchangechVideo = () => {
    Actions.exchangeOne2oneVideoLayout(!store.getState().classroom.isExchangeOne2oneLayout);
  };

  const onDoubleClickBtnMask = e => {
    if (e.target) {
      e.stopPropagation();
    }
  };

  const platformFlag = publishstate !== PUBLISH_STATE.NONE;
  const studentStreamListLength = store.getState().video.studentStreamList.length;
  const { isVideoLayout } = store.getState().classroom;
  const { isLiveRoom, isClassRoom, maxVideo } = JSON.parse(roomInfo);
  return (
    <div className="other-video-btn-mask" onDoubleClick={onDoubleClickBtnMask}>
      <div className="other-btn-container">
        <Icon title={audioFlag ? video.closeAudio : video.openAudio} type="microphone" onClick={switchAudio} warn={!audioFlag} />
        <Icon title={videoFlag ? video.closeVideo : video.openVideo} type="camera" onClick={switchVideo} warn={!videoFlag} />
        <Icon title={platformFlag ? video.platformOff : video.platformOn} type="platform" onClick={switchPlatform} warn={!platformFlag} />
        {isLiveRoom || (
          <React.Fragment>
            <Icon title={draw ? video.scrawlOff : video.scrawlOn} type="pencil" onClick={switchDraw} warn={!draw} />
            <Icon title={video.videoCapture} type="screenshots" onClick={handleVideoCapture} />
          </React.Fragment>
        )}
        {isClassRoom && <Icon title={video.sendGift} type="gift" onClick={sendTrophy} />}
        {hasVideoRestoreBtn && <Icon title={video.restoreDrag} type="undo" onClick={videoRestore} />}
        {maxVideo === 2 && onetoone === 'nested' && studentStreamListLength === 1 && !isVideoLayout && (
          <Icon title={video.switchOne2oneVideoLayout} type="transposition" onClick={exchangechVideo} />
        )}
      </div>
    </div>
  );
};

export default OtherVideoBtn;
