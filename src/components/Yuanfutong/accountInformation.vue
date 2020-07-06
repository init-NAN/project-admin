<template>
  <div class="accountInfo">
    <div class="current-page-title">
      <span>账户信息</span>
    </div>
    <el-row class="infoOverview">
      <el-col :span="6"
              class="txt-right">
        <p>账户累积金额 :<span class="redWorld">{{overviewData.accountCumulativeAmount}}</span>元</p>
        <p>支付宝累积金额 :<span class="redWorld">{{overviewData.alipayAccountAmount}}</span>元</p>
        <p>微信累积金额 :<span class="redWorld">{{overviewData.wechatAccountAmount}}</span>元</p>
        <p>银行转账累积金额 :<span class="redWorld">{{overviewData.bankAccountAmount}}</span>元</p>
      </el-col>
      <el-col :span="6"
              class="text-align-center">
        <p>本日充值金额 :<span class="redWorld">{{overviewData.amountFullDay}}</span>元</p>
        <p>本周充值金额 :<span class="redWorld">{{overviewData.amountFullweek}}</span>元</p>
        <p>本月充值金额 :<span class="redWorld">{{overviewData.amountFullMounth}}</span>元</p>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName"
             style="height: 100%;"
             @tab-click="toclick">
      <el-tab-pane label="充值信息"
                   name="充值信息">
        <el-form :model="searchForm"
                 label-width="auto"
                 label-position="left"
                 ref="form">
          <el-row :gutter="30">
            <el-col :span="11">
              <el-form-item label="交易付款时间:">
                <el-date-picker v-model="searchForm.paymentTime"
                                type="daterange"
                                range-separator="至"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="充值类型:">
                <el-select v-model="searchForm.pay">
                  <el-option label="支付宝"
                             value="shanghai"></el-option>
                  <el-option label="微信"
                             value="beijing"></el-option>
                  <el-option label="银行"
                             value="out"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button class="btn-addmore">查询</el-button>
              <el-button class="btn-addmore">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="rechargeData"
                  v-loading="listLoading"
                  ref="table"
                  @sort-change="handleSortChange"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="memberCode"
                           label="会员卡号"
                           width="150"></el-table-column>

          <el-table-column prop="rechargeAmount"
                           label="充值金额(元)"
                           width="110"></el-table-column>

          <el-table-column prop="paymentTime"
                           label="交易付款时间"
                           width="130"></el-table-column>

          <el-table-column prop="serialNumber"
                           label="流水号"
                           width="130"></el-table-column>

          <el-table-column prop="paymentType"
                           label="支付类型"></el-table-column>

          <el-table-column prop="transactionStatus"
                           label="交易状态"></el-table-column>

          <el-table-column prop="describe"
                           label="描述"></el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="提现信息"
                   name="提现信息">
        <el-form :model="searchForm2"
                 label-width="auto"
                 label-position="left"
                 ref="form">
          <el-row :gutter="30">
            <el-col :span="13">
              <el-form-item label="提现时间:">
                <el-date-picker v-model="searchForm2.paymentTime"
                                type="daterange"
                                range-separator="至"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button class="btn-addmore">查询</el-button>
              <el-button class="btn-addmore">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="withdrawaData"
                  v-loading="listLoading"
                  ref="table"
                  @sort-change="handleSortChange"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="applicant"
                           label="申请人"
                           width="150"></el-table-column>

          <el-table-column prop="applicantionTime"
                           label="申请时间"
                           width="110"></el-table-column>

          <el-table-column prop="withdrawalTime"
                           label="提现时间"
                           width="130"></el-table-column>

          <el-table-column prop="withdrawalAmount"
                           label="提现金额(元)"
                           width="130"></el-table-column>

          <el-table-column prop="withdrawalType"
                           label="提现类型"></el-table-column>

          <el-table-column prop="bankName"
                           label="银行名称"></el-table-column>

          <el-table-column prop="bankCardNumber"
                           label="银行卡号"></el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>

    <Pagings :total="total"
             :page="page"
             :pageSize="pageSize"
             @handleSizeChangeSub="handleSizeChange"
             @handleCurrentChangeSub="handleCurrentChange"></Pagings>

    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>
import Pagings from "@/components/common/Pagings.vue";
export default {
  components: {
    Pagings
  },
  data () {
    return {
      overviewData: {
        accountCumulativeAmount: '0.00',
        alipayAccountAmount: '0.0',
        wechatAccountAmount: '0.0',
        bankAccountAmount: '0.0',
        amountFullDay: '0.00',
        amountFullweek: '0.00',
        amountFullMounth: '0.00',
      },
      searchForm: {},
      searchForm2:{},
      activeName: '充值信息',
      listLoading: false,
      rechargeData: [],
      withdrawaData:[],
      page: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    toclick (tab, event) {
      window.console.log(tab.label)
      window.console.log(event)
    },
    handleSortChange (col) {
      if (col.prop == null) {
        return;
      }
    },
    //fenye
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
  }
}
</script>

<style lang="less" scope>
.accountInfo {
  .text-align-center {
    text-align: center;
  }
  .infoOverview {
    color: #fff;
    line-height: 30px;
    font-size: 16px;
  }
  .redWorld {
    color: #f00;
  }
  .txt-right {
    text-align: right;
    padding-right: 5%;
  }
  .el-tabs__item {
    color: rgba(255, 255, 255, 1);
  }
  .el-tabs__item.is-active {
    color: #4094ff;
  }
}
</style>