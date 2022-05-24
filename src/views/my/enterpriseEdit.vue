<!--
 * @Date: 2022-04-22 15:50:06
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-24 14:00:50
 * @FilePath: \little-bee-mobile\src\views\my\enterpriseEdit.vue
 * @Description: 注册
-->
<template>
  <div class="register">
    <bread></bread>
    <van-form @submit="onSubmit">
      <van-field v-model="form.companyPhone"
                 center
                 clearable
                 label="企业电话"
                 name="companyPhone"
                 placeholder="请输入手机号"
                 required
                 :rules="[{ required: true, message: '请填写手机号' },{ pattern:/^[1]{1}[0-9]{10}$/, message: '手机号不符合规则' }]" />
      <van-field v-model.trim="form.companyName"
                 label="企业名称"
                 placeholder="请输入企业名称"
                 required
                 :rules="[{ required: true, message: '请填写企业名称' }]" />
      <van-field readonly
                 clickable
                 required
                 name="area"
                 :value="form.province+form.city+form.area"
                 label="地区"
                 :rules="[{ required: true, message: '请选择地区' }]"
                 placeholder="点击选择省市区"
                 @click="showArea = true" />
      <van-field required
                 v-model.trim="form.address"
                 label="详细地址"
                 name="address"
                 :rules="[{ required: true, message: '请输入详细地址' }]"
                 placeholder="请输入详细地址" />
      <van-field v-model.trim="form.abbreviationName"
                 :rules="[{ required: true, message: '请输入简称' }]"
                 label="简称"
                 placeholder="请输入简称" />
      <!-- <van-field v-model.trim="form.num" label="企业编号" placeholder="请输入企业编号" /> -->
      <van-field v-model.trim="form.contact"
                 label="联系人姓名"
                 placeholder="请输入联系人姓名" />
      <van-field v-model.trim="form.website"
                 label="官网地址"
                 placeholder="请输入官网地址" />
      <!-- <van-field v-model.trim="form.appId" label="微信appId" placeholder="请输入微信appId" /> -->
      <van-field v-model.trim="form.remark"
                 label="备注"
                 placeholder="请输入备注" />
      <div class="file">
        <span class="label">公司logo</span>
        <van-uploader v-model="logoPath"
                      :before-read="logoPhotosBeforeRead"
                      :after-read="logoPhotosAfterRead"
                      :deletable="false" />
      </div>
      <div class="file">
        <span class="label">营业执照</span>
        <van-uploader v-model="businessPhotos"
                      :deletable="false"
                      :before-read="businessPhotosBeforeRead"
                      :after-read="businessPhotosAfterRead" />
      </div>
      <div class="sub-btn">
        <van-button color="#CB9400"
                    block
                    type="info"
                    native-type="submit">提交</van-button>
      </div>
      <footer></footer>
    </van-form>
    <van-popup v-model="showArea"
               position="bottom">
      <van-area class="area"
                :value="activeAreaCode"
                :area-list="areaList"
                @confirm="onConfirm"
                @cancel="showArea = false" />
    </van-popup>
  </div>
</template>

<script>
import Bread from '@/components/bread'
import {
  Toast,
  Form,
  Field,
  Button,
  Popup,
  Area,
  Uploader
} from 'vant'
import axios from 'axios'
import {
  appId,
  company_update,
  sys_version_file_upload,
  h5_company_findById
} from '@/http/api.js'
import { areaList } from '@vant/area-data'
export default {
  name: 'EnterpriseEdit',
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanPopup: Popup,
    VanArea: Area,
    VanUploader: Uploader,
    Bread
  },
  data() {
    return {
      form: {
        abbreviationName: '', //企业缩写
        address: '', //详细地址
        openId: '',//用户openId
        area: '',//区县
        businessPhotos: '',//营业执照
        city: '',//城市
        companyName: '',//企业名称
        companyPhone: '', //企业电话
        contact: '', //联系人
        logoPath: '', //企业logo
        num: '',
        province: '',//省
        remark: '',//备注
        website: '',//官网
        appId: this.$store.state.user.openId
      },
      showArea: false,
      areaList: areaList,
      activeAreaCode: null,//选中的地区代码
      businessPhotos: [],
      logoPath: []
    }
  },
  methods: {
    async onSubmit(values) {
      console.log(values)
      const businessPhotos = this.businessPhotos.length > 0 ? this.businessPhotos[0].url : ''
      const logoPath = this.logoPath.length > 0 ? this.logoPath[0].url : ''
      try {
        const res = await this.$http({
          method: 'post',
          url: company_update,
          data: {
            ...this.form,
            businessPhotos,
            logoPath,
            appId: this.$store.state.user.openId
          }
        })
        console.log(res)
        if (!res.success) {
          return Toast(res.msg)
        }
        Toast('修改成功')
        this.$router.go(-1)
      } catch (error) {
        console.log(error)
      }
    },

    // 显示地址选择器
    handleShowAreas() {
      this.showArea = true
    },
    onConfirm(result) {
      console.log(result)
      this.form.province = result[0].name
      this.form.city = result[1].name
      this.form.area = result[2].name
      this.activeAreaCode = result[2].code
      this.showArea = false
    },
    async logoPhotosBeforeRead(e, detail) {
      console.log(e, detail)
      const fd = new FormData()
      fd.append('file', e)
      const res = await this.uploadFile(fd, 'logoPath')
      console.log('上传完成', res)
    },
    logoPhotosAfterRead(e) {
      console.log('after', e)
      this.logoPath.pop()
    },
    async businessPhotosBeforeRead(e) {
      console.log(e)
      const fd = new FormData()
      fd.append('file', e)
      const res = await this.uploadFile(fd, 'businessPhotos')
      console.log('上传完成', res)
    },
    businessPhotosAfterRead(e) {
      console.log('after', e)
      this.businessPhotos.pop()
    },
    // 上传
    uploadFile(fd, key) {
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
            if (res.model && res.model.url) {
              this[key] = [{ url: res.model.url }]
              console.log('list', this[key])
            }
            resolve(res.success)
          } else {
            Toast(res.msg)
            resolve(res.success)
          }
        })
      })

    },
    async echoData() {
      const res = await this.$http({
        method: 'get',
        url: h5_company_findById,
        params: {
          id: this.$route.query.id
        }
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      this.form = {
        abbreviationName: res.model.abbreviationName, //企业缩写
        address: res.model.address, //详细地址
        openId: '',//用户openId
        area: res.model.area,//区县
        businessPhotos: res.model.businessPhotos,//营业执照
        city: res.model.city,//城市
        companyName: res.model.companyName,//企业名称
        companyPhone: res.model.companyPhone, //企业电话
        contact: res.model.contact, //联系人
        logoPath: res.model.logoPath, //企业logo
        num: res.model.num,
        province: res.model.province,//省
        remark: res.model.remark,//备注
        website: res.model.website,//官网
        appId: this.$store.state.user.openId
      }
      this.businessPhotos = []
      this.logoPath = []
      res.model.businessPhotos && res.model.businessPhotos.split(',').forEach(item => {
        this.businessPhotos.push({
          url: item
        })
      })
      res.model.logoPath && res.model.logoPath.split(',').forEach(item => {
        this.logoPath.push({
          url: item
        })
      })
    }
  },
  created() {
    this.echoData()
  }
}
</script>

<style scoped lang="less">
.register {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  padding-top: 60px;
  header {
    text-align: center;
    height: 60px;
    line-height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
  }
  .sub-btn {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    .van-button {
      width: 200px;
    }
  }
  .file {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin: 0 16px;
    padding: 10px 0;
    border-bottom: 1px solid rgb(245, 246, 247);
    .label {
      flex: 1;
    }
  }
  footer {
    height: 200px;
  }
}
</style>