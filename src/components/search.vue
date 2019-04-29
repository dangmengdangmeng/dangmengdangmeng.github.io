<template>
  <div style="position:relative;">
    <div :class = "['search-bar', isInputFocused ? 'search-bar_focusing' : '']">
      <div class="search-bar__container">
        <div class="search-bar__input-box">
          <i class="weui-icon-search"></i>
          <input
            type="text" 
            class="search-bar__input" 
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
            :style="{display: cancelStyle}"
          ></a>
          <!-- 搜索结果展示 -->
          <div :class="['search-result__container', resultClass ]">
            <div class="search-result__item">
              实时搜索文本
            </div>
            <div class="search-result__item">
              实时搜索文本
            </div>
            <div class="search-result__item">
              实时搜索文本
            </div>
            <div class="search-result__item">
              实时搜索文本
            </div>
          </div>
        </div>
        <!-- 搜索框遮罩 -->
        <div
          class="search-bar__label" 
          @click.stop="focusInput"
          v-show="!isInputFocused"
        >
          <i class="weui-icon-search"></i>
          <span>{{ search_basic.placeholder }}</span>
        </div>
      </div>
      <div v-if="!isInputFocused" @click="showSlidePanel" style="display:flex; align-items: center; width:75px; margin-left:5px;">
        <span style="font-size:14px; padding: 5px;">筛选</span>
        <img src="/static/images/filter.png" alt="filter" style="width: 20px; height: 20px;">
      </div>
      <a
        class="search-bar__cancel-btn" 
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
    computed: {
      cancelStyle () {
        if (this.inputValue) {
          return 'block'
        } else {
          return 'none'
        }
      },
      resultClass () {
        if (this.inputValue.trim()) {
          return 'search-result_show'
        } else {
          return 'search-result_hide'
        }
      },


    },
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

      showSlidePanel () {
        this.$emit('filter')
      }
    },
  }
</script>
<style scoped>
.color-weixin-green {
  color: #1AAD19;
}

.search-bar {
  position: relative;
  padding: 8px 10px;
  display: flex;
  box-sizing: border-box;
  background: #efeff4;
  align-items: center;
  width: 100%;
  height: 60px;
}
.search-bar:before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d7d6dc;
  color: #d7d6dc;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
.search-bar:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d7d6dc;
  color: #d7d6dc;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.search-bar.search-bar_focusing .search-bar__cancel-btn {
  display: block;
}
.search-bar.search-bar_focusing .search-bar__label {
  display: none;
}
.search-bar__container {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.search-bar__container:after {
  content: '';
  position: absolute;
  box-sizing: border-box;
  left: 0;
  right: 0;
  border-radius: 10px;
  background-color: #fff;
}
.search-bar__input-box {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 2;     
}
.search-bar__input-box .search-bar__input {
  padding: 4px 0;
  width: 100%;
  height: 36px;
  border: 0;
  font-size: 14px;
  line-height: 36px;
  box-sizing: content-box;
  background: #fff;
}
.search-bar__input-box .search-bar__input:focus {
  outline: none;
}
.search-bar__input-box .weui-icon-search {
  position: absolute;
  top: 50%;
  left: 10px;
  margin-top: -14px;
  line-height: 28px;
}
.search-bar__input-box .weui-icon-clear {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -14px;
  line-height: 28px;
  padding: 0 10px;
  color:#9b9b9b;
}
.search-bar__label {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  z-index: 101;
  border-radius: 3px;
  text-align: center;
  line-height: 40px;
  color: #9b9b9b;
  background: #fff;
}
.search-bar__label span {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}
.search-bar__label .weui-icon-search {
  margin-right: 5px;
}
.search-bar__cancel-btn {
  display: none;
  margin-left: 10px;
  line-height: 28px;
  color: #09bb07;
  white-space: nowrap;
}
.search-bar__input:not(:valid), .weui-icon-clear {
  display: none;
}
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
.search-result__container {
  position: absolute;
  min-width: 500rpx;
  box-shadow: 0px 2px 7px 1px rgba(0,0,0,0.2);
  background: #fff;
  border-radius: 2px;
  padding: 10rpx 0;
  transition-property: opacity;
  transition-duration: 300ms;
}
.search-result_show {
  display: block;
}
.search-result_hide {
  display: none;
}
.search-result__item {
  padding: 0 20rpx;
}
.search-result__item:active {
  background-color:#ECECEC;
  color: #353535;
}
</style>S