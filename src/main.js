import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import qs from "qs";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import VCharts from 'v-charts'
Vue.use(VCharts);
import "../static/reset.css";
import "../static/global.css";
const api_config = require("../static/api_config.js");
Vue.config.productionTip = false;
axios.defaults.baseURL = api_config.host;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=utf-8";

axios.interceptors.request.use(
  config => {
    if (config.method == "post") {
      console.log(qs.stringify(config.data));
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
Vue.prototype.$api = api_config;
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
