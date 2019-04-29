<template>
  <div class="color_f6 w_h100 size14 page_box pb100">
    <div v-if="!show_result">
      <div class="p10_15">设备信息</div>
      <edit_input :edit_input="edit_input"></edit_input>
      <div class="p10_15">盘点信息</div>
      <edit_picker :edit_picker="edit_picker" @cb="edit_picker_cb"></edit_picker>
      <div class="flex p10_15 bg_white" v-for="(item,index) in upload_arr" :key="index">
        <div class="s_b_b1"></div>
        <div class="w120">{{item}}</div>
        <upload_ :upload_info="upload_info"></upload_>
      </div>
      <div class="bg_white ptb5 plr15 size14 color_9">备注:仪器与本人照片要能证明拍照日期</div>
    </div>

    <msg_panel v-if="show_result" :paramsObj="paramsObj"></msg_panel>
    <f_button v-if="!show_result" :button_list="button_list" @cb="button_cb"></f_button>
  </div>
</template>
<script>
import f_button from "@/components/f_button";
import edit_picker from "@/components/edit_picker";
import edit_input from "@/components/input_item";
import msg_panel from "@/components/msg_panel";
import upload_ from "@/components/upload";
export default {
  name: "work_bench",
  components: {
    f_button,
    edit_picker,
    msg_panel,
    edit_input,
    upload_
  },
  data() {
    return {
      upload_info: {
        class: "img50"
      },
      upload_arr: ["机身编号", "固资标签", "仪器与配件", "仪器与本人证明"],
      show_result: false,
      edit_picker: [
        {
          v: "设备状态",
          class: "w120",
          placeholder: "请选择设备状态",
          list: [["设备状态", "设备状态1"]]
        }
      ],
      paramsObj: {
        title: "提交成功",
        descList: ["编号为EO13543545的车轮廓形仪盘点成功"],
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
      edit_input: [
        {
          v: "设备名称",
          value: "钢轨廓形仪",
          class: "w120"
        },
        {
          v: "设备序列",
          value: "M17198719",
          class: "w120"
        },
        {
          v: "盘点人",
          value: "张三",
          hide_broder: true,
          class: "w120"
        }
      ],
      button_list: [
        {
          text: "提交盘点"
        }
      ]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {
    button_cb() {
      this.$fun.confirm_modal('盘点','确定提交盘点信息?',true,res=>{
        if(res.confirm){

          this.show_result = true;
          }
          })
    },
    get_textarea_val(res) {
      console.log(res);
    },
    edit_picker_cb(res) {
      this.edit_picker[res.idx].placeholder = this.edit_picker[res.idx].list[0][
        res.value
      ];
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
</style>
