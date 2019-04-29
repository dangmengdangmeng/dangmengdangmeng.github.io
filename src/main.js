import Vue from "vue";
import App from "./App";
import "../static/css/weui.css";
import "../static/reset.css";
import "../static/global.css";
import Fly from "flyio/dist/npm/wx";
const api_config = require("../static/api_config.js");
const function_ = require("../static/function.js");
const fly = new Fly();
Vue.prototype.$api = api_config;
Vue.prototype.$fun = function_.fun_;
// 将fly封装为全局变量，方便调用
fly.config = {
  method: "get", // 请求方法， GET 、POST ...
  headers: {}, // 请求头
  baseURL: api_config.host, // 请求基地址
  parseJson: true,
  timeout: "30000" // 超时时间
};
fly.interceptors.request.use(request => {
  request.headers = app.getCookieHeader();
  request.body = app.getPostData(request.body);
  return request;
});
fly.interceptors.response.use(
  res => {
    app.saveCookie(res.headers);
    if (res.data.state == 0) {
      app.$fun.alert_modal(res.data.msg);
    } else {
      return res;
    }
  },
  err => {
    app.$fun.alert_modal(
      "错误信息：" + err.message + " " + "状态码：" + err.status
    );
    return Promise.reject(err);
  }
);
Vue.prototype.$http = function(options) {
  return fly.request(options.url, options.data, {
    method: options.method ? options.method : "get"
  });
};

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);
app.$mount();
Vue.prototype.$app = app;
