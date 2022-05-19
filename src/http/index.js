/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-19 16:52:17
 * @FilePath: \little-bee-mobile\src\http\index.js
 * @Description: 
 */
import axios from 'axios'
import store from '@/store/index'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    // 'token':store.getters['user/get_token']||''
  }
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('请求拦截器')
  if (config.headers['Content-Type'] === 'multipart/form-data'){
    return config
  }
  if (config.method === 'get') {
    config.params = {
      companyId: store.state.user.userInfo.companyId||store.state.user.userInfo.id,
      companyName: store.state.user.userInfo.name||store.state.user.userInfo.companyName,
      ...config.params
    }
  } else if( config.method === 'post' ) {
    config.data = {
      companyId: store.state.user.userInfo.companyId||store.state.user.userInfo.id,
      companyName: store.state.user.userInfo.name||store.state.user.userInfo.companyName,
      ...config.data
    }
  }
  return config
  
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('响应拦截器')
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error);
});
export default instance