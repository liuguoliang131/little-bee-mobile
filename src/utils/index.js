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
// 获取动态路由
utils.getDynamicRoutes = function () {
  const routes = window.localStorage.getItem('routes')
  if (routes) {
    return JSON.parse(routes)
  } else {
    return []
  }

}
// 保存动态路由
utils.setDynamicRoutes = function (data) {
  window.localStorage.setItem('routes',JSON.stringify(data))

}
export default utils
