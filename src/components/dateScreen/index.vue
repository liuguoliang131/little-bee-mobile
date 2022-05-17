<!--
 * @Date: 2022-05-17 16:41:52
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-05-17 17:47:36
 * @FilePath: \little-bee-mobile\src\components\dateScreen\index.vue
 * @Description: 
-->
<template>
  <div class="date-screen">
    <van-icon name="arrow-left"
              @click="yesterday" />
    {{value}}
    <van-icon name="arrow"
              @click="tomorrow" />
  </div>
</template>

<script>
import {
  Icon
} from 'vant'
export default {
  name: 'DateScreen',
  components: {
    VanIcon: Icon
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    tomorrow() {
      if (!this.value) {
        const date = this.$utils.getToday()
        this.$emit('input', date)
        this.$emit('change', date)
        return false
      }
      const next = new Date(new Date(this.value).getTime() + 24 * 60 * 60 * 1000)
      console.log('next', next)
      const nextVal = this.$utils.formatTimeDate(next)
      this.$emit('input', nextVal)
      this.$emit('change', nextVal)
    },
    yesterday() {
      if (!this.value) {
        const date = this.$utils.getToday()
        this.$emit('input', date)
        this.$emit('change', date)
        return false
      }
      const prev = new Date(new Date(this.value).getTime() - 24 * 60 * 60 * 1000)
      console.log('prev', prev)
      const prevVal = this.$utils.formatTimeDate(prev)
      this.$emit('input', prevVal)
      this.$emit('change', prevVal)
    }
  }
}
</script>

<style scoped lang="less">
.date-screen {
  width: 160px;
  height: 32px;
  border: 1px solid #bbbbbb;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .van-icon-arrow-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30px;
    text-align: center;
    line-height: 32px;
    color: #bbbbbb;
    &:active {
      color: #cb9400;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .van-icon-arrow {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 30px;
    text-align: center;
    line-height: 32px;
    color: #bbbbbb;
    &:active {
      color: #cb9400;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>