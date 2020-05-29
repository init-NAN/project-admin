<template>
  <div class="main-content">
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" class="el-icon-plus btn-addmore">交房登记</el-button>
            <el-button size="small" :disabled="isDisabled" class="btn-addmore">更改交房日期</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="right" v-if="!isShowDetail">
            <el-input v-model="inputSearch" size="small" placeholder="搜索..." class="searchInput"></el-input>
            <el-button size="small" type="primary" class="el-icon-search btn-addmore"></el-button>
            <el-button
              size="small"
              class="el-icon-arrow-down btn-addmore"
              id="dropdown"
              @click="showDetailSearch"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <div class="searchDetail" v-if="isShowDetail">
        <div class="top">
          <el-row>
            <el-col :span="12">
              <div class="managerAira">
                <span>管理区</span>
                <el-select v-model="selectedAria" placeholder="请选择管理区" @change="chooseAria">
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="floorHouse">
                <span>楼宇</span>
                <el-select v-model="selectedFloor" filterable placeholder="请选择楼宇" :disabled="isFloorDisabled">
                  <!-- <el-input class="searchFloorHouse" v-model="searchFloorContent"></el-input> -->
                  <el-option
                    v-for="item in floorHouseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="down">
          <el-row>
            <el-col :span="12">
              <div class="item roomCode">
                <span>房间代码</span>
                <el-input v-model="roomCode" placeholder="请输入房间代码"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="item customerName">
                <span>客户名称</span>
                <el-input v-model="customerName" placeholder="请输入客户名称"></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="line"></div>
        <div class="searchContent">
          <el-row>
            <el-col :span="12" :offset="12">
              <div class="btns">
                <el-button size="small" class="el-icon-search btn-addmore">搜索</el-button>
                <el-button class="el-icon-refresh-left btn-addmore" size="small"></el-button>
                <el-button class="el-icon-arrow-up btn-addmore" size="small" @click="showDetailSearch"></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
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
        <el-table-column prop="buildUpArea" label="建筑面积(m²)"></el-table-column>
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
        }
      ],
      total: 0,
      page: 1,
      pageSize: 10,
      inputSearch: "", //搜索框内容
      listLoading: false,
      multipleSelection: [],
      selectionLengh: 0,
      isDisabled: true,
      isShowDetail: false, //是否展示搜索详情盒子
      managerAriaList: [
        {
          value: "0",
          label: "请选择管理区"
        },
        {
          value: "MZ",
          label: "明珠城（商业）"
        },
        {
          value: "SD",
          label: "时代佳苑（住宅）"
        },
        {
          value: "LD",
          label: "绿岛物业"
        },
        {
          value: "ZY",
          label: "筑业物业"
        }
      ],
      selectedAria: "",
      isFloorDisabled: true, //楼宇下拉框默认不可选
      floorHouseList: [],
      selectedFloor: "",
      searchFloorContent: "", //楼宇下拉框里的搜索框内容
      roomCode: "", //搜索框的房间代码
      customerName: "" //搜索框的客户名称
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectionLengh = val.length;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
    },
    // 展示详细的搜索盒子
    showDetailSearch() {
      this.isShowDetail = !this.isShowDetail;
    },
    chooseAria(item) {
      //当管理区发生变化时候，给楼宇赋值
      console.log(item, "管理区");
      if (item == 0) {
        this.isFloorDisabled = true;
        this.emptyFloorSelect();
      } else if (item === "MZ") {
        this.isFloorDisabled = false;
        this.emptyFloorSelect();
        this.floorHouseList = [
          {
            value: "1",
            label: "商业1栋"
          },
          {
            value: "2",
            label: "商业2栋"
          }
        ];
        console.log("明珠");
      } else if (item === "SD") {
        this.isFloorDisabled = false;
        this.emptyFloorSelect();
        this.floorHouseList = [
          {
            value: "1",
            label: "住宅1栋"
          },
          {
            value: "2",
            label: "住宅2栋"
          }
        ];
        console.log("时代");
      } else if (item === "LD") {
        this.isFloorDisabled = false;
        this.emptyFloorSelect();
        this.floorHouseList = [
          {
            value: "1",
            label: "绿岛1栋"
          },
          {
            value: "2",
            label: "绿岛2栋"
          }
        ];
        console.log("绿岛");
      } else if (item === "ZY") {
        this.isFloorDisabled = false;
        this.emptyFloorSelect();
        this.floorHouseList = [
          {
            value: "1",
            label: "筑业1栋"
          },
          {
            value: "2",
            label: "筑业2栋"
          }
        ];
        console.log("筑业");
      }
    },
    emptyFloorSelect() {
      this.floorHouseList = [];
      this.selectedFloor = "请选择楼宇";
    }
  },
  watch: {
    selectionLengh: function(newLen, oldLen) {
      if (newLen === 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }
};
</script>

<style lang="less" scope>
@font-color: #fff;
.searchFloorHouse {
  .el-input__inner {
    height: 34px !important;
  }
}
.main-content {
  .grid-content {
    .searchDetail {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid rgb(211, 220, 230);
      padding: 20px 0;
      border-radius: 3px;
      .top,
      .down {
        span {
          color: @font-color;
          width: 64px;
          text-align: right;
          margin-right: 25px;
          line-height: 40px;
        }
      }

      .top {
        .managerAira,
        .floorHouse {
          display: flex;
        }
        .managerAira {
          padding-left: 20%;
        }
        .floorHouse {
          justify-content: flex-end;
          padding-right: 20%;
        }
      }
      .down {
        margin-top: 10px;
        margin-bottom: 20px;
        .el-col {
          .item {
            display: flex;
            .el-input {
              width: 215px;
            }
          }
          .roomCode {
            padding-left: 20%;
          }
          .customerName {
            justify-content: flex-end;
            padding-right: 20%;
          }
        }
      }
      .line {
        height: 1px;
        width: 80%;
        margin-right: 20%;
        margin: 0 auto;
        background-color: rgb(211, 220, 230);
      }
      .searchContent {
        margin-top: 20px;
        .btns {
          display: flex;
          justify-content: flex-end;
          padding-right: 20%;
        }
      }
    }
    .buttonHead {
      .left {
        display: flex;
        justify-content: flex-start;
      }
      .right {
        display: flex;
        justify-content: flex-end;
        .searchInput {
          .el-input__inner {
            background-color: transparent;
            border: 1px solid #9ea2c0;
          }
          width: 40%;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
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
@media only screen and (max-width: 768px) {
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