<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">入库设备</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">其他信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_input from "@/components/input_item";
export default {
  name: "work_bench",
  components: {
    f_button,
    edit_input
  },
  data() {
    return {
      show_result: false,
      edit_input: [
        { v: "编号", value: "EO1809231" },
        { v: "入库人", value: "张三" },
        { v: "入库时间", value: "2019-01-12 09:12:12" },
        { v: "备注", value: "备注信息", hide_border: true }
      ],
      edit_input1: [
        { v: "设备名称", value: "轨道检测仪" },
        { v: "固资编号", value: "M7676720001", hide_border: true }
      ],
      edit_input2: [
        {
          v: "创建时间",
          value: "2019-01-12 09:23:12"
        },
        {
          v: "最后更新",
          value: "2019-01-12 09:23:12",
          hide_border: true
        }
      ],
      button_list: [
        {
          text: "查看设备详情"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.go_page("/pages/leader/device_menagement/warehouse_in/device_details/main");
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
.next_btn {
  color: #fff;
  background: #1aad19;
  padding: 8px 0;
  text-align: center;
  border-radius: 6px;
}
</style>
