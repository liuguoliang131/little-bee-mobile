/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-26 19:20:33
 * @FilePath: \little-bee-mobile\src\http\api.js
 * @Description: 
 */


export const host = process.env.VUE_APP_BASE_URL //请求地址
export const h5_login_login = '/h5/login/login'//登录
export const sys_sms_send = '/sys/sms/send' // 短信验证码
export const h5_company_register = '/h5/company/register' //注册企业

export const sys_version_file_upload = '/sys/version/file/upload' //上传文件

export const h5_job_findPage = '/h5/job/findPage' // 任务列表
export const h5_job_updateStatus = '/h5/job/updateStatus' // 任务状态修改
export const h5_job_create = '/h5/job/create' // 创建任务
