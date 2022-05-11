<!--
 * @Date: 2022-05-05 14:28:37
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-11 13:57:31
 * @FilePath: \little-bee-mobile\src\views\my\index.vue
 * @Description: 我的
-->
<template>
  <div class="my">
    <bread @click="handleShowQuit">
      <img :src="require('../../assets/quit.png')"
           alt=""
           class="quit">
    </bread>
    <div class="views">
      <div class="vip">
        <div class="vip-1">
          <div class="vip-icon"></div>
          <div class="vip-1-text">北京厚鸟科技</div>
        </div>
        <div class="vip-2"
             v-if="$store.state.user.userInfo.useDayCount">剩余{{$store.state.user.userInfo.useDayCount}}天过期</div>
        <div class="vip-2"
             v-else>已过期</div>
        <div class="vip-xufei" @click="handleGoRenew">立即续费</div>
      </div>
      <div class="card">
        <div class="card-item"
             @click="$router.push(item.path)"
             v-for="item in list"
             :key="item.name">
          <img class="left"
               :src="item.icon" />
          <div class="center">{{item.name}}</div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="1"
                       icon="home-o"
                       to="/">首页</van-tabbar-item>
      <van-tabbar-item name="2"
                       icon="friends-o"
                       to="/staffList">员工管理</van-tabbar-item>
      <van-tabbar-item name="3"
                       icon="contact"
                       to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import {
  Icon,
  Tabbar,
  TabbarItem,
  Dialog,
  Toast
} from 'vant'
export default {
  name: 'My',
  components: {
    Bread,
    VanIcon: Icon,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
  },
  data() {
    return {
      active: '3',
      list: [
        {
          name: '企业信息',
          icon: require('../../assets/qiye.png'),
          path: '/enterpriseInfo'
        },
        {
          name: '汇总统计',
          icon: require('../../assets/huisuan.png'),
          path: '/summary'
        },
        {
          name: '历史纪录',
          icon: require('../../assets/lishi.png'),
          path: '/history'
        },
        {
          name: '分享列表',
          icon: require('../../assets/fenxiang.png'),
          path: '/shareList'
        },
        {
          name: '员工离职表',
          icon: require('../../assets/lizhi.png'),
          path: '/quitForm'
        },
      ]
    }
  },
  methods: {
    handleShowQuit() {
      Dialog.confirm({
        message: '确认要退出吗?',
        confirmButtonColor: '#cb9400'
      })
        .then(async () => {
          // on confirm
          this.$store.commit('user/delete_userInfo')
        })
        .catch(() => {
          // on cancel
        })
    },
    handleGoRenew() {
      this.$router.push('/renewalMember')
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f7f7f7;
  .quit {
    width: 13.5px;
  }
  .views {
    text-align: center;
    .vip {
      display: inline-block;
      // height: 65.5px;
      width: 316px;
      margin-top: 27.5px;
      background: no-repeat url("~@/assets/vipbg.png") center;
      background-size: cover;
      border-radius: 5px 5px 0 0;
      position: relative;
      .vip-1 {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 800;
        color: #c57000;
        display: flex;
        align-items: center;
        padding-top: 12px;
        padding-left: 15px;
        text-align: left;
        .vip-icon {
          width: 19.5px;
          height: 11.5px;
          background: no-repeat url("~@/assets/vip.png") center;
          background-size: contain;
          margin: 0 5px 0 0;
        }
      }
      .vip-2 {
        text-align: left;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #c57000;
        padding: 8px 0 12px 15px;
      }
      .vip-xufei {
        position: absolute;
        top: 50%;
        right: 11px;
        transform: translateY(-50%);
        background-color: #c57000;
        color: white;
        width: 70px;
        height: 23px;
        border-radius: 11.5px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        text-align: center;
        line-height: 23px;
      }
    }
    .card {
      margin: 0 15px 15px 15px;
      padding: 0 15px;
      height: 519px;
      background: #ffffff;
      border-radius: 15px;
      .card-item {
        padding: 20px 0;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        .left {
          height: 14px;
          width: 13px;
        }
        .center {
          flex: 1;
          padding: 0 10px 0 10px;
          text-align: left;
        }
        .right {
        }
      }
    }
  }
}
</style>