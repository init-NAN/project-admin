<template>
  <div class="main-content">
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button size="small" type="primary" class="el-icon-plus btn-addmore">   接房登记</el-button>
            <el-button size="small" type="primary" class="el-icon-edit btn-addmore" :disabled="isDisabled" @click="editCurrentRow">编辑</el-button>
            <el-button size="small" type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="right">
            <el-input v-model="inputSearch" size="small" placeholder="搜索..." class="searchInput"></el-input>
            <el-button size="small" type="primary" class="el-icon-search btn-addmore"></el-button>
            <el-button size="small"  class="el-icon-arrow-down btn-addmore" id="dropdown" @click="showDetailSearch"></el-button>
          </div>
        </el-col>
      </el-row>
      <div class="searchDetail" v-if="isShowDetail">
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
              @click="showRoomCodeDialog(scope.row)"
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
        <el-table-column prop="roomState" label="房间状态"></el-table-column>
        <el-table-column prop="receiveDate" label="接房日期"></el-table-column>
      </el-table>
      <el-dialog title="编辑客户详情" :visible.sync="isShowCustomerDetail" width="85%">
        <el-form ref="customerDetailForm" :model="customerDetailForm" :rules="customerDetailFormRules" label-width="auto">
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
                  @change="customerChooseAria">
                  <el-option
                    v-for="item in managerAriaList"
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
              <el-form-item label="接房日期：" prop="receiveDate">
                <el-date-picker
                  v-model="customerDetailForm.receiveDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelCustomerForm('customerDetailForm')" class="btn-trans">取 消</el-button>
          <el-button type="primary" @click="submitCustomerForm('customerDetailForm')" class="btn-addmore">确 定</el-button>
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
                <el-select v-model="editRoomForm.selectedRoomType" placeholder="请选择房间类型" style="width:100%">
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
      <el-dialog>
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
          customerName: "王浩光",
          roomState:'已接收',
          receiveDate: "2020-04-17"
        },
        {
          managerAria: "明珠城（商业）",
          houseName: "A区6号楼",
          roomCode: "FR-QDJ6",
          buildUpArea: "892.6",
          customerName: "王浩光",
          roomState:'未接收',
          receiveDate: "2020-04-17"
        }
      ],
      total: 0,
      page: 1,				
      pageSize: 10,
      inputSearch:'',//搜索框内容
      listLoading: false,
      isShowDetail:false,
      // currentRow: null,
      isDisabled: true,
      multipleSelection: [],
      selectionLengh: 0,
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
      isShowCustomerDetail:false,
      customerDetailForm:{
        customerName:'',
        identifyNum:223123123123123,
        telPhone:15797706475,
        managerAria:'',
        floorHouse:'',
        receiveDate:''
      },
      customerDetailFormRules:{
        customerName:[{ required: true, message: "请输入客户名称", trigger: "blur" }],
        identifyNum:[{ required: true, message: "请输入身份证号码", trigger: "blur" }],
        telPhone:[{ required: true, message: "请输入电话号码", trigger: "blur" }],
        managerAria:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        floorHouse:[{ required: true, message: "请输入楼宇名称", trigger: "blur" }],
        receiveDate:[{ required: true, message: "请选择收房时间", trigger: "blur" }]
      },
      // 客户详情弹窗end

      // 房间详情弹窗 start
      isShowRoomEditDialog:false,
      editRoomForm: {
        higherAuthorities: "",
        floor: 2,
        roomNum: 4,
        roomCode: "",
        roomType: "商用"
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
        higherAuthorities: [
          { required: true, message: "请选择上级机构", trigger: "blur" },
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
      // 房间详情弹窗 end
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectionLengh = val.length;
    },
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
    //编辑当前行
    editCurrentRow() {
    },
    //点击房间代码展示房间详情弹窗
    showRoomCodeDialog(row) {
      console.log(row.roomCode,'code')
      this.isShowRoomEditDialog = true
      this.editRoomForm.roomCode = row.roomCode
      console.log(row,'row')
    },
    //点击客户详情弹窗取消按钮
    cancelCustomerForm(formName) {
      this.isShowCustomerDetail = false
      this.$refs[formName].resetFields();
    },
    cancelRoomEdit(formName) {
      this.isShowRoomEditDialog = false
      this.$refs[formName].resetFields();
    },
    //点击客户名称展示客户详情代码
    showCustomerDetail(row) {
      this.customerDetailForm.customerName = row.customerName
      this.customerDetailForm.managerAria = row.managerAria
      this.customerDetailForm.floorHouse = row.houseName
      this.customerDetailForm.receiveDate = row.receiveDate
      this.isShowCustomerDetail = true
      console.log(row,'row')
    },
    submitCustomerForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isShowCustomerDetail = false
            //修改成功操作
          } else {
            return false;
          }
        });
    },
    submitEditRoomForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isShowRoomEditDialog = false
            //修改成功操作
          } else {
            return false;
          }
      });
    },
    customerChooseAria() {
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