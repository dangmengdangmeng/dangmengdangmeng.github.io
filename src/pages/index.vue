<template>
  <div class="page_box index_box">
    <div class="w_100 h_100 pb50 rl pt10">
      <div class="top_tit_box flex_space_between b_b pb2 mb10">
        <div class="flex size20">
          <i class="el-icon-s-platform mr5 size24"></i>
          <div class="bold">表格页面</div>
        </div>
      </div>
      <div class="w_100 table_header_box mb10">
        <div class="w_100 table_header_top flex_space_between mb10">
          <div class="w_70 flex">
            <div class="size14 mr5">会员名称</div>
            <el-input
              class="max_w mr10"
              size="small"
              v-model="search_name"
              prefix-icon="el-icon-search"
              placeholder="会员名称/会员编号/手机号"
            ></el-input>
            <div class="size14 mr5">编码</div>
            <el-input
              class="max_w mr10"
              size="small"
              v-model="search_num"
              prefix-icon="el-icon-search"
              placeholder="编码"
            ></el-input>
            <div class="size14 mr5">会员生日</div>
            <el-input
              class="max_w mr10"
              size="small"
              prefix-icon="el-icon-search"
              v-model="search_birthday"
              placeholder="会员生日"
            ></el-input>
            <el-button type="primary" size="small" icon="el-icon-search" @click="search_tabel">搜索</el-button>
            <el-button size="small" @click="more_search">{{show_more_search?'收起':'更多'}}</el-button>
            <el-button size="small" @click="clear_search">清空</el-button>
          </div>
          <div class="right_btn_box flex">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-paperclip"
              @click="show_filter_sele=!show_filter_sele"
            >
              筛选
              <div class="filter_item_box p10" v-show="show_filter_sele" @click.stop>
                <el-checkbox
                  class="flex"
                  style="justify-content:flex-start"
                  v-model="item.show"
                  v-for="(item,index) in table_tit_arr"
                  :key="index"
                  @change="get_check_table_tit"
                >{{item.name}}</el-checkbox>
              </div>
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-refresh" @click="update_tabel">刷新</el-button>
            <el-button type="success" size="small" icon="el-icon-download" @click="create_excel">导出</el-button>
          </div>
        </div>
        <div class="w_70 table_header_center flex mb10" v-if="show_more_search">
          <el-select class="mr10 w_30" size="small" v-model="search_sele" placeholder="请选择类型">
            <el-option v-for="item in search_sele_arr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-date-picker
            class="w_30"
            size="small"
            v-model="search_date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="table_header_bottom">
          <el-button
            style="border-color:#009688;background:#009688;color:#fff;"
            size="small"
            icon="el-icon-edit"
            @click="check_edit"
          >编辑</el-button>
          <el-button
            style="border-color:#a52a2a;background:#a52a2a;color:#fff;"
            size="small"
            icon="el-icon-delete"
            @click="check_del"
          >删除</el-button>
        </div>
      </div>
      <el-table
        class="table_box m_center"
        v-loading="loading"
        element-loading-text="拼命加载中"
        :height="table_config.table_h"
        :data="table_config.data"
        :border="table_config.border"
        :stripe="table_config.stripe"
        :highlight-current-row="table_config['highlight-current-row']"
        @selection-change="check_change"
      >
        <el-table-column
          prop="ID"
          :resizable="false"
          width="80"
          align="center"
          :label="table_tit_arr[0].name"
          v-if="table_tit_arr[0].show"
        ></el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column
          prop="Name"
          :resizable="false"
          align="center"
          :label="table_tit_arr[1].name"
          v-if="table_tit_arr[1].show"
        ></el-table-column>
        <el-table-column
          prop="Mobile"
          :resizable="false"
          :label="table_tit_arr[2].name"
          align="center"
          v-if="table_tit_arr[2].show"
        ></el-table-column>
        <el-table-column
          prop="OpenId"
          :resizable="false"
          :label="table_tit_arr[3].name"
          align="center"
          v-if="table_tit_arr[3].show"
        ></el-table-column>
        <el-table-column
          prop="PassageUserTypeName"
          :resizable="false"
          :label="table_tit_arr[4].name"
          align="center"
          v-if="table_tit_arr[4].show"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="ml5"
              type="primary"
              @click="edit_table_item(scope.$index)"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="del_table_item(scope.$index)">删除</el-button>
            <el-button size="mini" type="success" @click="go_page('/details')">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="bottom_page_box flex bg_white ptb10"
        background
        :total="table_config.pageTotal"
        :page-sizes="[50, 100]"
        :page-size="table_config.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="change_page_index"
        @size-change="change_page_size"
      ></el-pagination>
    </div>

    <form-edit
      :show_edit="show_edit"
      @closeEdit="onCloseEdit"
      ref="form_edit"
      @submitEdit="onSubmitEdit"
    ></form-edit>
  </div>
</template>
<script>
import FormEdit from "@/components/formEdit.vue";
export default {
  components: { FormEdit },
  data() {
    return {
      table_config: {
        border: true, //是否显示边框
        stripe: true, //是否显示隔行色
        "highlight-current-row": true, //是否高亮显示当前点击行
        data: [], //数据
        table_h: 400, //表格高度
        pageCount: 1, //总页数
        pageTotal: 1, //总条数
        pageIndex: 1, //当前页
        pageSize: 50 //每次展示几条
      },
      table_tit_arr: [
        {
          name: "ID",
          show: true
        },
        {
          name: "名字",
          show: true
        },
        {
          name: "手机号",
          show: true
        },
        {
          name: "openId",
          show: true
        },
        {
          name: "人员类型",
          show: true
        }
      ],
      show_filter_sele: false,
      loading: false,
      show_edit: false,
      form_info: {
        name: "",
        tel: "",
        select: "",
        date: "",
        state: true,
        desc: ""
      },
      search_name: "",
      search_num: "",
      search_birthday: "",
      search_sele: "",
      search_sele_arr: ["类型1", "类型2"],
      search_date: "",
      check_top_info: [],
      show_more_search: false,
      is_get: false
    };
  },
  created() {
    this.table_config.table_h = document.documentElement.clientHeight - 190;
    // console.log(this.table_config.table_h);

    window.onresize = () => {
      this.table_config.table_h = document.documentElement.clientHeight - 190;
      //   console.log(this.table_config.table_h);
    };
    this.loading = true;
    this.get_table_info(
      this.table_config.pageIndex,
      this.table_config.pageSize
    );
  },
  mounted() {},
  methods: {
    //切换分页时的回调
    change_page_index(page) {
      this.loading = true;
      this.table_config.pageIndex = page;
      this.get_table_info(page, this.table_config.pageSize);
    },
    //切换显示条数时的回调
    change_page_size(size) {
      this.loading = true;
      this.table_config.pageSize = size;
      this.get_table_info(this.table_config.pageIndex, size);
    },
    get_table_info(index, size) {
      if (!this.is_get) {
        this.is_get = true;
        this.$http({
          url:
            this.$api.api.table_list +
            "?PageSize=" +
            size +
            "&PageIndex=" +
            index
        }).then(res => {
          console.log(res);
          if (res.data.state == 1) {
            this.table_config.data = res.data.data;
            this.table_config.pageCount = res.data.totalPages;
            this.table_config.pageTotal = res.data.totalCount;
          }
          this.loading = false;
          this.is_get = false;
        });
      } else {
        this.$message({
          message: "正在查询,请稍等"
        });
      }
    },
    edit_table_item(idx) {
      this.$refs.form_edit.$emit("edit", {
        openid: this.table_config.data[idx].OpenId,
        nodeid: this.table_config.data[idx].PassageNodeId,
        name: this.table_config.data[idx].Name,
        Mobile: this.table_config.data[idx].Mobile,
        TypeName: this.table_config.data[idx].PassageUserTypeName
      });
      this.check_edit_info = this.table_config.data[idx];
      this.show_edit = true;
    },
    del_table_item(idx) {
      this.$confirm("是否删除此条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$http({
          url:
            this.$api.api.del_table_item +
            "?openId=" +
            this.table_config.data[idx].OpenId
        }).then(res => {
          console.log(res);
          if (res.data.state == 1) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.table_config.data.splice(idx, 1);
          } else if (res.data.state == 0) {
            this.$message({
              type: "warning",
              message: "删除失败!"
            });
          }
        });
      });
    },
    //搜索
    search_tabel() {
      //   this.search_name
      //   this.search_num
      //   this.search_birthday
      //   this.search_sele
      //   this.search_date
      this.$message({
        message: "搜索"
      });
    },
    more_search() {
      this.show_more_search = !this.show_more_search;
      if (this.show_more_search) {
        this.table_config.table_h = document.documentElement.clientHeight - 232;
      } else {
        this.table_config.table_h = document.documentElement.clientHeight - 200;
      }
    },
    clear_search() {
      this.search_name = "";
      this.search_num = "";
      this.search_birthday = "";
      this.search_sele = "";
      this.search_date = "";
    },
    filter_tabel() {
      this.$message({
        message: "筛选"
      });
    },
    update_tabel() {
      this.loading = true;
      this.get_table_info(
        this.table_config.pageIndex,
        this.table_config.pageSize
      );
    },
    create_excel() {
      this.$message({
        message: "导出"
      });
    },
    check_change(val) {
      this.check_top_info = val;
      console.log(val);
    },
    check_del() {
      if (this.check_top_info.length > 0) {
        this.$confirm("是否删除选中项", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          for (var i in this.table_config.data) {
            for (var j in this.check_top_info) {
              if (
                this.table_config.data[i].Index == this.check_top_info[j].Index
              ) {
                this.table_config.data.splice(i, 1);
              }
            }
          }
        });
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning"
        });
      }
    },
    check_edit() {
      if (this.check_top_info.length == 1) {
        console.log(this.check_top_info);
        this.$refs.form_edit.$emit("edit", {
          openid: this.check_top_info[0].OpenId,
          nodeid: this.check_top_info[0].PassageNodeId,
          name: this.check_top_info[0].Name,
          Mobile: this.check_top_info[0].Mobile,
          TypeName: this.check_top_info[0].PassageUserTypeName
        });
        this.show_edit = true;
      } else if (this.check_top_info.length > 1) {
        this.$message({
          message: "一次只能编辑一条数据",
          type: "warning"
        });
      } else if (this.check_top_info.length == 0) {
        this.$message({
          message: "请选择要编辑的数据",
          type: "warning"
        });
      }
    },

    form_submit() {
      this.show_edit = false;
      console.log(this.form_info);
    },
    go_page(url) {
      this.$router.push(url);
    },
    onCloseEdit(idx) {
      this.show_edit = false;
      if (idx == 1) {
        this.loading = true;
        this.get_table_info(
          this.table_config.pageIndex,
          this.table_config.pageSize
        );
      }
    },
    get_check_table_tit(res) {
      console.log(res);
    },
    onSubmitEdit(formData) {
      this.$message({
        message: "保存成功"
      });
      console.log("表单数据", formData);
    }
  }
};
</script>
<style>
.page_box {
  width: 95vw;
  height: 100vh;
  margin: 0 auto;
}
.table_box {
  box-sizing: border-box;
}
/* .top_tit_box
.table_header_box {
  position: absolute;
  left: 0;
  top: 0;
} */
.bottom_page_box {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);
  justify-content: center;
}

.filter_item_box {
  position: absolute;
  left: 0px;
  bottom: -144px;
  width: 120px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
}
.index_box .el-table--border td,
.index_box .el-table--border th,
.index_box
  .el-table__body-wrapper
  .el-table--border.is-scrolling-left
  ~ .el-table__fixed {
  border-right: 1px dashed #ccc !important;
}
.index_box .el-table td,
.index_box .el-table th.is-leaf {
  border-bottom: 1px dashed #ccc !important;
}
.index_box .el-table::before {
  height: 0 !important;
}
.index_box .el-table--border::after,
.index_box .el-table--group::after {
  width: 0 !important;
}
.index_box .el-table--border,
.index_box .el-table--group {
  border: 1px dashed #ccc !important;
}
.index_box .el-table th {
  padding: 3px 0 !important;
  background: #f9f9f9 !important;
}
.index_box .el-table td {
  padding: 3px 0 !important;
}
/* 更多里的日期选择器的宽 */
.index_box .table_header_center .el-date-editor.el-input,
.index_box .table_header_center .el-date-editor.el-input__inner {
  width: 50% !important;
}
.index_box
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped.current-row
  td,
.index_box .el-table__body tr.current-row > td,
.index_box .el-table__body tr.hover-row.current-row > td,
.index_box .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
.index_box .el-table__body tr.hover-row.el-table__row--striped > td,
.index_box .el-table__body tr.hover-row > td {
  background: #e7eaec !important;
}
.index_box .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f9f9f9 !important;
}
.index_box .el-button + .el-button {
  margin-left: 5px !important;
}
.index_box .el-button--mini,
.index_box .el-button--mini.is-round {
  padding: 4px 10px !important;
}
.index_box .el-pager li.active {
  color: #fff !important;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #44b549 !important;
}
.el-select .el-input__inner:focus {
  border-color: #44b549 !important;
}
.el-select-dropdown__item.selected {
  color: #44b549 !important;
}
.el-select-dropdown__item.selected {
  color: #44b549 !important;
}
.el-tabs__item.is-active {
  color: #44b549 !important;
}
.el-tabs__item:hover {
  color: #44b549 !important;
}
.el-tabs__active-bar {
  background: #44b549 !important;
}
</style>