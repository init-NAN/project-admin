<template>
  <div class="main- ">
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus">   交房登记</el-button>
            <el-button size="small" type="primary" :disabled="isDisabled">更改交房日期</el-button>
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
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="managerAria" label="管理区"></el-table-column>
        <el-table-column prop="houseName" label="楼宇名称"></el-table-column>
        <el-table-column prop="roomCode" label="房间代码"></el-table-column>
        <el-table-column prop="buildUpArea" label="建筑面积"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column>
        <el-table-column prop="handoverDate" label="交房日期"></el-table-column>
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
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          handoverDate: "2020/04/17"
        }
      ],
      inputSearch:'',//搜索框内容
      listLoading: false,
      multipleSelection: [],
      selectionLengh:0,
      isDisabled: true
    };
  },

  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
        this.selectionLengh = val.length
    }
  },
  watch: {
    selectionLengh: function(newLen, oldLen) {
      if(newLen === 1) {
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