<template>
  <div class="bottom-button">
    <button
      v-for="(item, index) in paramsList"
      :key="index"
      :class="['weui-btn', item.type]"
      @tap="onTap(item)"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {
    },
    data () {
      return {

      }
    },
    props: ['paramsList'],
    methods: {
      onTap (item) { item.action() }
    }
  }
</script>
<style>
.bottom-button {
  width: 95%;
  position: fixed;
  bottom: 70rpx;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
}
</style>