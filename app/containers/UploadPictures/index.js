import React, { Component } from 'react';
import './static/sass/index.scss';
import { YsGlobal } from '@global/handleGlobal';
import FetchService from '@global/services/FetchService';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import Signalling from '@global/services/SignallingService';
import { SessionRoom } from '@global/roomConstants';
import Icon from '@components/Icon';
import store from '@app/store';
import { getGUID, wrapFileInfo } from '../../utils/ysUtils';

const { toUpdata } = YsGlobal.languageInfo;

const QRCode = require('qrcode.react');
class QrCodeTeachingToolSmart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcodeValue: '',
    };
    this.interval = null;
  }

  componentDidMount() {
    this.pageOpenFn();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  pageOpenFn() {
    const that = this;
    const { id, nickname } = SessionRoom.getMyself();
    const { companyid, serial } = store.getState().classroom.roomInfo;

    const userName = encodeURI(nickname);
    const codeid = `${id}_${getGUID().getGUIDDate()}${getGUID().getGUIDTime()}`;

    const urldata = `https://rddoccdndemows.roadofcloud.net:443/static/qrCode/qrCode.html?serial=${serial}&userid=${id}&sender=${userName}&key=${companyid}&url=${
      YsGlobal.serviceInfo.webRequest
    }&languageName=${YsGlobal.languageName}&ts=${new Date().getTime()}&codeid=${codeid}`;

    this.setState({
      qrcodeValue: urldata,
    });

    const data = {
      key: companyid,
      serial,
      uploaduserid: id,
      codeid,
      codetype: 1,
      handlerEventKey: 'getQrCodeUploadFile',
      remark: toUpdata.getTwo,
    };
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/getUploadfile?ts=${new Date().getTime()}`;
    this.interval = setInterval(() => {
      FetchService.upLoadPic(url, data).then(res => {
        if (res.result !== -1) {
          const isItemKey = that.props.fileList.find(it => it.filename === res.filename);
          if (!isItemKey) {
            const wrapFile = wrapFileInfo(res);
            this.props.updateFileList([...this.props.fileList, wrapFile.filedata]);
            // 新模板派发信令
            Signalling.sendSignallingFromDocumentChange(wrapFile);
            that.props.changeUpdatapic(false);
          }
        }
      });
    }, 3000);
  }

  closeUpDataPictureBox() {
    this.props.changeUpdatapic(false);
  }

  render() {
    const { qrcodeValue } = this.state;
    return (
      <div className="upLoadBox">
        <div className="qrCode-teachTool-header">
          <div>{toUpdata.smToLoadPic}</div>
          <Icon className="upload-close" type="close" onClick={this.closeUpDataPictureBox.bind(this)} />
        </div>
        <div className="upLoadBox_container">
          <div className="qrcode">
            <QRCode className="canvasInner" value={qrcodeValue} style={{ height: '1.75rem', width: '1.75rem' }} level="L"></QRCode>
          </div>
          <div className="picture_wrong">{toUpdata.uploadWrong}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  fileList: state.file.fileList,
});
const mapDispatchToProps = () => ({
  changeUpdatapic: data => Actions.updataPicCount(data),
  updateFileList: data => Actions.updateFileList(data),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeTeachingToolSmart);
