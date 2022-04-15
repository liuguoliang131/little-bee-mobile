/*
 * @Date: 2022-04-15 09:29:02
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-15 09:36:49
 * @FilePath: \vue_init\src\router\dynamicRouterMap.js
 * @Description: 动态路由
 */

const dynamicRouterMap = [
  {
    path:'/d1',
    component:()=>import('../views/d1/index.vue')
  },
  {
    path:'/d2',
    component:()=>import('../views/d2/index.vue')
  }
]

export default dynamicRouterMap