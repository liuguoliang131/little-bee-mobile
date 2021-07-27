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
export default utils
