import UserControl from "./UserControl"
import globalInfo from "../globalInfo"
import triggerEvent from "../../utils/event/triggerEvent"
import Logger from "../../utils/Logger"

const {YSRTC} = globalInfo

class StreamControl {
    constructor() {
        this.streamList = {
            video: {},
            media: {},
            screen: {},
            file: {}
        }
        this.streamType = ['video', 'media', 'screen', 'file']
    }

    getStream(id, type) {
        return this.streamList[type][id]
    }

    setStream(id, type, stream) {
        if (this.streamType.includes(type)) {
            this.streamList[type][id] = stream
        }
    }

    delStream(id, type) {
        if (this.streamType.includes(type)) {
            delete this.streamList[type][id]
        }
    }

    getStreamList(type) {
        return this.streamList[type]
    }

    playVideo(id, elementId, options = {}, callback) {
        const type = options.type || 'video'
        let stream = this.getStream(id, type)
        const mySelf = UserControl.getMyself()
        if (!stream) {
            if (id === mySelf.id) {
                //创建流
                stream = YSRTC.createStream({
                    uid: mySelf.id,
                    type: 'video'
                })
                stream.init({}, err => {
                    if (err) {
                        console.log('音视频播放错误')
                    } else {
                        this.setStream(mySelf.id, 'video', stream)
                        stream.playVideo(elementId, options, callback)
                    }
                })
            }
            return
        }
        stream.playVideo(elementId, options, callback)
    }

    unPlayVideo(id, type = 'video') {
        const stream = this.getStream(id, type)
        if (!stream) {
            return false
        }
        stream.unPlayVideo()
    }

    playAudio(id, options = {}, callback) {
        const type = options.type || 'video'
        const stream = this.getStream(id, type)
        if (!stream) return false
        stream.playAudio(options, callback)
    }

    unPlayAudio(id, type = 'video') {
        const stream = this.getStream(id, type)
        if (!stream) return false
        stream.unPlayAudio()
    }

    resumeAudio(id, type = 'video') {
        const stream = this.getStream(id, type)
        if (!stream) {
            Logger.warning('没有对应id的流')
            return
        }
        stream.resumeAudio()
    }

    setAudioVolume(id, type = 'video', volume) {
        const stream = this.getStream(id, type)
        if (!stream) {
            Logger.warning('没有对应id的流')
            return
        }
        stream.setAudioVolume(volume)
    }

    startShareScreen(options = {}) {
        //开始共享屏幕
    }

    stopShareScreen() {
        const stream = this.getStream(UserControl.getMyself().id, 'screen')
        if (stream) {
            //停止共享屏幕
        }
    }
}

export default new StreamControl()
