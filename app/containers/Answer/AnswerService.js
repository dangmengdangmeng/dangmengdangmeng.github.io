import store from '@app/store';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import FetchService from '@global/services/FetchService';
import { SessionRoom, Event } from '@global/roomConstants';
import { getTimeDiffToFormat } from '@utils';
// import utils from '../utils';

export default class AnswerService {
  getResultTimer = null; // 获取结果计时器

  getDetailTimer = null; // 获取答题详情计时器

  durationTimer = null; // 开始时间计时器

  isDetailPanel = false; // 当前展示是否为详情面板

  isPublicResult = false;

  currPage = 1; // 当前页

  isClose = false; // 是否关闭

  constructor() {
    Event.on('recv-pub-msg', this.pubmsgHandler.bind(this));
    Event.on('recv-del-msg', this.delmsgHandler.bind(this));
    Event.on('signal-connected', () => {
      this.user = SessionRoom.getMyself();
      if (this.user.role === 1) Actions.setModuleStatus('answer', 'disable');
    });
  }

  getHandler(name) {
    const handlers = {
      Answer: ({ data, id, ts, fromID }) => {
        const { options, status } = data;
        Actions.setModuleData('answer', {
          answerId: id,
          fromID,
        });
        if (status === 'occupyed' && fromID !== SessionRoom.getMyself().id) {
          Actions.setModuleStatus('answer', 'disable');
          return;
        }
        if (status === 'occupyed' && fromID === SessionRoom.getMyself().id) {
          Actions.setModuleStatus('answer', 'creating');
          return;
        }
        Actions.setModuleData('answer', {
          ...data,
          answerId: id,
          selecteds: options.map(opt => ({ [opt.content]: 0 })).reduce((prev, curr) => ({ ...(prev || {}), ...curr })),
          duration: '00:00:00',
          startTime: ts,
          fromID,
        });
        if (![0, 1].includes(this.user.role)) {
          let commitedAnswer = {};
          try {
            commitedAnswer = JSON.parse(window.localStorage.getItem('commitedAnswer')) || {};
          } catch {
            commitedAnswer = {};
          }
          if (commitedAnswer.answerId === id) {
            Actions.setModuleData('answer', {
              commitedAnswer,
              fromID,
            });
          }
          Actions.setModuleStatus('answer', 'answerSelecting');
          return;
        }
        this.getResultTimer = setInterval(() => {
          this.updateAnswerData();
        }, 5000);
        this.durationTimer = setInterval(() => {
          const { hh = '00', mm = '00', ss = '00' } = getTimeDiffToFormat(Date.parse(new Date()) / 1000 - ts);
          Actions.setModuleData('answer', {
            duration: `${hh}:${mm}:${ss}`,
          });
        }, 1000);
        Actions.setModuleStatus('answer', 'answer');
      },
      AnswerGetResult: async ({ extraData, ts: endTime }) => {
        const { values, answerCount: totalUsers = 0 } = extraData;
        const { answerId, duration, options } = store.getState().Modules.answer.answerData;
        Actions.setModuleData('answer', {
          selecteds: { ...options.map(opt => ({ [opt.content]: 0 })).reduce((prev, curr) => ({ ...(prev || {}), ...curr })), ...values },
          totalUsers,
        });
        // 在这里请求详情接口，带startTime和当前信令endTime
        if (this.isDetailPanel) {
          this.getAnswerDetail(endTime);
        }
        if (this.isPublicResult) {
          this.currPage = -1;
          await this.getAnswerDetail(endTime);
          const { detailData, selecteds, detailPageInfo } = store.getState().Modules.answer.answerData;
          Signalling.sendAnswerPublic({ answerId, selecteds, duration, detailData, detailPageInfo, totalUsers, isPublicResult: this.isPublicResult }, answerId);
          // this.isPublicResult = false;
        }
      },
      AnswerPublicResult: ({ data, fromID }) => {
        if ([0, 1].includes(this.user.role)) {
          if (this.user.id !== fromID) {
            Actions.setModuleStatus('answer', 'stoped');
          }
          return;
        }
        const { answerId, selecteds, isPublicResult, detailData, detailPageInfo, totalUsers, duration } = data;
        let myAnswers = [];
        detailData.forEach(detail => {
          if (detail.userId === this.user.id) {
            myAnswers = detail.selectOpts;
          }
        });
        Actions.setModuleData('answer', {
          myAnswers,
          totalUsers,
          duration,
          answerId,
          selecteds,
          isPublicResult,
          detailData,
          detailPageInfo: { ...detailPageInfo, current: 1 },
        });
        Actions.setModuleStatus('answer', 'stoped');
        if (YsGlobal.playback && store.getState().Modules.Answer.answerState === 'stoped') setTimeout(() => Actions.setModuleStatus('answer', ''), 10000);
        // setStorage('commitedAnswer', '');
      },
    };
    return handlers[name] || (() => {});
  }

  pubmsgHandler(pubMsgData) {
    this.getHandler(pubMsgData.name)(pubMsgData);
  }

  delmsgHandler(delMsgData) {
    if (delMsgData.name === 'Answer') {
      this.updateAnswerData();
      clearInterval(this.getResultTimer);
      clearInterval(this.durationTimer);
      if (this.isPublicResult && this.user.id === delMsgData.fromID) return;
      if (!this.isClose && this.user.id === delMsgData.fromID) Actions.setModuleStatus('answer', 'stoped');
      else Actions.setModuleStatus('answer', '');
      if (![0, 1].includes(this.user.role)) Actions.setModuleData('answer', { options: store.getState().Modules.answer.answerData.options });
      window.localStorage.setItem('commitedAnswer', '');
      // this.close();
    }
    if (delMsgData.name === 'AnswerPublicResult' && this.user.role !== 0) {
      this.close();
    }
  }

  updateAnswerData() {
    if ([0, 1].includes(this.user.role)) Signalling.sendAnswerResult(store.getState().Modules.answer.answerData.answerId, this.user.id);
  }

  pubAnswer(data) {
    const { serial } = store.getState().classroom.roomInfo;
    const { answerId } = store.getState().Modules.answer.answerData;
    Signalling.sendAnswerCreated(false, { ...data, answerId }, serial);
  }

  stopAnswer(isPublicResult) {
    this.isPublicResult = isPublicResult;
    this.isClose = false;
    this.updateAnswerData();
    if (!this.isPublicResult) Signalling.sendAnswerCreated(true, { answerId: store.getState().Modules.answer.answerData.answerId });
    clearInterval(this.getResultTimer);
    clearInterval(this.getDetailTimer);
    clearInterval(this.durationTimer);
    Actions.setModuleStatus('answer', 'stoped');
    Signalling.sendAnswerCreated(true, { answerId: store.getState().Modules.answer.answerData.answerId });
  }

  async startGetDetail(page) {
    this.isDetailPanel = true;
    this.currPage = page;
    if (![0, 1].includes(this.user.role)) return;
    // 点击详情按钮时发一次请求
    await this.getAnswerDetail(
      Date.parse(new Date())
        .toString()
        .substr(0, 10),
    );
  }

  stopGetDetail() {
    this.isDetailPanel = false;
  }

  async getAnswerDetail(endTime) {
    const { answerId, startTime } = store.getState().Modules.answer.answerData;
    const reqData = {
      id: answerId,
      starttime: startTime,
      endtime: endTime,
    };
    if (this.currPage !== -1) {
      // reqData.page = this.currPage ? this.currPage - 1 : 0;
      // reqData.pageNum = 6;
    }
    const res = await FetchService.getAnswerDetail(reqData);
    const { data = [], page, count = 1 } = res || {};
    const detailData = data.map(({ userid: userId, ts, data: itemData }) => {
      let { selectOpts, studentname } = {};
      try {
        // eslint-disable-next-line no-param-reassign
        itemData = JSON.parse(itemData);
        // eslint-disable-next-line prefer-destructuring
        selectOpts = itemData.selectOpts;
        studentname = itemData.nickname;
      } catch {
        selectOpts = itemData;
        studentname = (SessionRoom.getUser(userId) || {}).nickname;
      }
      const time = getTimeDiffToFormat(ts - startTime);
      return {
        selectOpts,
        userId,
        timestr: `${time.mm}:${time.ss}`,
        studentname,
      };
    });
    Actions.setModuleData('answer', {
      detailData,
      detailPageInfo: {
        current: page,
        total: Math.ceil(count / 6),
      },
    });
  }

  reStart() {
    const { serial } = store.getState().classroom.roomInfo;
    if (this.isPublicResult) Signalling.sendAnswerCreated(true, { answerId: store.getState().Modules.answer.answerData.answerId });
    this.isPublicResult = false;
    Signalling.sendAnswerPublic({}, store.getState().Modules.answer.answerData.answerId, true);
    Signalling.sendAnswerCreated(false, { status: 'occupyed' }, serial);
    // Signalling.sendAnswerCreated(false, {}, serial);
    // Actions.setModuleStatus('answer', 'creating');
  }

  studentCommit(data, options, isUpdate = false) {
    const { answerId } = store.getState().Modules.answer.answerData;
    Signalling.sendAnswerCommit(data, options, answerId, isUpdate);
    const commitedAnswer = window.localStorage.getItem('commitedAnswer');
    const { selectOpts } = data;
    const selectOptsArr = selectOpts.split(',');
    const saveOptions = { ...options };
    Object.keys(saveOptions).forEach(item => {
      saveOptions[item] = selectOptsArr.find(option => option === item) ? 1 : 0;
    });
    if (commitedAnswer && commitedAnswer.answerId === answerId) {
      window.localStorage.setItem('commitedAnswer', JSON.stringify({ options: { ...commitedAnswer.options, ...saveOptions }, answerId }));
    } else {
      window.localStorage.setItem('commitedAnswer', JSON.stringify({ options: saveOptions, answerId }));
    }
    // this.close();
  }

  close() {
    const myself = this.user;
    if ([0, 1].includes(myself.role)) {
      const { answerId } = store.getState().Modules.answer.answerData;
      Signalling.sendAnswerPublic({}, answerId, true);
    }
    // this.updateAnswerData();
    clearInterval(this.getResultTimer);
    Actions.setModuleStatus('answer', '');
    this.isClose = true;
    Signalling.sendAnswerCreated(true, { answerId: store.getState().Modules.answer.answerData.answerId });
    this.isPublicResult = false;
  }
}
