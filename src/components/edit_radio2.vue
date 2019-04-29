<template>
  <group>
    <div class='flex l_b_b'>
      <div class="input_left_w105 pl15">
        <span class='required' v-show="edit_radio_params.required">*</span>
        <span>{{ edit_radio_params.title }}</span>
      </div>
      <radio-group class='max_w' style="padding: 10px 15px;">
        <div class="yesBox">
          <input type="radio" v-model="checkValue" value="true" id="yes">
          <label for="yes">是</label>
        </div>
        <div class="noBox">
          <input type="radio" v-model="checkValue" value="false" id="no">
          <label for="no">否</label>
        </div>
      </radio-group>

    </div>
  </group>
</template>

<script>
export default {
  data () {
    return {
      checkValue: ''
    }
  },
  props: ['edit_radio_params']
}
</script>

<style scoped>
.yesBox, .noBox {
  display: inline-block;
}
.noBox {
  margin-left: 20px;
}
</style>
