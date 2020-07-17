<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>上传资料</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore" @click="addData('formData')">新增</el-button>
      </el-col>
      <el-col :span="3">
        <el-button
          :disabled="this.checkedBox.length===0"
          class="btn-trans"
          @click="delectAll()"
        >批量删除</el-button>
      </el-col>
      <el-col :span="6" :offset="10">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
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
        <el-table-column prop="dataName" label="资料名称"></el-table-column>
        <el-table-column prop="dataType" label="资料类型"></el-table-column>
        <el-table-column prop="upLoadTime" label="上传时间"></el-table-column>
        <el-table-column prop="upLoadPerson" label="上传人"></el-table-column>
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
    <el-dialog :title="addDataTitle" :visible.sync="showDataDia" :before-close="close" width="85%">
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataFormRules"
        label-width="120px"
        label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="资料名称" prop="dataName">
              <el-input v-model="dataForm.dataName" placeholder="请输入资料名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="资料类型" prop="dataType">
              <el-select v-model="dataForm.dataType" placeholder="请选择资料类型">
                  <el-option
                    v-for="item in dataTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="上传时间" prop="upLoadTime">
              <el-date-picker
                    v-model="dataForm.upLoadTime"
                    type="datetime"
                    placeholder="选择上传日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="上传人" prop="upLoadPerson">
              <el-input v-model="dataForm.upLoadPerson" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="资料文件">
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
                  <el-button type="primary" class="btn-addmore" style="margin-left:8px;">上传资料</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="资料说明">
              <el-input type="textarea" v-model="dataForm.upLoadNote" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-trans" @click="showDataDia = false ,resetForm('dataForm')">取 消</el-button>
        <el-button class="btn-addmore" @click="submitForm('dataForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      tableData: [
        {
          dataName: "会议室管理需求文档",
          dataType: "需求文档",
          upLoadTime: "2020-7-10 14:23",
          upLoadPerson: "张三"
        }
      ],
      total: 0,
      page: 1,
      pageSize: 10,
      fileList:[],
      checkedBox: [],
      input: "",
      page: 1,
      pageSize: 10,
      total: 0,
      form: {},
      showDataDia: false,
      addDataTitle: "",
      dataIndex: [],
      dataForm: {},
      dataFormRules:{
        dataName:[{ required: true, message: "请输入资料名称", trigger: "blur" }],
        dataType:[{ required: true, message: "请选择资料类型", trigger: "blur" }],
        upLoadTime:[{ required: true, message: "请选择上传时间", trigger: "blur" }],
        upLoadPerson:[{ required: true, message: "请输入资料上传人", trigger: "blur" }]
      },
      rules: {},
      dataTypeOption:[
        {
          value:0,
          label:'文档'
        },
        {
          value:1,
          label:'表格'
        },
        {
          value:2,
          label:'压缩文件'
        },
        {
          value:3,
          label:'图片'
        },
        {
          value:4,
          label:'幻灯片'
        }
      ]
    };
  },
  methods: {
    handleSelectionChange: function(sels) {
      window.console.log(sels);
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //fenye
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
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
          this.checkedBox.forEach(element => {
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
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    close(done) {
      this.$refs["dataForm"].resetFields();
      done();
    },
    addData(formName) {
      this.addDataTitle = "新增资料";
      this.dataForm = {};
      this.resetForm(formName);
      this.showDataDia = true;
    },
    //编辑
    editList(index, item) {
      this.dataForm = { ...item };
      this.showDataDia = true;
      this.addDataTitle = "修改资料";
      this.dataIndex = index;
    },
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
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit')
          if (this.addDataTitle == "新增资料") {
            console.log(this.dataForm,'FORM')
            this.tableData.unshift({ ...this.dataForm });
            this.showDataDia = false;
          } else if (this.addDataTitle == "编辑资料") {
            this.tableData[this.dataIndex] = { ...this.dataForm };
            this.showDataDia = false;
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
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
  }
};
</script>

<style lang="less">
</style>