import store from '@app/store';
import Actions from '@global/actions';
import { SessionRoom, Event } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import FetchService from '@global/services/FetchService';
import utils from '../utils';

const TimeStamp = [60000, 180000, 300000, 600000, 1800000];

export default class CallRollService {
  callRollTimer = null; // 当前点名计时器

  currentCRID = ''; // 当前点名ID

  constructor() {
    Event.on('recv-pub-msg', this.pubmsgHandler.bind(this));
    Event.on('recv-del-msg', this.delmsgHandler.bind(this));
  }

  pubmsgHandler(pubMsgData) {
    const { name, data, fromID, ts, isNowMsg } = pubMsgData;

    const handlers = {
      LiveCallRoll: () => {
        const myself = SessionRoom.getMyself();
        const { status, callRollId, stateType, time } = data;
        const isOtherOccupyed = status === 'occupyed' && fromID !== myself.id;
        if (isOtherOccupyed && !callRollId) {
          Actions.setModuleStatus('callRoll', 'disable');
          return;
        }
        this.currentCRID = callRollId;
        if (isNowMsg) {
          this.liveCallRollHandler(data, TimeStamp[Number(stateType)], isOtherOccupyed);
        } else {
          const chaTime = TimeStamp[stateType] - (joinRoomTime - time) * 1000; // 剩余倒计时时间
          this.liveCallRollHandler(data, TimeStamp[Number(stateType)] - (YsGlobal.connectServerTime - ts) * 1000, isOtherOccupyed);
          if (![0, 1].includes(myself.role)) return;
          // 老师和助教逻辑
          const joinRoomTime = YsGlobal.connectServerTime; // 进入房间时间
          const { serial } = store.getState().classroom.roomInfo;
          this.currentCRID = this.currentCRID || utils.getUniqueId(serial); // 获取当前点名ID
          if ((joinRoomTime - time) * 1000 < TimeStamp[stateType]) {
            // 点名未结束
            setTimeout(() => {
              this.stopCallRoll();
            }, chaTime);
          }
        }
      },
      StudentSingin: () => {
        if (data.studentId === SessionRoom.getMyself().id) this.close();
      },
    };
    (handlers[name] || (() => {}))();
  }

  delmsgHandler(pubMsgData) {
    if (pubMsgData.name === 'LiveCallRoll') this.close();
  }

  liveCallRollHandler(data, timeRemaining, isOtherOccupyed) {
    const { nickname, role } = SessionRoom.getMyself();
    if ([0, 1].includes(role)) {
      // 老师和助教逻辑
      this.getPersonNumTimer = setInterval(() => {
        this.getOnlineNum();
      }, 5000);
      Actions.setModuleData('callRoll', {
        timeLenIndex: Number(data.stateType),
        callRollList: [
          ...(data.callRollList || []),
          {
            id: this.currentCRID,
            timerType: data.stateType,
            signInNum: 0,
            time: new Date(data.time * 1000).toLocaleTimeString(),
            nickname,
            status: 'PUB',
          },
        ],
      });
      if (isOtherOccupyed || data.callRollId) {
        Actions.setModuleStatus('callRoll', 'calling');
      } else {
        Actions.setModuleStatus('callRoll', 'call');
      }
      return;
    }
    Actions.setModuleData('callRoll', {
      timeLenIndex: Number(data.stateType),
      timeRemaining,
      currentCRID: this.currentCRID,
    });
    Actions.setModuleStatus('callRoll', 'signin');
  }

  startCallRoll() {
    const {
      Modules: {
        callRoll: {
          callRollData: { callRollList, timeLenIndex },
        },
      },
    } = store.getState();
    const user = SessionRoom.getMyself();
    if (!this.callRollTimer) {
      this.callRollTimer = setTimeout(() => {
        this.stopCallRoll();
      }, TimeStamp[timeLenIndex]);
    }
    const { serial } = store.getState().classroom.roomInfo;
    this.currentCRID = utils.getUniqueId(serial); // 获取当前点名ID
    this.cTime = utils.getTs(); // 当前时间

    const sendCallRolMsg = {
      time: this.cTime,
      stateType: timeLenIndex,
      callRollId: this.currentCRID, // 点名id
      callRollList,
      status: 'occupyed',
    };
    // 发布点名
    Signalling.sendSignallingFromLiveCallRoll(false, sendCallRolMsg, serial);
    // 添加当前点名到列表中
    this.addCallRollToList({
      id: this.currentCRID,
      timerType: timeLenIndex,
      signInNum: 0,
      time: new Date().toLocaleTimeString(),
      nickname: user.nickname,
      status: 'PUB',
    });
    // 定时获取当前签到认输
    this.getPersonNumTimer = setInterval(() => {
      this.getOnlineNum();
    }, 5000);
    Actions.setModuleStatus('callRoll', 'calling');
  }

  async stopCallRoll() {
    await this.getOnlineNum();
    const {
      Modules: {
        callRoll: {
          callRollData: { callRollList, timeLenIndex },
        },
      },
    } = store.getState();
    // 结束点名，改变状态为显示点名窗口
    const { serial } = store.getState().classroom.roomInfo;
    const ajaxData = {
      serial,
      callrollid: this.currentCRID,
      callrolltime: TimeStamp[timeLenIndex] / 1000,
      createtime: this.cTime,
      callrollnumber: this.signInNum,
    };
    await FetchService.rollcalladd(ajaxData);
    this.updateCallRollData();
    const signData = {
      time: this.cTime,
      stateType: timeLenIndex,
      callRollId: this.currentCRID, // 点名id
      callRollList: callRollList.map(item => ({ ...item, status: 'FINISH' })),
    };
    Signalling.sendSignallingFromLiveCallRoll(true, signData, serial);
    this.currentCRID = undefined;
    this.cTime = undefined;
    clearInterval(this.getPersonNumTimer);
    clearTimeout(this.callRollTimer);
    this.callRollTimer = null;
    this.signInNum = 0;
    Actions.setModuleStatus('callRoll', 'call');
    Actions.setModuleData('callRoll', { timeLenIndex: 0 });
  }

  /* 添加签到列表 */
  addCallRollToList(data) {
    Actions.setModuleData('callRoll', {
      callRollList: [...store.getState().Modules.callRoll.callRollData.callRollList, data],
    });
  }

  /* 更新签到列表 状态or人数 */
  updateCallRollData(data, key) {
    Actions.setModuleData('callRoll', {
      callRollList: store.getState().Modules.callRoll.callRollData.callRollList.map(item => {
        if (item.id !== this.currentCRID) return item;
        if (key === 'signInNum') return { ...item, signInNum: data.signInNum };
        return { ...item, status: 'FINISH' };
      }),
    });
  }

  /* 获取在线签到人数 */
  async getOnlineNum() {
    const { serial } = store.getState().classroom.roomInfo;
    const ajaxData = {
      serial,
      callrollid: this.currentCRID,
    };
    const res = await FetchService.getOnlineNum(ajaxData);
    this.signInNum = res.num;
    this.updateCallRollData({ signInNum: res.num }, 'signInNum');
  }

  close() {
    this.updateCallRollData();
    Actions.setModuleStatus('callRoll', '');
  }
}
