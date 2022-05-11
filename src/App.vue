<!--
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-11 20:51:45
 * @FilePath: \little-bee-mobile\src\App.vue
 * @Description: 
-->
<template>
  <div id="app">
    <router-view></router-view>
    <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdcc277beb5c6a25d&redirect_uri=http://littlebee.ouryou.cn&response_type=%s&scope=snsapi_base&state=STATE#wechat_redirect" ref="redirect"></a>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      openId:''
    }
  },
  methods: {
    // 如果url里没有code=
    getOpenId() {
      // if(this.$store.state.user.code) {
      //   return false
      // }
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdcc277beb5c6a25d&redirect_uri=http://littlebee.ouryou.cn/&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
    }
  },
  created() {
    this.getOpenId()
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>
