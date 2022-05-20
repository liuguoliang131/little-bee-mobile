<!--
 * @Date: 2022-04-29 13:51:09
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-20 09:55:26
 * @FilePath: \little-bee-mobile\src\views\operation\detail.vue
 * @Description: 添加修改工序对账
-->
<template>
  <div class="operationEdit">
    <bread></bread>
    <div class="search">
      <span class="date">{{searchParams.date}}</span>
      <div class="input">
        <input v-model="searchParams.keywordFields"
        placeholder="请输入员工姓名"
               type="text"
               name=""
               id="">
      </div>
      <van-button color="#CB9400"
                  type="info"
                  size="small"
                  @click="handleSearch">搜索</van-button>
    </div>
    <div class="views">
      <div class="views-left">
        <div class="title">
          员工
        </div>
        <div class="scroll-list">
          <div :class="['staff-item',item.employeeId===activeStaff.employeeId?'active':'']"
               v-for="item in staffList"
               :key="item.employeeId"
               @click="handleActiveStaff(item)">{{item.name}}</div>
        </div>
      </div>
      <div class="views-right"
           v-if="list.length">
        <div v-for="(item,index) in list"
             :key="index"
             class="list-item">
          {{item.sortTitle}}&nbsp;{{item.processName}}x{{item.processFinishCount}}
        </div>
      </div>
      <div class="views-right"
           v-else>
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Toast
} from 'vant'
import Bread from '@/components/bread/index.vue'
import { h5_employee_findPage, h5_process_userBillingPageDetails } from '@/http/api'
export default {
  name: 'OperationDetail',
  components: {
    VanButton: Button,
    Bread
  },
  data() {
    return {
      searchParams: {
        date: this.$utils.getToday(),
        keywordFields: ''
      },
      staffList: [],
      activeStaff: {},
      active: null,
      list: []
    }
  },
  methods: {
    handleActiveStaff(item) {
      this.activeStaff = item
      this.getList()
    },
    // 获取左侧员工列表
    async getStaffList() {
      try {
        let params = {
          ...this.searchParams
        }
        const res = await this.$http.post(h5_employee_findPage, params)
        if (!res.success) {
          return Toast(res.msg)
        }
        this.staffList = res.model.data || []
        this.activeStaff = {}
      } catch (error) {
        console.log(error)
      }
    },
    async getList() {
      const data = {
        employeeId: this.activeStaff.employeeId,
        billData: this.searchParams.date,
        pageSize: 999999,
        pageNo: 1
      }
      const res = await this.$http({
        method: 'post',
        url: h5_process_userBillingPageDetails,
        data
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      this.list = res.model || []

    },
    handleSearch() {
      this.getStaffList()
    },
  },
  created() {
    this.getStaffList()
  }
}
</script>

<style scoped lang="less">
.operationEdit {
  background-color: #f7f7f7;
  .active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .search {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    .date {
      flex: 1;
    }
    .input {
      input {
        width: 185px;
        height: 30px;
        border: 1px solid #bbbbbb;
        border-radius: 3px;
        margin-right: 10px;
        padding: 0 10px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
  }
  .views {
    height: calc(100vh - 88px);
    background-color: #f7f7f7;
    padding: 10px 15px;
    display: flex;
    .views-left {
      width: 100px;
      margin-right: 10px;
      border-radius: 5px;
      background: #ffffff;
      height: calc(100vh - 110px);
      padding: 15px;
      .title {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-bottom: 15px;
      }
      .scroll-list {
        height: calc(100vh - 170px);
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 20.5px;
        .staff-item {
          padding: 10px 0;
        }
      }
    }
    .views-right {
      flex: 1;
      border-radius: 5px;
      background: #ffffff;
      height: calc(100vh - 110px);
      padding: 15px;
      overflow-y: scroll;
      overflow-x: hidden;
      .list-item {
        line-height: 30px;
      }
    }
  }
}
</style>
