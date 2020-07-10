<template>
  <div class="overview-parking">
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">
      <div class="header">
        <p class="title">
          会议室数据
        </p>
        <Refresh></Refresh>
      </div>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>会议室总数</p>
          <p class="bigNum highline">40</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>已用会议室数</p>
          <p class="bigNum">25</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>空闲会议室数量</p>
          <p class="bigNum">15</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>专用会议室已用数</p>
          <p class="bigNum">15</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="3"
              class="parkingOverview">
        <div class="parkingNum">
          <p>专用会议室空闲车位数</p>
          <p class="bigNum">15</p>
        </div>
      </el-col>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">
      <div class="header">
        <p class="title">
          会议数据
        </p>
        <Refresh></Refresh>
      </div>
      <el-col :span="6"
              class="parkingOverview">
        <div class="parkingNum">
          <p>已申请会议</p>
          <p class="bigNum highline">88</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="6"
              class="parkingOverview">
        <div class="parkingNum">
          <p>审核通过会议</p>
          <p class="bigNum">60</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="6"
              class="parkingOverview">
        <div class="parkingNum">
          <p>审核中会议</p>
          <p class="bigNum">18</p>
        </div>
      </el-col>
      <i class="verticalLine"></i>
      <el-col :span="5"
              class="parkingOverview">
        <div class="parkingNum">
          <p>审核失败会议</p>
          <p class="bigNum">10</p>
        </div>
      </el-col>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">
      <div class="header">
          <p class="title">
            会议申请数据
          </p>
          <Refresh></Refresh>
      </div>
      <el-table
        :data="meetingTable"
        v-loading="listLoading"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column prop="meetingTheme" label="会议主题"></el-table-column>
        <el-table-column prop="meetingRoom" label="会议室"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="host" label="主持人"></el-table-column>
        <el-table-column prop="recorder" label="会议记录人"></el-table-column>
      </el-table>        
    </el-col>
    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>

import echarts from 'echarts';
import Refresh from "@/components/common/refresh.vue";
export default {
  components: {
    Refresh
  },
  data() {
    return {
      listLoading:false,
      meetingTable:[
        {
          meetingTheme:'团建',
          meetingRoom:'H103',
          startTime:'2020-7-10 10:30',
          endTime:'2020-7-10 11:00',
          host:'何炅',
          recorder:'谢娜'
        },
        {
          meetingTheme:'百川项目研发会',
          meetingRoom:'G205',
          startTime:'2020-7-11 14:30',
          endTime:'2020-7-11 16:30',
          host:'汪涵',
          recorder:'王一博'
        },
        {
          meetingTheme:'中秋福利抽奖会',
          meetingRoom:'T103',
          startTime:'2020-9-20 10:30',
          endTime:'2020-9-20 11:00',
          host:'张琪琪',
          recorder:'陈思卿'
        }
      ],
    }
  },
  mounted () {
  },
}
</script>

<style lang="less" scope>
.overview-parking {
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

    .parkingOverview {
      color: rgb(125, 138, 167);
      line-height: 2;
      text-align: center;
      .highline {
        color: rgb(15, 255, 238);
      }
      .bigNum {
        font-size: 32px;
      }
    }

    .verticalLine {
      float: left;
      display: inline-block;
      width: 1px;
      height: 86px;
      background: linear-gradient(to top, #3669da 0%, #e360ff 6%, #57c8ff 100%);
    }
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>