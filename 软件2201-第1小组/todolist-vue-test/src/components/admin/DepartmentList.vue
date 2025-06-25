<template>
  <el-card>
    <template #header>
      <div>
        <span>部门列表</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button class="button"
                   size="small"
                   @click="onAdd()"
                   type="primary">
          添加部门
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
            prop="departmentName"
            label="部门名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="departmentPeople"
            label="部门人数"
            width="100">
        </el-table-column>
        <el-table-column
            prop="manager"
            label="部门经理"
            width="120">
        </el-table-column>
        <el-table-column
            prop="managerMobile"
            label="经理电话"
            width="180">
        </el-table-column>
        <el-table-column
            prop="managerEmail"
            label="经理邮箱"
        >
        </el-table-column>
        <el-table-column
            prop="createdTime"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="currentStatus"
            label="状态"
            width="60">
          <template #default="scope">
            <span v-if="scope.row.currentStatus == '0'">正常</span>
            <span v-if="scope.row.currentStatus == '1'">停用</span>
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
        <el-form-item label="部门名称" required>
          <el-col :span="15">
            <el-form-item prop='departmentName'>
              <el-input type="string" v-model="state.mymodel.departmentName"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="部门人数" required>
          <el-col :span="15">
            <el-form-item prop='departmentPeople'>
              <el-input type="string" v-model="state.mymodel.departmentPeople"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="部门经理" required>
          <el-col :span="15">
            <el-form-item prop='manager'>
              <el-input type="string" v-model="state.mymodel.manager"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop='managerMobile' label="经理电话">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.managerMobile"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop='managerEmail' label="经理邮箱">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.managerEmail"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间" required>
          <el-col :span="15">
            <el-date-picker
                v-model="state.mymodel.createdTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="YYYY-MM-DD HH:mm:ss">
            </el-date-picker>
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
        <el-form-item label="部门名称">
          <el-col :span="15">
            <el-form-item prop='departmentName'>
              <el-input type="string" v-model="state.mymodel.departmentName"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="部门人数">
          <el-col :span="15">
            <el-form-item prop='departmentPeople'>
              <el-input type="string" v-model="state.mymodel.departmentPeople"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="部门经理">
          <el-col :span="15">
            <el-form-item prop='manager'>
              <el-input type="string" v-model="state.mymodel.manager"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop='managerMobile' label="经理电话">
          <el-col :span="15">
            <el-input type="string" v-model="state.mymodel.managerMobile"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="经理邮箱">
          <el-col :span="15">
            <el-form-item prop='managerEmail'>
              <el-input type="string" v-model="state.mymodel.managerEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="状态">
          <el-col :span="15">
            <el-form-item prop='currentStatus'>
              <el-input type="string" v-model="state.mymodel.currentStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="15">
            <el-date-picker
                v-model="state.mymodel.createdTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="YYYY-MM-DD HH:mm:ss">
            </el-date-picker>
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
      departmentId:'0001',
      departmentName:'物资管理部门',
      manager:'张三',
      managerMobile:'18888888888'
    },
    {
      departmentId:'0002',
      departmentName:'人员管理部门',
      manager:'李四',
      managerMobile:'18888888888',
    }
  ],
  mymodel:{
    departmentId:'',
    deparmentPeople:'',
    departmentName:'',
    manager:'',
    managerMobile:'',
    createdTime: '',
    managerEmail:'',
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
  http.get("/department").then(res=>{
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
    departmentId:'',
    deparmentPeople:'',
    departmentName:'',
    manager:'',
    managerMobile:'',
    managerEmail:'',
    createdTime: '',
    currentStatus:'0'
  }
  //弹出注册对话框
  state.dialogAdd = {
    title: '添加部门',
    show: true,
    option: 'add'
  }

}

//响应注册对话框保存按钮
const myformAdd = ref();
const onAddSave = async (form)=>{
  await form.validate(valid=>{
    if(valid){
      state.mymodel.createdTime = new Date(state.mymodel.createdTime).toISOString();
      http.post("/department",state.mymodel).then(res=>{
        // 操作成功
        ElMessage({
          message: "保存成功！",
          type: "success"
        });

        //跟新表格
        state.list.push(res.data);

        //清空表单
        state.mymodel = {
          departmentId:'',
          deparmentPeople:'',
          departmentName:'',
          manager:'',
          managerMobile:'',
          managerEmail:'',
          createdTime: '',
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
  let department = state.list[index];
  //临时保存选中的索引
  state.selectedIndex = index;
  //回填数据
  state.mymodel = {
    departmentId:department.departmentId,
    departmentName:department.departmentName,
    departmentPeople:department.departmentPeople,
    manager:department.manager,
    managerMobile:department.managerMobile,
    managerEmail:department.managerEmail,
    createdTime: department.createdTime
  },

      //弹出注册对话框
      state.dialogEdit = {
        title: '修改部门信息',
        show: true,
        option: 'add'
      }
}

//响应修改对话框保存按钮
const myformEdit = ref()
const onEditSave = async (form)=>{
  await form.validate(valid=>{
    if(valid){
      state.mymodel.createdTime = new Date(state.mymodel.createdTime).toISOString();
      http.put("/department",state.mymodel).then(res=>{
        //操作成功
        ElMessage({
          message: "保存成功！",
          type: "success"
        });

        //更新表格
        state.list.splice(state.selectedIndex,1,res.data)
        //清空表单
        state.mymodel = {
          departmentId:'',
          deparmentPeople:'',
          departmentName:'',
          manager:'',
          managerMobile:'',
          managerEmail:'',
          createdTime: ''
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
  let departmentId = state.list[index].departmentId;
  http.delete("/department/" + departmentId).then(res => {
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