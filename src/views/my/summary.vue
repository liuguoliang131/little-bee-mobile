<!--
 * @Date: 2022-05-05 17:10:34
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-09 19:10:20
 * @FilePath: \little-bee-mobile\src\views\my\summary.vue
 * @Description: 汇总统计
-->
<template>
  <div class="summary">
    <bread></bread>
    <div class="views">
      <van-field
        v-model="month"
        is-link
        readonly
        name="picker"
        label="月份"
        placeholder="点击选择月份"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="handleMonthConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div id="top"></div>
      <div id="bottom"></div>
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import { h5_performanceStatistics_companyStatistics } from '@/http/api'
import * as echarts from 'echarts'
import {
  Popup,
  Field,
  Picker,
  Toast
} from 'vant'
export default {
  name:'summary',
  components: {
    Bread,
    VanPopup:Popup,
    VanField:Field,
    VanPicker:Picker
  },
  data() {
    return {
      showPicker:false,
      columns:[
        '全部',
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      month:null,
      data:[],
      topInstance: null,
      bottomInstance: null
    }
  },
  methods: {
    handleMonthConfirm(e) {
      console.log(e)
      this.month = e
      this.showPicker = false
      let statisticsData = ''
      let year = new Date().getFullYear()
      switch (this.month) {
        case '全部':
          statisticsData = ''
          break
        case '1月':
          statisticsData = year + '-01'
          break
        case '2月':
          statisticsData = year + '-02'
          break
        case '3月':
          statisticsData = year + '-03'
          break
        case '4月':
          statisticsData = year + '-04'
          break
        case '5月':
          statisticsData = year + '-05'
          break
        case '6月':
          statisticsData = year + '-06'
          break
        case '7月':
          statisticsData = year + '-07'
          break
        case '8月':
          statisticsData = year + '-08'
          break
        case '9月':
          statisticsData = year + '-09'
          break
        case '10月':
          statisticsData = year + '-10'
          break
        case '11月':
          statisticsData = year + '-11'
          break
        case '12月':
          statisticsData = year + '-12'
          break
        default:
          statisticsData = ''
          break
      }
      this.getStatistic(statisticsData)
    },
    async getStatistic(statisticsData) {
      const params = {
        statisticsData
      }
      const res = await this.$http.post(h5_performanceStatistics_companyStatistics,params)
      if(!res.success) {
        return Toast(res.msg)
      }
      this.data = res.model || []
      this.initEcharts()
      this.initBottomEcharts()
    },
    // 生成线型图
    initEcharts () {
      var chartDom = document.getElementById('top')
      this.topInstance = echarts.init(chartDom)
      var option
      let xAxisNameList = this.data.map(item=>item.billData)
      let yAxisDataList = this.data.map(item=>item.finishedProductCount)
      option = {
        title: {
          text: '任务'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisNameList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.$store.state.user.userInfo.companyName,
            data: yAxisDataList,
            type: 'line',
            areaStyle: {}
          }
        ],
        legend: { //颜色标志
          data: ['Email']
        },
      }

      option && this.topInstance.setOption(option)
    },
    initBottomEcharts() {
      var chartDom = document.getElementById('bottom')
      this.bottomInstance = echarts.init(chartDom)
      var option
      let xAxisNameList = this.data.map(item=>item.billData)
      let yAxisDataList = this.data.map(item=>item.totalPrice)
      option = {
        title: {
          text: '总收入(元)'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisNameList
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: yAxisDataList,
          type: 'line',
          areaStyle: {}
        }]
      }

      option && this.bottomInstance.setOption(option)
    }
  },
  mounted() {
    this.getStatistic('')
  }
}
</script>

<style scoped lang="less">
.summary {
  background-color: #f7f7f7;
  #top {
    width: 345px;
    height: 282.5px;
    margin: 15px 0 15px 15px;
    background-color: #fff;
    border-radius: 5px;
  }
  #bottom {
    width: 345px;
    height: 282.5px;
    margin: 15px 0 15px 15px;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>