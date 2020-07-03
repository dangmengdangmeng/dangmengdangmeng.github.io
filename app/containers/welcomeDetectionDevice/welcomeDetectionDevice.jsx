import React from 'react';
import { YsGlobal } from '@global/handleGlobal';

import './welcomeDetectionDevice.scss';
const { welcomDete } = YsGlobal.languageInfo;
const WelcomeDetectionDeviceSmart = ({ show, startDetectionOnClick }) => (
  <article className="startdetection-container" style={{ display: !show ? 'none' : 'block' }}>
    <p className="ensure">
      <span>{welcomDete.ensure1}</span>
      <span>{welcomDete.ensure2}</span>
    </p>
    <div className="start-detection add-cursor-pointer" onClick={() => startDetectionOnClick()} id="start-detection">
      {welcomDete.startDetection}
    </div>
    <div className="capacityImg"></div>
  </article>
);
export default WelcomeDetectionDeviceSmart;
