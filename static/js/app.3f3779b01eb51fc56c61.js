webpackJsonp([10],{"+WGh":function(e,n){},NGWz:function(e,n){!function e(n,t){var o=t.documentElement,i=n.devicePixelRatio||1;function r(){var e=o.clientWidth/10;o.style.fontSize=e+"px"}if(function e(){t.body?t.body.style.fontSize=12*i+"px":t.addEventListener("DOMContentLoaded",e)}(),r(),n.addEventListener("resize",r),n.addEventListener("pageshow",function(e){e.persisted&&r()}),i>=2){var a=t.createElement("body"),l=t.createElement("div");l.style.border=".5px solid transparent",a.appendChild(l),o.appendChild(a),1===l.offsetHeight&&o.classList.add("hairlines"),o.removeChild(a)}n.onresize=function(){e(n,t)}}(window,document)},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("rVsN"),i=t.n(o),r=t("xd7I"),a=t("aozt"),l=t.n(a),s=t("usm0");r.a.use(s.a);var p=new s.a({routes:[{path:"/index",name:"index",component:function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"Fw7Z"))}},{path:"/personal",name:"personal",component:function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,"wHWr"))}},{path:"/rank",name:"rank",component:function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,"Q4f6"))}},{path:"/lottery",name:"lottery",component:function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,"mMbv"))}},{path:"/collect",name:"collect",component:function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,"sgt7"))}},{path:"/join",name:"join",component:function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,"mkem"))}},{path:"/",name:"demo",component:function(){return Promise.all([t.e(0),t.e(8)]).then(t.bind(null,"8p6N"))}},{path:"/edit",name:"edit",component:function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,"1Ziq"))}}]}),u=t("X1H5"),c=t.n(u),d=t("CtzY"),m=t.n(d),f=t("ocvr"),h=t.n(f),v=(t("gGLG"),t("Klf7")),b=t.n(v);t("+WGh"),t("vCD6"),t("NGWz");r.a.component("drag_resize",h.a);var y=t("RBdV");r.a.config.productionTip=!1,l.a.defaults.baseURL="http://ysl.entfly.com",l.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=utf-8",l.a.interceptors.request.use(function(e){return"post"===e.method&&(e.data=m.a.stringify(e.data)),e},function(e){return i.a.reject(e)}),l.a.interceptors.response.use(function(e){return e},function(e){return i.a.reject(e+"1")}),r.a.prototype.$http=l.a,r.a.prototype.$cookie=b.a,r.a.prototype.$api=y,c.a.baseUrl="https://api.weixin.qq.com",c.a.error(function(e){}),r.a.prototype.$wx=c.a,new r.a({el:"#app",router:p})},RBdV:function(e,n){e.exports={host:"http://ysl.entfly.com",api:{prize_level:"/BlueRibbonApi/Activity/StartActivity",wx_sdk_config:"/BlueRibbonApi/JssdkConfig/get"},result__:{prize_level:{status:200,msg:"成功",data:{FirstAwardLevelName:"6等级",FirstAwardPrizeValue:"0.2元",ActivityOpenId:"111",MemberCode:"111",JoinOpenId:"111"}}}}},gGLG:function(e,n){},vCD6:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.3f3779b01eb51fc56c61.js.map