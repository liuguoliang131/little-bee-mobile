/*
 * @Date: 2022-04-14 15:41:49
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-28 10:41:47
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
        component:()=>import('../views/task/index.vue'),
        meta: {
          bread: '首页'
        }
      },
      {
        name:'Detail',
        path:'/detail',
        component:()=>import('../views/task/detail.vue'),
        meta: {
          bread: '任务详情'
        }
      },
      {
        name:'CreateTask',
        path:'/createTask',
        component:()=>import('../views/task/createTask.vue'),
        meta: {
          bread: '创建任务'
        }
      },
      {
        name:'Operation',
        path:'/operation',
        component:()=>import('../views/operation/index.vue'),
        meta: {
          bread: '工序记账'
        }
      },
    ]
  },
]

export default normalRoutes