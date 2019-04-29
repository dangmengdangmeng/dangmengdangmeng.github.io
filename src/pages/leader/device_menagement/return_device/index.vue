<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">归还明细</div>
      <div class="bg_white ptb10">
        <table_ :table_info="table_info"></table_>
        <div class="w_90 m_center size15 pt20">
          <div class="flex_space_between plr15 mb10">
            <div>合计</div>
            <div>5</div>
            <div>3</div>
          </div>
          <div class="flex_space_between">
            <input
              class="max_w mr10 ptb5 pl10 size15"
              type="text"
              style="border:1px solid #999;"
              placeholder="请输入序号"
            >
            <img class="img30 mr10" src="/static/images/code_btn.png" @click="scan_cb">
            <div class="page_add_btn" @click="show_device_modal=true">新增</div>
          </div>
        </div>
      </div>
      <div class="p10_15">备注</div>
      <edit_textarea :edit_textarea="edit_textarea"></edit_textarea>
    </div>
    <div class="device_modal_mask" v-if="show_device_modal" @click="show_device_modal=false">
      <div class="device_modal size15 plr15" @click.stop>
        <div class="device_modal_tit">借用工务设备</div>
        <edit_input :edit_input="edit_input"></edit_input>
        <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
        <div class="p10_15 flex">
          <div class="w105">
            <span class="required">*</span> 图片
          </div>
          <div class="max_w">
            <upload_></upload_>
          </div>
        </div>
        <div class="device_btn_box flex ptb15">
          <div class="device_btn max_w" @click="show_device_modal=false">取消</div>
          <div class="device_btn max_w" @click="show_device_modal=false">确定</div>
        </div>
      </div>
    </div>
    <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
    <f_button v-if="!show_result" :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_picker from "@/components/edit_picker";
import edit_input from "@/components/input_item";
import upload_ from "@/components/upload";
import edit_textarea from "@/components/edit_textarea";
import table_ from "@/components/table";
import msg_panel from "@/components/msg_panel";
export default {
  name: "work_bench",
  components: {
    f_button,
    edit_picker,
    edit_textarea,
    msg_panel,
    table_,
    edit_input,
    upload_
  },
  data() {
    return {
      show_device_modal: false,
      show_result: false,
      table_info: {
        title: {
          num: "序号",
          name: "设备名称",
          num1: "数量",
          state: "设备状态",
          img_num: "图片数量"
        },
        list: [
          {
            num: "1",
            name: "轨道检测仪",
            num1: "2",
            img_num: "2",
            state: "正常"
          },
          {
            num: "1",
            name: "轨道检测仪",
            num1: "2",
            img_num: "2",
            state: "正常"
          },
          {
            num: "1",
            name: "轨道检测仪",
            num1: "2",
            img_num: "2",
            state: "正常"
          }
        ]
      },
      paramsObj: {
        title: "归还成功",
        descList: ["编号为EO13543545,您已经成功归还2台设备"],
        btnList: [
          {
            text: "返回工作台",
            link: true
          },
          {
            text: "关闭",
            link: true,
            default: true
          }
        ]
      },
      edit_textarea: {
        required: true,
        v: "备注",
        placeholder: "请输入备注信息"
      },
      button_list: [
        {
          text: "归还"
        }
      ],
      edit_input: [
        {
          v: "设备名称",
          value: "轨道检测仪",
          no_arrow: true
        },
        {
          v: "固资编号",
          value: "M4735413",
          no_arrow: true
        }
      ],
      edit_picker: [
        {
          required: true,
          v: "设备状态",
          placeholder: "请选择设备状态",
          list: [["正常", "异常"]]
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.show_result = true;
    },
    get_textarea_val(res) {
      console.log(res);
    },
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
    },
    scan_cb(){
      wx.scanCode({
        success:res=>{}
      })
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
.page_bottom_box {
  bottom: 90px;
  z-index: 999;
}
.page_bottom_input {
  border: 1px solid #999;
  outline: none;
}
.page_add_btn {
  background: #1aad19;
  color: #fff;
  border-radius: 5px;
  padding: 5px 15px;
}

.device_modal_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.5);
}
.device_modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 90%;
}
.device_modal_tit {
  text-align: center;
  padding: 30px 0 20px;
}
.device_btn_box {
  margin-top: 40px;
}
.device_btn {
  text-align: center;
}
.device_btn_box .device_btn:nth-child(1) {
  border-right: 1px solid #999;
}
.device_btn_box .device_btn:nth-child(2) {
  color: green;
}
</style>
