<!--
 * @Date: 2022-05-05 17:10:59
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-10 19:12:17
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
          <tr v-for="(item,index) in tableData.data" :key="index">
            <td>{{index}}</td>
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
      <footer></footer>
    </div>
    <van-pagination v-model="searchParams.pageNo"
                    :items-per-page="searchParams.pageSize"
                    :total-items="tableData.sumRow"
                    @change="getList"
                    mode="simple" />
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_jobShare_findPage } from '@/http/api'
import {
  Search,
  Toast,
  Icon,
  Pagination,
  Dialog
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
      tableData:{
        items:[],
        sumRow:0
      }
    }
  },
  components: {
    VanSearch: Search,
    VanIcon: Icon,
    VanPagination: Pagination,
    Bread
  },
  methods: {
    handleSearch() {
      this.searchParams.pageNo = 1
      this.getList()
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
        this.tableData = res.model
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
    this.getList()
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
  }
  .van-pagination {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  footer {
    height: 100px;
  }
}
</style>