// var host = "http://ld.entfly.com";
var host = "http://1.lanbeibeer.com";
var api = {
  //参数  Activity=90
  top_user_info: "/mBrMis/ActivityWineWheelCheck/GetPassageUserInfo",
  get_rank: "/mBrMis/ActivityWineWheelCheck/StatPurchaseOrderList",
  history_rank: "/mBrMis/ActivityWineWheelCheck/StatOldPurchaseOrderList"
};
module.exports = {
  host: host,
  api: api
};
