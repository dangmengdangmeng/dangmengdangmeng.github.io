import React from 'react';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import '../iconfont/style.css';
import Icon from '@components/Icon';

const { toolsBoxInner } = YsGlobal.languageInfo;
const TeacherCountDownBtn = props => {
  const { countdownState } = props;
  const handleBlockCountdown = () => {
    // 已经点击计时器，不能再次点击
    if (countdownState !== '') return;
    Actions.setModuleStatus('countdown', 'init');
    Signalling.sendSignallingTimer({
      time: 300,
      defaultTime: 300,
      isStatus: false,
      isRestart: false,
      isShow: false,
    });
  };
  return (
    <li onClick={handleBlockCountdown}>
      <Icon type="timer" title={toolsBoxInner.countDown} />
    </li>
  );
};
export default TeacherCountDownBtn;
