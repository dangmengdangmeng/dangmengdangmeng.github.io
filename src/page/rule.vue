<template>
  <div class="rule_mask">
    <img class="rule_bg" src="@/assets/images/rule_bg.jpg" alt>
    <img class="rule_text" src="@/assets/images/rule_text.png" alt>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_rule: false,
      rank_list: []
    };
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}

.rule_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  overflow: hidden;
}
.rule_bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.rule_text {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 90%;
}
</style>