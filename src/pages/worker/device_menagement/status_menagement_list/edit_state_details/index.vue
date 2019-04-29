<template>
  <div class="color_f6 w_h100 size14 page_box">
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">编辑明细</div>
    <div class="bg_white">
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
      </div>
    </div>
    <div class="p10_15">编辑信息</div>
    <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
    <div class="p10_15">其他信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import edit_textarea from "@/components/edit_textarea";

export default {
  components: {
    edit_input,
    edit_textarea
  },
  data() {
    return {
      table_info: [
        ["序号", "设备名称", "原始状态", "当前状态"],
        ["1", "轨道检测仪", "", ""],
        ["", "M9812739821", "正常", "故障"],
        ["", "M9812739821", "正常", "故障"]
      ],
      edit_input: [
        {
          v: "编号",
          value: "EO123654"
        },
        {
          v: "更改时间",
          value: "2019-01-12"
        },
        {
          v: "操作人",
          value: "张三",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "创建时间",
          value: "2019-01-01 09:23:12"
        },
        {
          v: "最后更新",
          value: "2019-01-01 09:23:12",
          hide_border: true
        }
      ],
      edit_textarea: {
        v: "备注",
        value: "备注信息"
      },
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
</style>
