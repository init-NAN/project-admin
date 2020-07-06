<template>
  <div class="discount">
    <div class="current-page-title">
      <span>折扣配置</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore "
                   @click="addNewDiscount('form')">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
      <el-col :span="6"
              :offset="10">
        <el-input v-model="searchInput"
                  placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2"
              :offset="1">
        <el-button type="text">搜索</el-button>
      </el-col>
    </el-row>
    <section class="grid-content">
      <el-table :data="tableData"
                v-loading="listLoading"
                ref="table"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="businessName"
                         label="商家名称">
        </el-table-column>
        <el-table-column prop="discount"
                         label="折扣(折)">
        </el-table-column>
        <el-table-column prop="creationTime"
                         label="创建时间">
        </el-table-column>
        <el-table-column prop="discountTimes"
                         label="折扣次数">
        </el-table-column>
        <el-table-column prop="discountDirection"
                         label="折扣方向">
        </el-table-column>
        <el-table-column prop="enable"
                         label="是否启用">
          <template v-slot="scope">
            {{scope.row.enable =='1'?'已启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-show"
                       @click="editList(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            <el-button type="text"
                       class="table-show"
                       @click="showList(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
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

    <el-dialog :title="addDiscountTitle"
               :visible.sync="isDiscount"
               :before-close="close"
               width="900px">
      <div class="add-files">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 :disabled="isDisabled"
                 label-width="auto"
                 label-position="right">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>折扣配置</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="配置名称:"
                              prop="configurationName">
                  <el-input v-model="form.configurationName"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="商家名称:"
                              prop="businessName">
                  <el-input v-model="form.businessName"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="生效时间:"
                              prop="startTime">
                  <el-date-picker v-model="form.startTime"
                                  type="datetime"
                                  format="yyyy-MM-dd HH:mm:ss"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="截止时间:"
                              prop="endTime">
                  <el-date-picker v-model="form.endTime"
                                  type="datetime"
                                  format="yyyy-MM-dd HH:mm:ss"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="折扣(折):"
                              prop="discount">
                  <el-input v-model="form.discount"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用:"
                              prop="enable">
                  <el-select v-model="form.enable">
                    <el-option label="是"
                               value="1"></el-option>
                    <el-option label="否"
                               value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30"
                    class="flex">
              <el-col :span="12">
                <el-form-item label="不打折:">
                  <el-checkbox-group v-model="form.checked">
                    <el-checkbox v-for="item in weeks"
                                 :label="item"
                                 :key="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="折扣类型:"
                              class="flex">
                  <el-radio-group v-model="form.discountDirection">
                    <el-radio label="设备折扣">设备折扣</el-radio>
                    <el-radio label="会员折扣">会员折扣</el-radio>
                    <el-radio label="全部配置">全部配置</el-radio>
                    <el-radio label="全部设备">全部设备</el-radio>
                    <el-radio label="全部会员">全部会员</el-radio>
                    <el-radio label="饭票">饭票</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="折扣次数:"
                              v-if="this.form.discountDirection != '会员折扣' && this.form.discountDirection != '全部会员'">
                  <el-input v-model="form.discountTimes ">
                    <template slot="append">次</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"
                      v-if="this.form.discountDirection == '会员折扣' || this.form.discountDirection == '全部会员'">
                <el-form-item label="消费次数:">
                  <el-input v-model="form.consumptionTimes">
                    <template slot="append">次</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"
                      v-if="this.form.discountDirection == '会员折扣' || this.form.discountDirection == '全部会员'"
                      class="precautions line-hight-40">
                <span>*该时间段内能消费多少次,0表示不限制次数</span>
              </el-col>
            </el-row>
            <el-col :span="24"
                    class="precautions">
              <span>注意:</span>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;所有配置会员:是,则包含所有折扣会员里面的启用用户,否则不包含里面的用户</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;叠加用户: 指定的白名单会员账号,用英文的逗号隔开,必须是开通了园付通卡号的会员</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;*请谨慎配置该数据内容,配置后只有白名单才能使用消费功能</p>
            </el-col>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="isDiscount = false ,resetForm('form')">取 消</el-button>
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
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      checkedBox: [],
      searchInput: '',
      listLoading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          configurationName: '喜茶促销日',
          businessName: '喜茶',
          discount: '3.8',
          creationTime: '2020-03-13',
          startTime:'2020-03-14 00:00:00',
          endTime:'2020-03-14 23:59:59',
          enable: '1',
          checked: ['周三','周四'],
          discountDirection: '设备折扣',
          discountTimes: '1',
          consumptionTimes: ''
        }
      ],
      form: {
        configurationName: '',
        businessName: '',
        discount: '',
        creationTime: '',
        discountDirection: '',
        enable: '',
        checked: [],
        consumptionTimes: '',
      },
      rules: {
        configurationName: [
          { required: true, message: "请输入名称！", trigger: "blur" },
          { max: 30, message: "请输入名称！", trigger: "blur" }
        ],
        businessName: [
          { required: true, message: "请输入名称！", trigger: "blur" },
          { max: 30, message: "请输入名称！", trigger: "blur" }
        ],
        discountDirection: [
          { required: true, message: '请选择配置会员', trigger: 'change' }
        ],
        enable: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        discount: [
          { required: true, message: "请输入折扣！", trigger: "blur" },
          { min: 1, max: 5, message: "请输入折扣！", trigger: "blur" }
        ],
      },
      addDiscountTitle: '',
      isDiscount: false,
      isDisabled: false,
      discountIndex: '',
    }
  },
  methods: {
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
    handleSortChange (col) {
      if (col.prop == null) {
        return;
      }
      this.order = (col.order === 'ascending') ? 'asc' : 'desc';
      this.sort = col.prop;
      this.searchDevice();
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
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
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
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    close (done) {
      this.$refs['form'].resetFields();
      done();
    },
    addNewDiscount (formName) {
      this.isDisabled = false
      this.addDiscountTitle = '新增折扣'
      this.form = {
        configurationName: '',
        businessName: '',
        discount: '',
        creationTime: '',
        discountDirection: '',
        enable: '',
        checked: [],
        consumptionTimes: ''
      }
      this.resetForm(formName)
      this.isDiscount = true
    },
    //编辑
    editList (index, item) {
      this.isDisabled = false
      this.form = { ...item }
      this.isDiscount = true
      this.addDiscountTitle = '编辑折扣'
      this.discountIndex = index
    },
    showList (index, item) {
      this.isDisabled = true
      this.form = { ...item }
      this.isDiscount = true
      this.addDiscountTitle = '查看折扣'
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
          if (this.addDiscountTitle == '新增折扣') {
            this.form.creationTime = this.getTimeNow();
            this.tableData.unshift({ ...this.form });
            this.isDiscount = false
          } else if (this.addDiscountTitle == '编辑折扣') {
            this.tableData[this.discountIndex] = { ...this.form }
            this.isDiscount = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="less" scope>
.discount {
  .el-radio {
    display: block;
    color: #fff !important;
    line-height: 2;
  }
  .el-checkbox {
    color: #fff !important;
    line-height: 2;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .precautions {
    span,
    p {
      line-height: 24px;
    }
    margin-bottom: 20px;
  }
  .line-hight-40 {
    line-height: 40px;
  }
}
</style>