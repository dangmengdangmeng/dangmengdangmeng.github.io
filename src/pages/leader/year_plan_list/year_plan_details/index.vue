<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15 t_center">2019年各路局{{sele_type}}年计划</div>
    <div class="p10_15">计划信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div v-if="sele_type=='线路'">
      <div class="p10_15">计划内容</div>
      <edit_input :edit_input="edit_input2"></edit_input>
      <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
    </div>
    <div v-if="sele_type=='道岔'">
      <div class="p10_15">计划内容1</div>
      <edit_input :edit_input="edit_input2_1"></edit_input>
      <div class="p10_15">计划内容2</div>
      <edit_input :edit_input="edit_input2_2"></edit_input>
      <div class="p5_15"></div>
      <edit_input :edit_input="edit_input2_3"></edit_input>
    </div>
    <div class="p10_15">其他</div>
    <edit_input :edit_input="edit_input3"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import edit_textarea from "@/components/edit_textarea";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    edit_input,
    list_item,
    page_top_info,
    slide_panel,
    edit_textarea
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
          v: "计划名称",
          value: "",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "计划类型",
          value: "各路局线路年计划"
        },
        {
          v: "年份",
          value: "2019年"
        },
        {
          v: "路局",
          value: "武汉",
          hide_border: true
        }
      ],
      edit_textarea: {
        v: "备注",
        value:
          "2019年1月10日上午在武汉路局信阳东站，主要工作内容是在办公室写技术报告",
        hide_border: true
      },
      edit_input2: [
        {
          v: "线路名",
          value: "成渝线"
        },
        {
          v: "工务段",
          value: "高铁工务段"
        },
        {
          v: "行别",
          value: "上行"
        },
        {
          v: "开始日期",
          value: "2018-12-31"
        },
        {
          v: "结束日期",
          value: "2018-12-31"
        },
        {
          v: "起点里程",
          value: "42"
        },
        {
          v: "终点里程",
          value: "43"
        },
        {
          v: "天窗数量",
          value: "34"
        },
        {
          v: "天窗时长",
          value: "53"
        },
        {
          v: "公里数",
          value: "53"
        }
      ],
      edit_input2_1: [
        {
          v: "线路名",
          value: "京沈线"
        },
        {
          v: "工务段",
          value: "高铁工务段"
        },
        {
          v: "道岔组数",
          value: "18"
        },
        {
          v: "车组数",
          value: "8",
          hide_border: true
        }
      ],
      edit_input2_2: [
        {
          v: "线路名",
          value: "京沈线"
        },
        {
          v: "工务段",
          value: "高铁工务段"
        },
        {
          v: "道岔组数",
          value: "18"
        },
        {
          v: "车组数",
          value: "8",
          hide_border: true
        }
      ],
      edit_input2_3: [
        {
          v: "道岔组数(合计)",
          value: "18"
        },
        {
          v: "车组数(合计)",
          value: "8",
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
  onLoad(options) {
    if (options.type) {
      this.edit_input[1].value = "2019年各路局" + options.type + "年计划";
      this.sele_type = options.type;
    }
  },
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
