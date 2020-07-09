<template>
  <div class="overview-parking">
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">
      <div class="header">
        <p class="title">
          车位数据
        </p>
        <Refresh></Refresh>
      </div>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>车位总数</p>
          <p class="bigNum highline">1.1w</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>已用车位数</p>
          <p class="bigNum">1202</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>空闲车位数量</p>
          <p class="bigNum">9998</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>专用车已用车位数</p>
          <p class="bigNum">15</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="3"
              class="parkingOverview">
        <div class="parkingNum">
          <p>专用车空闲车位数</p>
          <p class="bigNum">15</p>
        </div>
      </el-col>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="11"
            :offset="1">
      <div class="header">
        <p class="title">
          缴费数据
        </p>
        <Refresh></Refresh>
      </div>
      <el-col :span="8"
              class="parkingOverview">
        <div class="parkingNum">
          <p>总金额数</p>
          <p class="bigNum highline">1332</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="8"
              class="parkingOverview">
        <div class="parkingNum">
          <p>临停金额数</p>
          <p class="bigNum">0</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="7"
              class="parkingOverview">
        <div class="parkingNum">
          <p>月卡金额数</p>
          <p class="bigNum">1332</p>
        </div>
      </el-col>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="11"
            :offset="1">
      <div class="header">
        <p class="title">
          车流数据
        </p>
        <Refresh></Refresh>
      </div>
      <el-col :span="8"
              class="parkingOverview">
        <div class="parkingNum">
          <p>当日总通行量</p>
          <p class="bigNum highline">1.1w</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="8"
              class="parkingOverview">
        <div class="parkingNum">
          <p>已用车位数</p>
          <p class="bigNum">1202</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="7"
              class="parkingOverview">
        <div class="parkingNum">
          <p>空闲车位数量</p>
          <p class="bigNum">9998</p>
        </div>
      </el-col>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="11"
            :offset="1">
      <div class="header">
        <p class="title">
          巡查计划
        </p>
        <Refresh></Refresh>
      </div>
      <div class="echarts"
           ref="overviewParkingCharts">

      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="11"
            :offset="1">
      <div class="header">
        <p class="title">
          缴费数据
        </p>
        <Refresh></Refresh>
      </div>
      <el-col :span="8"
              class="parkingOverview">
        <div class="parkingNum">
          <p>车位总数</p>
          <p class="bigNum highline">1.1w</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="8"
              class="parkingOverview">
        <div class="parkingNum">
          <p>已用车位数</p>
          <p class="bigNum">1202</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="7"
              class="parkingOverview">
        <div class="parkingNum">
          <p>空闲车位数量</p>
          <p class="bigNum">9998</p>
        </div>
      </el-col>
    </el-col>
    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>

import echarts from 'echarts';
import Refresh from "@/components/common/refresh.vue";
export default {
  components: {
    Refresh
  },
  mounted () {
    var ecoverviewParkingCharts = echarts.init(this.$refs.overviewParkingCharts);
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
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1500, 1120, 249, 900, 964],
          
        }
      ]
    };
    ecoverviewParkingCharts.setOption(option);
  },
}
</script>

<style lang="less" scope>
.overview-parking {
  .overview-card {
    // height: 300px;
    background-color: rgba(10, 13, 51, 0.7);
    margin-bottom: 40px;
    .header {
      background: url("../../assets/type.png") no-repeat;
      height: 37px;
      width: 100%;
      padding-left: 18px;
      position: relative;

      .title {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 37px;
      }
      .refresh {
        position: absolute;
        top: 10px;
        right: 15px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: rgba(167, 166, 166, 0.89);
        }
      }
    }
    .cCard {
      .content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .content-card {
          display: inline-block;
          width: 49%;
          height: 66px;
          text-align: center;
          margin-bottom: 20px;
          // background-color: #0f0;
          .content-title {
            color: #9ea2c0;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 40px;
          }
          .content-num {
            color: #0ffff3;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
        }

        .verticalLine {
          display: inline-block;
          width: 1px;
          height: 66px;
          background: linear-gradient(
            to top,
            #3669da 0%,
            #e360ff 6%,
            #57c8ff 100%
          );
        }
      }
    }
    .table {
      padding: 0 20px;
    }
    .img-box {
      img {
        width: 100%;
      }
    }
    .echarts {
      height: 263px;
    }

    .parkingOverview {
      color: rgb(125, 138, 167);
      line-height: 2;
      text-align: center;
      .highline {
        color: rgb(15, 255, 238);
      }
      .bigNum {
        font-size: 32px;
      }
    }

    .verticalLine {
      float: left;
      display: inline-block;
      width: 1px;
      height: 86px;
      background: linear-gradient(to top, #3669da 0%, #e360ff 6%, #57c8ff 100%);
    }
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>