<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>税收采集</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="importExcell">导入</el-button>
            <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteOutput">删除</el-button>
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
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="enterpriceTatx" label="企业所得税(万元)"></el-table-column>
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
    <el-dialog title="税收采集数据导入" :visible.sync="showImportDia" width="50%">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      selectionLengh:0,
      multipleSelection:[],
      inputSearch:'',
      isCanEdit:false,
      isCanDelete:true,
      disCheck:true,
      listLoading:false,
      showImportDia:false,
      archivesTable:[
        {
          enterpriseName:'企业001',
          date:'2020-5-20',
          enterpriceTatx:100
        },
        {
          enterpriseName:'企业002',
          date:'2020-5-21',
          enterpriceTatx:200
        },
        {
          enterpriseName:'企业003',
          date:'2020-5-28',
          enterpriceTatx:400
        }
      ],
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.selectionLengh = val.length
      this.multipleSelection = val
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    //导入
    importExcell() {
      this.showImportDia = true
    },
    //删除
    deleteOutput() {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        for (let i = 0; i < this.archivesTable.length; i++) {
          const element = this.archivesTable[i];
          element.id = i;
        }
        this.multipleSelection.forEach(element => {
          this.archivesTable.forEach((e, i) => {
            if (element.id == e.id) {
              this.archivesTable.splice(i,1)
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
  },
  watch:{
    selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isCanDelete = false
      } else {
        this.isCanDelete = true
      }
    }
  }
}
</script>

<style>

</style>