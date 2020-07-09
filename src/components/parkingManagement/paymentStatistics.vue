<template>
  <div class="payment">
    <div class="current-page-title">
      <span>收费管理</span>
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

    <el-row :gutter="30">
      <el-col :span="8">
        <el-card>
          <div class="top-bar clearfix margin-bottom-40">
            <span class="float-left top-bar-title">月卡缴费</span>
            <span class="float-right"><span class="bigNum">0.00</span> 元</span>
          </div>
          <div class="bottom-bar">
            <span>缴费: &nbsp;&nbsp;&nbsp;&nbsp;<span class="bigNum">0</span> 次</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>平均: <span class="bigNum">0.00</span> 元</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="top-bar clearfix margin-bottom-40">
            <span class="float-left top-bar-title">临时停车缴费</span>
            <span class="float-right"><span class="bigNum">0.00</span> 元</span>
          </div>
          <div class="bottom-bar">
            <span>缴费: &nbsp;&nbsp;&nbsp;&nbsp;<span class="bigNum">0</span> 次</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>平均: <span class="bigNum">0.00</span> 元</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="top-bar clearfix margin-bottom-40">
            <span class="float-left top-bar-title">累计服务车辆</span>
            <span class="float-right"><span class="bigNum">0</span> 次</span>
          </div>
          <div class="top-bar clearfix">
            <span class="float-left top-bar-title">车辆平均停留</span>
            <span class="float-right"><span class="bigNum">0</span> 小时</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="24">
        <el-card>
          <span>缴费走势</span>
          <div class="echarts-box"
               ref="paymentCharts">

          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data () {
    return {
      searchForm: {
        year: '2020',
        month: '05'
      },
      searchMonth: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      searchYears: ['2020', '2019', '2018', '2017', '2016', '2015', '2014'],
    }
  },
  mounted () {
    var ecMonthly = echarts.init(this.$refs.paymentCharts);
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['缴费走势'],
        textStyle: {
          color: "#fff"
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
          
          axisLabel: {
            color: '#fff'

          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#fff',
            formatter: '{value} '
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        }
      ],
      color: [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#14E6FF' // 0% 处的颜色
        }, {
          offset: 1, color: '#60FFAE' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }, '#0f0'],
      series: [

        {
          name: '缴费走势',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1500, 1120, 249, 900, 964]
        }
      ]
    };
    ecMonthly.setOption(option);
  },
}
</script>

<style lang="less" scope>
.payment {
  .el-card {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    // background-color: rgba(10, 13, 51, 0.7);
    margin-bottom: 40px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 2;
    .el-form {
      .el-form-item__label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .top-bar {
    .top-bar-title {
      font-size: 20px;
    }
  }
  .bigNum {
    font-size: 18px;
  }
  .echarts-box {
    height: 300px;
  }
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
  .margin-bottom-40 {
    margin-bottom: 40px;
  }
}
</style>