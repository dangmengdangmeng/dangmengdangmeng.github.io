<template>
  <div class="flex p10_15 bg_white" style="align-items:flex-start">
    <div class="s_b_b1" v-if="!edit_textarea.hide_border"></div>
    <div :class="edit_textarea.class?edit_textarea.class:'w105'" v-if="edit_textarea.v">
      <span class="required" v-show="edit_textarea.required">*</span>
      <span @click="show_area=false">{{edit_textarea.v}}</span>
    </div>
    <div v-if="!edit_textarea.no_arrow" class="right_ft1"></div>
    <input type="text" class="max_w" v-if="!edit_textarea.value " @input="get_textarea_val" :placeholder="edit_textarea.placeholder">
    <!-- <textarea
      v-if="!edit_textarea.value "
      class="max_w h60 pt3"
      :placeholder="edit_textarea.placeholder"
      @input="get_textarea_val"
    ></textarea>-->
    <!-- && show_area
    :focus="show_area"
    value="edit_textarea.value1"-->
    <!-- @blur="show_area=false" -->
    <!-- <div
      class="max_w pt3 pr10 box_min_h"
      v-if="!edit_textarea.value && !show_area"
      @click="show_area=true"
    >{{edit_textarea.value1?edit_textarea.value1:edit_textarea.placeholder}}</div>-->
    <div class="max_w pt3 pr10 box_min_h" v-if="edit_textarea.value">{{edit_textarea.value}}</div>
  </div>
</template>
<script>
export default {
  props: ["edit_textarea"],
  data() {
    return { show_area: false };
  },
  created() {},
  methods: {
    get_textarea_val(e) {
      this.$emit("cb", e.mp.detail.value);
    }
  }
};
</script>
<style scoped>
.box_min_h {
  height: 60px;
}
</style>


