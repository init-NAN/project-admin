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
// import { getattrResours } from '../../http/attract/attrResours';
export default {
  data () {
    return {
      resources: [
        {
        date: "2019-05-03",
        resourcesName: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        resourcesRoomS: "213",
        resourcesArea: "20000",
        resourcesLease: "18000",
        resourcesl: "90",
        resourcesVacant: "2000",
        resourcesRate: "10",
        resourcesUtilization: "90",
        resourceslease: "230",
        id: 1
      },{
        date: "2019-10-02",
        resourcesName: "李二狗",
        address: "上海市普陀区虹梅路 1518 弄",
        resourcesRoomS: "124",
        resourcesArea: "29000",
        resourcesLease: "10000",
        resourcesl: "34.4827",
        resourcesVacant: "2000",
        resourcesRate: "10",
        resourcesUtilization: "90",
        resourceslease: "230",
        id: 2
      },{
        date: "2020-03-02",
        resourcesName: "茄子",
        address: "江苏普陀区金沙江路 1518 弄",
        resourcesRoomS: "323",
        resourcesArea: "20000",
        resourcesLease: "18000",
        resourcesl: "90",
        resourcesVacant: "2000",
        resourcesRate: "10",
        resourcesUtilization: "90",
        resourceslease: "230",
        id: 3
      },
      
      ],
      checkedBox:[],
      page1: 1,
      listLoading: false,
      total: 1,
      page: 1,
      pageSize: 10,
    }
  },
  methods: {
    handleSelectionChange: function (sels) {
      this.checkedBox = sels;
    },
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getResourcesList();
    },
    getResourcesList () {

      // getattrResours().then(res => {
      //   window.console.log(res);
      //   if (res.status == 200) {
      //     this.resources = res.data.resources
      //     this.total = res.data.length
      //   }
      // })

    }
  },
  // created () {
  //   this.getResourcesList();
  // }
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