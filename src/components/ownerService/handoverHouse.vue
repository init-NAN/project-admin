<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>交房登记</span>
    </div>
    <section class="grid-content">
      <el-form :model="searchDetailForm" ref="searchDetailForm" label-width="auto">
        <el-row class="buttonHead">
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="left">
              <el-button class="el-icon-plus btn-addmore" @click="showAddRegistration">交房登记</el-button>
              <el-button
                class="el-icon-delete btn-addmore"
                :disabled="isCanDelete"
                @click="deleteSelections"
              >删除</el-button>
              <el-button
                :disabled="isDisabledChangeDate"
                class="btn-addmore"
                @click="changeHandOverDate"
              >更改交房日期</el-button>
              <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="right" v-if="!isShowDetail">
              <el-input v-model="inputSearch" placeholder="搜索..." class="searchInput"></el-input>
              <el-button type="primary" class="el-icon-search btn-addmore"></el-button>
              <el-button
                class="el-icon-arrow-down btn-addmore"
                id="dropdown"
                @click="showDetailSearch"
              ></el-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="isShowDetail">
          <el-col :span="6">
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
          <el-col :span="6" :offset="1">
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
        <el-row v-if="isShowDetail" type="flex" justify="flex-end">
          <el-col :span="6">
            <el-form-item label="房间代码">
              <el-input
                v-model="searchDetailForm.roomCodeSearch"
                placeholder="请输入房间代码"
                class="roomCodeInput"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label="客户名称">
              <el-input
                v-model="searchDetailForm.customerNameSearch"
                placeholder="请输入客户名称"
                class="customerInput"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button class="el-icon-search btn-addmore">搜索</el-button>
            <el-button class="el-icon-refresh-left btn-addmore" @click="reSetting()">重置</el-button>
            <el-button class="el-icon-arrow-up btn-addmore" @click="showDetailSearch"></el-button>
          </el-col>
        </el-row>
      </el-form>
    </section>
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
          <el-button
            type="text"
            class="table-show"
            @click="showRoomCodeDialog(scope.row,scope.$index)"
          >{{scope.row.roomCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="buildUpArea" label="建筑面积(m²)"></el-table-column>
      <el-table-column prop="customerName" label="客户名称">
        <template slot-scope="scope">
          <el-button
            type="text"
            class="table-show"
            @click="showCustomerDetail(scope.row, scope.$index)"
          >{{scope.row.customerName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="handoverDate" label="交房日期"></el-table-column>
    </el-table>
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
    <div style="width:100%;height:120px;"></div>
    <el-drawer title="房间详情" :visible.sync="isShowRoomCodeDialog" size="60%" :direction="direction">
      <div class="roomCodeDetail">
        <el-card class="simpData">
          <div class="simpleRoomData">
            <span>{{currentRow.managerAria}}</span>&nbsp;&nbsp;
            <span>{{currentRow.houseName}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{currentRow.roomCode}}</span>
          </div>
          <div class="operation">
            <el-button class="btn-addmore" @click="showEditRoom">编辑</el-button>
            <el-button class="btn-trans" @click="deleteCurrentRoom">删除</el-button>
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
          <el-button class="btn-trans tabBtn" v-if="activeOwnerTab=='owner'">业主管理</el-button>
          <el-button class="btn-trans tabBtn" v-else-if="activeOwnerTab=='currentMember'">成员管理</el-button>
          <el-tabs v-model="activeOwnerTab" @tab-click="changeOwnerTab">
            <el-tab-pane label="业主" name="owner">
              <el-table :data="ownerTable" stripe style="width: 100%">
                <el-table-column prop="ownerName" label="业主姓名"></el-table-column>
                <el-table-column prop="concatPhone" label="联系电话"></el-table-column>
                <el-table-column prop="MovingInDate" label="迁入日期"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="当前居住成员" name="currentMember">
              <el-table :data="currentMemberTable" stripe style="width: 100%">
                <el-table-column prop="memberName" label="成员姓名" width="150"></el-table-column>
                <el-table-column prop="owner" label="业主" width="150"></el-table-column>
                <el-table-column prop="relation" label="与业主关系" width="150"></el-table-column>
                <el-table-column prop="concatPhone" width="150" label="联系电话"></el-table-column>
                <el-table-column prop="limitDate" label="居住期限" width="240"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="contract">
          <el-table :data="contractTable" stripe style="width: 100%">
            <el-table-column prop="contractNum" label="合同编号"></el-table-column>
            <el-table-column prop="tenantName" label="租户姓名"></el-table-column>
            <el-table-column prop="contractStartDate" label="合同起始日期"></el-table-column>
            <el-table-column prop="contractEndDate" label="合同结束日期"></el-table-column>
            <el-table-column prop="status" label="合同状态"></el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-drawer>
    <el-dialog title="新增登记" :visible.sync="isShowrRegistation" width="85%">
      <el-form
        :model="registrationForm"
        :rules="registrationRules"
        ref="registrationForm"
        label-width="auto"
        class="registrationForm"
      >
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="管理区" prop="managerAria">
              <el-select v-model="registrationForm.managerAria" placeholder="请选择管理区">
                <el-option
                  v-for="item in managerAriaList.slice(1)"
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
            <el-form-item label="客户" prop="customerName">
              <el-input v-model="registrationForm.customerName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="交房日期" class="handoverDate" prop="handoverDate">
              <el-date-picker
                v-model="registrationForm.handoverDate"
                type="date"
                placeholder="选择交房日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelNewRegistration('registrationForm')" class="btn-trans">取 消</el-button>
        <el-button
          type="primary"
          @click="submitNewRegistration('registrationForm')"
          class="btn-addmore"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑房间" :visible.sync="isShowRoomEditDialog" width="85%">
      <el-form ref="editRoomForm" :model="editRoomForm" :rules="eDitRoomRules" label-width="auto">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- isShowRoomEditDialog = false -->
        <el-button @click="cancelRoomEdit('editRoomForm')" class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore" @click="submitEditRoomForm('editRoomForm')">确 定</el-button>
      </div>
    </el-dialog>
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
            <el-form-item label="管理区：" prop="managerAria">
              <el-select
                v-model="customerDetailForm.managerAria"
                placeholder="请选择管理区"
                @change="customerChooseAria"
              >
                <el-option
                  v-for="item in managerAriaList.slice(1)"
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
            <el-form-item label="意向楼宇：" prop="floorHouse">
              <el-input v-model="customerDetailForm.floorHouse" placeholder="请输意向楼宇名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="交房日期：" prop="handoverDate">
              <el-date-picker
                v-model="customerDetailForm.handoverDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
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
    <el-dialog title="更改交房日期" :visible.sync="isShowChangeDateDialog" width="40%">
      <el-form
        ref="changeDateForm"
        :model="changeDateForm"
        :rules="changeDateFormRules"
        label-width="auto"
      >
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-form-item label="交房日期：" prop="handoverDate">
              <el-date-picker
                v-model="changeDateForm.handoverDate"
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
  </div>
</template>

<script>
import HandOver from '@/http/ownerService/handover'
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ5",
          buildUpArea: "892.6",
          customerName: "张三",
          handoverDate: "2020-06-26"
        },
        {
          id: "2",
          managerAria: "时代佳苑（住宅）",
          houseName: "B区10号楼",
          roomCode: "FR-MD7",
          buildUpArea: "700.6",
          customerName: "李四",
          handoverDate: "2020-8-12"
        },
        {
          id: "3",
          managerAria: "绿岛物业",
          houseName: "C区1号楼",
          roomCode: "QA-TY7",
          buildUpArea: "700.6",
          customerName: "王五",
          handoverDate: "2020-8-4"
        },
        {
          id: "4",
          managerAria: "筑业物业",
          houseName: "D区21号楼",
          roomCode: "KS-TE7",
          buildUpArea: "500.6",
          customerName: "刘六",
          handoverDate: "2020-5-24"
        },
        {
          id: "5",
          managerAria: "绿岛物业",
          houseName: "H区21号楼",
          roomCode: "UA-SY7",
          buildUpArea: "300.6",
          customerName: "曾七",
          handoverDate: "2020-9-24"
        }
      ],
      ownerTable: [
        {
          ownerName: "王志远（费用承担人）",
          concatPhone: "15797706475",
          MovingInDate: "2020/5/25",
          status: "当前"
        }
      ],
      currentMemberTable: [
        {
          memberName: "王志远",
          owner: "王志远",
          relation: "租户",
          concatPhone: "",
          limitDate: "2020/01/11-2020/10/01"
        }
      ],
      contractTable: [],
      arrayIndex: [], //多选按钮选中后index数组
      //编辑房间的表单数据
      editRoomForm: {
        higherAuthorities: "",
        floor: 2,
        roomNum: 4,
        roomCode: "",
        roomType: "商用"
      },
      eDitRoomRules: {
        higherAuthorities: [
          { required: true, message: "请选择上级机构", trigger: "blur" }
        ],
        floor: [{ required: true, message: "请输入楼层", trigger: "blur" }],
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
        ]
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
      currentIndex: 0,
      changeDateIndex: 0,
      isShowChangeDateDialog: false, //更改交房日期弹窗
      //登记导向的表单数据
      registrationForm: {
        managerAria: "",
        houseName: "",
        roomCode: "",
        buildUpArea: "",
        customerName: "",
        handoverDate: ""
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
        handoverDate: [
          { required: true, message: "请选择交房日期", trigger: "blur" }
        ]
      },
      customerDetailForm: {
        customerName: "",
        identifyNum: 223123123123123,
        telPhone: 15797706475,
        managerAria: "",
        floorHouse: "",
        handoverDate: ""
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
        managerAria: [
          { required: true, message: "请选择管理区", trigger: "blur" }
        ],
        floorHouse: [
          { required: true, message: "请输入楼宇名称", trigger: "blur" }
        ],
        handoverDate: [
          { required: true, message: "请选择交房时间", trigger: "blur" }
        ]
      },
      total: 0,
      page: 1,
      pageSize: 10,
      inputSearch: "", //搜索框内容
      listLoading: false,
      multipleSelection: [],
      selectionLengh: 0,
      isDisabledChangeDate: true,
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
      //搜索详情表单数据
      searchDetailForm: {
        selectedAria: "",
        selectedFloor: "",
        roomCodeSearch: "", //搜索框的房间代码
        customerNameSearch: "" //搜索框的客户名称
      },
      isCanDelete: true, //删除按钮默认不可点击
      isFloorDisabled: true, //楼宇下拉框默认不可选
      floorHouseList: [],
      isShowRoomCodeDialog: false, //是否展示抽屉弹窗（房间代码）
      isShowRoomEditDialog: false, //是否展示编辑房间的弹窗
      isShowrRegistation: false, //是否展示登记导向
      isShowCustomerDetail: false, //是否展示客户详情
      direction: "rtl",
      currentRow: "", //点击的当前行
      activeOwnerTab: "owner",
      changeDateForm: {
        handoverDate: ""
      },
      changeDateFormRules: {
        handoverDate: [
          { required: true, message: "请选择交房日期", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // this.loadingData()
  },
  methods: {
    //获取data数据
    // loadingData() {
    //   HandOver.getHandOverTable().then(res => {
    //     if(res.status == 200) {
    //       this.tableData = res.data
    //     }
    //   })
    // },
    handleSelectionChange(val) {
      this.arrayIndex = [];
      this.multipleSelection = val;
      val.forEach(value => {
        this.tableData.forEach((v, i) => {
          if (value.roomCode == v.roomCode) {
            this.arrayIndex.push(i);
          }
        });
      });
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
    //更改交房日期
    changeHandOverDate() {
      this.changeDateForm.handoverDate = "";
      let index = this.arrayIndex.length - 1;
      this.changeDateIndex = this.arrayIndex[index];
      this.isShowChangeDateDialog = true;
    },
    //删除按钮
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
              this.tableData.splice(i,1)
              // HandOver.delHandOver(element.id,1).then(res => {
              //   if(res.status == 200) {
              //     this.loadingData()
              //   }
              // })
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
    showAddRegistration() {
      this.isShowrRegistation = true;
      for (let key in this.registrationForm) {
        this.registrationForm[key] = "";
      }
    },
    cancelNewRegistration(formName) {
      this.isShowrRegistation = false;
      this.$refs[formName].resetFields();
    },
    // 展示详细的搜索盒子
    showDetailSearch() {
      this.isShowDetail = !this.isShowDetail;
    },
    cancelRoomEdit(formName) {
      this.isShowRoomEditDialog = false;
      this.$refs[formName].resetFields();
    },
    //点击客户详情弹窗取消按钮
    cancelCustomerForm(formName) {
      this.isShowCustomerDetail = false;
      this.$refs[formName].resetFields();
    },
    cancelChangeDate(formName) {
      this.isShowChangeDateDialog = false;
      this.$refs[formName].resetFields();
    },
    submitChangeDate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData[this.changeDateIndex].handoverDate = this.changeDateForm.handoverDate;
          // HandOver.changeHDate(this.multipleSelection[0].id, this.changeDateForm.handoverDate).then(res => {
          //   if(res.status == 200) {
          //     this.loadingData()
          //   }
          // })
        } else {
          return false;
        }
      })
      this.isShowChangeDateDialog = false;
    },
    submitNewRegistration(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.registrationForm.id = (this.tableData.length + 1).toString()
          // HandOver.addHandOver(this.registrationForm)
          // this.loadingData()
          this.tableData.push(this.registrationForm)
          this.isShowrRegistation = false;
        } else {
          return false;
        }
      });
    },
    submitCustomerForm(formName) {
      this.isShowCustomerDetail = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改成功操作
          this.tableData[
            this.currentIndex
          ].managerAria = this.customerDetailForm.managerAria;
          this.tableData[
            this.currentIndex
          ].houseName = this.customerDetailForm.floorHouse;
          this.tableData[
            this.currentIndex
          ].customerName = this.customerDetailForm.customerName;
          this.tableData[
            this.currentIndex
          ].handoverDate = this.customerDetailForm.handoverDate;
        } else {
          return false;
        }
      });
    },
    reSetting() {
      for (let key in this.searchDetailForm) {
        this.searchDetailForm[key] = "";
      }
    },
    //客户详情弹窗选择管理区
    customerChooseAria(item) {
      console.log(item,'管理区')
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
      }
    },
    emptyFloorSelect() {
      this.floorHouseList = [];
      this.selectedFloor = "请选择楼宇";
    },
    // 展示编辑房间信息弹窗
    showEditRoom() {
      this.isShowRoomEditDialog = true;
      this.isShowRoomCodeDialog = false;
      this.editRoomForm.roomCode = this.currentRow.roomCode;
    },
    //提交编辑房间的表单
    submitEditRoomForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isShowRoomEditDialog = false;
          //修改成功操作
        } else {
          return false;
        }
      });
    },
    // 展示抽屉弹窗
    showRoomCodeDialog(row, index) {
      this.isShowRoomCodeDialog = true;
      this.currentRow = row;
      this.currentRow.index = index;
    },
    //展示编辑客户信息弹窗
    showCustomerDetail(row, index) {
      this.customerDetailForm.customerName = row.customerName;
      this.customerDetailForm.managerAria = row.managerAria;
      this.customerDetailForm.floorHouse = row.houseName;
      this.customerDetailForm.handoverDate = row.handoverDate;
      this.currentIndex = index;
      this.isShowCustomerDetail = true;
    },
    //删除当前房间
    deleteCurrentRoom() {
      this.$confirm(`确定要删除房间${this.currentRow.roomCode}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
        this.tableData.splice(this.currentRow.index, 1);
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
      })
    },
    //切换业主Tab
    changeOwnerTab(tab, event) {
    }
  },
  watch: {
    selectionLengh: function(newLen) {
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
@font-color: #fff;
.searchFloorHouse {
  .el-input__inner {
    height: 34px !important;
  }
}
</style>