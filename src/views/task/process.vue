<!--
 * @Date: 2022-06-06 14:16:35
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-06 15:42:15
 * @FilePath: \little-bee-mobile\src\views\task\process.vue
 * @Description: 
-->
<template>
  <div class="process">
    <bread></bread>
    <div class="views">
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
                <th>姓名</th>
                <th>任务 工序</th>
                <th>价格</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData"
                  :key="item.id">
                <td>{{item.index}}</td>
                <td>{{item.employeeName}}</td>
                <td>{{item.jobTitle}}&nbsp;{{item.processName}}</td>
                <td>{{item.processPrice.value.toFixed(2)}}</td>
                <td>{{item.count}}</td>
              </tr>
            </tbody>
          </table>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import {
  companyEmployeeProcess_findPage
} from '@/http/api'
import {
  List,
  Toast,
  PullRefresh,
  Icon
} from 'vant'
import Bread from '@/components/bread/index'
export default {
  name: 'Process',
  components: {
    VanPullRefresh: PullRefresh,
    VanList: List,
    VanIcon: Icon,
    Bread
  },
  data() {
    return {
      searchParams: {
        pageNo: 1,
        pageSize: 20,
        jobId: Number(this.$route.query.jobId),
        processId: Number(this.$route.query.id)
      },
      tableData: [],
      reloading: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getList() {
      const res = await this.$http({
        method: 'post',
        url: companyEmployeeProcess_findPage,
        data: this.searchParams
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      res.model.data && res.model.data.forEach((item, index) => {
        item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + index + 1
      })
      this.tableData = [...this.tableData, ...res.model.data]
      this.searchParams.pageNo++
      this.loading = false
      this.finished = res.model.lastPage
    },
    async handleRefresh() {
      this.tableData = []
      this.searchParams.pageNo = 1
      try {
        const res = await this.$http({
          method: 'post',
          url: companyEmployeeProcess_findPage,
          data: this.searchParams
        })
        this.reloading = false
        if (!res.success) {
          return Toast(res.msg)
        }
        res.model.data && res.model.data.forEach((item, index) => {
          item.index = (this.searchParams.pageNo - 1) * this.searchParams.pageSize + index + 1
        })
        this.tableData = res.model.data || []
      } catch (error) {
        this.reloading = false
      }

    }
  },
  created() {

  }
}
</script>

<style scoped lang="less">
.process {
  .views {
    .van-pull-refresh {
      height: calc(100vh - 36px);
    }
  }
}
</style>