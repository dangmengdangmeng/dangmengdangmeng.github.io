(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5dc407c"],{2366:function(e,t){for(var n=[],i=0;i<256;++i)n[i]=(i+256).toString(16).substr(1);function r(e,t){var i=t||0,r=n;return[r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]]].join("")}e.exports=r},"28a5":function(e,t,n){"use strict";var i=n("aae3"),r=n("cb7c"),a=n("ebd6"),o=n("0390"),s=n("9def"),c=n("5f1b"),u=n("520a"),l=n("79e5"),d=Math.min,f=[].push,m="split",v="length",h="lastIndex",p=4294967295,g=!l((function(){RegExp(p,"y")}));n("214f")("split",2,(function(e,t,n,l){var b;return b="c"=="abbc"[m](/(b)*/)[1]||4!="test"[m](/(?:)/,-1)[v]||2!="ab"[m](/(?:ab)*/)[v]||4!="."[m](/(.?)(.?)/)[v]||"."[m](/()()/)[v]>1||""[m](/.?/)[v]?function(e,t){var r=String(this);if(void 0===e&&0===t)return[];if(!i(e))return n.call(r,e,t);var a,o,s,c=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,m=void 0===t?p:t>>>0,g=new RegExp(e.source,l+"g");while(a=u.call(g,r)){if(o=g[h],o>d&&(c.push(r.slice(d,a.index)),a[v]>1&&a.index<r[v]&&f.apply(c,a.slice(1)),s=a[0][v],d=o,c[v]>=m))break;g[h]===a.index&&g[h]++}return d===r[v]?!s&&g.test("")||c.push(""):c.push(r.slice(d)),c[v]>m?c.slice(0,m):c}:"0"[m](void 0,0)[v]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,i){var r=e(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,r,i):b.call(String(r),n,i)},function(e,t){var i=l(b,e,this,t,b!==n);if(i.done)return i.value;var u=r(e),f=String(this),m=a(u,RegExp),v=u.unicode,h=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),w=new m(g?u:"^(?:"+u.source+")",h),y=void 0===t?p:t>>>0;if(0===y)return[];if(0===f.length)return null===c(w,f)?[f]:[];var C=0,_=0,k=[];while(_<f.length){w.lastIndex=g?_:0;var D,I=c(w,g?f:f.slice(_));if(null===I||(D=d(s(w.lastIndex+(g?0:_)),f.length))===C)_=o(f,_,v);else{if(k.push(f.slice(C,_)),k.length===y)return k;for(var x=1;x<=I.length-1;x++)if(k.push(I[x]),k.length===y)return k;_=C=D}}return k.push(f.slice(C)),k}]}))},3170:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"verify-sms"},[i("img",{staticClass:"background",attrs:{src:n("e23e"),alt:"爱预医"}}),i("img",{staticClass:"logo",attrs:{src:n("9d64"),alt:"爱预医"}}),i("div",{staticClass:"logo-name"},[e._v("爱预医")]),i("div",{staticClass:"title-bar"},[i("div",{staticClass:"title"},[e._v("验证码已经发送到")]),i("div",{staticClass:"telephone"},[e._v(e._s(e.formData.telephone))])]),i("div",{staticClass:"code"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.code,expression:"formData.code"}],staticClass:"code-input",attrs:{type:"number",placeholder:"请输入验证码"},domProps:{value:e.formData.code},on:{input:function(t){t.target.composing||e.$set(e.formData,"code",t.target.value)}}})]),i("div",[e.timer||60!==e.time?i("div",{staticClass:"send-code-btn"},[e._v("重新发送验证码 ("+e._s(e.time)+")")]):i("div",{staticClass:"send-code-btn",on:{click:e.sendSmsCode}},[e._v("发送验证码")])]),i("div",{staticClass:"submit-btn",on:{click:e.submitForm}},[e.formData.token?i("span",[e._v("绑定手机号")]):i("span",[e._v("登录")])])])},r=[],a=(n("ac6a"),n("f3e2"),n("28a5"),n("6762"),n("2fdb"),n("a481"),n("50ae")),o=n("3d20"),s=n("d225"),c=n("b0b4"),u=n("db49"),l=n("9ed1"),d=(n("6b54"),n("87b3"),n("2397"),n("4e2b")),f=n("308d"),m=n("6bb5"),v=n("9242");function h(e){var t=p();return function(){var n,i=Object(m["a"])(e);if(t){var r=Object(m["a"])(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return Object(f["a"])(this,n)}}function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var g=function(e){Object(d["a"])(n,e);var t=h(n);function n(e){return Object(s["a"])(this,n),t.call(this,e)}return Object(c["a"])(n,[{key:"saveToLocal",value:function(){var e=u["a"].oauth.tokenKey,t=u["a"].oauth.tokenTypeKey;window.localStorage.setItem(e,this.accessToken),window.localStorage.setItem(t,this.tokenType)}}]),n}(v["a"]),b=function(){function e(){Object(s["a"])(this,e),this.baseUrl=u["a"].api.userUrl}return Object(c["a"])(e,[{key:"smsLogin",value:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return new Promise((function(s,c){var u="".concat(n.baseUrl,"/user/sms_login"),d={telephone:e,sms_code:t,device:a["a"].getDeviceId(),origin:a["a"].getOrigin()};i&&(d.admin_id=i),r&&(d.promotion_id=r),o&&(d.channel_id=o),Object(l["a"])({method:"post",url:u,params:d}).then((function(e){var t=new g(e.data);t.saveToLocal(),s(!0)})).catch((function(e){c(e)}))}))}}]),e}(),w=new a["a"],y=new b,C={name:"VerifySms",data:function(){return{time:60,timer:null,redirect:"/",formData:{telephone:null,code:null,token:null}}},mounted:function(){var e=this;document.title="验证手机号",this.getTime();var t=this.$route.query,n=t.redirect,i=t.telephone,r=t.token,a=t.auto;n&&(this.redirect=n),i&&(this.formData.telephone=i),r&&(this.formData.token=r),a&&1===parseInt(a)&&setTimeout((function(){e.sendSmsCode();var t={},n=e.$route.query;for(var i in n)"auto"!==i&&(t[i]=n[i]);e.$router.replace({query:t})}),1e3)},methods:{getTime:function(){var e=Math.round(parseInt(window.localStorage.getItem("sms_last_time"))/1e3);if(e){var t=Math.round((new Date).getTime()/1e3);t-e>60?this.time=60:(this.time=60-(t-e),this.timer=window.setInterval(this.subTime,1e3))}},subTime:function(){this.time>0?this.time-=1:(window.clearInterval(this.timer),this.timer=null,this.time=60)},sendSmsCode:function(){var e=this;if(this.timer||60!==this.time)return!1;w.getVerifySmsCode(this.formData.telephone).then((function(){var t=(new Date).getTime()+"";window.localStorage.setItem("sms_last_time",t),e.timer=window.setInterval(e.subTime,1e3)})).catch((function(e){o["fire"]("请求错误",e.message,"error")}))},submitForm:function(){var e,t=this;if(!this.formData.code)return o["fire"]("参数错误","验证码不能为空","warning"),!1;this.redirect.includes("admin_id")&&(e=this.parseQueryIntoObj(this.redirect).admin_id),y.smsLogin(this.formData.telephone,this.formData.code,e).then((function(){window.location.href=t.redirect})).catch((function(){o["fire"]("登录失败","验证码错误","error")}))},parseQueryIntoObj:function(e){var t={},n=e.split("?")[1],i=n.split("&");return i.forEach((function(e){var n=e.split("=");t[n[0]]=n[1]})),t}}},_=C,k=(n("3bae"),n("2877")),D=Object(k["a"])(_,i,r,!1,null,"543cb1cc",null);t["default"]=D.exports},"3bae":function(e,t,n){"use strict";n("beb3")},"50ae":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));n("6762"),n("2fdb");var i=n("d225"),r=n("b0b4"),a=n("c64e"),o=n("9ed1"),s=n("db49"),c=function(){function e(){Object(i["a"])(this,e),this.baseUrl=s["a"].api.baseUrl}return Object(r["a"])(e,[{key:"getVerifySmsCode",value:function(t){var n=this;return new Promise((function(i,r){var a="".concat(n.baseUrl,"/verify/sms_code"),s={telephone:t,device:e.getDeviceId()};Object(o["a"])({method:"post",url:a,params:s}).then((function(){return i(!0)})).catch((function(e){return r(e)}))}))}}],[{key:"getOrigin",value:function(){var e=window.navigator.userAgent.toLowerCase(),t=e.includes("micromessenger"),n=300;return t&&(n=400),n}},{key:"getDeviceId",value:function(){var e=window.localStorage.getItem("device_id");return e||(e=a(),window.localStorage.setItem("device_id",e)),e}},{key:"getPlatform",value:function(){var e=window.navigator.userAgent.toLowerCase(),t=e.includes("micromessenger"),n="h5";return t&&(n="official"),n}}]),e}()},"9d64":function(e,t,n){e.exports=n.p+"img/logo.58c4efa5.png"},beb3:function(e,t,n){},c64e:function(e,t,n){var i=n("e1f4"),r=n("2366");function a(e,t,n){var a=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null),e=e||{};var o=e.random||(e.rng||i)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var s=0;s<16;++s)t[a+s]=o[s];return t||r(o)}e.exports=a},e1f4:function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var r=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}},e23e:function(e,t,n){e.exports=n.p+"img/login-background.43af9b50.jpg"}}]);