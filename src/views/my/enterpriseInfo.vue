<!--
 * @Date: 2022-05-05 17:10:06
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-05 18:19:21
 * @FilePath: \little-bee-mobile\src\views\my\enterpriseInfo.vue
 * @Description: 企业信息
-->
<template>
  <div class="enterpriseInfo">
    <bread></bread>
    <div class="views">
      <van-form @submit="handleGoAdd">
        <van-cell-group inset>
          <van-field v-model="form.name"
                     name="企业号"
                     label="企业号"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="企业名称"
                     label="企业名称"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="简称"
                     label="简称"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="联系人"
                     label="联系人"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="联系电话"
                     label="联系电话"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="公司地址"
                     label="公司地址"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="企业logo"
                     label="企业logo"
                     placeholder=""
                     :disabled="true">
            <template #input>
              <van-uploader readonly
                            :deletable="false"
                            :show-upload="false"
                            v-model="logoPath" />
            </template>
          </van-field>
          <van-field v-model="form.name"
                     name="营业执照"
                     label="营业执照"
                     placeholder=""
                     :disabled="true">
            <template #input>
              <van-uploader readonly
                            :deletable="false"
                            :show-upload="false"
                            v-model="businessPhotos" />
            </template>
          </van-field>
          <van-field v-model="form.name"
                     name="会员"
                     label="会员"
                     placeholder=""
                     :disabled="true">
            <template #button>
              <van-button color="#CB9400"
                          size="small"
                          type="primary">购买</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="fixed-button">
          <van-button color="#CB9400"
                      type="info">领取</van-button>
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
  Field,
  CellGroup,
  Form,
  Uploader
} from 'vant'
export default {
  name: 'EnterpriseInfo',
  components: {
    Bread,
    VanButton: Button,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form,
    VanUploader: Uploader
  },
  data() {
    return {
      form: {

      },
      logoPath: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      businessPhotos: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
    }
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
