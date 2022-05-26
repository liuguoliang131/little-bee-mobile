/*
 * @Date: 2022-03-22 09:46:05
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-26 14:42:10
 * @FilePath: \little-bee-mobile\src\router\index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRouterMap from './constantRouterMap'
import dynamicRouterMap from './dynamicRouterMap'
import store from '@/store/index'
import { host, h5_wx_getOpenid, h5_login_wxLogin } from '../http/api'
// import axios from '../http/index'
import utils from '@/utils/index'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
// 获取授权页面重定向回当前页面的时候保存它返回来的参数 
console.log('router文件中获取url', window.location.href)
console.log('utils.getCode()', utils.getCode())
const url = window.location.href



// 暂时不需要自动登录 以下代码注释------------
// if(!store.state.user.userInfo && utils.getOpenId()) {
//   axios({
//     method: 'get',
//     url: host + h5_login_wxLogin,
//     params: {
//       appId: utils.getOpenId(),
//       type: '2'
//     }
//   }).then(res1 => {
//     store.commit('user/set_userInfo', res1.model)
//   })
// }
// ---------------

const router = new VueRouter({ mode: 'hash', routes: constantRouterMap })

/**
 * 在router/index.js中定义$addRoutes,调用这个方法来添加路由，这个方法会先重置路由
 这个路由只会包括非权限页，比如登录页，再调用router.addRoutes添加权限路由，
 此方法亲测，完美解决，方法来自GitHub的issues,https://github.com/vuejs/vue-router/issues/2886
 */

router.$addRoutes = (params) => {
  router.matcher = new VueRouter({ // 重置路由规则
    mode: 'hash',
    routes: constantRouterMap
  }).matcher
  router.addRoutes(params) // 添加路由
}
// onReady只在初始加载一次  比如刷新页面
router.onReady(() => {
  console.log('router.onready 环境', process.env.NODE_ENV)
  let appURL = ''
  if (process.env.NODE_ENV === 'test') {
    appURL = 'http://littlebee.ouryou.cn/'
  } else if (process.env.NODE_ENV === 'production') {
    appURL = 'http://littlebee.forniao.cn/'
  } else if (process.env.NODE_ENV === 'development') {
    appURL = 'http://littlebee.ouryou.cn/'
  }
  if (url.includes('code=') && !utils.getOpenId()) {
    let code = url.split('?')[1].split('&')[0].split('=')[1]
    console.log('code', code)
    store.commit('user/set_code', code)
    axios({
      method: 'get',
      url: host + h5_wx_getOpenid,
      params: {
        code
      }
    }).then(res => {
      console.log('获取openid then:', res)
      store.commit('user/set_openId', res.data.model)
      console.log('history', history)
      // window.history.go(-2)
      window.location.href = window.localStorage.getItem('littleBeeLink')
    })
  } else if (url.includes('code=') && utils.getOpenId()) {
    // window.history.go(-1)
  }
  if (!utils.getCode()) {
    let nowRoute = '#/'
    if (window.location.href.includes('#/')) {
      nowRoute = `#/${window.location.href.split('#/')[1]}`
    }
    // history.pushState({ nowRoute }, 'firstPage', nowRoute)
    window.localStorage.setItem('littleBeeLink', appURL + nowRoute)
    if(process.env.NODE_ENV !== 'development') {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdcc277beb5c6a25d&redirect_uri=${appURL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    }
    
  }
  const status = store.state.user.userInfo // 判断用户已登录且已有权限
  if (status) {
    // 请求动态路由
    store.dispatch('jurisdiction/getDynamicRoutes', null).then(list => {
      console.log('动态路由', list)
      // 根据获取回来的信息判断是否要添加到路由表里
      const addList = []
      list.forEach(item => {
        dynamicRouterMap.forEach(routeItem => {
          if (item.path === routeItem.path) {
            console.log('routeItem', routeItem)
            addList.push(routeItem)
          }
        })
      })
      router.addRoutes(addList) // 添加动态路由,这里不必用$addRoutes，因为刷新后就没有上一次的动态路由，故不必清除
    })
  } else {
    console.log('没有token')
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Object.is(to.path, '/login')) {
    next()
    return
  }
  if (to.meta.white) {
    console.log('tp.path', to.path)
    next()
  } else {
    const userInfo = store.state.user.userInfo
    if (userInfo) {
      return next()
    } else {
      // this.$store.commit('user/set_code',)
      return next({
        path:'/login',
        query: {
          origin: from.path
        }
      })
    }
  }

})
router.afterEach((to, from, next) => {
  // console.log(from,to,next)
  document.title = to.meta.bread
  NProgress.done()
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router