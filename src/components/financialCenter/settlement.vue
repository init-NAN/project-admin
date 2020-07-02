<template>
  <div class="settlement">
    <div class="current-page-title">
      <span>结算单</span>
      <div class="line"></div>
    </div>

    <el-table :data="settlement"
              resizable
              ref="table"
              v-loading="listLoading"
              @selection-change="handleSelectionChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

      <!-- <el-table-column type="selection"
                       width="55">
      </el-table-column> -->
      <el-table-column prop="customerName"
                       label="客户名称">
      </el-table-column>
      <el-table-column prop="contractNo"
                       label="合同编号">
      </el-table-column>
      <el-table-column prop="contractName"
                       label="合同名称">
      </el-table-column>
      <el-table-column prop="totalReceivables"
                       label="应收总额">
      </el-table-column>
      <el-table-column prop="totalPayable"
                       label="应付总额">
      </el-table-column>
      <el-table-column prop="settlementAmount"
                       label="结算金额">
      </el-table-column>
      <el-table-column prop="settlementDate"
                       label="结算日期">
      </el-table-column>
      <el-table-column prop="status"
                       label="结算状态">
        <template v-slot="scope">
          {{scope.row.status =='1'?'已结清':'未结清'}}
        </template>
      </el-table-column>

      <!-- <el-table-column prop="intended"
                       label="意向房源"
                       show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                      
                     class="table-show"
                     @click="watchForm(scope.$index, scope.row)">查看</el-button>
          <el-button type="text"
                      
                     class="table-del"
                     @click="editRole(scope.$index, scope.row)">
            {{scope.row.status == '1'?'清除结算':'结算确认'}}
          </el-button>
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
               size="80%">
      <el-card class="box-card margin-top">
        <div slot="header"
             class="clearfix">
          <span class="title">结算详情</span>
        </div>
        <el-form :model="form"
                 disabled
                 label-position='left'
                 label-width="auto"
                 ref="form">
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="12">
              <el-form-item label="客户名称:"
                            prop="customerName">
                <el-input v-model="form.customerName"
                          autocomplete="off"></el-input>
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
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="12">
              <el-form-item label="合同名称:"
                            prop="contractName">
                <el-input v-model="form.contractName"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结算日期:">
                <el-date-picker v-model="form.settlementDate"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="24"
                    class="margin-bottom-10">
              应收清算
            </el-col>
            <el-table :data="form.liquidationReceivables"
                      resizable
                      ref="table1"
                      v-loading="listLoading"
                      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
              <el-table-column prop="stor"
                               label="#">
              </el-table-column>
              <el-table-column prop="roomName"
                               label="房间名称">
              </el-table-column>
              <el-table-column prop="itemName"
                               label="费项名称">
              </el-table-column>
              <el-table-column prop="reciveMonth"
                               label="月份">
              </el-table-column>
              <el-table-column prop="amountReceivable"
                               label="应收金额">
              </el-table-column>
              <el-table-column prop="lateFee"
                               label="滞纳金">
              </el-table-column>
              <el-table-column prop="reciveSubtotal"
                               label="小计">
              </el-table-column>
            </el-table>

          </el-row>
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="12">
              <el-form-item label="小写合计（元）:"
                            prop="totalReceivables">
                <el-input v-model="form.totalReceivables"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大写合计（人民币）:"
                            prop="totalReceivablesWords">
                <el-input v-model="form.totalReceivablesWords"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="24"
                    class="margin-bottom-10">
              应付清算
            </el-col>
            <el-table :data="form.liquidationPayable"
                      resizable
                      ref="table2"
                      v-loading="listLoading"
                      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
              <el-table-column prop="stor"
                               label="#">
              </el-table-column>
              <el-table-column prop="itemName"
                               label="费项名称">
              </el-table-column>
              <el-table-column prop="amountCollected"
                               label="收款金额">
              </el-table-column>
              <el-table-column prop="balance"
                               label="余额">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="12">
              <el-form-item label="小写合计（元）:"
                            prop="totalPayable">
                <el-input v-model="form.totalPayable"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="大写合计（人民币）:"
                            prop="totalPayableWords">
                <el-input v-model="form.totalPayableWords"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30"
                  class="margin-top">
            <el-col :span="24"
                    class="margin-bottom-10">
              清算合计（元）
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收清算:"
                            prop="totalReceivables">
                <el-input v-model="form.totalReceivables"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应付清算:"
                            prop="totalPayable">
                <el-input v-model="form.totalPayable"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算金额:"
                            prop="settlementAmount">
                <el-input v-model="form.settlementAmount"
                          placeholder="请输入结算金额"
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
      page: 1,
      pageSize: 20,
      total: 20,
      listLoading: false,
      settlement: [
        {
          customerName: '王小花',
          contractNo: 'ZL2020000000057',
          contractName: '随便什么公司',
          totalReceivables: '2,516.13',
          totalPayable: '17,500.00',
          settlementAmount: '-14,983.87',
          settlementDate: '2020-03-13',
          status: 0,
          recivefigures: '',
          liquidationReceivables: [
            {
              stor: 1,
              roomName: '房间10025',
              itemName: '管理费',
              reciveMonth: '2020-03',
              amountReceivable: '8,101.21',
              lateFee: '0.00',
              reciveSubtotal: '8,101.21'
            },
          ],
          totalReceivablesWords: '叁万叁仟肆佰伍拾肆元玖角陆分',
          liquidationPayable: [
            {
              stor: '1',
              itemName: '押金',
              amountCollected: '9,000.00',
              balance: '5,5000.00'
            }
          ],
          totalPayableWords:'伍仟伍佰元整'
        },
        {
          customerName: '李小苗',
          contractNo: 'WY2020000000026',
          contractName: 'sfl公司',
          totalReceivables: '33,424.96',
          totalPayable: '5,500.00',
          settlementAmount: '27,924.96',
          settlementDate: '2020-03-10',
          status: 0,
          liquidationReceivables: [
            {
              stor: 1,
              roomName: '房间10025',
              itemName: '管理费',
              reciveMonth: '2020-03',
              amountReceivable: '8,101.21',
              lateFee: '0.00',
              reciveSubtotal: '8,101.21'
            },
          ],
          totalReceivablesWords: '叁万叁仟肆佰伍拾肆元玖角陆分',
          liquidationPayable: [
            {
              stor: '1',
              itemName: '押金',
              amountCollected: '9,000.00',
              balance: '5,5000.00'
            }
          ],
          totalPayableWords:'伍仟伍佰元整'
        },

      ],
      form: {},
      chargesTitle: '',
      drawer: false,
      settlementIndex: '',

    }
  },
  methods: {
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
    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
    },
    watchForm (index, item) {
      // window.console.log(index)
      // window.console.log(item)
      this.drawer = true
      this.form = { ...item }
    },
    editRole(index,item) {
      window.console.log(item)
      this.settlement[index].status = !this.settlement[index].status
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="less" scope>
.settlement {
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
  .el-drawer {
    background-color: rgba(10, 13, 51, 0.7);
    overflow: scroll;
    overflow-x: hidden;
  }
  .margin-top {
    margin-top: 40px;
  }
  .box-card {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 16px;
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
  .el-card__header {
    border: none;
  }
}
</style>