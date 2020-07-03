import React, { useState, useEffect, useRef } from 'react';
import { SessionRoom } from '@global/roomConstants';
import './ScrollBanner.scss';

const fontList = [12, 14, 18];
const ScrollBanner = props => {
  const {
    doorChain: { colour: color, diaphaneity, interval, fontsize, mattertype, content },
    videowidth,
    videoheight,
  } = JSON.parse(props.roomInfo);
  const time = interval * 60;
  const scale = Number(videowidth) / Number(videoheight);
  const [randomRange, setRandomRange] = useState(Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? Math.random() * 75 : Math.random() * 56);
  const [showBanner, setShowBanner] = useState(true);
  const [step, setStep] = useState(0);
  const mySelf = SessionRoom.getMyself();
  const text = mattertype
    .map(item => {
      if (item === '1') {
        return mySelf.id;
      }
      return content;
    })
    .join(' ');
  // 5秒跳动一下位置
  const $savedCallback = useRef();
  const $callback = () => {
    setRandomRange(Math.abs(scale - 4 / 3) < Math.abs(scale - 16 / 9) ? Math.random() * 75 : Math.random() * 56);
    const tmp = step + 5;
    if (tmp % time === 0 || (tmp - 5) % time === 0 || (tmp - 10) % time === 0) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
    setStep(tmp);
  };
  useEffect(() => {
    $savedCallback.current = $callback;
  });
  useEffect(() => {
    const timerInter = setInterval(() => {
      $savedCallback.current();
    }, 5000);
    return () => clearInterval(timerInter);
  }, []);

  return (
    <div
      className={`scroll-banner font${fontList[fontsize]}`}
      style={{ display: showBanner ? 'flex' : 'none', color, opacity: `${diaphaneity}%`, bottom: `calc(${randomRange}% + 0.4rem)` }}
    >
      {text}
    </div>
  );
};

export default ScrollBanner;
