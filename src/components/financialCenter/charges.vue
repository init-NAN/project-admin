<template>
  <div class="charges">
    <div class="current-page-title">
      <span>收费项</span>
      <div class="line"></div>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="addList btn-addmore"
                   @click="isCharges = true,form={},isDisabled = false,chargesTitle = '新建收费项',resetForm('form')">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary"
                   class="del-btn btn-trans"
                   :disabled="this.checkedBox.length == 0"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
    </el-row>

    <el-table :data="charges"
              resizable
              ref="table"
              v-loading="listLoading"
              @selection-change="handleSelectionChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="chargeItem"
                       label="收费项名称">
      </el-table-column>
      <el-table-column prop="chargeCode"
                       label="收费项代码">
      </el-table-column>
      <el-table-column prop="overdue"
                       label="滞纳金比例">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态">

      </el-table-column>
      <el-table-column prop="sort"
                       label="排序">
      </el-table-column>

      <!-- <el-table-column prop="intended"
                       label="意向房源"
                       show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     class="table-show"
                     @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button type="text"
                     size="small"
                     class="table-del"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button type="text"
                     size="small"
                     class="table-show"
                     @click="showRole(scope.$index, scope.row)">
            {{scope.row.status=='常规项'?'':'查看'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col class="toolbar">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-sizes="[10, 20, 30, 40, 50, 100]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-col>
    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>

    <el-dialog :title="chargesTitle"
               :visible.sync="isCharges"
               :before-close="closeCharges">
      <div class="add-files">
        <el-card class="box-card margin-bottom">
          <el-form :model="form"
                   :rules="rules"
                   label-position='left'
                   label-width="auto"
                   ref="form"
                   :disabled="isDisabled">
            <el-row :gutter="30"
                    class="margin-top">
              <el-col :span="12">
                <el-form-item label="收费项名称:"
                              prop="chargeItem">
                  <el-input v-model="form.chargeItem"
                            placeholder="请输入名称"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收费项代码:"
                              prop="chargeCode">
                  <el-input v-model="form.chargeCode"
                            placeholder="请输入名称"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30"
                    class="margin-top">
              <el-col :span="12">
                <el-form-item label="滞纳金比例:"
                              prop="overdue">
                  <el-input v-model="form.overdue"
                            placeholder="请输入滞纳金比例"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:"
                              prop="status">
                  <el-select v-model="form.status"
                             placeholder="">
                    <el-option label="常规项"
                               value="常规项"></el-option>
                    <el-option label="临时项"
                               value="临时项"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30"
                    v-if="this.form.status == '临时项'"
                    class="margin-top">
              <el-col :span="24">
                <el-form-item label="计划有效期:">
                  <el-date-picker v-model="form.dateValidity"
                                  type="daterange"
                                  range-separator="~"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isCharges = false"
                   class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedBox: [],
      page: 1,
      pageSize: 20,
      total: 20,
      listLoading: false,
      charges: [
        {
          chargeItem: '租金',
          chargeCode: 'ZJ',
          overdue: '0.00%',
          status: '常规项',
          sort: '1',
          id: 1,
        },
        {
          chargeItem: '管理费',
          chargeCode: 'GLF',
          overdue: '20.00%',
          status: '常规项',
          sort: '2',
          id: 2,
        },
        {
          chargeItem: '电费',
          chargeCode: 'DF',
          overdue: '0.00%',
          status: '常规项',
          sort: '3',
          id: 3,
        },
        {
          chargeItem: '水费',
          chargeCode: 'SF',
          overdue: '0.00%',
          status: '常规项',
          sort: '4',
          id: 4,
        },
        {
          chargeItem: '公摊电费',
          chargeCode: 'PDF',
          overdue: '20.00%',
          status: '常规项',
          sort: '5',
          id: 5,
        },
        {
          chargeItem: '公摊水费',
          chargeCode: 'PSF',
          overdue: '0.00%',
          status: '常规项',
          sort: '6',
          id: 6,
        },
        {
          chargeItem: '尖电费',
          chargeCode: 'DFJ',
          overdue: '0.00%',
          status: '常规项',
          sort: '7',
          id: 7,
        },
        {
          chargeItem: '峰电费',
          chargeCode: 'DFF',
          overdue: '0.00%',
          status: '常规项',
          sort: '8',
          id: 8,
        },
        {
          chargeItem: '平电费',
          chargeCode: 'DFP',
          overdue: '0.00%',
          status: '常规项',
          sort: '9',
          id: 9,
        },
        {
          chargeItem: '谷电费',
          chargeCode: 'DFG',
          overdue: '0.00%',
          status: '常规项',
          sort: '10',
          id: 10,
        },
        {
          chargeItem: '其他',
          chargeCode: 'QI',
          overdue: '0.00%',
          status: '常规项',
          sort: '11',
          id: 11,
        },
        {
          chargeItem: '临时卫生费',
          chargeCode: 'WS',
          overdue: '0.00%',
          status: '临时项',
          sort: '12',
          id: 12,
          dateValidity: ['2019-03-20', '2019-04-20']
        },

      ],
      form: {},
      chargesTitle: '',
      isCharges: false,
      chargesIndex: '',
      rules: {
        chargeItem: [
          { required: true, message: "名称不能为空", trigger: "blur" },
          { min: 1, message: "名称不能为空", trigger: "blur" }
        ],
        management: [
          { required: true, message: "请选择管理区", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" },]
      },
      isDisabled: false,
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    // context menu
    handleSelectionChange (sels) {
      // window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //piliangshanchu
    delectAll () {
      this.$confirm("永久删除该收费项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据

          for (let i = 0; i < this.charges.length; i++) {
            const element = this.charges[i];
            element.id = i
          }
          this.checkedBox.forEach(element => {
            this.charges.forEach((e, i) => {

              if (element.id == e.id) {
                this.charges.splice(i, 1)
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
    closeCharges (done) {
      this.isDisabled = false
      this.$refs['form'].resetFields();
      done();
    },
    handleDelete (index, row) {
      window.console.log('row' + row)
      window.console.log(index)
      this.$confirm("永久删除该收费项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData[index].label = '已删除';
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
    handleEdit (index, item) {
      // window.console.log(item)
      // window.console.log(index)
      this.isDisabled = false
      this.isCharges = true
      this.form = { ...item }
      this.chargesIndex = index
      // window.console.log(this.form)
      this.chargesTitle = '编辑收费项'
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.chargesTitle == '新建收费项') {
            this.form.id = this.charges.length
            this.form.sort = this.charges.length
            this.charges.unshift({ ...this.form });
            this.isCharges = false
            this.$message.success('新建成功')
          } else if (this.chargesTitle == '编辑收费项') {
            this.charges[this.chargesIndex] = { ...this.form }
            this.isCharges = false
            this.$message.success('修改成功')
          } else {
            this.$message('页面已关闭')
            this.isCharges = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    showRole (index, item) {
      this.isCharges = true;
      this.isDisabled = true;
      this.form = { ...item }
      this.chargesIndex = index
    }
  },
}
</script>

<style>
</style>