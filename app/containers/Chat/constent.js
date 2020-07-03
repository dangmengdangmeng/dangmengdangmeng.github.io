import { YsGlobal } from '@global/handleGlobal';

const { chat } = YsGlobal.languageInfo;
const { chatContent } = chat;

// 消息列表中 对应角色
export const roleMap = {
  0: chatContent.speaker,
  1: chatContent.assistant,
  2: '', // 学员
  3: '', // 直播用户
  4: chatContent.patrol, // 巡检员
  5: chatContent.classTeacher,
  10: chatContent.system,
  11: chatContent.enterprise,
  12: chatContent.admin,
  '-1': chatContent.playBack,
};

// 表情对应的图片
export const emoticonImg = {
  '[em_1]': '😀',
  '[em_2]': '😃',
  '[em_3]': '😏',
  '[em_4]': '😒',
  '[em_5]': '😢',
  '[em_6]': '😭',
  '[em_7]': '😙',
  '[em_8]': '😘',
};
export const emoticonImg2 = {
  '😀': '[em_1]',
  '😃': '[em_2]',
  '😏': '[em_3]',
  '😒': '[em_4]',
  '😢': '[em_5]',
  '😭': '[em_6]',
  '😙': '[em_7]',
  '😘': '[em_8]',
};
export const emotReg = /[😀😃😏😒😢😭😙😘]{1}/g;
export const EmoticonArray = {
  调皮: '[em_1]',
  开心: '[em_2]',
  得意: '[em_3]',
  撇嘴: '[em_4]',
  难过: '[em_5]',
  流泪: '[em_6]',
  亲亲: '[em_7]',
  么么哒: '[em_8]',
};

// 发送图片的主机地址
export const getDocAddress = () => window.WBGlobal.nowUseDocAddress;
