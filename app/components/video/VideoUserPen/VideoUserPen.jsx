import React, { useState, useEffect } from 'react';
import { Event, SessionRoom } from '@global/roomConstants';
import Icon from '@components/Icon';
import './VideoUserPen.scss';
const VideoUserPen = props => {
  const { userId } = props;
  const mySelf = SessionRoom.getUser(userId) || {};
  const [color, setColor] = useState('#FF0000');
  const [candraw, setCandraw] = useState(false);
  /* 处理用户属性改变 */
  useEffect(() => {
    const userPropertiesUpdate = data => {
      const { id, properties } = data;
      const user = SessionRoom.getUser(id);
      if (user.id === userId) {
        Object.entries(properties).forEach(([key, value]) => {
          if (key === 'candraw') {
            setCandraw(value);
          }
          if (key === 'primaryColor') {
            setColor(value);
          }
        });
      }
    };
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('user-properties-update', userPropertiesUpdate, listernerBackupid); // 用户属性改变
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);

  return (
    <div style={{ display: candraw || mySelf.role === 0 ? 'block' : 'none', color }} className="VideoUserPen">
      <Icon type="pencil" onClick={this} />
    </div>
  );
};
export default VideoUserPen;
