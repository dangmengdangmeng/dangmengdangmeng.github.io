<template>
  <div class="p10_15 w_100 flex">
    <div class="flex bg_white max_w mr10 p5_10">
      <img class="w20 h20" src="/static/images/search.png" alt>
      <input
        type="text"
        class="pr35 max_w"
        :placeholder="!page_top_info?'请输入要搜索的设备/人员':page_top_info.placeholder"
        :value="input_val"
        @input="get_search_info"
      >
      <div class="clear_val_btn p10 w35 h35 size0" @click="clear_val">
        <img class="w_100 h_100" v-if="show_clear" src="/static/images/close1.png">
      </div>
    </div>
    <div class="flex" @click="get_filter" v-if="!page_top_info?true:!page_top_info.hide_filter">
      <div>筛选</div>
      <img class="w20 h20" src="/static/images/filter.png" alt>
    </div>
    <img
      class="w30 h30 ml10"
      @click="get_scan"
      src="/static/images/code_btn.png"
      v-if="!page_top_info?true:!page_top_info.hide_scan"
    >
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      show_clear: false,
      input_val: ""
    };
  },
  props: ["page_top_info"],
  onLoad(options) {},
  mounted() {},
  methods: {
    get_search_info(e) {
      var val = e.mp.detail.value;
      this.input_val = val;
      if (val.length > 0) {
        this.show_clear = true;
      } else {
        this.show_clear = false;
      }
      this.$emit("search_cb", val);
    },
    clear_val() {
      this.input_val = "";
      this.show_clear = false;
    },
    get_filter() {
      this.$emit("filter_cb");
    },
    get_scan() {
      this.$emit("scan_cb");
    }
  },

  onUnload() {}
};
</script>
<style scoped>
.clear_val_btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}
</style>
