/*
 * @Date: 2022-04-18 09:40:39
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-25 13:44:35
 * @FilePath: \little-bee-mobile\src\http\api.js
 * @Description: 
 */

export const appId = 'wxdcc277beb5c6a25d' //厚鸟科技公众号appId
export const host = process.env.VUE_APP_BASE_URL //请求地址
export const h5_login_login = '/h5/login/login'//登录
export const sys_sms_send = '/sys/sms/send' // 短信验证码
export const h5_login_wxLogin = '/h5/login/wxLogin' //微信openId登录
export const h5_company_register = '/h5/company/register' //注册企业
export const h5_company_findById = '/h5/company/findById' //企业信息
export const companyMembershipHistory_findById = '/companyMembershipHistory/findById' //查询账号的可注册人员数量和任务容量之类的
export const company_update = '/company/update'  //修改企业
export const h5_company_update = '/h5/company/update' //h5修改企业
export const sys_version_file_upload = '/sys/version/file/upload' //上传文件

export const h5_job_findPage = '/h5/job/findPage' // 任务列表
export const h5_job_updateStatus = '/h5/job/updateStatus' // 任务状态修改
export const h5_job_create = '/h5/job/create' // 创建任务
export const h5_job_findById = '/h5/job/findById' //详情
export const job_deleteById = '/job/deleteById' //删除任务
// 工序记账
export const h5_process_findPage = '/h5/process/findPage' //列表
export const h5_process_billingDetails = '/h5/process/billingDetails' //详情
export const h5_process_createBilling = '/h5/process/createBilling' //创建
export const h5_process_userBillingPageDetails = '/h5/process/userBillingPageDetails' //详情

// 员工管理
export const h5_employee_create = '/h5/employee/create' //创建post
export const h5_employee_findById = '/h5/employee/findById' //详情get
export const h5_employee_findPage = '/h5/employee/findPage' //列表post
export const h5_employee_update = '/h5/employee/update' //编辑post

export const sys_version_file_findByIds = '/sys/version/file/findByIds'  //获取图片
export const h5_performanceStatistics_mechanicStatistics = '/h5/performanceStatistics/mechanicStatistics' // 员工统计汇总
export const h5_performanceStatistics_sum = '/h5/performanceStatistics/sum' // 员工工资合计
export const employeeProcessView_findPage = '/employeeProcessView/findPage'  //员工统计汇总1

// 绩效统计

export const h5_performanceStatistics_findPage = '/h5/performanceStatistics/findPage'  //工资列表
export const h5_performanceStatistics_companyStatistics = '/h5/performanceStatistics/companyStatistics' //企业统计 

// 分享
export const h5_jobShare_jobShare = '/h5/jobShare/jobShare' //任务分享
export const h5_jobShare_jobReception = '/h5/jobShare/jobReception' //任务接收
export const h5_jobShare_getShareCount = '/h5/jobShare/getShareCount' //获取当前任务已完成数量
export const h5_jobShare_findPage = '/h5/jobShare/findPage' //任务列表
export const h5_jobShare_findById = '/h5/jobShare/findById' //分享详情
export const h5_job_update = '/h5/job/update'  //编辑任务
export const h5_job_jobCheck = '/h5/job/jobCheck'  //检查任务数量
// 获取分享需要的参数
export const h5_wx_getWxConfig = '/h5/wx/getWxConfig'
export const wx_getWxConfigWeb = '/wx/getWxConfigWeb' //下单H5的
export const h5_wx_getOpenid = '/h5/wx/getOpenid'  //根据code获取openid
// 会员
export const h5_membership_selectAll = '/h5/membership/selectAll' //会员列表
export const h5_membership_findCompanyInfo = '/h5/membership/findCompanyInfo' //查询当前企业会员详情
export const h5_membership_getAmountsPayable = '/h5/membership/getAmountsPayable' //id查询会员多少钱 返回流水号 get
export const h5_membership_createOrder = '/h5/membership/createOrder' //下单 post
export const h5_membership_pay = '/h5/membership/pay' //支付 get