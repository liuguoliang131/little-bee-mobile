<!--
 * @Date: 2022-04-29 13:51:09
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-09 14:58:36
 * @FilePath: \little-bee-mobile\src\views\operation\detail.vue
 * @Description: 添加修改工序对账
-->
<template>
  <div class="operationEdit">
    <div class="search">
      <span class="date">
        <date-screen v-model="searchParams.date"
                     @change="dateChange"></date-screen>
      </span>
      <div class="input">
        <img src="../../assets/search.png"
             alt="">
        <input v-model="searchParams.keywords"
               @keyup.enter="handleSearch"
               type="text"
               name=""
               placeholder="请输入姓名"
               id="">
        <van-button color="#CB9400"
                    type="info"
                    size="small"
                    @click="handleSearch">搜索</van-button>
      </div>

    </div>
    <div class="views">
      <div class="views-left">
        <div class="title">
          姓名
        </div>
        <div class="scroll-list">
          <div :class="['staff-item', item.employeeId===activeStaff.employeeId?'active':'']"
               v-for="item in staffList"
               :key="item.employeeId"
               @click="handleActiveStaff(item)">
            <div :class="['yellow-line']"></div>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="views-right"
           v-if="activeTask">
        <!-- <van-tabs v-model="active"
                  color="#CB9400">
          <van-tab v-for="tabItem in tabs"
                   :title="tabItem.sortTitle"
                   :key="tabItem.id"> -->
        <div class="tab-pane">
          <div class="scroll-table">
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>名称</th>
                  <th>已完成</th>
                  <th>数量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in activeTask.list"
                    :key="item.id">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.finishCount||0}}/{{item.count||0}}</td>
                  <td>{{item.countField}}</td>
                </tr>
              </tbody>
            </table>
            <footer></footer>
          </div>
        </div>
        <!-- </van-tab>
        </van-tabs> -->
        <div class="sum-count">
          <div class="chengpin">
            今日成品数量：{{activeTask.todayCount}}
            &nbsp;{{activeTask.shareCount||'0'}}/{{activeTask.count||'0'}}
          </div>
          <div class="btns">
            <button @click="$router.go(-1)">返回</button>
            <!-- <button :disabled="JSON.stringify(activeStaff)==='{}'"
                    @click="handleSubmit">保存</button> -->
          </div>
        </div>
      </div>
      <div class="views-right"
           v-else>

      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Toast
} from 'vant'
import DateScreen from '@/components/dateScreen/index'
import axios from 'axios'
import { host, h5_process_createBilling, h5_employee_findPage, h5_job_findPage, h5_job_findById, h5_process_billingDetails, h5_process_findPage } from '@/http/api'
export default {
  name: 'OperationDetail',
  components: {
    VanButton: Button,
    DateScreen
  },
  data() {
    return {
      searchParams: {
        date: this.$utils.getToday(),
        keywords: '',
        keywordFields: 'name'
      },
      activeTask: null,
      staffList: [],
      tabs: [],
      activeStaff: {}
    }
  },
  methods: {
    // 时间筛选
    dateChange() {
      this.getTaskList()
    },
    handleActiveStaff(item) {
      this.activeStaff = item
      this.echoData()
    },
    async handleSubmit() {
      try {
        if (JSON.stringify(this.activeStaff) === '{}') {
          return Toast('请选择员工')
        }
        if (!this.activeTask) {
          return Toast('请选择任务,无任务不可提交保存')
        }
        const activeTaskItem = this.activeTask
        if (!activeTaskItem.list.length) {
          return Toast('该任务下没有工序,不可提交保存')
        }
        if (!activeTaskItem.todayCount) {
          return Toast('今日完成成品数量不能为空')
        }
        if (activeTaskItem.count - activeTaskItem.shareCount < activeTaskItem.todayCount) {
          return Toast(`今日完成成品数量最大为${activeTaskItem.count - activeTaskItem.shareCount}`)
        } else if (activeTaskItem.count - activeTaskItem.shareCount === 0) {
          return Toast(`今日可完成成品数量为0`)
        }
        for (let i = 0; i < activeTaskItem.list.length; i++) {
          const item = activeTaskItem.list[i]
          if (!item.countField || item.countField == 0) {
            return Toast(`工序${item.name}数量不能为空`)
          }
          if (item.count - item.finishCount < item.countField) {
            return Toast(`工序${item.name}最大数量为${item.count - item.finishCount}`)
          }
        }
        const employeeBillingList = []
        activeTaskItem.list.forEach(item => {
          employeeBillingList.push({
            jobId: activeTaskItem.id,
            jobName: activeTaskItem.title,
            processId: item.id,
            processName: item.name,
            count: item.countField,
            finishedProductNum: activeTaskItem.todayCount,
            unitPrice: item.unitPrice.value || 0
          })
        })
        const employeeJobBillingList = [{
          jobId: activeTaskItem.id,
          finishedProductNum: activeTaskItem.todayCount,
          employeeBillingList
        }]
        let params = {
          billData: this.searchParams.date,
          // companyId: this.activeStaff.companyId,
          employeeId: this.activeStaff.employeeId,
          // finishedProductCount: activeTaskItem.todayCount,
          name: activeTaskItem.title || '',
          employeeJobBillingList
        }

        const toast = Toast.loading({
          message: '加载中',
          forbidClick: true,
        })

        const res = await this.$http.post(h5_process_createBilling, params)
        toast.clear()
        if (!res.success) {
          return Toast(res.msg)
        }
        Toast('创建成功')
        this.$router.go(-1)
      } catch (error) {
        console.log(error)
        throw error
      }
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
        let staffList = res.model.data || []
        // let theStaff = staffList.find(item => {
        //   return item.employeeId === Number(this.$route.query.employeeId)
        // })
        // this.staffList = [theStaff]
        this.staffList = staffList
        this.activeStaff = {}
        // if (res.model.data.length) {
        //   this.activeStaff = this.staffList.find(item => {
        //     return item.employeeId === Number(this.$route.query.employeeId)
        //   }) || res.model.data[0]


        //   this.echoData()
        // }
        if (staffList.length) {
          this.activeStaff = staffList[0]
        }
        this.echoData()
      } catch (error) {
        console.log(error)
      }
    },
    // 获取右侧tabs
    async getTaskList() {
      try {
        const toast = Toast.loading({
          message: '加载中',
          forbidClick: true,
        })
        let params = {
          jobStatus: 'START'
        }
        const res = await this.$http.post(h5_job_findPage, params)
        if (!res.success) {
          return Toast(res.msg)
        }
        console.log('tab', res)
        let tabs = res.model.data || []
        if (tabs.length === 0) {
          return Toast('没有找到已开始的任务')
        }
        // 只需要对应的任务 其他的不显示
        const theTask = tabs.find(item => {
          return Number(this.$route.query.jobId) === item.id
        })
        // 获取所有今天的工序  把已完成和总数量回显到当前所有任务列表上
        const res1 = await axios({
          method: 'post',
          url: host + h5_process_findPage,
          data: {
            pageNo: 1,
            pageSize: 999999,
            companyId: this.$store.state.user.userInfo.id || this.$store.state.user.userInfo.companyId,
            billData: this.searchParams.date
          }
        })
        if (!res1.data.success) {
          return Toast(res1.data.msg)
        }
        const todayOperationList = res1.data.model.data || []
        theTask.todayCount = 0
        theTask.list = []
        this.getTaskDetail(theTask, toast)
        todayOperationList.forEach(item1 => {
          if (theTask.id === item1.jobId) {
            theTask.shareCount = item1.finishedNum
            theTask.count = item1.count
          }
        })
        this.activeTask = theTask
        // tabs.forEach((item, index) => {
        //   item.todayCount = 0 //今日完成成品数 输入框绑定的值
        //   item.list = []
        //   this.getTaskDetail(item, i, toast)
        // })
        // 根据路由传值显示任务
        // if(this.$route.query.jobId) {
        //   this.active = this.tabs.findIndex(item=>{
        //     return Number(this.$route.query.jobId) === item.id
        //   })
        // }

      } catch (error) {
        console.log(error)
      }
    },
    // 获取任务详情
    async getTaskDetail(item, toast) {
      const params = {
        id: item.id
      }
      const res = await this.$http({
        method: 'get',
        url: h5_job_findById,
        params
      })
      if (!res.success) {
        return Toast(res.msg)
      }
      const list = res.model ? res.model.jobDetailProcessResponseList : []
      list.forEach(item => {
        item.countField = 0
      })
      item.list = list
      toast.clear()
      this.getStaffList()
    },
    // 选择员工时调用 回显
    async echoData() {

      const params = {
        employeeId: this.activeStaff.employeeId,
        billData: this.searchParams.date
      }
      const res = await this.$http.post(h5_process_billingDetails, params)
      console.log('billingJobs', res.model.billingJobs)
      const activeTask = this.activeTask
      const activeItem = res.model.billingJobs.find(item => {
        return item.id === activeTask.id
      }) //筛选出当前选中任务
      // 先重置要显示的属性

      console.log('activeItem', activeItem)
      activeTask.count = activeItem.count || 0
      activeTask.todayCount = 0
      activeTask.list.forEach(item => {
        item.finishCount = 0
        item.countField = 0 //输入框的数量
        item.count = 0
      })
      // 回显成品数量
      res.model.employeeBillingJobs.forEach(item => {
        if (item.jobId === activeTask.id) {
          activeTask.todayCount = item.finishedProductNum
        }
      })
      activeItem.billingProcessList.forEach(item => {
        activeTask.list.forEach(item1 => {
          if (item.id === item1.id) {
            item1.finishCount = item.finishCount
            item1.countField = 0 //输入框的数量
            item1.count = item.count
          }
        })
      })
      activeItem.employeeBillingProcessList.forEach(item => {
        activeTask.list.forEach(item1 => {
          if (item.processId === item1.id) {
            item1.countField = item.count //输入框的数量
          }
        })
      })

    },
    handleSearch() {
      this.getStaffList()
    },
    // 获取工序记账列表
    async getOperationList() {
      const res = await axios({
        method: 'post',
        url: host + h5_process_findPage,
        data: {
          pageNo: 1,
          pageSize: 999999,
          companyId: this.$store.state.user.userInfo.id || this.$store.state.user.userInfo.companyId,
          billData: this.searchParams.date
        }
      })
      if (!res.data.success) {
        return Toast(res.data.msg)
      }
      this.tableData = res.data.model.data || []
    }
  },
  created() {
    document.title = this.$route.query.jobName + '记账'
    if (this.$route.query.billData) {
      this.searchParams.date = this.$route.query.billData
    }
    // this.getOperationList()
    this.getTaskList()
  }
}
</script>

<style scoped lang="less">
.operationEdit {
  background-color: #ffff;
  .search {
    padding: 15px 15px 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    .date {
      flex: 1;
      font-size: 12px;
      .date-screen {
        width: 130px;
      }
    }
    .input {
      width: 205px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        position: absolute;
        top: 9px;
        left: 10px;
        width: 13px;
        height: 13px;
      }
      input {
        width: 150px;
        height: 32px;
        border: 1px solid #bbbbbb;
        border-radius: 3px;
        margin-right: 10px;
        padding: 0 10px 0 29px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
    }
  }
  .views {
    height: calc(100vh - 62px);
    background-color: #ffff;
    padding: 10px 15px 0 15px;
    display: flex;
    .views-left {
      background-color: #f7f7f7;
      width: 100px;
      height: 100%;
      position: relative;
      left: -15px;
      padding: 15px 0;
      .title {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-bottom: 15px;
        padding-left: 15px;
      }
      .scroll-list {
        height: calc(100% - 36px);
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
      height: calc(100%);
      // padding: 15px 0;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative;
      .sum-count {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        .chengpin {
          padding: 15px 0;
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btns {
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            color: #ffff;
            background-color: #cb9400;
            border-radius: 5px;
            border: 1px solid #cb9400;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            width: 115px;
            height: 40px;
            &:active {
              background-color: rgb(189, 141, 11);
            }
          }
          button:nth-child(1) {
            margin-right: 12px;
            color: #cb9400;
            background-color: #ffff;
            &:active {
              background-color: rgba(0, 0, 0, 0.05);
            }
          }
        }
      }
      .tab-pane {
        height: calc(100% - 110px);
        overflow-y: hidden;
        overflow-x: hidden;
        .scroll-table {
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          table {
            margin: 0;
            width: 100%;
            input {
              width: 35px;
              height: 20px;
              text-align: center;
              border: 1px solid #bbbbbb;
              border-radius: 3px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #333333;
            }
          }
          footer {
            height: 200px;
          }
        }

        .fixed-button {
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
          bottom: 0;
          left: 0;
          .van-button {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>
