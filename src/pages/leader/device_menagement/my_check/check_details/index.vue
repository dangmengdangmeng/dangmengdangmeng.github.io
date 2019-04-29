<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">基本信息</div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">盘点信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="bg_white p10_15 flex">
      <div class="w120">机身编号</div>
      <div class="max_w">
        <img class="img50" src="/static/images/4.png" alt>
      </div>
      <div class="s_b_b1"></div>
    </div>
    <div class="bg_white p10_15 flex">
      <div class="w120">固资编号</div>
      <div class="max_w">
        <img class="img50" src="/static/images/4.png" alt>
      </div>
      <div class="s_b_b1"></div>
    </div>
    <div class="bg_white p10_15 flex">
      <div class="w120">仪器与配件</div>
      <div class="max_w">
        <img class="img50" src="/static/images/4.png" alt>
      </div>
      <div class="s_b_b1"></div>
    </div>
    <div class="bg_white p10_15 flex">
      <div class="w120">仪器与本人证明</div>
      <div class="max_w">
        <img class="img50" src="/static/images/4.png" alt>
      </div>
    </div>
    <div class="p10_15">其他信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
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
        {
          v: "编号",
          value: "PD9237222",
          class: "w120",
          no_arrow: true
        },
        {
          v: "设备名称",
          value: "钢轨廓形仪",
          class: "w120",
          no_arrow: true
        },
        {
          v: "设备序列",
          value: "M17198719",
          class: "w120",
          no_arrow: true
        },
        {
          v: "盘点人",
          value: "张三",
          hide_broder: true,
          class: "w120",
          no_arrow: true
        }
      ],
      edit_input1: [
        {
          v: "设备状态",
          value: "正常",
          hide_broder: true,
          class: "w120",
          no_arrow: true
        }
      ],
      edit_input2: [
        {
          v: "创建时间",
          value: "2019-01-12",
          class: "w120",
          no_arrow: true

        },
        {
          v: "最后更新",
          value: "2019-01-12",
          hide_broder: true,
          class: "w120",
          no_arrow: true
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
