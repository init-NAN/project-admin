<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>入住登记</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus btn-addmore" @click="newData">   新建</el-button>
            <el-button size="small" type="primary" class="el-icon-edit btn-addmore" :disabled="isCanEdit" @click="editCurrentRow">编辑</el-button>
            <el-button size="small" class="el-icon-delete btn-addmore" :disabled="isCanDelete" @click="deleteSelections">删除</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="right" v-if="!isShowDetail">
            <el-input v-model="inputSearch" size="small" placeholder="搜索..." class="searchInput"></el-input>
            <el-button size="small" type="primary" class="el-icon-search btn-addmore"></el-button>
            <el-button size="small"  class="el-icon-arrow-down btn-addmore" id="dropdown" @click="showDetailSearch"></el-button>
          </div>
        </el-col>
      </el-row>
      <div class="searchDetail" v-if="isShowDetail">
        <el-form :model="searchDetailForm" ref="searchDetailForm" label-width="auto">
          <el-row type="flex" justify="space-around">
            <el-col :span="10" :offset="2">
              <el-form-item label="管理区">
                <el-select
                  v-model="searchDetailForm.selectedAria"
                  placeholder="请选择管理区"
                  @change="chooseAria"
                >
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="楼宇">
                <el-select
                  v-model="searchDetailForm.selectedFloor"
                  filterable
                  placeholder="请选择楼宇"
                  :disabled="isFloorDisabled"
                >
                  <el-option
                    v-for="item in floorHouseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="10" :offset="2">
              <el-form-item label="房间代码">
                <el-input
                  v-model="searchDetailForm.roomCodeSearch"
                  placeholder="请输入房间代码"
                  class="roomCodeInput"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="客户名称">
                <el-input
                  v-model="searchDetailForm.customerNameSearch"
                  placeholder="请输入客户名称"
                  class="customerInput"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :span="23" :offset="1">
            <div class="line"></div>
          </el-col>
        </el-row>
        <div class="searchContent">
          <el-row>
            <el-col :span="12" :offset="12">
              <div class="btns">
                <el-button size="small" class="el-icon-search btn-addmore">搜索</el-button>
                <el-button
                  class="el-icon-refresh-left btn-addmore"
                  size="small"
                  @click="reSetting()"
                >重置</el-button>
                <el-button
                  class="el-icon-arrow-up btn-addmore"
                  size="small"
                  @click="showDetailSearch"
                ></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      
      <el-table
        :data="tableData"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        ref="singleTable"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="managerAria" label="管理区"></el-table-column>
        <el-table-column prop="houseName" label="楼宇"></el-table-column>
        <el-table-column prop="roomCode" label="房间代码"></el-table-column>
        <el-table-column prop="buildUpArea" label="建筑面积(m²)"></el-table-column>
        <el-table-column prop="customerName" label="业主"></el-table-column>
        <el-table-column prop="roomState" label="房间状态">
          <template slot-scope="scope">
            <span v-if="scope.row.roomState == 1">已入住</span>
            <span v-if="scope.row.roomState == 0">未入住</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkInDate" label="入住日期"></el-table-column>
      </el-table>
    </section>
    <el-dialog title="编辑入住信息" :visible.sync="isShowEdit" width="85%">
        <el-form ref="editRoomForm" :model="editRoomForm" :rules="eDitRoomRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerAria">
                <el-select
                  v-model="editRoomForm.managerAria"
                  @change="changeAria"
                  placeholder="请选择管理区">
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}">
                  </el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="楼宇：" prop="houseName"> 
                <el-input v-model="editRoomForm.houseName" placeholder="请输楼宇名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码：" prop="roomCode"> 
                <el-input v-model="editRoomForm.roomCode" placeholder="请输入房间代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建筑面积：" prop="buildUpArea"> 
                <el-input v-model="editRoomForm.buildUpArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="业主：" prop="customerName"> 
                <el-input v-model="editRoomForm.customerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="房间状态：" prop="roomState"> 
                <el-radio v-model="editRoomForm.roomState" label="0">未入住</el-radio>
                <el-radio v-model="editRoomForm.roomState" label="1">已入住</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="入住日期：" prop="checkInDate">
                <el-date-picker
                  v-model="editRoomForm.checkInDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer"> 
          <el-button @click="cancelRoomEdit('editRoomForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitEditRoomForm('editRoomForm')">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="新建入住信息" :visible.sync="isShowNew" width="85%">
        <el-form ref="newDataForm" :model="newDataForm" :rules="newDataFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerAria">
                <el-select
                  v-model="newDataForm.managerAria"
                  @change="newManagerAriaData"
                  placeholder="请选择管理区">
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}">
                  </el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="楼宇：" prop="houseName"> 
                <el-input v-model="newDataForm.houseName" placeholder="请输楼宇名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码：" prop="roomCode"> 
                <el-input v-model="newDataForm.roomCode" placeholder="请输入房间代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建筑面积：" prop="buildUpArea"> 
                <el-input v-model="newDataForm.buildUpArea" placeholder="请输入建筑面积"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="业主：" prop="customerName"> 
                <el-input v-model="newDataForm.customerName" placeholder="请输入业主名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="房间状态：" prop="roomState"> 
                <el-radio v-model="newDataForm.roomState" label="0">未入住</el-radio>
                <el-radio v-model="newDataForm.roomState" label="1">已入住</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="入住日期：" prop="checkInDate">
                <el-date-picker
                  v-model="newDataForm.checkInDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer"> 
          <el-button @click="cancelNewData('newDataForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitNewDataForm('newDataForm')">确 定</el-button>
        </div>
    </el-dialog>
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
          customerName: "王光",
          roomState:'0',
          checkInDate: "2020-04-17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ5",
          buildUpArea: "892.6",
          customerName: "王浩",
          roomState:'1',
          checkInDate: "2020-04-17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ4",
          buildUpArea: "892.6",
          customerName: "王浩光",
          roomState:'1',
          checkInDate: "2020-04-17"
        }
      ],
      total: 0,
      page: 1,				
      pageSize: 10,
      inputSearch:'',//搜索框内容
      selectionLengh: 0,
      multipleSelection: [],
      listLoading: false,
      isCanEdit: true,//编辑按钮能付点击
      isCanDelete:true,//删除按钮能否点击
      isShowDetail: false, //是否展示搜索详情盒子
      isFloorDisabled: true, //楼宇下拉框默认不可选
      floorHouseList: [],
      arrayIndex:[],
      isShowEdit:false,
      isShowNew:false,
      //搜索详情表单数据
      searchDetailForm: {
        selectedAria: "",
        selectedFloor: "",
        roomCodeSearch: "", //搜索框的房间代码
        customerNameSearch: "" //搜索框的客户名称
      },
      editRoomForm:{},
      eDitRoomRules:{
        managerAria:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        houseName:[{ required: true, message: "请输入楼宇", trigger: "blur" }],
        roomCode: [
          {
            required: true,
            max: 30,
            message: "请正确输入房间代码，最大长度为30",
            trigger: "blur"
          }
        ],
        buildUpArea: [{required: true, min: 0, message: "请输入建筑面积", trigger: "blur"}],
        customerName:[{required: true, min: 0, message: "请输入客户名称", trigger: "blur"}],
        roomState:[{required: true, message: "请选择房间状态", trigger: "blur"}],
        checkInDate:[{required: true, message: "请选择入住日期", trigger: "blur"}]
      },
      newDataFormRules:{
        managerAria:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        houseName:[{ required: true, message: "请输入楼宇", trigger: "blur" }],
        roomCode: [
          {
            required: true,
            max: 30,
            message: "请正确输入房间代码，最大长度为30",
            trigger: "blur"
          }
        ],
        buildUpArea: [{required: true, min: 0, message: "请输入建筑面积", trigger: "blur"}],
        customerName:[{required: true, min: 0, message: "请输入客户名称", trigger: "blur"}],
        roomState:[{required: true, message: "请选择房间状态", trigger: "blur"}],
        checkInDate:[{required: true, message: "请选择入住日期", trigger: "blur"}]
      },
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
      newDataForm:{}
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.selectionLengh = val.length;
      this.multipleSelection = val;
      this.arrayIndex = []
      val.forEach((value, index) => {
　　　　this.tableData.forEach((v, i) => {
          if(value.roomCode == v.roomCode){
            this.arrayIndex.push(i)
          }
        })
      })
    },
    // 展示详细的搜索盒子
    showDetailSearch() {
      this.isShowDetail = !this.isShowDetail;
    },
    handleSizeChange(size) {
			this.pageSize = size				
			this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val				
      this.getDeviceList()
    },
    editCurrentRow() {
      this.isShowEdit = true
      this.editRoomForm = this.multipleSelection[0]
    },
    newManagerAriaData(item) {
      const {value, label} = item
      this.newDataForm.managerAria = label
    },
    changeAria(item) {
      const {value, label} = item
      let index = this.arrayIndex[0]
      this.tableData[index].managerAria = label
    },
    cancelRoomEdit(formName) {
      this.isShowEdit = false
      this.$refs[formName].resetFields();
    },
    submitEditRoomForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let index = this.arrayIndex[0]
            console.log(this.editRoomForm,'form')
            this.tableData[index] = this.editRoomForm
            this.isShowEdit = false
          } else {
            return false;
          }
      });
    },
    submitNewDataForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.newDataForm,'newForm')
            this.tableData.push(this.newDataForm)
            this.isShowNew = false
          } else {
            return false;
          }
      });
    },
    //删除
    deleteSelections() {
      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i];
        element.id = i
      }
      this.multipleSelection.forEach(element => {
        this.tableData.forEach((e, i) => {
          if (element.id == e.id) {
            this.tableData.splice(i, 1)
          }
        });
      });
    },
    newData() {
      this.isShowNew = true
    },
    chooseAria(item) {
      //当管理区发生变化时候，给楼宇赋值
      // console.log(item, "管理区");
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
    reSetting() {
      for (let key in this.searchDetailForm) {
        this.searchDetailForm[key] = "";
      }
    }
  },
  watch: {
    selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isCanDelete = false
      } else {
        this.isCanDelete = true
      }
      if (newLen === 1) {
        this.isCanEdit = false;
      } else {
        this.isCanEdit = true;
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