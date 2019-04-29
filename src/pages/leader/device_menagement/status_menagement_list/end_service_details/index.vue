<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">基本信息</div>
      <edit_input :edit_input="edit_input"></edit_input>
      <div class="p10_15">开始维修明细</div>
      <edit_input :edit_input="edit_input1"></edit_input>
      <div class="p10_15">结束维修明细</div>
      <edit_input :edit_input="edit_input2"></edit_input>
      <div class="p10_15">开始维修信息</div>
      <edit_input :edit_input="edit_input3"></edit_input>
      <div class="p10_15">结束维修信息</div>
      <edit_input :edit_input="edit_input4"></edit_input>
      <div class="p10_15">其他信息</div>
      <edit_input :edit_input="edit_input5"></edit_input>
    </div>
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
          v: "编号",
          value: "EO123654"
        },
        {
          v: "维修人",
          value: "张三"
        },
        {
          v: "开始时间",
          value: "2019-01-12 09:23:12"
        },
        {
          v: "结束时间",
          value: "2019-01-12 09:23:12",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "设备名称",
          value: "廓形仪"
        },
        {
          v: "固资编号",
          value: "M545431"
        },
        {
          v: "故障描述",
          value: "描述内容"
        },
        {
          v: "故障责任人",
          value: "张三"
        },
        {
          v: "维修单位",
          value: "单位名称"
        },
        {
          v: "预估金额",
          value: "400"
        },
        {
          v: "仓管员",
          value: "张三",
          hide_border: true
        }
      ],
      edit_input2: [
        {
          v: "设备状态",
          value: "正常"
        },
        {
          v: "维修金额",
          value: "2019"
        },
        {
          v: "仓管员",
          value: "张三",
          hide_border: true
        }
      ],
      edit_input3: [
        {
          v: "开始时间",
          value: "2019-01-01 09:23:12"
        },
        {
          v: "备注",
          value: "备注",
          hide_border: true
        }
      ],
      edit_input4: [
        {
          v: "结束时间",
          value: "2019-01-01 09:23:12"
        },
        {
          v: "备注",
          value: "备注",
          hide_border: true
        }
      ],
      edit_input5: [
        {
          v: "创建时间",
          value: "2019-01-01 09:23:12"
        },
        {
          v: "最后更新",
          value: "2019-01-01 09:23:12",
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
