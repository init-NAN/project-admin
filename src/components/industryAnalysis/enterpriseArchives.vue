<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>企业档案</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="importExcell">导入</el-button>
            <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="addOne">新增</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit" :disabled="isCanEdit" @click="editArchives">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteArchives">删除</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-search" @click="checkArchives" :disabled="disCheck">查看</el-button>
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
        <el-table-column prop="industryBigCategory" label="行业大类"></el-table-column>
        <el-table-column prop="enteringFloor" label="入驻楼盘"></el-table-column>
        <el-table-column prop="enteringDate" label="入驻时间"></el-table-column>
        <el-table-column prop="enterpriseStatus" label="企业状态"></el-table-column>
        <el-table-column prop="isRetired" label="是否退园">
          <template slot-scope="scope">
            <span v-if="scope.row.isRetired">是</span>
            <span v-else>否</span>
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
    <el-dialog title="企业档案导入" :visible.sync="showImportDia" width="50%">
      <el-form ref="importForm" :model="importForm" label-width="auto">
        <el-form-item label="文件：" prop="file"> 
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            accept=".xls,.xlsx"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button type="primary" class="btn-addmore" style="margin-left:10px;">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="说明：">
          <span>
            1.附件格式必须是.xls或者.xlsx</br>
            2.如果电脑没有数据，可以在这里进行模板下载
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer"> 
        <el-button @click="cancelDialog('form')" class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore">导入</el-button>
      </div>
    </el-dialog>
    <el-dialog title="企业资料" :visible.sync="showNewDia" width="80%">
      <el-tabs tab-position="top" >
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="企业简介">
          <el-form ref="profileForm" :mode="profileForm" label-width="auto">
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业简介">
                  <el-input type="textarea" v-model="profileForm.simpleDesc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="主要产品及服务">
                  <el-input type="textarea" v-model="profileForm.mainProduct"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="经营范围">
                  <el-input type="textarea" v-model="profileForm.businessScope"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="企业需求">
                  <el-input type="textarea" v-model="profileForm.companyDemand"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业文化">
                  <el-input type="textarea" v-model="profileForm.companyCulture"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="企业愿景">
                  <el-input type="textarea" v-model="profileForm.vison"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="人员情况">人员情况</el-tab-pane>
        <el-tab-pane label="主要股东">主要股东</el-tab-pane>
        <el-tab-pane label="党建情况">党建情况</el-tab-pane>
      </el-tabs>
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
      isCanEdit:false,
      isCanDelete:true,
      disCheck:true,
      listLoading:false,
      showImportDia:false,
      showNewDia:false,
      fileList:[],
      importForm:{},
      profileForm:{},//企业简介表单
      archivesTable:[
        // enterpriseName industryBigCategory enteringFloor enteringDate enterpriseStatus isRetired
        {
          enterpriseName:'企业001',
          industryBigCategory:'互联网',
          enteringFloor:'楼盘001',
          enteringDate:'2020-5-20',
          enterpriseStatus:'正常',
          isRetired:true
        },
        {
          enterpriseName:'企业002',
          industryBigCategory:'医疗',
          enteringFloor:'楼盘002',
          enteringDate:'2020-5-21',
          enterpriseStatus:'正常',
          isRetired:false
        },
        {
          enterpriseName:'企业003',
          industryBigCategory:'教育',
          enteringFloor:'楼盘003',
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
    //导入
    importExcell() {
      this.showImportDia = true
    },
    //新增
    addOne() {
      this.showNewDia = true
    },
    //修改
    editArchives() {

    },
    //删除
    deleteArchives() {

    },
    //查看
    checkArchives() {

    },
    //文件上传--start
    handlePreview(file) {
      console.log('文件')
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
        this.$message.warning('当前限制选择1个文件');
    },
    //文件上传--end
    cancelDialog(formName) {
      this.showImportDia = false
    }
  }
}
</script>

<style>

</style>