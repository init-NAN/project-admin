<template>
  <div class="earlyWarning">
    <div class="current-page-title">
      <span>合同预警</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans"
                   @click="delectAll()">取消预警</el-button>
      </el-col>
    </el-row>

    <el-table :data="warning"
              v-loading="listLoading"
              ref="table"
              @selection-change="handleSelectionChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>

      <el-table-column prop="contractNo"
                       label="合同编号"></el-table-column>

      <el-table-column prop="contractName"
                       label="合同名称"></el-table-column>

      <el-table-column prop="peoName"
                       label="客户"></el-table-column>

      <el-table-column prop="resourcePhone"
                       label="手机号码"></el-table-column>

      <el-table-column prop="dateStart"
                       label="开始日期"></el-table-column>

      <el-table-column prop="dateEnd"
                       label="结束日期"></el-table-column>

      <el-table-column prop="overdueDays"
                       label="合同逾期天数"></el-table-column>

      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="text"
                       
                     class="table-show"
                     @click="watchForm(scope.$index, scope.row)">查看</el-button>
          <el-button type="text"
                       
                     class="table-del"
                     @click="handleDelete(scope.$index, scope.row)">取消预警</el-button>
          <el-button type="text"
                       
                     class="table-show"
                     @click="$router.push('/attractInvestment/contract')">续签</el-button>
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

    <el-drawer title="我是标题"
               :with-header="false"
               :visible.sync="drawer"
               :before-close="closeForm"
               size="40%">
      <el-card class="box-card margin-top">
        <div slot="header"
             class="clearfix">
          <span class="title">合同详情</span>
        </div>
        <el-form :model="form"
                 ref="form"
                 disabled>
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
                <el-input v-model="form.resourcePhone"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
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
      <el-col class="hidden-card"
              :sm="22"
              :md="15"
              :offset="1">
      </el-col>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedBox: [],
      listLoading: false,
      warning: [
        {
          contractNo: '12322',
          contractName: '自行车',
          peoName: '二狗',
          resourcePhone: '1373423791',
          dateStart: '2019-06-21',
          dateEnd: '2020-06-21',
          overdueDays: '4',
          id: 1,
          date: "2016-06-02",
          management: "上海市普陀区",
          resourcePropertyType: '全部产权',
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
        },
        {
          contractNo: '12322',
          contractName: '自行车',
          peoName: 'oooo狗',
          resourcePhone: '1373423791',
          dateStart: '2019-06-21',
          dateEnd: '2020-06-21',
          overdueDays: '4',
          id: 2,
          date: "2016-06-02",
          management: "上海市普陀区",
          resourcePropertyType: '全部产权',
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
        },
        {
          contractNo: '12322',
          contractName: '自行车',
          peoName: 'fire',
          resourcePhone: '1373423791',
          dateStart: '2019-06-21',
          dateEnd: '2020-06-21',
          overdueDays: '4',
          id: 3,
          date: "2016-06-02",
          management: "上海市普陀区",
          resourcePropertyType: '全部产权',
          costCycle: "一年",
          amountReceivable: "100000",
          amountPaid: "12322",
          refundAmount: "0",
          amountOwed: "23123",
        },
      ],
      warningIndex: 1,
      page: 1,
      pageSize: 10,
      total: 3,
      drawer: false,
      form: {}
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
    delectAll () {
      this.$confirm("取消预警合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据

          for (let i = 0; i < this.warning.length; i++) {
            const element = this.warning[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.warning.forEach((e, i) => {

              if (element.id == e.id) {
                this.warning.splice(i, 1)
              }
            });
          });
          this.$message({
            type: "success",
            message: "取消预警成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消预警"
          });
        });
    },
    // handleClose (done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => { });
    // },
    handleDelete (index, item) {
      // 设置类似于console类型的功能
      window.console.log(item)
      this.$confirm("取消预警该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.contract.splice(index, 1);
          // this.form.id = this.editId
          // deletAttrContract(item.id).then(res => {
          //   window.console.log(res);
          //   if (res.status == 200) {
          this.$message({
            type: "success",
            message: "取消预警成功!"
            //   });
            //   this.loadData();
            // }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消预警"
          });
        });
    },
    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
    },
    // resetForm (formName) {
    //   if (this.$refs[formName] !== undefined) {
    //     this.$refs[formName].resetFields();
    //   }
    // },

    watchForm (index, item) {
      // window.console.log(index)
      // window.console.log(item)
      this.drawer = true
      this.form = { ...item }
    },
  }
}
</script>

<style lang="less" scope>
.earlyWarning {
  .el-drawer {
    background-color: rgba(10, 13, 51, 0.7);
    overflow: scroll;
    overflow-x: hidden;
  }
  .margin-top {
    margin-top: 40px;
  }
  .box-card {
    .title {
      background: linear-gradient(to right, #825bfb, #0497e0, #4b53f9);
      -webkit-background-clip: text;
      color: transparent;
    }
    .el-form {
      .el-form-item__label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .el-input__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .el-table .el-button {
    color: #fff;
    background-color: transparent;
    font-size: 13px;
  }
}
</style>