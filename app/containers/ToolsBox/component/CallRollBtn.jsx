import React from 'react';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Icon from '@components/Icon';
import store from '@app/store';
import Signalling from '../../../global/services/SignallingService.ts';

const { toolsBoxInner } = YsGlobal.languageInfo;
const CallRollBtn = props => {
  const { callRollState, voteState } = props;
  const { serial: classSerial } = store.getState().classroom.roomInfo;

  const handleBlockCallRoll = () => {
    if (callRollState === 'calling') return;
    Actions.setModuleStatus('callRoll', 'call');
    Signalling.sendSignallingFromLiveCallRoll(false, { status: 'occupyed' }, classSerial);
  };

  return (
    <li onClick={handleBlockCallRoll} className={callRollState === 'disable' || voteState ? 'disabled' : ''}>
      <Icon type="call" title={toolsBoxInner.rollName} />
    </li>
  );
};
export default CallRollBtn;
