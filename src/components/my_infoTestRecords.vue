<template>
  <div>
    <div class="group-title" style="margin-bottom:10px;">考试记录</div>
    <xtable 
      style="font-size:15px;"
      :content-bordered="false"
    >
      <thead>
        <tr class="size15" style="color:#999; font-weight:bold;">
          <th style="min-width:100px;">日期</th>
          <th style="min-width:100px;">考试名称</th>
          <th style="min-width:100px;">成绩</th>
          <th style="min-width:100px;">附件</th>
        </tr>
      </thead>
      <tbody>
        <tr class="size15" v-for="(item, index) in testInfoList" :key="index">
          <td style="padding-right:10px;">{{ item.time }}</td>
          <td style="padding-right:10px;">{{ item.test }}</td>
          <td style="padding-right:10px;">{{ item.mark }}</td>
          <td style="padding-right:10px;">{{ item.attachment }}</td>
        </tr>
      </tbody>
    </xtable>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {
    },
    data () {
      return {
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
</style>