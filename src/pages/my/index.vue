<template>
  <div class="page_box" style="height:100vh">
      <template v-if="isLeader">
        <div class="bg_white">
          <work-bench-item :work_bench_item="leader.menuParamsList1"></work-bench-item>
        </div>
        <div class="bg_white mt10">
          <work-bench-item :work_bench_item="leader.menuParamsList2"></work-bench-item>
        </div>
      </template>
      <template v-else>
        <div class="bg_white">
          <work-bench-item  :work_bench_item="worker.menuParamsList1"></work-bench-item>
        </div>
        <div class="bg_white">
          <work-bench-item  :work_bench_item="worker.menuParamsList2"></work-bench-item>
        </div>
      </template>
  </div>
</template>
<script>
import WorkBenchItem from '@/components/work_bench_item.vue'
export default {
  name: "work_bench",
  components: { WorkBenchItem },
  data() {
    return {
      worker: {
        menuParamsList1: [
          {
            text: '我的归属',
            link: '/pages/worker/my-belong/main',
            img: '/static/images/1_35.png'
          },
          {
            text: '我的资料',
            link: '/pages/worker/my-info/main',
            img: '/static/images/3_19.png'
          },
        ],
        menuParamsList2: [
          {
            text: '通知公告',
            link: '/pages/worker/my-notice/main',
            img: '/static/images/1_11.png'
          }
        ]
      },
      leader: {
        menuParamsList1: [
          {
            text: '我的归属',
            link: '/pages/leader/my-belong/main',
            img: '/static/images/1_35.png'
          },
          {
            text: '我的资料',
            link: '/pages/leader/my-info/main',
            img: '/static/images/3_19.png'
          },
          {
            text: '下属成员',
            link: '/pages/leader/my-staff/main',
            img: '/static/images/icon-member.png'
          },

        ],
        menuParamsList2: [
          {
            text: '通知公告',
            link: '/pages/leader/my-notice/main',
            img: '/static/images/1_11.png'
          }
        ]
      },
      isLeader:false
    };
  },
  onShow(){
    this.isLeader = this.$api.isLeader
  },
  computed: {
    
  },
  created: function() {},
  methods: {}
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
</style>