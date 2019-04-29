<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">编辑明细</div>
      <div class="bg_white pb100" style="min-height:300px">
        <div
          class="flex t_center b_t"
          :class="[index==table_info.length-1?'b_b':'']"
          v-for="(item,index) in table_info"
          :key="index"
        >
          <div class="w70 ptb5 b_r" style="min-height:34px">{{item[0]}}</div>
          <div class="max_w ptb5 b_r" style="min-height:34px">{{item[1]}}</div>
          <div class="w70 ptb5 b_r" style="min-height:34px">{{item[2]}}</div>
          <div class="w70 ptb5" style="min-height:34px">{{item[3]}}</div>
        </div>

        <div class="w_100 plr15 page_center_box">
          <div class="w_100 flex_space_between">
            <div>合计</div>
            <div>3</div>
          </div>
          <div class="flex_space_between ptb10">
            <input
              class="max_w mr10 ptb5 pl10 size15"
              type="text"
              style="border:1px solid #999;"
              placeholder="请输入序号"
            >
            <img class="img30 mr10" src="/static/images/code_btn.png" alt>
            <div class="page_add_btn" @click="show_device_modal=true">新增</div>
          </div>
        </div>
      </div>
      <f_button :button_list="button_list" @cb="button_cb"></f_button>
    </div>
    <msg_panel v-if="show_result"  :paramsObj="paramsObj"></msg_panel>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import msg_panel from "@/components/msg_panel";

export default {
  components: {
    f_button,
    msg_panel
  },
  data() {
    return {
      show_result: false,
       paramsObj: {
        title: "编辑成功",
        descList: ["编号为EO13543545,设备状态编辑成功."],
        btnList: [
          {
            text: "返回工作台",
            link: true
          },
          {
            text: "关闭",
            link: true,
            default: true
          }
        ]
      },
      table_info: [
        ["序号", "设备名称", "原始状态", "当前状态"],
        ["1", "轨道检测仪", "", ""],
        ["", "M9812739821", "正常", "故障"],
        ["", "M9812739821", "正常", "故障"]
      ],
      button_list: [
        {
          text: "编辑"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.show_result = true;
    },
    go_page(url) {
      wx.navigateTo({ url: url });
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
.page_center_box {
  position: absolute;
  left: 0;
  bottom: 0;
}
.page_add_btn {
  background: #1aad19;
  color: #fff;
  border-radius: 5px;
  padding: 5px 15px;
}
</style>
