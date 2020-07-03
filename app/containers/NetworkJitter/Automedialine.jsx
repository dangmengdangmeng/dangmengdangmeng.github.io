import React, { useState, useEffect } from 'react';
import { Event } from '@global/roomConstants';
import { YsGlobal } from '@global/handleGlobal';
import './static/sass/index.scss';
const { liveMobilePage } = YsGlobal.languageInfo;
const Automedialine = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const listernerBackupid = `${new Date().getTime()}_${Math.random()}`;
    Event.on('recv-pub-msg', handlePubMsg, listernerBackupid);
    return () => {
      Event.offAllByMarkId(listernerBackupid);
    };
  }, []);

  const handlePubMsg = pubMsgData => {
    switch (pubMsgData.name) {
      case 'Notice_ChangeMediaLine': {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 5000);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="NetworkJitter" style={{ height: show ? '100%' : '0' }}>
      <div className="reconnect switchline"></div>
      {liveMobilePage.automedialineTip}
    </div>
  );
};

export default Automedialine;
