import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/index'
Vue.use(Vuex)

const jurisdiction = {
  namespaced: true,
  state: {
    // utils.getDynamicRoutes()
    dynamicRoutes: [
      {
        show: false,
        cnName: '改价审核列表',
        enName: 'PriceChangeReview',
        path: '/priceChangeReview'
      },
      {
        show: false,
        cnName: '企业用户审核列表',
        enName: 'MemberRegistration',
        path: '/memberRegistration'
      },
      {
        show: false,
        enName: 'Fabric',
        cnName: '面料管理',
        type: 'submenu',
        children: [
          {
            parentEnName: 'Fabric',
            show: false,
            cnName: '面料库',
            enName: 'FabricManagement',
            path: '/fabricManagement'
          },
          {
            parentEnName: 'Fabric',
            show: false,
            cnName: '面料分类',
            enName: 'FabricCategory',
            path: '/fabricCategory'
          }
        ]
      },
      {
        show: false,
        cnName: '仓库管理列表',
        enName: 'WarehouseManagement',
        path: '/warehouseManagement'
      },
      {
        show: false,
        cnName: '面料订单列表',
        enName: 'FabricOrder',
        path: '/fabricOrder'
      },
      {
        show: false,
        cnName: '职位管理列表',
        enName: 'PositionManagement',
        path: '/positionManagement'
      },
      {
        show: false,
        cnName: '员工管理列表',
        enName: 'StaffManagement',
        path: '/staffManagement'
      },
      {
        show: false,
        cnName: '企业用户管理列表',
        enName: 'UserManagement',
        path: '/userManagement'
      },
      {
        show: false,
        cnName: '库存管理列表',
        enName: 'InventoryManagement',
        path: '/inventoryManagement'
      },
      {
        show: false,
        cnName: '小程序配置列表',
        enName: 'AppletConfiguration',
        path: '/appletConfiguration'
      },
      {
        show: false,
        cnName: '物流月结列表',
        enName: 'LogisticsList',
        path: '/logisticsList'
      },
      {
        show: false,
        cnName: '放量记录列表',
        enName: 'VolumeRecordList',
        path: '/volumeRecordList'
      },

      {
        show: false,
        cnName: '财务',
        enName: 'Finance',
        type: 'submenu',
        children: [
          {parentEnName: 'Finance', show: false, cnName: '对账单', enName: 'AccountStatement', path: '/accountStatement'},
          {parentEnName: 'Finance', show: false, cnName: '充值', enName: 'Recharge', path: '/recharge'}
        ]
      },

      {
        show: false,
        cnName: '销售统计',
        enName: 'SalesStatistics',
        path: '/salesStatistics'
      },
      {
        show: false,
        cnName: '业务员统计',
        enName: 'SalesmanStatistics',
        path: '/salesmanStatistics'
      },
      {
        show: false,
        cnName: '库存预警',
        enName: 'InventoryWarning',
        path: '/inventoryWarning'
      },
      {
        show: false,
        enName: 'Setting',
        cnName: '设置',
        type: 'submenu',
        children: [
          { parentEnName: 'Setting', show: false, cnName: '面料优惠管理', enName: 'FabricDiscount', path: '/fabricDiscount'},
          { parentEnName: 'Setting', show: false, cnName: '报损审核列表', enName: 'LossReportAuditList', path: '/lossReportAuditList' },
          { parentEnName: 'Setting', show: false, cnName: '打印设置列表', enName: 'PrintSetupList', path: '/printSetupList' },
          { parentEnName: 'Setting', show: false, cnName: '月结帐号列表', enName: 'MonthlyAccountList', path: '/monthlyAccountList' },
          { parentEnName: 'Setting', show: false, cnName: '运费设置', enName: 'FreightSettings', path: '/freightSettings' }

        ]
      }

    ]
  },
  mutations: {
    set_dynamicRoutes(state, data) {
      state.dynamicRoutes = data
      utils.setDynamicRoutes(data)
    }
  },
  getters: {
    get_token: state => {
      return state.token
    }
  }
}
export default jurisdiction