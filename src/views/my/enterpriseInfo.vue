<!--
 * @Date: 2022-05-05 17:10:06
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-24 13:24:42
 * @FilePath: \little-bee-mobile\src\views\my\enterpriseInfo.vue
 * @Description: 企业信息
-->
<template>
  <div class="enterpriseInfo">
    <bread @click="handleGoEdit">
      <van-icon name="edit"
                color="#cb9400" />
    </bread>
    <div class="views">
      <van-form @submit="handleGoAdd">
        <van-cell-group inset>
          <van-field v-model="form.num"
                     name="企业号"
                     label="企业号"
                     placeholder=""
                     readonly />
          <van-field :value="form.name||form.companyName"
                     name="企业名称"
                     label="企业名称"
                     placeholder=""
                     readonly />
          <van-field v-model="form.abbreviationName"
                     name="简称"
                     label="简称"
                     placeholder=""
                     readonly />
          <van-field v-model="form.contact"
                     name="联系人"
                     label="联系人"
                     placeholder=""
                     readonly />
          <van-field v-model="form.companyPhone"
                     name="联系电话"
                     label="联系电话"
                     placeholder=""
                     readonly />
          <van-field :value="form.province+form.city+form.area+form.address"
                     name="公司地址"
                     label="公司地址"
                     placeholder=""
                     readonly />
          <van-field v-model="form.logoPath"
                     name="企业logo"
                     label="企业logo"
                     placeholder=""
                     readonly>
            <template #input>
              <van-uploader readonly
                            :deletable="false"
                            :show-upload="false"
                            v-model="form.logoPaths" />
            </template>
          </van-field>
          <van-field v-model="form.businessPhotos"
                     name="营业执照"
                     label="营业执照"
                     placeholder=""
                     readonly>
            <template #input>
              <van-uploader readonly
                            :deletable="false"
                            :show-upload="false"
                            v-model="form.businessPhotoss" />
            </template>
          </van-field>
          <van-field :value="form.useDayCount===0?'已过期':`${form.useDayCount}天后到期`"
                     name="会员"
                     label="会员"
                     placeholder=""
                     readonly>
            <template #button>
              <van-button color="#CB9400"
                          size="small"
                          type="primary"
                          @click="$router.push('/renewalMember')">购买</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <!-- <div class="fixed-button">
          <van-button color="#CB9400"
                      type="info">领取</van-button>
        </div> -->
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_company_findById } from '@/http/api'
import {
  Button,
  Field,
  CellGroup,
  Form,
  Uploader,
  Toast,
  Icon
} from 'vant'
export default {
  name: 'EnterpriseInfo',
  components: {
    Bread,
    VanButton: Button,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form,
    VanUploader: Uploader,
    VanIcon: Icon
  },
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    async getForm() {
      // this.form = Object.assign(this.form,this.$store.state.user.userInfo)
      // this.form.logoPath = this.form.logoPath.split(',').map(item=>{
      //   return {
      //     url:item
      //   }
      // })
      const params = {
        id: this.$store.state.user.userInfo.companyId || this.$store.state.user.userInfo.id
      }
      const res = await this.$http({
        method: 'get',
        url: h5_company_findById,
        params
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      this.form = res.model || this.$store.state.user.userInfo
      this.form.logoPaths = []
      this.form.logoPath.split(',').forEach(item => {
        this.form.logoPaths.push({
          url: item
        })
      })
      this.form.businessPhotoss = []
      this.form.businessPhotos.split(',').forEach(item => {
        this.form.businessPhotoss.push({
          url: item
        })
      })
      this.$store.commit('user/set_userInfo', this.form)
    },
    handleGoEdit() {
      this.$router.push({
        path: '/enterpriseEdit',
        query: {
          id: this.$store.state.user.userInfo.companyId || this.$store.state.user.userInfo.id
        }
      })
    }


  },
  created() {
    this.getForm()
  }
}
</script>

<style scoped lang="less">
.enterpriseInfo {
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
