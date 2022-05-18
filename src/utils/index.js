/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-18 18:01:01
 * @FilePath: \little-bee-mobile\src\utils\index.js
 * @Description: 
 */
import { sys_version_file_findByIds } from '@/http/api'
import instance from '@/http/index'
const utils = {

}
utils.getToken = function () {
  return window.localStorage.getItem('token') || ''
}
utils.setToken = function (param) {
  if ((typeof param) === 'string') {
    window.localStorage.setItem('token', param)
  }

}
utils.deleteToken = function () {
  window.localStorage.removeItem('token')
}

// 获取用户信息
utils.getUserInfo = function () {
  return window.localStorage.getItem('littleBeeUserInfo') ? JSON.parse(window.localStorage.getItem('littleBeeUserInfo')) : null
}
// 存储用户信息
utils.setUserInfo = function (data) {
  window.localStorage.setItem('littleBeeUserInfo', JSON.stringify(data))
}
utils.deleteUserInfo = function () {
  window.localStorage.removeItem('littleBeeUserInfo')
}

// 存储openid
utils.setOpenId = function (data){
  window.localStorage.setItem('littleBeeOpenId',data)
}
// 获取openid
utils.getOpenId = function (){
  return window.localStorage.getItem('littleBeeOpenId')
}
// 存储code
utils.setCode = function (data){
  window.localStorage.setItem('littleBeeCode',data)
}
// 获取code
utils.getCode = function (){
  return window.localStorage.getItem('littleBeeCode')
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
  window.localStorage.setItem('dynamicRoutes', JSON.stringify(data))

}

// 时间格式化 2022-05-22 05:22:00
utils.formatTime = function (data) {
  const date = new Date(data)
  let y = date.getFullYear()
  let mon = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  y = y < 10 ? '0' + y : y
  mon = mon < 10 ? '0' + mon : mon
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s

  return `${y}-${mon}-${d} ${h}:${m}:${s}`

}
// 时间格式化 return 2022-05-22
// data: Date对象或string或毫秒
utils.formatTimeDate = function (data) {
  const date = new Date(data)
  let y = date.getFullYear()
  let mon = date.getMonth() + 1
  let d = date.getDate()
  y = y < 10 ? '0' + y : y
  mon = mon < 10 ? '0' + mon : mon
  d = d < 10 ? '0' + d : d

  return `${y}-${mon}-${d}`

}
// return 6.30
utils.formatTimeMMdd = function (data) {
  const date = new Date(data)
  let mon = date.getMonth() + 1
  let d = date.getDate()
  // mon = mon < 10 ? '0' + mon : mon
  // d = d < 10 ? '0' + d : d

  return `${mon}.${d}`
}
// 根据图片ID获取图片地址
utils.getPhoto = function (ids) {
  return new Promise((resolve) => {
    instance({
      method: 'get',
      url: sys_version_file_findByIds,
      params: {
        ids
      }
    }).then(res => {
      console.log('p',res)
      resolve(res.model||[])
    }).catch(error => {
      console.log(error)
      resolve([])
    })
  })
}
// 批量获取图片  返回数组
utils.getPhotos = function (list) {
  const newList = []
  let index = 0
  const deepGet = async (id) => {
    if (index + 1 === list.length) {
      return false
    }
    const res = await instance({
      method: 'get',
      url: sys_version_file_findByIds,
      params: {
        id
      }
    })
    if (res.success) {
      newList.push({ url: res.model.url || '' })
      deepGet(list[++index])
    } else {
      deepGet(list[++index])
    }
  }
  deepGet(list[index])
  return newList
}
// 获取今天日期 yyyy-MM-dd
utils.getToday = function() {
  const date = new Date()
  let y = date.getFullYear()
  let mon = date.getMonth() + 1
  let d = date.getDate()
  y = y < 10 ? '0' + y : y
  mon = mon < 10 ? '0' + mon : mon
  d = d < 10 ? '0' + d : d
  return `${y}-${mon}-${d}`
}
export default utils
