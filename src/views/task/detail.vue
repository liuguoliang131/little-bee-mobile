<!--
 * @Date: 2022-04-26 10:45:14
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-13 16:14:04
 * @FilePath: \little-bee-mobile\src\views\task\detail.vue
 * @Description: 任务详情
-->
<template>
  <div class="detail">
    <bread>
      <!-- <van-icon name="share-o"
                color="#cb9400" /> -->
    </bread>
    <div class="views">
      <van-form @submit="onSubmit">
        <van-field v-model.trim="form.title"
                   type="text"
                   name="title"
                   label="标题"
                   placeholder="请输入标题"
                   required
                   :rules="[{ required: true, message: '请填写标题' }]"
                   :disabled="true" />
        <van-field v-model.trim="form.sortTitle"
                   type="text"
                   name="sortTitle"
                   label="副标题"
                   placeholder="请输入副标题"
                   required
                   :rules="[{ required: true, message: '请填写标题' }]"
                   :disabled="true" />
        <van-field v-model="form.count"
                   type="digit"
                   name="count"
                   label="数量"
                   placeholder="请输入数量"
                   required
                   :rules="[{ required: true, message: '请填写数量' },{ validator: countValidator, message: '数量必须大于0' }]"
                   :disabled="true" />
        <van-field v-model="form.unitPrice"
                   type="number"
                   name="unitPrice"
                   label="单价"
                   placeholder="请输入单价"
                   required
                   :rules="[{ required: true, message: '请填写单价' }, { validator: unitPriceValidator, message: '单价必须大于0' }]"
                   :disabled="true" />
        <van-field v-model.trim="form.remark"
                   type="text"
                   name="remark"
                   label="备注"
                   placeholder="请输入备注"
                   :disabled="true" />
        <van-field v-model="form.totalPrice.value"
                   type="number"
                   name="totalPrice"
                   label="总价"
                   :disabled="true" />
        <div class="file">
          <span class="label">图片</span>
          <van-uploader v-model="photos"
                        :deletable="false"
                        :readonly="true"
                        :show-upload="false" />
        </div>
        <!-- <div class="sub-btn">
          <van-button color="#CB9400"
            block
            type="info"
            native-type="submit">提交</van-button>
        </div> -->
        <div class="fixed-b">
          <div class="b-1">
            <div>工序合计: {{processTotal}}元</div>
            <div>利润: {{profit}}元</div>
          </div>
          <div class="b-2">
            <van-button v-show="form.jobStatus==='PAUSE'||form.jobStatus==='INIT'"
                        color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small"
                        @click="handleStart">开始</van-button>
            <van-button v-show="form.jobStatus!=='Finish'"
                        color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small"
                        @click="handleComplete">完成</van-button>
            <van-button v-show="form.jobStatus==='START'"
                        color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small"
                        @click="handleSuspend">暂停</van-button>
            <van-button color="#CB9400"
                        type="info"
                        native-type="button"
                        size="small"
                        @click="handleCreate">再次创建</van-button>
          </div>
        </div>
      </van-form>
      <div class="title">
        <div class="title-1">
          工序
        </div>
        <div class="title-2">
          <!-- <van-icon name="plus"
                    @click="handleShowAddDialog" /> -->
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>单价(元)</th>
            <th>图标</th>
            <th>备注</th>
            <th>技工信息</th>
          </tr>
        </thead>
        <tbody v-if="form.jobDetailProcessResponseList.length">
          <tr v-for="(item,index) in form.jobDetailProcessResponseList"
              :key="index">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.unitPrice.value}}</td>
            <td>
              <div class="td-img"
                   v-if="item.imagesResponseList&&item.imagesResponseList.length">
                <img :src="item.imagesResponseList[0].url"
                     alt="图标">
                <span>x{{item.imagesResponseList.length||0}}</span>
              </div>
            </td>
            <td>{{item.remark}}</td>
            <td>
              <!-- 技工1 x5 技工2 x5 -->
            </td>
          </tr>
        </tbody>
        <tbody v-else
               class="empty">
          <tr>
            <td colspan="6">暂无数据</td>
          </tr>
        </tbody>
      </table>
      <footer></footer>
    </div>
    <van-dialog v-model="dialogVisible"
                title="任务分享"
                :showConfirmButton="false"
                close-on-click-overlay
                @close="close">
      <div class="dialog-content">
        <van-form @submit="handleConfirmShare"
                  ref="dialogForm">
          <van-field v-model.trim="dialogForm.title"
                     name="name"
                     label="分享标题"
                     placeholder="分享标题"
                     :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="dialogForm.count"
                     type="dight"
                     name="count"
                     label="数量"
                     placeholder="数量"
                     :rules="[{ required: true, message: '请填写数量' },{ validator: unitPriceValidator, message: '数量必须大于0' }]" />
          <van-field v-model="dialogForm.unitPrice.value"
                     type="number"
                     name="unitPrice"
                     label="分享单价"
                     placeholder="分享单价"
                     :rules="[{ required: true, message: '请填写数量' },{ validator: unitPriceValidator, message: '分享单价必须大于0' }]" />
          <!-- <van-field v-model.trim="dialogForm.total"
                     type="number"
                     name="total"
                     label="分享总价"
                     placeholder="分享总价"
                     :disabled="true" /> -->
          <!-- <van-field v-model.trim="dialogForm.contracts"
                     type="text"
                     name="contracts"
                     label="联系人"
                     placeholder="联系人"
                     :disabled="true" /> -->
          <!-- <van-field v-model="dialogForm.phone"
                     type="text"
                     name="phone"
                     label="联系方式"
                     placeholder="联系方式"
                     :disabled="true" /> -->
          <!-- <van-field v-model.trim="dialogForm.address"
                     type="text"
                     name="address"
                     label="联系地址"
                     placeholder="联系地址"
                     :disabled="true" /> -->
          <div class="dialog-submit">
            <van-button color="#CB9400"
                        block
                        type="info"
                        native-type="submit">分享到微信</van-button>
          </div>
        </van-form>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  Form,
  Field,
  Button,
  Uploader,
  Toast,
  Icon,
  Dialog
} from 'vant'
import Bread from '@/components/bread/index'
import { h5_job_updateStatus, h5_job_findById, h5_jobShare_jobShare, h5_wx_getWxConfig, wx_getWxConfigWeb } from '@/http/api'
import wx from 'weixin-js-sdk'
export default {
  name: 'Detail',
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanUploader: Uploader,
    VanIcon: Icon,
    VanDialog: Dialog.Component,
    Bread
  },
  data() {
    return {
      form: {
        title: '',
        sortTitle: '',
        count: 1,
        unitPrice: {
          value:0
        },//单价
        remark: '',
        imagesIds: '',
        jobDetailProcessResponseList: [],
        ids: '0', //以下是写死的
        num: '0',
        pidId: '0',
        share: false,
        jobStatus: 'INIT',
        totalPrice: {
          value: 0
        }
      },
      photos: [],
      dialogForm: {
        count: 1,
        imagesIds: '',
        jobNum: '',
        remark: '',
        sortTitle: '',
        title: '',
        unitPrice: 1
      },
      dialogVisible: false
    }
  },
  computed: {
    // 总和
    totalPrice() {
      if (!this.form.count || !this.form.unitPrice) {
        return 0
      }
      return Number((this.form.count * this.form.unitPrice).toFixed(2))
    },
    // 工序合计
    processTotal() {
      if (!this.form.count) {
        return 0
      }
      let sum = 0
      this.form.jobDetailProcessResponseList.forEach(item => {
        console.log('process', item.unitPrice.value)
        sum += Number(item.unitPrice.value)
      })
      console.log('sum', sum)
      console.log('sum*count', sum * this.form.count)
      return Number((sum * this.form.count).toFixed(2))
    },
    // 利润
    profit() {
      if (!this.totalPrice) {
        return 0
      }
      return Number((this.totalPrice - this.processTotal).toFixed(2))
    }
  },
  methods: {
    handleShowShareDialog() {
      this.dialogForm.title = this.form.title
      this.dialogForm.count = this.form.count
      // this.dialogForm.unitPrice = this.form.unitPrice
      this.dialogForm.imagesIds = this.form.imagesIds
      this.dialogForm.jobNum = this.form.num
      this.dialogForm.sortTitle = this.form.sortTitle
      this.dialogForm.remark = this.form.remark
      this.dialogVisible = true
    },
    // 确认分享
    async handleConfirmShare() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const params = {
        ...this.dialogForm
      }
      const res = await this.$http.post(h5_jobShare_jobShare, params)
      toast.clear()
      if (!res.success) {
        return Toast(res.msg)
      }
      this.dialogVisible = false
    },
    async setWx() {
      const res = await this.$http({
        method: 'get',
        url: h5_wx_getWxConfig,
        params: {
          appid: 'wxdcc277beb5c6a25d',
          secret: '574c4f9e0d322902ae33c07ca916f14c',
          url: window.location.href
        }
      })
      // .get(`/wx/getWxConfigWeb?appid=wxdcc277beb5c6a25d&secret=574c4f9e0d322902ae33c07ca916f14c&url=${window.location.origin + window.location.pathname}`, {})
      let { timestamp, nonceStr, appId, signature, jsApiList: jsApiLists } = res.model

      // const link = `${window.location.href.split('#')[0]}?initial=wechat&hash=${encodeURIComponent('#/receiveTask/' + this.$route.query.id)}`
      const link = `${window.location.href.split('#')[0]}#/receiveTask/${this.$route.query.id}`

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        // jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'updateTimelineShareData', 'updateAppMessageShareData']  // 必填，需要使用的JS接口列表
        jsApiList: jsApiLists
      })
      wx.ready(() => {
        const that = this
        // const link = `${window.location.href.split('#')[0]}?initial=wechat&hash=${encodeURIComponent('#/shareCustomPerson/' + that.$route.params.titleId + '/' + that.$route.params.name)}`
        console.log('link', link)
        wx.onMenuShareTimeline({
          title: that.form.title, // 分享标题
          desc: that.form.sortTitle, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.origin + '/static/logo.png', // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
            that.handleShareCallBack()
          }
        })
        wx.onMenuShareAppMessage({
          title: that.form.title, // 分享标题
          desc: that.form.sortTitle, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.origin + '/static/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
            that.handleShareCallBack()
          }
        })
        wx.updateTimelineShareData({
          title: that.form.title, // 分享标题
          desc: that.form.sortTitle, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.origin + '/static/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
            that.handleShareCallBack()
          }
        })
        wx.updateAppMessageShareData({
          title: that.form.title, // 分享标题
          desc: that.form.sortTitle, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.origin + '/static/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
            that.handleShareCallBack()
          }
        })
      })
    },

    // 分享成功 回调
    async handleShareCallBack() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const params = {
        count: this.form.count,
        imagesIds: this.form.imagesIds,
        jobNum: this.form.num,
        remark: this.form.remark,
        sortTitle: this.form.sortTitle,
        title: this.form.title,
        unitPrice: this.form.unitPrice.value
      }
      const res = await this.$http.post(h5_jobShare_jobShare, params)
      toast.clear()
      if (!res.success) {
        return Toast(res.msg)
      }
      Toast('分享成功')

    },

    close() {
      // this.dialogFormInit()
    },
    // 开始
    async handleStart() {
      const res = await this.changeStatus('START')
      if (res) {
        Toast('开始')
        this.form.jobStatus = 'START'
      }
    },
    changeStatus(jobStatus) {
      return new Promise((resolve) => {
        const params = {
          id: this.form.id,
          jobStatus
        }
        this.$http.post(h5_job_updateStatus, params).then(res => {
          if (!res.success) {
            resolve(false)
          } else {
            resolve(true)
          }
        }).catch(err => {
          console.log(err)
          resolve(false)
        })

      })

    },
    // 完成
    handleComplete() {
      Dialog.confirm({
        message: '确认完成?',
        confirmButtonColor: '#cb9400'
      })
        .then(async () => {
          // on confirm
          const res = await this.changeStatus('Finish')
          if (res) {
            Toast('完成')
            this.form.jobStatus = 'Finish'
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    // 暂停
    async handleSuspend() {
      const res = await this.changeStatus('PAUSE')
      if (res) {
        Toast('开始')
        this.form.jobStatus = 'PAUSE'
      }
    },
    // 再次创建
    handleCreate() {
      let data = {
        ...this.form,
        photos: this.photos
      }
      this.$store.commit('task/set_item', data)
      this.$router.push({
        path: '/createTask',
        query: {
          type: 'again'
        }
      })
    },
    async echoData() {
      const params = {
        id: Number(this.$route.query.id)
      }
      const res = await this.$http({
        method: 'get',
        url: h5_job_findById,
        params
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      const form = res.model
      // 获取图片
      if (form.imagesIds) {
        this.photos = await this.$utils.getPhoto(form.imagesIds)
      }

      this.form = form
      this.setWx()
    }
  },
  created() {
    this.echoData()
  }
}
</script>

<style scoped lang="less">
.detail {
  .views {
    width: 100%;
    height: calc(100vh - 36px);
    overflow-y: scroll;
  }
  .share {
    font-size: 12px;
    color: #cb9400;
    text-align: right;
    padding: 15px;
  }
  .sub-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    .van-button {
      width: 200px;
    }
  }
  .file {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;
    margin: 0 16px;
    padding: 10px 0;
    border-bottom: 1px solid rgb(245, 246, 247);
    .label {
      width: 80px;
      color: #d8cdcf;
    }
  }
  .title {
    display: flex;
    align-items: center;
    padding: 15px;
    .title-1 {
      flex: 1;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .title-2 {
      flex: 0.5;
      color: #cb9400;
      text-align: right;
    }
  }
  footer {
    height: 100px;
  }
  .fixed-b {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 15px;
    height: 45px;
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.05);
    z-index: 9;
    .b-1 {
      flex: 1;
      color: #666666;
      line-height: 20px;
    }
    .b-2 {
      flex: 1.8;
      display: flex;
      justify-content: space-around;
    }
  }
  .td-img {
    width: 35px;
    height: 35px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    span {
      display: inline-block;
      position: absolute;
      right: 0px;
      bottom: 0px;
      min-width: 14px;
      height: 14px;
      font-size: 12px;
      text-align: center;
      line-height: 14px;
      color: white;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
