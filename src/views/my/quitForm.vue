<!--
 * @Date: 2022-05-05 17:10:59
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-09 19:50:07
 * @FilePath: \little-bee-mobile\src\views\my\quitForm.vue
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
            <th>姓名</th>
            <th>手机号</th>
            <th>状态</th>
            <th>入职时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.data"
              :key="index">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>离职</td>
            <td>{{$utils.formatTime(item.entryTime)}}</td>
            <td>
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
import { h5_employee_findPage } from '@/http/api'
import {
  Search,
  Toast,
  Icon,
  Pagination,
  Dialog
} from 'vant'
export default {
  name: 'history',
  data() {
    return {
      searchParams: {
        pageNo: 1,
        pageSize: 20,
        keywords: '',
        disabledStatus: true
      },
      tableData: {
        items: [
          {},
          {}
        ],
        sumRow: 0
      }
    }
  },
  components: {
    VanSearch: Search,
    VanIcon: Icon,
    VanPagination: Pagination,
    VanDialog: Dialog,
    Bread
  },
  methods: {
    async getList() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      try {

        const res = await this.$http({
          method: 'post',
          url: h5_employee_findPage,
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
        this.tableData = res.model
      } catch (error) {
        toast.clear()
        this.reloading = false
        console.log(error)
        throw error
      }
    },

    handleShowMore(item) {
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
      this.getList()
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