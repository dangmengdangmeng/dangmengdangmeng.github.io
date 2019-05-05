<template>
  <!-- <div style="display:inline-block;width:47%;margin-right:30px;"> -->
  <div style="margin-bottom:30px;">
    <div class="admin-details-header">
      {{title}}
      <span class="admin-details_header-btn" v-if="isPanelFold" @click="isPanelFold=!isPanelFold">
        <a class="el-icon-arrow-down"></a>
      </span>
      <span class="admin-details_header-btn" v-else @click="isPanelFold=!isPanelFold">
        <a class="el-icon-arrow-up"></a>
      </span>
    </div>
    <transition name="el-fade-in-linear">
      <table class="admin-details-table" style="table-layout:fixed" v-if="!isPanelFold">
        <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td >
              <span style="color:#999;">{{item[0].v}}</span>
              <span >{{item[0].k}}</span>
            </td>
            <td>
              <template v-if="item[1]">
                <span style="color:#999;">{{item[1].v}}</span>
                <span >{{item[1].k}}</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {  },
    data () {
      return {
        isPanelFold: false
      }
    },
    props: ['tableData', 'title'],
    computed: {},
    methods: {}
  }
</script>
<style>
</style>