<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb" @filter_cb="filter_cb"></page_top_info>
    <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
    <list_item :list_item="list"></list_item>
    <slide_panel :paramsObj="paramsObj"></slide_panel>
  </div>
</template>
<script>
import nav_bar from "@/components/nav_bar";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    nav_bar,
    list_item,
    page_top_info,
    slide_panel
  },
  data() {
    return {
      paramsObj: {
        isPanelShow: false,
        show_filter_btn:true,
        filter_btn_list:['一周','一个月','三个月'],
        edit_time: [
          {
            v: "盘点日期",
            placeholder: "请选择开始时间"
          }
        ],
        edit_radio: [
          {
            v: "盘点状态",
            list: [
              {
                value: "已盘点",
                checked: true
              },
              {
                value: "未盘点"
              }
            ]
          }
        ],
        edit_picker: [
          {
            v: "盘点人",
            placeholder: "请选择盘点人",
            list: [["盘点人", "盘点人1"]]
          }
        ]
      },
      page_top_info: {
        hide_scan: true,
        placeholder: "请输入要盘点的日期"
      },
      nav_bar: {
        cur: 0,
        list: ["盘点列表"]
      },
      list: [
        {
          title: "轨道检测仪",
          type: "张三",
          time: "M1233514",
          status: "未盘点",
          status_color: "red",
        },
        {
          title: "轨道检测仪",
          type: "张三",
          time: "M1233514",
          status: "已盘点",
          status_color: "blue"
        },
        {
          title: "轨道检测仪",
          type: "张三",
          time: "M1233514",
          status: "未盘点",
          status_color: "red",
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    search_cb(val) {
      console.log(val);
    },
    filter_cb() {
      this.paramsObj.isPanelShow = true;
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
