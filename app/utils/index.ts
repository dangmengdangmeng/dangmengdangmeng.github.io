import chineseLanguage from '../language/chinese';
import englishLanguage from '../language/english';
import zhTwLanguage from '../language/zh-tw';

export * from './request';
export * from './component';
export * from './uuid';

export const getDate = (date: Date = new Date()): string => {
  const dates = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()].map(addZero);
  return `${dates[0]}-${dates[1]}-${dates[2]} ${dates[3]}:${dates[4]}`;
};

/**
 * 获取当前日期的GUID格式，即8位数的日期：19700101
 * @param {Date} date 时间对象
 * @return {string} 返回GUID日期格式的字条串
 */
export const getGUIDDate = (date: Date = new Date()): string => {
  const dates = [date.getMonth() + 1, date.getDate()].map(addZero);
  return `${date.getFullYear()}${dates[0]}${dates[1]}`;
};

/**
 * 获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
 * @param {Date} date 时间对象
 * @return {string} 返回GUID日期格式的字条串
 */
export const getGUIDTime = (date: Date = new Date()): string => {
  const dates = [date.getHours(), date.getMinutes(), date.getSeconds(), parseInt(String(date.getMilliseconds() / 10), 10)].map(addZero);
  return `${dates[0]}-${dates[1]} ${dates[2]}:${dates[3]}`;
};

export const addZero = (num: number): string | number => {
  let n: number | string = num;
  if (num.toString().length === 1) {
    n = `0${num}`;
  }
  return n;
};

interface Clock {
  hh: string | number;
  mm: string | number;
  ss: string | number;
}

/**
 * 将秒数转为时分秒
 * @param diffTime 秒数
 * @returns {
 *  hh: string,
    mm: string,
    ss: string,
 * }
 */
export const getTimeDiffToFormat = (diffTime: number): Clock | boolean => {
  if (diffTime >= 0) {
    // 计算出相差天数
    const days = Math.floor(diffTime / (24 * 3600));
    // 计算出小时数
    const leave1 = diffTime % (24 * 3600); // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / 3600);
    // 计算相差分钟数
    const leave2 = leave1 % 3600; // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / 60);
    // 计算相差秒数
    const leave3 = leave2 % 60; // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3);
    let daysAddHour = hours + days * 24; // 加上天数的小时数
    const clock: Clock = {
      hh: "",
      mm: "",
      ss: "",
    };
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes >= 60) {
      minutes = 0;
      daysAddHour += 1;
    }
    clock.hh = daysAddHour > 9 ? daysAddHour : `0${daysAddHour}`;
    clock.mm = minutes > 9 ? minutes : `0${minutes}`;
    clock.ss = seconds > 9 ? seconds : `0${seconds}`;
    return clock;
  }
  return false;
};

type TLanguageName = 'chinese' | 'zh-tw' | 'english';

/* 获取浏览器语言 */
export const getLanguageName = (): TLanguageName => {
  let lang = navigator.language || (navigator as any).userLanguage;
  lang = lang.substr(0, 5);
  let languageName: TLanguageName = 'english';
  if (lang.toLowerCase().match(/zh/g)) {
    if (lang.toLowerCase().match(/tw/g)) {
      languageName = 'zh-tw';
    } else {
      languageName = 'chinese';
    }
  } else if (lang.toLowerCase().match(/en/g)) {
    languageName = 'english';
  }
  document.documentElement.lang = lang;
  return languageName;
};

/* 获取浏览器语言 */
export const getLanguage = (languageName: string): any => {
  if (languageName === 'english') {
    return englishLanguage; // 英文
  }
  if (languageName === 'zh-tw') {
    return zhTwLanguage; // 繁体
  }
  return chineseLanguage;
};
