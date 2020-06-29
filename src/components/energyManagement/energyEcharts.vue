<template>
  <div class="energyEcharts">
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">
      <div class="header">
        <p class="title">
          能源管理总览
        </p>
        <Refresh></Refresh>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月抄表数</p>
            <p class="content-num">600</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本月抄表总数</p>
            <p class="content-num">800</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月新增表数</p>
            <p class="content-num">12</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年新增表数</p>
            <p class="content-num">1348</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">电表数量</p>
            <p class="content-num">300</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">水表数量</p>
            <p class="content-num">400</p>
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
          装表总览
        </p>
        <Refresh></Refresh>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月用电损耗</p>
            <p class="content-num">600</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本月抄表总数</p>
            <p class="content-num">800</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月新增表数</p>
            <p class="content-num">12</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年新增表数</p>
            <p class="content-num">1348</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">电表数量</p>
            <p class="content-num">300</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">水表数量</p>
            <p class="content-num">400</p>
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
          本月抄表完成情况
        </p>
        <Refresh></Refresh>
      </div>
      <div class="article-box"
           ref="energyArticle">
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">

      <div class="header">
        <p class="title">
          历史补抄总览
        </p>
        <Refresh></Refresh>
      </div>
      <div class="table">
        <el-table :data="formData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="billingFormNo"
                           label="抄表单编号"></el-table-column>

          <el-table-column prop="billingMeterReader"
                           label="抄表人"></el-table-column>

          <el-table-column prop="billingYear"
                           label="计费年月"></el-table-column>

          <el-table-column prop="billingType"
                           label="表种类"></el-table-column>

          <el-table-column prop="billingGeneration"
                           label="生成时间"></el-table-column>

          <el-table-column prop="billingEnergyMeters"
                           label="能源表总数"></el-table-column>

          <el-table-column prop="billingCompleted"
                           label="完成数量"></el-table-column>

          <el-table-column prop="billingReviewStatus"
                           label="复核状态"></el-table-column>
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
import Refresh from "@/components/common/refresh.vue";
export default {
  mounted () {
    let echartsRepaireApplication = echarts.init(this.$refs.energyArticle);
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
        text: "抄表数统计", //主标题
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
        formatter: function (params, ticket, callback) {
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
        data: ["已抄表数", "收费抄表数", "非收费抄表数"], //图例的数据数组
        textStyle: {
          color: "#fff"
        },
        selectedMode: true, //图例选择模式
        orient: "vertical" //图例布局方式
      },
      series: [
        {
          name: "已抄表数",
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
          name: "收费抄表数",
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
          name: "非收费抄表数",
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

  },
  components: {
    Refresh
  },
  data () {
    return {
      formData: [
        {
          billingFormNo: 'RT20200229-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-05',
          billingType: '尖峰平谷电表',
          billingGeneration: '2020-02-28',
          billingEnergyMeters: '1',
          billingCompleted: '1.00',
          billingReviewStatus: '已复核',
          id: 1
        }, {
          billingFormNo: 'RT20200304-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-03',
          billingType: '水表',
          billingGeneration: '2020-03-04',
          billingEnergyMeters: '1',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 2
        }, {
          billingFormNo: 'RT20200311-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-02',
          billingType: '水表',
          billingGeneration: '2020-03-11',
          billingEnergyMeters: '2',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 3
        }, {
          billingFormNo: 'RT20200311-0002',
          billingMeterReader: '企业版',
          billingYear: '2020-02',
          billingType: '电表',
          billingGeneration: '2020-03-11',
          billingEnergyMeters: '1',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 4
        }
      ],
    }
  },
}
</script>

<style lang="less" scope>
.energyEcharts {
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
      height: 259px;
    }
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>