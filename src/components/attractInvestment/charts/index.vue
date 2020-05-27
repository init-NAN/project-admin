<template>
  <div>
    <el-button class="backList"
               type="primary"
               @click="$router.push('/attractInvestment/resources')">返回</el-button>
    <div ref="box"
         style="height:300px;">

    </div>
  </div>

</template>

<script>
import echarts from "echarts";
export default {
  mounted () {
    var ec = echarts.init(this.$refs.box);
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%'

      },
      legend: {
        data: ['在租', '空置',],
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }

        }
      ],
      yAxis: [
        {
          type: 'value',
          data: ['10%', '50%', '100%'],
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          }

        },

      ],
      // color: ['#0094ff', '#ff1428'],
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
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#64FFFF' // 0% 处的颜色
        }, 
        {
          offset: 1, color: '#A655FF' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }],
      series: [


        {
          name: '在租',
          type: 'bar',
          stack: 'house',
          formatter: '{c}%',
          barWidth : 10,
          itemStyle: {
            //柱形图圆角，鼠标移上去效果
            emphasis: {
              barBorderRadius: [10, 10, 10, 10]
            },

            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [0, 0, 40, 40]
            }
          },
          data: ['100', '80', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50']
        },
        {
          name: '空置',
          type: 'bar',
          stack: 'house',
          formatter: '{c}%',
          barWidth : 10,
          data: ['0', '20', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50', '50',],
          itemStyle: {
            //柱形图圆角，鼠标移上去效果
            emphasis: {
              barBorderRadius: [40, 40, 40, 40]
            },

            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [40, 40, 0, 0]
            }
          },
        },
      ]
    };

    ec.setOption(option);
  }
}
</script>

<style>
.backList {
  position: absolute;
  right: 60px;
  z-index: 1;
}
</style>