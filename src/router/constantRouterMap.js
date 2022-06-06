/*
 * @Date: 2022-04-14 15:41:49
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-06-06 17:28:26
 * @FilePath: \little-bee-mobile\src\router\constantRouterMap.js
 * @Description: 静态路由
 */
import login from '../views/login/index'
import layout from '../components/layout/index'
import register from '../views/login/register'
import wechatPushOperation from '../views/wechatPush/operation.vue'
import wechatPushPerformance from '../views/wechatPush/performance.vue'
const normalRoutes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    name:'Login',
    path:'/login',
    component:login,
    meta: {
      white: true,
      bread:'登录'
    }
  },
  {
    name:'Register',
    path:'/register',
    component:register,
    meta: {
      bread: '注册企业',
      white: true
    }
  },
  {
    name:'Agreement',
    path:'/agreement',
    component:()=>import('../views/agreement/index.vue'),
    meta: {
      bread: '用户协议',
      white: true
    }
  },
  {
    name:'Payment',
    path:'/payment',
    component:()=>import('../views/agreement/payment.vue'),
    meta: {
      bread: '充值协议',
      white: true
    }
  },
  {
    name:'WechatPushOperation',
    path:'/wechatPushOperation',
    component: wechatPushOperation,
    meta: {
      bread: '个人工账',
      white: true
    }
  },
  {
    name:'WechatPushPerformance',
    path:'/wechatPushPerformance',
    component: wechatPushPerformance,
    meta: {
      bread: '个人绩效',
      white: true
    }
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
          bread: '首页',
          white: false
        }
      },
      {
        name:'Detail',
        path:'/detail',
        component:()=>import('../views/task/detail.vue'),
        meta: {
          bread: '任务详情',
          white: false
        }
      },
      {
        name:'CreateTask',
        path:'/createTask',
        component:()=>import('../views/task/createTask.vue'),
        meta: {
          bread: '创建任务',
          white: false
        }
      },
      {
        name:'EditTask',
        path:'/editTask',
        component:()=>import('../views/task/editTask.vue'),
        meta: {
          bread: '编辑任务',
          white: false
        }
      },
      {
        name:'Operation',
        path:'/operation',
        component:()=>import('../views/operation/index.vue'),
        meta: {
          bread: '工序记账',
          white: false
        }
      },
      {
        name:'OperationEdit',
        path:'/operationEdit',
        component:()=>import('../views/operation/edit.vue'),
        meta: {
          bread: '创建/修改记账',
          white: false
        }
      },
      {
        name:'OperationAdd',
        path:'/operationAdd',
        component:()=>import('../views/operation/add.vue'),
        meta: {
          bread: '创建/修改记账',
          white: false
        }
      },
      {
        name:'OperationDetail',
        path:'/operationDetail',
        component:()=>import('../views/operation/detail.vue'),
        meta: {
          bread: '账单详情',
          white: false
        }
      },
      {
        name:'StaffList',
        path:'/staffList',
        component:()=>import('../views/staff/index.vue'),
        meta: {
          bread: '员工管理',
          white: false
        }
      },
      {
        name:'StaffAdd',
        path:'/staffAdd',
        component:()=>import('../views/staff/add.vue'),
        meta: {
          bread: '创建员工',
          white: false
        }
      },
      {
        name:'StaffDetail',
        path:'/staffDetail',
        component:()=>import('../views/staff/detail.vue'),
        meta: {
          bread: '员工详情',
          white: false
        }
      },
      {
        name:'StaffEdit',
        path:'/staffEdit',
        component:()=>import('../views/staff/edit.vue'),
        meta: {
          bread: '编辑员工',
          white: false
        }
      },
      {
        name:'StaffStatistics',
        path:'/staffStatistics',
        component:()=>import('../views/staff/statistics.vue'),
        meta: {
          bread: '绩效统计',
          white: false
        }
      },
      {
        name:'My',
        path:'/my',
        component:()=>import('../views/my/index.vue'),
        meta: {
          bread: '我的',
          white: false
        }
      },

      {
        name:'EnterpriseInfo',
        path:'/enterpriseInfo',
        component:()=>import('../views/my/enterpriseInfo.vue'),
        meta: {
          bread: '企业信息',
          white: false
        }
      },
      {
        name:'Summary',
        path:'/summary',
        component:()=>import('../views/my/summary.vue'),
        meta: {
          bread: '汇总统计',
          white: false
        }
      },
      {
        name:'History',
        path:'/history',
        component:()=>import('../views/my/history.vue'),
        meta: {
          bread: '历史纪录',
          white: false
        }
      },
      {
        name:'ShareList',
        path:'/shareList',
        component:()=>import('../views/my/shareList.vue'),
        meta: {
          bread: '分享列表',
          white: false
        }
      },
      {
        name:'ShareDetail',
        path:'/shareDetail',
        component:()=>import('../views/my/shareDetail.vue'),
        meta: {
          bread: '分享详情',
          white: false
        }
      },
      {
        name:'QuitForm',
        path:'/quitForm',
        component:()=>import('../views/my/quitForm.vue'),
        meta: {
          bread: '员工离职表',
          white: false
        }
      },
      {
        name:'ReceiveTask',
        path:'/receiveTask/:id',
        component:()=>import('../views/receiveTask/receiveTask.vue'),
        meta: {
          bread: '分享详情',
          white: true
        }
      },
      {
        name:'RenewalMember',
        path:'/renewalMember',
        component:()=>import('../views/renewalMember/renewalMember.vue'),
        meta: {
          bread: '会员信息',
          white: false
        }
      },
      
      {
        name:'EnterpriseEdit',
        path:'/enterpriseEdit',
        component:()=>import('../views/my/enterpriseEdit.vue'),
        meta: {
          bread: '编辑企业',
          white: false
        }
      },

      {
        name:'PerformanceDetails',
        path:'/performanceDetails',
        component:()=>import('../views/staff/performanceDetails.vue'),
        meta: {
          bread: '绩效明细',
          white: false
        }
      },
      
      {
        name:'Process',
        path:'/process',
        component:()=>import('../views/task/process.vue'),
        meta: {
          bread: '工序详情',
          white: false
        }
      }
      
    ]
  },
]

export default normalRoutes