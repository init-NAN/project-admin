<template>
  <div class="table-wrapper">
    <div class="current-page-title">
      <span>资源</span>
    </div>

    <section class="title-content">
      <el-row :gutter="5">
        <el-col :span="3">
          <span class="title">管理区数量</span>
        </el-col>
        <el-col :span="3">
          <span class="title">楼宇数量</span>
        </el-col>
        <el-col :span="3">
          <span class="title">房间数量</span>
        </el-col>
        <el-col :span="4">
          <span class="title">管理面积(m²)</span>
        </el-col>
        <el-col :span="4">
          <span class="title">在租面积(m²)</span>
        </el-col>
        <el-col :span="4">
          <span class="title">空置面积(m²)</span>
        </el-col>
        <el-col :span="3">
          <span class="title">在租合同份数</span>
        </el-col>
      </el-row>
      <el-row :gutter="5"
              class="margin-bottom">
        <el-col :span="3">
          <span class="content">4</span>
        </el-col>
        <el-col :span="3">
          <span class="content">45</span>
        </el-col>
        <el-col :span="3">
          <span class="content">139</span>
        </el-col>
        <el-col :span="4">
          <span class="content">113512.33</span>
        </el-col>
        <el-col :span="4">
          <span class="content">25042.08</span>
        </el-col>
        <el-col :span="4">
          <span class="content">88470.25</span>
        </el-col>
        <el-col :span="3">
          <span class="content">19</span>
        </el-col>
      </el-row>
    </section>

    <el-button class="gotoList btn-addmore margin-bottom"
               @click="$router.push('charts')">查看图表</el-button>
    <section class="grid-content">
      <el-table :data="resources"
                resizable
                v-loading="listLoading"
                ref="table"
                @selection-change="handleSelectionChange"
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

        <el-table-column prop="resourcesName"
                         label="名称"></el-table-column>

        <el-table-column prop="resourcesRoomS"
                         label="房间数量"></el-table-column>

        <el-table-column prop="resourcesArea"
                         label="管理面积(m²)"></el-table-column>

        <el-table-column prop="resourcesLease"
                         label="在租面积(m²)"></el-table-column>

        <el-table-column prop="resourcesl"
                         label="出租率(%)"></el-table-column>
        <el-table-column prop="resourcesVacant"
                         label="空置面积(m²)"></el-table-column>
        <el-table-column prop="resourcesRate"
                         label="空置率(%)"></el-table-column>
        <el-table-column prop="resourcesUtilization"
                         label="利用率(%)"></el-table-column>
        <el-table-column prop="resourceslease"
                         label="在租合同份数"></el-table-column>
      </el-table>
    </section>

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


    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>
import { getattrResours } from '../../http/attrResours.js';
export default {
  data () {
    return {
      resources: [],
      page1: 1,
      listLoading: false,
      total: 3,
      page: 1,
      pageSize: 10,
    }
  },
  methods: {
    handleSortChange (col) {
      if (col.prop == null) {
        return;
      }
      this.order = (col.order === 'ascending') ? 'asc' : 'desc';
      this.sort = col.prop;
      this.searchDevice();
    },
    handleEdit (index, row) {
      window.console.log(index, row);
    },
    handleDelete (index, row) {
      window.console.log(index, row);
    },
    handleSelectionChange: function (sels) {
      this.sels = sels;
      //console.log(this.ids);
    },
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
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
    loadData () {
      
      getattrResours().then(res => {
        window.console.log(res);
        this.resources = res.data.resources
      })

    }
  },
  created () {
    this.loadData();
  }
}

</script>

<style lang="less" scope>
.table-wrapper {
  .el-table {
    background: rgba(10, 13, 51, 1);
    opacity: 0.7;
  }
  .title-content {
    text-align: center;
    .title {
      color: #fff;
      font-size: 18px;
    }
    .content {
      font-size: 35px;
      font-weight: 900;
      color: #fff;
      line-height: 2;
    }
  }
}
</style>