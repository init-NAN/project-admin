<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>押金管理</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="newDeposit">新增</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit" :disabled="isCanEdit" @click="editDeposit">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteSelections">删除</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-search" @click="checkDeposit" :disabled="disCheck">查看</el-button>
            <!-- <el-button  type="primary" class="btn-addmore" @click="checkHasSend">已发</el-button> -->
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="right">
            <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
            <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
          </div>
        </el-col>
      </el-row>
    </section>
    <el-table
        :data="depositTable"
        v-loading="listLoading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="contract" label="合同编号"></el-table-column>
        <el-table-column prop="allDeposit" label="押金总额"></el-table-column>
        <el-table-column prop="restDeposit" label="剩余押金"></el-table-column>
        <el-table-column prop="isReturned" label="退还状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isReturned == '1'">是</span>
            <span v-else-if="scope.row.isReturned == '0'">否</span>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="depositTitle" :visible.sync="isShowDia" width="85%">
      <el-form ref="depositForm" :model="depositForm" :rules="depositFormRules" label-width="auto">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="客户姓名" prop="customerName">
              <el-input v-model="depositForm.customerName" placeholder="请输入客户姓名" :disabled="checked"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同编号" prop="contract">
              <el-input v-model="depositForm.contract" placeholder="请输入合同编号" :disabled="checked"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="押金总额" prop="allDeposit">
              <el-input v-model="depositForm.allDeposit" placeholder="请输入押金总额" :disabled="checked"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="剩余押金" prop="restDeposit">
              <el-input v-model="depositForm.restDeposit" placeholder="请输入剩余押金" :disabled="checked"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="退还状态" prop="isReturned">
              <el-radio v-model="depositForm.isReturned" label="1" >已退还</el-radio>
              <el-radio v-model="depositForm.isReturned" label="0">未退还</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog('depositForm')" class="btn-trans">取 消</el-button>
        <el-button @click="submitForm('depositForm')" class="btn-addmore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      inputSearch:'',
      arrayIndex:[],
      checked:false,
      selectionLengh:0,
      multipleSelection:[],
      listLoading:false,
      disCheck:true,
      isCanDelete:true,
      isCanEdit:true,
      depositTable:[
        {
          customerName:'张三',
          contract:'HT01',
          allDeposit:'1000',
          restDeposit:'100',
          isReturned:'0'
        },
        {
          customerName:'李四',
          contract:'HT02',
          allDeposit:'2000',
          restDeposit:'200',
          isReturned:'0'
        }
      ],
      isShowDia:false,
      depositTitle:'',
      depositForm:{},
      depositFormRules:{
        customerName:[{required: true, message: "请输入客户名称", trigger: "blur"}],
        contract:[{required: true, message: "请输入合同编号", trigger: "blur"}],
        allDeposit:[{required: true, message: "请输入押金总额", trigger: "blur"}],
        restDeposit:[{required: true, message: "请输入剩余押金", trigger: "blur"}],
        isReturned:[{required: true, message: "请选择退还状态", trigger: "blur"}]
      }
    }
  },
  methods:{
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
    },
    //新增押金详情
    newDeposit() {
      for (let key in this.depositForm) {
        this.depositForm[key] = "";
      }
      this.depositTitle = '新增押金记录'
      this.checked = false
      this.isShowDia = true
    },
    //修改押金详情
    editDeposit() {
      this.checked = false
      this.isShowDia = true
      this.depositTitle = '修改押金记录'
      console.log(this.multipleSelection[0],'11')
      this.depositForm = this.multipleSelection[0]
    },
    //删除押金详情
    deleteSelections() {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        for (let i = 0; i < this.depositTable.length; i++) {
          const element = this.depositTable[i];
          element.id = i;
        }
        this.multipleSelection.forEach(element => {
          this.depositTable.forEach((e, i) => {
            if (element.id == e.id) {
              this.depositTable.splice(i,1)
            }
          });
        });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    //查看押金详情
    checkDeposit() {
      this.checked = true
      let index = this.arrayIndex[0]
      this.depositTitle = '查看押金记录'
      this.isShowDia = true
      this.depositForm = {...this.depositTable[index]}
    },
    //已发
    checkHasSend() {

    },
    handleSelectionChange(val) {
      this.arrayIndex = [];
      this.selectionLengh = val.length;
      this.multipleSelection = val;
      val.forEach(value => {
        this.depositTable.forEach((v, i) => {
          if (value.contract == v.contract) {
            this.arrayIndex.push(i);
          }
        });
      });
      console.log(this.arrayIndex,'arrindex')
    },
    cancelDialog(formName) {
      this.$refs[formName].resetFields()
      this.isShowDia = false
    },
    submitForm(formName) {
      if(this.depositTitle == '新增押金记录') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.depositTable.push({...this.depositForm})
            this.isShowDia = false
          } else {
            return false
          }
        })
      } else if(this.depositTitle == '查看押金记录') {
        this.isShowDia = false
      } else if(this.depositTitle == '修改押金记录') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // let index = 
            this.depositTable[this.arrayIndex[0]] = this.depositForm
            this.isShowDia = false
          } else {
            return false
          }
        })
      }
    }
  },
  watch:{
    selectionLengh: function(newLen) {
      if(newLen != 0) {
        this.isCanDelete = false
      } else {
        this.isCanDelete = true
      }
      if (newLen === 1) { 
        this.isCanEdit = false
        this.disCheck = false
      } else {
        this.isCanEdit = true
        this.disCheck = true
      }
    }
  }
}
</script>

<style>

</style>