/**
 * 右侧头部-时钟计时
 * @author chenxx
 */
import React from 'react';
import { Event, SessionRoom, Logger } from '@global/roomConstants';
import { connect } from 'react-redux';
import Signalling from '@global/services/SignallingService';
import { YsGlobal } from '@global/handleGlobal';
import { getTimeDiffToFormat } from '@utils';

class ClockTime extends React.Component {
  state = {
    clock: {
      hh: '00',
      mm: '00',
      ss: '00',
    },
  };

  init = true;

  componentDidMount() {
    // 在完成首次渲染之前调用，此时仍可以修改组件的state
    this.listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    this.stopTime();
    Event.on('recv-pub-msg', this.handlePubMsg.bind(this), this.listernerBackupid);
    Event.on('recv-del-msg', this.handleDelMsg.bind(this), this.listernerBackupid);
  }

  componentWillUnmount() {
    this.stopTime();
    this.setState = () => false;
    Event.offAllByMarkId(this.listernerBackupid);
  }

  // 接收到发布信令时的处理方法
  handlePubMsg(pubMsgData) {
    switch (pubMsgData.name) {
      case 'ClassBegin': {
        Logger.info(`timeDidMount:${this.props.classBeginTime} ${this.init}`);
        if (this.props.classBeginTime && this.init) {
          this.init = false;
          this.startTime(this.props.classBeginTime);
        }
      }
    }
  }

  handleDelMsg(delMsgData) {
    if (delMsgData.name === 'ClassBegin') {
      this.stopTime();
      this.resetClockTime();
    }
  }

  startTime(classBeginTime) {
    this.intervalNumber = 0;
    clearInterval(this.timer);
    this.timer = null;
    this.timer = setInterval(() => {
      YsGlobal.curServiceTime = YsGlobal.curServiceTime || classBeginTime;
      YsGlobal.curServiceTime += 1;

      const clock = getTimeDiffToFormat(YsGlobal.curServiceTime - classBeginTime);
      if (clock) {
        this.setState({ clock });
      }
      if (this.intervalNumber === 0) {
        Logger.info(`getTimeDifference：${classBeginTime} ${YsGlobal.curServiceTime}`, 'clock:', clock);
      }
      this.intervalNumber += 1;
      if (this.intervalNumber > 300) {
        Signalling.sendSignallingFromUpdateTime(SessionRoom.getMyself().id);
        this.intervalNumber = 0;
      }
    }, 1000);
  }

  stopTime() {
    clearInterval(this.timer);
    this.timer = null;
    this.intervalNumber = 0;
  }

  /* 重置时间 */
  resetClockTime() {
    this.setState({
      clock: {
        hh: '00',
        mm: '00',
        ss: '00',
      },
    });
  }

  render() {
    return (
      <div className="h-time-wrap" id="time_container">
        {this.state.clock.hh}
        <span className="space user-select-none ">:</span>
        {this.state.clock.mm}
        <span className="space user-select-none ">:</span>
        {this.state.clock.ss}
      </div>
    );
  }
}

function mapStateToProps({ classroom }) {
  return {
    classBeginTime: classroom.classBeginTime,
  };
}

export default connect(mapStateToProps)(ClockTime);
