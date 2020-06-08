<template>
  <div class="overview-attr">

    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">
      <div class="header">
        <p class="title">
          招商项目总览
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月意向</p>
            <p class="content-num">30</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">2000</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月签约</p>
            <p class="content-num">12</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年签约</p>
            <p class="content-num">1348</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">正在跟进</p>
            <p class="content-num">5</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年转化率</p>
            <p class="content-num">67.42%</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">

      <div class="header">
        <p class="title">
          产业总览
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">今年入驻</p>
            <p class="content-num">400</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">同比</p>
            <p class="content-num">60%</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">今年产值/万元</p>
            <p class="content-num">4620</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">同比</p>
            <p class="content-num">80%</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">今年退园</p>
            <p class="content-num">347</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">同比</p>
            <p class="content-num">0.05%</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">

      <div class="header">
        <p class="title">
          项目最新动态
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="img-box">
        <img src="../../assets/img/login-poto.gif"
             alt="">
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="11"
            :offset="1">

      <div class="header">
        <p class="title">
          月交易情况
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="article-box"
           ref="attractlArticle">

      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="11"
            :offset="1">

      <div class="header">
        <p class="title">
          招商负责人项目情况
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="img-box">
        <img src="../../assets/img/login-poto.gif"
             alt="">
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">

      <div class="header">
        <p class="title">
          近3年签约情况
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="table">
        <el-table :data="tableData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="date"
                           label="年份"
                           width="180">
          </el-table-column>
          <el-table-column prop="type"
                           label="软件行业类型"
                           width="180">
          </el-table-column>
          <el-table-column prop="yearTotal"
                           label="当年总计">
          </el-table-column>
          <el-table-column prop="onyear"
                           label="同比">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">

      <div class="header">
        <p class="title">
          意向来源分析
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="article-box"
           ref="fromCustomer"></div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="15"
            :offset="1">

      <div class="header">
        <p class="title">
          招商负责人动向
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="table">
        <el-table :data="formData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

          <el-table-column prop="name"
                           label="负责人">
          </el-table-column>
          <el-table-column prop="tel"
                           label="电话">
          </el-table-column>
          <el-table-column prop="email"
                           label="邮件">
          </el-table-column>
          <el-table-column prop="visit"
                           label="拜访">
          </el-table-column>
          <el-table-column prop="visitQ"
                           label="参观">
          </el-table-column>
          <el-table-column prop="other"
                           label="其他">
          </el-table-column>
          <el-table-column prop="total"
                           label="合计">
          </el-table-column>
        </el-table>
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
export default {
  data () {
    return {
      tableData: [{
        date: '2016',
        name: '王小虎',
        type:'0',
        yearTotal:'20',
        onyear: '5%'
      },{
        date: '2016',
        name: '王小虎',
        type:'0',
        yearTotal:'20',
        onyear: '5%'
      },{
        date: '2016',
        name: '王小虎',
        type:'0',
        yearTotal:'20',
        onyear: '5%'
      },],
      formData: [{
        name: '王小虎',
        tel: '1459239482',
        email: '2734786@163.com',
        visit: '5',
        visitQ: '2',
        other: '',
        total: '7'
      },{
        name: '王小虎',
        tel: '1459239482',
        email: '2734786@163.com',
        visit: '5',
        visitQ: '2',
        other: '',
        total: '7'
      },{
        name: '王小虎',
        tel: '1459239482',
        email: '2734786@163.com',
        visit: '5',
        visitQ: '2',
        other: '',
        total: '7'
      },]
    }
  },
  mounted () {
    var ecarrt = echarts.init(this.$refs.attractlArticle);
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
        data: ['成交量', '平均成交价格'],
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
          name: '成交量',
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
          name: '平均成交价格',
          nameTextStyle: { color: '#fff' },
          min: 20,
          max: 120,
          interval: 20,
          axisLabel: {
            color: '#fff',
            formatter: '{value} 万元'
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
          name: '成交量',
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
          name: '平均成交价格',
          type: 'line',
          yAxisIndex: 1,
          data: [20, 16, 50, 89, 75, 100, 20, 89, 98, 66, 46, 86]
        }
      ]
    };
    ecarrt.setOption(option);

    var ecfromCustomer = echarts.init(this.$refs.fromCustomer);
    var optionCustomer = {
      color: ["#66d364", "#dce090", "#4949c1"],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['上门', '电话', '网络'],
        textStyle: {
          color: "#fff"
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 444, name: '上门' },
            { value: 21, name: '电话' },
            { value: 234, name: '网络' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    ecfromCustomer.setOption(optionCustomer)
  }
}
</script>

<style lang="less" scope>
.overview-attr {
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
    .article-box {
      height: 400px;
    }
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>