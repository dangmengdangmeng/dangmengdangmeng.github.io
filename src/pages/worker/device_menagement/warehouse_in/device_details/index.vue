<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div class="p10_15">钢轨廓形仪</div>
    <div class="flex bg_white p10_15">
      <img class="img80" src="/static/images/4.png" alt>
      <edit_input :edit_input="edit_input"></edit_input>
    </div>
    <div class="p10_15">编号信息</div>
    <edit_input :edit_input="edit_input1"></edit_input>
    <div class="p10_15">仪器信息</div>
    <div class="flex p10_15 size15 bg_white">
      <div class="s_b_b1"></div>
      <div class="w120">二维码</div>
      <div class="right_ft1"></div>
      <img class="img30" src="/static/images/4.png" alt>
    </div>
    <edit_input :edit_input="edit_input2"></edit_input>
    <div class="p10_15">归口信息</div>
    <edit_input :edit_input="edit_input3"></edit_input>
    <div class="p10_15">节点信息</div>
    <edit_input :edit_input="edit_input4"></edit_input>
    <div class="p10_15">供应商信息</div>
    <edit_input :edit_input="edit_input5"></edit_input>
    <div class="p10_15">财务信息</div>
    <edit_input :edit_input="edit_input6"></edit_input>
    <div class="p10_15">流转履历</div>
    <edit_input :edit_input="edit_input7" @cb="get_input_cb"></edit_input>
    <div class="p10_15">备注信息</div>
    <edit_input :edit_input="edit_input8"></edit_input>
    <div class="p10_15">其他</div>
    <edit_input :edit_input="edit_input9"></edit_input>
    <f_button :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_input from "@/components/input_item";
export default {
  name: "work_bench",
  components: {
    f_button,
    edit_input
  },
  data() {
    return {
      show_result: false,
      edit_input: [
        {
          v: "钢轨廓形仪",
          value: "使用中",
          no_arrow: true
        },
        {
          v: "M0192123",
          value: "",
          no_arrow: true
        },
        {
          v: "北一",
          value: "",
          hide_border: true,
          no_arrow: true
        }
      ],
      edit_input1: [
        {
          v: "固资编号",
          value: "M0192123",
          class: "w120"
        },
        {
          v: "财务卡片号",
          value: "M0192123",
          class: "w120"
        },
        {
          v: "研究院编号",
          value: "M7676720001",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input2: [
        {
          v: "设备序列",
          value: "廓形仪",
          class: "w120"
        },
        {
          v: "固定资产名称",
          value: "M001091205",
          class: "w120"
        },
        {
          v: "规格型号",
          value: "RC240C",
          class: "w120"
        },
        {
          v: "机身唯一代码",
          value: "001091205",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input3: [
        {
          v: "增加方式",
          value: "增加方式",
          class: "w120"
        },
        {
          v: "利润中心",
          value: "利润中心",
          class: "w120"
        },
        {
          v: "部门",
          value: "部门",
          class: "w120"
        },
        {
          v: "责任人",
          value: "张三",
          class: "w120"
        },
        {
          v: "使用人",
          value: "李四",
          class: "w120"
        },
        {
          v: "验收领用日",
          value: "2019-01-01",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input4: [
        {
          v: "资本化日期",
          value: "2019-01-01",
          class: "w120"
        },
        {
          v: "折旧剩余周期",
          value: "12",
          class: "w120"
        },
        {
          v: "质保开始日期",
          value: "2019-01-01",
          class: "w120"
        },
        {
          v: "质保期（天）",
          value: "35",
          class: "w120"
        },
        {
          v: "质保到期日",
          value: "2019-01-01",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input5: [
        {
          v: "供应商名称",
          value: "供应商名称",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input6: [
        {
          v: "原值",
          value: "23万",
          class: "w120"
        },
        {
          v: "每月折旧金额",
          value: "2000元",
          class: "w120"
        },
        {
          v: "本年度折旧月数",
          value: "1",
          class: "w120"
        },
        {
          v: "本年度折旧金额",
          value: "2000元",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input7: [
        {
          v: "流转次数",
          value: "12",
          color:'blue',
          class: "w120"
        },
        {
          v: "维修次数",
          value: "17",
          color:'blue',
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input8: [
        {
          v: "备注",
          value: "备注内容",
          hide_border: true,
          class: "w120"
        }
      ],
      edit_input9: [
        {
          v: "创建时间",
          value: "2019-01-12 09:00:12",
          class: "w120"
        },
        {
          v: "更新时间",
          value: "2019-01-12 09:00:12",
          hide_border: true,
          class: "w120"
        }
      ],
      button_list: [
        {
          text: "编辑"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      //跳转到入库的那个页面
      this.go_page(
        "/pages/worker/device_menagement/warehouse_in/add_device/main"
      );
    },
    go_page(url) {
      wx.navigateTo({ url: url });
    },
    get_input_cb(idx) {
      if (idx == 0) {
        this.go_page(
          "/pages/worker/device_menagement/warehouse_in/loop_list/main"
        );
      } else if (idx == 1) {
        this.go_page(
          "/pages/worker/device_menagement/warehouse_in/service_list/main"
        );
      }
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
.next_btn {
  color: #fff;
  background: #1aad19;
  padding: 8px 0;
  text-align: center;
  border-radius: 6px;
}
</style>
