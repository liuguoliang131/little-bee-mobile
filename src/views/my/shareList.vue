<!--
 * @Date: 2022-05-05 17:10:59
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-19 14:54:45
 * @FilePath: \little-bee-mobile\src\views\my\shareList.vue
 * @Description: 分享列表
-->
<template>
  <div class="history">
    <bread></bread>
    <div class="search">
      <van-search v-model="searchParams.keywords"
                  placeholder="请输入"
                  @search="handleSearch" />
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
            <th>标题</th>
            <th>分享时间</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td>{{item.index}}</td>
            <td>{{item.sortTitle}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.count}}</td>
            <td>
            <van-icon name="more-o"
                      @click="handleShowMore(item)" />
            </td>
          </tr>
        </tbody>
      </table>
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_jobShare_findPage } from '@/http/api'
import {
  Search,
  Toast,
  Icon,
  PullRefresh,
  List,
} from 'vant'
export default {
  name:'history',
  data() {
    return {
      searchParams: {
        pageNo:1,
        pageSize:20,
        keywords:''
      },
      tableData:[],
      loading: false,
      finished: false,
      reloading: false
    }
  },
  components: {
    VanSearch: Search,
    VanIcon: Icon,
    VanPullRefresh: PullRefresh,
    VanList: List,
    Bread
  },
  methods: {
    handleSearch() {
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
      try {

        const res = await this.$http({
          method: 'post',
          url: h5_jobShare_findPage,
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
        this.searchParams.pageNo++
      } catch (error) {
        toast.clear()
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
          url: h5_jobShare_findPage,
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
        this.searchParams.pageNo++
        this.loading = false
        this.finished = res.model.lastPage
      } catch (error) {
        toast.clear()
        console.log(error)
        throw error
      }
    },
    handleShowMore(item) {
      this.$router.push({
        path:'/shareDetail',
        query: {
          id:item.id
        }
      })
    }
  },
  created() {
    // this.getList()
  }
}
</script>

<style scoped lang="less">
.history {
  .views {
    height: 536px;
    .del {
      margin-right: 10px;
    }
    .van-pull-refresh {
      height: calc(100% - 90px);
    }
  }
}
</style>