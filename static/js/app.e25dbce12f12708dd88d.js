webpackJsonp([5],{"+WGh":function(e,t){},NGWz:function(e,t){!function e(t,n){var i=n.documentElement,o=t.devicePixelRatio||1;function r(){var e=i.clientWidth/10;i.style.fontSize=e+"px"}if(function e(){n.body?n.body.style.fontSize=12*o+"px":n.addEventListener("DOMContentLoaded",e)}(),r(),t.addEventListener("resize",r),t.addEventListener("pageshow",function(e){e.persisted&&r()}),o>=2){var a=n.createElement("body"),d=n.createElement("div");d.style.border=".5px solid transparent",a.appendChild(d),i.appendChild(a),1===d.offsetHeight&&i.classList.add("hairlines"),i.removeChild(a)}t.onresize=function(){e(t,n)}}(window,document)},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("rVsN"),o=n.n(i),r=n("xd7I"),a=n("aozt"),d=n.n(a),s=n("usm0");r.default.use(s.a);var u=new s.a({routes:[{path:"/",name:"index",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"8/c5"))}},{path:"/reg",name:"reg",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"o1l3"))}},{path:"/end",name:"end",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"ydPj"))}}]}),l=n("CtzY"),p=n.n(l),c=n("Klf7"),f=n.n(c),h=(n("+WGh"),n("NGWz"),n("vCD6"),n("Gir3")),m=n.n(h);n("hsAa");r.default.use(m.a);var v=n("RBdV");r.default.config.productionTip=!1,d.a.defaults.baseURL="http://ysl.entfly.com",d.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=utf-8",d.a.interceptors.request.use(function(e){return"post"===e.method&&(e.data=p.a.stringify(e.data)),e},function(e){return o.a.reject(e)}),d.a.interceptors.response.use(function(e){return e},function(e){return o.a.reject(e)}),r.default.prototype.$http=d.a,r.default.prototype.$cookie=f.a,r.default.prototype.$api=v,new r.default({el:"#app",router:u})},RBdV:function(e,t){e.exports={host:"http://ysl.entfly.com",api:{prize_level:"/BlueRibbonApi/Activity/StartActivity",wx_sdk_config:"/BlueRibbonApi/JssdkConfig/get"},result__:{prize_level:{status:200,msg:"成功",data:{FirstAwardLevelName:"6等级",FirstAwardPrizeValue:"0.2元",ActivityOpenId:"111",MemberCode:"111",JoinOpenId:"111"}}}}},hsAa:function(e,t){},vCD6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e25dbce12f12708dd88d.js.map