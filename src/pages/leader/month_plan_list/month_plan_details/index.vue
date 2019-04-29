<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15 t_center">2019年1月度计划{{sele_type}}</div>
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="bg_white" v-if="sele_type=='走访及培训'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容</div>
      <month_plan_table :month_plan_info="type1_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='车轮调查'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容1</div>
      <month_plan_table :month_plan_info="type2_arr"></month_plan_table>
      <div class="p10_15" style=" background: #f5f5f5;">计划内容2</div>
      <month_plan_table :month_plan_info="type2_1_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='线路调查'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容</div>
      <month_plan_table :month_plan_info="type3_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='钢轨打磨设计'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容</div>
      <month_plan_table :month_plan_info="type4_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='道岔打磨设计'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容1</div>
      <month_plan_table :month_plan_info="type5_arr"></month_plan_table>
      <div class="p10_15" style=" background: #f5f5f5;">计划内容2</div>
      <month_plan_table :month_plan_info="type5_1_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='技术报告'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容</div>
      <month_plan_table :month_plan_info="type6_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='钢轨打磨作业指导'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容</div>
      <month_plan_table :month_plan_info="type7_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='道岔打磨作业指导'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容1</div>
      <month_plan_table :month_plan_info="type8_arr"></month_plan_table>
      <div class="p10_15" style=" background: #f5f5f5;">计划内容2</div>
      <month_plan_table :month_plan_info="type8_1_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='定期观测'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容</div>
      <month_plan_table :month_plan_info="type9_arr"></month_plan_table>
    </div>
    <div class="bg_white" v-if="sele_type=='道岔调查'">
      <div class="p10_15" style=" background: #f5f5f5;">计划内容1</div>
      <month_plan_table :month_plan_info="type10_arr"></month_plan_table>
      <div class="p10_15" style=" background: #f5f5f5;">计划内容2</div>
      <month_plan_table :month_plan_info="type10_1_arr"></month_plan_table>
    </div>
    <div class="p10_15 flex bg_white">
      <div class="w_30">备注</div>
      <div class="max_w t_center">京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站</div>
    </div>
    <div class="p10_15">其他</div>
    <div class="bg_white p10_15 flex">
      <div class="s_b_b1"></div>
      <div class="w105">创建人</div>
      <div class="max_w flex">
        <img class="w30 h30 mr5" src="/static/images/4.png">
        <div>李四</div>
      </div>
    </div>
    <edit_input :edit_input="edit_input1"></edit_input>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";
import month_plan_table from "@/components/month_plan_table";

export default {
  components: {
    edit_input,
    list_item,
    page_top_info,
    slide_panel,
    month_plan_table
  },
  data() {
    return {
      sele_type: "",
      edit_input: [
        {
          v: "编号",
          value: "EO2187389",
          no_arrow: true
        },
        {
          v: "计划类型",
          value: "月度计划走访及培训",
          no_arrow: true
        },
        {
          v: "年月",
          value: "2019年1月",
          no_arrow: true
        },
        {
          v: "路局",
          value: "武汉",
          hide_border: true
        }
      ],
      type1_arr: [
        {
          text: "走访普铁单位",
          text1: "京广信阳东站",
          text2: ""
        },
        {
          text: "走访普铁对象",
          text1: "处长",
          text2: ""
        },
        {
          text: "走访高铁单位",
          text1: "京广信阳东站",
          text2: ""
        },
        {
          text: "走访高铁对象",
          text1: "处长",
          text2: ""
        },
        {
          text: "走访对象",
          text1: "处长",
          text2: ""
        },
        {
          text: "内容",
          text1:
            "京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站京广信阳东站",
          text2: ""
        }
      ],
      type2_arr: [
        {
          text: "编组站名",
          text1: "京广信阳东站",
          text2: ""
        },
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "京广线",
          text2: ""
        },
        {
          text: "车轮数",
          text1: "125",
          text2: ""
        }
      ],
      type2_1_arr: [
        {
          text: "线路名",
          text1: "京广线",
          text2: ""
        },
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "编组站名",
          text1: "京广信阳东站",
          text2: ""
        },
        {
          text: "车轮数",
          text1: "125",
          text2: ""
        },
        {
          text: "车轮数(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type3_arr: [
        {
          text: "普铁线路名",
          text1: "普铁",
          text2: ""
        },
        {
          text: "高铁线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "线路数(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type4_arr: [
        {
          text: "普铁线路名",
          text1: "普铁",
          text2: ""
        },
        {
          text: "高铁线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "线路数(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type5_arr: [
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "车站明",
          text1: "北京站",
          text2: ""
        },
        {
          text: "计划数组",
          text1: "125",
          text2: ""
        }
      ],
      type5_1_arr: [
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "车站明",
          text1: "北京站",
          text2: ""
        },
        {
          text: "计划数组",
          text1: "125",
          text2: ""
        },
        {
          text: "计划数组(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type6_arr: [
        {
          text: "普铁技术报告",
          text1: "普铁",
          text2: ""
        },
        {
          text: "高铁技术报告",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "报告数量(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type7_arr: [
        {
          text: "普铁线路名",
          text1: "普铁",
          text2: ""
        },
        {
          text: "高铁线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "线路数(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type8_arr: [
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "车站名",
          text1: "北京站",
          text2: ""
        },
        {
          text: "道岔组数",
          text1: "125",
          text2: ""
        }
      ],
      type8_1_arr: [
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "车站名",
          text1: "北京站",
          text2: ""
        },
        {
          text: "道岔组数",
          text1: "125",
          text2: ""
        },
        {
          text: "道岔组数(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type9_arr: [
        {
          text: "普铁线路名",
          text1: "普铁",
          text2: ""
        },
        {
          text: "高铁线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "条数(合计)",
          text1: "125",
          text2: ""
        }
      ],
      type10_arr: [
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "车站名",
          text1: "北京站",
          text2: ""
        },
        {
          text: "道岔数量",
          text1: "50",
          text2: ""
        }
      ],
      type10_1_arr: [
        {
          text: "线路类型",
          text1: "普铁",
          text2: ""
        },
        {
          text: "线路名",
          text1: "沈山线",
          text2: ""
        },
        {
          text: "车站名",
          text1: "北京站",
          text2: ""
        },
        {
          text: "道岔数量",
          text1: "50",
          text2: ""
        },
        {
          text: "道岔数量(合计)",
          text1: "125",
          text2: ""
        }
      ],
      edit_input1: [
        {
          v: "创建时间",
          value: "2018-01-01 11:12:12",
          no_arrow: true
        },
        {
          v: "更新时间",
          value: "2018-01-01 11:12:12",
          hide_border: true,
          no_arrow: true
        }
      ]
    };
  },
  onLoad(options) {
    console.log(options.sele_type);
    if (options.sele_type) {
      this.edit_input[1].value = "月度计划" + options.sele_type;
      this.sele_type = options.sele_type;
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
