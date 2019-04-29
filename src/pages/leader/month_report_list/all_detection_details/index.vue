<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15 t_center">2019年1月全项目检测</div>
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">报告汇总数据</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">检测信息</div>
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
          value: "全项目检测"
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
          v: "意向年计划(公里)",
          value: "3000"
        },
        {
          v: "实际检测公里数",
          value: "500"
        },
        {
          v: "上月累计",
          value: "1500"
        },
        {
          v: "累计计算值",
          value: "2000"
        },
        {
          v: "完成比率",
          value: "66.7%",
          hide_border: true
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
          v: "线路名",
          value: "沈于"
        },
        {
          v: "月检测公里数",
          value: "500"
        },
        {
          v: "月检测公里数(合计)",
          value: "500",
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
