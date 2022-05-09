<!--
 * @Date: 2022-05-05 17:10:59
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-09 19:40:11
 * @FilePath: \little-bee-mobile\src\views\my\history.vue
 * @Description: 历史纪录
-->
<template>
  <div class="history">
    <bread></bread>
    <div class="search">
      <van-search v-model="searchParams.keywords"
                  placeholder="请输入标题"
                  @search="handleSearch" />
    </div>
    <div class="views">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>标题</th>
            <th>创建时间</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.data" :key="index">
            <td>{{index}}</td>
            <td>{{item.sortTitle}}</td>
            <td>{{$utils.formatTime(item.createTime)}}</td>
            <td>{{item.count}}</td>
            <td>
              <van-icon class="del" name="delete-o"
                      @click="handleShowDelDialog(item)" />
            <van-icon name="more-o"
                      @click="handleShowMore(item)" />
            </td>
          </tr>
        </tbody>
      </table>
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
import { h5_job_findPage,job_deleteById } from '@/http/api'
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
        keywords:'',
        jobStatus:'Finish'
      },
      tableData:{
        data:[],
        sumRow:0
      }
    }
  },
  components: {
    VanSearch: Search,
    VanIcon: Icon,
    VanPagination: Pagination,
    VanDialog:Dialog,
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
          url: h5_job_findPage,
          data: this.searchParams
        })
        toast.clear()
        if (!res.success) {
          return Toast(res.msg)
        }
        res.model.data && res.model.data.forEach((item, idx) => {
          item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + idx + 1
        })
        this.tableData = res.model
      } catch (error) {
        toast.clear()
        console.log(error)
        throw error
      }
    },
    // 删除弹框打开
    handleShowDelDialog(item) {
      Dialog.confirm({
        message: '确定删除此任务?',
        confirmButtonColor: '#CB9400'
      }).then(async () => {
        // on confirm
        const res = await this.$http({
          method: 'get',
          url: job_deleteById,
          params: {
            id: item.id
          }
        })
        if (!res.success) {
          return Toast(res.msg)
        }
        this.tableData.data.splice((() => {
          let idx = null
          this.tableData.forEach((item1, index1) => {
            if (item1.id === item.id) {
              idx = index1
            }
          })
          return idx
        })(), 1)
        Toast('删除成功')
      }).catch(() => {
        // on cancel
      })
    },
    // 进入详情页
    handleShowMore(item) {
      this.$router.push({
        path: '/detail',
        query: {
          id: item.id
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
}
</style>