<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">出库位置</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">出库信息</div>
    <table_ :table_info="table_info"></table_>
    <div class="mt10 p10_15 bg_white flex_space_between">
      <div>合计</div>
      <div>3</div>
    </div>
    <div class="p10_15">其他信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import table_ from "@/components/table";
export default {
  name: "work_bench",
  components: {
    edit_input,
    table_
  },
  data() {
    return {
      table_info: {
        title: {
          num: "序号",
          name: "设备名称",
          num1: "固资编号"
        },
        list: [
          {
            num: "1",
            name: "轨道检测仪",
            num1: "My324135"
          },
          {
            num: "1",
            name: "轨道检测仪",
            num1: "My324135"
          },
          {
            num: "1",
            name: "轨道检测仪",
            num1: "My324135"
          }
        ]
      },
      edit_input: [
        {
          v: "编号",
          value: "M0192123"
        },
        {
          v: "出库人",
          value: "张三"
        },
        {
          v: "出库时间",
          value: "2019-01-02 21:12:12"
        },
        {
          v: "备注",
          value: "备注信息",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "出库单位",
          value: "事业部"
        },
        {
          v: "接收部门",
          value: "北方事业部"
        },
        {
          v: "备注",
          value: "xx跟车作业",
          hide_border: true
        }
      ],
      edit_input2: [
        {
          v: "创建时间",
          value: "2019-01-12 09:00:12",
          class: "w120"
        },
        {
          v: "更新时间",
          value: "2019-01-12 09:00:12",
          hide_border: true,
          class: "w120"
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
