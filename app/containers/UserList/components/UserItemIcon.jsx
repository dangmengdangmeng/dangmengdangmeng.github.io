/**
 * @description   用户列表右侧图标列表
 */

import React, { useState, useEffect } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom, Event } from '@global/roomConstants';
import UserService from '@global/services/UserService';
import Actions from '@global/actions';
import Icon from '@components/Icon';
import store from '@app/store';

const UserItemIcon = props => {
  const { user, setShowTips, isClassBegin } = props;
  const myself = SessionRoom.getMyself() || {};
  const {
    userListInner,
    serviceText: { roomListner },
  } = YsGlobal.languageInfo;
  const [publishstate, setPublishstate] = useState([1, 1, 1, 1, 1, 1]); // 用一个数组来表示个人的状态，用0,1可以扩展多个状态
  useEffect(() => {
    /* 处理用户属性改变 */
    const userPropertiesUpdate = data => {
      const { properties, id } = data;
      if (user.id === id) {
        for (const [key, value] of Object.entries(properties)) {
          switch (key) {
            case 'disablechat':
              changeClass(4, value);
              break;
            case 'candraw':
              changeClass(3, value);
              break;
            case 'publishstate':
              if (value === 0) {
                changeClass(0, false);
              } else if (value === 1) {
                changeClass(2, true);
                changeClass(1, false);
                changeClass(0, true);
              } else if (value === 2) {
                changeClass(1, true);
                changeClass(2, false);
                changeClass(0, true);
              } else if (value === 3) {
                changeClass(1, true);
                changeClass(2, true);
                changeClass(0, true);
              } else {
                changeClass(1, false);
                changeClass(2, false);
                changeClass(0, true);
              }
              break;
            default:
              break;
          }
        }
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeClass = (index, value = '') => {
    const _publishstate = [].concat(publishstate);
    if (value === '') {
      _publishstate[index] = _publishstate[index] === 1 ? 0 : 1;
    } else {
      _publishstate[index] = value ? 1 : 0;
    }
    setPublishstate(_publishstate);
  };
  // 上下台
  const handlerUserListItemOnClick = () => {
    if (!isClassBegin || user.role === 0 || (user.role === 1 && myself.role !== 1)) {
      return;
    }
    const { maxVideo } = store.getState().classroom.roomInfo;
    const usersNum = Object.values(SessionRoom.getUsers()).filter(item => item.publishstate > 0).length;
    if (usersNum >= maxVideo && !(publishstate[0] && user.publishstate !== 0)) {
      setShowTips(user.id);
      setTimeout(() => {
        setShowTips('');
      }, 2000);
      return;
    }
    UserService.userPlatformUpOrDown(user);
  };
  // 关闭视频
  // const userVideoOpenOrClose = className => {
  //   if (className.includes('disabled')) return;
  //   UserService.changeUserVideo(user);
  // };
  // 关闭音频
  // const userAudioOpenOrClose = className => {
  //   if (className.includes('disabled')) return;
  //   UserService.changeUserAudio(user);
  // };
  // 关闭画笔
  // const changeUserCandraw = () => {
  //   if (user.role === 1 || user.role === 0) return;
  //   UserService.changeUserCandraw(user);
  // };
  // 禁言
  const handlerAloneUserBanSpeak = () => {
    if (user.role === 1 || user.role === 0) return;
    UserService.userBanSpeak(user);
  };
  // 踢出
  const handlerRemoveClick = () => {
    if (user.role === 1 || user.role === 0) return;
    Actions.changeModalMsg(
      {
        type: 'comfirm',
        title: '',
        okBtn: userListInner.removeStudent.confirm,
        cancleBtn: userListInner.removeStudent.cancel,
        message: userListInner.removeStudent.confirmEnd,
      },
      answer => {
        if (answer) {
          YsGlobal.roomClient.evictUser(user.id, 1, roomListner.okBtn);
        }
      },
    );
  };
  // 视频的className    没有视频的直接禁用，有视频的情况下，看发布状态(见roomConstants.js)
  // let classVideo = '';
  // let disabledVideo = '';
  // if (user.hasvideo) {
  //   classVideo = publishstate[1] && (user.publishstate === 2 || user.publishstate === 3) ? 'icon-user_close_camera' : 'icon-user_close_camera_reverse';
  //   disabledVideo =
  //     publishstate[1] && (user.publishstate === 2 || user.publishstate === 3) ? userListInner.button.video.on.title : userListInner.button.video.off.title;
  // } else {
  //   classVideo = 'icon-user_close_camera_disabled';
  //   disabledVideo = userListInner.button.video.disabled.title;
  // }
  // 音频的视频的className
  // let classAudio = '';
  // let disabledAudio = '';
  // if (user.hasaudio) {
  //   classAudio = publishstate[2] && (user.publishstate === 1 || user.publishstate === 3) ? 'icon-user_close_maikefeng' : 'icon-user_close_maikefeng_reverse';
  //   disabledAudio =
  //     publishstate[2] && (user.publishstate === 1 || user.publishstate === 3) ? userListInner.button.audio.on.title : userListInner.button.audio.off.title;
  // } else {
  //   classAudio = 'icon-user_close_maikefeng_disabled';
  //   disabledAudio = userListInner.button.audio.disabled.title;
  // }
  // 老师和助教的禁言默认为禁用状态
  // 老师和助教的画笔默认为禁用状态
  let disabledSpeak = '';

  // let classDraw = '';
  // let disabledDraw = '';

  if (user.role === 1 || user.role === 0) {
    disabledSpeak = userListInner.button.mute.off.title;

    // classDraw = 'icon-user_close_shouquan_disabled';
    // disabledDraw = userListInner.button.Scrawl.on.title;
  } else {
    disabledSpeak = publishstate[4] && user.disablechat ? userListInner.button.mute.off.title : userListInner.button.mute.on.title;

    // classDraw = publishstate[3] && user.candraw ? 'icon-user_close_shouquan' : 'icon-user_close_shouquan_reverse';
    // disabledDraw = publishstate[3] && user.candraw ? userListInner.button.Scrawl.on.title : userListInner.button.Scrawl.off.title;
  }

  let disabledXiajiangtai = '';
  if (!isClassBegin) {
    disabledXiajiangtai = userListInner.button.update.disabled.title;
  } else {
    disabledXiajiangtai = publishstate[0] && user.publishstate !== 0 ? userListInner.button.update.up.title : userListInner.button.update.down.title;
  }
  return (
    <div className="ys-icon-after-container" title="">
      <Icon
        type="platform"
        warn={!(publishstate[0] && user.publishstate !== 0)}
        disable={!isClassBegin || user.role === 0 || (user.role === 1 && myself.role !== 1)}
        onClick={() => handlerUserListItemOnClick(0)}
        realTitle={disabledXiajiangtai}
      />
      <Icon
        type="message"
        warn={![0, 1].includes(myself.role) || (publishstate[4] && user.disablechat)}
        disable={!isClassBegin || user.role === 0 || (user.role === 1 && myself.role !== 1)}
        onClick={handlerAloneUserBanSpeak}
        realTitle={disabledSpeak}
      />
      <Icon type="out" disable={user.role === 1 || user.role === 0} onClick={() => handlerRemoveClick(5)} realTitle={userListInner.button.remove.title} />
    </div>
  );
};
export default UserItemIcon;
