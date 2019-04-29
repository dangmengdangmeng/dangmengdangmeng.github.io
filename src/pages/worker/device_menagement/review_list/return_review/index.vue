<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">归还信息</div>
    <table_ :table_info="table_info"></table_>
    <div class="p10_15 bg_white flex_space_between">
      <div>合计</div>
      <div>3</div>
    </div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">其他信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import f_button from "@/components/f_button";
import table_ from "@/components/table";
export default {
  name: "work_bench",
  components: {
    edit_input,
    table_,
    f_button
  },
  data() {
    return {
      button_list: [{ text: "审核" }],
      table_info: {
        title: {
          num: "序号",
          name: "设备名称",
          num1: "数量",
          state: "设备状态",
          img_num: "图片数量"
        },
        list: [
          {
            num: "1",
            name: "轨道检测仪",
            num1: "2",
            img_num: "2",
            state: "正常"
          },
           {
            num: "1",
            name: "轨道检测仪",
            num1: "2",
            img_num: "2",
            state: "正常"
          }, {
            num: "1",
            name: "轨道检测仪",
            num1: "2",
            img_num: "2",
            state: "正常"
          },
        ]
      },
      edit_input: [
        {
          v: "编号",
          value: "M0192123"
        },
        {
          v: "部门",
          value: "京沈"
        },
        {
          v: "领用人",
          value: "张三"
        },
        {
          v: "备注",
          value: "备注信息",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "仓管员",
          value: "张三",
          hide_border: true
        }
      ],
      edit_input2: [
        {
          v: "创建时间",
          value: "2019-01-12 09:00:12"
        },
        {
          v: "更新时间",
          value: "2019-01-12 09:00:12",
          hide_border: true
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.$fun.confirm_modal("审核", "确认设备已领用", true, res => {});
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
