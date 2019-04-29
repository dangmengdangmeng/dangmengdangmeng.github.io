<template>
  <div class="flow-container">
    <div class="flow__bd">
      <template v-for="(item, index) in paramsList" wx:key="index">
        <div class="flow__item" :key="index">
          <div 
            :class="['flow__item-state', item.isActive ? 'flow__item-active' : '']" 
            :style="[item.isDone ? 'background-color: #09bb07;' : '']"
          >
            {{item.stepCount}}
          </div>
          <div 
            :class="[
              'flow__item-title', 
              item.isActive ? 'flow__item-title-active' : '', 
              item.isDone ? 'flow__item-title-done' : 'flow__item-title-undone'
            ]"
          >
            {{item.title}}
          </div>
        </div>
        <!-- 连接线 -->
        <div 
          class="flow__line"
          :key="index" 
          v-show="index !== paramsList.length - 1"
        >
          <div 
            :class="[
              'flow__line-state', 
              item.isDone ? 'flow__line-done' : ''
            ]" 
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'flow',
    components: {},
    data () {
      return {}
    },
    props: ['paramsList']
  }
</script>
<style>
.flow-container {
  padding: 30rpx 80rpx 80rpx;
}
.flow__bd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flow__item {
  width: 50rpx;
  height: 50rpx;
  position: relative;
  z-index: 1;
}
.flow__item-state {
  background-color: #e2e2e2;
  position: absolute;
  left: 0;
  top: 0;
  width: 50rpx;
  height: 50rpx;
  font-size: 32rpx;
  line-height: 50rpx;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  box-sizing: border-box;
}
.flow__item-title {
  position: absolute;
  top: 70rpx;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 32rpx;
  font-weight: normal;
  white-space: nowrap;
  text-align: center;

}
.flow__item-title-undone {
  color: #999;
}
.flow__item-title-done {
  color: #333;
}
.flow__line {
  flex: 1;
  background-color: #e2e2e2;
  height: 10rpx;
  position: relative;

}
.flow__line-state {
  display: none;
  background-color: #09bb07;
  height: 10rpx;
  position: relative;
}
.flow__line-done {
  display: block;
}
.flow__item-active {
  color: #fff;
  background: #ccc;
}
.flow__item-title-active {
  color: #09bb07;
}
</style>