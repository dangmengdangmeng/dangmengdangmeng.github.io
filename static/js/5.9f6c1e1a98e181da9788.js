webpackJsonp([5],{hyYI:function(t,e){},lt0X:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("/wvq"),s=i("VQNb"),l=(n.a,s.a,{components:{ListFlexItem:n.a,MyActionsheet:s.a},data:function(){return{actionsheetObj:{isActionSheetShow:!1,menus:{online:"上线计划",offline:"非上线计划"},urls:{online:"/newOnlinePlan",offline:"/newOfflinePlan"}},cellsData:[{firstLeft:"01月12日作业",firstRight:"跟车作业",secondLeft:"2018-11-29 16:47:22",isFinish:!1,isOnline:!0,url:"/onlineWork",id:1},{firstLeft:"01月12日作业",firstRight:"调查作业",secondLeft:"2018-11-29 16:47:22",isFinish:!1,isOnline:!0,url:"/onlineWork",id:2},{firstLeft:"01月12日作业",firstRight:"走访",secondLeft:"2018-11-29 16:47:22",isFinish:!0,isOnline:!1,url:"/offlineWork",id:3}]}}}),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("flexbox",{staticClass:"title",staticStyle:{width:"90%"},attrs:{justify:"flex-end"}},[i("flexbox-item",[t._v("作业列表")]),t._v(" "),i("flexbox-item",{staticStyle:{"text-align":"right"}},[i("router-link",{attrs:{to:"/allReports"}},[t._v("全部作业")])],1)],1),t._v(" "),i("group",[t._l(t.cellsData,function(t,e){return[i("list-flex-item",{key:e,attrs:{cellData:t}})]})],2),t._v(" "),i("xbutton",{staticStyle:{position:"fixed",bottom:"30px",width:"90%","box-sizing":"border-box",left:"0",right:"0"},attrs:{type:"primary"},nativeOn:{click:function(e){t.actionsheetObj.isActionSheetShow=!0}}},[t._v("\n    新建计划\n  ")]),t._v(" "),i("my-actionsheet",{attrs:{actionsheetObj:t.actionsheetObj}})],1)},staticRenderFns:[]};var r=i("C7Lr")(l,o,!1,function(t){i("hyYI")},null,null);e.default=r.exports}});
//# sourceMappingURL=5.9f6c1e1a98e181da9788.js.map