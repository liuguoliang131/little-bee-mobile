<!--
 * @Date: 2022-05-05 12:43:30
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-01 16:07:59
 * @FilePath: \little-bee-mobile\src\views\staff\statistics.vue
 * @Description: 绩效统计
-->
<template>
  <div class="Statistics">
    <bread></bread>
    <div class="views">
      <van-field v-model="month"
                 is-link
                 readonly
                 name="picker"
                 label="月份"
                 placeholder="点击选择月份"
                 @click="showPicker = true" />
      <van-popup v-model="showPicker"
                 position="bottom">
        <van-picker show-toolbar
                    :columns="columns"
                    @confirm="handleMonthConfirm"
                    @cancel="showPicker = false" />
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
          <tr v-for="(item,idx) in tableData" :key="item.id">
            <td>{{idx+1}}</td>
            <td>{{item.employeeName}}</td>
            <td>
              <span v-if="item.salaryType==='BASIC_SALARY'">基本工资</span>
              <span v-else-if="item.salaryType==='GUARANTEED_SALARY'">保底工资</span>
              <span v-else-if="item.salaryType==='FIXED_SALARY'">固定工资</span>
              <span v-else-if="item.salaryType==='INIT'">未设置</span>
            </td>
            <td>{{item.totalAmount.value}}</td>
            <td>
              <van-icon name="more-o" @click="handleShowMore(item)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Bread from '@/components/bread/index'
import { h5_performanceStatistics_findPage } from '@/http/api'
import {
  Popup,
  Field,
  Picker,
  Button,
  Icon,
  Toast
} from 'vant'
export default {
  name: 'Statistics',
  components: {
    Bread,
    VanPopup: Popup,
    VanField: Field,
    VanPicker: Picker,
    VanButton: Button,
    VanIcon: Icon
  },
  data() {
    return {
      showPicker: false,
      columns: [
        '全部',
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
      month: null,
      tableData:[]
    }
  },
  methods: {
    handleMonthConfirm(e) {
      console.log(e)
      this.month = e
      this.showPicker = false
      this.getList()
    },
    async getList() {
      let salaryData = ''
      let year = new Date().getFullYear()
      switch (this.month) {
        case '全部':
          salaryData = ''
          break
        case '1月':
          salaryData = year + '-01'
          break
        case '2月':
          salaryData = year + '-02'
          break
        case '3月':
          salaryData = year + '-03'
          break
        case '4月':
          salaryData = year + '-04'
          break
        case '5月':
          salaryData = year + '-05'
          break
        case '6月':
          salaryData = year + '-06'
          break
        case '7月':
          salaryData = year + '-07'
          break
        case '8月':
          salaryData = year + '-08'
          break
        case '9月':
          salaryData = year + '-09'
          break
        case '10月':
          salaryData = year + '-10'
          break
        case '11月':
          salaryData = year + '-11'
          break
        case '12月':
          salaryData = year + '-12'
          break
        default:
          salaryData = ''
          break
      }
      const params = {
        salaryData
      }
      const res = await this.$http.post(h5_performanceStatistics_findPage,params)
      if(!res.success) {
        return Toast(res.msg)
      }
      this.tableData = res.model.data||[]
    },
    handleShowMore(item) {
      this.$router.push({
        path:'performanceDetails',
        query: {
          employeeId:item.employeeId,
          // month: this.month,
          salaryData: item.salaryData,
          employeeName:item.employeeName,
          salaryType:item.salaryType
        }
      })
    }
  },
  created() {
    this.month = `${new Date().getMonth()+1}月`
    this.getList()
  }
}
</script>

<style scoped lang="less">
.Statistics {
}
</style>