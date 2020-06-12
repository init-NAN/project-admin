<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>接房登记</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button
              size="small"
              type="primary"
              class="el-icon-plus btn-addmore"
              @click="newAddRegistration"
            >接房登记</el-button>
            <el-button
              size="small"
              type="primary"
              class="el-icon-delete btn-addmore"
              :disabled="isCanDelete"
              @click="deleteSelections"
            >删除</el-button>
            <el-button
              size="small"
              :disabled="isDisabledChangeDate"
              class="btn-addmore"
              @click="changeReceiveDate"
            >更改接房日期</el-button>
            <el-button size="small" type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
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
        <el-table-column prop="roomCode" label="房间代码">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="table-show"
              @click="editRoomDialog(scope.$index, scope.row)"
            >{{scope.row.roomCode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="buildUpArea" label="建筑面积(m²)"></el-table-column>
        <el-table-column prop="customerName" label="客户名称">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="table-show"
              @click="showCustomerDetail(scope.row)"
            >{{scope.row.customerName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roomState" label="房间状态">
          <template slot-scope="scope">
            <span v-if="scope.row.roomState == 1">已接收</span>
            <span v-if="scope.row.roomState == 0">未接收</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiveDate" label="接房日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" class="table-show" >编辑</el-button> -->
            <el-button
              type="text"
              size="small"
              class="table-del"
              @click="deleteCurrentRow(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑客户详情" :visible.sync="isShowCustomerDetail" width="85%">
        <el-form
          ref="customerDetailForm"
          :model="customerDetailForm"
          :rules="customerDetailFormRules"
          label-width="auto"
        >
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="姓名：" prop="customerName">
                <el-input v-model="customerDetailForm.customerName" placeholder="请输客户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="身份证号：" prop="identifyNum">
                <el-input v-model="customerDetailForm.identifyNum" placeholder="请输身份证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="电话号码：" prop="telPhone">
                <el-input v-model="customerDetailForm.telPhone" placeholder="请输客户电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所交租金/万元：" prop="rentMoney">
                <el-input v-model="customerDetailForm.rentMoney" placeholder="请输客户所交租金"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelCustomerForm('customerDetailForm')" class="btn-trans">取 消</el-button>
          <el-button
            type="primary"
            @click="submitCustomerForm('customerDetailForm')"
            class="btn-addmore"
          >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑房间" :visible.sync="isShowRoomEditDialog" width="85%">
        <el-form ref="editRoomForm" :model="editRoomForm" :rules="eDitRoomRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerAria">
                <el-select
                  v-model="editRoomForm.managerAria"
                  @change="changeAria"
                  placeholder="请选择管理区"
                >
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="楼宇：" prop="floorHouse">
                <el-input v-model="editRoomForm.floorHouse" placeholder="请输楼宇名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
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
            <el-col :span="10">
              <el-form-item label="房间代码：" prop="roomCode">
                <el-input v-model="editRoomForm.roomCode" placeholder="请输入房间代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="房间类型：" prop="selectedRoomType">
                <el-select
                  v-model="editRoomForm.selectedRoomType"
                  placeholder="请选择房间类型"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in roomTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="建筑面积：" prop="buildUpArea">
                <el-input v-model="editRoomForm.buildUpArea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="接收状态：" prop="roomState">
                <el-radio v-model="editRoomForm.roomState" label="0">未接收</el-radio>
                <el-radio v-model="editRoomForm.roomState" label="1">已接收</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="接房日期：" prop="receiveDate">
                <el-date-picker
                  v-model="editRoomForm.receiveDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRoomEdit('editRoomForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitEditRoomForm('editRoomForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="更改接房日期" :visible.sync="isShowChangeDateDialog" width="40%">
        <el-form
          ref="changeDateForm"
          :model="changeDateForm"
          :rules="changeDateFormRules"
          label-width="auto"
        >
          <el-row type="flex" justify="space-between">
            <el-col>
              <el-form-item label="接房日期：" prop="receiveDate">
                <el-date-picker
                  v-model="changeDateForm.receiveDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelChangeDate('changeDateForm')" class="btn-trans">取 消</el-button>
          <el-button
            type="primary"
            @click="submitChangeDate('changeDateForm')"
            class="btn-addmore"
          >确 定</el-button>
        </span>
      </el-dialog>
    </section>
    <el-dialog title="新建接房登记" :visible.sync="isShowrRegistation" width="85%">
      <el-form
          :model="registrationForm"
          :rules="registrationRules"
          ref="registrationForm"
          label-width="auto"
          class="registrationForm">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区" prop="managerAria">
                <el-select v-model="registrationForm.managerAria" placeholder="请选择管理区">
                  <el-option
                    v-for="item in managerAriaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="楼宇名称" prop="houseName">
                <el-input v-model="registrationForm.houseName" placeholder="请输入楼宇名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码" prop="roomCode">
                <el-input v-model="registrationForm.roomCode" placeholder="请输入房间代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建筑面积" prop="buildUpArea">
                <el-input v-model="registrationForm.buildUpArea" placeholder="请输入建筑面积"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="接收状态：" prop="roomState">
                <el-radio v-model="registrationForm.roomState" label="1">已接收</el-radio>
                <el-radio v-model="registrationForm.roomState" label="0">未接收</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户" prop="customerName">
                <el-input v-model="registrationForm.customerName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="交房日期" class="receiveDate" prop="handoverDate">
                <el-date-picker
                  v-model="registrationForm.receiveDate"
                  type="date"
                  placeholder="选择交房日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelRegistration('registrationForm')" class="btn-trans">取 消</el-button>
        <el-button type="primary" @click="submitRegistration('registrationForm')" class="btn-addmore">确 定</el-button>
      </span>
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
          customerName: "王浩光",
          roomState: "0",
          receiveDate: "2020-04-17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ5",
          buildUpArea: "892.6",
          customerName: "王浩光",
          roomState: "1",
          receiveDate: "2020-04-17"
        }
      ],
      isFloorDisabled: true, //楼宇下拉框默认不可选
      isShowrRegistation: false, //是否展示登记导向
      isDisabledChangeDate: true,
      isShowChangeDateDialog: false, //更改接房日期弹窗
      changeDateIndex: 0,
      isCanDelete: true,
      changeDateForm: {
        receiveDate: ""
      },
      changeDateFormRules: {
        receiveDate: [
          { required: true, message: "请选择接房日期", trigger: "blur" }
        ]
      },
      //搜索详情表单数据
      searchDetailForm: {
        selectedAria: "",
        selectedFloor: "",
        roomCodeSearch: "", //搜索框的房间代码
        customerNameSearch: "" //搜索框的客户名称
      },
      arrayIndex: [], //多选按钮选中后index数组
      floorHouseList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      inputSearch: "", //搜索框内容
      listLoading: false,
      isShowDetail: false,
      multipleSelection: [],
      selectionLengh: 0,
      currentIndex: 0,
      //登记导向的表单数据
      registrationForm: {
        managerAria: "",
        houseName: "",
        roomCode: "",
        buildUpArea: "",
        customerName: "",
        receiveDate: ""
      },
      registrationRules: {
        managerAria: [
          { required: true, message: "请选择管理区", trigger: "blur" }
        ],
        houseName: [
          { required: true, message: "请输入楼宇名称", trigger: "blur" }
        ],
        roomCode: [
          { required: true, message: "请输入房间代码", trigger: "blur" }
        ],
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        buildUpArea: [
          { required: true, min: 0, message: "请输入建筑面积", trigger: "blur" }
        ],
        receiveDate: [
          { required: true, message: "请选择接房日期", trigger: "blur" }
        ],
        roomState: [
          { required: true, message: "请选择接收状态", trigger: "blur" }
        ]
      },
      // 客户详情弹窗start
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
      isShowCustomerDetail: false,
      customerDetailForm: {
        customerName: "",
        identifyNum: 223123123123123,
        telPhone: 15797706475,
        rentMoney: 2
      },
      customerDetailFormRules: {
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        identifyNum: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
        ],
        telPhone: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
        ],
        rentMoney: [
          { required: true, message: "请输入所交租金", trigger: "blur" }
        ]
      },
      // 客户详情弹窗end

      // 房间详情弹窗 start
      isShowRoomEditDialog: false,
      editRoomForm: {
        managerAria: "",
        floorHouse: "",
        floor: 2,
        roomNum: 4,
        roomCode: "",
        selectedRoomType: "商用",
        buildUpArea: "",
        roomState: "",
        receiveDate: ""
      },
      roomTypeList: [
        {
          value: "0",
          label: "商用"
        },
        {
          value: "1",
          label: "住宅"
        },
        {
          value: "2",
          label: "办公"
        }
      ],
      eDitRoomRules: {
        managerAria: [
          { required: true, message: "请选择管理区", trigger: "blur" }
        ],
        floor: [{ required: true, message: "请输入楼层", trigger: "blur" }],
        floorHouse: [
          { required: true, message: "请输入楼宇", trigger: "blur" }
        ],
        roomNum: [{ required: true, message: "请输入序号！", trigger: "blur" }],
        roomCode: [
          {
            required: true,
            max: 30,
            message: "请正确输入房间代码，最大长度为30",
            trigger: "blur"
          }
        ],
        selectedRoomType: [
          { required: true, message: "请选择房间类型！", trigger: "blur" }
        ],
        buildUpArea: [
          { required: true, min: 0, message: "请输入建筑面积", trigger: "blur" }
        ],
        roomState: [
          { required: true, message: "请选择接收状态", trigger: "blur" }
        ],
        receiveDate: [
          { required: true, message: "请选择接房日期", trigger: "blur" }
        ]
      }
      // 房间详情弹窗 end
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.arrayIndex = [];
      this.multipleSelection = val;
      val.forEach((value, index) => {
        this.tableData.forEach((v, i) => {
          if (value.roomCode == v.roomCode) {
            this.arrayIndex.push(i);
          }
        });
      });
      console.log(this.arrayIndex, "iii");
      this.selectionLengh = val.length;
    },
    changeReceiveDate() {
      this.changeDateForm.receiveDate = "";
      let index = this.arrayIndex.length - 1;
      this.changeDateIndex = this.arrayIndex[index];
      this.isShowChangeDateDialog = true;
    },
    cancelChangeDate(formName) {
      this.isShowChangeDateDialog = false;
      this.$refs[formName].resetFields();
    },
    submitChangeDate(formName) {
      this.isShowChangeDateDialog = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.changeDateIndex, "index");
          this.tableData[
            this.changeDateIndex
          ].receiveDate = this.changeDateForm.receiveDate;
        } else {
          return false;
        }
      });
    },
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
            element.id = i;
          }
          this.multipleSelection.forEach(element => {
            this.tableData.forEach((e, i) => {
              if (element.id == e.id) {
                this.tableData.splice(i, 1);
              }
            });
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
    deleteCurrentRow(index, row) {
      this.$confirm(`确定要删除房间${row.roomCode}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
    },
    changeAria(item) {
      const { value, label } = item;
      this.tableData[this.currentIndex].managerAria = label;
    },
    // 展示详细的搜索盒子
    showDetailSearch() {
      this.isShowDetail = !this.isShowDetail;
    },
    //房间详情编辑弹窗
    editRoomDialog(index, row) {
      this.isShowRoomEditDialog = true;
      this.editRoomForm.managerAria = row.managerAria;
      this.editRoomForm.floorHouse = row.houseName;
      this.editRoomForm.roomCode = row.roomCode;
      this.editRoomForm.buildUpArea = row.buildUpArea;
      this.editRoomForm.roomState = row.roomState;
      this.editRoomForm.receiveDate = row.receiveDate;
      this.currentIndex = index;
    },
    cancelRegistration(formName) {
      this.isShowrRegistation = false;
      this.$refs[formName].resetFields();
    },
    submitRegistration(formName) {
      console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.registrationForm,'registrationForm')
          this.tableData.push({...this.registrationForm})
          this.isShowrRegistation = false
          //修改成功操作
        } else {
          return false;
        }
      });
    },
    newAddRegistration() {
      this.isShowrRegistation = true;
      for (let key in this.registrationForm) {
        this.registrationForm[key] = "";
      }
    },
    //点击客户详情弹窗取消按钮
    cancelCustomerForm(formName) {
      this.isShowCustomerDetail = false;
      this.$refs[formName].resetFields();
    },
    cancelRoomEdit(formName) {
      this.isShowRoomEditDialog = false;
      this.$refs[formName].resetFields();
    },
    //点击客户名称展示客户详情代码
    showCustomerDetail(row) {
      this.customerDetailForm.customerName = row.customerName;
      this.customerDetailForm.managerAria = row.managerAria;
      this.customerDetailForm.floorHouse = row.houseName;
      this.customerDetailForm.receiveDate = row.receiveDate;
      this.isShowCustomerDetail = true;
      console.log(row, "row");
    },
    submitCustomerForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isShowCustomerDetail = false;
          //修改成功操作
        } else {
          return false;
        }
      });
    },
    submitEditRoomForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let row = this.tableData[this.currentIndex];
          console.log(row, "row11");
          row.houseName = this.editRoomForm.floorHouse;
          row.roomCode = this.editRoomForm.roomCode;
          row.buildUpArea = this.editRoomForm.buildUpArea;
          row.roomState = this.editRoomForm.roomState;
          row.receiveDate = this.editRoomForm.receiveDate;
          console.log(
            this.editRoomForm.receiveDate,
            "this.editRoomForm.receiveDate"
          );
          this.isShowRoomEditDialog = false;
          //修改成功操作
        } else {
          return false;
        }
      });
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
      if (newLen != 0) {
        this.isCanDelete = false;
      } else {
        this.isCanDelete = true;
      }
      if (newLen === 1) {
        this.isDisabledChangeDate = false;
      } else {
        this.isDisabledChangeDate = true;
      }
    }
  }
};
</script>

<style lang="less" scope>
</style>