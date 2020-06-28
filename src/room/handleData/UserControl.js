import utils from "../../utils/utils"
import globalInfo from "../globalInfo"

const browserInfo = utils.getBrowserInfo()
const {YSRTC} = globalInfo

class UserControl {
    constructor() {
        this.myself = {
            isNative: utils.isNative(),
            vfail: 0,
            afail: 0,
            publishstate: 0,
            hasvideo: true,
            hasaudio: true,
            sdk_osversion: utils.detectOS(),
            sdk_devicemodel: `${browserInfo.info.browserName} ${browserInfo.info.browserVersion}`, // 获取浏览器名称
            sdk_sdkversion: YSRTC.VERSION,
        }
        this.userList = {}
    }


    getMyself() {
        return this.myself
    }

    getUserList() {
        return this.userList
    }

    getUser(id) {
        return this.userList[id]
    }

    setMyId(id) {
        this.myself.id = id
        this.userList[id] = this.myself
    }

    setUserProperty(id, properties) {
        if (!id) return
        if (id === this.myself.id) {
            this.myself = Object.assign(this.myself, properties)
        }

        this.userList[id] = Object.assign(this.userList[id], properties)
    }

    deleteUser(id) {
        delete this.userList[id]
    }
}

export default new UserControl()
