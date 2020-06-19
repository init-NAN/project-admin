<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>意向金管理</span>
    </div>
    <section class="grid-content" style="margin-bottom:15px;">
      <div class="btnHeader">
        <div class="left">
          <el-button  type="primary" class="btn-addmore">查看意向金</el-button>
          <el-button  type="primary" class="btn-addmore">转合同押金</el-button>
          <el-button  type="primary" class="btn-addmore">退还</el-button>
          <el-button  type="primary" class="btn-addmore">查看退还记录</el-button>
        </div>
        <div class="right">
          <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
          <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
        </div>
      </div>
    </section>
    <el-table
        :data="intentionTable"
        v-loading="listLoading"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="intentionCode" label="意向金编号"></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="receivedIntetion" label="已收意向金(元)"></el-table-column>
        <el-table-column prop="receivedDate" label="收取时间"></el-table-column>
        <el-table-column prop="restMoney" label="剩余可用金"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      inputSearch:'',
      intentionTable: [
        {
          intentionCode:'Z01',
          customerName:'张三',
          receivedIntetion:'1000',
          receivedDate:'2020-6-17',
          restMoney:'200'
        },
        {
          intentionCode:'Z02',
          customerName:'李四',
          receivedIntetion:'2000',
          receivedDate:'2020-6-15',
          restMoney:'400'
        }
      ]
    }
  }
}
</script>

<style>

</style>