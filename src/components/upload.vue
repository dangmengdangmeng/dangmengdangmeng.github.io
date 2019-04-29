<template>
  <div class="flex wrap">
    <div
      class="upload_box rl mb5 mr5"
      :class="!upload_info?'img50':upload_info.class"
      @click="upload_"
    >
      <div class="row_line line_"></div>
      <div class="column_line line_"></div>
    </div>
    <div
      class="mr5 mb5"
      :class="[!upload_info?'img50':upload_info.class]"
      v-for="(item,index) in upload_arr"
      :key="index"
    >
      <img class="w_100 h_100" :src="item" alt>
      <div class="del_img_btn" @click="del_img(index)">
        <img src="/static/images/close.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["upload_info"],
  data() {
    return {
      upload_arr: []
    };
  },
  methods: {
    upload_() {
      wx.chooseImage({
        success: res => {
          this.upload_arr = this.upload_arr.concat(res.tempFilePaths);
          this.$emit("cb", this.upload_arr);
        }
      });
    },
    del_img(idx) {
      this.$fun.confirm_modal("提示", "确认要删除吗", true, res => {
        if (res.confirm) {
          this.upload_arr.splice(idx, 1);
          this.$emit("cb", this.upload_arr);
        }
      });
    }
  }
};
</script>
<style scoped>
.upload_box {
  border: 1px solid #d9d9d9;
}
.line_ {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #999;
}
.row_line {
  width: 50%;
  height: 1px;
}
.column_line {
  width: 1px;
  height: 50%;
}
.del_img_btn {
  position: absolute;
  right: 2px;
  top: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
}
.del_img_btn img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
}
</style>