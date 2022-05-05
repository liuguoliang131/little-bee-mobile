<!--
 * @Date: 2022-05-05 12:43:30
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-05 14:08:29
 * @FilePath: \little-bee-mobile\src\views\staff\statistics.vue
 * @Description: 绩效统计
-->
<template>
  <div class="Statistics">
    <bread></bread>
    <div class="views">
      <van-field
        v-model="month"
        is-link
        readonly
        name="picker"
        label="月份"
        placeholder="点击选择月份"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="handleMonthConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>员工姓名</th>
            <th>工资方式</th>
            <th>收入</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{index}}</td>
            <td>张</td>
            <td>固定工资</td>
            <td>11222</td>
            <td><van-icon name="more-o" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Bread from '@/components/bread/index'
import {
  Popup,
  Field,
  Picker,
  Button,
  Icon
} from 'vant'
export default {
  name:'Statistics',
  components: {
    Bread,
    VanPopup:Popup,
    VanField:Field,
    VanPicker:Picker,
    VanButton:Button,
    VanIcon:Icon
  },
  data() {
    return {
      showPicker:false,
      columns:[
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      month:null
    }
  },
  methods: {
    handleMonthConfirm(e) {
      console.log(e)
      this.month = e
      this.showPicker = false
    }
  }
}
</script>

<style scoped lang="less">
.Statistics {

}
</style>