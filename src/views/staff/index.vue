<!--
 * @Date: 2022-04-29 16:11:05
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-29 16:49:22
 * @FilePath: \little-bee-mobile\src\views\staff\index.vue
 * @Description: 员工列表
-->
<template>
  <div class="staff">
    <bread></bread>
    <div class="search">
      <div class="left">
        <input type="text" placeholder="姓名">
        <van-button color="#CB9400"
                    type="info"
                    size="small">筛选</van-button>
      </div>
      <div class="right">
        <van-icon name="bar-chart-o" color="#CB9400" />
        <van-icon name="plus" color="#CB9400" @click="$router.push('/staffAdd')" />
      </div>
    </div>
    <div class="views">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>手机号</th>
            <th>入职时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 12" :key="index">
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>5</td>
            <td><van-icon name="ellipsis" /></td>
          </tr>
        </tbody>
      </table>
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
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Pagination
} from 'vant'
export default {
  name:'StaffList',
  data() {
    return {
      active: '2'
    }
  },
  components: {
    Bread,
    VanButton:Button,
    VanIcon:Icon,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    VanPagination: Pagination
  }
}
</script>

<style scoped lang="less">
.staff {
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    .left {
      display: flex;
      align-items:center;
      input {
        height: 30px;
        width: 185px;
        border: 1px solid #B4B4B4;
        border-radius: 3px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-right: 10px;
        padding: 0 15px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .van-icon-bar-chart-o {
        margin-right: 15px;
      }
    }
  }
  .views {
    height: calc( 100vh - 148px );
  }
}
</style>