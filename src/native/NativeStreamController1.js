import NativeVideoController from "./NativeVideoController"
import NativeAudioController from "./NativeAudioController"

class NativeStreamController {
    constructor(config, isLocal = false) {
        this.id = config.uid
        this.isLocal = isLocal
        this.type = config.type
        this.videoPlayer = null
        this.audioPlayer = null
        this.streamId = config.streamID || 'local'
    }

    close() {

    }

    getAudioLevel() {
    }

    getAudioTrack() {
    }

    getId() {
    }

    getStats() {
    }

    getVideoTrack() {
    }

    hasAudio() {
    }

    hasVideo() {
    }

    init(options = {}, onCallback) {
        onCallback && onCallback()
    }

    muteAudio() {
    }

    isMuteAudio() {
    }

    muteVideo() {
    }

    isMuteVideo() {
    }

    playVideo() {
    }

    replaceTrack() {
    }

    resumeVideo() {
    }

    setAudioOutput() {
    }

    setAudioVolume() {
    }

    setVideoProfile() {
    }

    getVideoProfile() {
    }

    unplayVideo() {
    }

    isVideoPlaying() {
    }

    unmuteAudio() {
    }

    unmuteVideo() {
    }

    isRemote() {
    }

    getUserId() {
    }

    getType() {
    }

    getSourceID() {
    }

    playAudio() {
    }

    resumeAudio() {
    }

    unplayAudio() {
    }

    getAudioVolume() {
    }

    switchDevice() {
    }

    isAudioPlaying() {
    }

    setMirror(isMirror) {
    }

    getStreamID() {
    }
}

export default NativeStreamController
