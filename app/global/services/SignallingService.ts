import { YsGlobal } from '@global/handleGlobal';
import { uuidv4 } from '@utils/index';
import store from '@app/store';
import { sendSignalling } from '../../utils/sign';
import { LiveRoomSignalling } from './LiveRoomSignalling';

class Signalling {
  /**
   * 通知关闭媒体文件
   * @param {{ attributes }} data 
   * @param {string} toID 
   */
  closeMedia(data: any, toID: string) {
    sendSignalling({
      name: "CloseMedia" ,
      signalId: "CloseMedia",
      toID,
      data,
      isSave: false,
    });
  }

  /**
   * 通知服务器进行房间的销毁
   */
  destroyServerRoom() {
    sendSignalling({
      name: "Server_RoomEnd" ,
      id: "Server_RoomEnd",
      toID: "__none",
      data: {},
      isSave: false,
    });
  }

  /**
   * 发送多白板窗口全局状态信令
   * @param {any} data 
   */
  moreWhiteboardGlobalState(data: any) {
    sendSignalling({
      name: "MoreWhiteboardGlobalState" ,
      id: "MoreWhiteboardGlobalState",
      toID: "__all",
      data,
    });
  }
  /**
   * 发送多白板窗口状态信令
   * @param {string} instanceId 白板id
   * @param {any} data 
   * @param {string} msgId 绑定的信令id
   */
  moreWhiteboardState(instanceId: string, data: any, msgId: string) {
    sendSignalling({
      name: "MoreWhiteboardState" ,
      id: `MoreWhiteboardState_${instanceId}`,
      toID: "__all",
      data,
      associatedMsgID: msgId,
    });
  }
  /**
   * 发布多白板showpage
   * @param {string} instanceId 白板id
   * @param {any} data 
   * @param {Boolean} isDelMsg 是否是删除信令
   */
  moreWhiteboardShowPage(instanceId: string, data: any, isDelMsg: boolean = false) {
    const id = `DocumentFilePage_ExtendShowPage_${instanceId}`;
    sendSignalling({
      name: 'ExtendShowPage',
      id,
      toID: '__all',
      data,
      isDelMsg,
    });
    return id;
  }
  /**
   * 取消/订阅举手
   * @param {string} associatedMsgID 发布举手信令id
   * @param {boolean} isUnSub 是否取消订阅
   */
  subRaisehand(associatedMsgID: string, isUnSub = false) {
    sendSignalling({
      name: 'RaiseHandResult',
      id: uuidv4(),
      toID: '__none', // 必须是__none
      isSave: false, // 必须不保存
      data: { min: 1, max: 300 }, // 数据，min:表示排序最小值，默认为1，max：表示排序最大值，默认为发起排序器时的maxSort【max不能超过maxSort，当maxSort为-1时，max为当前排序器列表总数】
      type: isUnSub ? 'unsubSort' : 'subSort', // 取消订阅必须是unsubSort，订阅必须是subSort
      associatedMsgID, // 必须绑定发起排序器的id
    });
  }

  /**
   * 学生发送举手信令
   * @param {string} userId 用户ID
   * @param {string} nickname 用户名称
   * @param {string} associatedMsgID 发布举手信令id
   * @param {Boolean} isCancel 是否取消举手
   */
  sendRaisehand(userId: string | undefined, nickname: string, associatedMsgID: string, isCancel: boolean = false) {
    sendSignalling({
      name: 'RaiseHand',
      signalId: uuidv4(),
      toId: '__none',
      data: {},
      isSave: false,
      type: 'sort', // 必须是sort
      modify: Number(isCancel), // 必须,0:添加，1：删除
      actions: { [String(userId)]: nickname }, // 必须，排序项，规则如：{‘排序项名’:'排序项描述'}
      associatedMsgID, // 必须绑定发起排序器的id
      associatedUserID: userId, // 非必须，绑定用户id,只有在modify为0时有效,如果绑定用户id，则该用户离开时删除在该用户上【注意：这里的associatedUserID只能绑定添加排序项的自己id，一旦绑定其它人id则此项无效】
    });
  }

  /**
   * 老师发送开始举手信令
   * @param {number} beginTime 开始上课时间
   * @param {Boolean} isDelMsg 是否是删除信令
   */
  sendStartRaisehand(beginTime: number) {
    const { serial } = store.getState().classroom.roomInfo;
    sendSignalling({
      name: 'RaiseHandStart',
      signalId: `RaiseHandStart_${serial}_${beginTime}`,
      toId: '__all',
      data: { maxSort: 300, subInterval: 2000 },
      isSave: true,
      type: 'useSort', // 必须是useSort
    });
  }

  /**
   * 老师发送轮询信令
   * @param {Object} data 信令数据
   * @param {string} associatedUserID 发送者ID
   * @param {Boolean} isDelMsg 是否是删除信令
   */
  sendPolling(data: any = {}, associatedUserID: string = "", isDelMsg: boolean = false) {
    const signallingName = 'VideoPolling';
    const toId = '__all';
    const id = 'VideoPolling';
    sendSignalling({
      isDelMsg,
      name: signallingName,
      signalId: id,
      toId,
      data: data || {},
      isSave: true,
      associatedUserID,
    });
  }

  /**
   * @param {Object} data 信令数据
   * @param {Boolean} isDelMsg 是否是删除信令
   */
  sendVideoMark(data: any, isDelMsg: boolean = false) {
    const signallingName = 'VideoWhiteboard';
    const toId = '__all';
    const associatedMsgID = data.assID || '';
    const id = 'VideoWhiteboard';
    sendSignalling({
      isDelMsg,
      name: signallingName,
      signalId: id,
      toId,
      data: data || {},
      isSave: true,
      associatedMsgID,
    });
  }

  /**
   * 小班课发布答题器
   */
  sendAnswerCreated(isDelMsg: boolean, data: any, serial: string) {
    const signallingName = 'Answer';
    const toID = '__all';
    const associatedMsgID = data.assID || '';
    let id = `answer_${serial + uuidv4()}`;
    if (isDelMsg || data.answerId) id = data.answerId;
    sendSignalling({
      isDelMsg,
      name: signallingName,
      signalId: id,
      toId: toID,
      data: { ...data, answerId: id },
      isSave: true,
      associatedMsgID,
      write2DB: true,
      type: 'useCount',
    });
  }

  /**
   * 小班课答题器提交答案
   */
  sendAnswerCommit(data: any, options: any, id: string, isUpdate: boolean) {
    const signallingName = 'AnswerCommit';
    const toID = '__none';
    sendSignalling({
      isDelMsg: false,
      name: signallingName,
      signalId: id,
      toId: toID,
      data,
      modify: Number(!!isUpdate),
      isSave: true,
      type: 'count',
      actions: options,
      write2DB: true,
      associatedMsgID: id,
    });
  }

  /**
   * 小班课答题器获取答题结果
   */
  sendAnswerResult(id: string, toID: string) {
    const signallingName = 'AnswerGetResult';
    sendSignalling({
      isDelMsg: false,
      name: signallingName,
      signalId: id,
      toId: toID,
      data: {},
      isSave: false,
      type: 'getCount',
      associatedMsgID: id,
    });
  }

  /**
   * 小班课答题器公布答案
   */
  sendAnswerPublic(data: any, id: string, isDelMsg: boolean) {
    const signallingName = 'AnswerPublicResult';
    sendSignalling({
      isDelMsg,
      name: signallingName,
      signalId: 'AnswerPublicResult',
      toId: '__all',
      data,
      isSave: true,
      associatedMsgID: id,
    });
  }

  /**
   * 更新服务器时间
   */
  sendSignallingFromUpdateTime(toParticipantID: string) {
    if (YsGlobal.playback) {return}
    sendSignalling({
      name: 'UpdateTime',
      signalId: 'UpdateTime',
      toId: toParticipantID,
      isSave: false,
    });
  }

  /* 发送开始上课结束上课信令 */
  sendSignallingToClassBegin(isDelMsg: boolean, isSave: boolean) {
    const sendSignalData = {
      isDelMsg,
      isSave,
      name: 'ClassBegin',
      signalId: 'ClassBegin',
      data: {
        recordchat: true,
      },
    };
    sendSignalling(sendSignalData);
  }

  /* 清除所有信令消息 */
  sendSignallingToDelAll() {
    const sendSignalData = {
      name: '__AllAll',
      signalId: '__AllAll',
      isDelMsg: true,
      toId: '__none',
    };
    sendSignalling(sendSignalData);
  }

  /* 禁言信令 */
  sendSignallingToAllNoChatSpeaking(isDelMsg: boolean, data: any) {
    const sendSignalData = {
      name: 'LiveAllNoChatSpeaking',
      signalId: 'LiveAllNoChatSpeaking',
      data,
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  /* 全体静音 */
  sendSignallingToAllNoAudio(isDelMsg: boolean) {
    const sendSignalData = {
      name: 'LiveAllNoAudio',
      signalId: 'LiveAllNoAudio',
      toId: '__all',
      isSave: true,
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  /* 发送文档上传或者删除相关的信令DocumentChange
   *@method  sendSignallingFromDocumentChange */
  sendSignallingFromDocumentChange(data: any, isDelMsg:boolean = false, toID: string) {
    // if (!CoreController.handler.getAppPermissions('sendSignallingFromDocumentChange')) {
    //   return;
    // }
    const name = 'DocumentChange';
    const id = name;
    const sendSignalData = {
      name,
      signalId: id,
      data,
      isDelMsg,
      toId: toID || '__all',
      isSave: true,
    };
    sendSignalling(sendSignalData);
  }

  /* 发送远程控制信令 */
  sendSignallingFromRemoteControl(toId: string) {
    const sendSignalData = {
      name: 'RemoteControl',
      toId,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }
  
  // 远程刷新课件
  sendSignallingFromRemoteControlCourseware(toId: string, data: any) {
    const sendSignalData = {
      name: 'RemoteControlCourseware',
      toId,
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }
  /* 远程设备管理 */
  sendSignallingRemoteControlDeviceManagement(toId: string, data: any) {
    const sendSignalData = {
      name: 'remoteControlDeviceManagement',
      toId,
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }

  /* 获取远程设备 */
  sendSignallingGetRemoteControlDevice(toId: string) {
    const sendSignalData = {
      name: 'getRemoteControlDevice',
      toId,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }

  /* 设置远程设备 */
  sendSignallingSetRemoteControlDevice(toId: string, data: any) {
    const sendSignalData = {
      name: 'setRemoteControlDevice',
      toId,
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }

  /* 优选网络 */
  // sendSignallingUserAreaSelection(toId: string, data: any) {
  //   const sendSignalData = {
  //     name: 'UserAreaSelection',
  //     toId,
  //     data,
  //     isSave: false,
  //   };
  //   sendSignalling(sendSignalData);
  // }

  /* 媒体线路 */
  sendSignallingMediaLine(toId: string, data: any) {
    const sendSignalData = {
      name: 'UserMediaLine',
      toId,
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }

  /* 课件服务器cdn */
  sendSignallingUseCndLine(toId: string, data: any) {
    const sendSignalData = {
      name: 'UseCndLine',
      toId,
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }

  /* 设置房间布局
   * data:｛roomLayout : 'aroundLayout'-默认布局/'videoLayout'-视频布局｝
   * */
  sendSignallingSetRoomLayout(data: any, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'SetRoomLayout',
      toId: '__allExceptSender',
      data,
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  /* 视频框拖拽的动作相关信令
   * data: {
   *   userId: id,// 用户id
   *   percentTop: dragEleTop, y轴百分比
   *   percentLeft: dragEleLeft, x轴百分比
   *   isDrag: true, // 是否拖拽了
   *   scale: 1, type:Number 视频拉伸的比例
   * }
   *  */
  sendVideoAttribute(data: any, userId: string, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'VideoAttribute',
      toId: '__allExceptSender',
      data,
      isDelMsg,
      signalId: `VideoAttribute_${userId}`,
      associatedUserID: userId,
    };
    sendSignalling(sendSignalData);
  }

  /* 视频框拖拽的动作相关信令attribute
   * data: {
   *   userId: id,// 用户id
   *   percentTop: dragEleTop, y轴百分比
   *   percentLeft: dragEleLeft, x轴百分比
   *   isDrag: true, // 是否拖拽了
   * }
   *  */
  sendSignallingVideoDrag(data: any, userId: string, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'VideoDrag',
      toId: '__allExceptSender',
      data,
      isDelMsg,
      signalId: `VideoDrag_${userId}`,
      associatedUserID: userId,
    };
    sendSignalling(sendSignalData);
  }

  /* 视频框拉伸的相关信令
   * data: {
   *   userId: id,// 用户id
   *   scale: 1, type:Number 视频拉伸的比例
   * }
   * */
  sendSignallingVideoChangeSize(data: any) {
    const sendSignalData = {
      name: 'VideoChangeSize',
      toId: '__allExceptSender',
      data,
      signalId: `VideoSize_${data.userId}`,
      associatedMsgID: `VideoDrag_${data.userId}`,
    };
    sendSignalling(sendSignalData);
  }

  /* 视频双击全屏
   * data: {
   *    doubleId:"2576d388-c517-20a6-c596-2b451802d0a4" // 双击视频的用户id
   * }
   * name: "doubleClickVideo" // 信令名
   * */
  sendSignallingDoubleClickVideo(data: any, userId: string, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'doubleClickVideo',
      toId: '__allExceptSender',
      data,
      associatedUserID: userId,
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  /* 通知老师获取音视频失败
   * data: {
   *    errorType:1-音视频都失败,2-音视频都失败,3-音视频都失败
   *    name,
   * }
   * */
  sendSignallingGetUserMediaError(data: any, toId: string) {
    const sendSignalData = {
      name: 'GetUserMediaError',
      toId,
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }

  /* 设置双师房间布局：老师拖拽视频布局相关信令
   *  data: { one2one: nested(嵌套，画中画) ｜ abreast(两个视频同级别并列) }
   * */
  sendSignallingSetone2oneVideoLayout(type: string, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'one2oneVideoSwitchLayout',
      toId: '__allExceptSender',
      data: { one2one: type },
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  // 计时器
  sendSignallingTimer(data: any, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'timer',
      data,
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  // 老师开始和关闭抢答页面
  sendSignallingShowContest(isSave: boolean, isDelMsg: boolean) {
    const sendSignalData = {
      name: 'ShowContest_v1',
      signalId: 'ShowContest',
      toId: '__all',
      data: {},
      isSave,
      isDelMsg,
    };
    sendSignalling(sendSignalData);
  }

  /* 老师发布抢答结果
   * data:{'aa-sdf-11':"nickname"}
   * */
  sendSignallingContestResult(data: any) {
    const sendSignalData = {
      name: 'ContestResult_v1',
      signalId: 'ContestResult',
      toId: '__all',
      data,
      isSave: false,
    };
    sendSignalling(sendSignalData);
  }
}

Object.assign(Signalling.prototype, LiveRoomSignalling);

export default new Signalling();
