/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-22 16:12:29
 * @FilePath: \little-bee-mobile\src\utils\index.js
 * @Description: 
 */
const utils = {

}
utils.getToken = function () {
  return window.localStorage.getItem('token')||''
}
utils.setToken = function (param) {
  if ((typeof param) === 'string') {
    window.localStorage.setItem('token',param)
  }
  
}
utils.deleteToken = function () {
    window.localStorage.removeItem('token')
}

// 获取用户信息
utils.getUserInfo = function () {
  return window.localStorage.getItem('littleBeeUserInfo') ? JSON.parse( window.localStorage.getItem('littleBeeUserInfo')) : null
}
// 存储用户信息
utils.setUserInfo = function (data) {
  window.localStorage.setItem('littleBeeUserInfo', JSON.stringify(data))
}
// 获取动态路由+初始化路由  只在登录和刷新页面时调用
utils.getDynamicRoutes = function () {
  const routes = window.localStorage.getItem('dynamicRoutes')
  if (routes) {
    return JSON.parse(routes)
  } else {
    return []
  }

}
// 保存动态路由
utils.setDynamicRoutes = function (data) {
  window.localStorage.setItem('dynamicRoutes',JSON.stringify(data))
  
}
export default utils
