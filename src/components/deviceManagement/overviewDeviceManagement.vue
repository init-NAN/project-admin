<template>
  <div class="overview-device">
    <el-col class="overview-card" :sm="22" :md="7" :offset="1">
      <div class="header">
        <p class="title">设备情况</p>
        <Refresh></Refresh>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">设备数量</p>
            <p class="content-num">30</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年报废</p>
            <p class="content-num">200</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本年新置</p>
            <p class="content-num">12</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">去年检定</p>
            <p class="content-num">1348</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本年维修</p>
            <p class="content-num">5</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">全年维修</p>
            <p class="content-num">60</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="overview-card" :sm="22" :md="15" :offset="1">
      <div class="header">
        <p class="title">设备类型分布</p>
        <Refresh></Refresh>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
        >
          <el-table-column prop="deviceName" label="设备名称"></el-table-column>
          <el-table-column prop="deviceType" label="设备类型"></el-table-column>
          <el-table-column prop="deviceArea" label="设备区域"></el-table-column>
          <el-table-column prop="deviceStatus" label="设备状态"></el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col class="overview-card" :sm="22" :md="23" :offset="1">
      <div class="header">
        <p class="title">设备损耗</p>
        <Refresh></Refresh>
      </div>
      <div class="echarts" ref="deviceCharts"></div>
    </el-col>
    <el-col class="hidden-card" :sm="22" :md="15" :offset="1"></el-col>
  </div>
</template>

<script>
import echarts from "echarts";
import Refresh from "@/components/common/refresh.vue";
export default {
  components: {
    Refresh
  },
  data() {
    return {
      tableData: [
        {
          deviceName: "监控设备1",
          deviceType: "固定区域设备",
          deviceArea: "明珠苑A区",
          deviceStatus: "正常"
        },
        {
          deviceName: "拖把",
          deviceType: "固定区域设备",
          deviceArea: "明珠苑A区",
          deviceStatus: "正常"
        },
        {
          deviceName: "测量仪",
          deviceType: "可移动设备",
          deviceArea: "明珠苑C区",
          deviceStatus: "正常"
        }
      ]
    };
  },
  mounted() {
    var estate = echarts.init(this.$refs.deviceCharts);
    var option = {
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        axisLine: {
          lineStyle: {
            color: "#fff"
          }
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff"
          }
        }
      },
      grid: {
        top: "5%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      series: [
        {
          data: [120, 150, 0, 80, 70, 110, 130, 23, 50, 200, 120, 98],
          type: "line",
          symbol: "triangle",
          symbolSize: 20,
          lineStyle: {
            color: "green",
            width: 4,
            type: "dashed"
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: "yellow",
            color: "blue"
          }
        }
      ]
    };
    estate.setOption(option);
  }
};
</script>

<style lang="less" scope>
.overview-device {
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
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>