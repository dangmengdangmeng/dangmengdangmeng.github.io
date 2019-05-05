<template>
  <el-dialog
    class="dialog"
    :visible.sync="show_edit"
    width="70%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :center="true"
    :show-close="false"
    custom-class="dialog-custom"
  >
    <!-- dialog header -->
    <div class="dialog-header" slot="title">
      编辑
      <el-button class="header-btn-close" type="text" @click="handleClose">
        <i class="el-icon el-icon-close" style="font-weight:bold"></i>
      </el-button>
    </div>
    <!-- dialog body -->
    <div class="dialog-body pt20">
      <!-- <div class="form-item" style="margin-top:10px">
        <label class="form-label form-required">
          <span>系统编码</span>
        </label>
        <div class="form-input-block">
          <el-input disabled v-model="formData.systemCode" placeholder="请输入系统编码"></el-input>
        </div>
      </div>-->
      <div class="form-item pr20">
        <label class="form-label form-required">
          <span>姓名</span>
        </label>
        <div class="form-input-block">
          <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
        </div>
      </div>
      <!-- <div class="form-item">
        <label class="form-label form-required">
          <span>年龄</span>
        </label>
        <div class="form-input-block">
          <el-input v-model="formData.age" placeholder="请输入年龄"></el-input>
        </div>
      </div>-->
      <!-- <div class="form-item">
        <label class="form-label form-required">
          <span>生日</span>
        </label>
        <div class="form-input-block">
          <el-input v-model="formData.birthday" placeholder="请输入生日"></el-input>
        </div>
      </div>-->
      <div class="form-item pr20">
        <label class="form-label form-required">
          <span>手机号</span>
        </label>
        <div class="form-input-block">
          <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
        </div>
      </div>
      <!-- <div class="form-item">
        <label class="form-label form-required">
          <span>邮箱</span>
        </label>
        <div class="form-input-block">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </div>
      </div>-->
      <div class="divider"></div>
      <div class="form-item pr20">
        <label class="form-label form-required">
          <span>人员类型</span>
        </label>
        <div class="form-input-block">
          <el-select style="width:100%" v-model="formData.selectValue1" placeholder="请选择人员类型">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="form-item">
        <label class="form-label form-required">
          <span>活动类型</span>
        </label>
        <div class="form-input-block" style="display:flex;">
          <el-date-picker
            v-model="formData.startDate"
            type="date"
            style="flex:1"
            placeholder="选择日期"
          ></el-date-picker>
          <div style="height:40px;padding:10px 15px;">-</div>
          <el-date-picker v-model="formData.endDate" type="date" style="flex:1" placeholder="选择日期"></el-date-picker>
        </div>
      </div>-->
      <!-- <div class="form-item">
        <label class="form-label form-required">
          <span>图片文件</span>
        </label>
        <div class="form-input-block">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label form-required">
          <span>指定角色</span>
        </label>
        <div class="form-input-block">
          <el-select
            style="width:100%;"
            v-model="formData.selectValue2"
            multiple
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in selectOptions2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="divider"></div>
      <div class="form-item">
        <label class="form-label form-required">
          <span>状态</span>
        </label>
        <div class="form-input-block" style="height:40px;display:flex;align-items:center;">
          <el-switch v-model="formData.switchValue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label form-required">
          <span>排序码</span>
        </label>
        <div class="form-input-block">
          <el-input v-model="formData.orderCode" placeholder="请输入手机号"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label form-required">
          <span>备注</span>
        </label>
        <div class="form-input-block">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            resize="none"
            v-model="formData.remark"
          ></el-input>
        </div>
      </div>-->
    </div>

    <!-- dialog footer -->
    <div class="dialog-footer" slot="footer">
      <div class="footer-btn-box">
        <el-button size="small" type="danger" @click="handleClose">
          <i class="el-icon-close" style="font-weight:bold"></i> 返 回
        </el-button>
        <el-button size="small" type="primary" @click="handleSubmit">
          <i class="el-icon-check" style="font-weight:bold"></i> 保 存
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
  name: "",
  components: {},
  data() {
    return {
      formData: {
        systemCode: "",
        name: "",
        age: "",
        birthday: "",
        phone: "",
        email: "",
        switchValue: null,
        orderCode: "",
        remark: "",
        startDate: "",
        endDate: "",
        selectValue1: "",
        selectValue2: []
      },
      selectOptions: [
        {
          value: "82",
          label: "门店店员"
        },
        {
          value: "81",
          label: "门店店长"
        },
        {
          value: "51",
          label: "经销商老板"
        }
      ],
      selectOptions2: [
        {
          value: "测试脱敏",
          label: "测试脱敏"
        },
        {
          value: "导购管理",
          label: "导购管理"
        },
        {
          value: "新增事业部",
          label: "新增事业部"
        },
        {
          value: "门店销售月报",
          label: "门店销售月报"
        },
        {
          value: "门店自提测试组",
          label: "门店自提测试组"
        },
        {
          value: "验收角色",
          label: "验收角色"
        },
        {
          value: "系统管理员",
          label: "系统管理员"
        }
      ],
      openid: "",
      nodeid: ""
    };
  },
  props: ["show_edit"],
  computed: {},
  mounted() {
    this.$on("edit", val => {
      console.log(val);
      if (val) {
        this.openid = val.openid;
        this.nodeid = val.nodeid;
        this.formData.name = val.name;
        this.formData.phone = val.Mobile;
        this.formData.selectValue1 = val.TypeName;
      }
    });
  },
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      this.$emit("closeEdit", "0");
      // done();
      //   })
      //   .catch(_ => {});
    },
    handleSubmit() {
      this.$emit("submitEdit", this.formData);
      this.get_edit_info();
      this.$emit("closeEdit", "1");
    },
    get_edit_info() {
      this.$http({
        url:
          this.$api.api.edit_table_item +
          "?openId=" +
          this.openid +
          "&Name=" +
          this.formData.name +
          "&Mobile=" +
          this.formData.phone +
          "&PassageUserType=" +
          this.formData.selectValue1 +
          "&PassageNodeId=" +
          this.nodeid
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style>
.dialog-custom {
  height: 700px;
  margin-top: 10vh !important;
}
</style>
