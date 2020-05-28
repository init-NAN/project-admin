<template>
  <div class="main-content">
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus">   装修申请</el-button>
            <el-button size="small" type="primary" class="el-icon-edit" :disabled="isDisabled">编辑</el-button>
            <el-button size="small" type="primary" class="el-icon-delete" :disabled="isDisabled">删除</el-button>
            <el-button size="small" type="primary" class="el-icon-edit" :disabled="isDisabled">收费</el-button>
            <el-button size="small" type="primary" class="el-icon-check" :disabled="isDisabled">完成验收</el-button>
            <el-button size="small" type="primary" class="el-icon-download">导出EXCEL表</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24"  :lg="12" :xl="12">
          <div class="right">
            <el-input v-model="inputSearch" size="small" placeholder="搜索..." class="searchInput"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search"></el-button>
            <el-button size="small"  icon="el-icon-arrow-down" id="dropdown"></el-button>
          </div>
        </el-col>
      </el-row>
      
      <el-table
        :data="tableData"
        v-loading="listLoading"
        highlight-current-row
        @current-change="handleCurrentSelection"
        ref="singleTable"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column label="操作">查看</el-table-column>
        <el-table-column prop="managerAria" label="管理区"></el-table-column>
        <el-table-column prop="houseName" label="楼宇"></el-table-column>
        <el-table-column prop="roomCode" label="房间代码"></el-table-column>
        <el-table-column prop="buildUpArea" label="建筑面积(m²)"></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="decorateStartDate" label="装修开始时间"></el-table-column>
        <el-table-column prop="decorateEndDate" label="装修结束时间"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
      </el-table>
    </section>

    <el-col class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          decorateStartDate: "2020/04/17",
          decorateEndDate:'2020/05/25',
          state:'已验收'
        }
      ],
      total: 0,
      page: 1,				
      pageSize: 10,
      inputSearch:'',//搜索框内容
      listLoading: false,
      currentRow: null,
      isDisabled: true
    };
  },

  methods: {
    handleCurrentSelection(val) {
      this.currentRow = val;
    },
    handleSizeChange(size) {
			this.pageSize = size				
			this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val				
      this.getDeviceList()
		}
  },
  watch: {
      currentRow: function(newLen, oldLen) {
        if(newLen != null) {
          this.isDisabled = false
        } else {
          this.isDisabled = true
        }
      }
  }
}
</script>

<style lang="less" scope>
.main-content {
  .grid-content {
    .buttonHead {
      .left {
        display: flex;
        justify-content: flex-start;
      }
      .right {
        display: flex;
        justify-content: flex-end;
        .searchInput {
          width: 40%;
        }
        #dropdown {
          margin-left: 0;
          background: rgb(211, 220, 230);
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          .searchInput {
            width: 40%;
          }
       }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          .searchInput {
            width: 100%;
          }
       }
      }
    }
  }
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          margin-top: 10px;
       }
      }
    }
  }
}
</style>