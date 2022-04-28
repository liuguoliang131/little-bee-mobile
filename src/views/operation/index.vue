<!--
 * @Date: 2022-04-26 15:23:46
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-28 15:15:36
 * @FilePath: \little-bee-mobile\src\views\operation\index.vue
 * @Description: 工序记账
-->
<template>
  <div class="operation">
    <bread @click="handleAddBill">
      <van-icon name="plus"
                color="#cb9400" />
    </bread>
    <div class="views">
      <div class="search">
        <input type="date"
               name=""
               id=""
               @change="handleSearch">
      </div>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th>任务标题</th>
              <th>成品</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <van-pull-refresh v-model="reloading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getList"
              >
                <tr v-for="item in 12" :key="item">
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
              </van-list>
            </van-pull-refresh>
          </tbody>
        </table>
      </div>

    </div>
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
import Bread from '@/components/bread/index'
import { h5_process_findPage } from '@/http/api'
export default {
  name: 'Operation',
  data() {
    return {

    }
  },
  components:{
    VanSearch: Search,
    VanList: List,
    VanPullRefresh: PullRefresh,
    VanIcon: Icon,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    Bread
  },
  methods: {
    // 新增记账
    handleAddBill() {

    },
    // 搜索
    handleSearch() {
      this.getList()
    },
    async getList() {
      const res = await this.$http({
        method: 'post',
        url: h5_process_findPage,
        data: {

        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.operation {
  width: 100%;
  .views {
    width: 100%;
    height: calc(100vh - 36px);
    overflow-y: scroll;
    .search {
      padding: 15px;
      input {
        width: 160px;
        height: 30px;
        border: 1px solid #bbbbbb;
        border-radius: 3px;
        color: #333333;
      }
    }
  }
}
</style>
