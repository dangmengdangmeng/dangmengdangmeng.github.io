<template>
  <div style="width:100%;">
    <my-media-box :paramsObj="mediaBoxInfo"></my-media-box>
    <div class="group-title" style="margin-bottom:10px;">考试记录</div>
    <div 
      style="font-size:15px;"
      :content-bordered="false"
    >
      <div class="test-table">
        <div class="size15 test-table-row" style="color:#999; font-weight:bold;">
          <div class="test-table-head" style="min-width:100px;">日期</div>
          <div class="test-table-head" style="min-width:100px;">考试名称</div>
          <div class="test-table-head" style="min-width:100px;">成绩</div>
          <div class="test-table-head" style="min-width:100px;">附件</div>
        </div>
      </div>
      <div>
        <div class="size15 test-table-row" v-for="(item, index) in testInfoList" :key="index">
          <div class="test-table-cell" style="min-width:100px;padding-right:10px;">{{ item.time }}</div>
          <div class="test-table-cell" style="min-width:100px;padding-right:10px;">{{ item.test }}</div>
          <div class="test-table-cell" style="min-width:100px;padding-right:10px;">{{ item.mark }}</div>
          <div class="test-table-cell" style="min-width:100px;padding-right:10px;">{{ item.attachment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import MyMediaBox from '@/components/mediaBox2.vue' 
  export default {
    name: '',
    components: {
      MyMediaBox,
    },
    onLoad (options) {
      console.log(options)
      if (options.isMale == 'true') {
        this.mediaBoxInfo.isMale = true
      } else if (options.isMale == 'false') {
        this.mediaBoxInfo.isMale = false
      }
    },

    data () {
      return {
        mediaBoxInfo: {
          name: '张三',
          workPlace: '京广高铁工务段信阳南站',
          group: '打磨组',
          title: '组长',
          isMale: null
        },
        testInfoList: [
          {
            time: '1997-01-21',
            test: '安全考试',
            mark: '98',
            attachment: '4'
          },
          {
            time: '1997-01-21',
            test: '安全考试',
            mark: '98',
            attachment: '4'
          },
          {
            time: '1997-01-21',
            test: '技能考试',
            mark: '89',
            attachment: '3'
          },
          {
            time: '1999-02-11',
            test: '职称考试',
            mark: '96',
            attachment: '2'
          },
          {
            time: '1997-01-21',
            test: '安全考试',
            mark: '100',
            attachment: '4'
          },
        ]
      }
    },
  }
</script>
<style>
.group-title {
  font-size: 16px;
  margin-left: 5px;
}
.test-table {
  display: table;
  width: 100%;
}

.test-table-row {

}

.test-table-head {
  display: table-cell;
  text-align: center;
}

.test-table-cell {
  text-align: center;
  display: table-cell;
  padding: 5px 0;
}
</style>