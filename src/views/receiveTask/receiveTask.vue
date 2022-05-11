<!--
 * @Date: 2022-05-11 10:43:10
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-11 11:23:59
 * @FilePath: \little-bee-mobile\src\views\receiveTask\receiveTask.vue
 * @Description: 领取任务页面
-->
<template>
  <div class="ReceiveTask">
    <div class="bread">
      <div class="float">
        <span class="left">
          <van-icon name="arrow-left"
                    @click="$router.go(-1)" />
        </span>
        <span class="center">{{$route.meta.bread || ''}}</span>
        <span class="right"
              @click="clickRight"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiveTask'
}
</script>

<style scoped lang="less">
.ReceiveTask {
  height: 100vh;
  background-color: #f7f7f7;
  .bread {
    width: 100%;
    height: 36px;
    .float {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      background-color: #fff;
      font-size: 19px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      z-index: 10;
      .left {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        &:active {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .center {
        flex: 1;
        height: 36px;
        text-align: center;
        line-height: 36px;
      }
      .right {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        &:active {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
</style>
