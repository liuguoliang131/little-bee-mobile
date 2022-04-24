/*
 * @Date: 2022-04-14 15:41:49
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-24 18:12:50
 * @FilePath: \little-bee-mobile\src\router\constantRouterMap.js
 * @Description: 非动态路由
 */
import login from '../views/login/index'
import layout from '../components/layout/index'
import register from '../views/login/register'

const normalRoutes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    name:'Login',
    path:'/login',
    component:login
  },
  {
    name:'Register',
    path:'/register',
    component:register
  },
  {
    name:'Layout',
    path:'/layout',
    component:layout,
    children:[
      {
        name:'Index',
        path:'/index',
        component:()=>import('../views/first/index.vue')
      }
      
    ]
  },
]

export default normalRoutes