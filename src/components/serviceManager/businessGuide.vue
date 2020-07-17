<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>办事指南</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore" @click="addGuide('formGuide')">新增</el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="btn-trans" :disabled="selectionLengh == 0" @click="delectAll()">批量删除</el-button>
      </el-col>
      <el-col :span="6" :offset="10">
        <el-input placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="text">搜索</el-button>
      </el-col>
    </el-row>
    <section class="grid-content">
      <el-table
        :data="tableData"
        v-loading="listLoading"
        ref="table"
        @selection-change="handleSelectionChange"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="guideName" label="办事指南名称"></el-table-column>
        <el-table-column prop="guideType" label="事项类型"></el-table-column>
        <el-table-column prop="implementer" label="实施机构"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" class="table-show" @click="editList(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              class="table-del"
              @click="handleDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="guideTitle" :visible.sync="showGuideDia" :before-close="close" width="85%">
      <el-form
        ref="guideForm"
        :model="guideForm"
        :rules="guideFormRules"
        label-width="120px"
        label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="办事指南名称" prop="dataName">
              <el-input v-model="guideForm.guideName" placeholder="请输入办事指南名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="事项类型" prop="guideType">
              <el-input v-model="guideForm.guideType" placeholder="请输入办事指南事项类型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="承诺办结时限">
              <el-date-picker
                    v-model="guideForm.deadLine"
                    type="datetime"
                    placeholder="选择办结日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="服务对象">
              <el-input v-model="guideForm.serviceObject" placeholder="请输入服务对象"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="办件类型">
              <el-input v-model="guideForm.handlerType" placeholder="请输入办件类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="结果名称">
              <el-input v-model="guideForm.resultName" placeholder="请输入结果名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="物流快递">
              <el-input v-model="guideForm.express" placeholder="请输入物流快递"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="服务收费">
              <el-input v-model="guideForm.toll" placeholder="请输入服务收费"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="数量限制">
              <el-input v-model="guideForm.numLimit" placeholder="请输入数量限制"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="网申现场次数">
              <el-input v-model="guideForm.netApplyLimit" placeholder="请输入次数限制"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="咨询电话">
              <el-input v-model="guideForm.advisoryPhone" placeholder="请输入咨询电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="监督电话">
              <el-input v-model="guideForm.inspectPhone" placeholder="请输入监督电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="相关附件">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove" 
                  accept=".xls, .xlsx, .doc, .docx, .jpg, .png, .gif, .zip, .7zip, .ppt, .pptx"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button type="primary" class="btn-addmore" style="margin-left:8px;">上传附件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="窗口办理信息">
              <el-input v-model="guideForm.inspectPhone" placeholder="请输入监督电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="受理条件">
              <el-input v-model="guideForm.acceptanceCondition" placeholder="请输入受理条件" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="申请材料">
              <el-input v-model="guideForm.applyContent" placeholder="请输入申请材料" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="办理流程">
              <el-input type="textarea" v-model="guideForm.process" placeholder="请输入办理流程"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-trans" @click="showGuideDia = false ,resetForm('guideForm')">取 消</el-button>
        <el-button class="btn-addmore" @click="submitForm('guideForm')">发 布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      listLoading:false,
      multipleSelection:[],
      selectionLengh:0,
      total: 0,
      page: 1,
      pageSize: 10,
      fileList:[],
      dataIndex:[],
      tableData:[
        {
          guideName:'内网获取指南',
          guideType:'指引',
          implementer:'网络部'
        }
      ],
      guideTitle:'',
      showGuideDia:false,
      guideForm:{},
      guideFormRules:{},
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.selectionLengh = val.length
      this.multipleSelection = val
    },
    addGuide(formName) {
      this.guideTitle = '新增办事指南'
      this.guideForm = {};
      this.resetForm(formName);
      this.showGuideDia = true;
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
    close(done) {
      this.$refs["guideForm"].resetFields();
      done();
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
    //编辑
    editList(index, item) {
      this.guideForm = { ...item };
      this.showGuideDia = true;
      this.guideTitle = "修改指南";
      this.dataIndex = index;
    },
    //文件上传--end
    //delete
    handleDelete(index, row) {
      // 设置类似于console类型的功能
      window.console.log("row" + row);
      window.console.log(index);

      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData.splice(index, 1);
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
    delectAll() {
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < this.tableData.length; i++) {
            const element = this.tableData[i];
            element.id = i;
          }
          this.multipleSelection.forEach(element => {
            this.tableData.forEach((e, i) => {
              if (element.id == e.id) {
                this.tableData.splice(i, 1);
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
    }
  }
}
</script>

<style>

</style>