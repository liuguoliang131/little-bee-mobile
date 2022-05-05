<!--
 * @Date: 2022-04-29 16:50:15
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-05 11:05:19
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
          <van-field v-model="form.name"
                     name="性别"
                     label="性别"
                     placeholder=""
                     :rules="[{ required: true, message: '请填写性别' }]" />
          <van-field v-model="form.name"
                     name="手机号"
                     label="手机号"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写手机号' },{pattern:/^[1]{1}[0-9]{10}$/,message: '手机号规则为11位数字'}]" />
          <van-field v-model="form.time"
                     is-link
                     readonly
                     name="calendar"
                     label="入职时间"
                     placeholder="点击选择时间"
                     @click="showCalendar = true"
                     :rules="[{ required: true, message: '请选择入职时间' }]" />
          <van-calendar v-model="showCalendar"
                        @confirm="handleTimeConfirm" />
          <van-field name="工资方式"
                     label="工资方式"
                     :rules="[{ required: true, message: '请填写选择工资方式' }]">
            <template #input>
              <van-radio-group v-model="form.gongzi"
                               direction="horizontal">
                <van-radio name="1">基本工资</van-radio>
                <van-radio name="2">保底工资</van-radio>
                <van-radio name="3">固定工资</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.money"
                     name="工资数额"
                     label="工资数额"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写工资数额' },{pattern:/^[0-9]{1,9}$/,message: '请填写工资数额'}]" />
          <van-field name="状态"
                     label="状态">
            <template #input>
              <van-radio-group v-model="form.status"
                               direction="horizontal">
                <van-radio name="1">在职</van-radio>
                <van-radio name="2">离职</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.name"
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
import {
  Button,
  Form,
  Field,
  CellGroup,
  RadioGroup,
  Radio,
  Calendar
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

      },
      showCalendar: false
    }
  },
  methods: {
    handleTimeConfirm() {
      this.showCalendar = false
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