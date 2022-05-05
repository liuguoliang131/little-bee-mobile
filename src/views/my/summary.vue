<!--
 * @Date: 2022-05-05 17:10:34
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-05 18:49:32
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
import * as echarts from 'echarts'
import {
  Popup,
  Field,
  Picker
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
      topInstance: null,
      bottomInstance: null
    }
  },
  methods: {
    handleMonthConfirm(e) {
      console.log(e)
      this.month = e
      this.showPicker = false
    },
    // 生成线型图
    initEcharts () {
      var chartDom = document.getElementById('top')
      this.topInstance = echarts.init(chartDom)
      var option
      let xAxisNameList = ['啊啊啊','阿三','二','轻为','asd']
      let yAxisDataList = [1,2,3,4,5]
      let yAxisDataList2 = [3,5,76,1,2]
      // this.tendencyChart.forEach(item => {
      //   xAxisNameList.push(item.date)
      //   yAxisDataList.push(item.amount)
      // })
      option = {
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
            name: 'Union Ads',
            data: yAxisDataList,
            type: 'line',
            areaStyle: {}
          },
          {
            name: 'Email',
            data: yAxisDataList2,
            type: 'line',
            areaStyle: {}
          }
        ],
        legend: { //颜色标志
          data: ['Email', 'Union Ads']
        },
      }

      option && this.topInstance.setOption(option)
    },
    initBottomEcharts() {
      var chartDom = document.getElementById('bottom')
      this.bottomInstance = echarts.init(chartDom)
      var option
      let xAxisNameList = [1,2,3,4,5]
      let yAxisDataList = [1,2,3,4,5]
      // this.tendencyChart.forEach(item => {
      //   xAxisNameList.push(item.date)
      //   yAxisDataList.push(item.amount)
      // })
      option = {
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
    this.initEcharts()
    this.initBottomEcharts()
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