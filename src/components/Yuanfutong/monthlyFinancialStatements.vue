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
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column label="项目"
                       prop="text"
                       width="150">金额</el-table-column>

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

    <el-col :span="24">
      <p class="monthly-title">园付通收支情况表</p>
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
          text: '金额',

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
  .row-0 {
    .el-table
      .el-table__body-wrapper
      .el-table__body
      > tbody
      > tr.row-0
      td
      .cell {
      &:first-child {
        color: #fff !important ;
        font-weight: 800 !important;
      }
    }
    &:first-child {
      color: #fff !important ;
      font-weight: 800 !important;
    }
  }
}
</style>