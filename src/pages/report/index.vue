<template>
  <div class="page_box" style="height: 100vh;">
    <template v-if="isLeader">
      <!-- <work-bench-top :work_bench_top="work_bench_top" ></work-bench-top>
      <div class="p10_15 flex" @click="goPage">
        <img src="/static/images/1_11.png" class="img20 mr10">
        <p class="max_w">通知:所有工作人员....</p>
        <div class="right_ft1"></div>
      </div>-->
      <div class="bg_white">
        <work-bench-item :work_bench_item="leaderList.menuListA"></work-bench-item>
      </div>
      <div class="bg_white mt10">
        <work-bench-item :work_bench_item="leaderList.menuListB"></work-bench-item>
      </div>
    </template>
    <template v-else>
      <div class="bg_white">
        <work-bench-item :work_bench_item="workerList.menuList"></work-bench-item>
      </div>
    </template>
  </div>
</template>
<script>
// import WorkBenchTop from "@/components/work_bench_top.vue"
import WorkBenchItem from "@/components/work_bench_item.vue";
export default {
  name: "work_bench",
  components: { WorkBenchItem },
  computed: {
    // isLeader () {
    //   return this.$api.isLeader
    // }
  },
  onShow() {
    this.isLeader = this.$api.isLeader;
  },
  data() {
    return {
      isLeader: false,
      work_bench_top: {
        img: "/static/images/u169.png",
        name: "权叔",
        title: "编号：M00001",
        title1: "姓名：姜权"
      },

      leaderList: {
        menuListA: [
          {
            text: "日报",
            link: "/pages/leader/report-reports/main",
            img: "/static/images/icon-report.png"
          },
          {
            text: "作业打卡",
            link: "/pages/leader/report-checkin/main",
            img: "/static/images/icon-checkin.png"
          },
          {
            text: "次日计划",
            link: "/pages/leader/report-plan/main",
            img: "/static/images/icon-plan.png"
          }
        ],
        menuListB: [
          {
            text: "月报告",
            link: "/pages/leader/month_report_list/main",
            img: "/static/images/icon-report.png"
          },
          {
            text: "月计划",
            link: "/pages/leader/report-monthlyPlan/main",
            img: "/static/images/icon-plan.png"
          },

          {
            text: "年计划",
            link: "/pages/leader/report-yearlyPlan/main",
            img: "/static/images/icon-plan.png"
          }
        ]
      },
      workerList: {
        menuList: [
          {
            text: "次日计划列表",
            link: "/pages/worker/report-plan/main",
            img: "/static/images/icon-plan.png"
          },
          {
            text: "打卡列表",
            link: "/pages/worker/report-checkin/main",
            img: "/static/images/icon-checkin.png"
          },
          {
            text: "日完成列表",
            link: "/pages/worker/report-reports/main",
            img: "/static/images/icon-report.png"
          }
        ]
      }
    };
  },
  created: function() {},
  methods: {
    goPage() {
      wx.navigateTo({ url: "/pages/leader/report-noticeDetails/main" });
    }
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
</style>
