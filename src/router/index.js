/*
 * @Date: 2022-03-22 09:46:05
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-11 20:55:22
 * @FilePath: \little-bee-mobile\src\router\index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRouterMap from './constantRouterMap'
import dynamicRouterMap from './dynamicRouterMap'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
// 获取授权页面重定向回当前页面的时候保存它返回来的参数 
console.log('router文件中获取url',window.location.href)
const url = window.location.href
if(url.includes('code=')) {
  let code = url.split('?')[1].split('&')[0].split('=')[1]
  console.log('code',code)
  store.commit('user/set_code',code)
}
if(!store.state.user.code) {
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdcc277beb5c6a25d&redirect_uri=http://littlebee.ouryou.cn/&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
}



const router = new VueRouter({ mode:'history',routes:constantRouterMap })

/**
 * 在router/index.js中定义$addRoutes,调用这个方法来添加路由，这个方法会先重置路由
 这个路由只会包括非权限页，比如登录页，再调用router.addRoutes添加权限路由，
 此方法亲测，完美解决，方法来自GitHub的issues,https://github.com/vuejs/vue-router/issues/2886
 */

router.$addRoutes = (params) => {
  router.matcher = new VueRouter({ // 重置路由规则
    mode:'history',
    routes: constantRouterMap
  }).matcher
  router.addRoutes(params) // 添加路由
}
// onReady只在初始加载一次  比如刷新页面
router.onReady(() => {
  const status = store.state.user.userInfo // 判断用户已登录且已有权限
  if (status) {
    store.dispatch('jurisdiction/getDynamicRoutes',null) // 请求动态路由
      .then(list => {
        console.log('动态路由',list)
        // 根据获取回来的信息判断是否要添加到路由表里
        const addList = []
        list.forEach(item=>{
          dynamicRouterMap.forEach(routeItem=>{
            if(item.path===routeItem.path) {
              console.log('routeItem',routeItem)
              addList.push(routeItem)
            }
          })
        })
        router.addRoutes(addList) // 添加动态路由,这里不必用$addRoutes，因为刷新后就没有上一次的动态路由，故不必清除
      })
  }else {
    console.log('没有token')
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(Object.is(to.path,'/login')) {
    next()
    return
  }
  if(to.meta.white) {
    console.log('tp.path',to.path)
    next()
  }else {
    const userInfo = store.state.user.userInfo
    if(userInfo) {
      return next()
    }else {
      // this.$store.commit('user/set_code',)
      return next('/login')
    }
  }
  
})
router.afterEach((to, from, next) => {
  // console.log(from,to,next)
  NProgress.done()
  document.title = store.state.user.userInfo ? store.state.user.userInfo.companyName : ''
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router