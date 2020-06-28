/**
 * @module main
 * @description ppapi session 层的出口
 * @author 党萌
 * @time 2020-06-19
 * */
import Room from "./room/Room"
import CustomEvent from "./utils/event/CustomEvent"
import utils from "./utils/utils"

const isNative = utils.isNative()
const ysSession = {
    isNative,
    Room,
    Event: CustomEvent
}

export default ysSession
window.YSSession = ysSession
