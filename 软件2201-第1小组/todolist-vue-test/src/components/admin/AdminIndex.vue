<template>
  <!--系统管理员首页: index页面框架布局-->
  <el-container class="index">
    <el-header class="header">
      <el-row>
        <!--左侧logo区域-->
        <el-col :span="12" class="logo-container">
          <img src="../../assets/logo1.png" class="logo"/>
          <span class="title">消防器材管理控制台</span>
        </el-col>
        <!--右侧用户信息区域-->
        <el-col :span="12" class="user">
          <span>{{state.userInfo.userName}}</span>&nbsp;&nbsp;
          <el-link :underline="false" type="primary" @click="logout">
            <el-icon><switch-button /></el-icon>
          </el-link>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="lefter">
        <el-scrollbar >
          <el-menu
              class="el-menu-vertical"
              background-color="#324057"
              text-color="#fff"
              active-text-color="#409eff"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Menu /></el-icon>人员管理
              </template>
              <router-link to="/admin/userlist">
                <el-menu-item index="1-1">
                  <el-icon><User /></el-icon>用户管理
                </el-menu-item>
              </router-link>
              <router-link to="/admin/departmentlist">
                <el-menu-item index="1-2">
                  <el-icon><OfficeBuilding /></el-icon>部门管理
                </el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Menu /></el-icon>权限管理
              </template>
              <router-link to="/admin/charactermanage">
              <el-menu-item index="2-1">
                <el-icon><UserFilled /></el-icon>角色管理
              </el-menu-item>
              </router-link>
              <router-link to="/admin/storagemanage">
              <el-menu-item index="2-2">
                <el-icon><Key /></el-icon>仓库管理
              </el-menu-item>
              </router-link>
              <router-link to="/admin/goodsmanage">
              <el-menu-item index="2-3">
                <el-icon><Key /></el-icon>物品分类管理
              </el-menu-item>
              </router-link>
              <router-link to="/admin/todolist1">
              <el-menu-item index="2-4">
                <el-icon><Key /></el-icon>物品管理
              </el-menu-item>
              </router-link>
              <router-link to="/admin/todolist2">
              <el-menu-item index="2-5">
                <el-icon><Key /></el-icon>记录管理
              </el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Menu /></el-icon>个人中心
              </template>
              <router-link to="/admin/userinfo">
                <el-menu-item index="3-1">
                  <el-icon><Avatar /></el-icon>个人信息
                </el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-menu-item index="5" @click="logout">
              <el-icon><SwitchButton /></el-icon>退出系统
            </el-menu-item>

          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="content">
        <el-scrollbar>
          <!--通过router-view加载其他组价-->
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
//注意：vue3.x组合式api，需要在<script>里面使用setup

import {reactive,onMounted} from "vue";
//使用useRouter()使用路由器对象
import { useRouter } from 'vue-router'
const router = useRouter();

//定义响应数据
let state = reactive({
  userInfo:{
    loginId:'',
    userName:'',
    mobile:'',
    email:''
  }
})

//使用生命周期函数
onMounted (()=>{
  //获得登录用户信息
  if(sessionStorage.getItem('userInfo') != null){
    state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }
  //默认显示页面
  router.push("/admin/home")
})

//定义自用方法(箭头函数形式)
const logout = () =>{
  sessionStorage.removeItem('userInfo')
  router.push('/')
}
</script>

<style scoped>
/*定义index页面的布局及样式*/
.index {
  width: 100%;
  height: 100%;
}
/*头部样式*/
.header {
  box-sizing: border-box;
  width: 100%;
  height: 72px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #324057;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 20px;
}

.container{
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 72px);
}

/*左侧菜单样式*/
.lefter {
  box-sizing: border-box;
  width: 220px;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: #324057;
}
.el-menu {
  border: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
  margin: 0;
  padding: 0;

}
.el-menu-vertical {
  margin: 0;
  width: 220px;
  margin: 0;
  padding: 0;

}
.el-submenu .el-menu-item {
  min-width: 220px;
}
.el-menu-item{
  width: 220px;
}
a {
  text-decoration: none;
}

.el-menu-item.is-active{
  background-color: #296a4d;
}

.content {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>