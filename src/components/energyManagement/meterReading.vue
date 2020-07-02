<template>
  <div class="billing">
    <div class="current-page-title">
      <span>抄表计费管理</span>
    </div>

    <el-tabs :tab-position="tabPosition"
             style="height: 100%;"
             @tab-click="toclick"
             v-model="activeName2">
      <el-tab-pane label="计费抄表单"
                   name="计费抄表单">
        <el-row class="margin-bottom">
          <el-col :span="5">
            <el-button class="btn-addmore"
                       @click="addBillingMeter(1)">新建计费抄表单</el-button>
          </el-col>
          <el-col :span="3">
            <el-button class="btn-trans"
                       :disabled='this.checkedBox.length===0'
                       @click="delectAll()">批量删除</el-button>
          </el-col>
          <el-col :span="6"
                  :offset="7">
            <el-input v-model="input"
                      placeholder="请输入搜索关键字"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <el-button type="text">搜索</el-button>
          </el-col>
        </el-row>
        <el-table :data="billing"
                  v-loading="listLoading"
                  ref="table"
                  @selection-change="handleSelectionChange"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="billingFormNo"
                           label="抄表单编号"
                           width="160"></el-table-column>

          <el-table-column prop="billingMeterReader"
                           label="抄表人"
                           width="80"></el-table-column>

          <el-table-column prop="billingYear"
                           label="计费年月"
                           width="100"></el-table-column>

          <el-table-column prop="billingType"
                           label="表种类"
                           width="130"></el-table-column>

          <el-table-column prop="billingGeneration"
                           label="生成时间"
                           width="120"></el-table-column>

          <el-table-column prop="billingEnergyMeters"
                           label="能源表总数"></el-table-column>

          <el-table-column prop="billingCompleted"
                           label="完成数量"></el-table-column>

          <el-table-column prop="billingReviewStatus"
                           label="复核状态"
                           width="100"></el-table-column>

          <el-table-column label="操作"
                           width="150">
            <template slot-scope="scope">
              <el-button type="text"
                         class="table-show"
                         @click="editList(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text"
                         class="table-del"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button type="text"
                         class="table-show"
                         @click="changStatus(scope.$index, scope.row)">
                {{scope.row.billingReviewStatus=='未复核'?'复核':''}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="非计费抄表单"
                   name="非计费抄表单">
        <el-row class="margin-bottom">
          <el-col :span="5">
            <el-button class="btn-addmore"
                       @click="addBillingMeter(2)">新建非计费抄表单</el-button>
          </el-col>
          <el-col :span="3">
            <el-button class="btn-trans"
                       :disabled='this.checkedBox.length===0'
                       @click="delectAll()">批量删除</el-button>
          </el-col>
          <el-col :span="6"
                  :offset="7">
            <el-input v-model="input"
                      placeholder="请输入搜索关键字"></el-input>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <el-button type="text">搜索</el-button>
          </el-col>
        </el-row>
        <el-table :data="noBilling"
                  v-loading="listLoading"
                  ref="table"
                  @selection-change="handleSelectionChange"
                  :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="billingFormNo"
                           label="抄表单编号"
                           width="160"></el-table-column>

          <el-table-column prop="billingMeterReader"
                           label="抄表人"
                           width="80"></el-table-column>

          <el-table-column prop="billingYear"
                           label="计费年月"
                           width="100"></el-table-column>

          <el-table-column prop="billingType"
                           label="表种类"
                           width="130"></el-table-column>

          <el-table-column prop="billingGeneration"
                           label="生成时间"
                           width="120"></el-table-column>

          <el-table-column prop="billingEnergyMeters"
                           label="能源表总数"></el-table-column>

          <el-table-column prop="billingCompleted"
                           label="完成数量"></el-table-column>

          <el-table-column prop="billingReviewStatus"
                           label="复核状态"
                           width="100"></el-table-column>

          <el-table-column label="操作"
                           width="150">
            <template slot-scope="scope">
              <el-button type="text"
                          
                         class="table-show"
                         @click="editList(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text"
                          
                         class="table-del"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button type="text"
                          
                         class="table-show"
                         @click="changStatus(scope.$index, scope.row)">
                {{scope.row.billingReviewStatus=='未复核'?'复核':''}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-col class="toolbar">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-sizes="[10, 20, 30, 40, 50, 100]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-col> -->
    <Pagings :total="total"
             :page="page"
             :pageSize="pageSize"
             @handleSizeChangeSub="handleSizeChange"
             @handleCurrentChangeSub="handleCurrentChange"></Pagings>
    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>

    <!-- diolg -->
    <el-dialog :title="addBillingMeterTitle"
               :visible.sync="isBillingMeter"
               :before-close="closeBilling"
               width="1200px">
      <div class="add-files">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 label-width="auto"
                 label-position="left">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>抄表单主表</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="抄表单名称:">
                  <el-input v-model="form.name"
                            autocomplete="off"
                            placeholder="请输入表单名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="范围:">
                  <el-input v-model="form.range"
                            autocomplete="off"
                            placeholder="请输入范围"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计费年月:"
                              prop="billingYear">
                  <el-date-picker type="month"
                                  placeholder="请选择日期"
                                  v-model="form.billingYear"
                                  format="yyyy-MM"
                                  value-format="yyyy-MM"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="抄表人:">
                  <el-input v-model="form.billingMeterReader"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="完成时限:">
                  <el-date-picker type="date"
                                  placeholder="请选择日期"
                                  v-model="form.iDate"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="抄表单编号:">
                  <el-input v-model="form.billingFormNo"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="表种类:"
                              prop="billingType">
                  <el-select v-model="form.billingType"
                             placeholder="请选择表种类">
                    <el-option label="电表"
                               value="电表"></el-option>
                    <el-option label="水表"
                               value="水表"></el-option>
                    <el-option label="尖峰平谷电表"
                               value="尖峰平谷电表"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="能源表总数:">
                  <el-input-number v-model="form.billingEnergyMeters"
                                   controls-position="right"
                                   :min="1"
                                   :max="9999"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房间总数:">
                  <el-input-number v-model="form.weight"
                                   controls-position="right"
                                   :min="1"
                                   :max="9999"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="复核状态:"
                              prop="billingReviewStatus">
                  <el-select v-model="form.billingReviewStatus"
                             placeholder="请选择复核状态">
                    <el-option label="已复核"
                               value="已复核"></el-option>
                    <el-option label="未复核"
                               value="未复核"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="完成数量:"
                              prop="billingCompleted">
                  <el-input-number v-model="form.billingCompleted"
                                   controls-position="right"
                                   @change="handleChange"
                                   :min="1"
                                   :max="9999"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="isBillingMeter = false ,resetForm('form')">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagings from "@/components/common/Pagings.vue";
export default {
  components: {
    Pagings
  },
  data () {
    return {
      tabPosition: 'left',
      checkedBox: [],
      //计费
      billing: [
        {
          billingFormNo: 'RT20200229-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-05',
          billingType: '尖峰平谷电表',
          billingGeneration: '2020-02-28',
          billingEnergyMeters: '1',
          billingCompleted: '1.00',
          billingReviewStatus: '已复核',
          id: 1
        }, {
          billingFormNo: 'RT20200304-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-03',
          billingType: '水表',
          billingGeneration: '2020-03-04',
          billingEnergyMeters: '1',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 2
        }, {
          billingFormNo: 'RT20200311-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-02',
          billingType: '水表',
          billingGeneration: '2020-03-11',
          billingEnergyMeters: '2',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 3
        }, {
          billingFormNo: 'RT20200311-0002',
          billingMeterReader: '企业版',
          billingYear: '2020-02',
          billingType: '电表',
          billingGeneration: '2020-03-11',
          billingEnergyMeters: '1',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 4
        }
      ],
      // 非计费
      noBilling: [
        {
          billingFormNo: 'RT20200229-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-05',
          billingType: '水表',
          billingGeneration: '2020-02-28',
          billingEnergyMeters: '1',
          billingCompleted: '1.00',
          billingReviewStatus: '未复核',
          id: 1
        }, {
          billingFormNo: 'RT20200304-0001',
          billingMeterReader: '企业版',
          billingYear: '2020-03',
          billingType: '水表',
          billingGeneration: '2020-03-04',
          billingEnergyMeters: '1',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 2
        }, {
          billingFormNo: 'RT20200311-0002',
          billingMeterReader: '企业版',
          billingYear: '2020-02',
          billingType: '电表',
          billingGeneration: '2020-03-11',
          billingEnergyMeters: '2',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 3
        }, {
          billingFormNo: 'RT20200311-0003',
          billingMeterReader: '企业版',
          billingYear: '2020-02',
          billingType: '电表',
          billingGeneration: '2020-03-11',
          billingEnergyMeters: '1',
          billingCompleted: '0.00',
          billingReviewStatus: '未复核',
          id: 4
        }
      ],
      activeName2: '计费抄表单',
      listLoading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      input: '',
      addBillingMeterTitle: '',
      isBillingMeter: false,
      rules: {
        billingType: [
          { required: true, message: "请选择抄表类型!", trigger: "change" }
        ],
        billingReviewStatus: [
          { required: true, message: "请选择复核状态!", trigger: "change" }
        ],
        billingYear: [
          { required: true, message: "请选择计费年月!", trigger: "change" }
        ]
      },
      form: {},
      billingIndex: '',
    }
  },
  methods: {
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //deletall
    delectAll () {
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < this.billing.length; i++) {
            const element = this.billing[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.billing.forEach((e, i) => {
              if (element.id == e.id) {
                this.billing.splice(i, 1)
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
    //计数器
    handleChange (value) {
      window.console.log(value);
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
    closeBilling (done) {
      this.$refs['form'].resetFields();
      done();
    },
    getTimeNow () {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getTime () {
      var date1 = new Date();
      var year = date1.getFullYear();
      var month = date1.getMonth() + 1;
      var day = date1.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      return year + month + day
    },
    //新增
    addBillingMeter (val) {
      this.form = {}
      this.resetForm('form');
      this.isBillingMeter = true
      if (val == 1) {
        this.addBillingMeterTitle = '新增计费抄表'
      } else if (val == 2) {
        this.addBillingMeterTitle = '新增非计费抄表'
      }
    },
    //编辑
    editList (index, item) {
      this.form = { ...item }
      this.isBillingMeter = true
      this.addBillingMeterTitle = '编辑抄表'
      this.billingIndex = index
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
          this.billing.splice(index, 1);
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
          if (this.addBillingMeterTitle == '新增计费抄表') {
            this.form.billingGeneration = this.getTimeNow();
            this.form.billingFormNo = 'RT' + this.getTime() + '-0001'
            this.billing.unshift({ ...this.form });
            this.isBillingMeter = false
          } else if (this.addBillingMeterTitle == '新增非计费抄表') {
            this.form.billingGeneration = this.getTimeNow();
            this.form.billingFormNo = 'RT' + this.getTime() + '-0001'
            this.noBilling.unshift({ ...this.form });
            this.isBillingMeter = false
          }
          else if (this.addBillingMeterTitle == '编辑抄表') {
            this.billing[this.billingIndex] = { ...this.form }
            this.isBillingMeter = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    changStatus (index, item) {
      window.console.log(item)
      this.$confirm("复核该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.billing[index].billingReviewStatus = '已复核';
          this.$message({
            type: "success",
            message: "复核成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消复核"
          });
        });
    },
    //tabs切换
    toclick (tab, event) {
      window.console.log(tab.label)
      window.console.log(event)
    }
  }
}
</script>

<style>
</style>