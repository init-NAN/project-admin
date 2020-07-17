<template>
  <div class="main-content">
    <el-row class="overviewItem" type="flex">
      <el-col :span="11" :offset="1" class="overviewCard" :lg="11" :sm="23">
        <div class="cardHead">资料总览<Refresh></Refresh></div>
        <div class="cardBody">
          <div ref="handoverOverView" style="width:100%;height:280px;" class="handoverOverView"></div>
        </div>
      </el-col>
      <el-col :span="11" class="overviewCard" :offset="1" :lg="11" :sm="23">
        <div class="cardHead">办事指南总览<Refresh></Refresh></div>
        <div class="cardBody" style="width:100%;height:280px;">
          <div class="cCard">
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月新增指南</p>
                <p class="content-num">100</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上月同比增长</p>
                <p class="content-num">25%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月审核通过指南</p>
                <p class="content-num">75</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上月同比增长</p>
                <p class="content-num">20%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">下月指南新增意向</p>
                <p class="content-num">15</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">今年指南新增意向</p>
                <p class="content-num">150</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="15" class="overviewCard" :offset="1">
        <div class="cardHead">受理总览<Refresh></Refresh></div>
        <div class="cardBody">
          <div ref="overViewRepaireApplication" style="width:100%;height:400px;"></div>
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
    //交房总览饼图
    let echartsHandOver = echarts.init(this.$refs.handoverOverView);
    let optionHandOver = {
      title: {
        text: "资料占比",
        left: "center",
        top: 5,
        textStyle: {
          color: "#fff"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} 项({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: "资料详情",
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "幻灯片" },
            { value: 310, name: "图片" },
            { value: 274, name: "压缩文件" },
            { value: 235, name: "表格" },
            { value: 400, name: "文档" }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.8)"
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: "#3e7bec",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    echartsHandOver.setOption(optionHandOver);

    
    // 报修总览图
    let echartsRepaireApplication = echarts.init(this.$refs.overViewRepaireApplication);
    let total = 200;
    let placeHolderStyle = 
    {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      }
    };
    let repaireApplicationOption = 
    {
      title: {
        text: "受理数目", //主标题
        textStyle: {
          //主标题样式
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20
        },
        left: "center",
        top: "middle"
      },
      tooltip: {
        show: true,
        trigger: "item", //提示框触发类型，item数据项图形触发，主要应用于无类目轴的图表（散点图、饼形图等）
        formatter: function(params, ticket, callback) {
          //第一个参数数据集、第二个参数是异步回调标志、第三个参数是异步回调
          return params.seriesName + ": " + params.value; //系列名称：数据值
        }
      },
      color: ["#60FFAE", "#0497E0", "#B389FF"], //调色盘颜色列表，默认情况下图例和饼形环图颜色使用
      legend: {
        top: "0px",
        left: "70%",
        itemHeight: 10, //图例的高度
        itemGap: 10, //图例之间的间距
        data: ["已受理数目", "受理中", "受理完成"], //图例的数据数组
        textStyle: {
          color: "#fff"
        },
        selectedMode: true, //图例选择模式
        orient: "vertical" //图例布局方式
      },
      series: [
        {
          name: "已受理数目",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [120, 130],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 150,
              itemStyle: {
                normal: {
                  color: "#60FFAE"
                }
              }
            },
            {
              value: total - 150,
              itemStyle: {
                normal: {
                  color: "transparent"
                }
              }
            }
          ]
        },
        {
          name: "受理中",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [90, 100],
          itemStyle: placeHolderStyle,
          data: [
            {
              value: 90,
              itemStyle: {
                normal: {
                  color: "#0497E0"
                }
              }
            },
            {
              value: total - 90,
              itemStyle: {
                normal: {
                  color: "transparent"
                }
              }
            }
          ]
        },
        {
          name: "受理完成",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [60, 70],
          itemStyle: placeHolderStyle,
          data: [
            {
              value: 60,
              itemStyle: {
                normal: {
                  color: "#B389FF"
                }
              }
            },
            {
              value: total - 60,
              itemStyle: {
                normal: {
                  color: "transparent"
                }
              }
            }
          ]
        }
      ]
    };
    echartsRepaireApplication.setOption(repaireApplicationOption);
  }
};
</script>

<style lang="less" scope>
@import '@/assets/css/echarts.less';
</style>