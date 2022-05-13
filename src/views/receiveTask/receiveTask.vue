<!--
 * @Date: 2022-05-11 10:43:10
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-13 16:02:03
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
        <span class="right"
              @click="clickRight"></span>
      </div>
    </div>
    <div class="views">
      <van-form>
        <van-cell-group inset>
          <van-field v-model="form.title"
                     name="标题"
                     label="标题"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.count"
                     name="数量"
                     label="数量"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.unitPrice.value"
                     name="单价"
                     label="单价"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.totalPrice.value"
                     name="总价"
                     label="总价"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.remark"
                     name="备注"
                     label="备注"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.createTime"
                     name="分享时间"
                     label="分享时间"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.shareCompany.companyName"
                     name="任务出处"
                     label="任务出处"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.status"
                     name="任务状态"
                     label="任务状态"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.shareCompany.companyPhone"
                     name="任务联系方式"
                     label="任务联系方式"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.shareCompany.contact"
                     name="任务联系人"
                     label="任务联系人"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.takeOverCompany"
                     name="任务接收方"
                     label="任务接收方"
                     placeholder=""
                     :disabled="true" />
        </van-cell-group>
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import {
  Icon,
  Field,
  CellGroup,
  Form,
  Uploader
} from 'vant'
export default {
  name: 'ReceiveTask',
  components: {
    VanIcon: Icon,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form,
    VanUploader: Uploader
  },
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    async echoData() {
      const res = await this.$http({
        method:'post'
      })
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
}
</style>
