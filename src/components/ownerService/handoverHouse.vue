<template>
  <div class="main-content">
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus btn-addmore">   交房登记</el-button>
            <el-button size="small" type="primary" :disabled="isDisabled" class="btn-addmore">更改交房日期</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="right" v-show="!isShowDetail">
            <el-input v-model="inputSearch" size="small" placeholder="搜索..." class="searchInput"></el-input>
            <el-button size="small" type="primary" class="el-icon-search btn-addmore"></el-button>
            <el-button size="small" class="el-icon-arrow-down btn-trans" id="dropdown" @click="showDetailSearch"></el-button>
          </div>
        </el-col>
      </el-row>
      <div class="searchDatail" v-show="isShowDetail">
        <div class="top">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <span>管理区</span>
                <el-select v-model="selectedAria" placeholder="请选择管理区">
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <span>楼宇</span>
                <el-select v-model="selectedFloor" placeholder="请选择楼宇" :disabled="isFloorDisabled">
                  <el-option
                    v-for="item in floorHouseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
        </el-row>
        </div>
        <div class="down">

        </div>
        <div class="line"></div>
        <div class="searchContent"></div>
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
      inputSearch:'',//搜索框内容
      listLoading: false,
      multipleSelection: [],
      selectionLengh:0,
      isDisabled: true,
      isShowDetail:false ,//是否展示搜索详情盒子
      managerAriaList: [
        {
          value: '0',
          label: '请选择管理区'
        }, 
        {
          value: 'MZ',
          label: '明珠城（商业）'
        }, 
        {
          value: 'SD',
          label: '时代佳苑（住宅）'
        }, 
        {
          value: 'LD',
          label: '绿岛物业'
        }, 
        {
          value: 'ZY',
          label: '筑业物业'
        }
      ],
      selectedAria: '',
      isFloorDisabled:true,//楼宇下拉框默认不可选
      floorHouseList:[],
      selectedFloor:''

    };
  },

  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
        this.selectionLengh = val.length
    },
    handleSizeChange(size) {
			this.pageSize = size				
			this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val				
      this.getDeviceList()
    },
    //展示详细的搜索盒子
    // showDetailSearch() {
    //   this.isShowDetail = !this.isShowDetail
    // }
  },
  watch: {
    selectionLengh: function(newLen, oldLen) {
      if(newLen === 1) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    selectedAria: function(newVal, oldVal) {
      if(newVal === '0') {
        this.isFloorDisabled = true
      } else {
        this.isFloorDisabled = false
        switch(newVal) {
          case 'MZ':
          this.floorHouseList =
          [
            {
              value: '0',
              label: '请选择楼宇'
            }, 
            {
              value: '1',
              label: '商业1栋'
            }, 
            {
              value: '2',
              label: '商业2栋'
            }, 
            {
              value: '3',
              label: '商业3栋'
            }, 
            {
              value: '4',
              label: '商业4栋'
            }
          ];
          break;
          case 'SD':
          this.floorHouseList =
          [
            {
              value: '0',
              label: '请选择楼宇'
            }, 
            {
              value: '1',
              label: '住宅1栋'
            }, 
            {
              value: '2',
              label: '住宅2栋'
            }, 
            {
              value: '3',
              label: '住宅3栋'
            }, 
            {
              value: '4',
              label: '住宅4栋'
            }
          ];
          break;
          case 'LD':
          this.floorHouseList =
          [
            {
              value: '0',
              label: '请选择楼宇'
            }, 
            {
              value: '1',
              label: '绿岛1栋'
            }, 
            {
              value: '2',
              label: '绿岛2栋'
            }, 
            {
              value: '3',
              label: '绿岛3栋'
            }, 
            {
              value: '4',
              label: '绿岛4栋'
            }
          ];
          break;
          case 'ZY':
          this.floorHouseList =
          [
            {
              value: '0',
              label: '请选择楼宇'
            }, 
            {
              value: '1',
              label: '筑业1栋'
            }, 
            {
              value: '2',
              label: '筑业2栋'
            }, 
            {
              value: '3',
              label: '筑业3栋'
            }, 
            {
              value: '4',
              label: '筑业4栋'
            }
          ];
          break;
        }
      }
    }
  }  
}
</script>

<style lang="less" scope>
@font-color:#fff;
.main-content {
  .grid-content {
    .searchDatail {
      width: 100%;
      height: 40px;
      margin-top: 10px;
      margin-bottom: 10px;
      border:1px solid rgb(211, 220, 230);
    }
    .top {
      span {
        color:@font-color;
        margin-right: 25px;
      }
    }
    // .line {
    //   height: 1px;
    //   width: 80%;
    //   background-color: red;
    //   margin: 0 auto;
    //   // background-color: rgb(211, 220, 230);
    // }
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
            border:1px solid #9ea2c0;
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