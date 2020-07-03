import { SessionRoom, Logger, DeviceManager } from '@global/roomConstants';
import Actions from '@global/actions';
import store from '@app/store';
import { YsGlobal } from '@global/handleGlobal';
import { detectOS, getBrowserInfo } from '@utils/ysUtils';
import { setUserProperty } from '../../utils/sign';
class DeviceService {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DeviceService();
    }
    return this.instance;
  }

  checkNeedDetectionDevice(callback) {
    DeviceManager.getDevices(deviceInfo => {
      Logger.info('checkNeedDetectionDevice deviceInfo:', deviceInfo);
      let needDetection = true; // 默认需要检测
      const { devices = {}, useDevices = {} } = deviceInfo;
      const { audioinput, audiooutput, videoinput } = devices;
      const { audioinput: useAudioinput, audiooutput: useAudiooutput, videoinput: useVideoinput } = useDevices;

      // 设备列表里没有正在使用的设备，则需要检测界面
      if (YsGlobal.isCheckVideoDevice) {
        const hasUseAudioinput = audioinput.find(item => item.deviceId === useAudioinput);
        const hasUseVideoinput = videoinput.find(item => item.deviceId === useVideoinput);
        if (!hasUseAudioinput || !hasUseVideoinput) {
          needDetection = true;
        } else {
          needDetection = false;
        }
      }
      if (YsGlobal.isCheckAudioOutput) {
        const hasUseAudiooutput = audiooutput.find(item => item.deviceId === useAudiooutput);
        if (!hasUseAudiooutput) {
          needDetection = true;
        } else {
          needDetection = false;
        }
      }

      if (callback && typeof callback === 'function') {
        callback(needDetection);
      }
    });
  }

  /**
   * 获取设备列表
   * @param {'device_add'|'device_remove'} type 设备改变的类型，添加或者移除
   * @param {{[kind]:[MediaDeviceInfo]}} changedevices 改变的设备
   */
  getDevicesList(type, changedevices) {
    if (YsGlobal.isMobile || (YsGlobal.isSafari && !YsGlobal.isCheckVideoDevice)) {
      return;
    }
    const { useDevices } = store.getState().device;
    const copyUseDevices = Object.assign({}, useDevices);
    DeviceManager.getDevices(deviceInfo => {
      Logger.info('getDevicesList deviceInfo:', deviceInfo);
      const { hasdevice, devices } = deviceInfo;
      for (const [key, value] of Object.entries(copyUseDevices)) {
        if (!value && devices[key] && devices[key].length) {
          copyUseDevices[key] = deviceInfo.useDevices[key] || devices[key][0].deviceId;
        }
      }
      if (changedevices) {
        if (type === 'device_remove') {
          for (const [key, value] of Object.entries(changedevices)) {
            if (useDevices[key] === value[0].deviceId) {
              copyUseDevices[key] = devices[key][0] && devices[key][0].deviceId;
            }
          }
        }
        this.setDevices({ selectDeviceInfo: copyUseDevices }); // 设置设备
        const { audioinput = [], videoinput = [] } = devices;
        const mySelf = SessionRoom.getMyself() || {};
        const hasVideo = !!videoinput.length;
        const hasAudio = !!audioinput.length;
        setUserProperty(mySelf.id, { hasvideo: hasVideo, hasaudio: hasAudio });
      }
      Actions.setDeviceList({
        devices,
        hasdevice,
        useDevices: copyUseDevices,
      });
    });
  }

  /* 获取用户系统信息，进入教室后的设置 */
  getSystemInfo() {
    const { serial } = store.getState().classroom.roomInfo;
    const mySelfInfo = SessionRoom.getMyself();
    const operatingSystem = detectOS();
    // this.state.testSystemInfo.mediaServer = this.useServerRealName;//媒体服务器
    // this.state.testSystemInfo.coursewareServer = window.WBGlobal.docAddressKey;//文件服务器
    Actions.setSystemInfo({
      currentUser: mySelfInfo.nickname, // 当前用户：
      operatingSystem, // 操作系统
      IPAddress: window.location.hostname, // IP地址：
      LoginDevice: mySelfInfo.devicetype, // 登入设备
      // networkDelay:"----",//网络延时：
      // packetLoss:"----",//丢包率：
      browser: `${getBrowserInfo().info.browserName}${getBrowserInfo().info.browserVersion}`, // 浏览器：
      roomNumber: serial, // 房间号：
      versionNumber: mySelfInfo.version, // 版本号
    });
  }

  deviceChangeListener() {
    DeviceManager.registerDeviceChangeListener((type, changedevices) => {
      this.getDevicesList(type, changedevices);
    });
  }

  setDevices(json) {
    const { selectDeviceInfo = {} } = json || {};
    const { audioinput, audiooutput, videoinput } = selectDeviceInfo;
    audioinput && DeviceManager.setDefaultMicrophoneId(audioinput);
    audiooutput && DeviceManager.setDefaultSpeakerId(audiooutput);
    videoinput && DeviceManager.setDefaultCameraIdId(videoinput);
    SessionRoom.switchDevice('video', videoinput);
    SessionRoom.switchDevice('audio', audioinput);
    DeviceManager.associateElementsToSpeaker(audiooutput);
    SessionRoom.setAudioOutput(audiooutput);
  }

  audioSourceChangeHandlerFrom({ deviceId, audioinputVolumeContainerId } = {}) {
    DeviceManager.startMicrophoneTest(deviceId, {
      isplay: true,
      onRealVolume: instant => {
        const ins = (instant * (16 / 100)) / 8;
        const $audioVolumeElement = document.getElementById(audioinputVolumeContainerId);
        if ($audioVolumeElement) {
          const volumeIndex = Math.floor(ins * 16);
          $audioVolumeElement.childNodes.forEach((item, index) => {
            item.classList.remove('yes');
            if (index < volumeIndex) {
              item.classList.add('yes');
            }
          });
        }
      },
    });
  }

  /* 视频镜像 */
  changeVideoMirroringHandle(data) {
    Actions.toggleVideoMirror(data);
    localStorage.setItem('isVideoMirror', JSON.stringify(data));
  }
}

export default DeviceService.getInstance();
