import NativeVideoController from "./NativeVideoController"
import NativeAudioController from "./NativeAudioController"
import NativeBaseStreamController from "./NativeBaseStreamController"

class NativeStreamController extends NativeBaseStreamController {
    constructor(config, isLocal = false) {
        super(config, isLocal)
        this.id = config.uid
        this.isLocal = isLocal
        this.type = config.type
        this.videoPlayer = null
        this.audioPlayer = null
        this.streamId = config.streamID || 'local'
    }

    init(options = {}, onCallback) {
        onCallback && onCallback()
    }

    playVideo(elementId, options, onCallback) {
        if (typeof elementId !== 'string') return
        if (this.videoPlayer) {
            //卸载之前的videoPlayer
            this.unPlayVideo()
        }
        this.videoPlayer = new NativeVideoController({
            id: this.id,
            elementId,
            isLocal: this.isLocal,
            type: this.type,
            options,
            streamId: ''
        })
        this.videoPlayer.playVideo().finally(() => {
            onCallback && onCallback()
        })
    }

    unPlayVideo() {
        this.videoPlayer && this.videoPlayer.destroy()
    }

    resumeVideo() {
        return this.videoPlayer.resumeVideo()
    }

    setAudioOutput(deviceId, onSuccess, onFailure) {
        this.audioPlayer.setAudioOutput(deviceId, onSuccess, onFailure)
    }

    setAudioVolume(volume) {
        this.audioPlayer.setAudioVolume(volume)
    }

    setVideoProfile(profile = {}) {
        return profile
    }

    getVideoProfile() {
        return ''
    }

    muteVideo() {
        return true
    }

    unmuteVideo() {
        return true
    }

    playAudio(options = {}, onCallback) {
        this.audioPlayer = new NativeAudioController({
            id: this.id,
            elementId: '',
            local: this.isLocal,
            type: this.type,
            options,
            streamId: this.streamId,
        })

        this.audioPlayer.playAudio().finally(() => {
            onCallback && onCallback()
        })
    }

    muteAudio() {
        return true
    }

    unmuteAudio() {
        return true
    }

    resumeAudio() {
    }

    switchDevice(type, deviceId, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    replaceTrack(mediaStreamTrack, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    checkoutVideoPlayerStuck() {
    }

    _replaceTrack(mediaStreamTrack, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    _bindVideoTrackEvents(prefixLog) {
        return ''
    }

    _bindAudioTrackEvents() {
        return ''
    }
}

export default NativeStreamController
