<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>装修登记</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus btn-addmore" @click="isShowAddDia = true">   装修申请</el-button>
            <el-button size="small" type="primary" class="el-icon-edit btn-addmore" :disabled="isDisEdit" @click="editSelection">编辑</el-button>
            <el-button size="small" type="primary" class="el-icon-delete btn-addmore" :disabled="isDisDelete" @click="deleteSelections">删除</el-button>
            <el-button size="small" type="primary" class="el-icon-edit btn-addmore" :disabled="isDisabled">收费</el-button>
            <el-button size="small" type="primary" class="el-icon-check btn-addmore" :disabled="isDisConfirm" @click="confirmSelections">完成验收</el-button>
            <el-button size="small" type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24"  :lg="12" :xl="12">
          <div class="right">
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
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="table-show" @click="showDecDetail(scope.row,scope.$index)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="managerAria" label="管理区"></el-table-column>
        <el-table-column prop="houseName" label="楼宇"></el-table-column>
        <el-table-column prop="roomCode" label="房间代码"></el-table-column>
        <el-table-column prop="buildUpArea" label="建筑面积(m²)"></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="decorateStartDate" label="装修开始时间"></el-table-column>
        <el-table-column prop="decorateEndDate" label="装修结束时间"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == '1'">已验收</span>
            <span v-if="scope.row.state == '0'">未验收</span>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="查看装修信息" :visible.sync="isShowDecDetail" width="80%">
        <el-form ref="decrationForm" :model="decrationForm" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：">
                <el-input v-model="decrationForm.managerAria" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="楼宇：">
                <el-input v-model="decrationForm.houseName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码：">
                <el-input v-model="decrationForm.roomCode" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建筑面积：">
                <el-input v-model="decrationForm.buildUpArea" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="客户：">
                <el-input v-model="decrationForm.customerName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="验收状态：">
                <el-input v-model="stateTxt[decrationForm.state]" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="装修开始时间：">
                <el-input v-model="decrationForm.decorateStartDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="装修结束时间：">
                <el-input v-model="decrationForm.decorateEndDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer"> 
        </div>
      </el-dialog>

      <el-dialog title="编辑装修信息" :visible.sync="isShowEditDia" width="80%">
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerAria">
                <el-select
                  v-model="editForm.managerAria"
                  @change="editChangeAria"
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
                <el-input v-model="editForm.houseName"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码：" prop="roomCode">
                <el-input v-model="editForm.roomCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建筑面积：" prop="buildUpArea">
                <el-input v-model="editForm.buildUpArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="客户：" prop="customerName">
                <el-input v-model="editForm.customerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="验收状态：" prop="state">
                <el-radio v-model="editForm.state" label="0">未验收</el-radio>
                <el-radio v-model="editForm.state" label="1">已验收</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="装修时间范围：" prop="decrateDate">
                <el-date-picker
                  v-model="editForm.decrateDate"
                  type="daterange"
                  range-separator="至"
                  value-format="yyyy-MM-dd"
                  start-placeholder="装修开始时间"
                  end-placeholder="装修结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditForm('editForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitEditForm('editForm')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="申请装修" :visible.sync="isShowAddDia" width="80%">
        <el-form ref="newEditForm" :model="newEditForm" :rules="newEditFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerAria">
                <el-select
                  v-model="newEditForm.managerAria"
                  @change="addChangeAria"
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
                <el-input v-model="newEditForm.houseName" placeholder="请输入楼宇名称"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码：" prop="roomCode">
                <el-input v-model="newEditForm.roomCode" placeholder="请输入房间代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建筑面积：" prop="buildUpArea">
                <el-input v-model="newEditForm.buildUpArea" placeholder="请输入建筑面积"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="客户：" prop="customerName">
                <el-input v-model="newEditForm.customerName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="验收状态：" prop="state">
                <el-radio v-model="newEditForm.state" label="0">未验收</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="装修时间范围：" prop="decrateDate">
                <el-date-picker
                  v-model="newEditForm.decrateDate"
                  type="daterange"
                  range-separator="至"
                  value-format="yyyy-MM-dd"
                  start-placeholder="装修开始时间"
                  end-placeholder="装修结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelNewForm('newEditForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitNewForm('newEditForm')">确 定</el-button>
        </div>
      </el-dialog>

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
          customerName: "王一",
          decorateStartDate: "2020-04-17",
          decorateEndDate:'2020-05-25',
          state:'1'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ5",
          buildUpArea: "892.6",
          customerName: "王二",
          decorateStartDate: "2020-04-17",
          decorateEndDate:'2020-05-25',
          state:'1'
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ4",
          buildUpArea: "892.6",
          customerName: "王三",
          decorateStartDate: "2020-04-17",
          decorateEndDate:'2020-05-25',
          state:'0'
        }
      ],
      stateTxt:{
        '0':'未验收',
        '1':'已验收'
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
      isShowDetail: false, //是否展示搜索详情盒子
      isFloorDisabled: true, //楼宇下拉框默认不可选
      floorHouseList: [],
      total: 0,
      page: 1,				
      pageSize: 10,
      isShowEditDia:false,
      isShowAddDia:false,
      inputSearch:'',//搜索框内容
      selectionLengh:0,//多选内容
      editForm:{},//编辑form
      //搜索详情表单数据
      searchDetailForm: {
        selectedAria: "",
        selectedFloor: "",
        roomCodeSearch: "", //搜索框的房间代码
        customerNameSearch: "" //搜索框的客户名称
      },
      editFormRules:{
        managerAria:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        houseName:[{ required: true, message: "请输入楼宇名称", trigger: "blur" }],
        roomCode:[{ required: true, message: "请输入房间代码", trigger: "blur" }],
        buildUpArea:[{ required: true, message: "请输入建筑面积", trigger: "blur" }],
        customerName:[{ required: true, message: "请输入客户名称", trigger: "blur" }],
        state:[{ required: true, message: "请选择验收状态", trigger: "blur" }],
        decrateDate:[{ required: true, message: "请选择起始日期", trigger: "blur" }]
      },
      newEditForm:{state:'0'},//新建form
      newEditFormRules:{
        managerAria:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        houseName:[{ required: true, message: "请输入楼宇名称", trigger: "blur" }],
        roomCode:[{ required: true, message: "请输入房间代码", trigger: "blur" }],
        buildUpArea:[{ required: true, message: "请输入建筑面积", trigger: "blur" }],
        customerName:[{ required: true, message: "请输入客户名称", trigger: "blur" }],
        state:[{ required: true, message: "请选择验收状态", trigger: "blur" }],
        decrateDate:[{ required: true, message: "请选择起始日期", trigger: "blur" }]
      },
      arrayIndex:[],//多选按钮选中后index数组
      decrationForm:{},//查看当前行的表单内容
      isShowDecDetail:false,//查看当前行的弹窗显示
      isDisDelete:true,
      isDisConfirm:true,
      isDisEdit:true,
      listLoading: false,
      isDisabled: true
    };
  },

  methods: {
    handleSizeChange(size) {
			this.pageSize = size				
			this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val				
      this.getDeviceList()
    },
    // 展示详细的搜索盒子
    showDetailSearch() {
      this.isShowDetail = !this.isShowDetail;
    },
    //申请装修
    showDecDetail(row, index) {
      this.decrationForm = row
      this.isShowDecDetail = true
    },
    //编辑弹窗
    editSelection() {
      this.isShowEditDia = true
      this.editForm = this.multipleSelection[0]
      this.editForm.decrateDate = [this.multipleSelection[0].decorateStartDate, 
      this.multipleSelection[0].decorateEndDate]
      console.log(this.editForm,'form')
    },
    editChangeAria(item) {
      const {value, label} = item
      let index = this.arrayIndex[0]
      this.tableData[index].managerAria = label
    },
    addChangeAria(item) {
      const {value, label} = item
      this.newEditForm.managerAria = label
    },
    //取消编辑弹窗
    cancelEditForm(formName) {
      this.isShowEditDia = false
      this.$refs[formName].resetFields();
    },
    //取消新建弹窗
    cancelNewForm() {
      this.isShowAddDia = false
      this.$refs[formName].resetFields();
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let index = this.arrayIndex[0]
            this.tableData[index] = this.editForm
            this.tableData[index].decorateStartDate = this.editForm.decrateDate[0]
            this.tableData[index].decorateEndDate = this.editForm.decrateDate[1]
            this.isShowEditDia = false
          } else {
            return false;
          }
      })
    },
    submitNewForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.newEditForm,'form')
            this.newEditForm.decorateStartDate = this.newEditForm.decrateDate[0]
            this.newEditForm.decorateEndDate = this.newEditForm.decrateDate[1]
            this.tableData.push(this.newEditForm)
            this.isShowAddDia = false
          } else {
            return false;
          }
      })
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
    },
    //点击多选按钮事件
    handleSelectionChange(val) {
      this.arrayIndex = []
      this.multipleSelection = val;
      val.forEach((value, index) => {
　　　　　this.tableData.forEach((v, i) => {
          if(value.roomCode == v.roomCode){
            this.arrayIndex.push(i)
          }
        })
      })        
      this.selectionLengh = val.length;
    },
    //删除所选数据
    deleteSelections() {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
        for (let i = 0; i < this.tableData.length; i++) {
          const element = this.tableData[i];
          element.id = i
        }
        this.multipleSelection.forEach(element => {
          this.tableData.forEach((e, i) => {
            if (element.id == e.id) {
              this.tableData.splice(i, 1)
            }
        })
      });
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
    //完成所选项的验收
    confirmSelections() {
      this.$confirm(`确定要将所选完成验收吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
        for (let i = 0; i < this.tableData.length; i++) {
          const element = this.tableData[i];
          element.id = i
        }
        this.multipleSelection.forEach(element => {
          this.tableData.forEach((e, i) => {
            if (element.id == e.id) {
              this.tableData[i].state = '1'
            }
        })
      });
        this.$message({
          type: "success",
          message: "完成验收成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    }
  },
  watch: {
      selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isDisDelete = false
        this.isDisConfirm = false
      } else {
        this.isDisDelete = true
        this.isDisConfirm = false
      }
      if (newLen === 1) {
        this.isDisEdit = false;
      } else {
        this.isDisEdit = true;
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