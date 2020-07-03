// 系统信息设置
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
const { deviceTest } = YsGlobal.languageInfo;
const { systemInner } = deviceTest;

class SystemSetting extends Component {
  render() {
    const myself = SessionRoom.getMyself() || {};
    const { currentUser, operatingSystem, LoginDevice, browser, versionNumber } = this.props.systemInfo;
    // TODO YsGlobal.roomInfo.docHost需要处理
    return (
      <div style={{ display: this.props.show ? 'block' : 'none' }}>
        <ul className="systemInfo_box">
          <li>
            <span className="name">{systemInner.present}</span>
            <span className="value">{currentUser}</span>
          </li>
          <li>
            <span className="name">{systemInner.equi}</span>
            <span className="value">{LoginDevice}</span>
          </li>
          <li>
            <span className="name">{systemInner.operation}</span>
            <span className="value">{operatingSystem}</span>
          </li>
          <li>
            <span className="name">{systemInner.mediaServer}</span>
            <span className="value">{myself.servername}</span>
          </li>
          <li>
            <span className="name">{systemInner.docAddress}</span>
            <span className="value">{YsGlobal.roomInfo.docHost}</span>
          </li>
          <li>
            <span className="name">{systemInner.brow}</span>
            <span className="value">{browser}</span>
          </li>
          <li>
            <span className="name">{systemInner.versionid}</span>
            <span className="value">{versionNumber}</span>
          </li>
        </ul>

        <div className="footer_btn">
          <button type="button" className="btn btn-can" onClick={() => this.props.okButtonOnClick(4)}>
            {systemInner.sure}
          </button>
        </div>
      </div>
    );
  }
}

SystemSetting.propTypes = {
  // 确定按钮
  okButtonOnClick: PropTypes.func,
  // 系统信息
  systemInfo: PropTypes.object,

  show: PropTypes.bool,
  // packetsLostNet: PropTypes.number,
};

export default SystemSetting;
