<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">阶段信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">填报信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">时间信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
export default {
  components: {
    edit_input
  },
  data() {
    return {
      edit_input: [
        {
          v: "名称",
          value: "****项目"
        },
        {
          v: "项目阶段",
          value: "合同签订",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "更新人",
          value: "张三"
        },
        {
          v: "打磨公里",
          value: "5.4"
        },
        {
          v: "更新进度",
          value: "15%"
        },
        {
          v: "备注",
          value: "备注信息",
          hide_border: true
        }
      ],
      edit_input2: [
        {
          v: "创建时间",
          value: "2018-11-19 16:12:12"
        },
        {
          v: "更新时间",
          value: "2018-11-19 16:12:12",
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {},
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
