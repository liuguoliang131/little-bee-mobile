<!--
 * @Date: 2022-04-28 10:33:07
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-28 13:55:24
 * @FilePath: \little-bee-mobile\src\components\bread\index.vue
 * @Description: 页头
-->
<template>
  <div class="bread">
    <div class="float">
      <span class="left">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </span>
      <span class="center">{{$route.meta.bread || ''}}</span>
      <span class="right" @click="clickRight">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import {
  Icon
} from 'vant'
export default {
  name: 'Bread',
  components: {
    VanIcon: Icon
  },
  methods: {
    clickRight() {
      this.$emit('click',null)
    }
  }
}
</script>

<style scoped lang="less">
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
        background-color: rgba(0,0,0,0.2);
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
        background-color: rgba(0,0,0,0.2);
      }
    }
  }
}

</style>