import globalInfo from "../globalInfo"
import CustomEvent from "../../utils/event/CustomEvent"
import triggerEvent from "../../utils/event/triggerEvent"
import UserControl from "../handleData/UserControl"
import StreamControl from "../handleData/StreamControl"

const {RoomClient} = globalInfo

class StreamListener {
    constructor() {
        this.instance = null
        CustomEvent.on('stream-published', this.streamPublished.bind(this))
        CustomEvent.on('stream-unpublished', this.streamUnpublished.bind(this))
        CustomEvent.on('stream-added', this.streamAdded.bind(this))
        CustomEvent.on('stream-subscribed', this.streamSubscribed.bind(this))
        CustomEvent.on('stream-removed', this.streamRemoved.bind(this))
        CustomEvent.on('mute-video', this.muteVideo.bind(this))
        CustomEvent.on('mute-audio', this.muteAudio.bind(this))
        CustomEvent.on('unmute-audio', this.unmuteAudio.bind(this))
        CustomEvent.on('unmute-video', this.unmuteVideo.bind(this))
        CustomEvent.on('stream-publish-error', this.streamPublishError.bind(this))
    }

    /* 获取RoomListener实例 */
    static getInstance() {
        if (!this.instance) {
            this.instance = new StreamListener()
        }
        return this.instance
    }

    /**
     * 本地发布流成功
     * @param {object} data 回调数据
     * data = {
     *		stream: stream, // 发布的流对象
     * }
     */
    streamPublished(data) {
        const {stream} = data
        const type = stream.getType()
        if (type === 'video') {
            triggerEvent.videoStateChanged(stream)
        } else if (type === 'screen') {
            triggerEvent.screenStateChanged(stream)
        }
    }

    /**
     * 本地取消发布流成功
     * @param {object} data 回调数据
     * data = {
     *		stream: stream, // 流对象
     * }
     */
    streamUnpublished(data) {
        const {stream} = data
        const type = stream.getType()
        if (type === 'video') {
            triggerEvent.videoStateChanged(stream, true)
        } else if (type === 'screen') {
            triggerEvent.screenStateChanged(stream, true)
        } else if (type === 'media') {
            triggerEvent.mediaStateChanged(stream)
        }
    }

    /**
     * 收到流添加
     * @param {object} data 回调数据
     * data = {
     *		stream: stream, // 流对象
     * }
     */
    streamAdded(data) {
        const {stream} = data
        const id = stream.getUserId()
        const type = stream.getType()
        if (id !== UserControl.getMyself().id || type === 'media') {
            RoomClient.subscribe(stream, {}, (err) => {
                triggerEvent.streamSubscribeError(err, stream)
            })
        }
    }

    /**
     * 订阅流成功
     * @param {object} data 回调数据
     * data = {
     *		stream: stream, // 流对象
     * }
     */
    streamSubscribed(data) {
        const {stream} = data
        const id = stream.getUserId()
        const type = stream.getType()
        console.error('订阅远程流成功：', stream, type, StreamControl.getStreamList('screen'))
        StreamControl.setStream(id, type, stream)
        if (type === 'video') {
            triggerEvent.videoStateChanged(stream)
        } else if (type === 'screen') {
            triggerEvent.screenStateChanged(stream)
        } else if (type === 'media') {
            triggerEvent.mediaStateChanged(stream)
        }
    }

    /**
     * 收到远程流移除事件
     * @param {object} data 回调数据
     */
    streamRemoved(data) {
        const {stream} = data
        const id = stream.getUserId()
        const type = stream.getType()
        console.error('远程流移除成功：', stream)
        StreamControl.delStream(id, type)
        if (type === 'video') {
            triggerEvent.videoStateChanged(stream, true)
        } else if (type === 'screen') {
            triggerEvent.screenStateChanged(stream, true)
        } else if (type === 'media') {
            triggerEvent.mediaStateChanged(stream)
        }
    }

    muteVideo(data) {
        const {stream} = data
        console.error('远端禁用视频轨道：', data, stream.hasVideo())
        triggerEvent.videoStateChanged(stream)
    }

    muteAudio(data) {
        const {stream} = data
        console.error('远端禁用音频轨道：', data)
        triggerEvent.videoStateChanged(stream)
    }

    unmuteAudio(data) {
        const {stream} = data
        console.error('远端启用音频轨道：', data)
        triggerEvent.videoStateChanged(stream)
    }

    unmuteVideo(data) {
        const {stream} = data
        console.error('远端启用视频轨道：', data)
        triggerEvent.videoStateChanged(stream)
    }

    streamPublishError(data) {
        const {errInfo, stream} = data
        if (errInfo === 'PUBLISH_STREAM_LIMIT') {
            const onSuccess = () => {
                console.error('取消发布成功：')
            }
            const onFailure = (err) => {
                console.error('取消发布失败：', err)
            }
            RoomClient.unpublish(stream, {}, onSuccess, onFailure)
        }
    }
}

export default StreamListener
