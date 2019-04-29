<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb" @filter_cb="filter_cb"></page_top_info>
    <list_item :list_item="list"></list_item>
    <!-- <f_button :button_list="button_list" @cb="button_cb"></f_button> -->
    <slide_panel :paramsObj="paramsObj1"></slide_panel>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    f_button,
    list_item,
    page_top_info,
    slide_panel
  },
  data() {
    return {
      paramsObj1: {
        isPanelShow: false,
        show_filter_btn: true,
        filter_btn_list: ["一周", "一个月", "三个月"],
        edit_time: [
          {
            v: "开始日期",
            placeholder: "请选择计划上传日期"
          },
          {
            v: "结束日期",
            placeholder: "请选择计划上传日期"
          },{
            v: "年月",
            placeholder: "请选择年月"
          }
        ],
        edit_picker: [
          {
            v: "路局",
            placeholder:'请选择路局',
            list: ['路局','路局1']
          }, {
            v: "计划类型",
            placeholder:'请选择计划类型',
            list: ['计划类型','计划类型1']
          },
        ]
      },
      page_top_info: {
        hide_scan: true,
        placeholder: "请输入要搜索的计划"
      },
      button_list: [
        {
          text: "新建计划"
        }
      ],
      list: [
        {
          title: "2018年各路局线路年计划",
          type: "2019年",
          time: "2019-11-12 05:01:12",
          status: "京沈",
          link:'/pages/leader/year_plan_list/year_plan_details/main?type=线路'
        },
        {
          title: "2018年各路局道岔年计划",
          type: "2019年",
          time: "2019-11-12 05:01:12",
          status: "京沈",
          link:'/pages/leader/year_plan_list/year_plan_details/main?type=道岔',
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
     
    },
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    search_cb(val) {
      console.log(val);
    },
    filter_cb() {
      this.paramsObj1.isPanelShow = true;
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
</style>
