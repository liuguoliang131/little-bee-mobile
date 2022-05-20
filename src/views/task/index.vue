<!--
 * @Date: 2022-03-22 09:46:05
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-20 17:57:13
 * @FilePath: \little-bee-mobile\src\views\Task\index.vue
 * @Description: 
-->
<template>
  <div class="Index">
    <!-- <bread></bread> -->
    <div class="search">
      <van-search v-model="searchParams.keywords"
                  placeholder="请输入标题"
                  @search="handleSearch" />
    </div>
    <div>
      <div class="thead">
        <span class="xuhao">序号</span>
        <span>标题</span>
        <span>日期</span>
        <span>数量</span>
        <span class="caozuo">操作</span>
      </div>
      <van-pull-refresh v-model="reloading"
                        @refresh="handleSearch">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="getList">
          <div class="item"
               @click="handleShowMore(item)"
               v-for="(item) in tableData"
               :key="item.id">
            <span class="xuhao">{{item.index}}</span>
            <span class="title">
              {{item.title}}
              <i class="zijian">自建</i>
              <!-- <i class="fenxiang">分享</i>
              <i class="wai">外</i> -->
            </span>
            <span>{{$utils.formatTimeYYMMdd(item.createTime)}}</span>
            <span>{{item.count}}</span>
            <span class="caozuo">
              <van-icon name="delete-o"
                        @click.stop="handleShowDelDialog(item)" />
            </span>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- <van-pagination v-model="searchParams.pageNo"
                    :items-per-page="searchParams.pageSize"
                    :total-items="tableData.sumRow"
                    @change="getList"
                    mode="simple" /> -->
    <div class="fixed-r">
      <!-- <div class="r-btn"
           @click="$router.push('/operation')">
        <div>工序</div>
        <div>记账</div>
      </div> -->
      <div class="r-btn"
           @click="handleCheckJobCount">
        <div>创建</div>
        <div>任务</div>
      </div>
    </div>
    <van-tabbar v-model="active"
                active-color="#CB9400">
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
  Toast,
  PullRefresh,
  Icon,
  Dialog,
  Tabbar,
  TabbarItem,
  List
} from 'vant'
// import Bread from '@/components/bread/index.vue'
import { h5_job_findPage, job_deleteById, h5_job_jobCheck } from '@/http/api.js'
export default {
  name: 'Index',
  components: {
    VanSearch: Search,
    VanPullRefresh: PullRefresh,
    VanIcon: Icon,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    VanList: List
    // Bread
  },
  data() {
    return {
      searchParams: {
        keywords: '',
        pageNo: 1,
        pageSize: 20
      },
      tableData: [],
      loading: false,
      finished: false, //是否为最后一页
      reloading: false,
      active: '1'
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.tableData = []
      this.searchParams.pageNo = 1
      this.refreshGetList()
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
        this.tableData = [...this.tableData, ...res.model.data]
        this.searchParams.pageNo++
        this.loading = false
        this.finished = res.model.lastPage
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    // 刷新页面
    async refreshGetList() {
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
        this.reloading = false
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
          method: 'post',
          url: job_deleteById,
          data: {
            id: item.id
          }
        })
        if (!res.success) {
          return Toast(res.msg)
        }
        this.tableData.splice((() => {
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
    },
    // 编辑
    handleGoDetail(item) {
      this.$router.push({
        path: '/editTask',
        query: {
          id: item.id
        }
      })
    },
    async handleCheckJobCount() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await this.$http({
        method: 'get',
        url: h5_job_jobCheck,
        params: {
          companyId: this.$store.state.user.userInfo.companyId || this.$store.state.user.userInfo.id
        }
      })
      toast.clear()
      if (res.success) {
        this.$router.push('/createTask')
      } else {
        Dialog.confirm({
          message: '任务数量为0 请尽快购买任务数量!',
          confirmButtonColor: '#CB9400',
          confirmButtonText: '立即购买'
        }).then(async () => {
          this.$router.push('/renewalMember')
        }).catch(() => {
          // on cancel
        })
      }

    }
  },
  created() {
    // this.getList()

  }
}
</script>

<style scoped lang="less">
.Index {
  height: calc(100vh - 36px);
  overflow-y: scroll;
  .thead {
    margin: 0 15px;
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    span {
      flex: 1;
      height: 36px;
      font-size: 12px;
      line-height: 36px;
      text-align: center;
    }
  }
  
  .van-pull-refresh {
    height: calc(100vh - 140px);
  }
  .item {
    margin: 0 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    span {
      flex: 1;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 49px;
    }
    
    .caozuo {
      .van-icon:nth-child(1) {
        margin-right: 10px;
      }
    }
    .title {
      // position: relative;
      color: #cb9400;
      .zijian {
        background-color: #cb9400;
        color: white;
        font-style: normal;
        font-size: 12px;
        border-radius: 0 3px 3px 3px;
        display: inline-block;
        width: 32px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        position: relative;
        top: -5px;
        // right: -27px;
      }
      .fenxiang {
        display: inline-block;
        width: 32px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        background-color: #398ebf;
        color: white;
        font-style: normal;
        font-size: 12px;
        border-radius: 0 3px 3px 3px;
        position: relative;
        top: -5px;
      }
      .wai {
        display: inline-block;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        background-color: #398ebf;
        color: white;
        font-style: normal;
        font-size: 12px;
        border-radius: 9px;
        position: relative;
        top: -5px;
      }
    }
  }
  .xuhao {
    flex: 0.5!important;
  }
  .caozuo {
    flex: 0.5!important;
  }

  .fixed-r {
    position: fixed;
    right: 15px;
    bottom: 120px;
    width: 50px;
    .r-btn {
      width: 50px;
      height: 50px;
      background: #cb9400;
      opacity: 0.94;
      border-radius: 17.5px;
      color: white;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      div {
        text-align: center;
      }
    }
    .r-btn:nth-child(2) {
      margin-top: 15px;
    }
  }
  .fixed-b {
    width: 100%;
    height: 50px;
    background: #ffffff;
    box-shadow: 0px 0px 6.5px 0px rgba(0, 0, 0, 0.05);
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>