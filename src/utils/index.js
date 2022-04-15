const utils = {

}
utils.getToken = function () {
  window.localStorage.getItem('token')
}
utils.setToken = function (param) {
  if ((typeof param) === 'string') {
    window.localStorage.setItem('token',param)
  }
  
}
utils.deleteToken = function () {
    window.localStorage.removeItem('token')
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
