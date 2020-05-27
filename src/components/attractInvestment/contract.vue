<template>
  <div class="contract">
    <el-table :data="contract"
              v-loading="listLoading"
              ref="table"
              @selection-change="handleSelectionChange"
              @sort-change="handleSortChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

      <el-table-column prop="area"
                       label="管理区"></el-table-column>

      <el-table-column prop="num"
                       label="合同编号"></el-table-column>

      <el-table-column prop="name"
                       label="合同名称"></el-table-column>

      <el-table-column prop="peoName"
                       label="租户姓名"></el-table-column>

      <el-table-column prop="num"
                       label="资源代码"></el-table-column>

      <el-table-column prop="per"
                       label="收费标准"></el-table-column>

      <el-table-column prop="date"
                       label="费用应收日期"></el-table-column>

      <el-table-column prop="long"
                       label="费用周期"></el-table-column>

      <el-table-column prop="how"
                       label="应收金额"></el-table-column>

      <el-table-column prop="now"
                       label="已缴金额"></el-table-column>

      <el-table-column prop="tui"
                       label="退款金额"></el-table-column>

      <el-table-column prop="less"
                       label="欠费金额"></el-table-column>
    </el-table>
    <!-- <el-table :data="tableData"
              resizable
              stripe
              ref="table">
      <el-table-column prop="date"
                       label="管理区"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="合同编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="address"
                       label="合同名称"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="租户姓名"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="资源代码"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="收费标准"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="收费标准"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="费用应收日期"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="费用周期"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="应收金额"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="已缴金额"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="退款金额"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="欠费金额"
                       width="120">
      </el-table-column>
    </el-table> -->
    <el-col class="toolbar">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-sizes="[10, 20, 30, 40, 50, 100]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-col>

  </div>
</template>

<script>
export default {
  data () {
    return {
      contract: [{
        date: '2016-05-02',
        name: '名称',
        area: '上海市普陀区金沙江路 1518 弄',
        num: '1231222',
        peoName: '王小虎',
        per: '0',
        long: '一年',
        how: '100000',
        now: '12322',
        tui: '0',
        less: '23123'
      }, {
        date: '2016-05-02',
        name: '名称',
        area: '上海市普陀区金沙江路 1518 弄',
        num: '1231222',
        peoName: '王小虎',
        per: '0',
        long: '一年',
        how: '100000',
        now: '12322',
        tui: '0',
        less: '23123'
      }, {
        date: '2016-05-02',
        name: '名称',
        area: '上海市普陀区金沙江路 1518 弄',
        num: '1231222',
        peoName: '王小虎',
        per: '0',
        long: '一年',
        how: '100000',
        now: '12322',
        tui: '0',
        less: '23123'
      },],
      page1: 1,
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,
    }
  },
  methods: {
    handleEdit (index, row) {
      window.console.log(index, row);
    },
    handleDelete (index, row) {
      window.console.log(index, row);
    },
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    // context menu
    handleSelectionChange: function (sels) {
      this.sels = sels;
      this.ids = _.map(this.sels, (device) => device.deviceNo);
      //console.log(this.ids);
    },
    handleSortChange (col) {
      if (col.prop == null) {
        return;
      }
      this.order = (col.order === 'ascending') ? 'asc' : 'desc';
      this.sort = col.prop;
      this.searchDevice();
    },
    searchDevice () {
      this.page = 1;
      this.getDeviceList();
    },
    getDeviceList () {

      var searchParams = _.omitBy(this.searchForm, (item) => item == "" || _.isNil(item));
      searchParams.page = this.page - 1;
      searchParams.size = this.pageSize;
      searchParams.sort = this.sort;//"deviceNo";
      searchParams.order = this.order;//"asc";

      this.listLoading = true;
      AdminAPI.searchDevice(searchParams).then(({
        data: jsonData
      }) => {
        if (jsonData.status === 0) {
          this.total = jsonData.data.total;
          this.devices = jsonData.data.content;
          this.total = jsonData.data.totalElements;
          this.listLoading = false;
        } else {
          this.$message({
            messsage: `获取设备列表失败:${data.msg}`,
            type: 'error'
          })
        }
      });
    },
  }
}

</script>

<style lang="less">
// .el-table {
//   /* 表格字体颜色 */
//   font-size: 13px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(158, 162, 192, 1);
//   line-height: 18px;
//   /* 表格边框颜色 */
//   /* border: 0.5px solid #758a99; */
// }
// .contract /deep/ .el-table__row>td{
//   /* 去除表格线 */
//   border: none;
// }
// .contract /deep/ .el-table th.is-leaf {
//   /* 去除上边框 */
//     border: none;
// }
// .el-table th {
//   background-color: transparent;
//   font-size: 13px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(255, 255, 255, 1);
//   line-height: 18px;
// }
// .el-table--enable-row-hover .el-table__body tr:hover > td {
//   background-color: rgba(0, 0, 0, 0) !important;
// }
// .contract /deep/ .el-table--fit {
//   padding: 20px;
// }
// .contract /deep/ .el-table,
// .el-table__expanded-cell {
//   background-color: transparent;
// }

// .contract /deep/ .el-table tr {
//   background-color: transparent !important;
// }
// .contract /deep/ .el-table--enable-row-transition .el-table__body td,
// .el-table .cell {
//   background-color: transparent;
// }
// .el-table--border::after,
// .el-table--group::after,
// .el-table::before {
//   background-color: transparent;
// }
// .el-table--striped .el-table__body tr.el-table__row--striped td {
//   background-color:rgba(158,162,192,.05);
// }
// // fenye
// .pager-box {
//   text-align: right;
// }
// .pager-box /deep/ button,
// .pager-box /deep/ .el-pager li {
//   background-color: transparent !important;
// }
// .pager-box
//   /deep/
//   .el-pagination.is-background
//   .el-pager
//   li:not(.disabled).active {
//   background-color: #0ffff3 !important;
// }
// .pager-box /deep/.el-pagination {
//   color: rgba(255, 255, 255, 0.65);
// }
// .pager-box /deep/.el-pagination button:disabled {
//   color: rgba(0, 0, 0, 0.35);
// }
// .pager-box /deep/ .el-pager {
//   color: rgba(255, 255, 255, 0.65);
// }
</style>