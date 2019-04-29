<template>
  <div class="color_f6 w_h100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb"></page_top_info>
    <radio-group class="w_100" @change="radioChange">
      <div class="p10_15 bg_white" v-for="(item_,index_) in radio_list" :key="index_">
        <div class="s_b_b1" v-if="!item_.hide_border"></div>
        <label class="w_100  flex" :for="item_.id">
          <img class="w30 h30 mr10" src="/static/images/4.png" alt>
          <div>张三</div>
        </label>
        <radio class="radio_item_" :id="item_.id" :value="item_.value" :checked="item_.checked"></radio>
      </div>
    </radio-group>
    <f_button :button_list="button_list" @cb="show_picker"></f_button>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
import f_button from "@/components/f_button";
import page_top_info from "@/components/page_top_info";
export default {
  name: "work_bench",
  components: {
    list_item,
    page_top_info,
    f_button
  },
  data() {
    return {
      button_list: [
        {
          text: "开始求助"
        }
      ],
      radio_list: [
        {
          id: 1,
          value: "张三"
        },
        {
          id: 2,
          value: "张三1",
          hide_border:true,
        }
      ],
      page_top_info: {
        hide_filter: true,
        hide_scan: true,
        placeholder: "请输入要求助的人员"
      }
    };
  },
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    radioChange(e) {
      console.log(e.target.value);
    }
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
.radio_item_ {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
