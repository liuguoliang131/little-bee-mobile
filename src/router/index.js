import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/index',
      name: 'index',
      component:()=>import('@/views/Index.vue')
    },
    {
      path: '*',
      redirect:'/index'
    }
  ]
})
router.beforeEach((from, to, next) => {
  // if (!store.getters['user/get_token']) {
  //   NProgress.start()
  //   next('/login')
  // } else {
  //   Message.success(to.path)
  //   NProgress.start()
  //   next()
  // }
  NProgress.start()
  Message.success(to.path)
  console.log(from,to)
  next()
  
})
router.afterEach((from, to, next) => {
  console.log(from,to,next)
  NProgress.done()
})

export default router