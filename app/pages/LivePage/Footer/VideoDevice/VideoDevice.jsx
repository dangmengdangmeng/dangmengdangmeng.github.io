import React, { useState, useEffect } from 'react';
import './VideoDevice.scss';

const VideoDevice = props => {
  const { devices, useDevices, changeDevice, changeDeviceDetail, setShowParentPanel } = props;
  const videoinputArr = devices.videoinput;
  const videoinputDeviceId = useDevices.videoinput;
  const [showPanel, setShowPanel] = useState(false);
  // 动态控制footer的层级
  useEffect(() => {
    setShowParentPanel(showPanel);
  }, [showPanel]);
  return (
    <div
      className="changeOutput"
      onClick={() => {
        setShowPanel(!showPanel);
      }}
    >
      {showPanel && (
        <div
          className="audio-panel"
          onClick={e => {
            e.stopPropagation();
          }}
          onMouseLeave={() => {
            setShowPanel(false);
          }}
        >
          <div className="panel-speak">
            <span className="audio-title">选择摄像头</span>
            <ul className="opts">
              {videoinputArr.map(item => (
                <li
                  key={item.deviceId}
                  onClick={() => {
                    changeDevice('videoinput', item.deviceId);
                  }}
                >
                  {<i className={`${videoinputDeviceId === item.deviceId ? 'select' : ''}`}></i>}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="panel-more audio-title"
            onClick={() => {
              changeDeviceDetail('video');
            }}
          >
            视频设置…
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDevice;
