import React from 'react';
import { connect } from 'react-redux';
import Actions from '@global/actions';
import { Event, SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import YSDrag from '@containers/YSDrag/YSDrag'; // 拖拽
import Start from './component/start';
import { sendSignalling } from './service';
import './CountDown.scss';
const endMusic = require('./images/ending.mp3');

class CountDown extends React.Component {
  timer = null;

  updateTimer = null;

  startServerTime = 0;

  curStartTime = 0;

  listernerBackupid = `${new Date().getTime()}_${Math.random()}`;

  componentDidMount() {
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    Event.on('recv-del-msg', this.handleDelMsg.bind(this), this.listernerBackupid);
  }

  componentWillUnmount() {
    Event.offAllByMarkId(this.listernerBackupid);
  }

  handlePubMsg = pubMsgData => {
    const { ts, name } = pubMsgData;
    switch (name) {
      case 'timer': {
        this.handleTimer(pubMsgData);
        break;
      }
      case 'UpdateTime': {
        if (YsGlobal.playback) return;
        const { countdownState } = this.props;
        if (countdownState === 'timing') {
          const curStartTime = this.curStartTime - (ts - this.startServerTime);
          this.props.setModuleData({ totalTime: curStartTime });
        }
        break;
      }
      default:
        break;
    }
  };

  handleDelMsg = delMsgData => {
    switch (delMsgData.name) {
      case 'timer':
        this.clearTimer();
        this.props.setModuleStatus('');
        this.props.setModuleData({
          sendTimeUserId: '',
          totalTime: 300,
          defaultTime: 300,
        });
        break;
      default:
        break;
    }
  };

  handleTimer(pubMsgData) {
    const { fromID, data, ts, isNowMsg } = pubMsgData;
    let { time } = data;
    const { isStatus, isRestart, isShow, defaultTime } = data;
    let timeData = {};
    this.startServerTime = ts;
    this.curStartTime = time;
    if (isShow) {
      if (isStatus) {
        // 开始计时    重置以后直接开始计时
        this.props.setModuleStatus('timing');
        if (!isNowMsg) {
          if (YsGlobal.connectServerTime - this.startServerTime < time) {
            time -= YsGlobal.connectServerTime - ts;
          } else {
            this.clearTimer();
            this.props.setModuleStatus('timerend');
            return;
          }
        }
        this.startTimer();
        this.startSendUpdateTimer();
      } else if (!isStatus && !isRestart) {
        // 暂停或者暂停时重新开始
        this.props.setModuleStatus('pause');
        this.clearTimer();
      }
      timeData.totalTime = time;
    } else {
      // 老师展示
      this.props.setModuleStatus('init');
      timeData = {
        sendTimeUserId: fromID,
        totalTime: time,
      };
    }
    timeData.defaultTime = defaultTime;
    this.props.setModuleData(timeData);
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { countDownData } = this.props;
      let { totalTime } = countDownData;
      const { defaultTime } = countDownData;
      totalTime -= 1;
      this.props.setModuleData({ totalTime, defaultTime });
      if (totalTime <= 0) {
        this.clearTimer();
        this.props.setModuleStatus('timerend');
        // 添加音效
        const endTimeAudio = document.getElementById('endTimeAudio');
        endTimeAudio.play();
      }
    }, 1000);
  }

  startSendUpdateTimer() {
    // 与服务器校准时间用
    const mySelf = SessionRoom.getMyself() || {};
    clearInterval(this.updateTimer);
    this.updateTimer = setInterval(() => {
      Signalling.sendSignallingFromUpdateTime(mySelf.id);
    }, 10000);
  }

  clearTimer() {
    clearInterval(this.updateTimer);
    this.updateTimer = null;
    clearInterval(this.timer);
    this.timer = null;
  }

  exit = () => {
    this.clearTimer();
    this.props.setModuleData({ totalTime: 300, defaultTime: 300 });
    this.props.setModuleStatus('');
    sendSignalling.exit();
  };

  play = () => {
    const { countDownData } = this.props;
    const { totalTime, defaultTime } = countDownData;
    if (totalTime) {
      sendSignalling.play(totalTime, defaultTime);
      this.props.setModuleStatus('timing');
    }
  };

  reset = () => {
    const { countdownState } = this.props;
    const { totalTime, defaultTime } = this.props.countDownData;
    if (countdownState === 'timerend') {
      this.props.setModuleStatus('init');
      this.props.setModuleData({
        totalTime: 300,
        defaultTime: 300,
      });
      // sendSignalling.start(defaultTime);
    } else {
      const lastState = countdownState === 'timing';

      this.clearTimer();
      this.props.setModuleData({
        totalTime,
        defaultTime,
      });
      sendSignalling.reset(defaultTime, defaultTime, lastState);
    }
  };

  pause = () => {
    this.clearTimer();
    const { totalTime, defaultTime } = this.props.countDownData;
    sendSignalling.pause(totalTime, defaultTime);
  };

  nopause = () => {
    this.startTimer();
    const { totalTime, defaultTime } = this.props.countDownData;
    sendSignalling.nopause(totalTime, defaultTime);
  };

  render() {
    const { countdownState, countDownData = {}, dragHandlers } = this.props;
    const handler = {
      play: this.play,
      reset: this.reset,
      pause: this.pause,
      nopause: this.nopause,
      stop: this.stop,
      exit: this.exit,
    };
    const mySelf = SessionRoom.getMyself() || {};
    const isHide = (countdownState === 'init' && mySelf.role !== 0 && mySelf.role !== 1) || !countdownState;
    return (
      <>
        {!isHide && (
          <YSDrag bounds=".modules" handle=".startModule" dragHandlers={dragHandlers}>
            <Start setModuleData={this.props.setModuleData} handler={handler} countdownState={countdownState} countDownData={countDownData} />
          </YSDrag>
        )}
        <audio id="endTimeAudio" style={{ display: 'none' }} src={endMusic} />
      </>
    );
  }
}

const mapStateToProps = ({ Modules }) => ({
  countdownState: Modules.countDown.countDownState,
  countDownData: Modules.countDown.countDownData,
});

const mapDispatchToProps = () => ({
  setModuleStatus: status => {
    Actions.setModuleStatus('countdown', status);
  },
  setModuleData: data => {
    Actions.setModuleData('countdown', data);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
