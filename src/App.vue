<script>
export default {
  data(){
    return{

    }
  },
  onLaunch() {
    // var isDebug = true; //调试状态使用本地服务器，非调试状态使用远程服务器
    // if (!isDebug) {
    //   //远程域名
    //   wx.setStorageSync("domainName", "https://sdk.weixin.senparc.com");
    //   wx.setStorageSync("wssDomainName", "wss://sdk.weixin.senparc.com");
    // } else {
    //   //本地测试域名
    //   wx.setStorageSync("domainName", "http://localhost:86");
    //   wx.setStorageSync("wssDomainName", "ws://localhost:86");
    // }
    // 打开调试
    // wx.setEnableDebug({
    //   enableDebug: true
    // });
    //加载初始值
    this.setBrandOpenId("58d029d0e2b244d59e01eaf42e1fc9e7");
    this.setMiniAccountOpenId("225a333b35c96e744552faa68baad899");
  },
  methods: {
    // getUserInfo () {
    //   wx.getUserInfo({
    //     success: (userInfoRes) => {
    //       wx.setStorageSync('userInfo', userInfoRes.userInfo)
    //       this.checkUserInfo(userInfoRes)
    //       console.log(userInfoRes)
    //       this.decodeUserInfo(userInfoRes)
    //     }
    //   })
    // },
    // async checkUserInfo (userInfoRes) {
    // let {data} = await this.$http({
    //   method: 'post',
    //   url: 'https://sdk.weixin.senparc.com/WxOpen/CheckWxOpenSignature',
    //   data: {
    //     sessionId: wx.getStorageSync('sessionId'),
    //     rawData: userInfoRes.rawData,
    //     signature: userInfoRes.signature
    //   }
    // })
    // },
    // async decodeUserInfo (userInfoRes) {
    // let {data} = await this.$http({
    //   method: 'post',
    //   url: 'https://sdk.weixin.senparc.com/WxOpen/DecodeEncryptedData',
    //   data: {
    //     'tpye': 'userInfo',
    //     sessionId: wx.getStorageSync('sessionId'),
    //     encryptedData:userInfoRes.encryptedData,
    //     iv:userInfoRes.iv
    //   }
    // })
    // }

    saveCookie: function(header) {
      if (header) {
        // console.log(header["set-cookie"])
        var setCookie = header["set-cookie"]
          ? header["set-cookie"]
          : header["Set-Cookie"];
        for (var i in setCookie) {
          if (setCookie[i].indexOf("Session") != -1) {
            wx.setStorageSync("SetCookie", setCookie[i]);
          }
        }
      }
    },
    getCookieHeader: function(header) {
      if (!header) {
        header = {
          "content-type": "application/x-www-form-urlencoded"
        };
      }
      var setCookie = wx.getStorageSync("SetCookie");
      if (setCookie) {
        header["Cookie"] = setCookie;
      }
      return header;
    },
    getSessionId: function() {
      var sessionId = wx.getStorageSync("SessionId");
      if (sessionId) {
        return sessionId;
      }
      return null;
    },
    setSessionId: function(sessionId) {
      if (sessionId) {
        wx.setStorageSync("SessionId", sessionId);
      } else {
        wx.setStorageSync("SessionId", null);
      }
      return sessionId;
    },
    getBrandOpenId: function() {
      var brandOpenId = wx.getStorageSync("BrandOpenId");
      if (brandOpenId) {
        return brandOpenId;
      }
      return null;
    },
    setBrandOpenId: function(brandOpenId) {
      if (brandOpenId) {
        wx.setStorageSync("BrandOpenId", brandOpenId);
      } else {
        wx.setStorageSync("BrandOpenId", null);
      }
      return brandOpenId;
    },

    getMiniAccountOpenId: function() {
      var miniAccountOpenId = wx.getStorageSync("MiniAccountOpenId");
      if (miniAccountOpenId) {
        return miniAccountOpenId;
      }
      return null;
    },
    setMiniAccountOpenId: function(miniAccountOpenId) {
      if (miniAccountOpenId) {
        wx.setStorageSync("MiniAccountOpenId", miniAccountOpenId);
      } else {
        wx.setStorageSync("MiniAccountOpenId", null);
      }
      return miniAccountOpenId;
    },

    getMiniFansOpenId: function() {
      var miniFansOpenId = wx.getStorageSync("MiniFansOpenId");
      if (miniFansOpenId) {
        return miniFansOpenId;
      }
      return null;
    },
    setMiniFansOpenId: function(miniFansOpenId) {
      if (miniFansOpenId) {
        wx.setStorageSync("MiniFansOpenId", miniFansOpenId);
      } else {
        wx.setStorageSync("MiniFansOpenId", null);
      }
      return miniFansOpenId;
    },

    getPostData: function(postData) {
      if (!postData) {
        postData = {};
      }

      postData.brandOpenId = this.getBrandOpenId();
      postData.accountOpenId = this.getMiniAccountOpenId();
      postData.MiniFansOpenId = this.getMiniFansOpenId();
      postData.SessionId = this.getSessionId();
      return postData;
    },

    getUserInfo: function(cb) {
      var that = this;
      // var app = getApp();
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo);
        return;
      }
      //获取userInfo并校验
      wx.getUserInfo({
        success: function(userInfoRes) {
          console.log("get userinfo", userInfoRes);
          var userinfo = userInfoRes.userInfo;
          that.globalData.userInfo = userinfo;
          typeof cb == "function" && cb(that.globalData.userInfo);

          this.onLogin(userinfo);
        }
      });

      //调用登录接口
    },

    onLogin: function(userInfo, cb) {
      var that = this;
      that.$fun.loading("登录中...");
      wx.login({
        success: function(res) {
          console.log(res);
          var header = that.getCookieHeader();
          var postData = that.getPostData();
          postData.code = res.code;
          postData.userInfo = userInfo;
          postData.wechatOpenId = wx.getStorageSync('wechatOpenId')
          that
            .$http({
              url: that.$api.api.login,
              method: "POST",
              header: header,
              data: postData
            })
            .then(result => {
              that.$fun.hide_loading();
              if (result.data.state == 1) {
                that.saveCookie(result.headers);
                that.setSessionId(result.data.data.SessionId);
                that.setMiniFansOpenId(result.data.data.MiniFansOpenId);
                typeof cb == "function" && cb(result.data);
              }
            });
        }
      });
    },

    checkWxOpenSignature: function(userInfoRes) {
      var app = getApp();
      var header = app.getCookieHeader();
      var url =
        wx.getStorageSync("domainName") + "/WxOpen/CheckWxOpenSignature";

      var data = this.getPostData();
      data.rawData = userInfoRes.rawData;
      data.signature = userInfoRes.signature;

      //校验
      wx.request({
        url: url,
        method: "POST",
        header: header,
        data: data,
        success: function(json) {
          console.log(json.data);
        }
      });
    },

    decodeEncryptedData: function() {
      var app = getApp();
      var url = wx.getStorageSync("domainName") + "/WxOpen/DecodeEncryptedData";
      var header = this.getCookieHeader();
      //解密数据（建议放到校验success回调函数中，此处仅为演示）
      wx.request({
        url: url,
        method: "POST",
        header: header,
        data: {
          type: "userInfo",
          sessionId: wx.getStorageSync("sessionId"),
          encryptedData: userInfoRes.encryptedData,
          iv: userInfoRes.iv
        },
        success: function(json) {
          console.log(json.data);
        }
      });
    },
    globalData: {
      userInfo: null
    }
  }
};
</script>

<style>
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
