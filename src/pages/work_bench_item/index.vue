<template>
  <div class="page_box w_h100">
    <div
      class="switch_top_btn size14 color_6 ptb3 plr10"
      @click="switch_btn_click"
    >当前{{is_leader?'管理人员端':'工人端'}}</div>
    <work_bench_top :work_bench_top="work_bench_top"></work_bench_top>
    <div class="p10_15 flex">
      <img src="/static/images/1_11.png" class="img20 mr10">
      <p class="max_w">通知:所有工作人员....</p>
      <div class="right_ft1"></div>
    </div>

    <div class="leader_list">
      <div class="bg_white">
        <work_bench_item :work_bench_item="all_list.list" v-if="all_list.list.length>0"></work_bench_item>
      </div>
      <div class="mt10 bg_white">
        <work_bench_item :work_bench_item="all_list.list1" v-if="all_list.list1.length>0"></work_bench_item>
      </div>
      <div class="mt10 bg_white">
        <work_bench_item :work_bench_item="all_list.list2" v-if="all_list.list2.length>0"></work_bench_item>
      </div>
      <div class="mt10 bg_white">
        <work_bench_item :work_bench_item="all_list.list3" v-if="all_list.list3"></work_bench_item>
      </div>
      <div class="mt10 bg_white">
        <work_bench_item :work_bench_item="all_list.list4" v-if="all_list.list4"></work_bench_item>
      </div>
      <div class="mt10 bg_white">
        <work_bench_item :work_bench_item="all_list.list5" v-if="all_list.list5"></work_bench_item>
      </div>
    </div>
  </div>
</template>
<script>
import work_bench_item from "@/components/work_bench_item.vue";
import work_bench_top from "@/components/work_bench_top.vue";
export default {
  name: "work_bench",
  components: {
    work_bench_item,
    work_bench_top
  },
  data() {
    return {
      work_bench_top: {
        img: "/static/images/u169.png",
        name: "张三",
        title: "京广高铁工务段信阳南站",
        title1: "打磨组 组长"
      },
      works_list: {
        list: [
          {
            text: "当日完成",
            img: "/static/images/today.png",
            right_text: "4",
            link: "/pages/worker/report_today/main"
          },
          {
            text: "次日计划",
            img: "/static/images/report.png",
            right_text: "3",
            link: "/pages/worker/report_tomorrow/main"
          },
          {
            text: "作业打卡",
            img: "/static/images/clock.png",
            right_text: "1",
            link: "/pages/worker/clock_in/main",
            hide_border: true
          }
        ],
        list1: [
          {
            text: "设备管理",
            img: "/static/images/service_menagement.png",
            link: "/pages/worker/device_menagement/main",
            hide_border: true
          }
        ],
        list2: [
          {
            text: "视频会议",
            img: "/static/images/video.png",
            link: "/pages/worker/video_meeting/main"
          },
          {
            text: "知识库",
            img: "/static/images/know_how.png",
            link: "/pages/worker/know_how_list/main",
            hide_border: true
          }
        ],
        list3: [
          {
            text: "通知公告",
            img: "/static/images/1_11.png",
            link: "/pages/worker/notice_list/main",
            right_text: 1,
            hide_border: true
          }
        ]
      },
      leader_list: {
        list: [
          {
            text: "当日完成",
            img: "/static/images/today.png",
            right_text: "4",
            link: "/pages/leader/report_today/main"
          },
          {
            text: "次日计划",
            img: "/static/images/report.png",
            right_text: "3",
            link: "/pages/leader/report_tomorrow/main"
          },
          {
            text: "作业打卡",
            img: "/static/images/clock.png",
            right_text: "1",
            link: "/pages/leader/clock_in/main",
            hide_border: true
          }
        ],
        list1: [
          {
            text: "月计划上报",
            img: "/static/images/report.png",
            link: "/pages/leader/month_plan_list/main"
          },
          {
            text: "月报告上传",
            img: "/static/images/upload.png",
            link: "/pages/leader/month_report_list/main"
          },
          {
            text: "年计划上报",
            img: "/static/images/report.png",
            link: "/pages/leader/year_plan_list/main",
            hide_border: true
          }
        ],
        list2: [
          {
            text: "设备",
            img: "/static/images/3_03.png",
            link: "/pages/leader/device_menagement/main",
            hide_border: true
          }
        ],
        list3: [
          {
            text: "项目管理",
            img: "/static/images/service_menagement.png",
            link: "/pages/leader/project_menagement/main",
            hide_border: true
          }
        ],
        list4: [
          {
            text: "视频会议",
            img: "/static/images/video.png",
            link: "/pages/leader/video_meeting/main"
          },
          {
            text: "知识库",
            img: "/static/images/know_how.png",
            link: "/pages/leader/know_how_list/main",
            hide_border: true
          }
        ],
        list5: [
          {
            text: "通知公告",
            img: "/static/images/1_11.png",
            link: "/pages/leader/notice_list/main",
            right_text: 1,
            hide_border: true
          }
        ]
      },
      all_list: {
        list: [
          {
            text: "当日完成",
            img: "/static/images/today.png",
            right_text: "4",
            link: "/pages/worker/report_today/main"
          },
          {
            text: "次日计划",
            img: "/static/images/report.png",
            right_text: "3",
            link: "/pages/worker/report_tomorrow/main"
          },
          {
            text: "作业打卡",
            img: "/static/images/clock.png",
            right_text: "1",
            link: "/pages/worker/clock_in/main",
            hide_border: true
          }
        ],
        list1: [
          {
            text: "设备管理",
            img: "/static/images/service_menagement.png",
            link: "/pages/worker/device_menagement/main",
            hide_border: true
          }
        ],
        list2: [
          {
            text: "视频会议",
            img: "/static/images/video.png",
            link: "/pages/worker/video_meeting/main"
          },
          {
            text: "知识库",
            img: "/static/images/know_how.png",
            link: "/pages/worker/know_how_list/main",
            hide_border: true
          }
        ],
        list3: [
          {
            text: "通知公告",
            img: "/static/images/1_11.png",
            link: "/pages/worker/notice_list/main",
            right_text: 1,
            hide_border: true
          }
        ]
      },
      is_leader: false
    };
  },
  mounted() {},
  computed: {},
  created() {
    this.is_leader = this.$api.isLeader;
    if (this.is_leader) {
      this.all_list = {
        list: [
          {
            text: "当日完成",
            img: "/static/images/today.png",
            right_text: "4",
            link: "/pages/leader/report_today/main"
          },
          {
            text: "次日计划",
            img: "/static/images/report.png",
            right_text: "3",
            link: "/pages/leader/report_tomorrow/main"
          },
          {
            text: "作业打卡",
            img: "/static/images/clock.png",
            right_text: "1",
            link: "/pages/leader/clock_in/main",
            hide_border: true
          }
        ],
        list1: [
          {
            text: "月计划上报",
            img: "/static/images/report.png",
            link: "/pages/leader/month_plan_list/main"
          },
          {
            text: "月报告上传",
            img: "/static/images/upload.png",
            link: "/pages/leader/month_report_list/main"
          },
          {
            text: "年计划上报",
            img: "/static/images/report.png",
            link: "/pages/leader/year_plan_list/main",
            hide_border: true
          }
        ],
        list2: [
          {
            text: "设备",
            img: "/static/images/3_03.png",
            link: "/pages/leader/device_menagement/main",
            hide_border: true
          }
        ],
        list3: [
          {
            text: "项目管理",
            img: "/static/images/service_menagement.png",
            link: "/pages/leader/project_menagement/main",
            hide_border: true
          }
        ],
        list4: [
          {
            text: "视频会议",
            img: "/static/images/video.png",
            link: "/pages/leader/video_meeting/main"
          },
          {
            text: "知识库",
            img: "/static/images/know_how.png",
            link: "/pages/leader/know_how_list/main",
            hide_border: true
          }
        ],
        list5: [
          {
            text: "通知公告",
            img: "/static/images/1_11.png",
            link: "/pages/leader/notice_list/main",
            right_text: 1,
            hide_border: true
          }
        ]
      };
    } else {
      this.all_list = {
        list: [
          {
            text: "当日完成",
            img: "/static/images/today.png",
            right_text: "4",
            link: "/pages/worker/report_today/main"
          },
          {
            text: "次日计划",
            img: "/static/images/report.png",
            right_text: "3",
            link: "/pages/worker/report_tomorrow/main"
          },
          {
            text: "作业打卡",
            img: "/static/images/clock.png",
            right_text: "1",
            link: "/pages/worker/clock_in/main",
            hide_border: true
          }
        ],
        list1: [
          {
            text: "设备管理",
            img: "/static/images/service_menagement.png",
            link: "/pages/worker/device_menagement/main",
            hide_border: true
          }
        ],
        list2: [
          {
            text: "视频会议",
            img: "/static/images/video.png",
            link: "/pages/worker/video_meeting/main"
          },
          {
            text: "知识库",
            img: "/static/images/know_how.png",
            link: "/pages/worker/know_how_list/main",
            hide_border: true
          }
        ],
        list3: [
          {
            text: "通知公告",
            img: "/static/images/1_11.png",
            link: "/pages/worker/notice_list/main",
            right_text: 1,
            hide_border: true
          }
        ]
      };
    }
  },
  onShow() {
    wx.pageScrollTo({
      scrollTop: 0
    });
  },
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    switch_btn_click() {
      this.is_leader = !this.is_leader;
      this.$api.isLeader = !this.$api.isLeader;
      if (this.is_leader) {
        this.all_list = {
          list: [
            {
              text: "当日完成",
              img: "/static/images/today.png",
              right_text: "4",
              link: "/pages/leader/report_today/main"
            },
            {
              text: "次日计划",
              img: "/static/images/report.png",
              right_text: "3",
              link: "/pages/leader/report_tomorrow/main"
            },
            {
              text: "作业打卡",
              img: "/static/images/clock.png",
              right_text: "1",
              link: "/pages/leader/clock_in/main",
              hide_border: true
            }
          ],
          list1: [
            {
              text: "月计划上报",
              img: "/static/images/report.png",
              link: "/pages/leader/month_plan_list/main"
            },
            {
              text: "月报告上传",
              img: "/static/images/upload.png",
              link: "/pages/leader/month_report_list/main"
            },
            {
              text: "年计划上报",
              img: "/static/images/report.png",
              link: "/pages/leader/year_plan_list/main",
              hide_border: true
            }
          ],
          list2: [
            {
              text: "设备",
              img: "/static/images/3_03.png",
              link: "/pages/leader/device_menagement/main",
              hide_border: true
            }
          ],
          list3: [
            {
              text: "项目管理",
              img: "/static/images/service_menagement.png",
              link: "/pages/leader/project_menagement/main",
              hide_border: true
            }
          ],
          list4: [
            {
              text: "视频会议",
              img: "/static/images/video.png",
              link: "/pages/leader/video_meeting/main"
            },
            {
              text: "知识库",
              img: "/static/images/know_how.png",
              link: "/pages/leader/know_how_list/main",
              hide_border: true
            }
          ],
          list5: [
            {
              text: "通知公告",
              img: "/static/images/1_11.png",
              link: "/pages/leader/notice_list/main",
              right_text: 1,
              hide_border: true
            }
          ]
        };
      } else {
        this.all_list = {
          list: [
            {
              text: "当日完成",
              img: "/static/images/today.png",
              right_text: "4",
              link: "/pages/worker/report_today/main"
            },
            {
              text: "次日计划",
              img: "/static/images/report.png",
              right_text: "3",
              link: "/pages/worker/report_tomorrow/main"
            },
            {
              text: "作业打卡",
              img: "/static/images/clock.png",
              right_text: "1",
              link: "/pages/worker/clock_in/main",
              hide_border: true
            }
          ],
          list1: [
            {
              text: "设备管理",
              img: "/static/images/service_menagement.png",
              link: "/pages/worker/device_menagement/main",
              hide_border: true
            }
          ],
          list2: [
            {
              text: "视频会议",
              img: "/static/images/video.png",
              link: "/pages/worker/video_meeting/main"
            },
            {
              text: "知识库",
              img: "/static/images/know_how.png",
              link: "/pages/worker/know_how_list/main",
              hide_border: true
            }
          ],
          list3: [
            {
              text: "通知公告",
              img: "/static/images/1_11.png",
              link: "/pages/worker/notice_list/main",
              right_text: 1,
              hide_border: true
            }
          ]
        };
      }
    }
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
.switch_top_btn {
  position: absolute;
  right: 15px;
  top: 20px;
  z-index: 999;
  background: #1aad19;
  color: #fff;
  border-radius: 5px;
}
</style>
