<!--
 * @Date: 2022-05-26 15:42:26
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-08 17:55:46
 * @FilePath: \little-bee-mobile\src\views\wechatPush\operationAll.vue
 * @Description: 点击微信公众号员工登录后的页面
-->
<template>
  <div class="wechatPushOperation">
    <div class="head">
      <div class="backbtn">
        <van-icon name="arrow-left" color="#ffff"
                  @click="$router.go(-1)" />
      </div>
      <div class="zhj">总合计</div>
      <div class="number">
        <span>￥</span>
        <span>{{data.totalPrice.value.toFixed(2)}}</span>
      </div>
    </div>
    <div class="head1">
      <date-screen v-model="searchParams.statisticsData"
                   @change="dateChange"></date-screen>
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
              <th>数量</th>
              <th>单价</th>
              <th>合价</th>
              <th>企业名称</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData"
                :key="index">
              <td>{{index+1}}</td>
              <td>{{item.jobName}}</td>
              <td>{{item.processName}}</td>
              <td>{{item.count}}</td>
              <td>{{item.unitPrice}}</td>
              <td>{{(item.unitPrice*item.count)||'0'}}</td>
              <td>{{$store.state.user.userInfo.name||$store.state.user.userInfo.companyName}}</td>
            </tr>
          </tbody>
        </table>
        <!-- </van-list> -->
      </van-pull-refresh>
    </div>
    <div class="back">
      <van-button>123</van-button>
    </div>
  </div>
</template>

<script>
import DateScreen from '@/components/dateScreen/index'
import axios from 'axios'
import { host, h5_performanceStatistics_mechanicStatistics } from '@/http/api'
import {
  Button,
  Icon,
  Toast,
  PullRefresh,
} from 'vant'
export default {
  name: 'WechatPushOperation',
  data() {
    return {
      data: {
        name: "",
        finishedProductCount: null,
        billData: "",
        processContent: '[]',
        totalPrice: {
          value: 0
        }
      },
      searchParams: {
        // pageNo: 1,
        // pageSize: 20,
        statisticsData: this.$route.query.statisticsData || this.$utils.getToday(),
        employeeId: this.$route.query.employeeId || ''
      },
      tableData: [],
      loading: false,
      finished: false,
      reloading: false,
      sumPrice: 0
    }
  },
  components: {
    DateScreen,
    VanPullRefresh: PullRefresh,
    VanButton: Button,
    VanIcon: Icon
  },
  methods: {
    async refreshGetList() {
      // this.searchParams.pageNo = 1
      try {
        const res = await axios({
          method: 'post',
          url: host + h5_performanceStatistics_mechanicStatistics,
          data: this.searchParams
        })
        this.reloading = false
        if (!res.data.success) {
          return Toast(res.data.msg)
        }
        // res.model && res.model.forEach((item, idx) => {
        //   item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
        // })
        let data = res.data.model || []
        let tableData = []
        if (data.length) {
          this.data = data[0]
          data.forEach(item0 => {
            JSON.parse(item0.processContent).forEach(item => {
              let employeeBillingList = item.employeeBillingList
              employeeBillingList.forEach(item1 => {
                tableData.push({
                  jobName: item1.jobName || item0.name,
                  count: item1.count || 0,
                  processName: item1.processName,
                  unitPrice: item1.unitPrice
                })
              })

            })
          })

        }
        this.tableData = tableData

        // this.searchParams.pageNo++
      } catch (error) {
        this.reloading = false
        console.log(error)
        throw error
      }
    },
    dateChange() {
      this.refreshGetList()
    }

  },
  created() {
    this.refreshGetList()
  }
}
</script>

<style scoped lang="less">
.wechatPushOperation {
  .head {
    background: #deb441;
    height: 100px;
    position: relative;
    .backbtn {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      &:active {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .zhj {
      padding-top: 22px;
      text-align: center;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff6dd;
    }
    .number {
      text-align: center;
      padding-top: 11px;
      font-size: 25px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      span:nth-child(1) {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }
  .head1 {
    display: flex;
    align-items: center;
    padding: 15px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    .month {
      margin-right: 15px;
    }
  }
  .views {
    height: calc(100vh - 149px);
    .van-pull-refresh {
      height: 100%;
    }
  }
}
</style>