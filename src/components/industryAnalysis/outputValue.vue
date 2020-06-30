<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>产值采集</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="importExcell">导入</el-button>
            <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteOutput">删除</el-button>
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
        :data="archivesTable"
        v-loading="listLoading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="outputValue" label="产值(万元)"></el-table-column>
        <el-table-column prop="businessIncome" label="营业收入(万元)"></el-table-column>
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
      isCanEdit:false,
      isCanDelete:true,
      disCheck:true,
      listLoading:false,
      archivesTable:[
        {
          enterpriseName:'企业001',
          date:'2020-5-20',
          outputValue:100,
          businessIncome:80
        },
        {
          enterpriseName:'企业002',
          date:'2020-5-21',
          outputValue:200,
          businessIncome:190
        },
        {
          enterpriseName:'企业003',
          date:'2020-5-28',
          outputValue:400,
          businessIncome:320
        }
      ],
    }
  },
  methods:{
    handleSelectionChange() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    //导入
    importExcell() {

    },
    //删除
    deleteOutput() {

    }
  }
}
</script>

<style>

</style>