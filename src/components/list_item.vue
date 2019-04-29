<template>
  <div class="size15 bg_white" >
    <div
      class="ptb10 pl15 pr15 rl"
      style="overflow:hidden;"
      v-for="(item,index) in list_item"
      :key="index"
      @click="go_page(item.link)"
    >
      <div class="s_b_b1" v-if="!item.hide_border"></div>
      <div class="flex_space_between pr10">
        <div class="item_user_info flex">
          <div
            class="left_plan_type mr5 size12"
            :style="{background:item.plan_color?item.plan_color:''} "
            v-if="item.plan_text || item.gender"
          >
            {{item.plan_text}}
            <img class="gender-icon" v-if="item.gender === 'male'" mode="aspectFit" src="/static/images/u76930.png" alt="gender image">      
            <img  class="gender-icon" v-if="item.gender==='female'" src="/static/images/u76928.png" mode="aspectFit" alt="gender image">
          </div>
          <div>{{item.title}}</div>
        </div>
        <div class>{{item.type}}</div>
      </div>
      <div class="right_ft1"></div>
      <div class="flex_space_between pr10 mt10">
        <div class="item_time">
          {{item.time}}
          <div v-if="item.time1">{{item.time1}}</div>
        </div>
        <div
          class="item_status"
          :class="[item.status_class?item.status_class:'']"
          :style="{'color':item.status_color?item.status_color:'#000'}"
          @click.stop="cb_click(index)"
        >{{item.status}}</div>
      </div>
    </div>
  </div>
</template>

      
      
      
<script>
export default {
  props: ["list_item"],
  methods: {
    go_page(url) {
      // console.log(url);
      if (url) {
        mpvue.navigateTo({
          url: url
        });
      }
    },
    cb_click(idx) {
      this.$emit("cb", idx);
    }
  }
};
</script>
<style scoped>
.gender-icon {
  height: 25px;
  width: 25px;
  display: inline-block;
}

.right_top_btn {
  padding: 2px 4px;
  margin-top: 5px;
  border-radius: 4px;
  color: #fff;
  background: #000;
}
.left_plan_type {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  border-radius: 50%;
}
</style>