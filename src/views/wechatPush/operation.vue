<!--
 * @Date: 2022-05-26 15:42:26
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-01 15:28:16
 * @FilePath: \little-bee-mobile\src\views\wechatPush\operation.vue
 * @Description: 点击微信公众号员工登录后的页面
-->
<template>
  <div class="wechatPushOperation">
    <bread></bread>
    <div class="head">
      <div class="month">{{searchParams.statisticsData}}</div>
      <div class="staff">
        <div class="staff-name">{{$store.state.user.userInfo.name||$store.state.user.userInfo.companyName}}</div>
        <div class="staff-wages">固定工资￥{{sumPrice.toFixed(2)}}</div>
      </div>
    </div>
    <div class="views">
      <van-pull-refresh v-model="reloading"
                        @refresh="refreshGetList">
        <!-- <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="getList"> -->
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>标题</th>
              <th>工序</th>
              <th>单价</th>
              <th>数量</th>
              <th>总价</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData"
                :key="index">
              <td>{{index+1}}</td>
              <td>{{item.title}}</td>
              <td>{{1}}x{{1}}</td>
              <td>{{1}}</td>
              <td>{{1}}</td>
              <td>{{item.totalPrice.value||'0'}}</td>
            </tr>
          </tbody>
        </table>
        <!-- </van-list> -->
      </van-pull-refresh>
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
  name: 'WechatPushOperation',
  data() {
    return {
      searchParams: {
        // pageNo: 1,
        // pageSize: 20,
        statisticsData: this.$route.query.statisticsData || this.$utils.getToday(),
        employeeId: this.$route.query.employeeId || 1
      },
      tableData: [],
      loading: false,
      finished: false,
      reloading: false,
      sumPrice: 0
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
      // this.searchParams.pageNo = 1
      try {
        const res = await this.$http({
          method: 'post',
          url: h5_performanceStatistics_mechanicStatistics,
          data: this.searchParams
        })
        this.reloading = false
        if (!res.success) {
          return Toast(res.msg)
        }
        // res.model && res.model.forEach((item, idx) => {
        //   item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
        // })
        this.tableData = res.model || []
        // this.searchParams.pageNo++
      } catch (error) {
        this.reloading = false
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
    // async getList() {
    //   const toast = Toast.loading({
    //     duration: 0, // 持续展示 toast
    //     forbidClick: true,
    //     message: '加载中'
    //   })
    //   try {

    //     const res = await this.$http({
    //       method: 'post',
    //       url: h5_performanceStatistics_mechanicStatistics,
    //       data: this.searchParams
    //     })
    //     toast.clear()
    //     if (!res.success) {
    //       return Toast(res.msg)
    //     }
    //     res.model.data && res.model.data.forEach((item, idx) => {
    //       item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
    //     })
    //     this.tableData = [...this.tableData, ...res.model.data]
    //     this.searchParams.pageNo++
    //     this.loading = false
    //     this.finished = res.model.lastPage
    //   } catch (error) {
    //     toast.clear()
    //     console.log(error)
    //     throw error
    //   }
    // }
  },
  created() {
    this.refreshGetList()
    this.getSum()
  }
}
</script>

<style scoped lang="less">
.wechatPushOperation {
  .head {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .month {
      font-size: 15px;
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
      height: calc(100vh - 95px);
    }
  }
}
</style>