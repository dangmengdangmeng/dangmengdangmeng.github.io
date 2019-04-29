<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <page_top_info :page_top_info="page_top_info" @search_cb="search_cb" @filter_cb="filter_cb"></page_top_info>
    <list_item :list_item="list" @cb="item_btn_cb"></list_item>
    <!-- <f_button :button_list="button_list" @cb="button_cb"></f_button> -->
    <slide_panel :paramsObj="paramsObj1"></slide_panel>

    <div class="send_progress_mask" v-show="show_progress_modal" @click="show_progress_modal=false">
      <div class="send_progress_modal size15" @click.stop>
        <div class="send_progress_tit p10_15">
          提交项目进度
          <div class="send_progress_btn" @click="send_btn_call_back1">确定</div>
          <div class="s_b_b1"></div>
        </div>
        <edit_picker :edit_picker="edit_picker"></edit_picker>
        <edit_input :edit_input="edit_input"></edit_input>
        <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
      </div>
    </div>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import list_item from "@/components/list_item";
import edit_picker from "@/components/edit_picker";
import edit_input from "@/components/input_item";
import edit_textarea from "@/components/edit_textarea";
import page_top_info from "@/components/page_top_info";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    f_button,
    list_item,
    page_top_info,
    slide_panel,
    edit_picker,
    edit_input,
    edit_textarea
  },
  data() {
    return {
      show_progress_modal: false,
      paramsObj1: {
        isPanelShow: false,
        show_filter_btn: true,
        filter_btn_list: ["一周", "一个月", "三个月"],
        edit_time: [
          {
            v: "开始日期",
            placeholder: "请选择计划上传日期"
          },
          {
            v: "结束日期",
            placeholder: "请选择计划上传日期"
          },
          {
            v: "年月",
            placeholder: "请选择年月"
          }
        ],
        edit_picker: [
          {
            v: "路局",
            placeholder: "请选择路局",
            list: ["路局", "路局1"]
          },
          {
            v: "计划类型",
            placeholder: "请选择计划类型",
            list: ["计划类型", "计划类型1"]
          }
        ]
      },
      page_top_info: {
        hide_scan: true,
        placeholder: "请输入要搜索的计划"
      },
      button_list: [
        {
          text: "新建计划"
        }
      ],
      list: [
        {
          title: "xxx项目",
          plan_text: "超",
          plan_color: "red",
          time: "张三 2018-12-29 16:47:22",
          link:
            "/pages/leader/project_menagement/project_menagement_details/main?type=线路"
        },
        {
          title: "xxx项目",
          plan_text: "正",
          plan_color: "green",
          time: "张三 2018-12-29 16:47:22",
          status: "提交",
          status_class: "b_radius5 bg_green plr10 ptb3 size12",
          status_color: "#fff",
          link:
            "/pages/leader/project_menagement/project_menagement_details/main?type=道岔",
          hide_border: true
        }
      ],
      edit_picker: [
        {
          v: "项目阶段",
          placeholder: "请选择项目阶段",
          no_arrow: true,
          list: [
            [
              "合同签订",
              "线路调查",
              "制定打磨方案",
              "跟车指导",
              "验收",
              "开具发票",
              "回款"
            ]
          ]
        }
      ],
      edit_input: [
        {
          v: "负责人",
          no_arrow: true,
          value: "张三"
        },
        {
          v: "联系电话",
          value: "1312123131",
          no_arrow: true
        },
        {
          v: "当前进度",
          value: "0%",
          no_arrow: true
        },
        {
          v: "完成进度",
          placeholder: "请输入完成进度",
          no_arrow: true
        }
      ],
      edit_textarea: {
        v: "备注",
        placeholder: "请输入备注",
        no_arrow: true
      }
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {},
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    search_cb(val) {
      console.log(val);
    },
    filter_cb() {
      this.paramsObj1.isPanelShow = true;
    },
    send_btn_call_back1() {
      this.show_progress_modal = false;
    },
    item_btn_cb(idx) {
      console.log(idx);
      this.show_progress_modal = true;
    }
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data());
  }
};
</script>
<style scoped>
.page_box {
  background: #f5f5f5;
}
.send_progress_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.send_progress_modal {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
}
.send_progress_tit {
  text-align: center;
  position: relative;
}
.send_progress_btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: green;
}
</style>
