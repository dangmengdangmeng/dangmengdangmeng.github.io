<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info
      :page_top_info="page_top_info"
      @search_cb="search_cb"
      @filter_cb="filter_cb"
      @scan_cb="scan_cb"
    ></page_top_info>
    <nav_bar :nav_bar="nav_bar" @cb="switch_nav"></nav_bar>
    <list_item :list_item="list" v-if="nav_bar.cur==0"></list_item>
    <div class="bg_white" v-if="nav_bar.cur==1">
      <div
        class="flex plr15 ptb20 rl"
        v-for="(item,index) in work_bench_item"
        :key="index"
        @click="go_page(item.link)"
      >
        <div class="s_b_b1" v-if="!item.hide_border"></div>
        <img v-if="item.img" :src="item.img" class="mr5 img20" alt>
        <div class="max_w" :class="item.no_arrow?'':'right_ft'">{{item.text}}</div>
        <div class="item_right_text" v-if="item.right_text">{{item.right_text}}</div>
      </div>
    </div>
    <list_item :list_item="list1" v-if="nav_bar.cur==2"></list_item>
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
        edit_time: [
          {
            v: "领用开始日期",
            placeholder: "请选择开始日期"
          },
          {
            v: "领用结束日期",
            placeholder: "请选择结束日期"
          }
        ],
        edit_picker: [
          {
            v: "设备来源",
            placeholder: "请选择设备来源",
            list: [["设备", "设备1"]]
          },
          {
            v: "设备状态",
            placeholder: "请选择设备状态",
            list: [["正常", "故障"]]
          }
        ]
      },
      page_top_info: {
        placeholder: "请输入要搜索的设备"
      },
      nav_bar: {
        cur: 0,
        list: ["全部设备", "人员使用", "维修列表"]
      },
      list: [
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "正",
          plan_color: "blue",
          time: "M1233514",
          status: "保养 领用",
          status_color: "green"
        },
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "使",
          plan_color: "blue",
          time: "M1233514",
          status: "转借",
          status_color: "green"
        },
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "障",
          plan_color: "red",
          time: "M1233514",
          hide_border: true,
          status: "维修",
          status_color: "red"
        }
      ],
      work_bench_item: [
        {
          text: "张三",
          right_text: "1",
          link:
            "/pages/worker/device_menagement/device_info_list/person_device_list/main"
        },
        {
          text: "张三",
          right_text: "1",
          link:
            "/pages/worker/device_menagement/device_info_list/person_device_list/main"
        },
        {
          text: "张三",
          right_text: "1",
          link:
            "/pages/worker/device_menagement/device_info_list/person_device_list/main"
        }
      ],
      list1: [
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "障",
          plan_color: "red",
          time: "2019-01-12 09:00:12",
          status: "维修中",
          status_color: "red"
        },
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "障",
          plan_color: "red",
          time: "2019-01-12 09:00:12",
          status: "维修中",
          status_color: "red"
        },
        {
          title: "轨道检测仪",
          type: "张三",
          plan_text: "障",
          plan_color: "red",
          time: "2019-01-12 09:00:12",
          hide_border: true,
          status: "维修中",
          status_color: "red"
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
    },
    scan_cb() {
      wx.scanCode({
        success: res => {
          console.log(res);
        }
      });
    },
    go_page(url) {
      wx.navigateTo({
        url: url
      });
    },
    switch_nav(idx) {
      // console.log(idx);
      this.nav_bar.cur = idx;
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
