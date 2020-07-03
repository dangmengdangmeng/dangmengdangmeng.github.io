import React from 'react';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '../../../global/services/SignallingService.ts';
import Icon from '@components/Icon';

const { toolsBoxInner } = YsGlobal.languageInfo;
const NoticeBoardBtn = () => {
  /* 通知 */
  const liveNoticeBoard = () => {
    Actions.changeModalMsg(
      {
        type: 'custom',
        title: toolsBoxInner.titleInfo,
        okBtn: toolsBoxInner.issue,
        customContent: {
          label: toolsBoxInner.customInfo,
          type: 'edit-textarea',
          warnMsg: toolsBoxInner.noticeWarnMsg,
        },
      },
      (answer, data) => {
        if (data) {
          if (!data.text.length) {
            return false;
          }
          if (answer && data.text) {
            if (data.text.replace(/\s/g, '').length < 1) {
              return false;
            }
            Signalling.sendSignallingToNoticeInform(data);
          }
        }
        return true;
      },
    );
  };

  return (
    <li onClick={liveNoticeBoard}>
      <Icon type="inform" title={toolsBoxInner.inform} />
    </li>
  );
};
export default NoticeBoardBtn;
