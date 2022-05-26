<!--
 * @Date: 2022-05-11 10:43:10
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-25 17:52:47
 * @FilePath: \little-bee-mobile\src\views\receiveTask\receiveTask.vue
 * @Description: 领取任务页面
-->
<template>
  <div class="ReceiveTask">
    <div class="bread">
      <div class="float">
        <span class="left">
          <van-icon name="arrow-left"
                    @click="$router.push('/index')" />
        </span>
        <span class="center">{{$route.meta.bread || ''}}</span>
        <span class="right"></span>
      </div>
    </div>
    <div class="views">
      <van-form>
        <van-cell-group inset>
          <!-- <van-field v-model="form.jobNum"
                     name="任务编号"
                     label="任务编号"
                     placeholder=""
                     readonly /> -->
          <van-field v-model="form.title"
                     name="标题"
                     label="标题"
                     placeholder=""
                     readonly />
          <van-field v-model="form.count"
                     name="数量"
                     label="数量"
                     placeholder=""
                     readonly />
          <van-field v-model="form.unitPrice.value"
                     name="单价"
                     label="单价"
                     placeholder=""
                     readonly />
          <van-field v-model="form.totalPrice.value"
                     name="总价"
                     label="总价"
                     placeholder=""
                     readonly />
          <van-field v-model="form.shareCompany.contact"
                     name="联系人"
                     label="联系人"
                     placeholder=""
                     readonly />
          <van-field v-model="form.shareCompany.companyPhone"
                     name="联系方式"
                     label="联系方式"
                     placeholder=""
                     readonly />
          <van-field :value="form.shareCompany.province+form.shareCompany.city+form.shareCompany.area+form.shareCompany.address"
                     name="联系地址"
                     label="联系地址"
                     placeholder=""
                     readonly />
          <div class="file">
            <span class="label">图片</span>
            <van-uploader v-model="imagesIds"
                          disabled
                          readonly
                          :show-upload="false"
                          :deletable="false" />
          </div>
          <div class="sub-btn">
            <van-button color="#CB9400"
                        block
                        type="info"
                        @click="onSubmit">领取任务</van-button>
          </div>
        </van-cell-group>
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Icon,
  Field,
  CellGroup,
  Form,
  Uploader,
  Toast
} from 'vant'
import { h5_jobShare_findById, h5_jobShare_jobReception } from '@/http/api'
export default {
  name: 'ReceiveTask',
  components: {
    VanButton: Button,
    VanIcon: Icon,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form,
    VanUploader: Uploader
  },
  data() {
    return {
      form: {
        unitPrice: {
          value: 1
        },
        totalPrice: {
          value: 1
        },
        shareCompany: {
          companyName: '',
          companyPhone: '',
          contact: '',
          takeOverCompany: ''
        },
        imagesIds: ''
      },
      imagesIds: []
    }
  },
  methods: {
    async echoData() {
      const res = await this.$http({
        method: 'get',
        url: h5_jobShare_findById,
        params: {
          id: this.$route.params.id
        }
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      this.form = res.model
      if (this.form.imagesIds) {
        this.imagesIds = await this.$utils.getPhoto(this.form.imagesIds)
      }
    },
    async onSubmit() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await this.$http({
        method: 'get',
        url: h5_jobShare_jobReception,
        params: {
          shareId: this.$route.params.id
        }
      })
      toast.clear()

      if (!res.success) {
        return Toast(res.msg)
      }
      Toast('领取成功')
      this.$router.push('/index')
    }
  },
  created() {
    this.echoData()
  }
}
</script>

<style scoped lang="less">
.ReceiveTask {
  height: 100vh;
  background-color: #f7f7f7;
  .bread {
    width: 100%;
    height: 36px;
    .float {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      background-color: #fff;
      font-size: 19px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      z-index: 10;
      .left {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        &:active {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .center {
        flex: 1;
        height: 36px;
        text-align: center;
        line-height: 36px;
      }
      .right {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        &:active {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
  .van-form {
    margin-top: 15px;
    .van-cell-group {
      min-height: calc( 100vh - 66px );
    }
  }
  .sub-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 15px;
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
}
</style>
