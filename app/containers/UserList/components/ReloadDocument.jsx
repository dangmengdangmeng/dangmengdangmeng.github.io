/**
 * @description 用户list
 */

import React from 'react';
import { YsGlobal } from '@global/handleGlobal';
import WhiteboardService from '@global/services/WhiteboardService';
import Signalling from '@global/services/SignallingService';
import Icon from '@components/Icon';

const { userListInner } = YsGlobal.languageInfo;
const ReloadDocument = props => {
  const { closeCourseList, currentUser } = props;
  const courseList = WhiteboardService.getYsWhiteBoardManager().getWindowModules();
  const handleReloadDocument = instanceId => {
    Signalling.sendSignallingFromRemoteControlCourseware(currentUser.id, { instanceId });
    closeCourseList();
  };
  return (
    <div className="device-control">
      <div className="control-header">
        <span className="text">{userListInner.remoteControl.refreshCourseware}</span>
        <Icon  type="close" onClick={closeCourseList} />
      </div>
      <div className="device-ops-wrapper">
        <ul className="ops-list">
          {courseList.map(item => (
            <li key={item.instanceId} onClick={() => handleReloadDocument(item.instanceId)}>
              <span className="icon" />
              <span className="name">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ReloadDocument;
