<template>
  <div class="memberInfo">
    <div class="current-page-title">
      <span>会员信息</span>
    </div>

    <el-row class="overview">
      <el-col>
        <span>本日注册数: <span class="redWorld"> {{vipRegister.today}}</span></span>
        <span>本周注册数: <span class="redWorld"> {{vipRegister.week}}</span></span>
        <span>本月注册数: <span class="redWorld"> {{vipRegister.month}}</span></span>
        <span>累计注册数: <span class="redWorld"> {{vipRegister.cumulative}}</span></span>
        <span>累计余额: <span class="redWorld"> {{vipRegister.accumulatedBalance}}</span> 元</span>
      </el-col>
    </el-row>
    <el-form :model="searchForm"
             label-width="auto"
             label-position="left"
             ref="searchForm">
      <el-row :gutter="30">
        <el-col :span="4">
          <el-form-item label="用户名:">
            <el-input v-model="searchForm.personName"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="电话号码:">
            <el-input v-model="searchForm.phone"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="会员卡号:">
            <el-input v-model="searchForm.memberNum"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="会员类型:">
            <el-select v-model="searchForm.tpye">
              <el-option label="个人"
                         value="个人"></el-option>
              <el-option label="园区"
                         value="园区"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button class="btn-addmore">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="btn-addmore"
                     @click="addNewMember('form')">新建</el-button>
        </el-col>
      </el-row>
    </el-form>

    <section class="grid-content">
      <el-table :data="tableData"
                v-loading="listLoading"
                ref="table"
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

        <!-- <el-table-column type="selection"
                         width="55">
        </el-table-column> -->
        <el-table-column prop="personName"
                         label="用户名"></el-table-column>
        <el-table-column prop="phone"
                         label="电话号码"></el-table-column>
        <el-table-column prop="memberType"
                         label="会员类型"></el-table-column>
        <el-table-column prop="memberNum"
                         label="会员卡号"
                         width="190"></el-table-column>
        <el-table-column prop="balance"
                         label="余额(元)"></el-table-column>
        <el-table-column prop="managementCode"
                         label="园区编码"></el-table-column>
        <el-table-column prop="registrationDate"
                         label="注册日期"></el-table-column>
        <el-table-column prop="endLoginDate"
                         label="最后登录时间"></el-table-column>
        <el-table-column prop="rechargeInfomation"
                         label="充值信息">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-show"
                       @click="showRechargeInfomation(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="consumptionFlow"
                         label="消费流水">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-show"
                       @click="showCustomerDetail(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="transferInformation"
                         label="转账信息">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-show"
                       @click="showCustomerDetail(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-show"
                       @click="editList(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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

    <!-- <el-drawer title="我是标题"
               :with-header="false"
               :visible.sync="isRecharge"
               :before-close="closeForm"
               size="80%"> -->

    <el-drawer title="我是标题"
               :with-header="false"
               :visible.sync="isRecharge"
               size="80%">
      <el-card class="box-card margin-top">
        <div slot="header"
             class="clearfix">
          <span class="title">结算详情</span>
        </div>

        <el-row>
          <el-col :span="7"
                  class="pay-box flex">
            充值总计: <span class="redWorld">{{form.topUpOverview.totalRecharge}}</span> 元
          </el-col>
          <el-col :span="7"
                  class="pay-box">
            <div class="online-pay flex">微信: <span class="redWorld">{{form.topUpOverview.wechatPay}}</span> 元</div>
            <div class="online-pay flex">支付宝: <span class="redWorld">{{form.topUpOverview.antPay}}</span> 元</div>
            <div class="online-pay flex">银行转账: <span class="redWorld">{{form.topUpOverview.bankTransfer}}</span> 元</div>
            <div class="online-pay flex">一网通: <span class="redWorld">{{form.topUpOverview.allInOne}}</span> 元</div>
          </el-col>
          <el-col :span="7"
                  :offset="3"
                  class="pay-box">
            <div class="money flex">消费: <span class="redWorld">{{form.topUpOverview.consumption}}</span> 元</div>
            <div class="money flex">余额: <span class="redWorld">{{form.topUpOverview.balance}}</span> 元</div>
          </el-col>
        </el-row>

        <el-row :gutter="30"
                class="margin-top margin-bottom-80">
          <el-col :span="24"
                  class="margin-bottom-10">
            应收清算
          </el-col>
          <el-table :data="form.rechargeInfomation"
                    resizable
                    ref="table1"
                    v-loading="listLoading"
                    :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
            <el-table-column prop="personName"
                             label="用户名">
            </el-table-column>
            <el-table-column prop="cardNum"
                             label="卡号">
            </el-table-column>
            <el-table-column prop="recharge"
                             label="充值(元)">
            </el-table-column>
            <el-table-column prop="consumption"
                             label="消费(元)">
            </el-table-column>
            <el-table-column prop="transferAccounts"
                             label="转账(元)">
            </el-table-column>
            <el-table-column prop="balance"
                             label="余额(元)">
            </el-table-column>
          </el-table>

        </el-row>
      </el-card>
      <el-col class="hidden-card"
              :sm="22"
              :md="15"
              :offset="1">
      </el-col>
    </el-drawer>

    <el-dialog :title="addMemberTitle"
               :visible.sync="isMember"
               :before-close="close"
               width="900px">
      <div class="add-files">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 label-width="auto"
                 label-position="right">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>商家信息</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="用户名:"
                              prop="personName">
                  <el-input v-model="form.personName"
                            autocomplete="off"
                            placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="电话号码:"
                              prop="phone">
                  <el-input v-model="form.phone"
                            autocomplete="off"
                            placeholder="请输入电话号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会员类型:"
                              prop="memberType">
                  <el-select v-model="form.memberType"
                             placeholder="请选择会员类型">
                    <el-option v-for="(item,index) in memberType"
                               :label="item.label"
                               :key="index"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="会员卡号:"
                              prop="memberNum">
                  <el-input v-model="form.memberNum"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="充值金额(元):"
                              prop="balance">
                  <el-input v-model="form.balance"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="园区编码:">
                  <el-input v-model="form.managementCode"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="注册日期:">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.registrationDate"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最后登录时间:">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.endLoginDate"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="isMember = false ,resetForm('form')">取 消</el-button>
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
      vipRegister: {
        today: 0,
        week: 0,
        month: 0,
        cumulative: 0,
        accumulatedBalance: '0.00'
      },
      searchForm: {
        personName: '',
        phone: '',
        memberNum: '',
        tpye: ''
      },
      tableData: [
        {
          personName: 'ccc',
          phone: '1349282904',
          memberType: '年费会员',
          memberNum: 'RT20190202000036',
          balance: '200.17',
          managementCode: 'NT1330209',
          registrationDate: '2018-03-20',
          endLoginDate: '2019-02-02',
          //单独3个侧边栏弹出显示
          topUpOverview: {
            totalRecharge: '0.00',
            wechatPay: '0.00',
            antPay: '0.00',
            bankTransfer: '0.00',
            allInOne: '0.00',
            consumption: '0.00',
            balance: '0.00'
          },
          rechargeInfomation: [
            {
              personName: 'ccc',
              cardNum: '20190202000036',
              recharge: '0',
              consumption: '0',
              transferAccounts: '0',
              balance: '0',
            }
          ],
          // consumptionFlow: '',
          // transferInformation: '',
          id: 1
        }
      ],
      listLoading: false,
      checkedBox: [],
      form: {
        personName: '',
        phone: '',
        memberType: '',
        memberNum: '',
        balance: '',
        managementCode: '',
        registrationDate: '',
        endLoginDate: '',
        rechargeInfomation: '',
        // consumptionFlow: '',
        // transferInformation: '',
        topUpOverview: {
          totalRecharge: '',
          wechatPay: '',
          antPay: '',
          bankTransfer: '',
          allInOne: '',
          consumption: '',
          balance: ''
        }
      },
      page: 1,
      pageSize: 10,
      total: 0,
      //draw
      isRecharge: false,
      //dialog
      addMemberTitle: '',
      isMember: false,
      rules: {
        personName: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
          { max: 30, message: "请输入用户名！", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18|17)[0-9]{9}",
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        memberType: [
          { required: true, message: '请选择会员类型', trigger: 'change' }
        ],
        balance: [
          { required: true, message: "请输入充值金额！", trigger: "blur" },
          { max: 30, message: "请输入充值金额！", trigger: "blur" }
        ],
      },
      memberType: [
        {
          label: '年费会员',
          value: '年费会员'
        },
        {
          label: '月卡会员',
          value: '月卡会员'
        }
      ],
      memberIndex: '',
    }
  },
  methods: {
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
    showRechargeInfomation (index, item) {
      window.console.log(index)
      window.console.log(item)
      this.isRecharge = true
      this.form = { ...item }
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
    addNewMember (formName) {
      this.addMemberTitle = '新增会员'
      this.form = {
        personName: '',
        phone: '',
        memberType: '',
        memberNum: '',
        balance: '',
        managementCode: '',
        registrationDate: '',
        endLoginDate: '',
        rechargeInfomation: '',
        // consumptionFlow: '',
        // transferInformation: '',
        topUpOverview: {
          totalRecharge: '',
          wechatPay: '',
          antPay: '',
          bankTransfer: '',
          allInOne: '',
          consumption: '',
          balance: ''
        }
      },
        this.resetForm(formName)
      this.isMember = true
    },
    //编辑
    editList (index, item) {
      this.form = { ...item }
      this.isMember = true
      this.addMemberTitle = '编辑会员信息'
      this.memberIndex = index
    },
    //提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.addMemberTitle == '新增会员') {
            this.tableData.unshift({ ...this.form });
            this.isMember = false
          } else if (this.addMemberTitle == '编辑会员信息') {
            this.tableData[this.memberIndex] = { ...this.form }
            this.isMember = false
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style lang="less" scope>
.memberInfo {
  .overview {
    .el-col {
      background-color: rgba(10, 13, 51, 0.4);
      span {
        color: #fff;
        font-size: 16px;
        line-height: 40px;
        margin-left: 10px;
      }
      .redWorld {
        color: #f00;
      }
    }
  }
  .redWorld {
    color: #f00;
  }
  .pay-box {
    height: 200px;
    display: inline-block;
    border: 1px solid #708090;
    .online-pay {
      height: 25%;
      border-bottom: 1px solid #708090;
      &:last-child {
        border: none;
      }
    }
    .money {
      height: 50%;
      border: 1px solid #708090;
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
  .margin-bottom-80 {
    margin-bottom: 80px;
  }
  .el-drawer {
    background-color: rgba(10, 13, 51, 0.7);
    overflow: scroll;
    overflow-x: hidden;
  }
  .margin-top {
    margin-top: 40px;
  }
  .box-card {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 16px;
    .title {
      background: linear-gradient(to right, #825bfb, #0497e0, #4b53f9);
      -webkit-background-clip: text;
      color: transparent;
    }
    .el-form {
      .el-form-item__label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .el-input__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .el-table .el-button {
    color: #fff;
    background-color: transparent;
    font-size: 13px;
  }
  .el-card__header {
    border: none;
  }
}
</style>