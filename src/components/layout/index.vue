<!--
 * @Date: 2022-04-14 18:00:58
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-28 11:08:54
 * @FilePath: \little-bee-mobile\src\components\layout\index.vue
 * @Description: 
-->
<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'Layout'
}
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>