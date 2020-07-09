<template>
  <div class="monthlyCard">
    <div class="current-page-title">
      <span>收费管理</span>
    </div>

    <el-form :model="searchForm"
             label-width="auto"
             label-position="left"
             ref="checkForm">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item label="停车场:">
            <el-select v-model="searchForm.tpye"
                       placeholder="请选择区域">
              <el-option label="明珠城"
                         value="明珠城"></el-option>
              <el-option label="绿岛物业"
                         value="绿岛物业"></el-option>
              <el-option label="其他"
                         value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付方式:">
            <el-select v-model="searchForm.tpye"
                       placeholder="请选择类型">
              <el-option label="微信"
                         value="微信"></el-option>
              <el-option label="支付宝"
                         value="支付宝"></el-option>
              <el-option label="其他"
                         value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌号:">
            <el-input v-model="searchForm.whitelistName"
                      autocomplete="off"
                      placeholder="请输入车牌号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                class="text-align-right">
          <el-button class="btn-addmore">查询</el-button>
          <el-button class="btn-addmore">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30"
              class="margin-bottom">
        <el-col :span="6">
          <el-form-item label="姓名:">
            <el-input v-model="searchForm.whitelistName"
                      autocomplete="off"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                :offset="12"
                class="text-align-right">
          <el-button class="btn-addmore"
                     @click="addMonthlyCard('form')">新增月卡</el-button>
        </el-col>
      </el-row>
    </el-form>

    <section class="grid-content">
      <el-table :data="tableData"
                v-loading="listLoading"
                ref="table"
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

        <el-table-column prop="parkName"
                         label="园区名称">
        </el-table-column>
        <el-table-column prop="parkingLot"
                         label="停车场">
        </el-table-column>
        <el-table-column prop="registrationNumber"
                         label="车牌号">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="iphoneNumber"
                         label="手机号">
        </el-table-column>
        <el-table-column prop="monthlyPackage"
                         label="月卡套餐">
        </el-table-column>
        <el-table-column prop="orderAmount"
                         label="订单金额">
        </el-table-column>
        <el-table-column prop="actuallyPaid"
                         label="实付金额">
        </el-table-column>
        <el-table-column prop="paymentTime"
                         label="缴费时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="paymentMethod"
                         label="缴费方式">
        </el-table-column>
        <el-table-column prop="orderNumber"
                         label="订单编号">
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
    <el-dialog :title="addMonthlyTitle"
               :visible.sync="isMonthly"
               :before-close="close"
               width="1200px">
      <div class="add-files">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 label-width="auto"
                 label-position="right">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>用户配置</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="园区名称:"
                              prop="parkName">
                  <el-select v-model="form.parkName">
                    <el-option label="雅园"
                               value="雅园"></el-option>
                    <el-option label="清华苑"
                               value="清华苑"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="停车场:"
                              prop="parkingLot">
                  <el-select v-model="form.parkingLot">
                    <el-option label="1号"
                               value="1号"></el-option>
                    <el-option label="3号"
                               value="3号"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="车牌号:"
                              prop="registrationNumber">
                  <el-input v-model="form.registrationNumber"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名:"
                              prop="name">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="手机号:"
                              prop="iphoneNumber">
                  <el-input v-model="form.iphoneNumber"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="月卡套餐:"
                              prop="monthlyPackage">
                  <el-select v-model="form.monthlyPackage">
                    <el-option label="一个月"
                               value="一个月"></el-option>
                    <el-option label="三个月"
                               value="三个月"></el-option>
                    <el-option label="六个月"
                               value="六个月"></el-option>
                    <el-option label="九个月"
                               value="九个月"></el-option>
                    <el-option label="一年"
                               value="一年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="订单金额:"
                              prop="orderAmount">
                  <el-input v-model.number="form.orderAmount"
                            autocomplete="off"
                            maxlength="8"
                            oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实付金额:"
                              prop="actuallyPaid">
                  <el-input v-model="form.actuallyPaid"
                            autocomplete="off"
                            maxlength="8"
                            oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="缴费时间:"
                              prop="paymentTime">
                  <el-date-picker v-model="form.paymentTime"
                                  type="datetime"
                                  format="yyyy-MM-dd HH:mm:ss"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="缴费方式:"
                              prop="paymentMethod">
                  <el-select v-model="form.paymentMethod">
                    <el-option label="微信"
                               value="微信"></el-option>
                    <el-option label="支付宝"
                               value="支付宝"></el-option>
                    <el-option label="银行卡"
                               value="银行卡"></el-option>
                    <el-option label="其他"
                               value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
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
      searchForm: {},
      listLoading: false,
      page: 1,
      pageSize: 10,
      total: 1,
      tableData: [
        {
          parkName: '雅园',
          parkingLot: '1号',
          registrationNumber: '粤A-23212',
          name: '小罗',
          iphoneNumber: '137282839128',
          monthlyPackage: '一个月',
          orderAmount: '200',
          actuallyPaid: '200',
          paymentTime: '2020-07-09 13:20:13',
          paymentMethod: '支付宝',
          orderNumber: '20200709001'
        }
      ],
      addMonthlyTitle: '',
      isMonthly: false,
      form: {

      },
      rules: {
        parkName: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        parkingLot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        registrationNumber: [
          { required: true, message: "请输入车牌号！", trigger: "blur" },
          { max: 30, message: "请输入车牌号！", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名！", trigger: "blur" },
          { max: 5, message: "请输入姓名！", trigger: "blur" }
        ],
        iphoneNumber: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18|17)[0-9]{9}",
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        monthlyPackage: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        orderAmount: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        actuallyPaid: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        paymentTime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        paymentMethod: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
      },
    }
  },
  methods: {
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
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    close (done) {
      this.$refs['form'].resetFields();
      done();
    },
    addMonthlyCard (formName) {
      this.addMonthlyTitle = '新增月卡用户'
      this.form = {}
      this.resetForm(formName)
      this.isMonthly = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.orderNumber = this.getTime() + '001';
          this.tableData.unshift({ ...this.form });
          this.isMonthly = false
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style>
</style>