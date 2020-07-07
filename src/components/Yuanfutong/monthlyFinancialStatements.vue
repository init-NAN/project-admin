<template>
  <div class="monthly">
    <div class="current-page-title">
      <span>财务月报表</span>
    </div>
    <el-form :model="searchForm"
             label-width="auto"
             label-position="left"
             ref="form">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-form-item label="年份:">
            <el-select v-model="searchForm.year">
              <el-option :label="item"
                         :key="index"
                         v-for="(item,index) in searchYears"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="月份:">
            <el-select v-model="searchForm.month">
              <el-option :label="item"
                         :key="index"
                         v-for="(item,index) in searchMonth"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button class="btn-addmore">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-col :span="24">
      <p class="monthly-title">园付通收支情况表</p>
    </el-col>
    <el-table :data="rechargeData"
              v-loading="listLoading"
              ref="table"
              class="margin-bottom-40 nomalTable"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

      <el-table-column label="项目"
                       width="150">金额</el-table-column>

      <el-table-column label="充值金额">
        <el-table-column prop="cumulativeRecharge"
                         label="累计充值"></el-table-column>
        <el-table-column prop="rechargeMonth"
                         label="本月充值"></el-table-column>

      </el-table-column>

      <el-table-column label="消费金额">
        <el-table-column prop="cumulativeConsumption"
                         label="累计消费"></el-table-column>
        <el-table-column prop="consumptionMonth"
                         label="本月消费"></el-table-column>

      </el-table-column>

      <el-table-column prop="balance"
                       label="未消费金额"
                       width="130"></el-table-column>

      <el-table-column prop="memberCardBalance"
                       label="会员卡余额"></el-table-column>

    </el-table>

    <el-col :span="24">
      <p class="monthly-title">园付通收支情况表</p>
    </el-col>
    <el-table :data="summary"
              v-loading="listLoading"
              ref="table2"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

      <el-table-column label="充值途径"
                       prop="rechargeChannels"></el-table-column>

      <el-table-column prop="cumulativeRecharge"
                       label="累计充值"></el-table-column>

      <el-table-column prop="rechargeMonth"
                       label="本月充值"></el-table-column>

    </el-table>

    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        year: '2020',
        month: '05'
      },
      searchMonth: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      searchYears: ['2020', '2019', '2018', '2017', '2016', '2015', '2014'],
      listLoading: false,
      rechargeData: [
        {
          cumulativeRecharge: '0.00',
          rechargeMonth: '0.00',
          cumulativeConsumption: '0.00',
          consumptionMonth: '0.00',
          balance: '0.00',
          memberCardBalance: '0.00'
        }
      ],
      summary: [
        {
          rechargeChannels: '微信充值',
          cumulativeRecharge: '0.00',
          rechargeMonth: '0.00'
        },
        {
          rechargeChannels: '支付宝充值',
          cumulativeRecharge: '0.00',
          rechargeMonth: '0.00'
        },
        {
          rechargeChannels: '银行转账',
          cumulativeRecharge: '0.00',
          rechargeMonth: '0.00'
        },
        {
          rechargeChannels: '一网通充值',
          cumulativeRecharge: '0.00',
          rechargeMonth: '0.00'
        },
        {
          rechargeChannels: '充值合计',
          cumulativeRecharge: '0.00',
          rechargeMonth: '0.00'
        }
      ],

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scope>
.monthly {
  .monthly-title {
    text-align: center;
    margin-bottom: 10px;
    line-height: 30px;
    font-size: 18px;
    color: #e1ffff;
  }
  .el-table {
    border: none;
    text-align: center;
  }
  .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }
  .nomalTable {
    .el-table__header-wrapper .el-table__header > thead > tr th .cell {
      text-align: center;
    }

    .el-table__body-wrapper .el-table__body > tbody > tr.row-0 td .cell {
      text-align: center;
    }
    .el-table__body-wrapper .el-table__body > tbody > tr.row-0 {
      &:first-child {
        .cell {
          color: #fff;
          font-weight: 800;
        }
      }
    }
  }
  .el-table .el-table__header-wrapper .el-table__header > thead > tr th .cell,
  .el-table .el-table__body-wrapper .el-table__body > tbody > tr.row-0 td .cell,
  .el-table
    .el-table__body-wrapper
    .el-table__body
    > tbody
    > tr.row-1
    td
    .cell {
    text-align: center;
  }
  .margin-bottom-40 {
    margin-bottom: 40px;
  }
}
</style>