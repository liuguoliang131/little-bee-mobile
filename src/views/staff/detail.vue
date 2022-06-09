<!--
 * @Date: 2022-05-05 11:07:19
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-09 16:27:17
 * @FilePath: \little-bee-mobile\src\views\staff\detail.vue
 * @Description: 员工详情
-->
<template>
  <div class="detail">
    <!-- <bread></bread> -->
    <div class="views">
      <van-form @submit="handleGoAdd">
        <!-- <van-cell-group inset> -->
          <van-field v-model="form.name"
                     readonly
                     name="姓名"
                     label="姓名"
                     placeholder=""
                     :rules="[{ required: true, message: '请填写姓名' }]" />
          <van-field name="性别"
                     label="性别"
                     readonly
                     :rules="[{ required: true, message: '请选择性别' }]">
            <template #input>
              <van-radio-group readonly
                               disabled
                               v-model="form.sex"
                               direction="horizontal">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-if="!hidePhone"
                     :value="form.phone"
                     readonly
                     name="手机号"
                     label="手机号"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写手机号' }]">
            <template #button>
              <van-icon name="eye-o"
                        @click="hidePhone=true" />
            </template>
          </van-field>
          <van-field v-else
                     :value="form.phone.substring(0,3)+'****'+form.phone.substring(7,11)"
                     readonly
                     name="手机号"
                     label="手机号"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写手机号' }]">
            <template #button>
              <van-icon name="closed-eye"
                        @click="hidePhone=false" />
            </template>
          </van-field>
          <van-field v-model="form.cnTime"
                     readonly
                     name="calendar"
                     label="入职时间"
                     placeholder=""
                     :rules="[{ required: true, message: '请选择入职时间' }]" />
          <van-field name="工资方式"
                     readonly
                     label="工资方式"
                     :rules="[{ required: true, message: '请填写选择工资方式' }]">
            <template #input>
              <van-radio-group readonly
                               disabled
                               v-model="form.salaryType"
                               direction="horizontal">
                <van-radio name="BASIC_SALARY">计件工资</van-radio>
                <van-radio name="GUARANTEED_SALARY">保底工资</van-radio>
                <van-radio name="FIXED_SALARY">固定工资</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.salaryAmount"
                     readonly
                     name="工资数额"
                     label="工资数额"
                     placeholder=""
                     type="number"
                     :rules="[{ required: true, message: '请填写工资数额' }]" />
          <van-field name="状态"
                     readonly
                     label="状态">
            <template #input>
              <van-radio-group readonly
                               disabled
                               v-model="form.disabledStatus"
                               direction="horizontal">
                <van-radio :name="false">在职</van-radio>
                <van-radio :name="true">离职</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="form.remark"
                     readonly
                     name="备注"
                     label="备注"
                     placeholder="" />
        <!-- </van-cell-group> -->
        <!-- <div class="fixed-button">
          <van-button color="#CB9400"
                      type="info">编辑</van-button>
        </div> -->
        <div class="sub-btn">
          <button type="button"
                  @click="$router.go(-1)">返回</button>
          <button type="submit">编辑</button>
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
  Icon
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
    VanIcon: Icon
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
      },
      hidePhone: true
    }
  },
  methods: {
    handleGoAdd() {
      this.$router.push({
        path: '/staffEdit',
        query: {
          id: this.$route.query.id
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
  .views {
    height: 100vh;
    padding-top: 25px;
  }
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
  .sub-btn {
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      color: #ffff;
      background-color: #cb9400;
      border-radius: 5px;
      border: 1px solid #cb9400;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      width: 115px;
      height: 40px;
      &:active {
        background-color: rgb(189, 141, 11);
      }
    }
    button:nth-child(1) {
      margin-right: 12px;
      color: #cb9400;
      background-color: #ffff;
      &:active {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>