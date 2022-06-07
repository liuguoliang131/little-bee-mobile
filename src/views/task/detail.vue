<!--
 * @Date: 2022-04-26 10:45:14
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-07 17:12:17
 * @FilePath: \little-bee-mobile\src\views\task\detail.vue
 * @Description: 任务详情
-->
<template>
  <div class="detail">
    <bread @click="handleShowShareDialog">
      <van-icon name="share-o"
                color="#cb9400" />
    </bread>
    <div class="views">
      <van-form>
        <!-- <van-field v-model.trim="form.id"
                   type="text"
                   name="ID"
                   label="ID"
                   placeholder="请输入标题"
                   required
                   :rules="[{ required: true, message: '请填写ID' }]"
                   :disabled="true" /> -->
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
        <van-field :value="$utils.formatTime(form.createTime)"
                   type="text"
                   name="时间"
                   label="时间"
                   placeholder="请输入副标题"
                   required
                   :rules="[{ required: true, message: '请填写时间' }]"
                   :disabled="true" />
        <van-field v-model="form.count"
                   type="digit"
                   name="count"
                   label="数量"
                   placeholder="请输入数量"
                   required
                   :rules="[{ required: true, message: '请填写数量' }]"
                   :disabled="true" />
        <van-field v-model="form.unitPrice.value"
                   type="number"
                   name="unitPrice"
                   label="单价"
                   placeholder="请输入单价"
                   required
                   :rules="[{ required: true, message: '请填写单价' }]"
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
            <van-button color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small"
                        @click="handleGoDetail"
                        v-show="form.shareCount===0">编辑</van-button>
            <van-button v-show="(sureShare&&form.jobStatus==='PAUSE')||(sureShare&&form.jobStatus==='INIT')"
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
            <!-- <van-button v-show="sureShare&&form.jobStatus==='START'"
                        color="#CB9400"
                        type="info"
                        plain
                        native-type="button"
                        size="small"
                        @click="handleSuspend">暂停</van-button> -->
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
          </tr>
        </thead>
        <tbody v-if="form.jobDetailProcessResponseList.length">
          <tr v-for="(item,index) in form.jobDetailProcessResponseList"
              :key="index"
              @click="handleGoProcessDetail(item)">
            <td>{{index+1}}</td>
            <td style="color:#cb9400;">{{item.name}}</td>
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
                     :rules="[{ required: true, message: '请填写数量' }]" />
          <van-field v-model="dialogForm.unitPrice"
                     type="number"
                     name="unitPrice"
                     label="分享单价"
                     placeholder="分享单价"
                     :rules="[{ required: true, message: '请填写数量' },]" />
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
          <div class="tips">分享成功后请手动粘贴把地址分享给其他人</div>
          <div class="dialog-submit">
            <van-button color="#CB9400"
                        block
                        type="info"
                        native-type="submit">分享到微信</van-button>
          </div>
        </van-form>
      </div>
    </van-dialog>
    <textarea name=""
              id="iosCopyInput"
              cols="30"
              rows="10"></textarea>
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
import { h5_job_updateStatus, h5_job_findById, h5_jobShare_jobShare, h5_wx_getWxConfig, h5_jobShare_getShareCount, h5_process_createBilling, h5_employee_findPage } from '@/http/api'
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
      activeStaff: {},
      form: {
        title: '',
        sortTitle: '',
        count: 1,
        unitPrice: {
          value: 0
        },//单价
        remark: '',
        imagesIds: '',
        jobDetailProcessResponseList: [],
        ids: '0', //以下是写死的
        num: '0',
        pidId: '0',
        share: false,
        shareCount: 0,
        jobStatus: 'INIT',
        totalPrice: {
          value: 0
        },
        createTime: ''
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
      dialogVisible: false,
      sureShare: 0 //  = count - shareCount - 已完成数量 >0  为true才可以分享
    }
  },
  computed: {
    // 总和
    totalPrice() {
      if (!this.form.count || !this.form.unitPrice.value) {
        return 0
      }
      return Number((this.form.count * this.form.unitPrice.value).toFixed(2))
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
      if (this.sureShare <= 0) {
        return Toast('可分享数量为0, 不能分享')
      }
      this.dialogForm.title = this.form.title
      this.dialogForm.count = this.sureShare
      // this.dialogForm.unitPrice = this.form.unitPrice
      this.dialogForm.imagesIds = this.form.imagesIds
      this.dialogForm.jobNum = this.form.num
      this.dialogForm.sortTitle = this.form.sortTitle
      this.dialogForm.remark = this.form.remark
      this.dialogVisible = true
    },
    // 确认分享
    async handleConfirmShare() {
      if (this.dialogForm.count > this.sureShare) {
        return Toast(`可分享的剩余数量为${this.sureShare}`)
      }
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
      const link = `${window.location.href.split('#')[0]}#/receiveTask/${res.model.id}`
      this.handleCopyURL(link)
      // this.weixinShare(res.model.id)
      this.dialogVisible = false
    },
    // 复制链接
    handleCopyURL(url) {
      // 第一种方法
      // let userAgent = navigator.userAgent;
      // let isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      // if (isiOS) {
      //   //---------ios--------
      //   window.getSelection().removeAllRanges();   //将页面所有的文本区域都从选区中移除
      //   let range = document.createRange();   //创建一个文本区域
      //   let outInput = document.getElementById('iosCopyInput');  //获取所需要复制的节点
      //   outInput.value = url
      //   console.log('ios value=',outInput.value)
      //   range.selectNode(outInput);   //将我们的所选节点添加到文本区域中
      //   window.getSelection().addRange(range);  //将文本区域添加至选区中
      //   document.execCommand('copy');   //执行浏览器的复制命令
      //   window.getSelection().removeAllRanges();  //最后再移除选区中的所有文本区域
      //   // outInput.value = ''
      // } else {
      //   let outInput = document.createElement('textarea')
      //   outInput.value = url
      //   console.log('android value=',outInput.value)
      //   document.body.appendChild(outInput)
      //   outInput.select()
      //   document.execCommand('copy')
      //   document.body.removeChild(outInput)
      // }
      // Toast('分享成功,已自动复制链接,请手动分享给其他人')

      // 第二种
      function copyText(text) {
        // 数字没有 .length 不能执行selectText 需要转化成字符串
        const textString = text.toString();
        let input = document.querySelector('#copy-input');
        if (!input) {
          input = document.createElement('input');
          input.id = "copy-input";
          input.readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
          input.style.position = "absolute";
          input.style.left = "-1000px";
          input.style.zIndex = "-1000";
          document.body.appendChild(input)
        }

        input.value = textString;
        // ios必须先选中文字且不支持 input.select();
        selectText(input, 0, textString.length);
        console.log(document.execCommand('copy'), 'execCommand');
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          // alert('已复制到粘贴板');
        }
        input.blur();

        // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
        // 选择文本。createTextRange(setSelectionRange)是input方法
        function selectText(textbox, startIndex, stopIndex) {
          if (textbox.createTextRange) {//ie
            const range = textbox.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);//起始光标
            range.moveEnd('character', stopIndex - startIndex);//结束光标
            range.select();//不兼容苹果
          } else {//firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
          }
        }
      }
      copyText(url)
      Toast('分享成功,已自动复制链接,请手动分享给其他人')
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
      let { timestamp, nonceStr, appId, signature, jsApiList: jsApiLists } = res.model
      const apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'updateTimelineShareData', 'updateAppMessageShareData']  // 必填，需要使用的JS接口列表
      let paramsApis = new Set([...apiList, ...jsApiLists])
      paramsApis = Array.from(paramsApis)
      console.log('paramsApis', paramsApis)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: paramsApis
      })
      console.log('setWx已完成 wx.config的jsApiList', paramsApis)

    },
    // 分享成功 调用wx分享
    async weixinShare(shareId) {
      const link = `${window.location.href.split('#')[0]}#/receiveTask/${shareId}`
      console.log('weixinShare link', link)
      wx.ready(() => {
        const that = this
        console.log('link', link)
        wx.onMenuShareTimeline({
          title: that.form.title, // 分享标题
          desc: that.form.sortTitle, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.origin + '/static/logo.png', // 分享图标
          success: function () {
            // Toast('触发SUCCESS')
            // 用户点击了分享后执行的回调函数
          },
          trigger: function (e) {
            // Toast('触发trigger')
            console.log('trigger', e)
            // alert('触发trigger')
            // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
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
            // Toast('触发SUCCESS')
            // 用户点击了分享后执行的回调函数
          },
          trigger: function (e) {
            // Toast('触发trigger')
            console.log('trigger', e)
            // alert('触发trigger')
            // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
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
            // Toast('触发SUCCESS')
            // 用户点击了分享后执行的回调函数
          },
          trigger: function (e) {
            // Toast('触发trigger')
            console.log('trigger', e)
            // alert('触发trigger')
            // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
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
            // Toast('触发SUCCESS')
            // 用户点击了分享后执行的回调函数
          },
          trigger: function (e) {
            // Toast('触发trigger')
            console.log('trigger', e)
            // alert('触发trigger')
            // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
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
      this.echoData()
    },
    // 开始
    async handleStart() {
      const toast = Toast.loading({
        message: '加载中',
        forbidClick: true,
      })
      const res = await this.changeStatus('START')
      toast.clear()
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
            const employeeJobBillingList = [{
              jobId: this.form.id,
              finishedProductNum: 0,
              employeeBillingList: []
            }]
            let params = {
              billData: this.$utils.getToday(),
              employeeId: this.activeStaff.employeeId,
              name: this.form.title,
              employeeJobBillingList
            }

            this.$http.post(h5_process_createBilling, params).then(res1 => {
              if (!res1.success) {
                resolve(false)
              } else {
                resolve(true)
              }

            }).catch(err1 => {
              resolve(false)
            })
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
    // 编辑
    handleGoDetail() {
      this.$router.push({
        path: '/editTask',
        query: {
          id: this.$route.query.id
        }
      })
    },
    async echoData() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
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
      const res1 = await this.$http({
        method: 'get',
        url: h5_jobShare_getShareCount,
        params: {
          jobId: Number(this.$route.query.id)
        }
      })
      let completeCount = res1.model || 0
      // this.sureShare = (Number(this.form.count) - Number(this.form.shareCount) - Number(completeCount))
      this.sureShare = completeCount
      console.log('可分享数量', this.sureShare)
      // this.setWx()
      // if (this.sureShare <= 0) {
      //   Toast('可分享数量为0, 不能分享')
      // }

      const res2 = await this.$http.post(h5_employee_findPage, { disabledStatus: false })
      toast.clear()
      if (!res2.success) {
        return Toast(res.msg)
      }
      let staffList = res2.model.data || []
      if (staffList.length > 0) {
        this.activeStaff = staffList[0]
      }
    },
    // 去往工序详情
    handleGoProcessDetail(item) {
      this.$router.push({
        path: '/process',
        query: {
          jobId: this.form.id,
          ...item
        }
      })
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
      justify-content: flex-end;
      .van-button {
        margin-left: 6px;
      }
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
  .tips {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;
    font-size: 12px;
  }
  #iosCopyInput {
    width: 0px;
    height: 0px;
  }
}
</style>
