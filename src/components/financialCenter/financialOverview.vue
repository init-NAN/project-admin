<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>应收总账</span>
    </div>
    <section class="grid-content">
      <div class="btnHeader">
        <el-form ref="searchForm" :model="searchForm" :rules="searchFormRules" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="房间编号:" prop="roomCode">
                <el-input v-model="searchForm.roomCode" placeholder="请输入房间编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账单月份:" prop="billMonth">
                <el-date-picker
                  v-model="searchForm.billMonth"
                  type="month"
                  placeholder="请选择账单月份">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="选择收费项:" prop="charges">
                <el-select v-model="searchForm.charges" placeholder="请选择收费项">
                  <el-option
                    v-for="item in chargesList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="选择客户:" prop="customer">
                <el-select v-model="searchForm.customer" placeholder="请选择客户">
                  <el-option
                    v-for="item in customerList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-button  type="primary" class="btn-addmore el-icon-search btn-addmore">查询</el-button>
              <el-button  type="primary" class="btn-addmore el-icon-refresh-left" @click="reSeting('searchForm')">重置</el-button>
              <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="overView">
        <div class="content-card">
          <p class="content-title">应收总计（元）</p>
          <p class="content-num">100000</p>
        </div>
        <div class="verticalLine"></div>
        <div class="content-card">
          <p class="content-title">已收总计（元）</p>
          <p class="content-num">90000</p>
        </div>
        <div class="verticalLine"></div>
        <div class="content-card">
          <p class="content-title">未收总计（元）</p>
          <p class="content-num">10000</p>
        </div>
      </div>
    </section>
    <el-table
        :data="totalCharTable"
        v-loading="listLoading"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column prop="roomCode" label="房间编号" width="140"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="140"></el-table-column>
        <el-table-column prop="chargeItem" label="收费项" width="140"></el-table-column>
        <el-table-column prop="billMonth" label="账单月份" width="140"></el-table-column>
        <el-table-column prop="shouldReceive" label="应收(元)" width="140"></el-table-column>
        <el-table-column prop="havenReceive" label="已收(元)" width="140"></el-table-column>
        <el-table-column prop="notReceive" label="未收(元)" width="140"></el-table-column>
        <el-table-column prop="adjustMoney" label="调整金额(元)" width="140"></el-table-column>
        <el-table-column prop="LatePayment" label="滞纳金(元)" width="140"></el-table-column>
        <el-table-column prop="state" label="缴纳状态" width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.state == '0'">未缴清</span>
            <span v-if="scope.row.state == '1'">已缴清</span>
          </template>
        </el-table-column>
        <el-table-column prop="buildDate" label="生成日期" width="140"></el-table-column>
        <el-table-column prop="commentContent" label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" class="table-show" @click="editCurrentRow(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" class="table-del" @click="deleteCurrentRow(scope.$index,scope.row)">删除</el-button>
            <el-button type="text" class="table-show">结算</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-col class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
    <el-dialog title="编辑账单" :visible.sync="showEditDia" width="85%">
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="房间代码" prop="roomCode">
                <el-input placeholder="请输入房间代码" v-model="editForm.roomCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="客户名称" prop="roomCode">
                <el-input placeholder="请输入客户名称" v-model="editForm.customerName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="收费项" prop="chargeItem">
                <el-select v-model="editForm.chargeItem" placeholder="请选择收费项">
                  <el-option
                    v-for="item in chargesList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="账单月份" prop="billMonth">
                <el-date-picker
                  v-model="editForm.billMonth"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="请选择账单月份">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="应收款" prop="shouldReceive">
                <el-input type="text" placeholder="请输入应收款" v-model.number="editForm.shouldReceive"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="已收款" prop="havenReceive">
                <el-input type="text" placeholder="请输入已收款" v-model.number="editForm.havenReceive"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="调整金" prop="adjustMoney">
                <el-input type="text" placeholder="请输入调整金" v-model="editForm.adjustMoney"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="滞纳金" prop="LatePayment">
                <el-input type="text" placeholder="请输入滞纳金" v-model="editForm.LatePayment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="账单生成日期" prop="buildDate">
                <el-date-picker
                  v-model="editForm.buildDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="缴纳状态" prop="state">
                <el-radio v-model="editForm.state" label="0">未缴清</el-radio>
                <el-radio v-model="editForm.state" label="1">已缴清</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit('editForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitEdit('editForm')">确 定</el-button>
        </div>
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
      searchForm:{},
      searchFormRules:{},
      editIndex:0,
      chargesList:[
        {value:'ZJ', label:'租金'},
        {value:'GLF', label:'管理费'},
        {value:'DF', label:'电费'},
        {value:'SF', label:'水费'},
        {value:'PDF', label:'公摊电费'},
        {value:'PSF', label:'公摊水费'},
        {value:'JDF', label:'尖电费'},
        {value:'FDF', label:'峰电费'},
        {value:'PIdf', label:'平电费'},
        {value:'GDF', label:'谷电费'}
      ],
      customerList:[
        {value:'1', label:'王多多'},
        {value:'2', label:'夏洛'},
        {value:'3', label:'马冬梅'},
      ],
      showEditDia:false,
      listLoading:false,
      totalCharTable:[
        {
          roomCode:'R1',
          customerName:'袁华',
          chargeItem:'水费',
          billMonth:'2020-6',
          shouldReceive:1000,
          havenReceive:800,
          notReceive:200,
          adjustMoney:100,
          LatePayment:1000,
          state:'0',
          buildDate:'2020-6-11'
        },
        {
          roomCode:'R2',
          customerName:'马冬梅',
          chargeItem:'电费',
          billMonth:'2020-5',
          shouldReceive:10000,
          havenReceive:8000,
          notReceive:2000,
          adjustMoney:1000,
          LatePayment:1000,
          state:'1',
          buildDate:'2020-6-1'
        }
      ],
      editForm:{},
      editFormRules:{
        roomCode:[{ required: true, message: "请输入房间号", trigger: "blur" }],
        customerName:[{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        chargeItem:[{ required: true, message: "请选择收费项", trigger: "blur" }],
        billMonth:[{ required: true, message: "请选择账单月份", trigger: "blur" }],
        shouldReceive:[
          { required: true, message: "请输入应收款", trigger: "blur" },
          { type:'number', message: "应收款必须为数值"}
        ],
        havenReceive:[
          { required: true, message: "请输入已收款", trigger: "blur" },
          { type:'number', message: "已收款必须为数值"}
        ],
        notReceive:[{ required: true, message: "请输入未收款", trigger: "blur" }],
        adjustMoney:[{ required: true, message: "请输入调整金", trigger: "blur" }],
        LatePayment:[{ required: true, message: "请输入滞纳金", trigger: "blur" }],
        state:[{ required: true, message: "请选择缴费状态", trigger: "blur" }],
        buildDate:[{ required: true, message: "请选择账单生成日期", trigger: "blur" }]
      }
    }
  },
  methods:{
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
    },
    reSeting(formName) {
      this.$refs[formName].resetFields();
    },
    deleteCurrentRow(index, row) {
      this.$confirm(`确定要删除房间代码为${row.roomCode}的记录吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.totalCharTable.splice(index, 1);
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
    editCurrentRow(index, row) {
      this.showEditDia = true
      this.editForm = {...this.totalCharTable[index]}
      this.editIndex = index
    },
    cancelEdit(formName) {
      this.showEditDia = false
    },
    showReceiveTotal() {
      
    },
    submitEdit(formName) {
      this.editForm['notReceive'] = this.editForm.shouldReceive - this.editForm.havenReceive
      this.totalCharTable[this.editIndex] = this.editForm
      this.showEditDia = false
    }
  }
}
</script>

<style lang="less">
.main-content {
  .grid-content {
    .overView {
      display: flex;
      margin-top: 15px;
      margin-bottom: 15px;
      .verticalLine {
          width: 1px;
          height: 66px;
          background: linear-gradient(
            to top,
            #3669da 0%,
            #e360ff 6%,
            #57c8ff 100%
          );
      }
      .content-card {
        flex: 1;
        text-align: center;
        .content-title {
          color: #9ea2c0;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 40px;
        }
        .content-num {
          color: #0ffff3;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
      }
    }
    
  }
}
</style>