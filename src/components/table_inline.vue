<template>
  <div class="admin-table-inline" :style="{display: displayInline ? 'inline-block' : 'block'}">
    <el-table
      :data="currPageData"
      style="width: 100%">
      <el-table-column
        prop="col1"
        label="省份"
        width="180">
      </el-table-column>
      <el-table-column
        prop="col2"
        label="用户数"
        width="180"
        sortable
        align="center">
      </el-table-column>
      <el-table-column v-if="showPercentage" prop="col3" label="占比" align="center">
        <template slot-scope="scope">
          {{calcPercentage(scope.$index)}}
        </template>
      </el-table-column>
      <el-table-column v-else prop="col3" label="" align="center">
        <template slot-scope="scope">
          <div>
            <div class="admin-table_progress-bar" :style="{width: calcPercentage(scope.$index)}"></div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="admin-table-pagination" v-if="!hidePagination">
      <span class="pagination-text">{{currentPage}} / {{totalPage}}</span>
      <el-button class="pagination-btn" @click="lastPage"><i class="el-icon-caret-left"></i></el-button>
      <el-button class="pagination-btn"  @click="nextPage"><i class="el-icon-caret-right"></i></el-button>
      <div style="display:inline-block">
        <el-input style="width:100px;"></el-input>
      </div>
      <el-button>跳转</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {  },
    data () {
      return {
         pageSize: 10,
         currentPage: 1
      }
    },
    props: ['tableData',  'showPercentage', 'hidePagination', 'displayInline'],
    computed: {
      totalCount () {
        return this.tableData.reduce((acc, cur) => {
          return acc + Number(cur.col2)
        }, 0)
      },
      totalPage () {
        return Math.ceil(this.tableData.length/this.pageSize)
      },
      currPageData () {
        return this.tableData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      }
    },
    methods: {
      calcPercentage (idx) {
        return (Number(this.tableData[idx].col2)/this.totalCount *100).toFixed(2) + '%'
      },
      nextPage () {
        if (this.currentPage < this.totalPage) {
          this.currentPage++
        }
      },
      lastPage () {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      }
    }
  }
</script>
<style>
</style>