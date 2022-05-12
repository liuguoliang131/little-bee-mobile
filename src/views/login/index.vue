<!--
 * @Date: 2022-03-22 17:50:17
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-12 13:40:28
 * @FilePath: \little-bee-mobile\src\views\login\index.vue
 * @Description: 
-->
<template>
  <div class="login">
    <header>小蜜蜂</header>
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="form.phone"
                   center
                   clearable
                   label="手机号"
                   name="phone"
                   placeholder="请输入手机号"
                   :rules="[{ required: true, message: '请填写手机号' },{ pattern:/^[1]{1}[0-9]{10}$/, message: '手机号不符合规则' }]">
          <template #button>
            <van-button size="small"
                        type="primary"
                        color="#CB9400"
                        plain
                        @click="handleSendCode"
                        :disabled="ss!=='发送验证码'">{{ss}}</van-button>
          </template>
        </van-field>
        <van-field v-model="form.code"
                   type="number"
                   name="code"
                   label="验证码"
                   placeholder="请输入验证码"
                   :rules="[{ required: true, message: '请填写验证码' },{ pattern:/^[0-9]{1,10}$/, message: '验证码不符合规则' }]" />
        <div class="toRegister">
          <span @click="handleGoRegister">去注册</span>
        </div>
        <div class="sub-btn">
          <van-button color="#CB9400"
                      block
                      type="info"
                      native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    <footer>
      <span>登录代表您已同意</span>
      <span>小蜜蜂用户协议、隐私协议</span>
    </footer>
  </div>
</template>

<script>
import {
  Toast,
  Form,
  Field,
  Button
} from 'vant'
import axios from 'axios'
import { appId,host, h5_login_login, sys_sms_send } from '@/http/api'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        phone: '',
        code: '',
        type: 1,
        openId: this.$store.state.user.openId,
        appId: appId
      },
      timer: null,
      ss: '发送验证码'
    }
  },
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button
  },
  methods: {
    async onSubmit(values) {

      const res = await axios({
        method: 'get',
        url: host + h5_login_login,
        params: {
          ...this.form,
          openId: this.$store.state.user.openId
        }
      })
      if (!res.data.success) {
        return Toast(res.data.msg)
      }
      this.$store.dispatch('user/login', res.data.model)
    },
    //发送验证码
    async handleSendCode() {
      if (this.timer) {
        return false
      }
      if (/^[1]{1}[0-9]{10}$/.test(this.form.phone) === false) {
        return Toast('手机号不符合规则')
      }
      const res = await axios({
        method: 'get',
        url: host + sys_sms_send,
        params: {
          phone: this.form.phone
        }
      })
      if (!res.data.success) {
        return Toast(res.data.msg)
      }
      this.ss = 300
      // 启动定时器
      this.timer = setInterval(() => {
        this.ss--
        if (this.ss <= 0) {
          clearInterval(this.timer)
          this.timer = null
          this.ss = '发送验证码'
        }
      }, 1000)
    },
    // 去注册
    handleGoRegister() {
      this.$router.push({
        name: 'Register',
        params: {
          phone: this.form.phone
        }
      })
    }
  },
  created() {
    this.form.phone = this.$route.params.phone || ''
  }
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  header {
    font-size: 33px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-top: 95px;
    margin-bottom: 80px;
    text-align: center;
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
  .toRegister {
    width: 100%;
    padding: 10px 30px;
    display: flex;
    justify-content: flex-end;
    span {
      font-size: 14px;
      color: #cb9400;
    }
  }
  footer {
    font-size: 11px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #999999;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 15px;
    text-align: center;
    span:nth-child(2) {
      color: #cb9400;
    }
  }
}
</style>