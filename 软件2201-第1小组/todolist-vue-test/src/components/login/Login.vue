<template>
  <!--登录框div的样式-->
  <div class="login">
    <el-card class="loginCard" shadow="always">
      <el-form :model="mymodel"
               :rules="myrule"
               ref="loginFormRef">
        <h2 style="text-align: center">消防器材管理系统</h2>
        <el-form-item prop="loginId">
          <el-input
              type="text"
              v-model="mymodel.loginId"
              auto-complete="off"
              placeholder="登录账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="currentPassword">
          <el-input
              type="password"
              v-model="mymodel.currentPassword"
              auto-complete="off"
              placeholder="登录密码">
          </el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              @click="login(loginFormRef)"
              style="width: 100%">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      试用账号 lisi/密码lisi
    </el-card>
  </div>
</template>

<script setup>
//注意：vue3.x组合式api，需要在<script>里面使用setup

import {ref, reactive} from "vue";
import {ElMessage} from 'element-plus';

//导入axios实例(从封装的http.js中导入)
import http from "../../util/http.js";
//使用useRouter()使用路由器对象
import {useRouter} from 'vue-router'

const router = useRouter();

//把表单定义为一个响应数据对象
const loginFormRef = ref();

const mymodel = reactive({
  userId: '',
  loginId: '',
  currentPassword: '',
  userName: ''
})
const myrule = reactive({
  loginId: [
    {required: true, message: '请输入登录账号', trigger: 'blur'},
  ],
  currentPassword: [
    {required: true, message: '请输入登录密码', trigger: 'blur'},
  ]
})

//登录验证函数
const login = async (form) => {
  await form.validate((valid) => {
    if (valid) {
      //到后台验证用户
      http.post('/login', mymodel).then(res => {
        if (res.status == '200' || res.status == '201') {
          //验证成功
          //创建一个本地会话，存放用户信息
          let userInfo = res.data;
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          //路由跳转:根据角色跳转到不同的入口
          if (userInfo.userType == '0') {
            router.push('/admin/index')
          } else if (userInfo.userType == '1') {
            router.push('/admin/index')
          }
        } else {
          //验证失败
          ElMessage.error({
            message: '用户名和密码错误，请重新登录！'
          })
          //路由跳转:跳转到重新登录页面
          router.push('/login')
        }
      })
    } else {
      ElMessage.error({
        message: '用户名和密码不能为空！'
      })
      return false;
    }
  });
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url("../../assets/01.jpg");
  background-size: cover;
}

.loginCard {
  position: relative;
  top: 150px;
  width: 500px;
  margin: 0 auto;
  padding: 0 20px
}
</style>