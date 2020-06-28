import UserControl from '../../room/handleData/UserControl'
import CustomEvent from "./CustomEvent"

export default {
    /**
     * 触发视频状态改变事件
     * @param {object} stream 改变的流对象
     * @param {boolean} isRemoved 是否已删除
     */
    screenStateChanged(stream, isRemoved) {
        CustomEvent.trigger('screen-state-changed', {
            userId: stream.getUserId(),
            published: !isRemoved ? stream.isPubedVideo() : false,
            stream,
        })
    },

    mediaStateChanged(stream, isRemoved) {
        CustomEvent.trigger('media-state-changed', {
            stream,
            publish: !isRemoved
        })
    },
    /**
     * 触发屏幕共享状态改变事件
     * @param {object} stream 屏幕共享的流对象
     * @param {boolean} isRemoved 是否已删除
     */
    videoStateChanged(stream, isRemoved) {
        const user = UserControl.getUser(stream.getUserId())
        CustomEvent.trigger('video-state-changed', {
            userId: stream.getUserId(),
            videoPublished: !isRemoved ? stream.isPubedVideo() : false,
            audioPublished: !isRemoved ? stream.isPubedAudio() : false,
            publishstate: user.publishstate,
            stream,
        })
    },
    /**
     * 触发流初始化时的错误
     * @param {[
     * {type: "video_device", errflag: "NOT_ALLOWED_ERROR", message: "Permission denied"},
     * {type: "audio_deivce", errflag: "NOT_ALLOWED_ERROR", message: "Permission denied"},
     * {type: "screen", errflag: "SCREEN_PLUGIN_NOT_INSTALL_EDPROPERLY", message: "plugin not install edproperly"},
     * ]} errInfo 错误信息
     * errflag有以下值：
     * “NOT_SUPPORT”: 浏览器不支持。
     * “INVALID_ARG”: 无效的参数。
     * “NOT_ALLOWED_ERROR”: 用户拒绝授予对应的摄像头或麦克风权限。
     * “NOT_READABL_EERROR”: 摄像头或麦克风被占用。
     * “ABORT_ERROR”: 设备中止错误。
     * “NOT_FOUND_ERROR”: 没有找到设备。
     * “OVER_CONSTRAINED_ERROR”: 配置的约束无法满足要求错误。
     * “SECURITY_ERROR”: 安全错误,网页使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。
     * “TYPE_ERROR”: 设备约束都设置为false了。
     * “REQ_TIMEOUT”: 请求设备/屏幕共享超时。
     * “SCREEN_FAIL”: 屏幕/程序流获取失败。
     * “SCREEN_PLUGIN_NOT_INSTALL_EDPROPERLY”: 用户尝试在 Chrome 上进行屏幕共享，但未安装屏幕共享插件，或使用了错误的 extensionId。
     * “UNDEFINED_ERROR”: 未定义错误。
     */
    streamInitError(errInfo) {
        CustomEvent.trigger('stream-init-error', {
            errInfo,
        })
    },
    /**
     * 触发流发布失败的错误
     * @param {string} errInfo 错误原因
     * 有以下值：
     * "STREAM_ALREADY_PUBLISHED": 该 stream 已经发布
     * "INVALID_LOCAL_STREAM": 传入的 stream 格式非法。
     * "STREAM_NOT_INITED": 本地流没有初始化完成。
     * "SIGNAL_NOT_CONNECT": 当前不在频道中，可能是没有加入频道或者是网络波动导致暂时断开连接。
     * "PUBLISH_STREAM_LIMIT": 发布的音视频最大路数超过限制。
     * “PUB_SETREMOTEDESC_FAIL”: 浏览器setRemoteDescription失败
     * @param {object} stream 失败的流对象
     */
    streamPublishError(errInfo, stream) {
        CustomEvent.trigger('stream-publish-error', {
            errInfo,
            stream,
        })
    },
    /**
     * 触发流订阅失败的错误
     * @param {string} errInfo 错误原因
     * 有以下值：
     * "STREAM_ALREADY_SUBSCRIBED": 该 stream 已经订阅。
     * "STREAM_NOT_YET_PUBLISHED": 指定的 stream 还没有发布。
     * "INVALID_REMOTE_STREAM": 传入的 stream 格式非法。
     * "SIGNAL_NOT_CONNECT": 当前不在频道中，可能是没有加入频道或者是网络波动导致暂时断开连接。
     * “SUB_SETREMOTEDESC_FAIL”: 浏览器setRemoteDescription失败
     * @param {object} stream 失败的流对象
     */
    streamSubscribeError(errInfo, stream) {
        CustomEvent.trigger('stream-subscribe-error', {
            errInfo,
            stream,
        })
    },
    userLeave(data) {
        CustomEvent.trigger('user-leave', data)
    },
    userJoin(data) {
        CustomEvent.trigger('user-join', data)
    }
}
