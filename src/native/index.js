/**
 * @description 模拟 jssdk 底层对外的接口
 * 客户端没有的接口采用空实现
 * @author dangmeng
 * @date 2020-06-26*/
import NativeClientController from "./NativeClientController"
import NativeStreamController from "./NativeStreamController"
import CONSTANTS, {DEVICE_ADAPTER_CONFIG, SDKVERSIONS, SDKVERSIONSTIME} from '../utils/contants'
import NativeManagerController from "./NativeManagerController"

class NativeRTC {
    constructor() {
        this.CONSTANTS = CONSTANTS
        this.VERSION = SDKVERSIONS
        this.VERSIONTIME = SDKVERSIONSTIME
        this.Logger = ''
        this.SessionLogger = ''
        this.DEVICE_ADAPTER_CONFIG = DEVICE_ADAPTER_CONFIG
        this.client = null
    }

    //检查 JSSDK 对正在使用的浏览器的适配情况
    checkSystemRequirements(code = 'vp8', onCallback) {
        onCallback && onCallback()
    }

    //用于创建客户端，在每次会话里仅调用一次
    createClient(config = {}) {
        if (!this.client) {
            this.client = new NativeClientController(config)
        }
        return this.client
    }


    //创建并返回音视频流对象
    createStream(config = {}) {
        if (!(config.uid && config.type)) {
            return
        }
        return new NativeStreamController(config, true)
    }


    //获取设备管理类
    getDeviceManager() {
        return new NativeManagerController()
    }

    //设置sdk内部日志打印的配置
    setSdkLogConfig(config = {}) {
        return ''
    }
}

const YSRTC = new NativeRTC()

export default YSRTC
