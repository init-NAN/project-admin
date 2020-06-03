<template>
  <div class="overview-attr">

    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">
      <div class="header">
        <p class="title">
          招商项目总览
        </p>
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
            <p class="content-num">0</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月意向</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">0</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月意向</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">0</p>
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
          产业总览
        </p>
      </div>
      <div class="cCard">
        <div class="content">
          <div class="content-card">
            <p class="content-title">今年入驻</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">同比</p>
            <p class="content-num">0%</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月意向</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">0</p>
          </div>
        </div>
        <div class="content">
          <div class="content-card">
            <p class="content-title">本月意向</p>
            <p class="content-num">0</p>
          </div>
          <i class="verticalLine"></i>
          <div class="content-card">
            <p class="content-title">本年意向</p>
            <p class="content-num">0</p>
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
          我的关注
        </p>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">

      <div class="header">
        <p class="title">
          项目最新动态
        </p>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="15"
            :offset="1">

      <div class="header">
        <p class="title">
          招商负责人项目情况
        </p>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="23"
            :offset="1">

      <div class="header">
        <p class="title">
          近3年签约情况
        </p>
      </div>
      <div class="table">
        <el-table :data="tableData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="date"
                           label="日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址">
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="7"
            :offset="1">

      <div class="header">
        <p class="title">
          意向来源分析
        </p>
      </div>
    </el-col>
    <el-col class="overview-card"
            :sm="22"
            :md="15"
            :offset="1">

      <div class="header">
        <p class="title">
          招商负责人动向
        </p>
      </div>
      <div class="table">
        <el-table :data="tableData"
                  style="width: 100%"
                  tooltip-effect="dark"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column prop="date"
                           label="日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址">
          </el-table-column>
        </el-table>
      </div>
    </el-col>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
    }
  },
}
</script>

<style lang="less" scope>
.overview-attr {
  padding-bottom: 40px;
  .bg-purple-light {
    background: #e5e9f2;
  }
  .overview-card {
    height: 300px;
    background-color: rgba(10, 13, 51, 0.7);
    margin-bottom: 40px;
    .header {
      background: url("../../assets/type.png") no-repeat;
      height: 37px;
      width: 100%;
      padding-left: 18px;

      .title {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 37px;
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
  }
}
</style>