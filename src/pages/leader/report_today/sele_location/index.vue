<template>
  <div class="color_f6 w_h100 size14 page_box">
    <div v-if="!show_sele_search">
      <edit_input :edit_input="edit_input" @cb="get_input_idx"></edit_input>
      <edit_picker :edit_picker="edit_picker"></edit_picker>
      <f_button :button_list="button_list" @cb="button_cb"></f_button>
    </div>
    <div
      class="select_location_mask size15"
      v-if="show_select_work_location"
      @click="show_select_work_location=false"
    >
      <input
        class="select_top_input bg_white p10_15"
        type="text"
        placeholder="请输入关键字"
        v-model="work_location_input_val"
        @input="get_input_val"
        @click.stop
      >
      <div class="select_location_list bg_white" @click.stop>
        <div
          class="p10_15"
          v-for="(item,index) in input_result1.length>0?input_result1:input_result"
          :key="index"
          @click="get_sele_val(item)"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import edit_picker from "@/components/edit_picker";
import f_button from "@/components/f_button";
export default {
  components: { edit_input, f_button, edit_picker },
  data() {
    return {
      edit_picker: [
        {
          v: "线路",
          placeholder: "请选择线路",
          list: [["线路", "线路1"]]
        },
        {
          v: "行别",
          placeholder: "请选择行别",
          list: [["行别", "行别1"]]
        },
        {
          v: "车站",
          placeholder: "请选择车站名",
          list: [["车站", "车站1"]],
          hide_border: true
        }
      ],
      edit_input: [
        {
          required: true,
          v: "工务段",
          value: "请选择工务段"
        }
      ],
      work_location_input_val: "",
      show_select_work_location: false,
      button_list: [{ text: "提交" }],
      input_result: ["上海", "北京", "广东",],
      input_result1: [],
      select_input_val: "请选择工作地点"
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    get_input_idx(res) {
      if (res == 0) {
        this.show_select_work_location = true;
      }
    },
    get_input_val() {
      var val = this.work_location_input_val,
        list = this.input_result;
      if (val != "") {
        this.input_result1 = [];
        for (var i in list) {
          if (list[i].search(val) != -1) {
            this.input_result1.push(list[i]);
          }
        }
      } else {
        this.input_result1 = [];
      }
    },
    get_sele_val(val) {
      this.select_input_val = val;
      this.show_select_work_location = false;
      this.edit_input[0].value = val;
    },
    button_cb() {
      wx.setStorageSync('sele_work_location',this.select_input_val)
      wx.navigateBack({
        delta:1
      })
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

.select_location_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding-top: 2px;
  z-index: 999;
}
.select_top_input {
  display: block;
  background: #fff;
  width: 98%;
  margin: 0 auto 2px;
}
.select_location_list {
  width: 98%;
  margin: 0 auto;
  padding-left: 2px;
  overflow-y: scroll;
  height: 160px;
}
</style>
