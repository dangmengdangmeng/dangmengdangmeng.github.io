import React from 'react';
import Icon from '@components/Icon';
import '../CountDown.scss';

export default class Content extends React.Component {
  handleDecrease(type) {
    const { countDownData } = this.props;
    let { totalTime } = countDownData;
    if (type === 'minute') {
      totalTime = Math.min(totalTime + 60, 99 * 60);
    } else if (type === 'seconds') {
      totalTime += 1;
      totalTime = Math.min(totalTime, 99 * 60);
    }
    this.props.setModuleData({ totalTime, defaultTime: totalTime });
  }

  handleIncrease(type) {
    const { countDownData } = this.props;
    let { totalTime } = countDownData;
    if (type === 'minute') {
      totalTime = Math.max(totalTime - 60, 0);
    } else if (type === 'seconds') {
      totalTime -= 1;
      totalTime = Math.max(totalTime, 0);
    }
    this.props.setModuleData({ totalTime, defaultTime: totalTime });
  }

  render() {
    const { countDownData, countdownState } = this.props;
    const { totalTime } = countDownData;
    const minutes = parseInt(totalTime / 60, 10);
    const seconds = totalTime % 60;
    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    const secondsText = seconds < 10 ? `0${seconds}` : seconds;
    return (
      <div className={`content ${countdownState === 'timerend' ? 'timer-end' : ''}`}>
        {countdownState === 'timerend' && (
          <>
            {' '}
            <Icon type="clock" /> <p className="enttext">计时结束</p>{' '}
          </>
        )}

        {countdownState !== 'timerend' && (
          <div className="minute">
            {countdownState === 'init' && <span className="increase" onClick={this.handleDecrease.bind(this, 'minute')} />}
            <span className="timerText">{minutesText}</span>
            {countdownState === 'init' && <span className="decrease" onClick={this.handleIncrease.bind(this, 'minute')} />}
          </div>
        )}

        {countdownState !== 'timerend' && <div className="dot">:</div>}

        {countdownState !== 'timerend' && (
          <div className="seconds">
            {countdownState === 'init' && <span className="increase" onClick={this.handleDecrease.bind(this, 'seconds')} />}
            <span className="timerText">{secondsText}</span>
            {countdownState === 'init' && <span className="decrease" onClick={this.handleIncrease.bind(this, 'seconds')} />}
          </div>
        )}
      </div>
    );
  }
}
