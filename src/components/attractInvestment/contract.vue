<template>
  <div class="contract">
    <div class="current-page-title">
      <span>合同列表</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore"
                   @click="addDialogTitle = '新建合同', addCustomerVisibel=true ,form = {},resetForm ('form')">新建合同</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="contract"
              v-loading="listLoading"
              ref="table"
              @selection-change="handleSelectionChange"
              @sort-change="handleSortChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="management"
                       label="管理区"></el-table-column>

      <el-table-column prop="contractNo"
                       label="合同编号"></el-table-column>

      <el-table-column prop="contractName"
                       label="合同名称"></el-table-column>

      <el-table-column prop="peoName"
                       label="租户姓名"></el-table-column>

      <el-table-column prop="resourceCode"
                       label="资源代码"></el-table-column>

      <el-table-column prop="per"
                       label="收费标准"></el-table-column>

      <el-table-column prop="date"
                       label="费用应收日期"></el-table-column>

      <el-table-column prop="costCycle"
                       label="费用周期"></el-table-column>

      <el-table-column prop="amountReceivable"
                       label="应收金额"></el-table-column>

      <el-table-column prop="amountPaid"
                       label="已缴金额"></el-table-column>

      <el-table-column prop="refundAmount"
                       label="退款金额"></el-table-column>

      <el-table-column prop="amountOwed"
                       label="欠费金额"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     class="table-show"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
    <el-dialog :title="addDialogTitle"
               :visible.sync="addCustomerVisibel"
               :before-close="closeForm">
      <div class="flex-space-between____c">
        <el-card class="box-card">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="管理区:"
                              prop="management">
                  <el-select v-model="form.management">
                    <el-option label="绿城区"
                               value="绿城区"></el-option>
                    <el-option label="普陀区"
                               value="普陀区"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同编号:"
                              prop="contractNo">
                  <el-input v-model="form.contractNo"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="合同名称:">
                  <el-input v-model="form.contractName"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="租户姓名:">
                  <el-input v-model="form.peoName"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="联系电话:">
                  <el-input v-model="form.tel"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="资源代码:">
                  <el-input v-model="form.resourceCode"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="费用应收日期:">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.date"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="费用周期:">
                  <el-select v-model="form.costCycle"
                             placeholder="请选择费用周期">
                    <el-option label="一年"
                               value="一年"></el-option>
                    <el-option label="半年"
                               value="半年"></el-option>
                    <el-option label="一季"
                               value="一季"></el-option>
                    <el-option label="一月"
                               value="一月"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="应收金额:">
                  <el-input v-model="form.amountReceivable"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已缴金额:">
                  <el-input v-model="form.amountPaid"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退款金额:">
                  <el-input v-model="form.refundAmount"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="欠费金额:">
                  <el-input v-model="form.amountOwed"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addCustomerVisibel=false"
                   class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getattrContract,creatAttrContract } from '../../http/attrContract';
export default {
  data () {
    return {
      contract: [],
      page1: 1,
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,

      checkedBox: [],
      form: {},



      rules: {
        management: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        contractNo: [
          { required: true, message: "请输入合同编号，不超过30个字符！", trigger: "blur" },
          { max: 30, message: "请输入合同编号，不超过30个字符！", trigger: "blur" }
        ],
      },
      addDialogTitle: '',
      addCustomerVisibel: false,

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
          this.contract.splice(index, 1);
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
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //piliangshanchu
    delectAll () {
      this.$confirm("永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据

          for (let i = 0; i < this.contract.length; i++) {
            const element = this.contract[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.contract.forEach((e, i) => {

              if (element.id == e.id) {
                this.contract.splice(i, 1)
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
    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },

    handleEdit (index, item) {
      this.addCustomerVisibel = true
      this.form = { ...item }
      this.addDialogTitle = '编辑合同'
      this.editIndex = index
    },


    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.addDialogTitle == '新建合同') {
            this.form.id = this.contract.length;
            creatAttrContract(this.form).then(res=>{
              window.console.log(res)
            })
            this.contract.unshift({ ...this.form });
            this.addCustomerVisibel = false
          } else if (this.addDialogTitle == '编辑合同') {
            this.contract[this.editIndex] = this.form
            this.addCustomerVisibel = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    loadData () {
      getattrContract().then(res => {
        window.console.log(res);
        this.contract = res.data.contract
      })
    }
  },
  created () {
    this.loadData();
  }


}


</script>

<style lang="less">
.contract {
  .el-dialog {
    margin-top: 0;
    background-color: rgba(10, 13, 51, 0.7);
    color: #fff;
    width: 900px;
    transform-origin: 1281px 246px;
    .el-dialog__title {
      color: #fff;
    }
  }
  .flex-space-between____c {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-card {
      width: 900px;

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
  // .el-table .cell {
  //   white-space: nowrap; //强制不换行
  //   overflow: hidden; //溢出隐藏
  //   text-overflow: ellipsis; //替换为省略号
  // }
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