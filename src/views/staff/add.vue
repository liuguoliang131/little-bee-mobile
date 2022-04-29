<!--
 * @Date: 2022-04-29 16:50:15
 * @LastEditors: 刘国亮
 * @LastEditTime: 2022-04-29 18:01:36
 * @FilePath: \little-bee-mobile\src\views\staff\add.vue
 * @Description: 添加员工
-->
<template>
  <div class="staffAdd">
    <bread></bread>
    <div class="views">
      
    </div>
  </div>
</template>

<script>
import Bread from '@/components/bread/index'
import {
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Pagination
} from 'vant'
export default {
  name: 'StaffAdd',
  components: {
    Bread,
    VanButton:Button,
    VanIcon:Icon,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    VanPagination: Pagination
  }
}
</script>

<style scoped lang="less">
.staffAdd {

}
</style>