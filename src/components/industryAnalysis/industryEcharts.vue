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
        data: ["移动", "腾讯", "联通", "联想", "碧桂园", "小米", "小辣椒"],
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
          data: [100, 80, 70, 80, 90, 80, 50],
          label: {
            color: "rgba(255, 255, 255, 0.8)"
          },
          itemStyle: {
            color: "#3e7bec",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      ]
    };
    areaAndOutput.setOption(optionOutput);

    var taxOverview = echarts.init(this.$refs.taxOverview);
    var optionTaxOverview = {
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
            { value: 230, name: '移动' },
            { value: 250, name: '腾讯' },
            { value: 100, name: '联通' },
            { value: 130, name: '联想' },
            { value: 180, name: '碧桂园' },
            { value: 150, name: '小米' },
            { value: 200, name: '百度' }
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

    var taxRank = echarts.init(this.$refs.taxRank)
    var taxRankOption = {
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
          boundaryGap: [0, 0.01]
      },
      yAxis: {
          type: 'category',
          data: ['小米', '碧桂园', '百度', '移动', '腾讯']
      },
      series: [
        {
          type: 'bar',
          data: [150,180,200,230,250]
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