webpackJsonp([4],{PJF2:function(t,i){},pc94:function(t,i){},tGNM:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=a("d1hq"),s={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"weui-media-box weui-media-box_appmsg"},[i("div",{staticClass:"weui-media-box__hd"},[i("div",{staticClass:"weui-media-box__thumb",staticStyle:{"background-color":"blue","border-radius":"50%",color:"#fff"}},[this._v("上")])]),this._v(" "),i("div",{staticClass:"weui-media-box__bd"},[i("div",{staticClass:"weui-media-box__title"},[this._v("张三")]),this._v(" "),i("div",{staticClass:"weui-media-box__desc"},[this._v("2019-01-12      "),i("span",{staticStyle:{color:"blue"}},[this._v("正常")])])])])}]};var n=a("C7Lr")({},s,!1,function(t){a("PJF2")},null,null).exports,r=(e.a,{components:{EditInput:e.a,MediaBox:n},data:function(){return{isEdit:!1,isAccordionShow:!1,planData:{},mockData:[{id:"1",creatorInfo:{creator:"张三",avatar:"",fromWhere:"京广高铁工务段信阳东站",read:!0},planInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"上线时间",v:"2019-01-13",read:!0},{k:"下线时间",v:"2019-01-13",read:!0}],workInfo:[{k:"作业类型",v:"非上线计划",read:!0},{k:"工作类型",v:"办公室作业",read:!0},{k:"工作路局",v:"武汉",read:!0},{k:"工作地点",v:"京广高铁工务段信阳东站",read:!0},{k:"备注",v:"京广高铁工务段信阳东站",read:!0}],otherInfo:[{k:"创建时间",v:"2019-01-12 16:47:22",read:!0},{k:"最后更新",v:"2019-01-12 16:47:22",read:!0}],bindInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"日报日期",v:"2019-01-12",read:!0},{k:"关联时间",v:"2019-01-12 12:12:23",read:!0}]},{id:"2",creatorInfo:{creator:"李四",avatar:"",fromWhere:"京广高铁工务段信阳东站"},planInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"上线时间",v:"2019-01-13",read:!0},{k:"下线时间",v:"2019-01-13",read:!0}],workInfo:[{k:"作业类型",v:"非上线计划",read:!0},{k:"工作类型",v:"办公室作业",read:!0},{k:"工作路局",v:"武汉",read:!0},{k:"工作地点",v:"京广高铁工务段信阳东站",read:!0},{k:"备注",v:"京广高铁工务段信阳东站",read:!0}],otherInfo:[{k:"创建时间",v:"2019-01-12 16:47:22",read:!0},{k:"最后更新",v:"2019-01-12 16:47:22",read:!0}],bindInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"日报日期",v:"2019-01-12",read:!0},{k:"关联时间",v:"2019-01-12 12:12:23",read:!0}]},{id:"3",creatorInfo:{creator:"王五",avatar:"",fromWhere:"京广高铁工务段信阳东站"},planInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"上线时间",v:"2019-01-13",read:!0},{k:"下线时间",v:"2019-01-13",read:!0}],workInfo:[{k:"作业类型",v:"非上线计划",read:!0},{k:"工作类型",v:"办公室作业",read:!0},{k:"工作路局",v:"武汉",read:!0},{k:"工作地点",v:"京广高铁工务段信阳东站",read:!0},{k:"备注",v:"京广高铁工务段信阳东站",read:!0}],otherInfo:[{k:"创建时间",v:"2019-01-12 16:47:22",read:!0},{k:"最后更新",v:"2019-01-12 16:47:22",read:!0}],bindInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"日报日期",v:"2019-01-12",read:!0},{k:"关联时间",v:"2019-01-12 12:12:23",read:!0}]}]}},methods:{selectMenu:function(t){var i=document.getElementById("menu_"+t);"none"==i.style.display?(i.style.display="block",$("#cell_"+t).removeClass("icon-74"),$("#cell_"+t).addClass("icon-35 ")):(i.style.display="none",$("#cell_"+t).removeClass("icon-35"),$("#cell_"+t).addClass("icon-74"))}},created:function(){var t=this;this.mockData.forEach(function(i,a){t.$route.params.id===i.id&&(t.planData=i)})}}),l={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"weui_cells weui_cells_access"},[e("a",{staticClass:"weui_cell",on:{click:function(i){t.isAccordionShow=!t.isAccordionShow}}},[t._m(0),t._v(" "),t._m(1)])]),t._v(" "),e("div",{class:[t.isAccordionShow?"icon-35":"icon-74"],staticStyle:{display:"none"},style:t.isAccordionShow?"display:block":"display:none",attrs:{id:"menu_1"}},[e("div",{staticClass:"weui_article"},[t._v("测试文字,我是你们的好朋友")])]),t._v(" "),e("media-box"),t._v(" "),e("div",{staticStyle:{"margin-bottom":"80px"}},[e("span",{staticClass:"group-title"},[t._v("填报人信息")]),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"weui-cells"},[e("div",{staticClass:"flex s_b_b"},[t._m(2),t._v(" "),e("div",{staticClass:"weui-cell size15 max_w"},[e("div",{staticClass:"weui-cell__hd"}),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("img",{staticStyle:{width:"30px",position:"absolute",top:"50%",transform:"translateY(-50%)"},attrs:{src:a("wRmx"),alt:"avatar"}}),t._v(" "),e("input",{staticClass:"weui-input",staticStyle:{"padding-left":"35px"},attrs:{type:"text","auto-complete":"off",placeholder:t.planData.creatorInfo.creator,readonly:t.planData.creatorInfo.read}})]),t._v(" "),e("div",{staticClass:"weui-cell__ft"})])])]),t._v(" "),e("div",{staticClass:"weui-cells"},[e("div",{staticClass:"flex s_b_b"},[t._m(3),t._v(" "),e("div",{staticClass:"weui-cell size15 max_w"},[e("div",{staticClass:"weui-cell__hd"}),t._v(" "),e("div",{staticClass:"weui-cell__bd"},[e("input",{staticClass:"weui-input",attrs:{type:"text","auto-complete":"off",placeholder:t.planData.creatorInfo.fromWhere,readonly:t.planData.creatorInfo.read}})]),t._v(" "),e("div",{staticClass:"weui-cell__ft"})])])]),t._v(" "),e("span",{staticClass:"group-title"},[t._v("次日计划信息")]),t._v(" "),e("edit-input",{attrs:{edit_input_list:t.planData.planInfo}}),t._v(" "),e("span",{staticClass:"group-title"},[t._v("工作内容")]),t._v(" "),e("edit-input",{attrs:{edit_input_list:t.planData.workInfo}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}]},[e("span",{staticClass:"group-title"},[t._v("关联信息")]),t._v(" "),e("edit-input",{attrs:{edit_input_list:t.planData.bindInfo}})],1),t._v(" "),e("span",{staticClass:"group-title"},[t._v("其他")]),t._v(" "),e("edit-input",{attrs:{edit_input_list:t.planData.otherInfo}})],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!isEdit"}],staticStyle:{position:"fixed",bottom:"10px",width:"90%",left:"0",right:"0",margin:"0 auto"}},[e("button",{staticClass:"weui-btn weui-btn_primary",on:{click:function(i){t.isEdit=!0}}},[t._v("编辑计划")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],staticStyle:{position:"fixed",bottom:"10px",width:"90%",left:"0",right:"0",margin:"0 auto",display:"flex","justify-content":"space-around","align-items":"center"}},[e("div",{staticStyle:{width:"45%"}},[e("button",{staticClass:"weui-btn weui-btn_warn",on:{click:function(i){t.isEdit=!1}}},[t._v("取消")])]),t._v(" "),e("div",{staticStyle:{width:"45%"}},[e("button",{staticClass:"weui-btn weui-btn_primary",on:{click:function(i){t.isEdit=!1}}},[t._v("完成")])])])],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"weui_cell_hd"},[i("i",{staticClass:"icon icon-2 f20"})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"weui_cell_bd weui_cell_primary"},[i("span",[this._v("收缩展开")]),this._v(" "),i("i",{staticClass:"iconfont"},[this._v("")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"input_left_w105 size15 pl15 color_6"},[i("span",[this._v("创建人")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"input_left_w105 size15 pl15 color_6"},[i("span",[this._v("归属信息")])])}]};var o=a("C7Lr")(r,l,!1,function(t){a("pc94")},null,null);i.default=o.exports}});
//# sourceMappingURL=4.10d9b9eeda9191c20f4e.js.map