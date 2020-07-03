// import React from 'react';
import React, { useState, useEffect } from 'react';
import { YsGlobal } from '@global/handleGlobal';
import Icon from '@components/Icon';
import { emoticonToNull, getNowDate } from '../utils';
import { translateAjax } from '../service/ajax';

const { header } = YsGlobal.languageInfo;

export function RemindMsg(props) {
  const { test } = props;
  // 翻译后的消息字符串
  const [strmsgToLanguage, setStrmsgToLanguage] = useState('');

  const translateFn = () => {
    translateAjax(emoticonToNull(test))
      .then(res => {
        if (!res.strmsgToLanguage.length) return;
        setStrmsgToLanguage(res.strmsgToLanguage);
      })
      .catch(err => {
        console.warn(err);
      });
  };
  if (strmsgToLanguage) {
    translateFn();
  }

  useEffect(() => {
    const $msgWrap = document.querySelector('.remind-msg');
    if (!$msgWrap || YsGlobal.isMobile) return;
    props.getH($msgWrap.offsetHeight);
  }, [test, strmsgToLanguage]);

  return (
    <>
      {YsGlobal.isMobile && <p className="notice_gg_time">{getNowDate()}</p>}
      <div className="remind-msg">
        {!YsGlobal.isMobile && (
          <div className="remind-msg-header">
            <span>{header.NoticeLanguage}:</span>
            <div className="remind-msg_btn">
              {/* <Icon type="translate" onClick={translateFn} /> */}
              <Icon type="close" onClick={props.remindClose} />
            </div>
          </div>
        )}

        {YsGlobal.isMobile && <div className="remind_icon" />}
        <div className="remind-msg-contest">
          {test}
          {strmsgToLanguage ? <p className="remind-msg-innerHTML">{strmsgToLanguage}</p> : null}
        </div>
        {YsGlobal.isMobile && <Icon type="translate" onClick={translateFn} />}
      </div>
    </>
  );
}

export default RemindMsg;
