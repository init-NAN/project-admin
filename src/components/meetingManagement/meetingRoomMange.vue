<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>会议室管理</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore" @click="addRoom">新增</el-button>
            <el-button  type="primary" class="btn-addmore" :disabled="isDisEdit" @click="editCurrent">修改</el-button>
            <el-button  type="primary" class="btn-addmore" :disabled="isDisDelete" @click="deleteSelection">删除</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="right">
            <el-input  placeholder="搜索..." class="searchInput"></el-input>
            <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
          </div>
        </el-col>
      </el-row>
    </section>
    <el-table
      :data="meetingRoomTable"
      v-loading="listLoading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="meetingRoom" label="会议室名"></el-table-column>
      <el-table-column prop="seatCount" label="座位数"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="isStart" label="是否启用"></el-table-column>
      <el-table-column prop="manager" label="管理员"></el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="managerTitle" :visible.sync="showRoomManage" width="85%">
      <el-form ref="managerForm" :model="managerForm" :rules="managerFormRules" label-width="150px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="会议室名称" prop="meetingRoom">
              <el-input v-model="managerForm.meetingRoom" placeholder="请输入会议室名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否启用">
              <el-select v-model="managerForm.isStart" @change="startChange">
                <el-option
                  v-for="item in isStartOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="会议室地址" prop="address">
              <el-input v-model="managerForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="启用时间">
              <el-date-picker
                :disabled="isDisStart"
                v-model="managerForm.startTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="座位数">
              <el-input v-model="managerForm.seat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="管理员">
              <el-select v-model="managerForm.manager">
                  <el-option
                    v-for="item in managerOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="会议室配置">
              <el-input type="textArea" v-model="managerForm.equipment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注">
              <el-input type="textArea" v-model="managerForm.remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore" @click="save('managerForm')">保 存</el-button>
        <el-button class="btn-addmore" @click="showRoomManage = false">返 回</el-button>
      </span>
    </el-dialog>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      selectionLengh:0,
      multipleSelection:[],
      arrayIndex:[],
      isDisStart:true,
      listLoading:false,
      managerTitle:'',
      showRoomManage:false,
      managerForm:{},
      managerFormRules:{
        meetingRoom:[{required: true, message: "请输入会议室名称", trigger: "blur"}],
        address:[{required: true, message: "请输入会议室地址", trigger: "blur"}]
      },
      isStartOption:[
        {
          value:1,
          label:'是'
        },
        {
          value:0,
          label:'否'
        }
      ],
      isDisEdit:true,
      isDisDelete:true,
      meetingRoomTable:[
        {
          meetingRoom:'会议室001',
          seatCount:'30',
          address:'A8四楼404',
          isStart:'否',
          manager:'张三'
        },
        {
          meetingRoom:'会议室002',
          seatCount:'40',
          address:'A8四楼401',
          isStart:'是',
          manager:'李四'
        },
        {
          meetingRoom:'会议室003',
          seatCount:'45',
          address:'A8四楼402',
          isStart:'否',
          manager:'王五'
        }
      ],
      managerOption:[
        {
          value:0,
          label:'管理员001'
        },
        {
          value:1,
          label:'管理员002'
        },
        {
          value:2,
          label:'管理员003'
        }
      ]
    }
  },
  methods:{
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
    handleSelectionChange(val) {
      this.arrayIndex = [];
      this.selectionLengh = val.length
      this.multipleSelection = val
      val.forEach(value => {
        this.meetingRoomTable.forEach((v, i) => {
          if (value.meetingRoom == v.meetingRoom) {
            this.arrayIndex.push(i);
          }
        });
      });
    },
    editCurrent() {
      this.managerTitle = '修改会议室'
      this.showRoomManage = true
      this.managerForm = this.multipleSelection[0]
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.managerTitle == '新增会议室') {
              this.meetingRoomTable.push(this.managerForm)
              this.showRoomManage = false
            } else if(this.managerTitle == '修改会议室') {
              this.meetingRoomTable[this.arrayIndex[0]] = this.managerForm
              this.showRoomManage = false
            }
          } else {
            console.log('error submit!!');
            return false;
          }
      }); 
    },
    startChange(val) {
      if(val == '是') {
        this.isDisStart = false
      } else {
        this.isDisStart = true
      }
    },
    addRoom() {
      this.managerTitle = '新增会议室'
      this.showRoomManage = true
    },
    deleteSelection() {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        for (let i = 0; i < this.meetingRoomTable.length; i++) {
          const element = this.meetingRoomTable[i];
          element.id = i;
        }
        this.multipleSelection.forEach(element => {
          this.meetingRoomTable.forEach((e, i) => {
            if (element.id == e.id) {
              this.meetingRoomTable.splice(i,1)
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
    }
  },
  watch:{
    selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isDisDelete = false
      } else {
        this.isDisDelete = true
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

<style>

</style>