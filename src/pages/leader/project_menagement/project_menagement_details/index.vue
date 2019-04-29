<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">项目负责人信息</div>
    <div class="bg_white flex p10_15">
      <div class="s_b_b1"></div>
      <div class="w105">项目负责人</div>
      <div class="max_w flex">
        <img class="w30 h30 mr5" src="/static/images/4.png" alt>
        <div>李四</div>
      </div>
    </div>
    <edit_input :edit_input="edit_input"></edit_input>
    <div class="p10_15">项目信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">阶段信息</div>
    <div class="size14" v-for="(item,index) in table_info" :key="index">
      <div class="table_tit p10_15 t_center">
        {{item.tit}}
        <div class="edit_btn" @click="edit_btn">填报</div>
      </div>
      <div class="flex t_center bg_f6" v-for="(item_,index_) in item.list" :key="index_">
        <div class="w_35 b_t ptb10">{{item_.text}}</div>
        <div class="w_65 ptb10 b_t b_l">{{item_.text1}}</div>
      </div>
    </div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <div class="p10_15">时间信息</div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import edit_input from "@/components/input_item";
import list_item from "@/components/list_item";
import page_top_info from "@/components/page_top_info";
import f_button from "@/components/f_button";
import slide_panel from "@/components/slide_panel";

export default {
  components: {
    edit_input,
    list_item,
    page_top_info,
    slide_panel,
    f_button
  },
  data() {
    return {
      button_list: [{ text: "填报" }],
      sele_type: "",
      edit_input: [
        {
          v: "联系电话",
          value: "13212321456"
        },
        {
          v: "路局",
          value: "沈阳"
        },
        {
          v: "归属信息",
          value: "京广高铁公务段",
          hide_border: true
        }
      ],
      edit_input1: [
        {
          v: "编号",
          value: "EO1845435431"
        },
        {
          v: "名称",
          value: "****项目"
        },
        {
          v: "状态",
          value: "启用"
        },
        {
          v: "开始时间",
          value: "2019-01-01"
        },
        {
          v: "预计结束日期",
          value: "2019-01-01"
        },
        {
          v: "合同金额",
          value: "100000.00"
        },
        {
          v: "线名",
          value: "沈大线"
        },
        {
          v: "路局",
          value: "沈阳"
        },
        {
          v: "工务段",
          value: "沈阳工务段"
        },
        {
          v: "打磨里程",
          value: "890.234",
          hide_border: true
        }
      ],
      edit_input2: [
        {
          v: "创建时间",
          value: "2018-11-19 16:12:12"
        },
        {
          v: "更新时间",
          value: "2018-11-19 16:12:12",
          hide_border: true
        }
      ],
      table_info: [
        {
          tit: "合同签订",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "线路调查",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "制定打磨方案",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "打磨执行",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "跟车指导",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "验收",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "开具发票",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        },
        {
          tit: "回款",
          list: [
            {
              text: "负责人",
              text1: "张三"
            },
            {
              text: "联系电话",
              text1: "1321321321"
            },
            {
              text: "开始日期",
              text1: "2018-10-10"
            },
            {
              text: "结束日期",
              text1: "2018-01-01"
            },
            {
              text: "完成进度",
              text1: "60%"
            },
            {
              text: "填报次数",
              text1: "5"
            },
            {
              text: "状态",
              text1: "正常"
            }
          ]
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    go_page(url) {
      wx.navigateTo({
        url: url
      });
    },
    edit_btn() {
      this.go_page("/pages/leader/project_menagement/send_info_list/main");
    },
    button_cb() {
      this.go_page("/pages/leader/project_menagement/send_info_list/main");
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
.table_tit {
  background: rgb(204, 204, 204);
}
.edit_btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: blue;
}
</style>
