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
                <el-button class="el-icon-refresh-left btn-addmore" size="small">重置</el-button>
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
        <el-table-column prop="roomCode" label="房间代码">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="table-show" @click="showRoomCodeDialog(scope.row)">{{scope.row.roomCode}}</el-button>
          </template>
        </el-table-column>
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

    <el-drawer
      title="房间详情"
      :visible.sync="isShowRoomCodeDialog"
      size="60%"
      :direction="direction">
      <div class="roomCodeDetail">
        <el-card class="simpData">
          <div class="simpleRoomData">
            <span>{{currentRow.managerAria}}</span>&nbsp;&nbsp;
            <span>{{currentRow.houseName}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{currentRow.roomCode}}</span>
          </div>
          <div class="operation">
            <el-button class="btn-addmore" size="small" @click="showEditRoom">编辑</el-button>
            <el-button class="btn-trans" @click="deleteCurrentRoom" size="small">删除</el-button>
          </div>
        </el-card>
        <el-card class="baseData">
          <div slot="header" class="clearfix">
            <span>基础信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="item">
                楼层：
                <span>2</span>
              </div>
              <div class="item">
                房间类型：
                <span>办公</span>
              </div>
              <div class="item">
                能否出租：
                <span>能</span>
              </div>
              <div class="item">
                二次验收日期：
                <span></span>
              </div>
              <div class="item">
                违规整改：
                <span></span>
              </div>
              <div class="item">
                备注：
                <span></span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="item">
                房间序号：
                <span>30</span>
              </div>
              <div class="item">
                建筑面积：
                <span>{{currentRow.buildUpArea}}</span>
              </div>
              <div class="item">
                房间状态：
                <span>{{currentRow.buildUpArea}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="item">
                房间代码：
                <span>{{currentRow.roomCode}}</span>
              </div>
              <div class="item">
                使用面积：
                <span>{{currentRow.buildUpArea}}</span>
              </div>
              <div class="item">
                初次验收日期：
                <span></span>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="ownerTab">
          <!-- <el-button>按钮</el-button> -->
          <el-tabs v-model="activeOwnerTab" @tab-click="changeOwnerTab">
            <el-tab-pane label="业主" name="owner">
              <el-table
              :data="ownerTable"
              stripe
              style="width: 100%">
                <el-table-column
                  prop="ownerName"
                  label="业主姓名">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" class="table-show">
                        {{scope.row.ownerName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="concatPhone"
                  label="联系电话">
                </el-table-column>
                <el-table-column
                  prop="MovingInDate"
                  label="迁入日期">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="当前居住成员" name="currentMember">
              <el-table
              :data="currentMemberTable"
              stripe
              style="width: 100%">
                <el-table-column
                  prop="memberName"
                  label="成员姓名"
                  width="150">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" class="table-show">
                        {{scope.row.memberName}}
                      </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="owner"
                  label="业主"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="relation"
                  label="与业主关系"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="concatPhone"
                  width="150"
                  label="联系电话">
                </el-table-column>
                <el-table-column
                  prop="limitDate"
                  label="居住期限"
                  width="240">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="contract">
          <el-table
          :data="contractTable"
          stripe
          style="width: 100%">
            <el-table-column
              prop="contractNum"
              label="合同编号">
            </el-table-column>
            <el-table-column
              prop="tenantName"
              label="租户姓名">
            </el-table-column>
            <el-table-column
              prop="contractStartDate"
              label="合同起始日期">
            </el-table-column>
            <el-table-column
              prop="contractEndDate"
              label="合同结束日期">
            </el-table-column>
            <el-table-column
              prop="status"
              label="合同状态">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div slot="footer"
          class="dialog-footer">
        <el-button @click="isShowRoomCodeDialog = false" class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore">确 定</el-button>
      </div>
    </el-drawer>
    <el-dialog
      title="编辑房间"
      :visible.sync="isShowRoomEditDialog"
      width="85%">
      <el-form ref="form" :model="editRoomForm" :rules="eDitRoomRules"
      label-width="auto">
        <el-row>
          <el-col>
            <el-form-item label="上级机构：" class="superiorOrganization" prop="higherAuthorities">
              <el-select v-model="editRoomForm.higherAuthorities" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10" >
            <el-form-item label="楼层：" prop="floor">
              <el-input v-model="editRoomForm.floor" placeholder="请输入楼层"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="房间序号：" prop="roomNum">
              <el-input v-model="editRoomForm.roomNum" placeholder="请输入序号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10" >
            <el-form-item label="房间代码：" prop="roomCode">
              <el-input v-model="editRoomForm.roomCode" placeholder="请输入房间代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="房间类型：" prop="roomType">
              <el-input v-model="editRoomForm.roomType" placeholder="请输入房间类型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
          class="dialog-footer">
        <el-button @click="isShowRoomCodeDialog = false" class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore">确 定</el-button>
      </div>
      </el-dialog>
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
      ownerTable:[
        {
          ownerName:'王志远（费用承担人）',
          concatPhone:'15797706475',
          MovingInDate:'2020/5/25',
          status:'当前'
        }
      ],
      currentMemberTable:[
        {
          memberName:'王志远',
          owner:'王志远',
          relation:'租户',
          concatPhone:'',
          limitDate:'2020/01/11-2020/10/01'
        }
      ],
      contractTable:[],
      //编辑房间的表单数据
      editRoomForm: {
        higherAuthorities:'',
        floor:2,
        roomNum:4,
        roomCode:'',
        roomType:'商用'
      },
      eDitRoomRules: {
        higherAuthorities: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        floor: [
          { required: true, message: '请输入楼层', trigger: 'blur' },
        ],
        roomNum:[
          // { required: true, message: '请输入序号！', trigger: 'blur' },
        ],
        roomCode:[
          { required: true, max:30, message: '请正确输入房间代码，最大长度为30', trigger: 'blur' }
        ]
      },
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
      customerName: "", //搜索框的客户名称
      isShowRoomCodeDialog:false,//是否展示抽屉弹窗（房间代码）
      isShowRoomEditDialog:false,//是否展示编辑房间的弹窗
      direction: 'rtl',
      currentRow:'',//点击的当前行
      activeOwnerTab:'owner',
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
    },
    // 展示编辑房间信息弹窗
    showEditRoom() {
      this.isShowRoomEditDialog = true
      this.isShowRoomCodeDialog = false
      this.editRoomForm.roomCode = this.currentRow.roomCode
    },
    // 展示抽屉弹窗
    showRoomCodeDialog(row) {
      this.isShowRoomCodeDialog = true
      this.currentRow = row
    },
    //删除当前房间
    deleteCurrentRoom(row) {
      this.$confirm(`确定要删除房间${this.currentRow.roomCode}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //切换业主Tab
    changeOwnerTab(tab, event) {
      console.log(tab.paneName, event)
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
      min-width:800px;
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