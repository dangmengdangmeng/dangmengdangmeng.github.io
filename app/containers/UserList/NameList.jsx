/**
 * @description 用户list
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { YsGlobal } from '@global/handleGlobal';
import { SessionRoom } from '@global/roomConstants';
import Icon from '@components/Icon';
import store from '@app/store';
import utils from './utils';
import UserItemIcon from './components/UserItemIcon';
import UserExtendList from './components/UserExtendList';
const NameList = props => {
  const { userListData, handlerUserAreaSelection, handlerUseMediaLine, handlerUseCndLine, isClassBegin, openCourseList } = props;
  const myself = SessionRoom.getMyself() || {};
  const { role } = myself;
  const [showUserExtendList, setShowUserExtendList] = useState('');
  const [showTips, setShowTips] = useState('');
  // const showUserItemIcon = myself().role === 1;
  const { isClassRoom } = store.getState().classroom.roomInfo;
  const { courseList } = YsGlobal.languageInfo;
  const { serviceInner } = courseList;
  const assistantManage = userId => {
    if (role !== 1) {
      return;
    }
    setShowUserExtendList(userId);
  };

  useEffect(() => {
    if (showUserExtendList) {
      const ul = document.querySelector('.list-box');
      const index = userListData.findIndex(user => user.id === showUserExtendList);
      if (ul.scrollHeight > ul.clientHeight && index > userListData.length - 5) {
        ul.scrollTop = ul.scrollHeight;
      }
    }
  }, [showUserExtendList, userListData]);
  return (
    <ul className="list-box">
      {userListData.map(user => {
        const deviceTypeClassName = utils.deviceTypeClassNameInfo(user.devicetype);
        return (
          <li key={`user_${user.id}`} style={{ display: (role === 0 && user.role === 0) || user.role === 4 ? 'none' : 'flex' }}>
            {showTips === user.id && <div className="tips">{serviceInner.maxMumberPeople}</div>}
            <div className="ys-icon-before" onClick={() => assistantManage(user.id)} title={user.devicetype}>
              <Icon type={deviceTypeClassName} />
              {showUserExtendList === user.id && user.role !== 1 && (
                <UserExtendList
                  user={user}
                  handlerUserAreaSelection={handlerUserAreaSelection}
                  handlerUseMediaLine={handlerUseMediaLine}
                  handlerUseCndLine={handlerUseCndLine}
                  openCourseList={openCourseList}
                  mouseLeave={() => {
                    setShowUserExtendList('');
                  }}
                />
              )}
            </div>
            <span title={user.nickname} className="user-list-item-name">
              {user.nickname}
            </span>
            {isClassRoom && ![0, 1].includes(user.role) && (
              <div className="gift-number">
                <Icon type="gift" />
                <span className="multiply">x</span>
                {(user.giftnumber > 99 ? `99+` : user.giftnumber) || 0}
              </div>
            )}
            {<UserItemIcon user={user} setShowTips={userId => setShowTips(userId)} isClassBegin={isClassBegin} />}
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = ({ classroom }) => {
  return {
    isClassBegin: classroom.isClassBegin,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NameList);
