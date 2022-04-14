<template>
  <div class="login_container">
    <div class="top_background">
      <img src="https://3d-fabric.oss-cn-beijing.aliyuncs.com/public-images/toptext%402x.png"
           alt="厚鸟科技面料后台管理系统">
    </div>
    <div class="login">
      <div class="login_form_box">
        <!-- 提示信息 -->
        <div class="msgBox" ref="msgBox"></div>
        <el-form :model="loginForm"
        v-loading="loading"
               :rules="rules"
               ref="loginform"
               label-width="0px"
               class="demo-loginForm">
        <el-form-item
                      prop="phone"
                      class="username"
                      >
                      <img src="~@/assets/Login/yonghuming-01-01@2x.png" alt="">
          <el-input type="text"
                    class="username_input"
                    maxlength="20"
                    v-model.trim="loginForm.phone"
                    placeholder="请输入用户名"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
                      class="password"
                      prop="password">
                      <img src="~@/assets/Login/mima@2x.png" alt="">
          <el-input type="password"
                    maxlength="20"
                    class="password_input"
                    show-password
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="subbtn" type="primary" style=""
          @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
      </div>

    </div>
    <div class="ICP"><a href="http://beian.miit.gov.cn/" target="_blank">京ICP备2021017347号-1</a></div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import CryptoJS from 'crypto-js'
import jsMd5 from 'js-md5'
export default {
  data () {
    var phoneValidate = (rule, value, callback) => {
      let reg = /[1]{1}[3-9]{1}[0-9]{9}/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('不是正确的手机号格式'))
      }
    }
    return {
      loginForm: {
        phone: '',
        password: '',
        projectId: 2
      },
      loading: false,
      rules: {
        phone: [
          {required: true, message: '请输入用户名'},
          {validator: phoneValidate, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {max: 16, min: 6, message: '密码为6到16位之间', trigger: 'blur'}
        ]
      },
      timeNo: null
    }
  },
  created () {
    this.getAccount_password()
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    fadeInFn (dom, msg) {
      if (this.timeNo !== null) {
        clearTimeout(this.timeNo)
      }
      dom.style.opacity = 1
      dom.innerHTML = msg
      this.timeNo = window.setTimeout(() => {
        dom.style.opacity = 0
      }, 2000)
    },
    submitForm () {
      this.loading = true
      this.$refs['loginform'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          let msgBox = this.$refs.msgBox
          this.fadeInFn(msgBox, '用户名或密码不规范')
          this.loading = false
          return false
        }
      })
    },
    async login () {
      try {
        let params = {
          ...this.loginForm
        }
        params.password = jsMd5(params.password)
        const res = await this.$http.post(this.$apis.user_core_login, params)
        console.log('res', res)
        if (res.success) {
          this.setAccount_password()
          res.model.merchantCode = res.model.userCompanyOut.companyCode
          res.model.superMerchantCode = res.model.userCompanyOut.companyCode
          res.model.userId = res.model.userCompanyOut.userId
          res.model.companyId = res.model.userCompanyOut.companyId
          this.$store.commit('user/setUserInfo', res.model)
          // this.$store.commit('user/setToken', res.model)
          // 去查询当前用户权限
          await this.queryUserJurisdiction(res.model)
          this.loading = false
        // this.$router.replace('/index')
        } else {
          let msgBox = this.$refs.msgBox
          this.fadeInFn(msgBox, res.msg)
          this.loading = false
        }
      } catch (error) {
        console.log(error)
        this.loading = false
        let msgBox = this.$refs.msgBox
        this.fadeInFn(msgBox, '登录失败')
      }
    },
    async queryUserJurisdiction (data) {
      try {
        const res = await this.$http({
          method: 'get',
          url: this.$apis.user_role_findMenuByUser,
          params: {
            userId: data.id,
            projectId: 2,
            companyId: data.userCompanyOut.companyId
          }

        })
        console.log(res)
        this.$store.commit('aside/setMenusBtnsTree', res.model)

        const path = this.deepSearchRedirect()
        if (path === '/login') {
          this.$message.error('账号没有权限')
        } else {
          this.$router.replace(path).catch(err => {
            throw err
          })
        }
      } catch (error) {
        console.log(error)
        this.$message.error('获取权限失败')
      }
    },
    // 加密保存到本地
    setAccount_password () {
      let loginData = CryptoJS.AES.encrypt(JSON.stringify(this.loginForm), 'account_password')
      Cookie.set('account_password', loginData, {expires: 365})
    },
    // 解码回填
    getAccount_password () {
      let encrypt = Cookie.get('account_password')
      if (encrypt) {
        let bytes = CryptoJS.AES.decrypt(encrypt.toString(), 'account_password')
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        if (decryptedData.hasOwnProperty('clientSideType')) {
          delete decryptedData.clientSideType
        }
        decryptedData.projectId = 2
        this.loginForm = decryptedData
      }
    },
    deepSearchRedirect () {
      let path = '/login'
      function deep (list) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.show) {
            path = item.path
            break
          } else {
            if (item.children) {
              deep(item.children)
            }
          }
        }
      }
      deep(this.$store.state.aside.list)
      return path
    }

  }
}
</script>
<style lang="less" scoped>
.top_background {
  width: 100%;
  height: 450px;
  text-align: center;
  background: #346a99 no-repeat url("https://3d-fabric.oss-cn-beijing.aliyuncs.com/public-images/bg%402x%20ys.png") center center;
  background-size: contain;
  img {
    width: 370px;
    padding-top: 157px;
  }
}
.login {
  width: 100%;
}
.login {
  padding-top: 100px;
  display: flex;
  justify-content: center;
}
.login .login_form_box {
  width: 500px;
  position: relative;
  .msgBox {
    position: absolute;
    left: 583px;
    top:88px;
    width: 263.6px;
    height: 58px;
    background-color: #7f7f7f;
    border-radius: 29px;
    transition: all 1s;
    opacity: 0;
    text-align: center;
    font: normal 400 17px/58px 'Hiragino Sans GB';
    color:white;
  }
}
.username,.password {
  position: relative;
  margin: 30px 0 0 0;
  img {
    position: absolute;
    top: 19px;
    left:20px;
    height: 21px;
    z-index: 1;
  }
}
.username {
  margin-top: 0;
}
/deep/.el-input .el-input__inner {
  height: 58px;
  font-size: 17px;
  text-indent: 60px;

}
.ICP {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  text-align: center;
  color: #666666;
}
.subbtn {
  background-color:#4972F1;width:100%;margin-top:47px;height:58px;font:normal 400 23px/23px 'Hiragino Sans GB'
}
</style>
