<template>
  <el-card>
    <template #header>
      <div>
        <span>用户列表</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button class="button"
                   size="small"
                   @click="onAdd()"
                   type="primary">
          注册用户
        </el-button>
      </div>
    </template>
    <div class="table-container">
      <el-table
          :data="state.list"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            prop=""
            label=""
            width="50">
        </el-table-column>
        <el-table-column
            prop="loginId"
            label="账号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="userType"
            label="用户类型"
            width="150">
          <template #default="scope">
            <span v-if="scope.row.userType == '0'">系统管理员</span>
            <span v-if="scope.row.userType == '1'">普通账号</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="电话号码">
        </el-table-column>
        <el-table-column
            prop="currentStatus"
            label="状态"
            width="60">
          <template #default="scope">
            <span v-if="scope.row.currentStatus == '0'">正常</span>
            <span v-if="scope.row.currentStatus == '1'">禁用</span>
          </template>
        </el-table-column>
        <el-table-column
            prop=""
            label="操作"
            align="center"
            width="150">
          <template #default="scope">
            <el-button size="small" plain
                       type="primary"
                       @click="onEdit(scope.$index)">&nbsp;修改</el-button>
            <el-popconfirm
                title="确定删除该数据吗？"
                @confirm="onDelete(scope.$index)"
            >
              <template #reference>
                <el-button size="small" plain
                           type="danger">&nbsp;删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--注册用户对话框-->
    <el-dialog
        width="50%"
        v-model="state.dialogAdd.show"
        :title="state.dialogAdd.title"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body='false'>
      <!--使用el-form组件进行数据添加和修改-->
      <el-form
          ref="myformAdd"
          :model="state.mymodel"
          label-width="150px"
          style="margin:10px;width:auto;">
        <el-form-item label="登录账号" required>
          <el-col :span="15">
            <el-form-item prop='loginId'>
              <el-input type="string" v-model="state.mymodel.loginId"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码" required>
          <el-col :span="15">
            <el-form-item prop='currentPassword'>
              <el-input type="password" v-model="state.mymodel.currentPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop='currentPassword2' label="重复密码">
          <el-col :span="15">
            <el-input type="password" v-model="state.mymodel.currentPassword2"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop='userType' label="账号类型:">
          <!--使用label表示值-->
          <el-radio-group v-model="state.mymodel.userType">
            <el-radio-button label="0">系统管理员</el-radio-button>
            <el-radio-button label="1">普通账号</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-col :span="15">
            <el-form-item prop='userName'>
              <el-input type="string" v-model="state.mymodel.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop='mobile' label="手机号码:">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.mobile"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop='email' label="电子邮箱:">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="状态">
          <el-col :span="15">
            <el-form-item prop='currentStatus'>
              <el-input type="string" v-model="state.mymodel.currentStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button type="primary" @click='onAddSave(myformAdd)'>保 存</el-button>
          <el-button @click="state.dialogAdd.show = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--修改用户信息对话框-->
    <el-dialog
        width="50%"
        v-model="state.dialogEdit.show"
        :title="state.dialogEdit.title"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body='false'>

      <!--使用el-form组件进行数据添加和修改-->
      <!--:rules="myrulesEdit"设置表单检验规则-->
      <el-form
          ref="myformEdit"
          :model="state.mymodel"
          label-width="150px"
          style="margin:10px;width:auto;">
        <el-form-item label="登录账号">
          <el-col :span="15">
            <el-form-item prop='loginId'>
              <el-input type="string" readonly v-model="state.mymodel.loginId"></el-input>账号不能修改
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop='userType' label="账号类型:">
          <!--使用label表示值-->
          <el-radio-group v-model="state.mymodel.userType">
            <el-radio-button label="0">系统管理员</el-radio-button>
            <el-radio-button label="1">普通账号</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="姓名" required>
          <el-col :span="15">
            <el-form-item prop='userName'>
              <el-input type="string" v-model="state.mymodel.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item prop='mobile' label="手机号码:">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.mobile"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop='email' label="电子邮箱:">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="状态">
          <el-col :span="15">
            <el-form-item prop='currentStatus'>
              <el-input type="string" v-model="state.mymodel.currentStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button type="primary" @click='onEditSave(myformEdit)'>保 存</el-button>
          <el-button @click="state.dialogEdit.show = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </el-card>
</template>

<script setup>
//注意：vue3.x组合式api，需要在<script>里面使用setup

import {ref,reactive,onMounted} from "vue";
import { ElMessage } from 'element-plus';

//导入axios实例(从封装的http.js中导入)
import http from "../../util/http.js";

//使用一个reactive方法让状态作为响应式对象
const state = reactive({
  list:[
    {
      userId:'111111',
      loginId:'admin',
      currentPassword:'1111',
      userName:'系统管理员admin',
      email:'admin@hbxy.cn',
      mobile:'18888888888',
      userType:'0',
      currentStatus:'0'
    },
    {
      userId:'22222',
      loginId:'zhangsan',
      currentPassword:'1111',
      userName:'张三',
      email:'zhangsan@hbxy.cn',
      mobile:'18888888888',
      userType:'1',
      currentStatus:'0'
    },
    {
      userId:'33333',
      loginId:'lisi',
      currentPassword:'1111',
      userName:'李四',
      email:'lisi@hbxy.cn',
      mobile:'18888888888',
      userType:'1',
      currentStatus:'1'
    }
  ],
  mymodel:{
    userId:'',
    userName:'',
    currentPassword:'',
    currentPassword2:'',
    email: '',
    mobile:'',
    userType:'1',
    currentStatus:'0'
  },
  dialogAdd:{
    title:'',
    show:false,
    option:''
  },
  dialogEdit:{
    title:'',
    show:false,
    option:''
  },
  item:{},
  selectedIndex:-1,
})

//生命周期钩子
onMounted(() =>{
  http.get("/user").then(res=>{
    if(res.status === 200){
      //更新表格
      state.list = res.data;
    }
  }).catch(err=>{
    console.log(err)
    ElMessage.error('获取数据失败');
  })
})

//响应注册按钮,打开注册对话框
const onAdd = () =>{
  //清空表单
  state.mymodel = {
    userId:'',
    userName:'',
    currentPassword:'',
    currentPassword2:'',
    email: '',
    mobile:'',
    userType:'1',
    currentStatus:'0'
  }
  //弹出注册对话框
  state.dialogAdd = {
    title: '用户注册',
    show: true,
    option: 'add'
  }

}

//响应注册对话框保存按钮
const myformAdd = ref();
const onAddSave = async (form)=>{
  await form.validate(valid=>{
    if(valid){
      http.post("/user",state.mymodel).then(res=>{
        // 操作成功
        ElMessage({
          message: "保存成功！",
          type: "success"
        });

        //跟新表格
        state.list.push(res.data);

        //清空表单
        state.mymodel = {
          userId:'',
          userName:'',
          currentPassword:'',
          currentPassword2:'',
          email: '',
          mobile:'',
          userType:'1',
          currentStatus:'0'
        }

        //关闭对话框
        state.dialogAdd = {
          title: '',
          show: false,
          option: ''
        }

      })
    }

  })
}

//响应修改按钮,打开修改对话框
const onEdit = (index) =>{
  //获得要修改用户的信息
  let user = state.list[index];
  //临时保存选中的索引
  state.selectedIndex = index;
  //回填数据
  state.mymodel = {
    userId:user.userId,
    loginId:user.loginId,
    userName:user.userName,
    currentPassword:'',
    currentPassword2:'',
    email: user.email,
    mobile:user.mobile,
    userType:user.userType,
    currentStatus:user.currentStatus
  },

      //弹出注册对话框
      state.dialogEdit = {
        title: '修改用户信息',
        show: true,
        option: 'add'
      }
}

//响应修改对话框保存按钮
const myformEdit = ref()
const onEditSave = async (form)=>{
  await form.validate(valid=>{
    if(valid){
      http.put("/user",state.mymodel).then(res=>{
        //操作成功
        ElMessage({
          message: "保存成功！",
          type: "success"
        });

        //更新表格
        state.list.splice(state.selectedIndex,1,res.data)
        //清空表单
        state.mymodel = {
          userId:'',
          userName:'',
          currentPassword:'',
          currentPassword2:'',
          email: '',
          mobile:'',
          userType:'1',
          currentStatus:'0'
        }
        //重置selectedIndex
        state.selectedIndex = -1;
        //关闭对话框
        state.dialogEdit = {
          title: '',
          show: false,
          option: ''
        }
      })
    }
  })
}
//响应删除按钮
const onDelete = (index) =>{
  //删除被选中的数据
  let userId = state.list[index].userId;
  http.delete("/user/" + userId).then(res => {
    if (res.data == 200){
      ElMessage("删除成功");
      // 删除table起始下标为1，长度为1的一个值
      state.list.splice(index, 1);
    }
  });
}

</script>

<style scoped>
.table-container{
  text-align: right;
}
</style>