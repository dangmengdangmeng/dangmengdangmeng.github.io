<template>
  <div class="color_f6 w_h100">
    <div
      class="top_nav w_90 m_center b_b size16 flex_space_between ptb5"
      style="border-color:#000;"
    >
      <div>作业列表</div>
      <div>全部作业</div>
    </div>
    <div class="mt10">
      <list_item :list_item="list"></list_item>
    </div>
    <mpvue-picker
      ref="mpvuePicker"
      :mode="mode"
      :deepLength="deepLength"
      @onConfirm="onConfirm"
      :pickerValueDefault="default_picker_sele"
      :pickerValueArray="picker_list"
    ></mpvue-picker>
    <f_button :button_list="button_list" @cb="show_picker"></f_button>
  </div>
</template>
<script>
import list_item from "@/components/list_item";
import mpvuePicker from "mpvue-picker";
import f_button from "@/components/f_button";
export default {
  name: "work_bench",
  components: {
    list_item,
    f_button,
    mpvuePicker
  },
  data() {
    return {
      mode: "multiLinkageSelector",
      deepLength: 3,
      default_picker_sele: [0, 0, 0],
      picker_list: [
        {
          label: "新填报",
          value: "new",
          children: [
            {
              label: "上线日报",
              value: "on",
              children: [
                {
                  label: "车轮调查",
                  value: 1
                },
                {
                  label: "线路调查",
                  value: 2
                },
                {
                  label: "道岔调查",
                  value: 3
                },
                {
                  label: "线路跟车",
                  value: 4
                },
                {
                  label: "道岔验收",
                  value: 5
                },
                {
                  label: "小机指导",
                  value: 6
                },
                {
                  label: "线路验收",
                  value: 7
                },
                {
                  label: "道岔跟车",
                  value: 8
                },
                {
                  label: "线路观测",
                  value: 9
                },

                {
                  label: "道岔观测",
                  value: 10
                },
                {
                  label: "全项目检测",
                  value: 11
                },
                {
                  label: "添乘",
                  value: 12
                },
                {
                  label: "预评估",
                  value: 13
                }
              ]
            },
            {
              label: "非上线日报",
              value: "off",
              children: [
                {
                  label: "途中",
                  value: 1
                },
                {
                  label: "宾馆滞留",
                  value: 2
                },
                {
                  label: "办公室",
                  value: 3
                },
                {
                  label: "培训学习",
                  value: 4
                },
                {
                  label: "走访",
                  value: 5
                }
              ]
            }
          ]
        },
        {
          label: "补录",
          value: "old",
          children: [
            {
              label: "上线日报",
              value: "on",
              children: [
                {
                  label: "车轮调查",
                  value: 1
                },
                {
                  label: "线路调查",
                  value: 2
                },
                {
                  label: "道岔调查",
                  value: 3
                },
                {
                  label: "线路跟车",
                  value: 4
                },
                {
                  label: "道岔验收",
                  value: 5
                },
                {
                  label: "小机指导",
                  value: 6
                },
                {
                  label: "线路验收",
                  value: 7
                },
                {
                  label: "道岔跟车",
                  value: 8
                },
                {
                  label: "线路观测",
                  value: 9
                },

                {
                  label: "道岔观测",
                  value: 10
                },
                {
                  label: "全项目检测",
                  value: 11
                },
                {
                  label: "添乘",
                  value: 12
                },
                {
                  label: "预评估",
                  value: 13
                }
              ]
            },
            {
              label: "非上线日报",
              value: "off",
              children: [
                {
                  label: "途中",
                  value: 1
                },
                {
                  label: "宾馆滞留",
                  value: 2
                },
                {
                  label: "办公室",
                  value: 3
                },
                {
                  label: "培训学习",
                  value: 4
                },
                {
                  label: "走访",
                  value: 5
                }
              ]
            }
          ]
        }
      ],
      list: [
        {
          title: "01月12日计划",
          type: "跟车作业",
          time: "2019-11-12 12:12:21",
          status: "未完成",
          plan_text: "上",
          status_color: "red",
          plan_color: "#199ed8",
          link: "/pages/worker/report-reports/reportDetails/main"
        },
        {
          title: "01月12日计划",
          type: "走访",
          time: "2019-11-12 12:12:21",
          status: "已完成",
          plan_text: "上",
          status_color: "blue",
          plan_color: "#199ed8",
          link: "/pages/worker/report-reports/reportDetails/main"
        },
        {
          title: "01月12日计划",
          type: "跟车作业",
          time: "2019-11-12 12:12:21",
          status: "未完成",
          status_color: "red",
          plan_text: "非",
          plan_color: "#008000",
          hide_border: true,
          link: "/pages/worker/report-reports/reportDetails/main"
        }
      ],
      button_list: [
        {
          text: "新建作业日报"
        }
      ]
    };
  },
  mounted() {
    wx.setStorage({
      key: "picker_list",
      data: this.picker_list
    });
  },
  methods: {
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    onConfirm(e) {
      // console.log(e);
      if (e.value[1] == "on") {
        //上线
        this.go_page(
          "/pages/worker/report_today/online_report/main?sele_type=" +
            (e.value[0] == "old" ? 1 : 0) +
            "&sele_idx=" +
            e.value[2]
        );
      } else if (e.value[1] == "off") {
        //非上线
        this.go_page(
          "/pages/worker/report_today/offline_report/main?sele_type=" +
            (e.value[0] == "old" ? 1 : 0) +
            "&sele_idx=" +
            e.value[2]
        );
      }
    },
    show_picker() {
      this.$refs.mpvuePicker.show();
    }
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
.next_btn {
  color: #fff;
  background: #1aad19;
  padding: 8px 0;
  text-align: center;
  border-radius: 6px;
}
</style>
