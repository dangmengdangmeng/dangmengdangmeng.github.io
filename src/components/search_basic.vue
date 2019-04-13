<template>
  <div>
    <div style="height:130rpx;" :class = "['weui-search-bar', isInputFocused ? 'weui-search-bar_focusing' : '']">
      <div class="weui-search-bar__form" style="display:block;">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search" style="margin-top:6rpx;"></i>
          <input
            type="text" 
            class="weui-search-bar__input" 
            :placeholder="search_basic.placeholder" 
            @blur="blurInput"
            @input="onInput"
            v-model="inputValue"
            style="display:block;"
            :focus="isInputFocused"
          />
          <a 
            class="weui-icon-clear" 
            @click="clearSearch"
            v-show="inputValue.trim()"
            style="display:block; color:#aaa; margin-top:6rpx;"
          ></a>
        </div>
        <label
          class="weui-search-bar__label" 
          @click.stop="focusInput"
          v-show="!isInputFocused"
        >
          <i class="weui-icon-search"></i><span>{{ search_basic.placeholder }}</span>
        </label>
      </div>
      <a
        class="weui-search-bar__cancel-btn color-weixin-green" 
        @click="cancelSearch"
        style="font-size:14px;"
      >取消</a>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {
    },
    data () {
      return {
        inputValue: '',
        isInputFocused: false,
        isResultShow: false
      }
    },
    props: ['search_basic'],
    methods: {
      focusInput () {
        this.isInputFocused = true
      },
      blurInput () {
        if (!this.inputValue.trim()) this.cancelSearch()
      },
      onInput () {
        this.isResultShow = this.inputValue.trim() ? true : false
      },
      cancelSearch () {
        this.isInputFocused = false
        this.isResultShow = false
        this.inputValue = ''
      },
      clearSearch () {
        this.isResultShow = false
        this.inputValue = '' 
      },
    },
  }
</script>
<style>
.color-weixin-green {
  color: #1AAD19;
}
</style>