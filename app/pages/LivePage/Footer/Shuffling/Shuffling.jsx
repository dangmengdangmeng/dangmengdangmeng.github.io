import React, { useState, useEffect } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { Event, SessionRoom, PUBLISH_STATE } from '@global/roomConstants';
import { connect } from 'react-redux';
import { FormItem, Input } from '@components/Form';
import Button from '@components/Button';
import Signalling from '@global/services/SignallingService';
import { setUserProperty } from '@utils/sign';
import Icon from '@components/Icon';

const { userListInner } = YsGlobal.languageInfo;

let shufflingTimer = null;
let onPlatformUsers = []; // 在台上的额人
let notOnPlatform = []; // 不在台上的人
let dragIds = 0; // 在课件区的人
let publishstate = PUBLISH_STATE.BOTH; // 用户状态

const Shuffling = props => {
  const { isClassBegin, studentCount, videoDragInfo, isAllNoAudio, isVideoLayout, isNested } = props;
  const [status, updateStatus] = useState('start');
  // const [shuffling, updateShuffling] = useState(false);
  const [modalshow, updateModalshow] = useState(false);
  const [isSelf, updateIsSelf] = useState(false);
  const [shufflingTime, shufflingTimeChange] = useState(20);
  const [fromID, updateFromID] = useState('');
  const { maxVideo } = JSON.parse(props.roomInfo);

  useEffect(() => {
    return () => {
      stopShuffling();
    };
  }, []);

  useEffect(() => {
    const handlePubMsg = pubMsgData => {
      const { name, fromID: pubMsgFromID } = pubMsgData;
      if (name === 'VideoPolling') {
        updateStatus('stop');
        updateFromID(pubMsgFromID);
      }
      if (name === 'RemoteControl' && isSelf) {
        stopShuffling();
      }
    };
    const handleDelMsg = pubMsgData => {
      const { name } = pubMsgData;
      if (name === 'VideoPolling') {
        if (shufflingTimer) clearInterval(shufflingTimer);
        updateStatus('start');
      }
    };
    const userLeave = res => {
      const { id } = res;
      if (id === fromID) {
        updateStatus('start');
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    Event.on('recv-del-msg', handleDelMsg, listernerBackupid);
    Event.on('user-leave', userLeave, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, [isSelf, fromID]);

  useEffect(() => {
    publishstate = isAllNoAudio ? PUBLISH_STATE.VIDEOONLY : PUBLISH_STATE.BOTH;
  }, [isAllNoAudio]);

  useEffect(() => {
    const assistantCount = Object.values(SessionRoom.getUsers()).filter(user => user.role === 1 && !!user.publishstate);
    if (studentCount < maxVideo - 1 - assistantCount) {
      clearInterval(shufflingTimer || 0);
      updateStatus('disable');
      return;
    }
    if (status === 'disable') updateStatus('start');
    // 更新台上台下人员列表
    const studentObj = SessionRoom.getUsers();
    const students = Object.values(studentObj).filter(user => user.role === 2);
    dragIds = Object.keys(JSON.parse(videoDragInfo));
    onPlatformUsers = onPlatformUsers.filter(id => !!(studentObj[id] || {}).publishstate);
    onPlatformUsers = [
      ...onPlatformUsers,
      ...students.filter(user => !!(studentObj[user.id] || {}).publishstate && !onPlatformUsers.includes(user.id)).map(user => user.id),
    ];
    onPlatformUsers = onPlatformUsers.filter(id => !dragIds.includes(id));
    notOnPlatform = notOnPlatform.filter(id => (studentObj[id] || {}).publishstate === 0);
    notOnPlatform = [...notOnPlatform, ...students.filter(user => user.publishstate === 0 && !notOnPlatform.includes(user.id)).map(user => user.id)];
    if (notOnPlatform.length < 1) stopShuffling();
  }, [status, studentCount, videoDragInfo]);

  useEffect(() => {
    if (status === 'stop' && isSelf) upPlatform();
  }, [status]);
  /**
   * 轮询状态修改
   */
  const shufflingChange = () => {
    if (status === 'disable') return;
    // eslint-disable-next-line consistent-return
    if (status === 'stop') return stopShuffling();
    updateModalshow(true);
  };
  /**
   * 开始轮询学生上台
   */
  const startShuffling = () => {
    if (shufflingTime < 10 || shufflingTime > 99) {
      // eslint-disable-next-line no-alert
      alert('轮循时间必须在10-99范围');
      let realTime = shufflingTime;
      if (realTime > 99) realTime = 99;
      if (realTime < 10) realTime = 10;
      shufflingTimeChange(realTime);
      return;
    }
    updateIsSelf(true);
    updateModalshow(false);
    updateStatus('stop');
    Signalling.sendPolling({}, SessionRoom.getMyself().id);
    // 更新台上台下人员列表
    const studentObj = SessionRoom.getUsers();
    const students = Object.values(studentObj).filter(user => user.role === 2);
    dragIds = Object.keys(JSON.parse(videoDragInfo));
    onPlatformUsers = onPlatformUsers.filter(id => !!(studentObj[id] || {}).publishstate);
    onPlatformUsers = [
      ...onPlatformUsers,
      ...students.filter(user => !!(studentObj[user.id] || {}).publishstate && !onPlatformUsers.includes(user.id)).map(user => user.id),
    ];
    onPlatformUsers = onPlatformUsers.filter(id => !dragIds.includes(id));
    notOnPlatform = notOnPlatform.filter(id => (studentObj[id] || {}).publishstate === 0);
    notOnPlatform = [...notOnPlatform, ...students.filter(user => user.publishstate === 0 && !notOnPlatform.includes(user.id)).map(user => user.id)];
    shufflingTimer = setInterval(() => {
      upPlatform();
    }, shufflingTime * 1000);
  };
  /**
   * 轮询用户上台操作
   */
  const upPlatform = () => {
    let assistantCount = Object.values(SessionRoom.getUsers()).filter(user => user.role === 1 && !!user.publishstate);
    let onPlatformCount = onPlatformUsers.length + dragIds.length;
    if ((props.studentCount <= maxVideo - 1 - assistantCount && onPlatformCount === props.studentCount) || notOnPlatform.length < 1) {
      stopShuffling();
      return;
    }
    const upId = notOnPlatform.shift();
    // 判断是否在台上的人数已经达到最大可上台人数
    if (onPlatformCount >= maxVideo - 1 - assistantCount) {
      const downId = onPlatformUsers.shift();
      setUserProperty(downId, { publishstate: PUBLISH_STATE.NONE });
      notOnPlatform.push(downId);
    }
    setTimeout(() => {
      setUserProperty(upId, { publishstate });
      onPlatformUsers.push(upId);
      onPlatformCount = onPlatformUsers.length + dragIds.length;
      assistantCount = Object.values(SessionRoom.getUsers()).filter(user => user.role === 1 && !!user.publishstate);
      if ((props.studentCount <= maxVideo - 1 - assistantCount && onPlatformCount === props.studentCount) || notOnPlatform.length < 1) {
        stopShuffling();
      }
    }, 200);
  };
  // 停止轮循
  const stopShuffling = () => {
    Signalling.sendPolling({}, SessionRoom.getMyself().id, true);
    updateIsSelf(false);
  };
  const timeChange = time => {
    let realTime = time;
    if (realTime > 99) realTime = 99;
    if (realTime < 10) realTime = 10;
    shufflingTimeChange(realTime);
  };
  useEffect(() => {
    if (!isVideoLayout) return;
    const footer = document.querySelector('.footer');
    if (modalshow) {
      footer.style.zIndex = 231;
    } else {
      footer.style.zIndex = 228;
    }
  }, [modalshow]);
  return (
    <React.Fragment>
      {isClassBegin && [0, 1].includes(SessionRoom.getMyself().role) && (maxVideo !== 2 || !isVideoLayout) && (
        <div className={`shuffling-btn footer-icon ${status}`} onClick={shufflingChange} title={userListInner.shuffling}>
          <Icon title={userListInner.shuffling} type="shuffling" />
        </div>
      )}
      {modalshow && (
        <div className={`shuffling-modal ${isNested ? 'shuffling-nested' : ''}`}>
          <div className="shuffling-header">
            轮播
            <span className="shuffling-modal-close" onClick={() => updateModalshow(false)}>
              ×
            </span>
          </div>
          <div className="shuffling-container">
            <FormItem label={userListInner.shufflingTime} className="time-form-item">
              <span onClick={() => timeChange(shufflingTime - 1)}>-</span>
              <Input
                type="number"
                min={10}
                max={99}
                value={shufflingTime}
                onBlur={() => {
                  if (!shufflingTime) {
                    shufflingTimeChange(20);
                  }
                }}
                onChange={val => {
                  shufflingTimeChange(parseInt(val, 10));
                }}
              />
              <span onClick={() => timeChange(shufflingTime + 1)}>+</span>
            </FormItem>
            <span className="shuffling-unit">秒/次</span>
          </div>
          <Button className="confirm-btn" onClick={startShuffling}>
            {userListInner.shufflingConfirm}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ classroom, video }) => {
  return {
    studentCount: classroom.studentCount,
    videoDragInfo: JSON.stringify(video.videoDragInfo),
    isAllNoAudio: classroom.isAllNoAudio,
    roomStatus: classroom.roomStatus,
    isClassBegin: classroom.isClassBegin,
    isVideoLayout: classroom.isVideoLayout,
    isNested: classroom.isNested,
    roomInfo: JSON.stringify(classroom.roomInfo),
  };
};

export default connect(mapStateToProps)(Shuffling);
