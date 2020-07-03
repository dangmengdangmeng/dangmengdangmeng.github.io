import React from 'react';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom } from '@global/roomConstants';
import Icon from '@components/Icon';
import store from '@app/store';
import Signalling from '../../../global/services/SignallingService.ts';

const { toolsBoxInner } = YsGlobal.languageInfo;
const AnswerBtn = props => {
  const { answerState, answerData } = props;
  const { serial: classSerial } = store.getState().classroom.roomInfo;

  const handleBlockAnswer = () => {
    if (!['', 'disable'].includes(answerState)) return;
    if (answerState === 'disable' && (SessionRoom.getUser(JSON.parse(answerData).fromID) || {}).id) return;
    Actions.setModuleStatus('answer', 'creating');
    Signalling.sendAnswerCreated(false, { status: 'occupyed' }, classSerial);
  };
  return (
    <li onClick={handleBlockAnswer} /* className={answerState === 'disable' ? 'disabled' : ''} */>
      <Icon type="answer" title={toolsBoxInner.answer} />
    </li>
  );
};
export default AnswerBtn;
