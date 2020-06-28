<template>
  <div class="energy">
    <div class="current-page-title">
      <span>装表登记</span>
    </div>
    <el-tabs tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="单元表">
        <el-row class="buttonHead">
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="left">
              <el-button  type="primary" class="btn-addmore el-icon-plus" @click="addUnitExcell">装表导入</el-button>
              <!-- <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDeleteUnit" @click="deleteUnit">删除</el-button> -->
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="right">
              <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
              <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="unitTable"
          v-loading="unitTabLoading"
          style="width: 100%"
          :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="unitName" label="单元名称"></el-table-column>
          <el-table-column prop="tableCode" label="表编号"></el-table-column>
          <el-table-column prop="tableName" label="表名称"></el-table-column>
          <el-table-column prop="tableCategory" label="表种类"></el-table-column>
          <el-table-column prop="multiplyPower" label="倍率(%)"></el-table-column>
          <el-table-column prop="electricLoss" label="用电损耗(%)"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="table-del" @click="deleteCurrentRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col class="toolbar">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="公用表">
        <el-row class="buttonHead">
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="left">
              <el-button  type="primary" class="btn-addmore el-icon-plus" @click="addPublicExcell">装表导入</el-button>
              <!-- <el-button  type="primary" class="btn-addmore el-icon-delete" @click="deletePublic">删除</el-button> -->
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="right">
              <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
              <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="publicTable"
          v-loading="publicTabLoading"
          style="width: 100%"
          :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="unitName" label="单元名称"></el-table-column>
          <el-table-column prop="tableCode" label="表编号"></el-table-column>
          <el-table-column prop="tableName" label="表名称"></el-table-column>
          <el-table-column prop="tableCategory" label="表种类"></el-table-column>
          <el-table-column prop="multiplyPower" label="倍率(%)"></el-table-column>
          <el-table-column prop="electricLoss" label="用电损耗(%)"></el-table-column>
          <el-table-column prop="apportionMentRatio" label="分摊比例"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="table-del" @click="deleteCurrentRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col class="toolbar">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="addTitle" :visible.sync="isShowDia" width="50%">
      <el-form ref="form" :model="form" label-width="auto" :rules="formRules">
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
      tabIndex:'0',
      form:{},
      formRules:{},
      unitTabLoading:false,
      publicTabLoading:false,
      isShowDia:false,
      inputSearch:'',
      addTitle:'',
      fileList: [],
      // unitName tableCode tableName tableCategory multiplyPower electricLoss apportionMentRatio
      unitTable:[
        {
          unitName:'一单元',
          tableCode:'T001',
          tableName:'表一',
          tableCategory:'水表',
          multiplyPower:'5',
          electricLoss:'8'
        },
        {
          unitName:'二单元',
          tableName:'表二',
          tableCode:'T002',
          tableCategory:'电表',
          multiplyPower:'10',
          electricLoss:'10'
        },
        {
          unitName:'三单元',
          tableCode:'T003',
          tableName:'表三',
          tableCategory:'尖峰平谷表',
          multiplyPower:'16',
          electricLoss:'7'
        }
      ],
      publicTable:[
        {
          unitName:'一单元',
          tableCode:'T001',
          tableName:'表一',
          tableCategory:'水表',
          multiplyPower:'5',
          electricLoss:'8',
          apportionMentRatio:'10'
        },
        {
          unitName:'二单元',
         tableName:'表二',
          tableCode:'T002',
          tableCategory:'电表',
          multiplyPower:'10',
          electricLoss:'10',
          apportionMentRatio:'20'
        },
        {
          unitName:'三单元',
          tableCode:'T003',
          tableName:'表三',
          tableCategory:'尖峰平谷表',
          multiplyPower:'16',
          electricLoss:'7',
          apportionMentRatio:'30'
        }
      ]
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
    handleClick(tab, event) {
      console.log(tab.index, event);
      this.tabIndex = tab.index
    },
    deleteCurrentRow(index, row) {
      this.$confirm('确定要删除吗?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
        if(this.tabIndex == '0') {
          this.unitTable.splice(index, 1);
        } else if(this.tabIndex == '1') {
          this.publicTable.splice(index, 1);
        }
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
    addUnitExcell() {
      this.addTitle = '单元表装表导入'
      this.isShowDia = true
      this.form = {}
    },
    addPublicExcell() {
      this.addTitle = '公用表装表导入'
      this.isShowDia = true
      this.form = {}
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
      this.isShowDia = false
      console.log(this.$refs[formName])
    }
  }
}
</script>

<style>

</style>