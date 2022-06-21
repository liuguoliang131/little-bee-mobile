<!--
 * @Date: 2022-05-05 19:09:22
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-21 14:44:43
 * @FilePath: \little-bee-mobile\src\views\my\shareDetail.vue
 * @Description: 分享详情
-->
<template>
  <div class="shareDetail">
    <bread></bread>
    <div class="views">
      <van-form>
        <van-cell-group inset>
          <van-field v-model="form.jobNum"
                     name="ID"
                     label="ID"
                     placeholder=""
                     readonly />
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
          <van-field v-model="form.remark"
                     name="备注"
                     label="备注"
                     placeholder=""
                     readonly />
          <van-field :value="$utils.formatTime(form.createTime)"
                     name="分享时间"
                     label="分享时间"
                     placeholder=""
                     readonly />
          <van-field v-model="form.shareCompany.companyName"
                     name="任务出处"
                     label="任务出处"
                     placeholder=""
                     readonly />
          <van-field :value="form.shareStatus?'已接收':'未接收'"
                     name="任务状态"
                     label="任务状态"
                     placeholder=""
                     readonly />
          <van-field v-model="form.shareCompany.companyPhone"
                     name="任务联系方式"
                     label="任务联系方式"
                     placeholder=""
                     readonly />
          <van-field v-model="form.shareCompany.contact"
                     name="任务联系人"
                     label="任务联系人"
                     placeholder=""
                     readonly />
          <van-field v-model="form.takeOverCompany.contact"
                     name="任务接收方"
                     label="任务接收方"
                     placeholder=""
                     readonly />
        </van-cell-group>
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_jobShare_findById } from '@/http/api'
import {
  Field,
  CellGroup,
  Form,
  Uploader,
  Toast
} from 'vant'
export default {
  name: 'shareDetail',
  components: {
    Bread,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form,
  },
  data() {
    return {
      form: {
        totalPrice: {
          value: 0
        },
        unitPrice: {
          value: 0
        },
        shareCompany: {
          companyName: '',
          companyPhone: '',
          contact: ''
        },
        takeOverCompany: {
          contact: ''
        }
      }
    }
  },
  methods: {
    async echoData() {
      const res = await this.$http({
        method: 'get',
        url: h5_jobShare_findById,
        params: {
          id: Number(this.$route.query.id)
        }
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      res.model.id = Number(this.$route.query.id)
      // this.form = Object.assign(this.form, res.model)
      for (let k in res.model) {
        if (!res.model[k]) {
          res.model[k] = this.form[k] || ''
        }
      }
      this.form = res.model
    }
  },
  created() {
    this.echoData()
  }
}
</script>

<style scoped lang="less">
.shareDetail {
}
</style>