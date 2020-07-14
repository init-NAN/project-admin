<template>
  <div class="acceptance">
    <div class="current-page-title">
      <span>验收申请</span>
    </div>

    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="addList btn-addmore" @click="addNewAcceptance">申请</el-button>
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
        <el-table-column prop="status" label="送审状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 ? '已送审' : '未送审' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="documentNumber" label="单据号码"></el-table-column>
        <el-table-column prop="purchaseDate" label="购置日期" width="150"></el-table-column>
        <el-table-column prop="acceptanceDate" label="验收日期" width="150"></el-table-column>
        <el-table-column prop="devicename" label="设备名称"></el-table-column>
        <el-table-column prop="specification" label="规格型号"></el-table-column>
        <el-table-column prop="department" label="使用部门"></el-table-column>
        <el-table-column prop="departmentPeople" label="使用人员"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型"></el-table-column>
        <el-table-column prop="acceptanceQuantity" label="验收数量"></el-table-column>
        <el-table-column prop="applicationStatus" label="申请状态">
          <template slot-scope="scope">
            <span>{{ scope.row.applicationStatus == 0 ? '待发': '已发'}}</span>
          </template>
        </el-table-column>

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

    <el-dialog :title="addMemberTitle" :visible.sync="isMember" :before-close="close" width="900px">
      <div class="add-files">
        <el-form :model="form" :rules="rules" ref="form" label-width="auto" label-position="right">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商家信息</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="用户名:" prop="personName">
                  <el-input v-model="form.personName" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="电话号码:" prop="phone">
                  <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="会员类型:" prop="memberType">
                  <el-select v-model="form.memberType" placeholder="请选择会员类型">
                    <el-option
                      v-for="(item,index) in memberType"
                      :label="item.label"
                      :key="index"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="会员卡号:" prop="memberNum">
                  <el-input v-model="form.memberNum" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="充值金额(元):" prop="balance">
                  <el-input v-model="form.balance" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="园区编码:">
                  <el-input v-model="form.managementCode" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="注册日期:">
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
              <el-col :span="12">
                <el-form-item label="最后登录时间:">
                  <el-date-picker
                    type="date"
                    placeholder="选择时间"
                    v-model="form.endLoginDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-trans" @click="isMember = false ,resetForm('form')">取 消</el-button>
        <el-button class="btn-addmore" @click="submitForm('form')">确 定</el-button>
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
      tableData:[],
      form:{
        status:'',
        documentNumber:'',
        purchaseDate:'',
        acceptanceDate:'',
        devicename:'',
        specification:'',
        department:'',
        departmentPeople:'',
        deviceType:'',
        acceptanceQuantity:'',
        applicationStatus:''
      }
    }
  },
  methods: {
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
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
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    close (done) {
      this.$refs['form'].resetFields();
      done();
    },
    addNewAcceptance(formName){
      this.addPurchaseTitle = '新增采购清单'
      this.form = {
        status:'',
        documentNumber:'',
        purchaseDate:'',
        acceptanceDate:'',
        devicename:'',
        specification:'',
        department:'',
        departmentPeople:'',
        deviceType:'',
        acceptanceQuantity:'',
        applicationStatus:''
      },
      this.resetForm(formName)
      this.isPurchase = true
    },
  },
}
</script>

<style>
</style>