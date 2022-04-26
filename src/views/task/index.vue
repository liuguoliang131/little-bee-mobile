<!--
 * @Date: 2022-03-22 09:46:05
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-26 15:32:34
 * @FilePath: \little-bee-mobile\src\views\Task\index.vue
 * @Description: 
-->
<template>
  <div class="Index">
    <div class="search">
      <van-search
        v-model="searchParams.keywords"
        placeholder="请输入标题"
        @search="handleSearch"
      />
    </div>
    <div>
      <div class="thead">
        <!-- <span>序号</span> -->
        <span>标题</span>
        <span>创建时间</span>
        <span>数量</span>
        <span>操作</span>
      </div>
      <van-pull-refresh v-model="reloading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getList"
        >
          <div class="item" v-for="(item) in tableData" :key="item.id">
            <!-- <span>{{item.index}}</span> -->
            <span class="title">
              {{item.sortTitle||item.title}}
              <i class="zijian">自建</i>
              <!-- <i class="fenxiang">分享</i>
              <i class="wai">外</i> -->
            </span>
            <span>{{item.createTime}}</span>
            <span>{{item.count}}</span>
            <span class="caozuo">
              <van-icon name="delete-o" @click="handleShowDelDialog(item)" />
              <van-icon name="more-o" @click="handleShowMore(item)" />
            </span>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="fixed-r">
      <div class="r-btn" @click="$router.push('/operation')">
        <div>工序</div>
        <div>记账</div>
      </div>
      <div class="r-btn" @click="$router.push('/createTask')">
        <div>创建</div>
        <div>任务</div>
      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="1" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="2" icon="friends-o" to="staff">员工管理</van-tabbar-item>
      <van-tabbar-item name="3" icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
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
  Tabbar,
  TabbarItem
} from 'vant'
import { h5_job_findPage, h5_job_updateStatus } from '@/http/api.js'
export default {
  name:'Index',
  components:{
    VanSearch: Search,
    VanList: List,
    VanPullRefresh: PullRefresh,
    VanIcon: Icon,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem
  },
  data() {
    return {
      searchParams: {
        keywords: '',
        pageNo: 1,
        pageSize: 20
      },
      tableData: [
        {
          index: 1,
          id: 1,
          title:'标题',
          sortTitle:'短标题',
          count:1,
          createTime:'2022-4-25'
        },
        {
          index: 2,
          id: 3,
          title:'标题',
          sortTitle:'短标题',
          count:1,
          createTime:'2022-4-25'
        },
        {
          index:3,
          id: 2,
          title:'标题',
          sortTitle:'短标题',
          count:1,
          createTime:'2022-4-25'
        }
      ],
      loading: false,
      finished: false, //是否为最后一页
      reloading:false,
      active: '1'
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.tableData = []
      this.pageNo = 1
      this.getList()
    },
    async getList() {
      // const toast = Toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   message: '加载中'
      // })
      try {
        
        const res = await this.$http({
          method: 'post',
          url: h5_job_findPage, 
          data: this.searchParams
        })
        // toast.clear()
        if(!res.success) {
          return Toast( res.msg )
        }
        res.model.data&&res.model.data.forEach((item,idx)=>{
          item.index = (this.searchParams.pageNo-1)*this.searchParams.pageSize+idx+1
        })
        Object.assign(this.tableData, res.model.data||[])
        this.loading = false
        if(res.model.sumPage===res.model.pageNo) {
          this.finished = true
        }
        this.searchParams.pageNo++
      } catch (error) {
        // toast.clear()
        console.log(error)
        throw error
      }
    },
    async onRefresh() {
      this.tableData = []
      this.pageNo = 1
      try {
        
        const res = await this.$http({
          method: 'post',
          url: h5_job_findPage, 
          data: this.searchParams
        })
        // toast.clear()
        this.reloading = false
        if(!res.success) {
          return Toast( res.msg )
        }
        res.model.data&&res.model.data.forEach((item,idx)=>{
          item.index = (this.searchParams.pageNo-1)*this.searchParams.pageSize+idx+1
        })
        Object.assign(this.tableData, res.model.data||[])
        if(res.model.sumPage===res.model.pageNo) {
          this.finished = true
        }
        this.searchParams.pageNo++
      } catch (error) {
        // toast.clear()
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
          url: h5_job_updateStatus,
          data: {
            id: item.id,
            jobStatus: 'Finish'
          }
        })
        if(!res.success) {
          return Toast(res.msg)
        }
        this.tableData.splice((()=>{
          let idx = null
          this.tableData.forEach((item1,index1)=>{
            if(item1.id===item.id) {
              idx = index1
            }
          })
          return idx
        })(),1)
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
.Index {
  height: 100vh;
  overflow-y: scroll;
  .thead {
    margin: 0 15px;
    display: flex;
    align-items: center;
    background-color: #F0F0F0;
    span {
      flex: 1;
      height: 36px;
      font-size: 12px;
      line-height: 36px;
      text-align: center;
    }
  }
  .item {
    margin: 0 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F0F0F0;
    span {
      flex: 1;
      font-size: 12px;
      line-height: 49px;
      text-align: center;
      min-height: 49px;
    }
    .caozuo {
      .van-icon:nth-child(1) {
        margin-right: 10px;
      }
    }
    .title {
      .zijian {
        background-color: #CB9400;
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
  .van-list {
    min-height: 600px;
  }

  .fixed-r {
    position: fixed;
    right: 15px;
    bottom: 68.5px;
    width: 50px;
    .r-btn {
      width: 50px;
      height: 50px;
      background: #CB9400;
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
    background: #FFFFFF;
    box-shadow: 0px 0px 6.5px 0px rgba(0, 0, 0, 0.05);
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>