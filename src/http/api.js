
const apis = {
  host:process.env.VUE_APP_BASE_URL, //请求地址
  test_api:'/api/user/select'
}
function getApi(url) {
  return apis[url]||''
}
export default getApi