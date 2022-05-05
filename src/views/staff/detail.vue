<!--
 * @Date: 2022-05-05 11:07:19
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-05 11:20:11
 * @FilePath: \little-bee-mobile\src\views\staff\detail.vue
 * @Description: 员工详情
-->
<template>
  <div class="detail">
    <bread></bread>
    <div class="views">
      <van-form @submit="handleGoAdd">
        <van-cell-group inset>
          <van-field v-model="form.name"
                     name="姓名"
                     label="姓名"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="性别"
                     label="性别"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="手机号"
                     label="手机号"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="入职时间"
                     label="入职时间"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="工资方式"
                     label="工资方式"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="工资数额"
                     label="工资数额"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="状态"
                     label="状态"
                     placeholder=""
                     :disabled="true" />
          <van-field v-model="form.name"
                     name="备注"
                     label="备注"
                     placeholder=""
                     :disabled="true" />
        </van-cell-group>
        <div class="fixed-button">
          <van-button color="#CB9400"
                      type="info">编辑</van-button>
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
  Form
} from 'vant'
export default {
  name: 'StaffDetail',
  components: {
    Bread,
    VanButton: Button,
    VanField: Field,
    VanCellGroup: CellGroup,
    VanForm: Form
  },
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    handleGoAdd() {
      this.$router.push({
        path:'/staffAdd',
        query: {
          
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.detail {
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