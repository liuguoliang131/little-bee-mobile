<!--
 * @Date: 2022-04-26 15:23:46
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-17 17:55:13
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
        <date-screen v-model="searchParams.billData" @change="dateChange"></date-screen>
      </div>
      <div class="list">
        <van-pull-refresh v-model="reloading"
                          @refresh="handleRefresh">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>任务标题</th>
                <th>成品</th>
                <th>时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr class="item"
                  v-for="(item,index) in tableData.data"
                  :key="index">
                <td>{{(searchParams.pageNo-1)*searchParams.pageSize+index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.finishedProductCount}}</td>
                <td>{{item.billData}}</td>
                <td>
                  <van-icon name="edit"
                            @click="handleEdit(item)" />
                  <van-icon name="ellipsis"
                            @click="handleView(item)" />
                </td>
              </tr>
            </tbody>
          </table>
        </van-pull-refresh>
      </div>
    </div>
    <footer></footer>
    <van-pagination v-model="searchParams.pageNo"
                    :items-per-page="searchParams.pageSize"
                    :total-items="tableData.sumRow"
                    mode="simple"
                    @change="getList" />
    <van-tabbar v-model="active" active-color="#CB9400">
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
  Search,
  List,
  Toast,
  PullRefresh,
  Icon,
  Dialog,
  Pagination,
  Tabbar,
  TabbarItem,
} from 'vant'
import Bread from '@/components/bread/index'
import DateScreen from '@/components/dateScreen/index'
import { h5_process_findPage } from '@/http/api'
export default {
  name: 'Operation',
  data() {
    return {
      active:'2',
      searchParams: {
        pageNo: 1,
        pageSize: 20,
        billData: this.$utils.getToday()
      },
      tableData: {
        sumRow: 0,
        data: [

        ]
      },
      reloading: false
    }
  },
  components: {
    VanPullRefresh: PullRefresh,
    VanIcon: Icon,
    VanPagination: Pagination,
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
          employeeId: item.employeeId
        }
      })
    },
    // 详情
    handleView(item) {
      this.$router.push({
        path: '/operationDetail',
        query: {
          employeeId: item.employeeId
        }
      })
    },
    // 时间筛选
    dateChange() {
      this.searchParams.pageNo = 1
      this.getList()
    },
    // 搜索
    handleSearch() {
      this.searchParams.pageNo = 1
      this.getList()
    },
    handleRefresh() {
      this.searchParams.pageNo = 1
      this.getList()
    },
    async getList() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await this.$http({
        method: 'post',
        url: h5_process_findPage,
        data: this.searchParams
      })
      this.reloading = false
      toast.clear()
      if (!res.success) {
        return Toast(res.msg)
      }
      this.tableData = res.model
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="less">
.operation {
  width: 100%;
  .views {
    width: 100%;
    height: calc( 100vh - 36px - 50px );
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
