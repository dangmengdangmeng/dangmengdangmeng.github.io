import Vue from "vue";
import axios from "axios";
import router from "./router";
import qs from "qs";
import vue_cookie from "vue-cookie";
import "../static/reset.css";
import "../config/rem";
import "../static/global.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
const api_config = require("../api_config.js");
Vue.config.productionTip = false;

axios.defaults.baseURL = api_config.host;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=utf-8";
// axios.defaults.withCredentials = true;
// axios.defaults.headers["Cookie"] = {
//   activityOpenId: "783516e6f9d4431eac51adfa5d1e9c16",
//   bdOpenId: "8aa2520332aa45f39e7243737c452939"
// };
axios.interceptors.request.use(
  config => {
    if (config.method == "post") {
      // console.log(qs.stringify(config.data));
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);
Vue.prototype.$http = axios;
Vue.prototype.$cookie = vue_cookie;
//this.$cookie.set('name','1',1) 存储cookie 键，值，时间(1天)
//this.$cookie.get('name') 获取cookie 键
//this.$cookie.delete('name') 删除cookie 键
Vue.prototype.$api = api_config;

new Vue({
  el: "#app",
  router
});
