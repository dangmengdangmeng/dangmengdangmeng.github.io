webpackJsonp([14],{fxOb:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("d1hq"),s=(i.a,{components:{EditInput:i.a},data:function(){return{isEdit:!1,planData:{},mockData:[{id:"1",creatorInfo:{creator:"张三",avatar:"",fromWhere:"京广高铁工务段信阳东站",read:!0},planInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"上线时间",v:"2019-01-13",read:!0},{k:"下线时间",v:"2019-01-13",read:!0}],workInfo:[{k:"作业类型",v:"非上线计划",read:!0},{k:"工作类型",v:"办公室作业",read:!0},{k:"工作路局",v:"武汉",read:!0},{k:"工作地点",v:"京广高铁工务段信阳东站",read:!0},{k:"备注",v:"京广高铁工务段信阳东站",read:!0}],otherInfo:[{k:"创建时间",v:"2019-01-12 16:47:22",read:!0},{k:"最后更新",v:"2019-01-12 16:47:22",read:!0}],bindInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"日报日期",v:"2019-01-12",read:!0},{k:"关联时间",v:"2019-01-12 12:12:23",read:!0}]},{id:"2",creatorInfo:{creator:"李四",avatar:"",fromWhere:"京广高铁工务段信阳东站"},planInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"上线时间",v:"2019-01-13",read:!0},{k:"下线时间",v:"2019-01-13",read:!0}],workInfo:[{k:"作业类型",v:"非上线计划",read:!0},{k:"工作类型",v:"办公室作业",read:!0},{k:"工作路局",v:"武汉",read:!0},{k:"工作地点",v:"京广高铁工务段信阳东站",read:!0},{k:"备注",v:"京广高铁工务段信阳东站",read:!0}],otherInfo:[{k:"创建时间",v:"2019-01-12 16:47:22",read:!0},{k:"最后更新",v:"2019-01-12 16:47:22",read:!0}],bindInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"日报日期",v:"2019-01-12",read:!0},{k:"关联时间",v:"2019-01-12 12:12:23",read:!0}]},{id:"3",creatorInfo:{creator:"王五",avatar:"",fromWhere:"京广高铁工务段信阳东站"},planInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"上线时间",v:"2019-01-13",read:!0},{k:"下线时间",v:"2019-01-13",read:!0}],workInfo:[{k:"作业类型",v:"非上线计划",read:!0},{k:"工作类型",v:"办公室作业",read:!0},{k:"工作路局",v:"武汉",read:!0},{k:"工作地点",v:"京广高铁工务段信阳东站",read:!0},{k:"备注",v:"京广高铁工务段信阳东站",read:!0}],otherInfo:[{k:"创建时间",v:"2019-01-12 16:47:22",read:!0},{k:"最后更新",v:"2019-01-12 16:47:22",read:!0}],bindInfo:[{k:"编号",v:"EO1809231814196051",read:!0},{k:"日报日期",v:"2019-01-12",read:!0},{k:"关联时间",v:"2019-01-12 12:12:23",read:!0}]}]}},created:function(){var t=this;this.mockData.forEach(function(a,e){t.$route.params.id===a.id&&(t.planData=a)})}}),r={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("div",{staticStyle:{"margin-bottom":"80px"}},[i("span",{staticClass:"group-title"},[t._v("填报人信息")]),t._v(" "),i("br"),t._v(" "),i("div",{staticClass:"weui-cells"},[i("div",{staticClass:"flex s_b_b"},[t._m(0),t._v(" "),i("div",{staticClass:"weui-cell size15 max_w"},[i("div",{staticClass:"weui-cell__hd"}),t._v(" "),i("div",{staticClass:"weui-cell__bd"},[i("img",{staticStyle:{width:"30px",position:"absolute",top:"50%",transform:"translateY(-50%)"},attrs:{src:e("wRmx"),alt:"avatar"}}),t._v(" "),i("input",{staticClass:"weui-input",staticStyle:{"padding-left":"35px"},attrs:{type:"text","auto-complete":"off",placeholder:t.planData.creatorInfo.creator,readonly:t.planData.creatorInfo.read}})]),t._v(" "),i("div",{staticClass:"weui-cell__ft"})])])]),t._v(" "),i("div",{staticClass:"weui-cells"},[i("div",{staticClass:"flex s_b_b"},[t._m(1),t._v(" "),i("div",{staticClass:"weui-cell size15 max_w"},[i("div",{staticClass:"weui-cell__hd"}),t._v(" "),i("div",{staticClass:"weui-cell__bd"},[i("input",{staticClass:"weui-input",attrs:{type:"text","auto-complete":"off",placeholder:t.planData.creatorInfo.fromWhere,readonly:t.planData.creatorInfo.read}})]),t._v(" "),i("div",{staticClass:"weui-cell__ft"})])])]),t._v(" "),i("span",{staticClass:"group-title"},[t._v("次日计划信息")]),t._v(" "),i("edit-input",{attrs:{edit_input_list:t.planData.planInfo}}),t._v(" "),i("span",{staticClass:"group-title"},[t._v("工作内容")]),t._v(" "),i("edit-input",{attrs:{edit_input_list:t.planData.workInfo}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}]},[i("span",{staticClass:"group-title"},[t._v("关联信息")]),t._v(" "),i("edit-input",{attrs:{edit_input_list:t.planData.bindInfo}})],1),t._v(" "),i("span",{staticClass:"group-title"},[t._v("其他")]),t._v(" "),i("edit-input",{attrs:{edit_input_list:t.planData.otherInfo}})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!isEdit"}],staticStyle:{position:"fixed",bottom:"10px",width:"90%",left:"0",right:"0",margin:"0 auto"}},[i("button",{staticClass:"weui-btn weui-btn_primary",on:{click:function(a){t.isEdit=!0}}},[t._v("编辑计划")])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],staticStyle:{position:"fixed",bottom:"10px",width:"90%",left:"0",right:"0",margin:"0 auto",display:"flex","justify-content":"space-around","align-items":"center"}},[i("div",{staticStyle:{width:"45%"}},[i("button",{staticClass:"weui-btn weui-btn_warn",on:{click:function(a){t.isEdit=!1}}},[t._v("取消")])]),t._v(" "),i("div",{staticStyle:{width:"45%"}},[i("button",{staticClass:"weui-btn weui-btn_primary",on:{click:function(a){t.isEdit=!1}}},[t._v("完成")])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input_left_w105 size15 pl15 color_6"},[a("span",[this._v("创建人")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input_left_w105 size15 pl15 color_6"},[a("span",[this._v("归属信息")])])}]};var n=e("C7Lr")(s,r,!1,function(t){e("nzjd")},null,null);a.default=n.exports},nzjd:function(t,a){}});
//# sourceMappingURL=14.0bbc8f5c0cdd14b9d9ab.js.map