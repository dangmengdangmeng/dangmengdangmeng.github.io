/**
 * @description 助教点击设备图标弹框
 */

import React from 'react';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';

const UserExtendList = props => {
  const { mouseLeave, user, handlerUserAreaSelection, handlerUseCndLine, handlerUseMediaLine, openCourseList } = props;
  const { userListInner } = YsGlobal.languageInfo;
  // 强制刷新
  const handlerUserRefresh = () => {
    Signalling.sendSignallingFromRemoteControl(user.id);
  };
  // 设备管理
  const handlerUserDeviceManagement = () => {
    Signalling.sendSignallingGetRemoteControlDevice(user.id);
  };
  // 课件刷新
  const handlerUserRefreshCourseware = () => {
    if (YsGlobal.roomConfigItem.isMoreWhiteboard) {
      openCourseList(user);
    } else {
      Signalling.sendSignallingFromRemoteControlCourseware(user.id);
    }
  };

  return (
    <div className="user-remote-list-container" onMouseLeave={mouseLeave}>
      <span className="triangle"></span>
      <span className="add-nowrap" style={{ width: '100%' }} title={userListInner.remoteControl.refresh} onClick={handlerUserRefresh}>
        {userListInner.remoteControl.refresh}
      </span>
      <span className="add-nowrap" style={{ width: '100%' }} title={userListInner.remoteControl.deviceManagement} onClick={handlerUserDeviceManagement}>
        {userListInner.remoteControl.deviceManagement}
      </span>
      {/* <span className="add-nowrap" style={{ width: '100%' }} title={userListInner.remoteControl.signaling} onClick={() => handlerUserAreaSelection(user)}>
        {userListInner.remoteControl.signaling}
      </span> */}
      <span className="add-nowrap" style={{ width: '100%' }} title={userListInner.remoteControl.media} onClick={() => handlerUseMediaLine(user)}>
        {userListInner.remoteControl.media}
      </span>
      <span className="add-nowrap" style={{ width: '90%' }} title={userListInner.remoteControl.courseware} onClick={() => handlerUseCndLine(user)}>
        {userListInner.remoteControl.courseware}
      </span>
      <span className="add-nowrap" style={{ width: '90%' }} title={userListInner.remoteControl.refreshCourseware} onClick={handlerUserRefreshCourseware}>
        {userListInner.remoteControl.refreshCourseware}
      </span>
    </div>
  );
};
export default UserExtendList;
