<template>
  <div class="contract">
    <div class="current-page-title">
      <span>合同列表</span>
      <div class="line"></div>
    </div>
    <el-tabs :tab-position="tabPosition"
             style="height: 100%;">
      <el-tab-pane label="合同列表总览">
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
                           label="管理区"
                           width="150"></el-table-column>

          <el-table-column prop="contractNo"
                           label="合同编号"
                           width="100"></el-table-column>

          <el-table-column prop="contractName"
                           label="合同名称"
                           width="100"></el-table-column>

          <el-table-column prop="peoName"
                           label="租户姓名"
                           width="110"></el-table-column>

          <el-table-column prop="tel"
                           label="联系方式"
                           width="130"></el-table-column>

          <el-table-column prop="resourceCode"
                           label="资源代码"
                           width="90"></el-table-column>

          <el-table-column prop="resourcePropertyType"
                           label="产权类型"
                           width="100"></el-table-column>

          <el-table-column prop="per"
                           label="收费标准"
                           width="80"></el-table-column>

          <el-table-column prop="date"
                           label="费用应收日期"
                           width="130"></el-table-column>

          <el-table-column prop="costCycle"
                           label="费用周期"
                           width="100"></el-table-column>

          <el-table-column prop="amountReceivable"
                           label="应收金额"
                           width="100"></el-table-column>

          <el-table-column prop="amountPaid"
                           label="已缴金额"
                           width="100"></el-table-column>

          <el-table-column prop="refundAmount"
                           label="退款金额"
                           width="100"></el-table-column>

          <el-table-column prop="amountOwed"
                           label="欠费金额"
                           width="100"></el-table-column>

          <el-table-column label="操作"
                           fixed="right"
                           width="100">
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
      </el-tab-pane>
      <el-tab-pane label="当前合同">
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
                  ref="table1"
                  @selection-change="handleSelectionChange"
                  @sort-change="handleSortChange"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>

          <el-table-column prop="contractName"
                           label="合同名称"></el-table-column>

          <el-table-column prop="contractNo"
                           label="合同编号"></el-table-column>

          <el-table-column prop="peoName"
                           label="客户名称"></el-table-column>

          <el-table-column prop="signingDate"
                           label="签订日期"></el-table-column>

          <el-table-column prop="startDate"
                           label="起始日期"></el-table-column>

          <el-table-column prop="endDate"
                           label="截止日期"></el-table-column>

          <el-table-column prop="contractSource"
                           label="合同来源"></el-table-column>

          <el-table-column prop="status"
                           label="合同状态"></el-table-column>

          <el-table-column prop="registrant"
                           label="登记人"></el-table-column>

          <el-table-column label="操作"
                           width="150">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         class="table-show"
                         @click="handleEdit(scope.$index, scope.row)">合同变更</el-button>
              <el-button type="text"
                         size="small"
                         class="table-del"
                         @click="handleDelete(scope.$index, scope.row)">合同退租</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
              <el-col :span="12">
                <el-form-item label="产权类型:">
                  <el-select v-model="form.resourcePropertyType"
                             placeholder="请选择产权类型">
                    <el-option label="全部产权"
                               value="全部产权"></el-option>
                    <el-option label="小产权"
                               value="小产权"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同来源:">
                  <el-select v-model="form.contractSource"
                             placeholder="请选择合同来源">
                    <el-option label="新签订"
                               value="新签订"></el-option>
                    <el-option label="续签"
                               value="续签"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="合同有效期:">
                  <el-date-picker v-model="form.dateValidity"
                                  type="daterange"
                                  range-separator="~"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同状态:">
                  <el-select v-model="form.status"
                             placeholder="请选择合同状态">
                    <el-option label="正常"
                               value="正常"></el-option>
                    <el-option label="失效"
                               value="失效"></el-option>
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
// import { getattrContract, creatAttrContract, editAttrContract, deletAttrContract } from '../../http/attract/attrContract';
export default {
  data () {
    return {
      tabPosition: 'left',
      contract: [
        {
          date: "2016-06-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "王小黑",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
          id: 1,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        }, {
          date: "2016-05-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "虎",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "半年",
          amountReceivable: "100000",
          amountPaid: "22",
          refundAmount: "0",
          amountOwed: "123",
          id: 2,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        }, {
          date: "2016-05-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "王小虎",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
          id: 3,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        }, {
          date: "2016-05-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "王小虎",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
          id: 4,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        }, {
          date: "2016-05-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "王小虎",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
          id: 5,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        }, {
          date: "2016-05-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "王小虎",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
          id: 6,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        }, {
          date: "2016-05-02",
          contractName: "名称",
          management: "上海市普陀区",
          contractNo: "1231222",
          peoName: "王小虎",
          resourcePropertyType: '全部产权',
          per: "0",
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
          id: 7,
          signingDate: '2020-03-12',
          startDate: '2020-03-12',
          endDate: '2021-03-06',
          contractSource: '新签',
          status: '正常',
          registrant: '123222',
          dateValidity: ['2020-03-12', '2021-03-06'],
          tel:'13298235028'
        },
      ],
      page1: 1,
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,

      checkedBox: [],
      form: {
        date: '',
        contractName: '',
        management: '',
        contractNo: '',
        peoName: '',
        per: '',
        costCycle: '',
        amountReceivable: '',
        amountPaid: '',
        refundAmount: '',
        amountOwed: '',
        id: '',
      },



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

      editIndex: '',
      editId: ''
    }
  },
  methods: {
    handleDelete (index, item) {
      // 设置类似于console类型的功能
      window.console.log(item)
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.contract.splice(index, 1);
          this.form.id = this.editId
          // deletAttrContract(item.id).then(res => {
          //   window.console.log(res);
          //   if (res.status == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
            //   });
            //   this.loadData();
            // }
          })
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
      window.console.log(index)
      window.console.log(item)
      this.addCustomerVisibel = true
      this.form = { ...item }
      this.addDialogTitle = '编辑合同'
      this.editIndex = index
      this.editId = item.id
    },
    getTimeNow () {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.addDialogTitle == '新建合同') {
            // this.form.id = this.contract.length + 1;
            // creatAttrContract(this.form).then(res => {
            //   window.console.log(res)
            //   if (res.status == 201) {
            //     this.$message.success('新增成功');
            //     this.addCustomerVisibel = false;
            //     this.loadData();
            //   }
            // })
            this.form.startDate = this.form.dateValidity[0];
            this.form.endDate = this.form.dateValidity[1];
            this.form.signingDate = this.getTimeNow();

            this.contract.unshift({ ...this.form });
            this.addCustomerVisibel = false
          } else if (this.addDialogTitle == '编辑合同') {
            // editAttrContract(this.form).then(res => {
            //   window.console.log(res)
            //   if (res.status == 200) {
            //     this.$message.success('修改成功');
            //     this.addCustomerVisibel = false;
            //     this.loadData();
            //   }
            // })
            this.contract[this.editIndex] = this.form
            this.addCustomerVisibel = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    // loadData () {
    //   getattrContract().then(res => {
    //     window.console.log(res);
    //     this.contract = res.data
    //   })
    // }
  },
  // created () {
  // this.loadData();
  // }


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

  .el-tabs__item {
    color: rgba(255, 255, 255, 1);
  }
  .el-tabs__item.is-active {
    color: #4094ff;
  }
}
</style>