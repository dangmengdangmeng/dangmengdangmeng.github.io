<template>
  <div class="wx_table_box">
    <el-table
      class="m_center"
      v-loading="loading"
      element-loading-text="拼命加载中"
      :height="table_info.table_config.height"
      :data="table_info.table_config.data"
      :border="table_info.table_config.border"
      :stripe="table_info.table_config.stripe"
      :highlight-current-row="table_info.table_config['highlight-current-row']"
    >
      <el-table-column
        :prop="item.prop"
        :resizable="false"
        :sortable="item.sort?item.sort:false"
        align="center"
        :label="item.name"
        v-for="(item,index) in table_info.table_tit_arr"
        :key="index"
      ></el-table-column>
      <el-table-column
        :resizable="false"
        align="center"
        label="操作"
        v-if="table_info.show_operation"
      >
        <template slot-scope="scope">
          <div style="color:#5b74b2;">查看详情</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="true"
      class="t_center bg_white ptb10"
      :total="table_info.table_config.pageTotal"
      :page-sizes="[50, 100]"
      :page-size="table_info.table_config.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="change_page_index"
      @size-change="change_page_size"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  props: ["table_info"],
  created() {},
  mounted() {
    this.$on("loading", val => {
      if (val == true) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    });
  },
  methods: {
    get_table_info(index, size) {
      this.$http({
        url: this.$api.api.table + "?PageSize=" + size + "&PageIndex=" + index
      }).then(res => {
        this.loading = false;
        this.table_info.table_config.data = res.data.data.rows;
        this.table_info.table_config.pageCount = res.data.data.page.TotalPages;
        this.table_info.table_config.pageTotal = res.data.data.page.TotalItems;
      });
    },
    //切换分页时的回调
    change_page_index(page) {
      this.loading = true;
      this.table_info.table_config.pageIndex = page;
      this.get_table_info(page, this.table_info.table_config.pageSize);
    },
    //切换显示条数时的回调
    change_page_size(size) {
      this.loading = true;
      this.table_info.table_config.pageSize = size;
      this.get_table_info(this.table_info.table_config.pageIndex, size);
    }
  }
};
</script>
<style>
.wx_table_box .el-pager li.active {
  color: #44b549 !important;
}
.wx_table_box .el-pager li:hover {
  color: #44b549 !important;
}
.wx_table_box .el-pagination .btn-next:hover,
.wx_table_box .el-pagination .btn-prev:hover {
  color: #44b549 !important;
}
</style>