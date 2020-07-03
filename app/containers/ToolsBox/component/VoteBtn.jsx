import React from 'react';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom } from '@global/roomConstants';
import Icon from '@components/Icon';
import store from '@app/store';
import Signalling from '../../../global/services/SignallingService.ts';

const { toolsBoxInner } = YsGlobal.languageInfo;
const VoteBtn = props => {
  const { voteState, voteRecordsLen, callRollState } = props;
  const { serial: classSerial } = store.getState().classroom.roomInfo;

  /* 投票 */
  const handleVoteBtn = () => {
    if (voteRecordsLen) {
      Actions.setModuleStatus('vote', 'isShowVoteRecord');
    } else {
      const date = new Date();
      const data = {
        voteId: classSerial + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + Math.round((Math.random() * 9 + 1) * 10000),
        sendVoteUserId: SessionRoom.getMyself().id,
        status: 'isSetVoteInfo',
      };
      Signalling.sendSignallingToVoteStart(false, data.voteId, data);
    }
  };

  return (
    <li onClick={handleVoteBtn} className={voteState === 'isSetVoteInfo' || callRollState === 'disable' ? 'disabled' : ''}>
      <Icon type="vote" title={toolsBoxInner.vote} />
    </li>
  );
};
export default VoteBtn;
