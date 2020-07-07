<template>
  <div class="overview-yuan">
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">
      <div class="header">
        <p class="title">
          园付通商家及会员情况
        </p>
        <Refresh></Refresh>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">累计会员</p>
            <p class="content-num">30</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">今日开通</p>
            <p class="content-num">200</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本周开通</p>
            <p class="content-num">212</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本月开通</p>
            <p class="content-num">3348</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">商家数量</p>
            <p class="content-num">5</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">收银机</p>
            <p class="content-num">20</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="15"
            :offset="1">

      <div class="header">
        <p class="title">
          园付通充值情况
        </p>
        <Refresh></Refresh>
      </div>
      <div class="pay-card">

        <el-col :span="5"
                :offset="8">
          <p>累计充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
          <p>今日充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
          <p>银行转账充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
        </el-col>
        <el-col :span="5">
          <p>累计余额充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}.00</span>元</p>
          <p>微信充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
          <p>本月充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
        </el-col>
        <el-col :span="5">
          <p>支付宝充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
          <p>本周充值: <span class="bigNum">{{Recharge.cumulativeRecharge}}</span>元</p>
        </el-col>

      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="15"
            :offset="1">

      <div class="header">
        <p class="title">
          园付通充值情况一览
        </p>
        <Refresh></Refresh>
      </div>
      <div class="article-box"
           ref="yuanArticle">

      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">

      <div class="header">
        <p class="title">
          园付通消费情况
        </p>
        <Refresh></Refresh>
      </div>
      <div class="cCard">
        <div class="content margin-bottom">
          <div class="content-card">
            <p class="content-title">今日消费</p>
            <p class="content-num">0元</p>
            <p class="content-title">今日会员数: 0 </p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">昨日消费</p>
            <p class="content-num">0元</p>
            <p class="content-title">昨日会员数: 0 </p>
          </div>
        </div>
        <div class="content margin-bottom">
          <div class="content-card">
            <p class="content-title">本周消费</p>
            <p class="content-num">0元</p>
            <p class="content-title">本周会员数: 0 </p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本月消费</p>
            <p class="content-num">0元</p>
          </div>
        </div>
      </div>
    </el-col>

    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>
import echarts from "echarts";
import Refresh from "@/components/common/refresh.vue";
export default {
  components: {
    Refresh
  },
  data () {
    return {
      Recharge: {
        cumulativeRecharge: '0'
      }
    }
  },
  mounted () {
    var ecyuan = echarts.init(this.$refs.yuanArticle);
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#fff'
          },
          label: { backgroundColor: '#aaa' },
        }
        // tooltip.axisPointer.label. shadowColor =  backgroundColor = 'auto'
      },
      toolbox: {
        feature: {
          // dataView: {show: true, readOnly: false},
          magicType: { show: true, type: ['line'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },
      legend: {
        data: ['充值数额', '平均充值数额'],
        textStyle: {
          color: "#fff"
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          },
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
          axisTick: { lineStyle: { color: '#fff' } },
          type: 'value',
          name: '充值数额',
          nameTextStyle: { color: '#fff' },
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            color: '#fff',
            formatter: '{value} '
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        {
          type: 'value',
          name: '平均充值数额',
          nameTextStyle: { color: '#fff' },
          min: 20,
          max: 120,
          interval: 20,
          axisLabel: {
            color: '#fff',
            formatter: '{value} 元'
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
          name: '充值数额',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            //柱形图圆角，鼠标移上去效果
            emphasis: {
              barBorderRadius: [10, 10, 10, 10]
            },

            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [40, 40, 40, 40]
            }
          },
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '平均充值数额',
          type: 'line',
          yAxisIndex: 1,
          data: [20, 16, 50, 89, 75, 100, 20, 89, 98, 66, 46, 86]
        }
      ]
    };
    ecyuan.setOption(option);
  },
}
</script>

<style lang="less" scope>
.overview-yuan {
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
    .pay-card {
      color: #9ea2c0;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 2;
      height: 258px;
      padding-top: 20px;

      .bigNum {
        display: inline-block;
        font-size: 20px;
        color: #9932cc;
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
    .article-box {
      height: 400px;
    }
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
  .margin-bottom {
    margin-bottom: 20px;
  }
}
</style>