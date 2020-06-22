<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>押金管理</span>
    </div>
    <section class="grid-content">
      <div class="btnHeader">
        <div class="left">
          <el-button  type="primary" class="btn-addmore" @click="newDeposit">新增</el-button>
          <el-button  type="primary" class="btn-addmore" @click="editDeposit">修改</el-button>
          <el-button  type="primary" class="btn-addmore" @click="deleteSelections">删除</el-button>
          <el-button  type="primary" class="btn-addmore" @click="checkDeposit">查看</el-button>
          <el-button  type="primary" class="btn-addmore" @click="checkHasSend">已发</el-button>
        </div>
        <div class="right">
          <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
          <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
        </div>
      </div>
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
    <el-dialog :title="depositTitle" :visible.sync="isShowDia" width="85%">
      <el-form ref="depositForm" :model="depositForm" :rules="depositFormRules" label-width="auto">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="客户姓名" prop="customerName">
              <el-input v-model="depositForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同编号" prop="contract">
              <el-input v-model="depositForm.contract"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="押金总额" prop="allDeposit">
              <el-input v-model="depositForm.allDeposit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="剩余押金" prop="restDeposit">
              <el-input v-model="depositForm.restDeposit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="退还状态" prop="isReturned">
              <el-radio v-model="depositForm.isReturned" label="1">已退还</el-radio>
              <el-radio v-model="depositForm.isReturned" label="0">未退还</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowIntention = false" class="btn-trans">取 消</el-button>
        <el-button
          type="primary"
          @click="isShowIntention = false"
          class="btn-addmore"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      depositFormRules:{}
    }
  },
  methods:{
    //新增押金
    newDeposit() {
      this.depositTitle = '新增押金记录'
      this.isShowDia = true
    }
  }
}
</script>

<style>

</style>