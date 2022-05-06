<!--
 * @Date: 2022-04-26 15:23:46
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-06 19:15:12
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
        <input type="date"
               name=""
               id=""
               v-model="date"
               @change="handleSearch">
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
                  <van-icon name="edit" @click="handleEdit(item)" />
                  <van-icon name="ellipsis" @click="handleView(item)" />
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
  Pagination
} from 'vant'
import Bread from '@/components/bread/index'
import { h5_process_findPage } from '@/http/api'
export default {
  name: 'Operation',
  data() {
    return {
      searchParams: {
        pageNo: 1,
        pageSize: 20,
        startTime:'',
        endTime:''
      },
      date: '',
      tableData: {
        sumRow: 0,
        data: [

        ]
      },
      reloading:false
    }
  },
  components: {
    VanPullRefresh: PullRefresh,
    VanIcon: Icon,
    VanPagination: Pagination,
    Bread
  },
  methods: {
    // 新增记账
    handleAddBill() {
      this.$router.push({
        path:'/operationEdit',
        query: {
          
        }
      })
    },
    // 编辑
    handleEdit(item) {
      this.$router.push({
        path:'/operationEdit',
        query: {
          employeeId: item.employeeId
        }
      })
    },
    // 详情
    handleView(item) {
      this.$router.push({
        path:'/operationDetail',
        query: {
          employeeId: item.employeeId
        }
      })
    },
    // 搜索
    handleSearch() {
      if(this.date) {
        this.searchParams.startTime = this.date + ' 00:00:00'
        this.searchParams.endTime = this.date + ' 23:59:59'
      }else {
        this.searchParams.startTime = ''
        this.searchParams.endTime = ''
      }
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
    height: calc(100vh - 36px);
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
