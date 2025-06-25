<template>
  <el-card>
    <template #header>
      <div>
        <span>物品管理</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button class="button"
                   size="small"
                   @click="onAdd()"
                   type="primary">
          添加物品
        </el-button>
      </div>
    </template>
    <el-table
        :data="todolist"
        :stripe="true"
        style="width:100%">
      <el-table-column
          type="index"
          label=""
          align="center"
          width="60">
      </el-table-column>
      <el-table-column
          prop="itemName"
          label="物品名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="itemGoods"
          label="仓库"
          width="170">
      </el-table-column>
      <el-table-column
          prop="itemCategory"
          label="分类"
          width="170">
      </el-table-column>
      <el-table-column
          prop="itemNum"
          label="数量"
          width="100">
      </el-table-column>
      <el-table-column
          prop="itemDate"
          label="历史修改时间"
          width="120">
        <template #default="scope">
          <span v-text="formatDate(scope.row.itemDate)"></span>
        </template>
      </el-table-column>
      <el-table-column
          prop="currentStatus"
          label="状态"
          align="center"
          width="150">
        <template #default="scope">
          <span v-if="scope.row.currentStatus=='0'">
            <el-icon :size="30" color="#008000FF" ><VideoPlay /></el-icon>
          </span>
          <span v-if="scope.row.currentStatus=='1'">
            <el-icon :size="30" color="#008000FF"><SuccessFilled /></el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column
          prop=""
          label="操作"
          align="center">
        <template #default="scope">
          <span v-if="scope.row.currentStatus=='0'">
            <el-button size="small"
                       plain type="primary"
                       @click="onEdit(scope.$index)">修改</el-button>
          </span>
          <span v-if="scope.row.currentStatus=='1'">
                        <el-button size="small"
                                   disabled
                                   plain type="primary"
                                   @click="onEdit(scope.$index)">修改</el-button>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button size="small"
                     plain type="danger"
                     @click="onDelete(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        v-model:current-page = "pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :total="pagination.totalSize"
        layout="total,prev, pager, next">
    </el-pagination>

    <!--对话框-->
    <el-dialog
        width="40%"
        v-model="dialog.show"
        :title="dialog.title"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body='false'>
      <el-form
          :model="mymodel"
          :rules="myrule"
          ref="myform">
        <el-form-item label="任务名称" required prop="itemName">
          <el-col :span="15">
            <el-input
                type="text"
                v-model="mymodel.itemName">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="任务日期" required prop="itemDate">
          <el-col :span="15">
            <el-date-picker
                v-model="mymodel.itemDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>

        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click='onSave("myform")'>保 存</el-button>
        <el-button @click="dialog.show = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
//注意：选项式api，不需要在<script>里面使用setup,兼容vue2.x写法

//导入axios实例(从封装的http.js中导入)
import http from "../../util/http.js";

import {ElMessage} from "element-plus";

export default {
  name: "TodoList",
  // 定义响应式数据
  data: function () {
    return {
      todolist: [],
      mymodel:{
        userId: "",
        itemId: "",
        itemName: "",
        itemDate: "",
        currentStatus: 0
      },
      myrule:{
        itemName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' },
        ],
        itemDate: [
          { required: true, message: '任务日期不能为空', trigger: 'blur' },
        ]
      },
      dialog:{
        title:'',
        show: false,
        option: ''
      },
      selectedIndex:-1,
      userInfo:{},
      //翻页参数
      pagination:{
        pageNum: 1,      //当前页(默认第一页,element-plus的页码从1开始)
        pageSize: 5,     //每页显示条目个数
        totalPages: 0,   //总记录数
        totalSize: 0,    //总页数
      },
      itemCurrentStatus: '' //查询任务当前状态,''默认为所有任务
    }
  },
  //生命周期函数
  mounted() {
    this.initTable();
  },
  //定义各种函数
  methods: {
    //初始化表格
    initTable(){

      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      //传递查询参数及翻页参数到后端服务接口
      const params = {
        userId: this.userInfo.userId,
        currentStatus: this.itemCurrentStatus,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum
      };
      http.get("/todo", {params: params}).then(res => {
        //更新表格
        this.todolist = res.data.list;
        //更新翻页数据
        this.pagination = {
          pageNum: res.data.pageNum,      //当前页(默认第一页)
          pageSize: res.data.pageSize,     //每页显示条目个数
          totalPages: res.data.totalPages,   //总记录数
          totalSize: res.data.totalSize,    //总页数
        }
      })
    },

    //打开添加任务对话框
    onAdd: function () {
      //清空表单旧数据
      this.mymodel = {
        userId: "",
        itemId: "",
        itemName: "",
        itemDate: "",
        currentStatus: 0
      }

      //打开对话框
      this.dialog={
        title:'添加任务',
        show: true,
        option: 'add'
      }
    },
    //打开修改任务对话框
    onEdit:function (index) {
      //回填表单
      let item = this.todolist[index];
      this.mymodel = {
        userId: item.userId,
        itemId: item.itemId,
        itemName: item.itemName,
        itemDate: item.itemDate,
        currentStatus: item.currentStatus
      }
      //临时保存选中的索引
      this.selectedIndex = index
      //打开对话框
      this.dialog={
        title:'修改任务',
        show: true,
        option: 'edit'
      }

    },
    //保存
    onSave(formName){
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      if(this.dialog.option == 'add'){
        //添加保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.mymodel.userId = this.userInfo.userId;

            http.post("/todo",this.mymodel).then(res=>{
              //console.log(res.data)
              ElMessage({
                message: '添加成功！',
                type: 'success'
              })
              //更新表格
              //this.todolist.push(res.data)
              this.initTable();

              //清空表单旧数据
              this.mymodel = {
                userId: "",
                itemId: "",
                itemName: "",
                itemDate: "",
                currentStatus: 0
              }
              //关闭对话框
              this.dialog={
                title:'',
                show: false,
                option: ''
              }
            })
          }
        })
      }else if(this.dialog.option == 'edit'){
        //修改保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http.put("/todo",this.mymodel).then(res=>{
              //console.log(res.data)
              ElMessage({
                message: '修改成功！',
                type: 'success'
              })
              //更新表格
              this.initTable();
              //清空表单旧数据
              this.mymodel = {
                userId: "",
                itemId: "",
                itemName: "",
                itemDate: "",
                currentStatus: 0
              }
              //关闭对话框
              this.dialog={
                title:'',
                show: false,
                option: ''
              }
            })
          }
        })
      }
    },
    //完成任务
    onComplete: function (index) {
      let item = this.todolist[index]
      item.currentStatus = 1
      http.put("/todo", item).then(res => {
        ElMessage({
          message: '任务完成！',
          type: 'success'
        })
        //this.todolist.splice(index, 1, res.data)
        this.initTable();
      })
    },
    //重置任务
    onReset: function (index) {
      let item = this.todolist[index]
      item.currentStatus = 0
      http.put("/todo", item).then(res => {
        ElMessage({
          message: '任务重置成功！',
          type: 'success'
        })
        //this.todolist.splice(index, 1, res.data)
        this.initTable();
      })
    },
    //删除任务
    onDelete: function (index) {
      http.delete("/todo/" + this.todolist[index].itemId).then(res => {
        if (res.data == '200') {
          ElMessage('删除成功！')
          this.todolist.splice(index, 1)
        }
      })
    },
    //时间格式化成中国时间
    formatDate:function (itemDate) {
      let date = new Date(itemDate);
      let seperator = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator + month + seperator + strDate;
      return currentdate;
    },
    //处理翻页
    handleCurrentChange:function (val) {
      this.pagination.pageNum = val;
      //每次翻页都从后端重新查询数据
      this.initTable();
    }
  }
}
</script>

<style scoped>

</style>