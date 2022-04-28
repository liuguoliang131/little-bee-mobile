<!--
 * @Date: 2022-04-22 15:50:06
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-28 09:43:42
 * @FilePath: \little-bee-mobile\src\views\login\register.vue
 * @Description: 注册
-->
<template>
  <div class="register">
    <header>注册企业</header>
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
      <van-field
        readonly
        clickable
        required
        name="area"
        :value="form.province+form.city+form.area"
        label="地区"
        :rules="[{ required: true, message: '请选择地区' }]"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-field required v-model.trim="form.address" label="详细地址" name="address" :rules="[{ required: true, message: '请输入详细地址' }]" placeholder="请输入详细地址" />
      <van-field v-model.trim="form.abbreviationName" :rules="[{ required: true, message: '请输入简称' }]" label="简称" placeholder="请输入简称" />
      <van-field v-model.trim="form.num" label="企业编号" placeholder="请输入企业编号" />
      <van-field v-model.trim="form.contact" label="联系人姓名" placeholder="请输入联系人姓名" />
      <van-field v-model.trim="form.website" label="官网地址" placeholder="请输入官网地址" />
      <van-field v-model.trim="form.appId" label="微信appId" placeholder="请输入微信appId" />
      <van-field v-model.trim="form.remark" label="备注" placeholder="请输入备注" />
      <div class="file">
        <span class="label">公司logo</span>
        <van-uploader v-model="logoPath" :before-read="logoPhotosBeforeRead" :deletable="false" />
      </div>
      <div class="file">
        <span class="label">营业执照</span>
        <van-uploader v-model="businessPhotos" :deletable="false" :before-read="businessPhotosBeforeRead" />
      </div>
      <div class="sub-btn">
        <van-button color="#CB9400"
          block
          type="info"
          native-type="submit">提交</van-button>
      </div>
      <footer></footer>
    </van-form>
    <van-popup v-model="showArea" position="bottom">
      <van-area
        class="area"
        :value="activeAreaCode"
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
  </div>
</template>

<script>
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
  host,
  h5_company_register,
  sys_version_file_upload
} from '@/http/api.js'
import { areaList } from '@vant/area-data'
export default {
  name:'register',
  components:{
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanPopup: Popup,
    VanArea: Area,
    VanUploader: Uploader
  },
  data() {
    return {
      form:{
        abbreviationName: '', //企业缩写
        address: '', //详细地址
        appId: '',//小程序appid
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
        website: ''//官网
      },
      showArea: false, 
      areaList: areaList,
      activeAreaCode: null,//选中的地区代码
      businessPhotos:[],
      logoPath:[]
    }
  },
  methods: {
    async onSubmit(values) {
      console.log(values)
      const businessPhotos = this.businessPhotos.length > 0 ? this.businessPhotos[0].url : ''
      const logoPath = this.logoPath.length > 0 ? this.logoPath[0].url : ''
      try {
        const res = await axios({
          method: 'post',
          url: host + h5_company_register,
          data: {
            ...this.form,
            businessPhotos,
            logoPath
          }
        })
        console.log(res)
        if (!res.success) {
          return Toast(res.msg)
        }
        Toast('注册成功')
        this.$router.push({
          name:'Login',
          params:{
            phone: res.model.companyPhone||''
          }
        })
      } catch (error) {
        Toast('error')
      }
    },
   
    // 显示地址选择器
    handleShowAreas () {
      this.showArea = true
    },
    onConfirm (result) {
      console.log(result)
      this.form.province = result[0].name
      this.form.city = result[1].name
      this.form.area = result[2].name
      this.activeAreaCode = result[2].code
      this.showArea = false
    },
    async logoPhotosBeforeRead(e,detail) {
      console.log(e,detail)
      const fd = new FormData()
      fd.append('file', e)
      const res = await this.uploadFile(fd, 'logoPath')
      console.log('上传完成',res)
    },
    async businessPhotosBeforeRead(e) {
      console.log(e)
      const fd = new FormData()
      fd.append('file', e)
      const res = await this.uploadFile(fd, 'businessPhotos')
      console.log('上传完成',res)
    },
    // 上传
    uploadFile(fd,key) {
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
      return new Promise((resolve)=>{
        this.$http.post(sys_version_file_upload, fd, config).then((res) => {
          toast.clear()
          if(res.success) {
            Toast('上传完成')
            setTimeout(()=>{
              this[key] = [{url: res.model.url||''}]
            },100)
            
          }else {
            Toast(res.msg)
          }
          resolve(res.success)
        })
      })
      
    }
  },
  created() {
    this.form.companyPhone = this.$route.params.phone||''
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