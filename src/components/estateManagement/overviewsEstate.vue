<template>
  <div class="overviewsEstate">
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">
      <div class="header">
        <p class="title">
          物业总览
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月意向</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">1</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月签约</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年签约</p>
            <p class="content-num">0</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">正在跟进</p>
            <p class="content-num">2</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年转化率</p>
            <p class="content-num">0.00%</p>
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
          巡查计划
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">完成情况</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">1</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月签约</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年签约</p>
            <p class="content-num">0</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">正在跟进</p>
            <p class="content-num">2</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年转化率</p>
            <p class="content-num">0.00%</p>
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
          设备损耗
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="echarts">

      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">
      <div class="header">
        <p class="title">
          保养巡检核查
        </p>
        <i class="el-icon-refresh-right refresh"></i>
      </div>
      <div class="table">
        <el-table :data="tableData"
                  ref="table"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="management"
                           label="管理区"></el-table-column>
          <el-table-column prop="name"
                           label="任务名称"></el-table-column>
          <el-table-column prop="peo"
                           label="核查人"></el-table-column>
          <el-table-column prop="doPer"
                           label="执行人"></el-table-column>
          <el-table-column prop="link"
                           label="关联计划"></el-table-column>
          <el-table-column prop="inName"
                           label="设备名称"></el-table-column>
          <el-table-column prop="type"
                           label="保养类型"></el-table-column>
          <el-table-column prop="address"
                           label="保养地点"></el-table-column>
          <el-table-column prop="pStart"
                           label="计划开始时间"></el-table-column>
          <el-table-column prop="pEnd"
                           label="计划结束时间"></el-table-column>
          <el-table-column prop="pType"
                           label="任务状态"></el-table-column>
          <el-table-column prop="pType"
                           label="核查状态"></el-table-column>

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
export default {
  data () {
    return {
      tableData: [{
        management: '绿岛物业',
        name: '水泵保养2-20200528-1',
        peo: '企业版',
        date: '2016-05-02',
        doPer: '',
        link: '	水泵保养2',
        inName: '	水泵机',
        type: '日常保养',
        address: '1栋',
        pStart: '2020/05/28 14:45',
        pEnd: '2020/05/28 17:50',
        pType: '未分配'
      }, {
        management: '绿岛物业',
        name: '水泵保养2-20200528-1',
        peo: '企业版',
        date: '2016-05-02',
        doPer: '',
        link: '	水泵保养2',
        inName: '	水泵机',
        type: '日常保养',
        address: '1栋',
        pStart: '2020/05/28 14:45',
        pEnd: '2020/05/28 17:50',
        pType: '未分配'
      }],
    }
  },
}
</script>

<style lang="less" scope>
.overviewsEstate {
  .overview-card {
    height: 300px;
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
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>