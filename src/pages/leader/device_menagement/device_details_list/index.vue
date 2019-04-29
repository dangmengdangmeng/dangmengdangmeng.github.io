<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info
      :page_top_info="page_top_info"
      @search_cb="search_cb"
      @filter_cb="filter_cb"
      @scan_cb="scan_cb"
    ></page_top_info>
    <div class="p10_15">设备明细</div>
    <div class="w_100 plr15">
      <div class="w_100 bg_white">
        <div class="flex t_center" v-for="(item,index) in table_info" :key="index">
          <div class="ptb5 w80 border_">{{item[0]}}</div>
          <div class="ptb5 w60 border_ no_left">{{item[1]}}</div>
          <div class="ptb5 w70 border_ no_left">{{item[2]}}</div>
          <div class="ptb5 w70 border_ no_left">{{item[3]}}</div>
          <div class="ptb5 w70 border_ no_left">{{item[4]}}</div>
        </div>
      </div>
    </div>
    <div class="w_100 flex_space_between fx_b bg_white p10_15">
      <div>合计</div>
      <div class="flex">
        <div class="plr10">3</div>
        <div class="plr10">3</div>
        <div class="plr10">3</div>
        <div class="plr10">3</div>
      </div>
    </div>
    <slide_panel :paramsObj="paramsObj"></slide_panel>
  </div>
</template>
<script>
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";
export default {
  components: {
    page_top_info,
    slide_panel
  },
  data() {
    return {
      page_top_info: {
        placeholder: "请输入要搜索的设备"
      },
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
      table_info: [
        ["序列名称", "总数量", "领用数量", "库存数量", "维修数量"],
        ["钢轨廓形仪", "25000", "12000", "120000", "20000"],
        ["钢轨廓形仪", "1", "1", "1", "1"]
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    search_cb(res) {
      console.log(res);
    },
    filter_cb() {
      this.paramsObj.isPanelShow = true;
    },
    scan_cb() {
      wx.scanCode({
        success: res => {}
      });
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

.border_ {
  border: 1px solid #e0e0e0;
}
.no_left {
  border-left-color: transparent;
}
.no_right {
  border-right-color: transparent;
}
</style>
