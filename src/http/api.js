const apis = {
  test_api:'/api/user/select'
}
function getApi(url) {
  return apis[url]||''
}
export default getApi