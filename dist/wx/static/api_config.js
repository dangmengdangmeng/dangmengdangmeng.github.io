var api = {
  login:'WxOpen/OnLogin',
  get_yzm: "/mYslMis/CuteShotActivity/GetMobileCheckCode",//获取验证码
  set_yzm: "/mYslMis/CuteShotActivity/Check",//发送注册信息给后端
  set_userInfo: "/mYslMis/CuteShotActivity/Submit",
  get_index_list: "/mYslMis/CuteShotActivity/GetList",
  set_ticket: "/mYslMis/CuteShotActivity/Ticket",
  page2_top_info: "/mYslMis/CuteShotActivity/Statistics",
  get_memberInfo: "/mYslMis/CuteShotActivity/GetMemberInfo",
  StartActivity: "/mYslMis/CuteShotActivity/StartActivity", //开始抽奖
  set_user_info: "/mYslMis/CuteShotActivity/ApplyWin",
  GetAwardCount: "/mYslMis/CuteShotActivity/GetAwardCount",
  ApplyRankAward: "/mYslMis/CuteShotActivity/ApplyRankAward",
  upload_img:'/File/UploadFile2',
  is_activity:'/mYslMis/CuteShotActivity/MemberJoin'
};
// const host = 'https://ysl.entfly.com'  // 开发域名
const host = 'https://1.mengniuarla.com'  // 生产域名
var is_debug = true;
var result__ = {};

module.exports = {
  host,
  api: api,
  is_debug: is_debug,
  result__: result__
};
