<!--
 * @Date: 2022-05-05 17:10:59
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-01 17:35:24
 * @FilePath: \little-bee-mobile\src\views\staff\performanceDetails.vue
 * @Description: 分享列表
-->
<template>
  <div class="history">
    <bread></bread>
    <div class="head">
      <div class="month">{{$route.query.salaryData | fMonth}}</div>
      <div class="staff">
        <div class="staff-name">{{$route.query.employeeName||''}}</div>
        <div class="staff-wages">
          <span v-if="$route.query.salaryType==='BASIC_SALARY'">基本工资</span>
          <span v-else-if="$route.query.salaryType==='GUARANTEED_SALARY'">保底工资</span>
          <span v-else-if="$route.query.salaryType==='FIXED_SALARY'">固定工资</span>
          <span>￥{{sumPrice.toFixed(2)}}</span>
        </div>
      </div>
    </div>
    <div class="views">
      <van-pull-refresh v-model="reloading"
                        @refresh="refreshGetList">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="getList">
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>标题</th>
                <th>工序</th>
                <th>单价</th>
                <th>总价</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData"
                  :key="index">
                <td>{{item.billData.substr(item.billData.length-2)}}日</td>
                <td>{{item.title}}</td>
                <td>{{item.processName}}x{{item.count}}</td>
                <td>{{item.processUnitPrice.value}}</td>
                <td>{{item.processUnitPrice.value*item.count}}</td>
              </tr>
            </tbody>
          </table>
        </van-list>
      </van-pull-refresh>
      <div class="totalPrice">合计: ￥{{totalPrice.toFixed(2)}}</div>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_performanceStatistics_mechanicStatistics, h5_performanceStatistics_sum, employeeProcessView_findPage } from '@/http/api'
import {
  Toast,
  Icon,
  PullRefresh,
  List,
} from 'vant'
export default {
  name: 'PerformanceDetails',
  data() {
    return {
      searchParams: {
        pageNo: 1,
        pageSize: 20000,
        statisticsData: this.$route.query.salaryData,
        employeeId: this.$route.query.employeeId
      },
      tableData: [],
      loading: false,
      finished: false,
      reloading: false,
      sumPrice: 0,
      totalPrice: 0
    }
  },
  filters: {
    fMonth(val) {
      if (val) {
        return String(Number(val.substr(val.length - 2))) + '月'
      }
    }
  },
  components: {
    // VanIcon: Icon,
    VanPullRefresh: PullRefresh,
    VanList: List,
    Bread
  },
  methods: {
    async refreshGetList() {
      this.searchParams.pageNo = 1
      this.tableData = []
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      try {
        const res = await this.$http({
          method: 'post',
          url: employeeProcessView_findPage,
          data: this.searchParams
        })
        toast.clear()
        this.reloading = false
        if (!res.success) {
          return Toast(res.msg)
        }
        res.model.data && res.model.data.forEach((item, idx) => {
          item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
        })
        this.tableData = [...this.tableData, ...res.model.data]
        let total = 0
        this.tableData.forEach(item => {
          total += item.processUnitPrice.value * item.count
        })
        this.totalPrice = total || 0
        this.searchParams.pageNo++
      } catch (error) {
        toast.clear()
        console.log(error)
        throw error
      }
    },
    async getSum() {
      try {
        const params = {
          salaryData: this.searchParams.statisticsData,
          employeeId: this.searchParams.employeeId
        }
        const res = await this.$http.post(h5_performanceStatistics_sum, params)
        if (!res.success) {
          return Toast(res.msg)
        }
        this.sumPrice = res.model.value || 0
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getList() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      try {

        const res = await this.$http({
          method: 'post',
          url: employeeProcessView_findPage,
          data: this.searchParams
        })
        toast.clear()
        if (!res.success) {
          return Toast(res.msg)
        }
        res.model.data && res.model.data.forEach((item, idx) => {
          item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
        })
        this.tableData = [...this.tableData, ...res.model.data]
        let total = 0
        this.tableData.forEach(item => {
          total += item.processUnitPrice.value * item.count
        })
        this.totalPrice = total || 0
        this.searchParams.pageNo++
        this.loading = false
        this.finished = res.model.lastPage
      } catch (error) {
        toast.clear()
        console.log(error)
        throw error
      }
    }
  },
  created() {
    this.getSum()
  }
}
</script>

<style scoped lang="less">
.history {
  .head {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .month {
      font-size: 21px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .staff {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .staff-name {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .staff-wages {
        margin-left: 20px;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
  }
  .views {
    height: calc(100vh - 95px);
    .van-pull-refresh {
      height: calc(100vh - 135px);
    }
    .totalPrice {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      background-color: #f0f0f0;
      height: 40px;
      width: 100%;
      padding: 0 15px;
      line-height: 40px;
      text-align: right;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
}
</style>