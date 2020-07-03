import React, { useState, useEffect } from 'react';
import './AudioOutput.scss';

const AudioOutput = props => {
  const { devices, useDevices, changeDevice, changeDeviceDetail, setShowParentPanel } = props;
  const audioinputArr = devices.audioinput;
  const audiooutputArr = devices.audiooutput;
  const audioinputSected = useDevices.audioinput;
  const audiooutputSected = useDevices.audiooutput;
  const [showPanel, setShowPanel] = useState(false);
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
          <div className="panel-mic">
            <span className="audio-title">选择麦克风</span>
            <ul className="opts">
              {audioinputArr.map(item => (
                <li
                  key={item.deviceId}
                  onClick={() => {
                    changeDevice('audioinput', item.deviceId);
                  }}
                >
                  {<i className={`${audioinputSected === item.deviceId ? 'select' : ''}`}></i>}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel-speak">
            <span className="audio-title">选择扬声器</span>
            <ul className="opts">
              {audiooutputArr.map(item => (
                <li
                  key={item.deviceId}
                  onClick={() => {
                    changeDevice('audiooutput', item.deviceId);
                  }}
                >
                  {<i className={`${audiooutputSected === item.deviceId ? 'select' : ''}`}></i>}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="panel-more audio-title"
            onClick={() => {
              changeDeviceDetail('audio');
            }}
          >
            音频设置…
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioOutput;
