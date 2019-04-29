<template>
  <div>
    <div style="margin-bottom:80px;">
      <div class="group-title">填报人信息</div>
      <div class="weui-cells">
        <div class="flex s_b_b">
          <div class="input_left_w105 size15 pl15 color_6">
            <span>创建人</span>
          </div>
          <div class="weui-cell size15 max_w">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <img class="checkin-details-avatar" src="/static/images/u169.png" alt="avatar">
              <input class="weui-input" style="padding-left:35px;" type="text" auto-complete="off" :placeholder="checkinData.creatorInfo.creator" :readonly="checkinData.creatorInfo.read">
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="flex s_b_b">
          <div class="input_left_w105 size15 pl15 color_6">
            <span>归属信息</span>
          </div>
          <div class="weui-cell size15 max_w">
            <div class="weui-cell__hd"></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" auto-complete="off" :placeholder="checkinData.creatorInfo.fromWhere" :readonly="checkinData.creatorInfo.read">
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
      <div class="group-title">打卡信息</div>
      <edit-input :edit_input="checkinData.checkinInfo"></edit-input>
      <div class="group-title" style="font-weight:bold;">打卡明细</div>
      <div class="group-title">开始打卡信息</div>
      <edit-input :edit_input="checkinData.checkinStartInfo"></edit-input>
      <!-- map -->
      <map 
        style="width:100%; height:250px;"
        :longitude="116.255972" 
        :latitude="40.072671"
        :markers="mapMarkers"
      ></map>
      <div class="cell-title">打卡照片</div>
      <div style="display:flex; justify-content:space-evenly;">
        <img
          v-for="(item, index) in startImageList" 
          :src="item.src" 
          :key="index"
          class="checkin-details-photo"
          @click="showImage(startImgList)"
        />
      </div>
      <div>
      </div>
      <div class="cell-title">设备</div>
      <div 
        class="cell-title" 
        v-for="item in checkinData.checkinStartEquipment" 
        :key="item"
        style="margin-left:25px;"
      >
        {{ item }}
      </div>
      <edit-input :edit_input="checkinData.checkinStartOther"></edit-input>
      <div class="group-title">结束打卡信息</div>
      <edit-input :edit_input="checkinData.checkinEndInfo"></edit-input>
      <!-- map -->
      <map 
        style="width:100%; height:300px;"
        :longitude="116.255972" 
        :latitude="40.072671"
        :markers="mapMarkers"
      ></map>
      <div class="cell-title">打卡照片</div>
      <div style="display:flex; justify-content:space-evenly;">
        <img
          v-for="(item, index) in endImageList" 
          class="checkin-details-photo"
          :src="item.src" 
          :key="index"
          @click="showImage(endImgList)"
        />
      </div>
      <div>
      </div>
      <div class="cell-title">设备</div>
      <div 
        class="cell-title" 
        v-for="(item, index) in checkinData.checkinEndEquipment" 
        :key="index"
        style="margin-left:25px;"
      >
        {{ item }}
      </div>
      <edit-input :edit_input="checkinData.checkinEndOther"></edit-input>
      <div class="group-title">关联信息</div>
      <edit-input :edit_input="checkinData.bindInfo"></edit-input>
    </div>
  </div>
</template>
<script type="text/javascript">
  import EditInput from '@/components/input_item.vue'
  export default {
    name: 'checkinDetails',
    components: {
      EditInput,
    },
    data () {
      return {
        isMapCommentShow: true,
        mapMarkers: [
          {
            id: 1,
            longitude: 116.255972,
            latitude: 40.072671,
            title: '打卡地点',
            iconPath: '../../../../static/images/place.png',
            width: '50px',
            height: '50px',
            label: {
              content:'打卡地点',
              color: '#999',
              fontSize: 12,
              display: 'ALWAYS'
            }
          }
        ],
        checkinData: [],
        mockData: [
          {
            id: '1',
            creatorInfo: {
              creator: '张三',
              avatar: '',
              fromWhere: '京广高铁工务段信阳东站',
              read: true, no_arrow: true
            },
            checkinInfo: [
              { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
              { v: '打卡日期', value: '2019-01-12', read: true, no_arrow: true },
              { v: '开始打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '结束打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '作业时长', value: '1小时32分15秒', read: true, no_arrow: true },
              { v: '打卡轨迹', value: '点击查看', read: true, no_arrow: true, isLink: true }
            ],
            checkinStartInfo: [
              { v: '开始打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '经纬度', value: '123.87， 98.298', read: true, no_arrow: true  },
              { v: '位置', value: '信阳南站南广场', read: true, no_arrow: true  },
            ],
            checkinStartPhoto: [
              'url', 'url', 'url'
            ],
            checkinStartEquipment: [
              '设备1名称', '设备2名称'
            ],
            checkinStartOther: [
              { v: '配合人员', value: '李四、王五', read: true, no_arrow: true },
              { v: '备注', value: '备注信息', read: true, no_arrow: true },
            ],
            checkinEndInfo: [
              { v: '结束打卡时间', value: '2019-01-12 19:00:12', read: true, no_arrow: true },
              { v: '经纬度', value: '123.87， 98.298', read: true, no_arrow: true  },
              { v: '位置', value: '信阳南站南广场', read: true, no_arrow: true  },
            ],
            checkinEndPhoto: [
              'url', 'url', 'url'
            ],
            checkinEndEquipment: [
              '设备1名称', '设备2名称'
            ],
            checkinEndOther: [
              { v: '配合人员', value: '李四、王五', read: true, no_arrow: true },
              { v: '备注', value: '备注信息', read: true, no_arrow: true },
            ],
            bindInfo: [
              {v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
              {v: '日报日期', value: '2019-01-12', read: true, no_arrow: true },
              {v: '关联时间', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
            ]
          },
          {
            id: '2',
            creatorInfo: {
              creator: '李四',
              avatar: '',
              fromWhere: '京广高铁工务段信阳东站',
              read: true, no_arrow: true
            },
            checkinInfo: [
              { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
              { v: '打卡日期', value: '2019-01-12', read: true, no_arrow: true },
              { v: '开始打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '结束打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '作业时长', value: '1小时32分15秒', read: true, no_arrow: true },
              { v: '打卡轨迹', value: '点击查看', read: true, no_arrow: true, isLink: true }
            ],
            checkinStartInfo: [
              { v: '开始打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '经纬度', value: '123.87， 98.298', read: true, no_arrow: true  },
              { v: '位置', value: '信阳南站南广场', read: true, no_arrow: true  },
            ],
            checkinStartPhoto: [
              'url', 'url', 'url'
            ],
            checkinStartEquipment: [
              '设备1名称', '设备2名称'
            ],
            checkinStartOther: [
              { v: '配合人员', value: '李四、王五', read: true, no_arrow: true },
              { v: '备注', value: '备注信息', read: true, no_arrow: true },
            ],
            checkinEndInfo: [
              { v: '结束打卡时间', value: '2019-01-12 19:00:12', read: true, no_arrow: true },
              { v: '经纬度', value: '123.87， 98.298', read: true, no_arrow: true  },
              { v: '位置', value: '信阳南站南广场', read: true, no_arrow: true  },
            ],
            checkinEndPhoto: [
              'url', 'url', 'url'
            ],
            checkinEndEquipment: [
              '设备1名称', '设备2名称'
            ],
            checkinEndOther: [
              { v: '配合人员', value: '李四、王五', read: true, no_arrow: true },
              { v: '备注', value: '备注信息', read: true, no_arrow: true },
            ],
            bindInfo: [
              {v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
              {v: '日报日期', value: '2019-01-12', read: true, no_arrow: true },
              {v: '关联时间', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
            ]
          },
          {
            id: '3',
            creatorInfo: {
              creator: '王五',
              avatar: '',
              fromWhere: '京广高铁工务段信阳东站',
              read: true, no_arrow: true
            },
            checkinInfo: [
              { v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
              { v: '打卡日期', value: '2019-01-12', read: true, no_arrow: true },
              { v: '开始打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '结束打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '作业时长', value: '1小时32分15秒', read: true, no_arrow: true },
              { v: '打卡轨迹', value: '点击查看', read: true, no_arrow: true, isLink: true }
            ],
            checkinStartInfo: [
              { v: '开始打卡时间', value: '2019-01-12 09:00:12', read: true, no_arrow: true },
              { v: '经纬度', value: '123.87， 98.298', read: true, no_arrow: true  },
              { v: '位置', value: '信阳南站南广场', read: true, no_arrow: true  },
            ],
            checkinStartPhoto: [
              'url', 'url', 'url'
            ],
            checkinStartEquipment: [
              '设备1名称', '设备2名称'
            ],
            checkinStartOther: [
              { v: '配合人员', value: '李四、王五', read: true, no_arrow: true },
              { v: '备注', value: '备注信息', read: true, no_arrow: true },
            ],
            checkinEndInfo: [
              { v: '结束打卡时间', value: '2019-01-12 19:00:12', read: true, no_arrow: true },
              { v: '经纬度', value: '123.87， 98.298', read: true, no_arrow: true  },
              { v: '位置', value: '信阳南站南广场', read: true, no_arrow: true  },
            ],
            checkinEndPhoto: [
              'url', 'url', 'url'
            ],
            checkinEndEquipment: [
              '设备1名称', '设备2名称'
            ],
            checkinEndOther: [
              { v: '配合人员', value: '李四、王五', read: true, no_arrow: true },
              { v: '备注', value: '备注信息', read: true, no_arrow: true },
            ],
            bindInfo: [
              {v: '编号', value: 'EO1809231814196051', read: true, no_arrow: true },
              {v: '日报日期', value: '2019-01-12', read: true, no_arrow: true },
              {v: '关联时间', value: '2019-01-12 12:12:23', read: true, no_arrow: true }
            ]
          },
        ],
        startImageList: [
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
        ],
        endImageList: [
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
          {
            msrc: '/static/images/u13745.png',
            src: '/static/images/u13745.png',
          },
        ]
      }
    },

    computed: {
      startImgList () {
        let list = ['https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg', 'https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg', 'https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg','https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg']
        return {
          current: 'https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg',          
          urls: list}
      },  
      endImgList () {
        let list = ['https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg', 'https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg', 'https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg']
        return {
          current: 'https://graph.baidu.com/thumb/v2/3262480450,3332778640.jpg',
          urls: list
        }
      },  
    },
    
    onLoad (options) {
      let id = options.id ? options.id : 1
      this.mockData.forEach(item => {
        if (id == item.id) this.checkinData = item
      })
      console.log(this.checkinData)
    },

    methods: {
      showImage (obj) {
        wx.previewImage(obj)
      }
    },
  }
</script>
<style>
.group-title {
  font-size: 16px;
  margin-left: 5px;
  padding: 10px 0;
}
.cell-title {
  font-size: 15px;
  margin-left: 15px;
  padding: 10px 0;
}
.map {
  width: 100%;
  height: 240px;
}
.checkin-details-avatar {
   width:30px; 
   height: 30px;
   position:absolute; 
   top: 50%; 
   transform: translateY(-50%);
}
.checkin-details-photo {
  display: inline-block;
  width: 65px;
  height: 65px;
}
</style>