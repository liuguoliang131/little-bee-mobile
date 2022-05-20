<!--
 * @Date: 2022-04-29 13:51:09
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-20 16:56:52
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
          姓名
        </div>
        <div class="scroll-list">
          <div :class="['staff-item',item.employeeId===activeStaff.employeeId?'active':'']"
               v-for="item in staffList"
               :key="item.employeeId"
               @click="handleActiveStaff(item)">
            <div :class="['yellow-line']"></div>
            <span>{{item.name}}</span>
          </div>
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
  background-color: #ffff;
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
    background-color: #ffff;
    padding: 10px 15px;
    display: flex;
    .views-left {
      background-color: #f7f7f7;
      width: 100px;
      height: calc(100vh - 97px);
      position: relative;
      left: -15px;
      padding: 15px 0;
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
        overflow-x: visible;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 20.5px;
        .staff-item {
          padding: 10px 15px;
          display: flex;
          align-items: center;
          .yellow-line {
            // position: relative;
            // left: -7px;
            height: 14px;
            width: 3px;
            background-color: #cb9400;
            margin-right: 7px;
            display: none;
          }
        }
        .active {
          background-color: #fff;
          .yellow-line {
            display: block;
          }
        }
      }
    }
    .views-right {
      flex: 1;
      background: #ffffff;
      height: calc(100vh - 97px);
      padding: 15px 0;
      overflow-y: scroll;
      overflow-x: hidden;
      .list-item {
        line-height: 30px;
      }
    }
  }
}
</style>
