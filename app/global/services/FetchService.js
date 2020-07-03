import { post, get, ajax } from '@utils/request';
import { getServiceInfo } from '@utils/url';
import { SessionRoom } from '@global/roomConstants';
import { wrapFileInfo, getFileType } from '@utils/ysUtils';
import store from '@app/store';
import Signalling from './SignallingService.ts';
import { YsGlobal } from '../handleGlobal.ts';

class FetchService {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FetchService();
    }
    return this.instance;
  }

  roomStart() {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/roomstart?ts=${new Date().getTime()}`;
    const { serial, companyid } = store.getState().classroom.roomInfo;
    const data = {
      serial,
      companyid,
    };
    Signalling.sendSignallingToClassBegin(false, true);
    return post(url, data);
  }

  roomOver() {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/roomover?ts=${new Date().getTime()}`;
    const { serial, companyid } = store.getState().classroom.roomInfo;
    const data = {
      serial,
      companyid,
      act: 3, // 删除会议
    };
    Signalling.sendSignallingToClassBegin(true);
    post(url, data);
  }

  /* 送花 */
  sendFlowers(ajaxData) {
    const url = `https://1069568596212347.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/${YsGlobal.serviceInfo.aliUrl}/sendflowers/`;
    const JSON_HEADER_CONF = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return post(url, ajaxData, 'object', JSON_HEADER_CONF);
  }

  /** 学生签到接口 */
  async onSignIn(ajaxData) {
    const url = `https://1069568596212347.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/${YsGlobal.serviceInfo.aliUrl}/addsignin/`;
    const JSON_HEADER_CONF = {
      'Content-Type': 'application/json',
    };
    return post(url, ajaxData, 'object', JSON_HEADER_CONF);
  }

  /* 获取在线签到人数 */
  getOnlineNum(ajaxData) {
    const url = `https://1069568596212347.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/${YsGlobal.serviceInfo.aliUrl}/getOnlineNum/`;
    const JSON_HEADER_CONF = {
      'Content-Type': 'application/json',
    };
    return post(url, ajaxData, 'object', JSON_HEADER_CONF);
  }

  /* 老师结束点名 */
  async rollcalladd(ajaxData) {
    const url = `https://1069568596212347.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/${YsGlobal.serviceInfo.aliUrl}/rollcalladd/`;
    const JSON_HEADER_CONF = {
      'Content-Type': 'application/json',
    };
    return post(url, ajaxData, 'object', JSON_HEADER_CONF);
  }

  /* 上传图片监听 */
  async upLoadPic(url, data) {
    return get(url, data, 'object');
  }

  /* 发送礼物 */
  sendGift(participantIdJson) {
    const { serial } = store.getState().classroom.roomInfo;
    const ajaxData = {
      serial, // 教室id
      sendid: SessionRoom.getMyself().id, // 送礼物人id
      sendname: SessionRoom.getMyself().nickname, // 送礼物人名字'
    };
    for (const [key, value] of Object.entries(participantIdJson)) {
      // 收礼物人的id和名字
      ajaxData[`receivearr[${key}]`] = value;
    }
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/sendgift?ts=${new Date().getTime()}`;
    return post(url, ajaxData);
  }

  /* 获取礼物 */
  getGiftInfo(participantId) {
    const { serial } = store.getState().classroom.roomInfo;
    const ajaxData = {
      serial, // 教室id
      receiveid: participantId, // 收礼物人id
    };
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/getgiftinfo?ts=${new Date().getTime()}`;
    return post(url, ajaxData);
  }

  // 获取服务器列表
  getServiceList(user, cb) {
    const { host, protocol } = YsGlobal.serviceInfo;
    const url = `${protocol}://${host}/ClientAPI/getserverarea`;
    const { companyid } = store.getState().classroom.roomInfo;
    const data = {
      selfip: user.ys_ip,
      companyid,
    };
    post(url, data, false).then(res => {
      if (res && res.result === 0) {
        cb(res.serverarealist);
      } else {
        cb([]);
      }
    });
  }

  /* 获取cnd列表 */
  getAllCndIp() {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/getcdnlist?ts=${new Date().getTime()}`;
    return get(url);
  }

  getAnswerDetail(data) {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/simplifyAnswer?ts=${new Date().getTime()}`;
    const { serial } = store.getState().classroom.roomInfo;
    return post(url, { serial, ...data, page: 0, pageNum: 200 });
  }

  getupdateinfo(version, type) {
    const { protocol, host } = getServiceInfo();
    const url = `${protocol}://${host}/ClientAPI/getupdateinfo`;
    const data = {
      version,
      type,
    };
    return post(url, data, false);
  }

  getRoomFile() {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/getroomfile?ts=${new Date().getTime()}`;
    const { serial } = store.getState().classroom.roomInfo;
    return post(url, { serial });
  }

  getFileList() {
    return store.getState().file.fileList;
  }

  getFileinfo(fileid) {
    const file = store.getState().file.fileList.find(it => it.fileid === fileid);
    return file;
  }

  async deleteRoomFile(fileid) {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/delroomfile?ts=${new Date().getTime()}`;
    const { serial } = store.getState().classroom.roomInfo;
    const res = await post(url, { serial, fileid });
    const file = this.getFileinfo(fileid);
    // 删除之后也发信令
    if (res.result === 0) {
      const wrapFile = wrapFileInfo(file, true);
      Signalling.sendSignallingFromDocumentChange(wrapFile, false);
    }
    return res;
  }

  async uploadRoomFile(params, onStatus, onProgress = () => {}, isChatImg = false) {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/uploaddocument?ts=${new Date().getTime()}`;
    const res = await ajax({
      url,
      params,
      isUpLoadFile: true,
      progress: data => {
        const _process = ((100 * data.loaded) / data.total).toFixed(2);
        onProgress(_process);
      },
    });
    const filetype = getFileType(params.get('filetype'));
    res.filetype = filetype;
    const wrapFile = wrapFileInfo(res, false);
    onStatus(0, wrapFile);
    if (isChatImg) return;
    const { fileList } = store.getState().file;
    fileList.push(wrapFile.filedata);
    Signalling.sendSignallingFromDocumentChange(wrapFile, false);
  }

  async getRoomUsers(onSuccess, start, max, roles, onFailure = () => {}, search = '', order = []) {
    const url = `${YsGlobal.serviceInfo.webRequest}/ClientAPI/getroomusers?ts=${new Date().getTime()}`;
    const { serial, companyid } = store.getState().classroom.roomInfo;
    const ajaxData = {
      serial,
      companyid,
      start,
      max,
      roles,
      search,
      order,
    };
    const response = await post(url, ajaxData);
    if (response.result === 0) {
      const userlist = [];
      if (response.userlist && Array.isArray(response.userlist)) {
        response.userlist.forEach(item => {
          const user = item.properties || {};
          user.id = item.id;
          userlist.push(user);
        });
      }
      onSuccess(userlist, response.total);
    } else {
      onFailure(response.result, response);
    }
  }

  getUploadFileParams(filename, filetype, isWritedb, qRCodeId) {
    const _isWritedb = isWritedb !== undefined ? isWritedb : true;
    const { serial } = store.getState().classroom.roomInfo;
    const { id, nickname } = SessionRoom.getMyself();
    const uploadFileParams = {
      serial, // 会议id
      userid: id, // 用户id
      sender: nickname, // 用户名
      conversion: 1, // 是否进行文档转换
      isconversiondone: 0, // 表示是否从客户端进行转换   1：客户端转换 0：否
      writedb: _isWritedb ? 1 : 0, // 是否写数据库 1：写  0：不写
      fileoldname: filename, // 原文件名(如果是原文件)
      filetype, // 文件类型(如果是原文件)
      alluser: 1, // 是否对所有人可见
    };
    if (qRCodeId) {
      uploadFileParams.codeid = qRCodeId; // 二维码ID
    }
    return uploadFileParams;
  }
}

export default FetchService.getInstance();
