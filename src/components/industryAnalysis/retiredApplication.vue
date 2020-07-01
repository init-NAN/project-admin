<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>退园申请</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="applyRetire">申请</el-button>
            <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit" :disabled="isCanEdit" @click="editRetire">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteRetire">删除</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-search" @click="checkRetire" :disabled="disCheck">查看</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
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
        <el-table-column prop="industryCategory" label="行业类型"></el-table-column>
        <el-table-column prop="enteringArea" label="入驻园区"></el-table-column>
        <el-table-column prop="enteringDate" label="入驻时间"></el-table-column>
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
        // enterpriseName industryBigCategory enteringFloor enteringDate enterpriseStatus isRetired
        {
          enterpriseName:'企业001',
          industryCategory:'互联网',
          enteringArea:'园区001',
          enteringDate:'2020-5-20',
          enterpriseStatus:'正常',
          isRetired:true
        },
        {
          enterpriseName:'企业002',
          industryCategory:'医疗',
          enteringArea:'园区002',
          enteringDate:'2020-5-21',
          enterpriseStatus:'正常',
          isRetired:false
        },
        {
          enterpriseName:'企业003',
          industryCategory:'教育',
          enteringArea:'园区003',
          enteringDate:'2020-5-22',
          enterpriseStatus:'正常',
          isRetired:true
        },
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
    //申请
    applyRetire() {
    },
    //导入
    importExcell() {
    },
    //修改
    editRetire() {

    },
    //删除
    deleteRetire() {

    },
    //查看
    checkRetire() {

    }
  }
}
</script>

<style>

</style>