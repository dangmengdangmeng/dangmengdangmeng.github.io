<template>
  <div>
    <div class="p10_15 flex bg_white" v-for="(item,index) in edit_radio" :key="index">
      <div class="s_b_b1"></div>
      <div :class="item.class?item.class:'w105'" v-if="item.v">
        <span class="required" v-show="item.required">*</span>
        <span>{{item.v}}</span>
      </div>
      <div v-if="!item.no_arrow" class="right_ft1"></div>

      <div class="max_w">
        <radio-group class="flex" @change="radioChange">
          <radio
            class="mr5"
            v-for="(item_,index_) in item.list"
            :key="index_"
            :value="item_.value"
            :checked="item_.checked"
          >
            <span>{{item_.value}}</span>
          </radio>
        </radio-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["edit_radio"],
  data() {
    return {};
  },
  methods: {
    radioChange(e) {
      console.log(e.target.value);
    }
  }
};
</script>