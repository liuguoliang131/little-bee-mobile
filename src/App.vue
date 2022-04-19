<!--
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-18 10:26:19
 * @FilePath: \little-bee-mobile\src\App.vue
 * @Description: 
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>
