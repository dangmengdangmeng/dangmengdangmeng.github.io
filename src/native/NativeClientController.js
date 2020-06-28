/**
 * @description 对外的客户端接口
 * */
import CustomEvent from "../utils/event/CustomEvent"
import CONSTANTS from '../utils/contants'

class NativeClientController {
    constructor(config = {}) {
        this.config = config
    }

    //启用说话者音量提示
    enableAudioVolumeIndicator(interval) {

    }


    //发送消息
    sendChatMsg(message, toId, extraData = {}) {
    }

    //获取 SDK 与信令服务器的连接状态
    getSignalConnectionState() {

    }

    //获取本地发布流的音频统计数据
    getLocalAudioStats() {

    }

    //获取本地发布流的视频统计数据
    getLocalVideoStats() {

    }

    //发送信令
    pubMsg() {
    }

    //删除信令
    delMsg() {
    }

    //获取远端订阅流的音频统计数据
    getRemoteAudioStats() {

    }

    //获取远端订阅流的视频统计数据
    getRemoteVideoStats() {

    }

    //初始化房间
    init(appId, onSuccess, onError) {
        onSuccess && onSuccess()
    }


    //加入房间
    joinChannel(token, channel, info, userId, onSuccess, onError) {
        //空实现中返回的用户 id 正常情况下需返回底层的 userId
        const _userId = 123
        onSuccess && onSuccess(_userId)
    }

    //离开房间
    leaveChannel() {
    }

    //发布本地音视频流
    publish() {
    }

    //订阅远程音视频流
    subscribe() {
    }


    //取消发布本地音视频流
    unpublish() {

    }

    //取消订阅远程音视频流
    unsubscribe() {
    }


    //改变用户属性
    setProperty(id, properties = {}, toID = CONSTANTS.MSG_TO_ALLUSER) {
        let params = {
            id, toID, properties
        }
    }

    //开始媒体共享
    addInjectStreamUrl() {
    }

    //停止媒体共享
    removeInjectStreamUrl() {
    }

    //暂停或恢复媒体共享
    pauseInjectStreamUrl() {
    }

    //控制媒体共享进度
    seekInjectStreamUrl() {
    }

    //是否开启多流模式
    enableMultiStream() {
    }


    //开始服务端录制
    startServerRecord() {
    }

    //停止服务端录制
    stopServerRecord() {
    }

    //踢出房间
    evictUser() {
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
}

export default NativeClientController
