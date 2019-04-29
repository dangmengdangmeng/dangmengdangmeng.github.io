<template>
  <div style="height:100%;position:absolute;top:0;left:0;width:100%;">
    <div class="weui-mask" style="height:100vh"></div>
    <div class="weui-dialog dialog-position">
      <div class="weui-dialog__hd">
        <div class="weui-dialog__title" style="font-weight: bold;">新建次日计划</div>
      </div>
      <div class="weui-dialog__bd" style="color:#000;">日计划已创建，点击确定后保存。</div>
      <div class="weui-dialog__ft">
        <a class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('cancelSave')">取消</a>
        <a class="weui-dialog__btn weui-dialog__btn_primary" @click="onSave">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSave () {
      this.$emit('cancelSave')
      this.$emit('confirmSave')
    }
  }
}
</script>

<style scoped>
.dialog-position {
  position: absolute;
  top: 40% !important;
}
</style>
