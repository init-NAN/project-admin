<template>
  <div class="main-content">
    <el-row class="overviewItem" type="flex">
      <el-col :span="11" :offset="1" class="overviewCard" :lg="11" :sm="23">
        <div class="cardHead">收账总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody" style="width:100%;height:280px;">
          <div class="cCard">
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月应收(万元)</p>
                <p class="content-num">20</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">本年应收(万元)</p>
                <p class="content-num">400</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月未收(万元)</p>
                <p class="content-num">20</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">本年未收(万元)</p>
                <p class="content-num">100</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月滞纳(万元)</p>
                <p class="content-num">20</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">本年滞纳(万元)</p>
                <p class="content-num">100</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="11" class="overviewCard" :offset="1" :lg="11" :sm="23">
        <div class="cardHead">押金总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody" style="width:100%;height:280px;">
          <div class="cCard">
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月收押金(万元)</p>
                <p class="content-num">100</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上月同比增长(万元)</p>
                <p class="content-num">25%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本年收押金(万元)</p>
                <p class="content-num">1200</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上年同比增长(万元)</p>
                <p class="content-num">20%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月退还押金(万元)</p>
                <p class="content-num">80</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">本年退还押金(万元)</p>
                <p class="content-num">1000</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="24" class="overviewCard" :offset="1">
        <div class="cardHead">收费项总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody" style="width:100%;height:400px;">
          <div class="article-box"
           ref="attractlArticle">
           </div>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row class="overviewItem" type="flex">
      <el-col :span="15" class="overviewCard" :offset="1">
        <div class="cardHead">报修总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div ref="overViewRepaireApplication" style="width:100%;height:400px;"></div>
        </div>
      </el-col>
    </el-row> -->
    <div style="width:100%;height:120px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
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
        data: ['占比', '每月平均收费'],
        textStyle: {
          color: "#fff"
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['租金', '管理费', '电费', '水费', '公摊电费', '公摊水费', '尖电费', '峰电费', '平电费', '谷电费', '其他', '临时费'],
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
          name: '占比',
          nameTextStyle: { color: '#fff' },
          min: 0,
          max: 40,
          interval: 20,
          axisLabel: {
            color: '#fff',
            formatter: '{value}%'
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }
        },
        {
          type: 'value',
          name: '平均每月收费',
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
          name: '收费占比',
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
          data: [5, 5, 5, 5, 5, 10, 15, 5, 20, 10, 5, 10]
        },
        {
          name: '每月平均收费',
          type: 'line',
          yAxisIndex: 1,
          data: [20, 16, 50, 89, 75, 100, 20, 89, 98, 66, 46, 86]
        }
      ]
    };
    ecarrt.setOption(option);
  }
};
</script>

<style lang="less" scope>
@import '@/assets/css/echarts.less';
.article-box {
  height: 400px;
}
</style>