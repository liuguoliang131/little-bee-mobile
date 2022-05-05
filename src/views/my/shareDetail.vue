<!--
 * @Date: 2022-05-05 19:09:22
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-05 19:13:47
 * @FilePath: \little-bee-mobile\src\views\my\shareDetail.vue
 * @Description: 分享详情
-->
<template>
  <div class="shareDetail">
    <bread></bread>
    <div class="views">
      <van-form>
        <van-cell-group inset>
          <van-field v-model="form.name"
                     name="ID"
                     label="ID"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="标题"
                     label="标题"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="数量"
                     label="数量"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="单价"
                     label="单价"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="总价"
                     label="总价"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="备注"
                     label="备注"
                     placeholder=""
                     :disabled="true" />
                     <van-field v-model="form.name"
                     name="分享时间"
                     label="分享时间"
                     placeholder=""
                     :disabled="true" />
                     <van-field v-model="form.name"
                     name="任务出处"
                     label="任务出处"
                     placeholder=""
                     :disabled="true" />
                     <van-field v-model="form.name"
                     name="任务状态"
                     label="任务状态"
                     placeholder=""
                     :disabled="true" />
                     <van-field v-model="form.name"
                     name="任务联系方式"
                     label="任务联系方式"
                     placeholder=""
                     :disabled="true" />
                     <van-field v-model="form.name"
                     name="任务联系人"
                     label="任务联系人"
                     placeholder=""
                     :disabled="true" />
                     <van-field v-model="form.name"
                     name="任务接收方"
                     label="任务接收方"
                     placeholder=""
                     :disabled="true" />
        </van-cell-group>
      </van-form>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import {
  Field,
  CellGroup,
  Form,
  Uploader
} from 'vant'
export default {
  name:'shareDetail',
  components: {
    Bread,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form,
  },
  data() {
    return {
      form: {

      }
    }
  },
}
</script>

<style scoped lang="less">
.shareDetail {

}
</style>