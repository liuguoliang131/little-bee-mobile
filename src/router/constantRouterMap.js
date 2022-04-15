/*
 * @Date: 2022-04-14 15:41:49
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-14 18:06:21
 * @FilePath: \vue_init\src\router\routes.js
 * @Description: 非动态路由
 */
import login from '../views/login/index'
import layout from '../components/layout/index'

const normalRoutes = [
  {
    path:'/',
    redirect:'/layout'
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/layout',
    component:layout,
    children:[
      {
        path:'/index',
        component:()=>import('../views/first/index.vue')
      }
    ]
  },
]

export default normalRoutes