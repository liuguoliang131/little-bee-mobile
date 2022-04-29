<!--
 * @Date: 2022-04-29 13:51:09
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-29 15:59:43
 * @FilePath: \little-bee-mobile\src\views\operation\edit.vue
 * @Description: 添加修改工序对账
-->
<template>
  <div class="operationEdit">
    <bread></bread>
    <div class="search">
      <span class="date">{{searchParams.date}}</span>
      <div class="input">
        <input v-model="searchParams.keywords" type="text" name="" id="">
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
          <div class="staff-item" v-for="item in 100" :key="item">{{'员工'+item}}</div>
        </div>
      </div>
      <div class="views-right">
        <van-tabs v-model="active" color="#CB9400">
          <van-tab v-for="tabItem in tabs" :title="tabItem.name" :key="tabItem.id">
            <div class="tab-pane">
              <div class="sum-count">
                <input type="number" placeholder="当天成品数量">
              </div>
              <div class="scroll-table">
                <table>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>名称</th>
                      <th>数量</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in tabItem.list" :key="item.id">
                      <td>{{index+1}}</td>
                      <td>{{item.name}}</td>
                      <td><input type="number" v-model="item.count" /></td>
                    </tr>
                  </tbody>
                </table>
                <footer></footer>
              </div>
              <div class="fixed-button">
                <van-button color="#CB9400"
                  type="info"
                >保存</van-button>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Tabs,
  Tab
} from 'vant'
import Bread from '@/components/bread/index.vue'
export default {
  name: 'OperationEdit',
  components: {
    VanButton: Button,
    VanTabs:Tabs,
    VanTab:Tab,
    Bread
  },
  data() {
    return {
      searchParams: {
        date:'2022-04-15',
        keywords: ''
      },
      active:null,
      tabs: [
        {
          name:'男士西服',
          id:1,
          list: [
            {
              name:'裁剪1',
              count:''
            },
            {
              name:'裁剪2',
              count:''
            },
            {
              name:'裁剪3',
              count:''
            }
          ]
        },
        {
          name:'男士西服2',
          id:2,
          list: [
            {
              name:'裁剪4',
              count:''
            },
            {
              name:'裁剪5',
              count:''
            },
            {
              name:'裁剪6',
              count:''
            }
          ]
        },
        {
          name:'男士西服3',
          id:3,
          list: [
            {
              name:'裁剪7',
              count:''
            },
            {
              name:'裁剪8',
              count:''
            },
            {
              name:'裁剪9',
              count:''
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
        border: 1px solid #BBBBBB;
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
    height: calc( 100vh - 88px );
    background-color: #f7f7f7;
    padding: 10px 15px;
    display: flex;
    .views-left {
      width: 100px;
      margin-right: 10px;
      border-radius: 5px;
      background: #FFFFFF;
      height: calc( 100vh - 110px );
      padding: 15px;
      .title {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-bottom: 15px;
      }
      .scroll-list {
        height: calc( 100vh - 170px );
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
      background: #FFFFFF;
      height: calc( 100vh - 110px );
      padding: 15px;
      overflow-y: scroll;
      overflow-x: hidden;
      /deep/.van-tabs__content {
        height: calc( 100vh - 188px );
        overflow-y: scroll;
        overflow-x: hidden;
        .tab-pane {
          .sum-count {
            padding: 15px;
            input {
              width: 160px;
              height: 30px;
              border: 1px solid #BBBBBB;
              border-radius: 3px;
              margin-right: 10px;
              padding: 0 10px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #333333;
            }
            
          }
          .scroll-table {
            height: calc( 100vh - 258px );
            overflow-y: scroll;
            overflow-x: hidden;
            table {
              input {
                width: 35px;
                height: 20px;
                text-align: center;
                border: 1px solid #BBBBBB;
                border-radius: 3px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
              }
            }
            footer {
              height: 100px;
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
}
</style>
