import React from 'react';
import { SessionRoom } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import Icon from '@components/Icon';
import Content from './Content';
const { toolsBoxInner } = YsGlobal.languageInfo;

export default class Start extends React.Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { countdownState, setModuleData, countDownData, handler } = this.props;
    const mySelfInfo = SessionRoom.getMyself() || {};
    return (
      <div className="startModule">
        {![2, 4].includes(mySelfInfo.role) && (
          <header className="title countdown-title">
            {toolsBoxInner.countDown}
            <span onClick={handler.exit} className="countdown-close">
              ×
            </span>
          </header>
        )}
        <Content setModuleData={setModuleData} countDownData={countDownData} countdownState={countdownState} />
        {countdownState === 'init' ? (
          <div className="start" onClick={handler.play}>
            {toolsBoxInner.startTimer}
          </div>
        ) : (
          ![2, 4].includes(mySelfInfo.role) && (
            <ul className="button-list">
              <li className="btn-item" onClick={handler.reset}>
                <Icon type="restart" />
              </li>
              {countdownState === 'timing' && (
                <li className="btn-item" onClick={handler.pause}>
                  <Icon type="time_pause" />
                </li>
              )}
              {countdownState === 'pause' && (
                <li className="btn-item" onClick={handler.nopause}>
                  <Icon type="triangle" />
                </li>
              )}
            </ul>
          )
        )}
      </div>
    );
  }
}
