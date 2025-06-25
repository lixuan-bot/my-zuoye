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
        :data="todolist1"
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
          width="150">
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
        <el-form-item label="物品名称" required prop="itemName">
          <el-col :span="15">
            <el-input
                type="text"
                v-model="mymodel.itemName">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="仓库" required prop="itemGoods" >
          <el-col :span="15">
            <el-input
                type="text"
                v-model="mymodel.itemGoods">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="分类" required prop="itemCategory" >
          <el-col :span="15">
            <el-input
                type="text"
                v-model="mymodel.itemCategory">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="数量" required prop="itemNum" >
          <el-col :span="15">
            <el-input
                type="number"
                v-model="mymodel.itemNum">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="历史修改日期" required prop="itemDate">
          <el-col :span="15">
            <el-date-picker
                v-model="mymodel.itemDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="状态"required prop="currentStatus">
              <el-input
                  type="string"
                  v-model="mymodel.currentStatus">
              </el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary"  @click='onSave("myform")'>保 存</el-button>
        <el-button @click="dialog.show = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import http from "../../util/http.js";

import {ElMessage} from "element-plus";
export default {
  name: "itemmanagement",
  // 定义响应式数据
  data: function () {
    return {
      todolist1: [
        {
        itemId: '0001',
        itemName: '消防栓',
        itemGoods: '56仓库',
        itemCategory: '2类',
        itemNum: '202',
        itemDate: '2019-06-18 00:00:00',
        currentStatus:'0'
      },
        {
          itemId: '0002',
          itemName: '消防锤',
          itemGoods: '31仓库',
          itemCategory: '5类',
          itemNum: '55',
          itemDate: '2019-06-18 00:00:00',
          currentStatus: '0'
        }
      ],
      mymodel:{
        userId: "",
        itemId: "",
        itemName: "",
        itemGoods: "",
        itemCategory: "",
        itemNum: "",
        itemDate: "",
        currentStatus: 0
      },
      myrule:{
        itemName: [
          { required: true, message: '物品名称不能为空', trigger: 'blur' },
        ],
        itemGoods: [
          { required: true, message: '仓库不能为空', trigger: 'blur' },
        ],
        itemCategory: [
          { required: true, message: '分类不能为空', trigger: 'blur' },
        ],
        itemNum: [
          { required: true, message: '数量不能为空', trigger: 'blur' },
        ],
        itemDate: [
          { required: true, message: '历史修改日期不能为空', trigger: 'blur' },
        ],
        currentStatus: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      },
      dialog:{
        title:'',
        show: false,
        option: ''
      },
      selectedIndex:-1,
      userInfo:{},
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

      http.get("/itemmanagement").then(res => {
        //更新表格
        this.todolist1 = res.data;

      })
    },

    //打开添加任务对话框
    onAdd: function () {
      //清空表单旧数据
      this.mymodel = {
        userId: "",
        itemId: "",
        itemName: "",
        itemGoods: "",
        itemCategory: "",
        itemNum: "",
        itemDate: "",
        currentStatus: 0
      }

      //打开对话框
      this.dialog={
        title:'添加物品',
        show: true,
        option: 'add'
      }
    },
    //打开修改任务对话框
    onEdit:function (index) {
      //回填表单
      let item = this.todolist1[index];
      this.mymodel = {
        userId: item.userId,
        itemId: item.itemId,
        itemName: item.itemName,
        itemGoods: item.itemGoods,
        itemCategory: item.itemCategory,
        itemNum: item.itemNum,
        itemDate: item.itemDate,
        currentStatus: item.currentStatus
      }
      //临时保存选中的索引
      this.selectedIndex = index
      //打开对话框
      this.dialog={
        title:'修改物品',
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

            http.post("/itemmanagement",this.mymodel).then(res=>{
              //console.log(res.data)
              ElMessage({
                message: '添加成功！',
                type: 'success'
              })
              //更新表格
              //this.todolist1.push(res.data);
              this.initTable();

              //清空表单旧数据
              this.mymodel = {
                userId: "",
                itemId: "",
                itemName: "",
                itemGoods: "",
                itemCategory: "",
                itemNum: "",
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
            http.put("/itemmanagement",this.mymodel).then(res=>{
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
                itemGoods: "",
                itemCategory: "",
                itemNum: "",
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
      let item = this.todolist1[index]
      item.currentStatus = 1
      http.put("/itemmanagement", item).then(res => {
        ElMessage({
          message: '任务完成！',
          type: 'success'
        })
        //this.todolist1.splice(index, 1, res.data)
        this.initTable();
      })
    },
    //删除任务
    onDelete: function (index) {
      http.delete("/itemmanagement/" + this.todolist1[index].itemId).then(res => {
        if (res.data == '200') {
          ElMessage('删除成功！')
          this.todolist1.splice(index, 1)
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
  }
}
</script>

<style scoped>

</style>