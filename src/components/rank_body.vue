<template>
  <div class="rank-body-box">
    <div class="rank-body-item" v-for="(item, index) in list" :key="index" @click="goUserPage">
      <div class="place-box">
        <img
          class="icon-medal"  
          v-if="item.place===1" 
          src="http://ysl.entfly.com/2/ysl/images/p5/icon-gold.png" 
          alt="icon"
          mode="aspectFit"
        >
        <img 
          class="icon-medal" 
          v-else-if="item.place===2" 
          src="http://ysl.entfly.com/2/ysl/images/p5/icon-silver.png" 
          alt="icon"
          mode="aspectFit"
        >
        <img
          class="icon-medal" 
          v-else-if="item.place===3" 
          src="http://ysl.entfly.com/2/ysl/images/p5/icon-bronze.png" 
          alt="icon"
          mode="aspectFit"
        >
        <span v-else style="font-size:22px;">{{item.place}}</span>
      </div>
      <div class="user-info-box" @click="goUserPage">
        <img class="avatar" :src="item.avatar" alt="avatar" mode="aspectFit">
        <span>{{item.name}}</span>
      </div>
      <span>{{item.count}} 票</span>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: '',
    components: {},
    data () {
      return {
        list: [
          {
            place: 1,
            name: 'KENNY',
            avatar:'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 2,
            name: 'ANNIE',
            avatar: 'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 3,
            name: 'JASON',
            avatar: 'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 4,
            name: 'TERRY',
            avatar: 'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 5,
            name: 'LEO',
            avatar: 'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 6,
            name: 'TERRY',
            avatar:'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 7,
            name: 'LEO',
            avatar:'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
          {
            place: 8,
            name: 'TERRY',
            avatar:'http://ysl.entfly.com/2/ysl/images/p5/avatar.png',
            count: 123456
          },
        ]
      }
    },
    props: [''],
    methods: {
      goUserPage () {
        mpvue.navigateTo({url: '/pages/personal/main'})
      }
    }
  }
</script>
<style>
.rank-body-box {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
.rank-body-box>div:nth-child(2n+1) {
  background-color: #63a959;
  color: #fff;
}
.rank-body-box>div:nth-child(2n) {
  color: #63a959;
}

.rank-body-item {
  display: flex;
  /* grid-template-columns: 17% 43% 40%; */
  height: 40px;
  align-items: center;
}

.user-info-box {
  display: flex;
  align-items: center;
  height: 100%;
}
.user-info-box .avatar {
  display: block;
  width: 30%;
  margin-right: 10px;
  height: 85%;
}
.place-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.icon-medal {
  margin-left: 15px;
  height: 90%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>