import React from 'react';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Icon from '@components/Icon';

const { toolsBoxInner } = YsGlobal.languageInfo;
const ResponderBtn = () => {
  /* 发起抢答 */
  const handleResponderBtn = () => {
    Actions.changeResponserStatus('ready');
  };

  return (
    <li onClick={handleResponderBtn}>
      <Icon type="handup" title={toolsBoxInner.contest} />
    </li>
  );
};
export default ResponderBtn;
