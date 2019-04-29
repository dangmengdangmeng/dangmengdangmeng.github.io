<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15 t_center">2019年1月度计划打磨车作业情况报告</div>
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">报告明细</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <edit_radio :edit_radio="edit_radio"></edit_radio>
    <edit_input :edit_input="edit_input2"></edit_input>
    <div class="p10_15">其他</div>
    <edit_input :edit_input="edit_input3"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import edit_radio from "@/components/edit_radio";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    edit_input,
    list_item,
    page_top_info,
    slide_panel,
    edit_radio
  },
  data() {
    return {
      sele_type: "",
      edit_input: [
        {
          v: "编号",
          value: "EO2187389"
        },
        {
          v: "计划类型",
          value: "打磨车作业情况"
        },
        {
          v: "年月",
          value: "2019年1月"
        },
        {
          v: "路局",
          value: "武汉",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "类型",
          value: "线磨"
        },
        {
          v: "车辆类型",
          value: "HARSCO 48"
        },
        {
          v: "车辆编号",
          value: "13830"
        },
        {
          v: "负责人",
          value: "魏立超"
        },
        {
          v: "联系电话",
          value: "18733131321"
        },
        {
          v: "车辆状态",
          value: "正常"
        },
        {
          v: "作业线路名称",
          value: "黎湛线"
        },
        {
          v: "实际作业天数",
          value: "12"
        }
      ],
      edit_radio: [
        {
          v: "是否服务",
          list: [
            {
              value: "是",
              checked: true
            },
            {
              value: "否"
            }
          ]
        }
      ],
      edit_input2: [
        {
          v: "开始位置",
          value: "30"
        },
        {
          v: "结束位置",
          value: "30"
        },
        {
          v: "作业数量(KM)",
          value: "30"
        },
        {
          v: "作业组数",
          value: "30",
          hide_border: true
        }
      ],
      edit_input3: [
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
