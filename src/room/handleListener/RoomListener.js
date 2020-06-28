import globalInfo from '../globalInfo'
import request from "../../utils/request"
import UserControl from "../handleData/UserControl"
import StreamControl from "../handleData/StreamControl"
import triggerEvent from "../../utils/event/triggerEvent"
import CustomEvent from "../../utils/event/CustomEvent"

const {YSRTC, RoomClient} = globalInfo

class RoomListener {
    constructor() {
        this.instance = null
        CustomEvent.on('signal-connected', this.roomConnected.bind(this)) // 房间连接成功
        CustomEvent.on('signal-connection-state-change', this.connectionStateChange.bind(this)) // 自己离开/加入房间本地会触发
        CustomEvent.on('peer-leave', this.peerLeave.bind(this)) // 收到别人离开房间
        CustomEvent.on('peer-join', this.peerJoin.bind(this)) // 收到别人加入房间
        CustomEvent.on('user-properties-update', this.userPropertiesUpdate.bind(this)) // 用户属性改变
        CustomEvent.on('channel-mode-change', this.channelModeChange.bind(this)) // 频道使用的模式改变
        CustomEvent.on('recv-pub-msg', this.recvPubMsg.bind(this))
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RoomListener()
        }
        return this.instance
    }

    /**
     * 房间连接成功
     * @param {object} data 房间连接成功后收到的数据
     data={
			isreconnect: false, // type:boolean 是否是重连后连接频道成功
			currServerTs: number, // type:number 当前服务器的时间(s)
			msglist: [], // msglist: array 信令消息列表
			userlist: [], // userlist: array 用户列表,不含自己
			selfinfo: {id:"uid", properties:{}} | undefined // 自己的用户信息
		}
     */
    roomConnected() {
        request.sendDeviceInfo()
    }

    connectionStateChange(data) {
        console.error('房间连接状态改变：', data)
    }

    /**
     * 用户离开
     * @param {object} data
     data={
			id: string, // 离开的用户id
		}
     */
    peerLeave(data) {
        console.error('有别人离开房间', data)
        const {id} = data
        const leaveData = {
            ...data,
            user: UserControl.getUser(id)
        }
        triggerEvent.userLeave(leaveData)
        UserControl.deleteUser(data.id)
    }

    /**
     * 有其他用户加入
     * @param {object} data
     data={
			id: string, // 加入的用户id
			properties: {}, // type:object 加入用户的自定义用户属性
		}
     */
    peerJoin(data) {
        const {id, properties} = data
        console.error('有人加入房间：', data)
        const joinData = {
            ...data,
            user: UserControl.getUser(id)
        }
        if (properties) {
            joinData.properties.id = id;
            properties.id = id;
        }
        UserControl.setUserProperty(id, properties);

        triggerEvent.userJoin(joinData)
    }

    /**
     * 用户属性改变
     * @param {object} data
     data={
			fromID: string, // type:string 改变者用户id
			id: string, // type:string 被改变者的用户id
			properties: {}, // type:object 改变的自定义用户属性
			toID
			ts
		}
     */
    userPropertiesUpdate(data) {
        const {id, properties} = data
        const {publishstate: newPublishState} = properties
        const {publishstate: oldPublishState} = UserControl.getUser(id)
        UserControl.setUserProperty(id, properties)
        this._handleStreamPublish(oldPublishState, newPublishState, id)
    }

    /**
     * 频道使用的模式改变
     * @param {object} data
     data={
			mode: string // 频道的模式，有频道正常模式(“normal”)和频道限制模式(“limit”)
		}
     */
    channelModeChange(data) {
        const {mode} = data
        globalInfo.roomMode = mode
    }

    /**
     * 接收pubmsg
     * @param {object} msgData
     data={
			fromID: string, // 发送者id
			data: {info: "测试pubMsg"}, // data:object 信令消息数据
			id: string, // 消息id
			name: string, // 消息name
			seq: 1,
			toID: "__all",
			ts: 1587974788 // ts:number 发送消息时间(s)
		}
     */
    recvPubMsg(msgData) {
        const {name, data} = msgData
        if (name === 'SyncProperty') {
            const {user} = data
            UserControl.setUserProperty(user.id, user)
        }
    }

    /**
     * 根据用户属性处理流的发布
     * @param {number} oldPublishState 旧的发布状态
     * @param {number} newPublishState 新的发布状态
     * @param {string} userId 要处理的用户id
     */
    _handleStreamPublish(oldPublishState, newPublishState, userId) {
        const {id: myselfId} = UserControl.getMyself()
        if (newPublishState === undefined || myselfId !== userId) {
            return
        }

        let stream = StreamControl.getStream(userId, 'video')
        const handlePublish = () => {
            if (oldPublishState === 0 && [1, 2, 3].includes(newPublishState)) {
                this._limitModeSendProperty()
                const onFailure = (err) => {
                    triggerEvent.streamPublishError(err, stream)
                }
                RoomClient.publish(stream, undefined, onFailure)
            } else if (newPublishState === 0 && oldPublishState) {
                const onSuccess = () => {
                }
                const onFailure = (err) => {
                    console.error('取消发布失败：', err)
                }
                RoomClient.unpublish(stream, {}, onSuccess, onFailure)
            } else {
                if ((oldPublishState === 1 && newPublishState === 3) || (oldPublishState === 4 && newPublishState === 2)) {
                    stream.unmuteVideo()
                }
                if ((oldPublishState === 2 && newPublishState === 3) || (oldPublishState === 4 && newPublishState === 1)) {
                    stream.unmuteAudio()
                }
                if ((oldPublishState === 1 && newPublishState === 4) || (oldPublishState === 3 && newPublishState === 2)) {
                    stream.muteAudio()
                }
                if ((oldPublishState === 2 && newPublishState === 4) || (oldPublishState === 3 && newPublishState === 1)) {
                    stream.muteVideo()
                }
                triggerEvent.videoStateChanged(stream)
            }
        }
        if (stream) {
            handlePublish()
        } else if (newPublishState || oldPublishState) {
            const spec = {
                uid: userId,
                type: 'video',
                video: [2, 3].includes(newPublishState),
                audio: [1, 3].includes(newPublishState),
            }
            stream = YSRTC.createStream(spec)
            StreamControl.setStream(userId, 'video', stream)
            stream.init({}, errInfo => {
                if (errInfo) {
                    triggerEvent.streamInitError(errInfo)
                    console.error('音视频初始化错误：', errInfo)
                } else {
                    handlePublish()
                }
            })
        }
    }

    /**
     * 限制模式时同步自己的用户属性
     */
    _limitModeSendProperty() {
        if (globalInfo.roomMode === 'limit') {
            const myself = UserControl.getMyself()
            const data = {user: myself}
            RoomClient.pubMsg('SyncProperty', 'SyncProperty', '__all', data, false)
        }
    }
}

export default RoomListener
