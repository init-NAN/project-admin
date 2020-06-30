<template>
  <div class="memberInfo">
    <div class="current-page-title">
      <span>会员信息</span>
    </div>

    <el-row class="overview">
      <el-col>
        <span>本日注册数:{{vipRegister.today}}</span>
        <span>本周注册数:{{vipRegister.week}}</span>
        <span>本月注册数:{{vipRegister.month}}</span>
        <span>累计注册数:{{vipRegister.cumulative}}</span>
        <span>累计余额:{{vipRegister.accumulatedBalance}}元</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      vipRegister: {
        today: 0,
        week: 0,
        month: 0,
        cumulative: 0,
        accumulatedBalance: '0.00'
      }
    }
  },
}
</script>

<style lang="less" scope>
.memberInfo {
  .overview {
    .el-col {
      background-color: rgba(10, 13, 51, 0.4);
      span {
        color: #fff;
        font-size: 16px;
        line-height: 40px;
        margin-left: 10px;
      }
    }
  }
}
</style>