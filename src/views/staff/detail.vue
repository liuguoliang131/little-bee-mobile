<!--
 * @Date: 2022-05-05 11:07:19
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-12 14:54:12
 * @FilePath: \little-bee-mobile\src\views\staff\detail.vue
 * @Description: 员工详情
-->
<template>
  <div class="detail">
    <bread></bread>
    <div class="views">
      <van-form @submit="handleGoAdd">
        <van-cell-group inset>
          <van-field v-model="form.name"
                     :disabled="true"
                     name="姓名"
                     label="姓名"
                     placeholder=""
                     :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field name="性别"
                     label="性别"
                     :disabled="true"
                     :rules="[{ required: true, message: '请选择性别' }]">
            <template #input>
              <van-radio-group :disabled="true"
                               v-model="form.sex"
                               direction="horizontal">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.phone"
                     :disabled="true"
                     name="手机号"
                     label="手机号"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写手机号' },{pattern:/^[1]{1}[0-9]{10}$/,message: '手机号规则为11位数字'}]" />
          <van-field v-model="form.entryTime"
                     :disabled="true"
                     readonly
                     name="calendar"
                     label="入职时间"
                     placeholder="点击选择时间"
                     :rules="[{ required: true, message: '请选择入职时间' }]" />
          <van-field name="工资方式"
                     :disabled="true"
                     label="工资方式"
                     :rules="[{ required: true, message: '请填写选择工资方式' }]">
            <template #input>
              <van-radio-group :disabled="true"
                               v-model="form.salaryType"
                               direction="horizontal">
                <van-radio name="BASIC_SALARY">基本工资</van-radio>
                <van-radio name="GUARANTEED_SALARY">保底工资</van-radio>
                <van-radio name="FIXED_SALARY">固定工资</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.salaryAmount"
                     :disabled="true"
                     name="工资数额"
                     label="工资数额"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写工资数额' },{pattern:/^[0-9]{1,9}$/,message: '请填写工资数额'}]" />
          <van-field name="状态"
                     :disabled="true"
                     label="状态">
            <template #input>
              <van-radio-group :disabled="true"
                               v-model="form.disabledStatus"
                               direction="horizontal">
                <van-radio :name="false">在职</van-radio>
                <van-radio :name="true">离职</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.remark"
                     :disabled="true"
                     name="备注"
                     label="备注"
                     placeholder="" />
        </van-cell-group>
        <div class="fixed-button">
          <van-button color="#CB9400"
                      type="info">编辑</van-button>
        </div>
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_employee_findById } from '@/http/api'
import {
  Button,
  Form,
  Field,
  CellGroup,
  RadioGroup,
  Radio,
} from 'vant'
export default {
  name: 'StaffDetail',
  components: {
    Bread,
    VanButton: Button,
    VanForm: Form,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanRadioGroup: RadioGroup,
    VanRadio: Radio,
  },
  data() {
    return {
      form: {
        disabledStatus: false,
        entryTime: '',
        name: '',
        phone: '',
        salaryAmount: '',
        salaryType: 'BASIC_SALARY',
        sex: 1,
        remark: '',
        appId: '',
        openId: ''
      }
    }
  },
  methods: {
    handleGoAdd() {
      this.$router.push({
        path: '/staffEdit',
        query: {
          id:this.$route.query.id
        }
      })
    },
    async echoData() {
      // const res = await this.$http({
      //   method: 'get',
      //   url: h5_employee_findById,
      //   params: {
      //     id: this.$route.query.employeeId
      //   }
      // })
      this.form = Object.assign(this.form, this.$store.state.staff.item)
    }
  },
  created() {
    this.echoData()
  }
}
</script>

<style scoped lang="less">
.detail {
  .fixed-button {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 50px;
    left: 0;
    .van-button {
      width: 150px;
    }
  }
  footer {
    height: 100px;
  }
}
</style>