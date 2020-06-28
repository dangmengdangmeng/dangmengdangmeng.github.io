class NativeManagerController {
    constructor() {
    }

    getDevices(onCallback) {
        onCallback && onCallback()
    }

    getCameras(onCallback) {
        onCallback && onCallback()
    }

    getSpeakers(onCallback) {
        onCallback && onCallback()
    }


    getMicrophones(onCallback) {
        onCallback && onCallback()
    }

    startCameraTest(deviceId, elementId, options, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    stopCameraTest(deviceId) {
    }

    startMicrophoneTest(deviceId, options, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    stopMicrophoneTest(deviceId) {
    }

    startSpeakerTest(deviceId, audioUrl, options, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    stopSpeakerTest(deviceId) {
    }

    registerDeviceChangeListener(onListener) {
    }

    getVideoTrack(deviceId, options = {}, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    getAudioTrack(deviceId, options = {}, onSuccess, onFailure) {
        onSuccess && onSuccess()
    }

    checkScreenIsNeedPlugin() {
    }

    setDefaultCameraIdId(deviceId) {
    }

    setDefaultMicrophoneId(deviceId) {
    }

    setDefaultSpeakerId(deviceId) {
    }

    setDefaultVideoProfile(profile = {}) {
    }

    getDefaultVideoProfile() {
    }

    getRealVideoProfile(width, height, fps) {
    }

    getMaxVideoProfile() {
    }

    setMaxVideoProfile(width, height, fps) {
    }

    associateElementsToSpeaker(deviceId, elementArr, onCallback) {
        onCallback && onCallback()
    }

    audioEleTestPlay(onCallback) {
        onCallback && onCallback()
    }

    getUserMedia(constraints) {
    }
}

export default NativeManagerController
