<template>
  <div class="customer">
    <div class="current-page-title">
      <span>客户</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="add-customer btn-addmore"
                   @click="addCustomerVisibel = true, form={},addDialogTitle='新增客户',resetForm ('form')">新建用户</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary"
                   class="del-btn btn-trans"
                   :disabled="this.checkedBox.length == 0"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData"
              resizable
              ref="table"
              v-loading="listLoading"
              @selection-change="handleSelectionChange"
              @sort-change="handleSortChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="name"
                       label="客户名称">
      </el-table-column>
      <el-table-column prop="industry"
                       label="所属行业">
      </el-table-column>
      <el-table-column prop="contacts"
                       label="联系人">
      </el-table-column>
      <el-table-column prop="tel"
                       label="联系电话">
      </el-table-column>
      <el-table-column prop="date"
                       label="来访时间">
      </el-table-column>
      <el-table-column prop="demand"
                       label="客户需求">
      </el-table-column>
      <el-table-column prop="intended"
                       label="意向房源"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="source"
                       label="来源">
      </el-table-column>
      <el-table-column prop="status"
                       label="客户状态">
      </el-table-column>
      <el-table-column prop="stage"
                       label="销售阶段">
      </el-table-column>
      <el-table-column prop="remarks"
                       label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     class="table-show"
                     @click="showRole(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     size="small"
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

    <el-dialog :title="addDialogTitle"
               :visible.sync="addCustomerVisibel"
               :before-close="closeForm">
      <div class="flex-space-between____c">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>卡片名称</span>
          </div>
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="客户名称:"
                              prop="name">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所属行业:"
                              prop="industry">
                  <el-select v-model="form.industry">
                    <el-option label="餐饮"
                               value="餐饮"
                               selected></el-option>
                    <el-option label="IT"
                               value="IT"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="客户状态:"
                              prop="status">
                  <el-select v-model="form.status"
                             placeholder="请选择客户状态">
                    <el-option label="潜在客户"
                               value="潜在客户"></el-option>
                    <el-option label="签约客户"
                               value="签约客户"></el-option>
                    <el-option label="流失客户"
                               value="流失客户"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系人:">
                  <el-input v-model="form.contacts"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="联系电话:">
                  <el-input v-model="form.tel"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="来访时间:">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.date"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="来源渠道:">
                  <el-select v-model="form.source"
                             placeholder="请选择来源渠道">
                    <el-option label="上门"
                               value="上门"></el-option>
                    <el-option label="电话"
                               value="电话"></el-option>
                    <el-option label="网络"
                               value="网络"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="销售阶段:">
                  <el-select v-model="form.stage"
                             placeholder="请选择销售阶段">
                    <el-option label="初期沟通"
                               value="初期沟通"></el-option>
                    <el-option label="房源选择"
                               value="房源选择"></el-option>
                    <el-option label="价格谈判"
                               value="价格谈判"></el-option>
                    <el-option label="合同签约"
                               value="合同签约"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="客户需求:">
                  <el-input v-model="form.demand"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="备注:">
                  <el-input type="textarea"
                            v-model="form.remarks"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>意向房源</span>
          </div>
          <el-button class="addChose">+添加</el-button>
          <div class="digo-list-title">
            <p>时代佳苑(住宅)</p>
            <el-table :data="tableData1"
                      resizable
                      ref="table1"
                      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
              <el-table-column prop="num"
                               label="楼栋/房号">
              </el-table-column>
              <el-table-column prop="name"
                               label="面积">
              </el-table-column>
              <el-table-column prop="address"
                               label="房间状态">
              </el-table-column>
              <el-table-column prop="address"
                               label="空置时间">
              </el-table-column>
              <el-table-column prop="address">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                             type="text"
                             size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addCustomerVisibel = false"
                   class="btn-trans">取 消</el-button>
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
      addDialogTitle: '',
      tableData1: [],
      tableData: [{
        name: '王小虎1',
        industry: 'IT',
        contacts: '',
        tel: '',
        date: '2019-02-03',
        demand: '',
        intended: 'FA101、201',
        source: '电话',
        status: '潜在客户',
        stage: '合同签约',
        remarks: '',
        id: 1
      }, {
        name: '王小虎2',
        industry: 'IT',
        contacts: '',
        tel: '',
        date: '',
        demand: '',
        intended: 'FA101、201',
        source: '电话',
        status: '潜在客户',
        stage: '合同签约',
        remarks: '',
        id: 2
      }, {
        name: '王小虎3',
        industry: 'IT',
        contacts: '',
        tel: '',
        date: '',
        demand: '',
        intended: 'FA101、201',
        source: '电话',
        status: '潜在客户',
        stage: '合同签约',
        remarks: '',
        id: 3
      },],
      listLoading: false,
      page1: 1,
      addCustomerVisibel: false,
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入客户名称，不超过30个字符！", trigger: "blur" },
          { max: 30, message: "请输入客户名称，不超过30个字符！", trigger: "blur" }
        ],
        industry: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择客户状态', trigger: 'change' }
        ]
      },
      total: 4,
      page: 1,
      pageSize: 10,
      checkedBox: [],
      editIndex: ''
    }
  },
  methods: {
    handleDelete (index, row) {
      // 设置类似于console类型的功能
      window.console.log(row)
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
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    // context menu
    handleSelectionChange (sels) {
      // window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //piliangshanchu
    delectAll () {
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          for (let i = 0; i < this.tableData.length; i++) {
            const element = this.tableData[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.tableData.forEach((e, i) => {

              if (element.id == e.id) {
                this.tableData.splice(i, 1)
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
    handleSortChange (col) {
      if (col.prop == null) {
        return;
      }
      this.order = (col.order === 'ascending') ? 'asc' : 'desc';
      this.sort = col.prop;
      this.searchDevice();
    },
    searchDevice () {
      this.page = 1;
      this.getDeviceList();
    },
    getDeviceList () {

      var searchParams = _.omitBy(this.searchForm, (item) => item == "" || _.isNil(item));
      searchParams.page = this.page - 1;
      searchParams.size = this.pageSize;
      searchParams.sort = this.sort;//"deviceNo";
      searchParams.order = this.order;//"asc";

      this.listLoading = true;
      AdminAPI.searchDevice(searchParams).then(({
        data: jsonData
      }) => {
        if (jsonData.status === 0) {
          this.total = jsonData.data.total;
          this.devices = jsonData.data.content;
          this.total = jsonData.data.totalElements;
          this.listLoading = false;
        } else {
          this.$message({
            messsage: `获取设备列表失败:${data.msg}`,
            type: 'error'
          })
        }
      });
    },

    showRole (index, item) {
      this.resetForm('form')
      this.addDialogTitle = '编辑客户';
      this.addCustomerVisibel = true;
      this.form = { ...item }
      this.editIndex = index
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addDialogTitle == '新增客户') {
            // window.console.log(this.form.date)
            this.tableData.push(this.form);
            this.addCustomerVisibel = false;
          }
          else if (this.addDialogTitle == '编辑客户') {
            window.console.log(this.form)
            this.tableData[this.editIndex] = this.form
            window.console.log(this.tableData[this.editIndex])
            this.addCustomerVisibel = false;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // this.resetForm(formName);
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
    }
  }
}

</script>

<style lang="less" scope>
//模态框
.el-dialog {
  margin-top: 0;
  background-color: rgba(10, 13, 51, 0.7);
  color: #fff;
  width: 1200px;
  transform-origin: 1281px 246px;
  .el-dialog__title {
    color: #fff;
  }
  /deep/ .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
}

.customer {
  //   position: relative;
  .flex-space-between____c {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-card {
      width: 570px;
      height: 704px;

      .addChose {
        width: 100%;
      }

      .digo-list-title {
        margin-top: 25px;
      }
    }
    .el-select {
      width: 100%;
    }
    /deep/ .el-card__header {
      border: none;
      color: #fff;
    }
    /deep/ .el-card {
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
      .el-form {
        .el-form-item__label {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  // .add-customer {
  //   position: absolute;
  //   top: -20px;
  //   right: 0;
  // }

  .el-table .cell {
    white-space: nowrap; //强制不换行
    overflow: hidden; //溢出隐藏
    text-overflow: ellipsis; //替换为省略号
  }
  //dialog 页眉页脚
  /deep/ .el-dialog__header {
    background: url("./../../assets/comment/type(1).png") no-repeat;
    padding: 10px 20px 10px;
  }
  /deep/ .el-dialog__footer {
    background: url("./../../assets/comment/type(2).png") no-repeat right;
    padding: 50px 20px 20px;
  }
}
</style>