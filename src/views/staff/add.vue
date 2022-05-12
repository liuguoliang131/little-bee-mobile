<!--
 * @Date: 2022-04-29 16:50:15
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-12 14:54:01
 * @FilePath: \little-bee-mobile\src\views\staff\add.vue
 * @Description: 添加员工
-->
<template>
  <div class="staffAdd">
    <bread></bread>
    <div class="views">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="form.name"
                     name="姓名"
                     label="姓名"
                     placeholder=""
                     :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field name="性别"
                     label="性别"
                     :rules="[{ required: true, message: '请选择性别' }]">
            <template #input>
              <van-radio-group v-model="form.sex"
                               direction="horizontal">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.phone"
                     name="手机号"
                     label="手机号"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写手机号' },{pattern:/^[1]{1}[0-9]{10}$/,message: '手机号规则为11位数字'}]" />
          <van-field v-model="form.entryTime"
                     is-link
                     readonly
                     name="calendar"
                     label="入职时间"
                     placeholder="点击选择时间"
                     @click="showCalendar = true"
                     :rules="[{ required: true, message: '请选择入职时间' }]" />
          <van-calendar :min-date="minDate()"
                        :max-date="maxDate()"
                        v-model="showCalendar"
                        @confirm="handleTimeConfirm" />
          <van-field name="工资方式"
                     label="工资方式"
                     :rules="[{ required: true, message: '请填写选择工资方式' }]">
            <template #input>
              <van-radio-group v-model="form.salaryType"
                               direction="horizontal">
                <van-radio name="BASIC_SALARY">基本工资</van-radio>
                <van-radio name="GUARANTEED_SALARY">保底工资</van-radio>
                <van-radio name="FIXED_SALARY">固定工资</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.salaryAmount"
                     name="工资数额"
                     label="工资数额"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写工资数额' },{pattern:/^[0-9]{1,9}$/,message: '请填写工资数额'}]" />
          <van-field name="状态"
                     label="状态">
            <template #input>
              <van-radio-group v-model="form.disabledStatus"
                               direction="horizontal">
                <van-radio :name="false">在职</van-radio>
                <van-radio :name="true">离职</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.remark"
                     name="备注"
                     label="备注"
                     placeholder="" />
        </van-cell-group>
        <div class="fixed-button">
          <van-button color="#CB9400"
                      type="info">保存</van-button>
        </div>
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_employee_create } from '@/http/api'
import {
  Button,
  Form,
  Field,
  CellGroup,
  RadioGroup,
  Radio,
  Calendar,
  Toast
} from 'vant'
export default {
  name: 'StaffAdd',
  components: {
    Bread,
    VanButton: Button,
    VanForm: Form,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanRadioGroup: RadioGroup,
    VanRadio: Radio,
    VanCalendar: Calendar
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
        appId:'',
        openId:''
      },
      showCalendar: false
    }
  },
  methods: {
    minDate() {
      return new Date(1980,1,1)
    },
    maxDate() {
      const oneYearAfter = Date.now() + 31536000000 //最大可选从现在开始一年后
      return new Date(oneYearAfter)
    },
    handleTimeConfirm(e) {
      this.form.entryTime = new Date(e).toISOString()
      // this.form.entryTime = this.$utils.formatTime(e)
      this.showCalendar = false
    },
    async onSubmit() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const params = {
        ...this.form,
        phone: this.form.phone.toString()
      }
      const res = await this.$http.post(h5_employee_create, params)
      toast.clear()
      if (!res.success) {
        return Toast(res.msg)
      }
      Toast('创建成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.staffAdd {
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