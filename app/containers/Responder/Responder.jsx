import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Event, SessionRoom, ROOM_ROLE, PUBLISH_STATE } from '@global/roomConstants';
import Actions from '@global/actions';
import { YsGlobal } from '@global/handleGlobal';
import Signalling from '@global/services/SignallingService';
import UserService from '@global/services/UserService';
import FetchService from '@global/services/FetchService';
import Icon from '@components/Icon';
import './Responder.scss';
import variables from '@styles/variables.scss';

const { toolsBoxInner } = YsGlobal.languageInfo;
let interval = null;
let processInterval = null;
let _process = 0;
let timer = 3;
let stulist = [];
let position = [];
let getNumsInterval = null;
const Responder = props => {
  const { responserStatus, contestStudentList, isBigRoom } = props;

  useEffect(() => {
    if (isBigRoom && responserStatus) {
      FetchService.getRoomUsers(
        (users, total) => {
          setUsersNum(total);
        },
        0,
        300,
        [2],
      );
      getNumsInterval = setInterval(() => {
        FetchService.getRoomUsers(
          (users, total) => {
            setUsersNum(total);
          },
          0,
          300,
          [2],
        );
      }, 2000);
    } else if (responserStatus) {
      setUsersNum(Object.values(SessionRoom.getUsers()).filter(it => it.role === 2).length);
    }
    return () => {
      clearInterval(getNumsInterval);
    };
  }, [responserStatus]);

  const self = SessionRoom.getMyself();
  const [selected, setSelected] = useState(false); // 是否上台
  const [countdown, setCountdown] = useState(3); // 学会3秒倒计时
  const [nick, setNick] = useState('');
  const [process, setProcess] = useState(0);
  const [canclick, setCanclick] = useState(true);
  const [usersNum, setUsersNum] = useState(0);
  // console.error(usersNum);
  const handleDelMsg = delMsgData => {
    const { name } = delMsgData;
    if (name === 'ShowContest_v1') {
      Actions.changeResponserStatus('');
      timer = 3;
      stulist = [];
      _process = 0;
      setCountdown(timer);
      Actions.changeContestStudentList([]);
      if (processInterval) {
        clearInterval(processInterval);
        processInterval = null;
      }
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  };
  const handlePubMsg = pubMsgData => {
    const myself = SessionRoom.getMyself();
    switch (pubMsgData.name) {
      case 'ShowContest_v1': {
        if (myself.role === 0 || myself.role === 1 || myself.role === 4 || YsGlobal.playback) {
          timer = 3;
          stulist = [];
          _process = 0;
          setCountdown(timer);
          Actions.changeContestStudentList([]);
          Actions.changeResponserStatus('starting');
          processInterval = setInterval(() => {
            if (_process >= 90) {
              clearInterval(processInterval);
              processInterval = null;
              _process = 0;
            }
            if (processInterval) {
              _process += 10;
            }
            setProcess(_process);
          }, 1000);
          // 老师或者助教订阅和开始抢答排序
          Signalling.sendSignallingContest();
          Signalling.sendSignallingContestSubsort();
        }
        if (myself.role === ROOM_ROLE.STUDENT) {
          setCanclick(true);
          position.concat([Math.random() * 80 + 10, Math.random() * 80 + 10]);
          interval = setInterval(() => {
            timer -= 1;
            if (interval && timer <= 0) {
              clearInterval(interval);
              interval = null;
            }
            setCountdown(timer);
          }, 1000);
        }
        break;
      }
      case 'Contest_v1': {
        Actions.changeResponserStatus('starting');
        // 重置状态
        timer = 3;
        stulist = [];
        _process = 0;
        setCountdown(timer);
        Actions.changeContestStudentList([]);
        break;
      }
      case 'Server_Sort_Result': {
        // 订阅排序器结果
        if (pubMsgData.id !== 'Server_Contest') {
          break;
        }
        const { sortResult } = pubMsgData.extraData;
        if (sortResult && sortResult.length > 0) {
          stulist = sortResult;
          Actions.changeContestStudentList(stulist);
        }
        break;
      }

      case 'ContestResult_v1': {
        const { nickName } = pubMsgData.data;
        _process = 0;
        clearInterval(processInterval);
        processInterval = null;
        setProcess(_process);
        Actions.changeResponserStatus('publishResult');
        // 取消订阅器，删除订阅器
        Signalling.sendSignallingCancelContestSubsort();
        Signalling.sendSignallingDelContest();
        setNick(nickName || `${toolsBoxInner.noAnswer}`);
        break;
      }
      default:
        break;
    }
  };
  // 监听抢答信息
  useEffect(() => {
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    const countdownTimeMsg = YsGlobal.msgList.find(item => item.name === 'ShowContest_v1');
    Event.on('recv-del-msg', handleDelMsg, listernerBackupid);
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    if (countdownTimeMsg && (self.role === 0 || self.role === 1 || self.role === 4 || YsGlobal.playback)) {
      YsGlobal.msgList = YsGlobal.msgList.filter(item => item.name !== 'ShowContest_v1');
      Actions.changeResponserStatus('ready');
    }
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const myself = SessionRoom.getMyself();
    if (canclick && myself.role === ROOM_ROLE.STUDENT && responserStatus === 'starting') {
      switch (countdown) {
        case 3: {
          setProcess(25);
          break;
        }
        case 2: {
          setProcess(50);
          break;
        }
        case 1: {
          setProcess(75);
          break;
        }
        default: {
          setProcess(100);
          break;
        }
      }
    }
  }, [countdown]);
  // 关闭抢答器
  const closeResponser = () => {
    Signalling.sendSignallingShowContest(false, true);
    Actions.changeResponserStatus('');
  };
  // 抢到上台选项
  const answerSpeak = () => {
    setSelected(!selected);
  };
  // 学生抢答
  const contestSpeak = () => {
    if (Number(countdown) || !canclick) {
      return;
    }
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    const myself = SessionRoom.getMyself();
    const actions = {
      [myself.id]: myself.nickname,
    };
    setCanclick(false);
    position = [];
    Signalling.sendSignallingContestCommit(listernerBackupid, 0, actions, myself.id);
  };
  // 重新开始 老师本地回到ready状态
  const restartContest = () => {
    const myself = SessionRoom.getMyself();
    if (myself.role === 4) {
      return;
    }
    Actions.changeResponserStatus('ready');
  };

  // 老师发起抢答
  // eslint-disable-next-line no-unused-vars
  const startAnswer = e => {
    timer = 3;
    stulist = [];
    _process = 0;
    setCountdown(timer);
    Actions.changeContestStudentList([]);
    Actions.changeResponserStatus('starting');
    Signalling.sendSignallingShowContest(true, false);
    // Signalling.sendSignallingContest();
    setTimeout(() => {
      const winner = stulist[0] || {};
      const nickName = Object.values(winner).length && Object.values(winner)[0];
      const peerId = Object.keys(winner).length && Object.keys(winner)[0];
      Signalling.sendSignallingContestResult({ nickName: nickName || '' });
      let user = SessionRoom.getUser(peerId) || {};
      if (isBigRoom && peerId && selected) {
        FetchService.getRoomUsers(
          users => {
            user = users.filter(it => it.id === peerId);
            if (peerId && selected && user[0].publishstate === PUBLISH_STATE.NONE) {
              UserService.userPlatformUpOrDown(user[0]);
            }
          },
          0,
          300,
          [2],
        );
        // user = Object.values(SessionRoom.getUsers()).filter(it => it.id === peerId);
      } else if (peerId && selected && user.publishstate === PUBLISH_STATE.NONE) {
        UserService.userPlatformUpOrDown(user);
      }
    }, 10000);
  };
  // 学生抢答结果
  const publishResult = () => {
    const dom = () => {
      if (nick === `${toolsBoxInner.noAnswer}`) {
        return `${toolsBoxInner.noAnswer}`;
      }
      return (
        <React.Fragment>
          <span>{`${nick}`}</span>
          {`${toolsBoxInner.getChance}`}
        </React.Fragment>
      );
    };

    return <div className="content">{dom()}</div>;
  };
  // 老师抢答结果
  const teacherPublishResult = () => {
    return (
      <div className="content">
        <div className="bg"></div>
        <div className="contest_people">
          <span>{`${contestStudentList.length}`}/</span>
          <span>{usersNum}</span>
        </div>
        {nick === `${toolsBoxInner.noAnswer}` ? `${toolsBoxInner.noAnswer}` : nick}
        <button className="start" onClick={restartContest}>{`${toolsBoxInner.reStart}`}</button>
      </div>
    );
  };

  // 准备组件
  const readyContent = () => {
    return (
      <div className="content">
        <div className="title">{`${toolsBoxInner.contest}`}</div>
        <div className="bg"></div>
        <button className="start" onClick={startAnswer}>{`${toolsBoxInner.start}`}</button>
        <div className="upPlatform" onClick={answerSpeak}>
          <div className={`select ${selected ? 'up' : 'down'}`}></div>
          <span>{`${toolsBoxInner.answerSpeak}`}</span>
        </div>
      </div>
    );
  };
  // 点击开始后学生界面
  const startingContent = () => {
    const myself = SessionRoom.getMyself();
    if (myself.role === ROOM_ROLE.STUDENT) {
      return (
        <div className={`content student ${countdown ? 'waiting' : 'pointer'}`} onClick={contestSpeak}>
          {canclick ? countdown || `${toolsBoxInner.contestSpeak}` : `${toolsBoxInner.waiting}`}
        </div>
      );
    }
    return '';
  };
  // 点击开始后 老师界面(代码要提取)
  const teacherStartingContent = () => {
    return (
      <div className="content">
        <span className="contesting">{`${toolsBoxInner.InAnswering}`}</span>
        <div className="contest_people">
          <span>{`${contestStudentList.length}`}/</span>
          <span>{usersNum}</span>
        </div>
      </div>
    );
  };
  if (!responserStatus) {
    return '';
  }
  const myself = SessionRoom.getMyself();
  return (
    <div
      className="responser"
      style={{
        background: `conic-gradient(${variables.areaBgColor} ${process}%,#82ABEC ${process}% ,#82ABEC 100%)`,
        top: myself.role === ROOM_ROLE.STUDENT && countdown && responserStatus === 'starting' ? `${Math.random() * 80 + 10}%` : `${position[0]}%`,
        left: myself.role === ROOM_ROLE.STUDENT && countdown && responserStatus === 'starting' ? `${Math.random() * 80 + 10}%` : `${position[1]}%`,
      }}
    >
      {(responserStatus === 'ready' || responserStatus === 'publishResult') && (myself.role === 0 || myself.role === 1 || YsGlobal.playback) && (
        <Icon type="close" onClick={closeResponser} />
      )}
      {responserStatus === 'ready' && readyContent()}
      {responserStatus === 'starting' && startingContent()}
      {responserStatus === 'starting' && (myself.role === 0 || myself.role === 1 || myself.role === 4 || YsGlobal.playback) && teacherStartingContent()}
      {responserStatus === 'publishResult' && myself.role === ROOM_ROLE.STUDENT && publishResult()}
      {responserStatus === 'publishResult' && (myself.role === 0 || myself.role === 1 || myself.role === 4 || YsGlobal.playback) && teacherPublishResult()}
    </div>
  );
};
const mapStateToProps = state => {
  const { Modules, classroom } = state;
  return {
    isBigRoom: classroom.isBigRoom,
    responserStatus: Modules.responserStatus,
    contestStudentList: Modules.contestStudentList,
  };
};
export default connect(mapStateToProps)(Responder);
