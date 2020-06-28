/**
 *@description 一些全局的方法和属性
 *@author 党萌
 *@date 2020-05-19
 * */

import utils from "../utils/utils"
import YSRTC from "../native"

export default {
    YSRTC,//模拟 jssdk 底层提供的方法
    DeviceManager: '',
    browserInfo: utils.getBrowserInfo(),
    checkRoomResult: {},//enterRoom接口返回的结果
    RoomClient: null,//客户端对外的接口
    roomMode: 'normal', // 房间模式 正常模式(“normal”)和频道限制模式(“limit”)
}
