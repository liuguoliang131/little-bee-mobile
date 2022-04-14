<template>
  <div class="Container">
    <el-container>
      <el-aside class="aside" style="background-color: rgb(144, 147, 153)">
        <el-menu :default-openeds="menuList.map((item,idx)=>idx)">
          <template v-for="(menu,index) in menuList">
            <el-submenu v-if="menu.type==='submenu'" :index="index" :key="index">
              <template slot="title"><i class="el-icon-message"></i>{{menu.cnName}}</template>
              <el-menu-item v-for="(menu1,index1) in menu.children" :key="index1" :index="index1">{{menu1.cnName}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="index" :key="index">{{menu.cnName}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header>
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'
export default {
  components:{
    ElContainer:Container,
    ElMain:Main,
    ElHeader:Header,
    ElAside:Aside,
    ElMenu:Menu,
    ElSubmenu:Submenu,
    ElMenuItem:MenuItem,
    ElDropdown:Dropdown,
    ElDropdownMenu:DropdownMenu,
    ElDropdownItem:DropdownItem
  },
  name:'Container',
  data() {
    return {
      menuList:this.$store.state.jurisdiction.dynamicRoutes
    }
  }
}
</script>

<style scoped lang="scss">
.Container {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: flex-end;
}

.el-aside {
  color: #333;
  width: 200px;
  height: 100vh;
  overflow-y: scroll;
  transition: all 1s;
}
</style>