/**
 * @description 按照 jssdk 底层的设计模式 实现相关接口
 * 客户端用不到的接口改为空实现 防止报错
 * @author dangmeng
 * @date 20200626*/
import CustomEvent from "../utils/event/CustomEvent"

class NativeBaseStreamController {
    constructor(config = {}, isLocal) {

    }


    isInitFinished() {
    }

    close() {
    }

    setRemoteVideoTrack(videoTrack) {
    }

    setRemoteAudioTrack(audioTrack) {
    }

    getAudioLevel() {
    }

    getAudioTrack() {
    }

    getId() {
    }

    getVideoTrack() {
    }

    hasAudio() {
    }

    hasVideo() {
    }

    isMuteAudio() {
    }

    isMuteVideo() {
    }

    isPubedVideo() {
    }

    isPubedAudio() {
    }

    getStreamID() {
    }

    isVideoPlaying() {
    }

    isRemote() {
    }

    getAttributes() {
    }

    getUserId() {
    }

    getType() {
    }

    getSourceID() {
    }

    getAudioVolume() {
    }

    isAudioPlaying() {
    }

    setMirror() {
    }

    unplayVideo() {
    }

    getStats(onCallback) {
        onCallback && onCallback()
    }

    setStreamID(streamID) {
    }

    setLocalAttributes(attrs = {}) {
    }

    updateAttributes(attrs = {}) {
    }

    unplayAudio() {
    }

    _getEventData() {
    }

    _unplayVideo() {
    }

    _unplayAudio() {
    }

    _videoplayerStatusChange(evt) {
    }

    _audioplayStatusChange(evt) {
    }

    ["_onevt_camera-device-changed"](evt) {

    }

    ["_onevt_microphone-device-changed"](evt) {
    }

    ["_onevt_speaker-device-changed"](evt) {
    }

    ["_onevt_mobile-videotrack-update"](evt) {
    }

    ["_onevt_mobile-audiotrack-update"](evt) {
    }

    on(eventType, listener, markId) {
        return CustomEvent.on(eventType, listener, markId)
    }

    off(eventType, listener) {
        return CustomEvent.off(eventType, listener)
    }

    offAll(eventType) {
        return CustomEvent.offAll(eventType)
    }

    offAllByMarkId(markId) {
        return CustomEvent.offAllByMarkId(markId)
    }

    trigger(eventType, evtMsg) {
        return CustomEvent.trigger(eventType, evtMsg)
    }
}

export default NativeBaseStreamController
