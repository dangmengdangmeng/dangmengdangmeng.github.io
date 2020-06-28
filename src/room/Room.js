import globalInfo from './globalInfo'
import RoomControl from "./handleData/RoomControl"
import UserControl from "./handleData/UserControl"
import StreamControl from "./handleData/StreamControl"
import RoomListener from "./handleListener/RoomListener"
import StreamListener from "./handleListener/StreamListener"
import request from "../utils/request"

const {YSRTC} = globalInfo

class Room {
    constructor() {
        this.instance = null
        RoomListener.getInstance()
        StreamListener.getInstance()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Room()
        }
        return this.instance
    }

    /**
     * 检测房间
     * @param {string} host web服务器域名（或ip）
     * @param {string} port web服务器端口号
     * @param {object} params enterroom接口所需的基本参数
     params = {
            param: 加入房间的地址串
			restrict: 是否强制切换线路 0不强制, type: number/string, 必须
			domain: 公司的企业域名标识, 必须
			roomtype： 房间类型，必须
			clientType: 1, 客户端类型 1:PC 2:Android ,3:IOS , 4:PC客户端, 必须
            serial：房间ID，String类型, 必须（有param则不需要）
			nickName: 用户在房间中的昵称, String，必须（有param则不需要）
            password：房间密码，String类型，不同用户角色对应不同密码,（有param则不需要）
        }
     */
    checkRoom(host, port = 443, params = {}) {
        RoomControl.setRoomAddress({
            webaddr: host,
            webPort: port,
        })
        return new Promise((resolve, reject) => {
            request.checkRoom(params).then(res => {
                if (res.result === 0) {
                    const {newcourseaddr} = res
                    const {docaddr, signaladdr, signalport, webaddr, name} = newcourseaddr[0]
                    RoomControl.setRoomAddress({
                        serverName: name,
                        docaddr: docaddr[0],
                        signaladdr,
                        signalport,
                        webaddr,
                    })
                    globalInfo.checkRoomResult = res
                }
                resolve(res)
            }).catch(err => {
                console.error('检测房间失败: ', err)
                reject(err)
            })
        })
    }

    init(appId) {
        return new Promise((resolve, reject) => {
            globalInfo.RoomClient.init(appId, () => resolve(), error => reject(error))
        })
    }

    /**
     * @description 创建客户端 一次会话仅创建一次
     * @param {Object} config 房间配置
     */
    createClient(config = {}) {
        globalInfo.RoomClient = YSRTC.createClient(config)
        RoomControl.eventForwarding()
        return globalInfo.RoomClient
    }

    /**
     * @description 加入房间
     * @param {string} channelId 房间 id
     * @param {string} userProperties 用户属性
     */
    joinRoom(channelId, userProperties) {
        return new Promise((resolve, reject) => {
            globalInfo.RoomClient.joinChannel(null, channelId, userProperties, '', userId => {
                UserControl.setMyId(userId)
                resolve(userId)
            }, error => {
                reject(error)
            })
        })
    }

    //返回设备列表
    getDeviceManager() {
        return YSRTC.getDeviceManager()
    }

    //返回自己的用户属性
    getMyself() {
        return UserControl.getMyself()
    }

    //返回指定id的用户属性
    getUser(userId) {
        return UserControl.getUser(userId)
    }

    //返回教室里的所有人
    getUsers() {
        return UserControl.getUserList()
    }

    //播放视频
    playVideo(...data) {
        StreamControl.playVideo(...data)
    }

    //取消播放视频
    unplayVideo(...data) {
        StreamControl.unPlayVideo(...data)
    }

    //播放音频
    playAudio(...data) {
        StreamControl.playAudio(...data)
    }

    //取消播放音频
    unplayAudio(...data) {
        StreamControl.unPlayAudio(...data)
    }

    //设置audio 音量¬
    setAudioVolume(...data) {
        StreamControl.setAudioVolume(...data)
    }

    /**
     * 开始屏幕共享
     */
    startShareScreen(...data) {
        StreamControl.startShareScreen(...data)
    }

    /**
     * 停止屏幕共享
     */
    stopShareScreen() {
        StreamControl.stopShareScreen()
    }
}

export default Room.getInstance()
