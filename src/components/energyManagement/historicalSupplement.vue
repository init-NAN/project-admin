<template>
  <div class="historical-supplement">
    <div class="current-page-title">
      <span>历史补抄</span>
    </div>

    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore"
                   @click="historicalTitle = '新建历史补抄', ishistorical=true ,form = {},resetForm ('form')">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="btn-trans"
                   :disabled='this.checkedBox.length===0'
                   @click="delectAll()">批量删除</el-button>
      </el-col>
      <el-col :span="6"
              :offset="10">
        <el-input v-model="input"
                  placeholder="请输入搜索关键字"></el-input>
      </el-col>
      <el-col :span="2"
              :offset="1">
        <el-button type="text">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="history"
              v-loading="listLoading"
              ref="table"
              @selection-change="handleSelectionChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="billingMonth"
                       label="账单月份"></el-table-column>

      <el-table-column prop="roomName"
                       label="房间名称"></el-table-column>

      <el-table-column prop="tableName"
                       label="表名称"></el-table-column>

      <el-table-column prop="tableType"
                       label="表类型"></el-table-column>

      <el-table-column prop="tableGeneration"
                       label="表种类"></el-table-column>

      <el-table-column prop="lastReading"
                       label="上次读数"></el-table-column>

      <el-table-column prop="generationStart"
                       label="产生开始时间"></el-table-column>

      <el-table-column prop="generationEnd"
                       label="产生结束时间"></el-table-column>

      <el-table-column prop="thisReading"
                       label="本次读数"></el-table-column>

      <el-table-column prop="lineDegree"
                       label="行度"></el-table-column>

      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button type="text"
                       
                     class="table-show"
                     @click="editList(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                       
                     class="table-del"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col class="toolbar">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-sizes="[10, 20, 30, 40, 50, 100]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-col>
    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>

    <!-- diolg -->
    <el-dialog :title="historicalTitle"
               :visible.sync="ishistorical"
               :before-close="closeForm"
               width="1200px">
      <div class="add-files">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 label-width="auto"
                 label-position="left">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>抄表单主表</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="计费年月:"
                              prop="billingMonth">
                  <el-date-picker type="month"
                                  placeholder="请选择日期"
                                  v-model="form.billingMonth"
                                  format="yyyy-MM"
                                  value-format="yyyy-MM"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房间名称:"
                              prop="roomName">
                  <el-input v-model="form.roomName"
                            autocomplete="off"
                            placeholder="请输入房间名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="表种类:"
                              prop="tableGeneration">
                  <el-select v-model="form.tableGeneration"
                             placeholder="请选择表种类">
                    <el-option label="电表"
                               value="电表"></el-option>
                    <el-option label="水表"
                               value="水表"></el-option>
                    <el-option label="尖峰平谷电表"
                               value="尖峰平谷电表"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="上次读数:">
                  <el-input v-model="form.lastReading"
                            autocomplete="off"
                            placeholder="请输入上次读数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本次读数:">
                  <el-input v-model="form.thisReading"
                            autocomplete="off"
                            placeholder="请输入本次读数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="表类型:"
                              prop="tableType">
                  <el-select v-model="form.tableType"
                             placeholder="请选择表类型">
                    <el-option label="常规表"
                               value="常规表"></el-option>
                    <el-option label="尖峰平谷电表"
                               value="尖峰平谷电表"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="产生开始时间:">
                  <el-date-picker v-model="form.generationStart"
                                  type="date"
                                  placeholder="选择日期"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产生结束时间:">
                  <el-date-picker v-model="form.generationEnd"
                                  type="date"
                                  placeholder="选择日期"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行度:">
                  <el-input v-model="form.lineDegree"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="ishistorical = false ,resetForm('form')">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // lineDegree:'',
      listLoading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      history: [
        {
          billingMonth: '2019-10',
          roomName: '楼栋编号001',
          tableName: '001-209',
          tableType: '常规表',
          tableGeneration: '电表',
          lastReading: '209',
          generationStart: '2019-10-01',
          generationEnd: '2019-10-31',
          thisReading: '410',
          lineDegree: '201'
        },
        {
          billingMonth: '2019-03',
          roomName: '楼栋编号001',
          tableName: '001-209',
          tableType: '尖峰平谷表',
          tableGeneration: '电表',
          lastReading: '402',
          generationStart: '2019-03-01',
          generationEnd: '2019-03-31',
          thisReading: '623',
          lineDegree: '221'
        },
        {
          billingMonth: '2019-03',
          roomName: '楼栋编号001',
          tableName: '001-209',
          tableType: '常规表',
          tableGeneration: '水表',
          lastReading: '402',
          generationStart: '2019-03-01',
          generationEnd: '2019-03-31',
          thisReading: '623',
          lineDegree: '221'
        }
      ],
      form: {
        thisReading: '',
        lastReading: '',
      },
      input: '',
      checkedBox: [],
      historicalTitle: '',
      ishistorical: false,
      rules: {
        billingMonth: [
          { required: true, message: "请选择计费年月!", trigger: "change" }
        ],
        roomName: [
          { required: true, message: "请输入房间名称，不超过30个字符！", trigger: "blur" },
          { max: 30, message: "请输入房间名称，不超过30个字符！", trigger: "blur" }
        ],
        tableGeneration: [
          { required: true, message: "请选择计表种类!", trigger: "change" }
        ],
        tableType: [
          { required: true, message: "请选择计表类型!", trigger: "change" }
        ]
      },
      editIndex: ''
    }
  },
  methods: {
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    //deletall
    delectAll () {
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < this.history.length; i++) {
            const element = this.history[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.history.forEach((e, i) => {
              if (element.id == e.id) {
                this.history.splice(i, 1)
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
    //delete
    handleDelete (index, row) {
      // 设置类似于console类型的功能
      window.console.log('row' + row)
      window.console.log(index)

      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.billing.splice(index, 1);
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
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
    },

    editList (index, item) {
      window.console.log(index)
      window.console.log(item)
      this.ishistorical = true
      this.form = { ...item }
      this.historicalTitle = '编辑历史补抄'
      this.editIndex = index
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.historicalTitle == '新建历史补抄') {
            this.history.unshift({ ...this.form });
            this.ishistorical = false
          } else if (this.historicalTitle == '编辑历史补抄') {
            this.history[this.editIndex] = { ...this.form }
            this.ishistorical = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style>
</style>