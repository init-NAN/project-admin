<template>
  <div class="main-content">
    <el-row class="overviewItem" type="flex">
      <el-col :span="11" :offset="1" class="overviewCard" :lg="11" :sm="23">
        <div class="cardHead">产业总览<Refresh></Refresh></div>
        <div class="cardBody" style="width:100%;height:280px;">
          <div class="cCard">
            <div class="content">
              <div class="content-card">
                <p class="content-title">今年入驻</p>
                <p class="content-num">60</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">同比</p>
                <p class="content-num">20%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">今年产值(万元)</p>
                <p class="content-num">200</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">同比</p>
                <p class="content-num">30%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">今年退园</p>
                <p class="content-num">10</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">同比</p>
                <p class="content-num">10%</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="11" class="overviewCard" :offset="1" :lg="11" :sm="23">
        <div class="cardHead">园区企业分布及产值<Refresh></Refresh></div>
        <div class="cardBody">
          <div ref="areaAndOutput" style="height:280px;"></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="12" class="overviewCard" :offset="1">
        <div class="cardHead">园区税收情况<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div ref="taxOverview" style="height:400px;"></div>
        </div>
      </el-col>
      <el-col :span="12" class="overviewCard" :offset="1">
        <div class="cardHead">企业纳税前五<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div ref="taxRank" style="height:400px;"></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="12"  class="overviewCard" :offset="1">
        <div class="cardHead">近期入驻企业及园龄<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div>
            <el-table
              :data="archivesTable"
              style="width: 100%"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
              <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
              <el-table-column prop="date" label="入驻日期"></el-table-column>
              <el-table-column prop="enterAge" label="园龄(年)"></el-table-column>
              <el-table-column prop="outputValue" label="产值(万元)"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="12" class="overviewCard" :offset="1">
        <div class="cardHead">企业园龄<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div style="height:400px;"></div>
        </div>
      </el-col> -->
    </el-row>
    <div style="width:100%;height:120px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import Refresh from "@/components/common/refresh.vue";
export default {
  components:{
    Refresh
  },
  data() {
    return {
      archivesTable:[
        {
          enterpriseName:'腾讯',
          date:'2015-5-20',
          outputValue:100,
          enterAge:5
        },
        {
          enterpriseName:'联通',
          date:'2016-5-21',
          outputValue:200,
          enterAge:4
        },
        {
          enterpriseName:'小米',
          date:'2017-5-28',
          outputValue:400,
          enterAge:3
        },
        {
          enterpriseName:'联想',
          date:'2018-5-28',
          outputValue:500,
          enterAge:2
        },
        {
          enterpriseName:'碧桂园',
          date:'2019-5-28',
          outputValue:600,
          enterAge:1
        },
      ],
    }
  },
  mounted() {
    let areaAndOutput = echarts.init(this.$refs.areaAndOutput);
    let optionOutput = {
      title: {
        left: "center",
        top: 5,
        textStyle: {
          color: "#fff"
        },
        text: "企业产值近一年总览"
      },
      tooltip: {},
      xAxis: {
        type: "category",
        name:'企业',
        nameTextStyle:{
          color:'#fff'
        },
        data: ["移动", "腾讯", "联通", "联想", "碧桂园", "小米", "百度"],
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      yAxis: {
        type: "value",
        name:'产值(万元)',
        nameTextStyle:{
          color:'#fff'
        },
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      series: [
        {
          name: "产值(万元)",
          type: "bar",
          barWidth:30,
          itemStyle:{
            color:function(params) {
              let colorList = ["#66d364", "#dce090", "#4949c1", "#00f901", "#1ee9f3","#ffffff","#4487ff"]
              return colorList[params.dataIndex]
            }
          },
          data: [100, 80, 70, 80, 90, 80, 50],
          label: {
            color: "rgba(255, 255, 255, 0.8)"
          }
        }
      ]
    };
    areaAndOutput.setOption(optionOutput);

    let taxOverview = echarts.init(this.$refs.taxOverview);
    let optionTaxOverview = {
      color: ["#66d364", "#dce090", "#4949c1", "#00f901", "#1ee9f3","#ffffff","#4487ff"],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['移动', '腾讯', '联通','联想','碧桂园','百度'],
        textStyle: {
          color: "#fff"
        }
      },
      series: [
        {
          name: '税收',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 20, name: '移动' },
            { value: 15, name: '腾讯' },
            { value: 12, name: '联通' },
            { value: 13, name: '联想' },
            { value: 14, name: '碧桂园' },
            { value: 12, name: '小米' },
            { value: 9, name: '百度' }
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
    taxOverview.setOption(optionTaxOverview)

    let taxRank = echarts.init(this.$refs.taxRank)
    let taxRankOption = {
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
      },
      yAxis: {
          type: 'category',
          data: ['联通', '联想', '碧桂园', '腾讯', '移动'],
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
      },
      series: [
        {
          name: "税收(万元)",
          type: 'bar',
          barWidth:30,
          itemStyle:{
            color:function(params) {
              let colorList = ["#4949c1","#00f901","#1ee9f3","#dce090","#66d364"]
              return colorList[params.dataIndex]
            }
          },
          data: [12,13,14,15,20]
        }
      ]
    }
    taxRank.setOption(taxRankOption)
  }
};
</script>

<style lang="less" scope>
@import '@/assets/css/echarts.less';
.article-box {
  height: 400px;
}
</style>