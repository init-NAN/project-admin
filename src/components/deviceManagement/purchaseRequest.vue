<template>
  <div class="purchase">
    <div class="current-page-title">
      <span>采购申请</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="addList btn-addmore" @click="addPurchaseList">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          class="del-btn btn-trans"
          :disabled="this.checkedBox.length == 0"
          @click="delectAll()"
        >批量删除</el-button>
      </el-col>
    </el-row>

    <section class="grid-content">
      <el-table
        :data="tableData"
        v-loading="listLoading"
        ref="table"
        @selection-change="handleSelectionChange"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="tag" label="送审状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 ? '已送审' : '未送审' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="documentNumber" label="单据号码"></el-table-column>
        <el-table-column prop="applicationDate" label="申请日期" width="150"></el-table-column>
        <el-table-column prop="applicationDepartment" label="申请部门"></el-table-column>
        <el-table-column prop="applicant" label="申请人员"></el-table-column>
        <el-table-column prop="totalAmount" label="合计金额"></el-table-column>

        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="table-show"
              @click.native.prevent="editList(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              class="table-del"
              @click="handleDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <Pagings
      :total="total"
      :page="page"
      :pageSize="pageSize"
      @handleSizeChangeSub="handleSizeChange"
      @handleCurrentChangeSub="handleCurrentChange"
    ></Pagings>

    <el-col class="hidden-card" :sm="22" :md="15" :offset="1"></el-col>

    <el-dialog
      :title="addPurchaseTitle"
      :visible.sync="isPurchase"
      :before-close="close"
      width="1200px">
      <div class="add-files">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="auto"
          label-position="right"
          class="margin-bottom"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商家信息</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="单据号码:">
                  <el-input v-model="form.documentNumber" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="申请部门:" prop="applicationDepartment">
                  <el-input
                    v-model="form.applicationDepartment"
                    autocomplete="off"
                    placeholder="请输入申请部门"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="申请日期:">
                  <el-date-picker
                    type="date"
                    placeholder="选择时间"
                    v-model="form.registrationDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="申请人员:" prop="applicant">
                  <el-input v-model="form.applicant" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合计金额:">
                  <el-input v-model="form.totalAmount" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="申请理由:">
                  <el-input type="textarea" v-model="form.reasons"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <el-card>
          <el-row>
            <el-col>
              <el-button type="text" @click="addTable()">新增</el-button>
            </el-col>
          </el-row>
          <section class="grid-content">
            <!-- :summary-method="getSummaries" -->
            <el-table
              :data="chageTableData.data"
              ref="table"
              @selection-change="cardSelectionChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index"></el-table-column>
              <el-table-column
                v-for="(item,index) in chageTableData.columns"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :key="index"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input
                      size="mini"
                      placeholder="请输入内容"
                      v-model="chageTableData.sel[item.prop]"
                    ></el-input>
                  </span>
                  <span v-else>{{scope.row[item.prop]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    class="table-change"
                    @click.stop="saveTableRow(scope.row,scope.$index)"
                  >确定</el-button>
                  <el-button
                    type="text"
                    class="table-del"
                    @click="deleteTableRow(scope.$index,chageTableData.data)"
                  >删除</el-button>
                  <el-button
                    type="text"
                    class="table-change"
                    @click="editTableRow(scope.row,scope.$index)"
                  >编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-trans" @click="isPurchase = false ,resetForm('form')">取 消</el-button>
        <el-button class="btn-addmore" @click="submitForm('form') ">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagings from "@/components/common/Pagings.vue";
export default {
	components: {
		Pagings,
	},
	data() {
		return {
      listLoading:false,
      checkedBox: [],
      page: 1,
      pageSize: 10,
      total: 0,
			tableData: [
        {
          status:0,
          documentNumber:'P202007130001',
          applicationDate:'2020-07-03',
          applicationDepartment:'中移动物联网有限公司',
          applicant:'试用版',
          totalAmount:'240.00'
        },
      ],
      //dialog
      isPurchase:false,
      addPurchaseTitle:'',
      form:{
          status:0,
          documentNumber:'',
          applicationDate:'',
          applicationDepartment:'',
          applicant:'',
          totalAmount:''
        },
      rules:{},
      memberType:[],
      purchaseIndex:'',
      checkedCard:[],
      tableData1:[],

      //动态表格
      chageTableData: {
         sel: null, //选中行   
         columns: [{
             prop: "deviceName",
             label: "设备名称",
             width: 140
           },
           {
             prop: "specificationModel",
             label: "规格型号",
             width: 150
           },
           {
             prop: "manufacturer",
             label: "生产厂家",
             width: 120
           },
           {
             prop: "amount",
             label: "数量",
           },
           {
             prop: "unitPrice",
             label: "单价"
           },
           {
               prop:"accountMoney",
               label:"金额"
           },
           {
               prop:'purpose',
               label:"用途"
           }
         ],
         data: [],
       },
		};
  },
  methods:{
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    cardSelectionChange (val) {
      this.checkedCard = val;
    },
    //deletall
    delectAll () {
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < this.tableData.length; i++) {
            const element = this.tableData[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.tableData.forEach((e, i) => {
              if (element.id == e.id) {
                this.tableData.splice(i, 1)
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
    //fenye
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    close (done) {
      this.$refs['form'].resetFields();
      done();
    },
    //dialog
    addPurchaseList(formName){
      this.addPurchaseTitle = '新增采购清单'
      this.form = {
        status:0,
        documentNumber:'',
        applicationDate:'',
        applicationDepartment:'',
        applicant:'',
        totalAmount:'',
        chageTableData:{data:{}}
      },
      this.resetForm(formName)
      this.isPurchase = true
    },
    //dialog嵌套表格
    addTable() {
       for (let i of this.chageTableData.data) {
         if (i.isSet) return this.$message.warning("请先保存当前编辑项");
       }
       let j = {
         "deviceName": "",
         "specificationModel": "",
         "manufacturer": "",
         "amount": "",
         "unitPrice": "",
         "accountMoney":"",
         "purpose":"",
         "isSet": true,
       };
       this.chageTableData.data.push(j);
       this.chageTableData.sel = JSON.parse(JSON.stringify(j));
     },
    saveTableRow(row, index) { //保存
       let data = JSON.parse(JSON.stringify(this.chageTableData.sel));
       for (let k in data) {
         row[k] = data[k] //将sel里面的value赋值给这一行。ps(for....in..)的妙用，细心的同学发现这里我并没有循环对象row
       }
       row.isSet = false;
       window.console.log(index)
     },
    editTableRow(row) { //编辑
       for (let i of this.chageTableData.data) {
         if (i.isSet) return this.$message.warning("请先保存当前编辑项");
       }
       this.chageTableData.sel = row
       row.isSet = true
     },
    deleteTableRow(index, rows) { //删除
       rows.splice(index, 1)
     },
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   let values = [];
    //   columns.forEach((column, index) => {
    //     if( column.property ==='accountMoney') {
    //       values = data.map(item => Number(item.amount*item.unitPrice))
    //     }
    //     if (column.property === 'accountMoney') {
    //     sums[index] = values.reduce((prev, curr) => {
    //       const value = Number(curr);
    //       if (!isNaN(value)) {
    //         return prev + curr;
    //       } else {
    //         return prev;
    //       }
    //     }, 0);
    //       sums[index];
    //     } else {
    //       sums[index] = '--';
    //     }
    //   });
      
    //   return sums;
      
    // },
    //编辑
    editList (index, item) {
      this.form = { ...item }
      this.isPurchase = true
      this.addPurchaseTitle = '编辑采购清单'
      this.purchaseIndex = index
    },
    //delete
    handleDelete (index, row) {
      // 设置类似于console类型的功能
      window.console.log('row' + row)
      window.console.log(index)

      this.$confirm("永久删除该文件, 是否继续?", "提示", {
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
    //提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.addBusinessTitle == '新增采购清单') {
            this.tableData.unshift({ ...this.form });
            this.isPurchase = false
          } else if (this.addBusinessTitle == '编辑采购清单') {
            this.tableData[this.registerIndex] = { ...this.form }
            this.isPurchase = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>
