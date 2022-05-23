<!--
 * @Date: 2022-05-16 15:30:18
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-23 17:35:30
 * @FilePath: \little-bee-mobile\src\views\task\editTask.vue
 * @Description: 
-->
<template>
  <div class="createTask">
    <bread></bread>
    <div class="views">
      <van-form @submit="onSubmit">
        <van-field v-model.trim="form.title"
                   type="text"
                   name="title"
                   label="标题"
                   placeholder="请输入标题"
                   required
                   :rules="[{ required: true, message: '请填写标题' }]" />
        <van-field v-model.trim="form.sortTitle"
                   type="text"
                   name="sortTitle"
                   label="副标题"
                   placeholder="请输入副标题"
                   required
                   :rules="[{ required: true, message: '请填写标题' }]" />
        <van-field v-model="form.count"
                   type="digit"
                   name="count"
                   label="数量"
                   placeholder="请输入数量"
                   required
                   :rules="[{ required: true, message: '请填写数量' },{ validator: countValidator, message: '数量必须大于0' }]" />
        <van-field v-model="form.unitPrice.value"
                   type="number"
                   name="unitPrice"
                   label="单价"
                   placeholder="请输入单价"
                   required
                   :rules="[{ required: true, message: '请填写单价' }, { validator: unitPriceValidator, message: '单价必须大于0' }]" />
        <van-field v-model.trim="form.remark"
                   type="text"
                   name="remark"
                   label="备注"
                   placeholder="请输入备注" />
        <van-field v-model="totalPrice"
                   type="number"
                   name="totalPrice"
                   label="总价"
                   :disabled="true" />
        <div class="file">
          <span class="label">图片</span>
          <van-uploader v-model="photos"
                        :after-read="photosAfterRead"
                        :deletable="true" />
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
                        block
                        type="info"
                        native-type="submit"
                        size="small">提交</van-button>
          </div>
        </div>
      </van-form>
      <div class="title">
        <div class="title-1">
          工序
        </div>
        <div class="title-2">
          <van-icon name="plus"
                    @click="handleShowAddDialog" />
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="form.jobUpdateProcessRequestList.length">
          <tr v-for="(item,index) in form.jobUpdateProcessRequestList"
              :key="index">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.unitPrice.value}}</td>
            <td>
              <div class="td-img"
                   v-if="item.imagesResponseList&&item.imagesResponseList.length">
                <img :src="item.imagesResponseList[0].url"
                     alt="图标">
                <span>x{{item.imagesResponseList?item.imagesResponseList.length:'0'}}</span>
              </div>
            </td>
            <td>{{item.remark}}</td>
            <td>
              <van-icon name="delete-o"
                        @click="handleRemove(index)" />
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
                title="创建工序"
                :showConfirmButton="false"
                close-on-click-overlay
                @close="close">
      <div class="dialog-content">
        <van-form @submit="dialogFormSubmit"
                  ref="dialogForm">
          <van-field v-model.trim="dialogForm.name"
                     name="name"
                     label="名称"
                     placeholder="名称"
                     :rules="[{ required: true, message: '请填写名称' }]" />
          <van-field v-model="dialogForm.unitPrice.value"
                     type="number"
                     name="unitPrice"
                     label="单价"
                     placeholder="单价"
                     :rules="[{ required: true, message: '请填写单价' },{ validator: unitPriceValidator, message: '单价必须大于0' }]" />
          <div class="file">
            <span class="label">图标</span>
            <van-uploader v-model="dialogForm.imagesResponseList"
                          :after-read="dialogPhotosAfterRead"
                          :deletable="true" />
          </div>
          <van-field v-model.trim="dialogForm.remark"
                     type="text"
                     name="remark"
                     label="备注"
                     placeholder="备注" />
          <div class="dialog-submit">
            <van-button color="#CB9400"
                        block
                        type="info"
                        native-type="submit"
                        @click="handleAddProcess">添加</van-button>
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
import { sys_version_file_upload, h5_job_findById, h5_job_update } from '@/http/api'
export default {
  name: 'CreateTask',
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
          value: 0
        },//单价
        remark: '',
        imagesIds: '',
        jobUpdateProcessRequestList: [
          // {
          //   name:'123',
          //   unitPrice:1,
          //   imagesIds:'asdasdasd',
          //   remark:'asdasd'
          // }
        ],
        ids: '0', //以下是写死的
        num: '0',
        pidId: '0',
        share: false
      },
      photos: [],
      dialogVisible: false,
      dialogForm: {
        name: '',
        unitPrice: {
          value: 1
        },
        imagesIds: '',
        remark: '',
        imagesResponseList: []
      }
    }
  },
  computed: {
    // 总和
    totalPrice() {
      if (!this.form.count || !this.form.unitPrice.value) {
        return 0
      }
      console.log('this.form.count', this.form.count, 'this.form.unitPrice.value', this.form.unitPrice.value)
      return Number((this.form.count * this.form.unitPrice.value).toFixed(2))
    },
    // 工序合计
    processTotal() {
      if (!this.form.count) {
        return 0
      }
      let sum = 0
      this.form.jobUpdateProcessRequestList.forEach(item => {
        sum += Number(item.unitPrice.value)
      })
      console.log('processTotal', this.form.count, sum)
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
    // 弹窗 数据初始化
    dialogFormInit() {
      this.dialogForm = {
        name: '',
        unitPrice: {
          value: 1
        },
        imagesIds: '',
        remark: '',
        imagesResponseList: []
      }
    },
    countValidator(val) {
      return val > 0
    },
    unitPriceValidator(val) {
      return val > 0
    },
    async photosAfterRead(e) {
      console.log(e)
      const fd = new FormData()
      fd.append('file', e.file)
      const res = await this.uploadFile(fd, this.photos)
      console.log('上传完成', res)
    },
    // 图标上传
    async dialogPhotosAfterRead(e) {
      console.log(e)
      const fd = new FormData()
      fd.append('file', e.file)
      const res = await this.uploadFile(fd, this.dialogForm.imagesResponseList)
      console.log('上传完成', res)
    },
    // 上传
    uploadFile(fd, list) {
      console.log('fd', fd)
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '上传中'
      })
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      return new Promise((resolve) => {
        this.$http.post(sys_version_file_upload, fd, config).then((res) => {
          toast.clear()
          if (res.success) {
            Toast('上传完成')
            setTimeout(() => {
              list[list.length - 1] = { url: res.model.url || '', id: res.model.id }
            }, 100)

          } else {
            list.pop()
            Toast(res.msg)
          }
          resolve(res.success)
        })
      })

    },
    // 编辑
    async onSubmit() {
      if (!this.form.jobUpdateProcessRequestList.length) {
        return Toast('工序不能为空')
      }
      if (this.profit < 0) {
        return Toast('利润不能小于0')
      }
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const jobUpdateProcessRequestList = this.form.jobUpdateProcessRequestList.map(item => {
        const newItem = {
          name: item.name,
          unitPrice: Number(item.unitPrice.value),
          imagesIds: item.imagesResponseList.map(item => item.id).join(','),
          imagesResponseList: item.imagesResponseList,
          remark: item.remark,
          jobId: this.form.id,
          companyId: this.$store.state.user.userInfo.companyId || this.$store.state.user.userInfo.id
        }
        if (item.id) {
          newItem.id = item.id
        }
        return newItem
      })

      const res = await this.$http({
        method: 'post',
        url: h5_job_update,
        data: {
          companyId: this.$store.state.user.userInfo.companyId || this.$store.state.user.userInfo.id,
          companyName: this.$store.state.user.userInfo.companyName || this.$store.state.user.userInfo.name,
          id: this.form.id,
          title: this.form.title,
          sortTitle: this.form.sortTitle,
          count: Number(this.form.count),
          unitPrice: Number(this.form.unitPrice.value),//单价
          remark: this.form.remark,
          totalPrice: Number(this.totalPrice), //总价
          ids: this.form.ids,
          num: this.form.num,
          pidId: this.form.pidId,
          share: this.form.share,
          imagesIds: this.photos.map(item => item.id).join(','),
          jobUpdateProcessRequestList
        }
      })
      toast.clear()
      if (!res.success) {
        return Toast(res.msg)
      }
      Toast('修改成功')
      this.$router.go(-1)
    },
    // 移除工序
    handleRemove(index) {
      this.form.jobUpdateProcessRequestList.splice(index, 1)
    },
    // 显示添加工序弹窗
    handleShowAddDialog() {
      this.dialogVisible = true
    },
    // 表单验证
    dialogFormSubmit(values) {
      console.log(values)
      this.form.jobUpdateProcessRequestList.push(this.dialogForm)
      this.dialogVisible = false
    },
    // 确认添加工序
    handleAddProcess() {
      this.$refs.dialogForm.submit()
    },
    // 关闭弹窗
    close() {
      this.dialogFormInit()
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
      form.jobDetailProcessResponseList.forEach(item => {
        item.imagesResponseList = item.imagesResponseList ? item.imagesResponseList : []
      })
      form.jobUpdateProcessRequestList = form.jobDetailProcessResponseList
      delete form.jobDetailProcessResponseList
      this.form = form
    }
  },
  created() {
    this.echoData()
  }
}
</script>

<style scoped lang="less">
.createTask {
  .views {
    width: 100%;
    height: calc(100vh - 36px);
    overflow-y: scroll;
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
    z-index: 9;
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
    .b-1 {
      flex: 1;
      color: #666666;
      line-height: 20px;
    }
    .b-2 {
      flex: 0.3;
    }
  }
  .dialog-content {
    height: 380px;
    overflow-y: scroll;
    .dialog-submit {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
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