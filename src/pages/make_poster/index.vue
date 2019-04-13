<template>
  <div class="poster_page w_h100 pt30 pb150">
    <img
      class="d_block w_90 poster_img m_center"
      :src="poster_img"
      mode="widthFix"
      @click="preview_img"
    >
    <div class="bottom_btn_box flex_space_between size15 w_80">
      <div class="bottom_btn">
        邀好友助力
        <button open-type="share"></button>
      </div>
      <div class="bottom_btn" @click="go_lottery1">抽大奖</div>
    </div>
    <div class="save_btn bottom_btn" @click="save">保存到相册</div>
    <open_set v-if="show_setting" @cb="setting_cb" @close_setting="close_setting"></open_set>
  </div>
</template>
<script>
import open_set from "@/components/open_set";

export default {
  components: {
    open_set
  },
  data() {
    return {
      poster_img: "",
      show_setting: false,
      go_lottery: false
    };
  },
  onShow() {},
  mounted() {
    this.poster_img = wx.getStorageSync("poster")
      ? wx.getStorageSync("poster")
      : "";

    wx.getImageInfo({
      src: wx.getStorageSync("poster"),
      success: res => {
        // console.log(res.path);
        wx.compressImage({
          src: res.path,
          quality: 60,
          complete: res2 => {
            // console.log(res2);
            wx.uploadFile({
              url: "https://ysl.entfly.com/File/UploadFile2",
              // url: "https://1.mengniuarla.com/File/UploadFile2",
              filePath: res2.tempFilePath,
              name: "poster_img",
              success: res1 => {
                var res1_data = JSON.parse(res1.data);
                console.log(res1_data);
                this.go_lottery = true;
                this.set_user_info({
                  name: wx.getStorageSync("u_name"),
                  date: wx.getStorageSync("u_date"),
                  tel: wx.getStorageSync("u_tel"),
                  address: wx.getStorageSync("u_city")
                    ? wx.getStorageSync("u_city").join("-")
                    : "",
                  img: res1_data.data.src
                });
              }
            });
          }
        });
      }
    });
  },

  methods: {
    save() {
      wx.saveImageToPhotosAlbum({
        filePath: this.poster_img,
        success: res => {
          console.log(res);
          this.$fun.toast("保存成功");
        },
        fail: err => {
          if (
            err.errMsg == "saveImageToPhotosAlbum:fail auth deny" ||
            err.errMsg == "saveImageToPhotosAlbum:fail:auth denied" ||
            err.errMsg == "saveImageToPhotosAlbum:fail authorize no response"
          ) {
            this.show_setting = true;
          } else if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
            this.$fun.toast("保存失败", "none");
          }
          console.log(err);
        }
      });
    },
    go_lottery1() {
      if (this.go_lottery) {
        this.go_page("/pages/lottery/main");
      }
    },
    close_setting() {
      this.show_setting = false;
    },
    setting_cb(state) {
      console.log(state);
      if (state) {
        this.show_setting = false;
        this.save();
      }
    },
    preview_img() {
      wx.previewImage({
        current: this.poster_img, // 当前显示图片的http链接
        urls: [this.poster_img] // 需要预览的图片http链接列表
      });
    },
    go_page(url) {
      wx.navigateTo({
        url: url
      });
    },

    set_user_info(obj) {
      this.$http({
        url: this.$api.api.set_userInfo,
        method: "post",
        data: {
          BabyName: obj.name,
          BabyBirthday: obj.date,
          Mobile: obj.tel,
          RegionAddress: obj.address,
          imgUrl: obj.img
        }
      }).then(res => {
        if (res.data.state == 1) {
          this.$fun.toast("报名成功");
        }
        console.log(res);
      });
    }
  },
  onShareAppMessage() {
    return {
      title: "快来pick我家萌宝，一起赢阿尔卑斯山有机体验游！",
      imageUrl: "/static/images/share.jpg",
      path: "/pages/index/main?id=1"
    };
  }
};
</script>

<style scoped>
.poster_page {
  background: #cfe7cc;
}
.poster_img {
  height: 80vh;
  box-shadow: 3px 3px 1px 1px rgba(57, 162, 77, 0.8);
}
.bottom_btn_box {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
}
.bottom_btn {
  position: relative;
  width: 240rpx;
  border-radius: 5px;
  background: #36a14a;
  color: #fff;
  text-align: center;
  padding: 6px 0;
}
.bottom_btn > button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}
.save_btn {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>