<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>租赁详情</span>
    </div>
    <section class="grid-content">
      <div class="state">
        <ul class="ul-list">
          <span class="stateTxt">房间类型:</span>
          <li :class="activeClassRoom == index ? 'active':''"
              v-for="(itme,index) in roomTypeList"
              :key="index"
              @click="getItemRoom(index)">
            {{itme}}
          </li>
        </ul>
        <ul class="ul-list">
          <span class="stateTxt">缴费情况:</span>
          <li :class="activeClassPay == index ? 'active':''"
              v-for="(itme,index) in payTypeList"
              :key="index"
              @click="getItemPay(index)">
            {{itme}}
          </li>
        </ul>
      </div>
      <div class="operation">
        <el-row class="buttonHead">
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="left">
              <el-button  type="primary" class="el-icon-plus btn-addmore" @click="newData()">   新建</el-button>
              <el-button  type="primary" class="el-icon-edit btn-addmore" :disabled="isCanEdit" @click="editCurrentRow()">编辑</el-button>
              <el-button  class="el-icon-delete btn-addmore" :disabled="isCanDelete" @click="deleteSelections">删除</el-button>
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
            <div class="right">
              <el-input v-model="searchContent"  placeholder="搜索..." class="searchInput"></el-input>
              <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <el-table
      :data="rentTable"
      v-loading="listLoading"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="managerArea" label="管理区"></el-table-column>
      <el-table-column prop="houseName" label="楼宇名称"></el-table-column>
      <el-table-column prop="roomCode" label="房间代码"></el-table-column>
      <el-table-column prop="roomType" label="房间类型"></el-table-column>
      <el-table-column prop="isPay" label="缴费情况">
        <template slot-scope="scope">
          <span v-if="scope.row.isPay == '1'">正常缴费</span>
          <span v-if="scope.row.isPay == '0'">房间欠费</span>
        </template>
      </el-table-column>
      <el-table-column prop="buildUpArea" label="房间面积(m²)"></el-table-column>
    </el-table>
    <el-dialog :title="formTitle" :visible.sync="isShowNewEdit" width="85%">
        <el-form ref="newEditForm" :model="newEditForm" :rules="newEditFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerArea">
                <el-select
                  v-model="newEditForm.managerArea"
                  @change="newEditChangeArea"
                  placeholder="请选择管理区">
                  <el-option
                    v-for="item in managerAreaList"
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
              <el-form-item label="房间类型：" prop="roomType">
                <el-select
                  v-model="newEditForm.roomType"
                  @change="newEditChangeType"
                  placeholder="请选择房间类型">
                  <el-option
                    v-for="item in roomTypeListS"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间面积：" prop="buildUpArea">
                <el-input v-model="newEditForm.buildUpArea" placeholder="请输入房间面积"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="缴费情况：" prop="isPay">
                <el-radio v-model="newEditForm.isPay" label="0">房间欠费</el-radio>
                <el-radio v-model="newEditForm.isPay" label="1">正常缴费</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer"> 
          <el-button @click="cancelNewEdit('newEditForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitNewEdit('newEditForm')">确 定</el-button>
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
    <div style="width:100%;height:120px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rentTable: [
        {
          managerArea:'明珠城(商业)',
          houseName:'A区18栋',
          roomCode:'FL-AS18',
          roomType:'空置',
          isPay:'0',
          buildUpArea:500
        },
        {
          managerArea:'绿岛物业',
          houseName:'B区20栋',
          roomCode:'DL-AU11',
          roomType:'已租',
          isPay:'1',
          buildUpArea:600
        },
        {
          managerArea:'筑业物业',
          houseName:'C区8栋',
          roomCode:'JK-LP2',
          roomType:'预定',
          isPay:'1',
          buildUpArea:700
        }
      ],
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,
      selectionLengh: 0,
      arrayIndex: [],
      multipleSelection: [],
      activeClassRoom: 0, // 0为默认选择第一个，-1为不选择
      activeClassPay: 0,
      searchContent:'',//搜素内容
      isCanEdit: true,
      isCanDelete: true,
      isShowNewEdit: false,
      currentDiaType:'',
      newEditForm:{},
      newEditFormRules:{
        managerArea:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        houseName:[{ required: true, message: "请输入楼宇", trigger: "blur" }],
        roomCode: [
          {
            required: true,
            max: 30,
            message: "请正确输入房间代码，最大长度为30",
            trigger: "blur"
          }
        ],
        roomType:[{required: true, min: 0, message: "请选择房间类型", trigger: "blur"}],
        buildUpArea: [{required: true, min: 0, message: "请输入建筑面积", trigger: "blur"}],
        isPay:[{required: true, min: 0, message: "请选择缴费情况", trigger: "blur"}]
      },
      managerAreaList: [
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
      roomTypeListS:[
        {
          value: "1",
          label: "空闲"
        },
        {
          value: "2",
          label: "已租"
        },
        {
          value: "3",
          label: "预定"
        },
        {
          value: "4",
          label: "已售"
        },
        {
          value:'5',
          label:'已售待租'
        },
        {
          value:'6',
          label:'已售已租'
        }
      ],
      formTitle:'',
      roomTypeList:['全部','空置','已租','预定','已售','已售待租','已售已租'],
      payTypeList:['全部','正常缴费','房间欠费']
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.selectionLengh = val.length
      this.multipleSelection = val
      this.arrayIndex = []
      val.forEach((value, index) => {
　　　　this.rentTable.forEach((v, i) => {
          if(value.roomCode == v.roomCode) {
            this.arrayIndex.push(i)
          }
        })
      })
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
    },
    getItemRoom(index) {
      this.activeClassRoom = index
    },
    getItemPay(index) {
      this.activeClassPay = index
    },
    //新建租赁详情
    newData() {
      this.isShowNewEdit = true
      this.formTitle = '新建租赁详情'
      this.currentDiaType = 'new'
      for (let key in this.newEditForm) {
        this.newEditForm[key] = "";
      }
    },
    //编辑
    editCurrentRow() {
      this.isShowNewEdit = true
      this.formTitle = '修改租赁详情'
      this.currentDiaType = 'edit'
      console.log(this.arrayIndex[0])
      this.newEditForm = this.rentTable[this.arrayIndex[0]]
    },
    //删除
    deleteSelections() {
      for (let i = 0; i < this.rentTable.length; i++) {
        const element = this.rentTable[i];
        element.id = i
      }
      this.multipleSelection.forEach(element => {
        this.rentTable.forEach((e, i) => {
          if (element.id == e.id) {
            this.rentTable.splice(i, 1)
          }
        });
      });
    },
    cancelNewEdit(formName) {
      this.isShowNewEdit = false
      this.$refs[formName].resetFields();
    },
    submitNewEdit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.currentDiaType == 'new') {
              //新建
              console.log(this.newEditForm, 'this.newEditForm')
              this.rentTable.push({...this.newEditForm})
            } 
            else if(this.currentDiaType == 'edit') {
              this.rentTable[this.arrayIndex[0]] = this.newEditForm
              console.log(this.rentTable[this.arrayIndex[0]],'table')
            }
            this.isShowNewEdit = false
          } else {
            return false;
          }
      });
    },
    newEditChangeArea(item) {
      const {value, label} = item
      this.newEditForm['managerArea'] = label
    },
    newEditChangeType(item) {
      const {value, label} = item
      this.newEditForm['roomType'] = label
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

<style>

</style>