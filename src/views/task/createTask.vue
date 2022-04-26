<!--
 * @Date: 2022-04-26 15:32:55
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-26 19:30:24
 * @FilePath: \little-bee-mobile\src\views\task\createTask.vue
 * @Description: 创建任务
-->
<template>
  <div class="createTask">
    <van-form @submit="onSubmit">
      <van-field v-model.trim="form.title"
        type="text"
        name="title"
        label="标题"
        placeholder="请输入标题"
        required
        :rules="[{ required: true, message: '请填写标题' }]" />
      <van-field v-model.trim="form.sortTitle"
        type="text"
        name="sortTitle"
        label="副标题"
        placeholder="请输入副标题"
        required
        :rules="[{ required: true, message: '请填写标题' }]" />
      <van-field v-model="form.count"
        type="digit"
        name="count"
        label="数量"
        placeholder="请输入数量"
        required
        :rules="[{ required: true, message: '请填写数量' },{ validator: countValidator, message: '数量必须大于0' }]" />
      <van-field v-model="form.unitPrice"
        type="number"
        name="unitPrice"
        label="单价"
        placeholder="请输入单价"
        required
        :rules="[{ required: true, message: '请填写单价' }, { validator: unitPriceValidator, message: '单价必须大于0' }]" />
      <van-field v-model.trim="form.remark"
        type="text"
        name="remark"
        label="备注"
        placeholder="请输入备注" />
      <van-field v-model="totalPrice"
        type="number"
        name="totalPrice"
        label="总价"
        :disabled="true"
      />
      <div class="file">
        <span class="label">图片</span>
        <van-uploader v-model="photos" :after-read="photosAfterRead" :deletable="true" />
      </div>
      <div class="sub-btn">
        <van-button color="#CB9400"
          block
          type="info"
          native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  Form,
  Field,
  Button,
  Uploader,
  Toast
} from 'vant'
import { sys_version_file_upload, h5_job_create } from '@/http/api'
export default {
  name:'CreateTask',
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanUploader: Uploader
  },
  data() {
    return {
      form: {
        title: '',
        sortTitle: '',
        count: 1,
        unitPrice: 1,//单价
        remark: '',
        imagesIds: ''
      },
      photos: []
    }
  },
  computed: {
    totalPrice() {
      if(!this.form.count||!this.form.unitPrice) {
        return 0
      }
      return Number((this.form.count * this.form.unitPrice).toFixed(2))
    }
  },
  methods: {
    countValidator(val) {
      return val > 0
    },
    unitPriceValidator(val) {
      return val > 0
    },
    async photosAfterRead(e) {
      console.log(e)
      const fd = new FormData()
      fd.append('file', e.file)
      const res = await this.uploadFile(fd, 'photos')
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
              this[key][this[key].length-1] = { url: res.model.url||'', id: res.model.id }
            },100)
            
          }else {
            this[key].pop()
            Toast(res.msg)
          }
          resolve(res.success)
        })
      })
      
    },
    async onSubmit() {
      console.log('submit')
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await this.$http({
        method: 'post',
        url: h5_job_create,
        data: {
          ...this.form,
          imagesIds: this.photos.join(',')
        }
      })
      toast.clear()
      if(!res.success) {
        Toast(res.msg)
      }
      Toast('创建成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.createTask {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-top: 30px;
  .sub-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    .van-button {
      width: 200px;
    }
  }
  .file {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;
    margin: 0 16px;
    padding: 10px 0;
    border-bottom: 1px solid rgb(245, 246, 247);
    .label {
      width: 80px;
    }
    
  }
}
</style>