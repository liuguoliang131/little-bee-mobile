<!--
 * @Date: 2022-05-11 14:43:27
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-27 15:31:45
 * @FilePath: \little-bee-mobile\src\views\renewalMember\renewalMember.vue
 * @Description: 续费会员
-->
<template>
  <div class="renewalMember">
    <bread></bread>
    <div class="views">
      <div class="member-data">
        <div class="data-row1">
          <span>员工数量：&nbsp;{{shipHistory.memberIdEmployeeSize}}</span>&nbsp;
          <span>任务数量：&nbsp;{{shipHistory.memberJobSize}}</span>
        </div>
        <div class="data-row2">
          剩余天数：&nbsp;{{shipHistory.useDayCount||'0'}}
        </div>
      </div>
      <div class="commodity">
        <div :class="['commodity-item',checked.id===item.id?'checked':'']"
             v-for="item in list"
             :key="item"
             @click="handleCheck(item)">
          <div class="abs-true">
            <img :src="require('../../assets/true.png')"
                 alt="">
          </div>
          <div class="item-row1">任务数量：{{item.jobCount}}</div>
          <div class="item-row1">员工数量：{{item.userCount}}</div>
          <div class="item-row2">
            ￥{{item.unitPrice.value}}
            <span>{{item.unitPrice.value}}元/{{item.useDayCount}}天</span>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
    <div class="fixed-bottom">
      <div class="left">
        <van-checkbox shape="square"
                      v-model="agree">同意小蜜蜂协议</van-checkbox>
      </div>
      <div class="right">
        <div class="text">应付金额：{{checked.unitPrice?checked.unitPrice.value:'0'}}元</div>
        <van-button color="#CB9400"
                    type="info"
                    native-type="button"
                    size="small"
                    @click="handlePay">支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { companyMembershipHistory_findById, h5_membership_selectAll, h5_company_findById, h5_membership_getAmountsPayable, h5_membership_createOrder, h5_membership_pay, appId, h5_membership_findCompanyInfo } from '@/http/api'
import {
  Checkbox,
  Button,
  Toast
} from 'vant'
// import wx from 'weixin-js-sdk'
export default {
  name: 'RenewalMember',
  components: {
    Bread,
    VanCheckbox: Checkbox,
    VanButton: Button
  },
  data() {
    return {
      agree: false,
      list: [],
      checked: {},
      shipHistory: {
        memberIdEmployeeSize: 0,
        memberJobSize: 0,
        useDayCount: 0
      }
    }
  },
  computed: {

  },
  methods: {
    async getShipHistory() {
      const res = await this.$http({
        method: 'get',
        url: h5_membership_findCompanyInfo,
        params: {
          id: this.$store.state.user.userInfo.id || this.$store.state.user.userInfo.companyId
        }
      })
      if (res.success) {
        this.shipHistory = res.model || {
          memberIdEmployeeSize: 0,
          memberJobSize: 0,
          useDayCount: 0
        }
      }
    },
    async getUserInfo() {
      const res = await this.$http({
        method: 'get',
        url: h5_company_findById,
        params: {
          id: this.$store.state.user.userInfo.companyId || this.$store.state.user.userInfo.id
        }
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      this.$store.commit('user/set_userInfo', res.model)
    },
    async getList() {
      const res = await this.$http({
        method: 'get',
        url: h5_membership_selectAll,
        params: {}
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      res.model && res.model.forEach(item => {
        item.checked = false
      })
      this.list = res.model || []
    },
    handleCheck(item) {
      this.checked = item
    },
    // 去支付
    handlePay() {
      if (!this.agree) {
        return Toast('请勾选同意协议')
      }
      if (JSON.stringify(this.checked) === '{}') {
        return Toast('请选择一种会员')
      }
      this.paymentFn()
    },
    // 支付方法
    paymentFn() {
      const that = this
      return new Promise((resolve) => {
        that.$http({
          method: 'get',
          url: h5_membership_getAmountsPayable,
          params: {
            id: that.checked.id,
            companyId: that.$store.state.user.userInfo.companyId || that.$store.state.user.userInfo.id
          }
        }).then(res => {
          if (!res.success) {
            resolve(false)
            return Toast(res.msg)
          }
          const { requestNum } = res.model
          that.$http({
            method: 'post',
            url: h5_membership_createOrder,
            data: {
              requestNum,
              membershipId: that.checked.id,
              userOpenId: that.$store.state.user.openId
            }
          }).then(res1 => {
            if (!res1.success) {
              resolve(false)
              return Toast(res1.msg)
            }
            const { orderNum } = res1.model
            that.$http({
              method: 'get',
              url: h5_membership_pay,
              params: {
                orderNum
              }
            }).then(res2 => {
              if (!res2.success) {
                resolve(false)
                return Toast(res2.msg)
              }
              // Toast('SUCCESS')
              const { timeStamp, nonceStr, signature, package: packages, signType, paySign } = res2.model
              // 验证微信环境
              // wx.config({
              //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              //   appId, // 必填，公众号的唯一标识
              //   timeStamp: 'AAA', // 必填，生成签名的时间戳
              //   nonceStr: nonceStr, // 必填，生成签名的随机串
              //   signature: signature, // 必填，签名，见附录1
              //   jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              // })
              // wx.ready(function () {
              //   console.log('res2.model', res2.model)
              //   wx.chooseWXPay({
              //     timeStamp: 'AAA', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              //     nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
              //     package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              //     signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              //     paySign: paySign || res2.model.sign, // 支付签名
              //     success: function (res) {
              //       // 支付成功后的回调函数
              //       resolve(res)
              //     },
              //     fail: function (res) {
              //       // 失败回调函数
              //       resolve(false)
              //     }
              //   })
              // })
              // wx.error(function (res) {
              //   resolve(false)
              //   // config信息验证失败会执行error函数
              // })


              // var debug;
              // var appId;
              // var timestamp;
              // var nonceStr;
              // var signature;
              // var jsApiList;
              function onBridgeReady() {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                  "appId": appId, //公众号名称，由商户传入
                  "timeStamp": timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  "nonceStr": nonceStr, // 支付签名随机串，不长于 32 位
                  "package": packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                  "signType": signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
                  "paySign": paySign,
                },
                  function (res) {
                    // 支付成功
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                      this.getUserInfo()
                      this.getShipHistory()
                    }
                    // 支付过程中用户取消
                    if (res.err_msg == "get_brand_wcpay_request:cancel") {

                    }
                    // 支付失败
                    if (res.err_msg == "get_brand_wcpay_request:fail") {

                    }
                    /**
                     * 其它
                     * 1、请检查预支付会话标识prepay_id是否已失效
                     * 2、请求的appid与下单接口的appid是否一致
                     * */
                    if (res.err_msg == "调用支付JSAPI缺少参数：total_fee") {

                    }
                  })
              }

              // 检测支付环境中的
              // WeixinJSBridge
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
                }
              } else {
                onBridgeReady()
              }


            })
          })
        }).catch(error => {
          console.log(error)
          Toast('catch error: 支付接口异常')
        })
      })

    }
  },
  created() {
    this.getUserInfo()
    this.getShipHistory()
    this.getList()
  }
}
</script>

<style scoped lang="less">
.renewalMember {
  height: 100vh;
  background-color: #f7f7f7;
  .views {
    .member-data {
      margin: 15px;
      padding: 0 15px;
      height: 55px;
      background: no-repeat url("~@/assets/vip-bg.png") center;
      background-size: cover;
      border-radius: 5px;
      .data-row1 {
        padding: 5px 0;
        span {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
      }
      .data-row2 {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
      }
    }
    .commodity {
      display: flex;
      flex-wrap: wrap;
      .commodity-item {
        width: 165px;
        height: 101px;
        padding: 10px 15px;
        margin-top: 15px;
        margin-left: 15px;
        border-radius: 5px;
        background: #ffff;
        position: relative;
        .abs-true {
          display: none;
          position: absolute;
          bottom: 6px;
          right: 6px;
          img {
            width: 17px;
            height: 17px;
          }
        }
        .item-row1 {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          margin-bottom: 10px;
        }
        .item-row2 {
          padding-top: 8px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
          span {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }
        }
      }
      .checked {
        background-color: #ffe787;
        color: #3b2b14;
        .item-row1 {
          color: #3b2b14;
        }
        .item-row2 {
          color: #3b2b14;
          span {
            color: #3b2b14;
          }
        }
        .abs-true {
          display: block;
        }
      }
    }
    footer {
      height: 100px;
    }
  }
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.05);
    z-index: 9;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .left {
      flex: 4;
    }
    .right {
      flex: 6;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .text {
        padding: 0 15px;
      }
    }
  }
  /deep/.van-checkbox {
    font-size: 12px;
  }
}
</style>