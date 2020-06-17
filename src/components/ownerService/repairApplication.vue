<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>报修管理</span>
    </div>
    <section class="grid-content">
      <div class="state">
        <ul class="ul-list">
          <span class="stateTxt">状态:</span>
          <li :class="activeClass == index ? 'active':''"
              v-for="(itme,index) in typeList"
              :key="index"
              @click="getItem(index)">
            {{itme}}
          </li>
        </ul>
      </div>

      <el-form ref="searchForm" :model="searchForm" :rules="searchFormRules" label-width="auto" class="searchArea">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="报修单号:" prop="repaireNum">
              <el-input v-model="searchForm.repaireNum" placeholder="请输入报修单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修人:" prop="repairePhone">
              <el-input v-model="searchForm.repairePhone" placeholder="请输入报修人/电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="工单大类:" prop="bigCategory">
              <el-select v-model="searchForm.bigCategory" clearable placeholder="所选工单大类">
                <el-option
                  v-for="item in bigCategoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" v-if="!isShowMore" :offset="1">
            <el-button  type="primary" class="btn-addmore">查询</el-button>
            <el-button  type="primary" class="btn-addmore" @click="reSeting('searchForm')">重置</el-button>
            <el-button class="more" type="text" @click="isShowMore = true">更多<i class="el-icon-arrow-down"></i></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="isShowMore">
          <el-col :span="5">
            <el-form-item label="维修人:" prop="repairer">
              <el-input v-model="searchForm.repairer" placeholder="请输入维修人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修来源:" prop="orderOrigin">
              <el-select v-model="searchForm.orderOrigin" clearable placeholder="请选择报修来源">
                <el-option
                  v-for="item in orderOrigins"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="管理区:" prop="managerArea">
              <el-select v-model="searchForm.managerArea" clearable placeholder="请选择管理区">
                <el-option
                  v-for="item in managerAreaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" v-if="isShowMore" :offset="1">
            <el-button type="primary" class="btn-addmore">查询</el-button>
            <el-button type="primary" class="btn-addmore" @click="reSeting('searchForm')">重置</el-button>
            <el-button class="more" type="text" @click="isShowMore = false">更多<i class="el-icon-arrow-up"></i></el-button>
          </el-col>
        </el-row>
      </el-form>
      
      <div class="newExport">
        <el-button type="primary" class="el-icon-plus btn-addmore" @click="newEidtRepaire('new')">   新建报修</el-button>
        <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL</el-button>
      </div>
      
      <el-table
        :data="tableData"
        v-loading="listLoading"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column prop="orderNum" label="报修单号" width="140"></el-table-column>
        <el-table-column prop="state" label="状态" width="140"></el-table-column>
        <el-table-column prop="orderPerson" label="报修人" width="140"></el-table-column>
        <el-table-column prop="concactPhone" label="联系电话" width="140"></el-table-column>
        <el-table-column prop="orderStartDate" label="报修时间" width="140"></el-table-column>
        <el-table-column prop="assignor" label="分配人" width="140"></el-table-column>
        <el-table-column prop="repairer" label="维修人" width="140"></el-table-column>
        <el-table-column prop="repaireLimitTime" label="工单限时" width="140"></el-table-column>
        <el-table-column prop="bigCategory" label="工单大类" width="140"></el-table-column>
        <el-table-column prop="smallCategory" label="工单小类" width="140"></el-table-column>
        <el-table-column prop="orderOrigin" label="报修来源" width="140"></el-table-column>
        <el-table-column prop="repaireContent" label="要求处理事项" width="140"></el-table-column>
        <el-table-column prop="resultNote" label="回单说明情况" width="140"></el-table-column>
        <el-table-column prop="managerArea" label="管理区" width="140"></el-table-column>
        <el-table-column prop="floorHouse" label="楼栋" width="140"></el-table-column>
        <el-table-column prop="reVistor" label="回访人员" width="140"></el-table-column>
        <el-table-column prop="reVistorDate" label="回访时间" width="140"></el-table-column>
        <el-table-column prop="comment" label="评价等级" width="140"></el-table-column>
        <el-table-column prop="commentContent" label="评价" width="140"></el-table-column>
        <el-table-column prop="commentContent" label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" class="table-show" @click="newEidtRepaire('edit',scope.row,scope.$index)">编辑</el-button>
            <el-button type="text" class="table-del" @click="deleteCurrentRow(scope.$index,scope.row)">删除</el-button>
            <el-button type="text" class="table-show" @click="distribute(scope.$index,scope.row)">派工</el-button>&nbsp;&nbsp;
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="dialogTitle" :visible.sync="isShowNewEidDia" width="85%">
        <el-form ref="newEditForm" :model="newEditForm" :rules="newEditFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="管理区：" prop="managerArea">
                <el-select
                v-model="newEditForm.managerArea"
                @change="changeAria"
                placeholder="请选择管理区">
                  <el-option
                    v-for="item in managerAreaList.slice(1)"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}"
                  ></el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="楼宇名称：" prop="floorHouse"> 
                <el-input v-model="newEditForm.floorHouse" placeholder="请输入楼宇名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="报修详情：" prop="repaireContent"> 
                <el-input type="textarea" v-model="newEditForm.repaireContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="报修人：" prop="orderPerson"> 
                <el-input v-model="newEditForm.orderPerson" placeholder="请输入报修人名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话：" prop="concactPhone"> 
                <el-input v-model="newEditForm.concactPhone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="预约时间：" prop="orderDate">
                <el-date-picker
                  v-model="newEditForm.orderDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="报修来源：" prop="orderOrigin"> 
                <el-select
                  v-model="newEditForm.orderOrigin"
                  @change="changeOrigin"
                  placeholder="请选择报修来源">
                  <el-option
                    v-for="item in orderOriginList"
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
              <el-form-item label="工单大类：" prop="bigCategory">
                <el-select
                  v-model="newEditForm.bigCategory"
                  @change="changeBigCategory"
                  placeholder="请选择工单大类">
                  <el-option
                    v-for="item in bigCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="工单小类：" prop="smallCategory">
                <el-select
                  v-model="newEditForm.smallCategory"
                  @change="changeSmallCategory"
                  placeholder="请选择工单小类">
                  <el-option
                    v-for="item in smallCategoryList"
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
              <el-form-item label="录入人：" prop="writer">
                <el-input v-model="newEditForm.writer" placeholder="请输入录入人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer"> 
          <el-button @click="cancelNewEdit('newEditForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitNewEditForm('newEditForm')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="分派工单" :visible.sync="isShowAssign" width="40%">
        <el-form ref="ditributeForm" :model="ditributeForm" :rules="ditributeFormRules" label-width="auto">
          <el-row type="flex" justify="space-between">
            <el-col :span="16">
              <el-form-item label="维修人：" prop="repairer">
                <el-select
                v-model="ditributeForm.repairer"
                @change="chooseRepairer"
                placeholder="请选择分派的维修人">
                  <el-option
                    v-for="item in repairerList"
                    :key="item.value"
                    :label="item.label"
                    :value="{value:item.value,label:item.label}"
                  ></el-option>
               </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer"> 
          <el-button @click="cancelDitribute('ditributeForm')" class="btn-trans">取 消</el-button>
          <el-button class="btn-addmore" @click="submitDitribute('ditributeForm')">确 定</el-button>
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
          orderNum: "bxa110",
          state: "待分配",
          orderPerson: "甲",
          concactPhone: "15797706475",
          orderStartDate: "2020-05-25 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          orderOrigin:'微信端',
          repaireContent:'窗户坏了',
          resultNote:'搞定',
          managerArea:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020-3-21 15:30',
          comment:'好评',
          commentContent:'服务好'
        },
        {
          orderNum: "bxa111",
          state: "待分配",
          orderPerson: "乙",
          concactPhone: "15797706475",
          orderStartDate: "2020-05-26 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          orderOrigin:'系统内',
          repaireContent:'窗户坏了',
          resultNote:'搞定',
          managerArea:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020-3-21 15:30',
          comment:'好评',
          commentContent:'服务好'
        },
        {
          orderNum: "bxa112",
          state: "待分配",
          orderPerson: "丙",
          concactPhone: "15797706475",
          orderStartDate: "2020-05-27 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          orderOrigin:'微博端',
          repaireContent:'窗户坏了',
          resultNote:'搞定',
          managerArea:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020-3-21 15:30',
          comment:'好评',
          commentContent:'服务好'
        }
      ],
      managerAreaList: [
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
      repaireLocationList:[
        {
          value:'0',
          label:'地点一'
        },
        {
          value:'1',
          label:'地点二'
        },
        {
          value:'2',
          label:'地点三'
        }
      ],
      orderOriginList:[
        {
          value:'WX',
          label:'微信端'
        },
        {
          value:'WB',
          label:'微博'
        },
        {
          value:'APP',
          label:'APP端'
        }
      ],
      bigCategoryList:[
        {
          value:'repaire1',
          label:'报修业务1'
        },
        {
          value:'repaire2',
          label:'报修业务2'
        },
        {
          value:'repaire3',
          label:'报修业务3'
        }
      ],
      smallCategoryList:[
        {
          value:'sepaire1',
          label:'小类业务1'
        },
        {
          value:'sepaire2',
          label:'小类业务2'
        },
        {
          value:'sepaire3',
          label:'小类业务3'
        }
      ],
      total: 0,
      page: 1,				
      pageSize: 10,
      isShowMore:false,
      searchForm:{},//搜索表单
      searchFormRules:{},
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      repaireNum:'',//报修单号
      repairePhone:'',//报修人电话
      isShowNewEidDia:false,
      isShowAssign:false,
      currentDiaType:'',
      currentIndexEdit:0,
      currentIndexAssign:0,
      dialogTitle:'',
      newEditForm:{},
      ditributeForm:{},
      ditributeFormRules:{repairer:[{ required: true, message: "请选择分派人员", trigger: "blur" }]},
      repairerList:[{value:'1',label:'小王'},{value:'2',label:'小李'},{value:'3',label:'小刘'}],
      newEditFormRules:{
        managerArea:[{ required: true, message: "请选择管理区", trigger: "blur" }],
        floorHouse:[{ required: true, message: "请输入楼宇", trigger: "blur" }],
        repaireContent:[{ required: true, message: "请选填写报修内容", trigger: "blur" }],
        orderPerson:[{ required: true, message: "请选输入报修人", trigger: "blur" }],
        concactPhone:[{ required: true, message: "请选输入报修人电话", trigger: "blur" }],
        orderDate:[{required: true, message: "请选输入预约时间", trigger: "blur"}],
        orderOrigin:[{required: true, message: "请选选择报修来源", trigger: "blur"}],
        bigCategory:[{required: true, message: "请选选择工单大类", trigger: "blur"}],
        smallCategory:[{required: true, message: "请选选择工单小类", trigger: "blur"}],
        writer:[{required: true, message: "请选输入录入人", trigger: "blur"}],
        repairer:[{required: true, message: "请选择维修人", trigger: "blur"}],
      },
      bigCategoryOptions: [{
          value: '1',
          label: '报修业务'
        }, {
          value: '2',
          label: '家政服务'
        }, {
          value: '3',
          label: '清洁服务'
        }, {
          value: '4',
          label: '故障处理'
        }, {
          value: '5',
          label: '维护'
        }],
      orderOrigins:[{value:'1',label:'微信端'},{value:'2',label:'微博端'},{value:'3',label:'系统端'}],
      listLoading: false,
      typeList:['全部','待分配','已分配','处理中','已处理','已确认已完成','已确认未完成','已关闭','已撤销','已作废']
    };
  },
  mounted() {

  },
  methods: {
    getItem(index) {
      this.activeClass = index
    },
    handleSizeChange(size) {
			this.pageSize = size				
			this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val				
      this.getDeviceList()
    },
    reSeting(formName) {
      this.$refs[formName].resetFields();
    },
    //新建编辑弹窗
    newEidtRepaire(type, row, index) {
      this.isShowNewEidDia = true
      console.log(type,'type')
      if(type == 'new') {
        this.dialogTitle = '新建报修'
        this.currentDiaType = 'new'
        for (let key in this.newEditForm) {
          this.newEditForm[key] = "";
        }
      } else if(type == 'edit') {
        this.dialogTitle = '编辑报修'
        this.currentDiaType = 'edit'
        this.currentIndexEdit = index
        this.newEditForm = row
      }
    },
    changeLocation(item) {
      console.log(item,'item')
    },
    changeOrigin(item) {
      const {value, label} = item
      this.newEditForm.orderOrigin = label
    },
    changeBigCategory(item) {
      const {value, label} = item
      this.newEditForm.bigCategory = label
    },
    changeSmallCategory(item) {
      const {value, label} = item
      this.newEditForm.smallCategory = label
    },
    cancelNewEdit(formName) {
      this.isShowNewEidDia = false
      this.$refs[formName].resetFields();
    },
    cancelDitribute(formName) {
      this.isShowAssign = false
      this.$refs[formName].resetFields();
    },
    submitNewEditForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.newEditForm,'newEditForm')
            if(this.currentDiaType == 'new') {
              //新建
              console.log('新建啦')
              this.tableData.push({...this.newEditForm})
            } else if(this.currentDiaType == 'edit') {
              this.tableData[this.currentIndexEdit] = this.newEditForm
              console.log(this.tableData[this.currentIndexEdit],'table')
            }
            this.isShowNewEidDia = false
            // this.$refs[formName].resetFields();
          } else {
            return false;
          }
      });
    },
    submitDitribute(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData[this.currentIndexAssign].repairer = this.ditributeForm.repairer
            this.$refs[formName].resetFields();
            this.isShowAssign = false
          } else {
            return false;
          }
        });
    },
    deleteCurrentRow(index, row) {
      this.$confirm(`确定要删除订单${row.orderNum}吗?`, "提示", {
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
    chooseRepairer(item) {
      const {value, label} = item
      this.ditributeForm.repairer = label
    },
    distribute(index, row) {
      this.isShowAssign = true
      this.currentIndexAssign = index
    },
    changeAria(item) {
      const {value, label} = item
      this.newEditForm.managerArea = label
    }
  }
}
</script>

<style lang="less" scope>
@font-color:#ffffff;
.main-content {
  .grid-content {
    .state {
      .stateTxt {
        color: @font-color;
        line-height: 32px;
        margin-right: 5px;
      }
    }
    .searchArea {
      margin-bottom: 10px;
      .more {
        background: transparent !important;
        border-color: transparent;
      }
    }
    .newExport {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
    }
    .el-table {
      .moreOperation {
        color:#fff;
      }
    }
  }

}
</style>