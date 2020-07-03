import React from 'react';
import Actions from '@global/actions';
import { SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import Icon from '@components/Icon';
import store from '@app/store';
import Signalling from '../../../global/services/SignallingService.ts';

const { toolsBoxInner } = YsGlobal.languageInfo;
const LuckDrawBtn = props => {
  const { luckyState, callRollState, voteState } = props;
  const mySelf = SessionRoom.getMyself();
  const { serial: classSerial } = store.getState().classroom.roomInfo;

  /* 抽奖 */
  const liveLuckDraw = () => {
    Actions.setModuleData('luckyDraw', {
      winners: [],
    });
    Signalling.sendSignallingToLiveLuckDraw(false, `luck_${classSerial}`, {
      state: 1,
      fromName: mySelf.nickname,
      fromUser: mySelf,
      luckyState: 'ready',
    });
    Actions.setModuleStatus('luckyDraw', 'ready');
  };
  return (
    <li onClick={liveLuckDraw} className={luckyState || callRollState === 'disable' || voteState ? 'disabled' : ''}>
      <Icon type="gift_box" title={toolsBoxInner.draw} />
    </li>
  );
};
export default LuckDrawBtn;
