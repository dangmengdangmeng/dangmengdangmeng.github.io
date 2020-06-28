/**常量类
 * @description  提供SDK的常量
 * @author dangmeng
 * @date 2020-06-26
 */

export const SDKVERSIONS = '1.0.0'; //版本号
export const SDKVERSIONSTIME = '20200626'; //版本号更新的时间

//暴露给外层用的常量
const contants_obj = {
    MSG_TO_ALLUSER:'__all', //发送信息给频道中的所有人
    MSG_TO_ALLEXCEPTSENDER:'__allExceptSender', //发送信息给除自己以外的频道中所有人
    MSG_TO_NONEUSER:'__none', //只发送信息到服务器，不发给任何人
    MSG_TO_ALLSUPERUSERS:'__allSuperUsers', //只发给特殊身份(助教和老师)
    ROLE_TEACHER:0, //老师（主讲/主播）
    ROLE_ASSISTANT:1, //助教
    ROLE_STUDENT:2, //学生
    ROLE_AUDIT:3, //旁听
    ROLE_PATROL:4, //巡检员（巡课）
    ROLE_SYSTEM_ADMIN:10, //系统管理员
    ROLE_ENTERPRISE_ADMIN:11, //企业管理员
    ROLE_ADMIN:12, //管理员
    ROLE_PLAYBACK:-1, //回放者
    REC_TYPE_RECFILE:0, //生成录制件
    REC_TYPE_VIDEOLIST:1, //生成视频列表
    REC_TYPE_MP3:2, //只生成mp3
    REC_TYPE_MIXVIDEO:3, //混屏录制，同时生成mp3和mp4
};

//暴露给外层用于修改SDK的设备适配的默认配置
export const DEVICE_ADAPTER_CONFIG = {
    NOT_STOP_VIDEO_TRACK: false, //不停止videoTrack
    NOT_STOP_AUDIO_TRACK: false, //不停止audioTrack
    GET_USER_MEDIA_TIMEOUT_TS: 15000, //getUserMedia 超时时间（ms）
    MAX_VIDEO_FPS: 30, //最大的视频帧率
    MEDIA_ELE_PLAY_TIMEOUT_TS: -1, //媒体元素播放的超时时间（ms），默认不超时
};

//pc的类型（SDK内部使用）
export const CONNECTION_TYPE = {
    UP : 0,
    DOWN : 1
};

export const PUB_TIMEOUT_TS = 15000; //发布超时（SDK内部使用）
export const SUB_TIMEOUT_TS = 15000; //订阅超时（SDK内部使用）

export default new Proxy(contants_obj, {
    get(target, key) {
        return target[key];
    },
    set() {
        return true;
    }
});
