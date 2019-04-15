<template>
  <div class="searchbar-box">
    <label class="searchbar-mask" @click="isInputFocused=true" v-if="!isInputFocused">
      <img :src="img_baseUrl+'/2/ysl/images/p5/icon-search.png'" mode="aspectFit">
      <span>输入姓名或编号</span>
    </label>
    <img class="icon-search" :src="img_baseUrl+'/2/ysl/images/p5/icon-search.png'" mode="aspectFit">
    <input
      class="search-input"
      type="search"
      placeholder="输入姓名或编号"
      :focus="isInputFocused"
      v-model="inputValue"
      @input="get_input_val"
      @blur="onInputBlur"
      placeholder-style="color:#62a53b;"
    >
    <a class="weui-icon-clear icon-clear" @click="clearSearch" :style="{display: cancelStyle}"></a>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {
      isInputFocused: false,
      inputValue: "",
      timer: null,
      img_baseUrl: "https://1.mengniuarla.com"
    };
  },
  props: [""],
  mounted() {},
  onLoad() {},
  computed: {
    cancelStyle() {
      if (this.inputValue) {
        return "inline-block";
      } else {
        return "none";
      }
    }
  },
  methods: {
    get_input_val(e) {
      let that = this;
      that.inputValue = e.target.value;
      clearTimeout(that.timer);
      that.timer = setTimeout(() => {
        that.$emit("call_back", e.target.value);
      }, 1000);
    },
    onInputBlur() {
      this.isInputFocused = false;
      this.inputValue = "";
      this.$emit("clear_call_back", 1);
    },
    clearSearch() {
      this.isResultShow = false;
      this.isInputFocused = true;
      this.inputValue = "";
      this.$emit("clear_call_back", 1);
    }
  }
};
</script>
<style>
.searchbar-box {
  position: relative;
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 20px;
  padding: 0 10%;
  z-index: 0;
}
.icon-search {
  line-height: 20px;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 12%;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
.icon-clear {
  display: inline-block;
  height: 25px;
  padding: 5px;
  width: 25px;
  position: absolute;
  right: 12%;
  top: 0;
  bottom: 0;
  margin: auto 0;
  color: #999;
}
.search-input {
  border: 1px solid #62a53b;
  color: #62a53b;
  outline: none;
  display: block;
  height: 40px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 20px;
  font-size: 16px;
}
.searchbar-mask {
  position: absolute;
  display: flex;
  background: #eef5ea;
  left: 50%;
  top: 1px;
  height: 38px;
  line-height: 38px;
  transform: translateX(-50%);
  z-index: 100;
  width: 75%;
  color: #62a53b;
}
.searchbar-mask > img {
  width: 20px;
  height: 20px;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
.searchbar-mask > span {
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>