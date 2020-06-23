<template>
  <div class="main-content">
    <el-row class="overviewItem" type="flex">
      <el-col :span="11" :offset="1" class="overviewCard" :lg="11" :sm="23">
        <div class="cardHead">交房总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div ref="handoverOverView" style="width:100%;height:280px;" class="handoverOverView"></div>
        </div>
      </el-col>
      <el-col :span="11" class="overviewCard" :offset="1" :lg="11" :sm="23">
        <div class="cardHead">收房总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody" style="width:100%;height:280px;">
          <div class="cCard">
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月收房</p>
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
                <p class="content-title">本月收房面积</p>
                <p class="content-num">2500m²</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上月同比增长</p>
                <p class="content-num">20%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月收房意向</p>
                <p class="content-num">15</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">本年意向</p>
                <p class="content-num">50</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="8" class="overviewCard" :offset="1">
        <div class="cardHead">入住总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody">
          <div ref="checkInOverView" style="width:100%;height:280px;"></div>
        </div>
      </el-col>
      <el-col :span="14" class="overviewCard" :offset="1">
        <div class="cardHead">装修登记总览<i class="el-icon-refresh-right refresh"></i></div>
        <div class="cardBody" style="width:100%;height:280px;">
          <div class="cCard">
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月装修登记</p>
                <p class="content-num">100户</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上月同比增长</p>
                <p class="content-num">25%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月装修中</p>
                <p class="content-num">25户</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">与上月同比增长</p>
                <p class="content-num">20%</p>
              </div>
            </div>
            <div class="content">
              <div class="content-card">
                <p class="content-title">本月装修完成</p>
                <p class="content-num">45</p>
              </div>
              <i class="verticalLine"></i>
              <div class="content-card">
                <p class="content-title">本年意向</p>
                <p class="content-num">50</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="15" class="overviewCard" :offset="1">
        <div class="cardHead">报修总览<i class="el-icon-refresh-right refresh"></i></div>
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
export default {
  mounted() {
    //交房总览饼图
    let echartsHandOver = echarts.init(this.$refs.handoverOverView);
    let optionHandOver = {
      title: {
        text: "交房面积",
        left: "center",
        top: 5,
        textStyle: {
          color: "#fff"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} 平方米({d}%)"
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
          name: "交房面积",
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "明珠城" },
            { value: 310, name: "绿岛城" },
            { value: 274, name: "商业中心" },
            { value: 235, name: "办公区" },
            { value: 400, name: "住宅区" }
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

    // 入住折现图总览
    let echartsCheckIn = echarts.init(this.$refs.checkInOverView);
    let optionCheckIn = {
      title: {
        left: "center",
        top: 5,
        textStyle: {
          color: "#fff"
        },
        text: "近七天入住总览"
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      series: [
        {
          name: "入住户数",
          type: "bar",
          data: [25, 35, 40, 50, 70, 80, 90],
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
    echartsCheckIn.setOption(optionCheckIn);

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
        text: "报修数目", //主标题
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
        data: ["已报修数目", "维修中", "维修完成"], //图例的数据数组
        textStyle: {
          color: "#fff"
        },
        selectedMode: true, //图例选择模式
        orient: "vertical" //图例布局方式
      },
      series: [
        {
          name: "已报修数目",
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
          name: "维修中",
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
          name: "维修完成",
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
.main-content {
  min-width: 1000px;
  .overviewItem {
    margin-bottom: 20px;
    .overviewCard {
      .cardHead {
        color: #fff;
        box-sizing: border-box;
        height: 37px;
        line-height: 37px;
        padding-left: 18px;
        width: 100%;
        background-size: 100%;
        background-position: center 0;
        background: url("../../assets/type.png") no-repeat rgba(10, 13, 51, 0.3);
        position: relative;
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
      .cardBody {
        background: rgba(10, 13, 51, 0.7);
        color: #9ea2c0;
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
      }
    }
  }
}
</style>