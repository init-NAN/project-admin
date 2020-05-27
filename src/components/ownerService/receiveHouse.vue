<template>
  <div class="main-content">
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus">   接房登记</el-button>
            <el-button size="small" type="primary" class="el-icon-edit" :disabled="isDisabled">编辑</el-button>
            <el-button size="small" type="primary" class="el-icon-download">导出EXCEL表</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
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
        <el-table-column prop="managerAria" label="管理区"></el-table-column>
        <el-table-column prop="houseName" label="楼宇"></el-table-column>
        <el-table-column prop="roomCode" label="房间代码"></el-table-column>
        <el-table-column prop="buildUpArea" label="建筑面积"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column>
        <el-table-column prop="customerName" label="房间状态"></el-table-column>
        <el-table-column prop="recieveDate" label="接房日期"></el-table-column>
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
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          recieveDate: "2020/04/17"
        }
      ],
      inputSearch:'',//搜索框内容
      listLoading: false,
      currentRow: null,
      isDisabled: true
    };
  },

  methods: {
    handleCurrentSelection(val) {
      this.currentRow = val;
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

<style lang="css" scope>
.left {
  display: flex;
  justify-content: flex-start;
}
.right {
  display: flex;
  justify-content: flex-end;
}
.searchInput {
  width: 40%;
}
#dropdown {
  margin-left: 0;
  background: rgb(211, 220, 230);
}
@media only screen and (min-width: 768px) {
  .searchInput {
    width: 40%;
  }
}
@media only screen and (max-width: 768px) {
  .searchInput {
    width: 100%;
  }
  .right {
    margin-top: 10px;
  }
}
</style>