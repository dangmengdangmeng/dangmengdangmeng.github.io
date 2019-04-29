<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">设备信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">领用信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">归还信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <div class="flex p10_15 bg_white size15">
      <div class="input_left_w105">图片</div>
      <div class="flex wrap">
        <img class="img40 mr10" src="/static/images/4.png" alt>
        <img class="img40 mr10" src="/static/images/4.png" alt>
        <img class="img40 mr10" src="/static/images/4.png" alt>
      </div>
    </div>
    <edit_input :edit_input="edit_input3"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
export default {
  name: "work_bench",
  components: {
    edit_input
  },
  data() {
    return {
      edit_input: [
        { v: "设备名称", value: "钢轨廓形仪" },
        { v: "设备序列", value: "M0192123" },
        { v: "责任人", value: "北一" },
        { v: "类型", value: "领用", hide_border: true }
      ],
      edit_input1: [
        { v: "编号", value: "EO1809231" },
        { v: "领用人", value: "张三" },
        { v: "领用时间", value: "2019-01-12 09:00:12" },
        { v: "仓管员", value: "王三" },
        { v: "备注", value: "备注信息", hide_border: true }
      ],
      edit_input2: [
        { v: "编号", value: "EO1809231" },
        { v: "归还人", value: "张三" },
        { v: "归还时间", value: "2019-01-12 09:00:12" },
        { v: "归还状态", value: "正常" },
        {
          v: "仓管员",
          value: "王三"
        }
      ],
      edit_input3: [{ v: "备注", value: "备注信息", hide_border: true }],
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
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
.next_btn {
  color: #fff;
  background: #1aad19;
  padding: 8px 0;
  text-align: center;
  border-radius: 6px;
}
</style>
