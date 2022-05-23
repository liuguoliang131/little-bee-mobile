<!--
 * @Date: 2022-04-29 16:11:05
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-23 17:50:05
 * @FilePath: \little-bee-mobile\src\views\staff\index.vue
 * @Description: 员工列表
-->
<template>
  <div class="staff">
    <bread></bread>
    <div class="top-fixed">员工数量: {{sumRow||'0'}}/{{shipHistory.userCount||'0'}}</div>
    <div class="search">
      <div class="left">
        <input type="text"
               placeholder="姓名"
               v-model="searchParams.keywords">
        <van-button color="#CB9400"
                    type="info"
                    size="small"
                    @click="handleSearch">筛选</van-button>
      </div>
      <div class="right">
        <van-icon name="bar-chart-o"
                  color="#CB9400"
                  @click="$router.push('/staffStatistics')" />
        <van-icon name="plus"
                  color="#CB9400"
                  @click="$router.push('/staffAdd')" />
      </div>
    </div>
    <div class="views">
      <van-pull-refresh v-model="reloading"
                        @refresh="handleSearch">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="getList">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>
                  <select class="disabledStatus" name="" id="" v-model="searchParams.disabledStatus" @change="handleSearch">
                    <option :value="false">在职</option>
                    <option :value="true">离职</option>
                  </select>
                </th>
                <th>操作</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item,index) in tableData"
                  :key="index">
                <td>{{item.index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.phone}}</td>
                <!-- <td>{{$utils.formatTime(item.entryTime)}}</td> -->
                <td>{{item.disabledStatus?'离职':'在职'}}</td>
                <td>
                  <van-icon name="ellipsis"
                            @click="handleGoDetail(item)" />
                </td>
              </tr>
            </tbody>

          </table>
        </van-list>
      </van-pull-refresh>
      <!-- <van-pagination class="fixed-page"
                      v-model="searchParams.pageNo"
                      :items-per-page="searchParams.pageSize"
                      :total-items="tableData.sumRow"
                      mode="simple"
                      @change="getList" /> -->
      <!-- <footer></footer> -->
    </div>
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item name="1"
                       icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item name="2"
                       icon="friends-o"
                       to="/staffList">员工管理</van-tabbar-item>
      <van-tabbar-item name="3"
                       icon="contact"
                       to="/my">我的</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_employee_findPage, companyMembershipHistory_findById } from '@/http/api'
import {
  Button,
  Icon,
  PullRefresh,
  List,
  // Tabbar,
  // TabbarItem,
  // Pagination,
  Toast
} from 'vant'
export default {
  name: 'StaffList',
  data() {
    return {
      active: '2',
      searchParams: {
        keywords: '',
        pageNo: 1,
        pageSize: 20,
        disabledStatus: false
      },
      tableData: [],
      sumRow: 0,
      loading: false,
      finished: false,
      reloading: false,
      shipHistory: {
        userCount: 0
      }
    }
  },
  components: {
    Bread,
    VanButton: Button,
    VanIcon: Icon,
    VanPullRefresh: PullRefresh,
    VanList: List
  },
  methods: {
    handleGoDetail(item) {
      this.$store.commit('staff/set_item', {
        disabledStatus: item.disabledStatus,
        entryTime: item.entryTime,
        name: item.name,
        phone: item.phone,
        salaryAmount: item.salaryAmount ? item.salaryAmount.value : 0,
        salaryType: item.salaryType,
        sex: item.sex,
        remark: item.remark || '',
        appId: item.appId || '',
        openId: item.openId || '',
        employeeId: item.employeeId,
        companyId: item.companyId
      })
      this.$router.push({
        path: '/staffDetail',
        query: {
          id: item.employeeId
        }
      })
    },
    handleSearch() {
      this.searchParams.pageNo = 1
      this.tableData = []
      this.refreshGetList()
    },
    async getList() {
      const params = { ...this.searchParams }
      const res = await this.$http.post(h5_employee_findPage, params)
      if (!res.success) {
        return Toast(res.msg)
      }
      this.sumRow = res.model.sumRow || 0
      res.model.data && res.model.data.forEach((item, idx) => {
        item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
      })
      this.tableData = [...this.tableData, ...res.model.data]
      this.searchParams.pageNo++
      this.loading = false
      this.finished = res.model.lastPage
    },
    async refreshGetList() {
      const params = { ...this.searchParams }
      const res = await this.$http.post(h5_employee_findPage, params)
      if (!res.success) {
        return Toast(res.msg)
      }
      this.sumRow = res.model.sumRow || 0
      res.model.data && res.model.data.forEach((item, idx) => {
        item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
      })
      this.tableData = [...this.tableData, ...res.model.data]
      this.searchParams.pageNo++
      this.reloading = false
    },
    async getShipHistory() {
      const res = await this.$http({
        method: 'get',
        url: companyMembershipHistory_findById,
        params: {
          id: this.$store.state.user.userInfo.id || this.$store.state.user.userInfo.companyId
        }
      })
      if (res.success) {
        this.shipHistory = res.model|| { userCount: 0 }
      }
    }
  },
  created() {
    this.getShipHistory()
  }
}
</script>

<style scoped lang="less">
.staff {
  position: relative;
  .top-fixed {
    position: fixed;
    height: 36px;
    line-height: 36px;
    top: 0;
    right: 54.5px;
    z-index: 10;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    .left {
      display: flex;
      align-items: center;
      input {
        height: 30px;
        width: 185px;
        border: 1px solid #b4b4b4;
        border-radius: 3px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-right: 10px;
        padding: 0 15px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .van-icon-bar-chart-o {
        margin-right: 15px;
      }
    }
  }
  .views {
    height: calc(100vh - 100px);
    position: relative;
    .fixed-page {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
    }
    footer {
      height: 200px;
    }
  }
  .van-pull-refresh {
    height: calc(100vh - 100px);
  }
  .disabledStatus {
    border: none;
    background-color: #F0F0F0;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 700;
    color: #666666;
    option {
    
    }
    option:hover {
      background-color: #fff;
      color: #cb9400;
    }
  }
}
</style>