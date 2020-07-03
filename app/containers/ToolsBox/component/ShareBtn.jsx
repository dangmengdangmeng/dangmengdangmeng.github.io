import React from 'react';
import Actions from '@global/actions';
import { SessionRoom, DeviceManager } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import Icon from '@components/Icon';

const { toolsBoxInner } = YsGlobal.languageInfo;
const ShareBtn = () => {
  return (
    <li
      onClick={() => {
        if (DeviceManager.checkScreenIsNeedPlugin()) {
          Actions.setModuleStatus('share', 'show');
        } else {
          SessionRoom.startShareScreen();
        }
      }}
    >
      <Icon type="share" title={toolsBoxInner.share} />
    </li>
  );
};
export default ShareBtn;
