<!--
 * @Date: 2022-04-26 15:23:46
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-27 17:32:30
 * @FilePath: \little-bee-mobile\src\views\operation\index.vue
 * @Description: 工序记账
-->
<template>
  <div class="operation">
    <bread @click="handleAddBill">
      <van-icon name="plus"
                color="#cb9400" />
    </bread>
    <div class="views">
      <div class="search">
        <date-screen v-model="searchParams.billData"
                     @change="dateChange"></date-screen>
      </div>
      <div class="list">
        <van-pull-refresh v-model="reloading"
                          @refresh="handleRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getList">
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>任务标题</th>
                  <th>当天数量</th>
                  <th>已完成/总数量</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr class="item"
                    v-for="(item,index) in tableData"
                    :key="index">
                  <td>{{item.index}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.theDataFinishedNum||0}}</td>
                  <td>{{item.finishedNum||0}}/{{item.count||0}}</td>
                  <td>
                    <van-icon name="edit"
                              @click="handleEdit(item)" />
                    <van-icon name="ellipsis"
                              @click="handleView(item)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <footer></footer>
    <!-- <van-pagination v-model="searchParams.pageNo"
                    :items-per-page="searchParams.pageSize"
                    :total-items="tableData.sumRow"
                    mode="simple"
                    @change="getList" /> -->
    <van-tabbar v-model="active"
                active-color="#CB9400">
      <van-tabbar-item name="1"
                       icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item name="2"
                       icon="records"
                       to="/operation">工序记账</van-tabbar-item>
      <van-tabbar-item name="3"
                       icon="contact"
                       to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  List,
  Toast,
  PullRefresh,
  Icon,
  Tabbar,
  TabbarItem,
} from 'vant'
import Bread from '@/components/bread/index'
import DateScreen from '@/components/dateScreen/index'
import axios from 'axios'
import { host, h5_process_findPage } from '@/http/api'
export default {
  name: 'Operation',
  data() {
    return {
      active: '2',
      searchParams: {
        pageNo: 1,
        pageSize: 20,
        companyId: this.$store.state.user.userInfo.id || this.$store.state.user.userInfo.companyId,
        billData: this.$utils.getToday()
      },
      tableData: [],
      loading: false,
      finished: false,
      reloading: false
    }
  },
  components: {
    VanPullRefresh: PullRefresh,
    VanList: List,
    VanIcon: Icon,
    // VanPagination: Pagination,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    Bread,
    DateScreen
  },
  methods: {
    // 新增记账
    handleAddBill() {
      this.$router.push({
        path: '/operationEdit',
        query: {

        }
      })
    },
    // 编辑
    handleEdit(item) {
      this.$router.push({
        path: '/operationEdit',
        query: {
          employeeId: item.employeeId,
          billData: item.billData
        }
      })
    },
    // 详情
    handleView(item) {
      this.$router.push({
        path: '/operationDetail',
        query: {
          employeeId: item.employeeId,
          billData: item.billData
        }
      })
    },
    // 时间筛选
    dateChange() {
      this.searchParams.pageNo = 1
      this.tableData = []
      this.refreshGetList()
    },
    // 搜索
    handleSearch() {
      this.searchParams.pageNo = 1
      this.tableData = []
      this.refreshGetList()
    },
    handleRefresh() {
      this.searchParams.pageNo = 1
      this.tableData = []
      this.refreshGetList()
    },
    async refreshGetList() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await axios({
        method: 'post',
        url: host + h5_process_findPage,
        data: this.searchParams
      })
      this.reloading = false
      toast.clear()
      if (!res.data.success) {
        return Toast(res.data.msg)
      }
      res.data.model.data && res.data.model.data.forEach((item, idx) => {
        item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
      })
      this.tableData = [...this.tableData, ...res.data.model.data]
      this.searchParams.pageNo++

    },
    async getList() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await axios({
        method: 'post',
        url: host + h5_process_findPage,
        data: this.searchParams
      })
      toast.clear()
      if (!res.data.success) {
        return Toast(res.data.msg)
      }
      res.data.model.data && res.data.model.data.forEach((item, idx) => {
        item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
      })
      this.tableData = [...this.tableData, ...res.data.model.data]
      this.searchParams.pageNo++
      this.loading = false
      this.finished = res.data.model.lastPage
    }
  },
  created() {
    // this.getList()
  }
}
</script>

<style scoped lang="less">
.operation {
  width: 100%;
  .views {
    width: 100%;
    height: calc(100vh - 36px - 50px);
    overflow-y: scroll;
    .search {
      padding: 15px;
      input {
        width: 160px;
        height: 30px;
        border: 1px solid #bbbbbb;
        border-radius: 3px;
        color: #333333;
      }
    }
    .list {
      height: calc(100% - 136px);
      overflow-y: scroll;
    }
    .van-pull-refresh {
      height: calc(100% - 136px);
    }
  }
  footer {
    height: 40px;
  }
  .van-pagination {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .van-icon-edit {
    margin-right: 15px;
  }
}
</style>
