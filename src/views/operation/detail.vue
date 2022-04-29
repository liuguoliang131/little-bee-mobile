<!--
 * @Date: 2022-04-29 13:51:09
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-29 16:11:24
 * @FilePath: \little-bee-mobile\src\views\operation\detail.vue
 * @Description: 添加修改工序对账
-->
<template>
  <div class="operationEdit">
    <bread></bread>
    <div class="search">
      <span class="date">{{searchParams.date}}</span>
      <div class="input">
        <input v-model="searchParams.keywords"
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
          <div class="staff-item"
               v-for="item in 100"
               :key="item">{{'员工'+item}}</div>
        </div>
      </div>
      <div class="views-right">
        <div v-for="index in 12"
             :key="index">
          防护服 前道 x30
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {
  Button
} from 'vant'
import Bread from '@/components/bread/index.vue'
export default {
  name: 'OperationDetail',
  components: {
    VanButton: Button,
    Bread
  },
  data() {
    return {
      searchParams: {
        date: '2022-04-15',
        keywords: ''
      },
      active: null,
      tabs: [
        {
          name: '男士西服',
          id: 1,
          list: [
            {
              name: '裁剪1',
              count: ''
            },
            {
              name: '裁剪2',
              count: ''
            },
            {
              name: '裁剪3',
              count: ''
            }
          ]
        },
        {
          name: '男士西服2',
          id: 2,
          list: [
            {
              name: '裁剪4',
              count: ''
            },
            {
              name: '裁剪5',
              count: ''
            },
            {
              name: '裁剪6',
              count: ''
            }
          ]
        },
        {
          name: '男士西服3',
          id: 3,
          list: [
            {
              name: '裁剪7',
              count: ''
            },
            {
              name: '裁剪8',
              count: ''
            },
            {
              name: '裁剪9',
              count: ''
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.operationEdit {
  background-color: #f7f7f7;
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
    }
  }
}
</style>
