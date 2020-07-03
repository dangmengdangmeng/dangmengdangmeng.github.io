import Signalling from '@global/services/SignallingService';

export const sendSignalling = {
  exit: () => {
    const data = {};
    Signalling.sendSignallingTimer(data, true);
  },
  start: time => {
    const data = {
      time,
      defaultTime: 300,
      isStatus: false,
      isRestart: false,
      isShow: false,
    };
    Signalling.sendSignallingTimer(data);
  },
  play: (time, defaultTime) => {
    const data = {
      time,
      defaultTime,
      isStatus: true,
      isRestart: true,
      isShow: true,
    };
    Signalling.sendSignallingTimer(data);
  },
  reset: (time, defaultTime, isStatus) => {
    const data = {
      time,
      defaultTime,
      isStatus,
      isRestart: true,
      isShow: true,
    };
    Signalling.sendSignallingTimer(data);
  },
  pause: (time, defaultTime) => {
    const data = {
      time,
      defaultTime,
      isStatus: false,
      isRestart: false,
      isShow: true,
    };
    Signalling.sendSignallingTimer(data);
  },
  nopause: (time, defaultTime) => {
    const data = {
      time,
      defaultTime,
      isStatus: true,
      isRestart: false,
      isShow: true,
    };
    Signalling.sendSignallingTimer(data);
  },
};
