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
        <el-table-column prop="submissionMark" label="送审标志" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.submissionMark == 1 ? '已送审' : '未送审' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="documentCode" label="单据号码"></el-table-column>
        <el-table-column prop="purchaseDate" label="购置日期" width="150"></el-table-column>
        <el-table-column prop="acceptanceDate" label="验收日期" width="150"></el-table-column>
        <el-table-column prop="devicename" label="设备名称"></el-table-column>
        <el-table-column prop="specification" label="规格型号"></el-table-column>
        <el-table-column prop="userDepartment" label="使用部门"></el-table-column>
        <el-table-column prop="departmentPeople" label="使用人员"></el-table-column>
        <el-table-column prop="deviceTypes" label="设备类型"></el-table-column>
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

    <el-dialog
      :title="addacceptanceTitle"
      :visible.sync="isAcceptance"
      :before-close="close"
      width="1200px"
    >
      <div class="add-files">
        <el-form :model="form" :rules="rules" ref="form" label-width="auto" label-position="right">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>设备验收表</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="单据编码:" prop="documentCode">
                  <el-input v-model="form.documentCode" autocomplete="off" placeholder="请输入单据编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="验收日期:" prop="acceptanceDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择时间"
                    v-model="form.acceptanceDate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-tabs v-model="activeName" style="height: 100%;" @tab-click="toclick">
              <el-tab-pane label="设备信息" name="设备信息">
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="设备名称:" prop="devicename">
                      <el-input v-model="form.devicename" autocomplete="off" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label=" 名称确认:" prop="nameConfirmation">
                      <el-input v-model="form.phone" autocomplete="off" placeholder="请确认设备名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="验收数量:" prop="acceptanceQuantity">
                      <el-input v-model="form.acceptanceQuantity" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="设备总价值:" prop="equipmentTotalValue">
                      <el-input v-model="form.equipmentTotalValue" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="出厂编号:" prop="factoryNumber">
                      <el-input v-model="form.factoryNumber" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出厂日期:">
                      <el-date-picker
                        type="date"
                        placeholder="选择时间"
                        v-model="form.productionDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="使用部门:">
                      <el-input v-model="form.userDepartment" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="使用人员:">
                      <el-input v-model="form.departmentPeople" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="规格型号:">
                      <el-input v-model="form.specification" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="购置日期:">
                      <el-date-picker
                        type="date"
                        placeholder="选择时间"
                        v-model="form.purchaseDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="24">
                    <el-form-item label="供应商:">
                      <el-select v-model="form.supplier" placeholder="请选择费用周期">
                        <el-option label="暂无" value="暂无"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="设备类型:">
                      <el-select v-model="form.deviceTypes" placeholder="请选择费用周期">
                        <el-option label="其他" value="其他"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="固定设备:">
                      <el-select v-model="form.fixedDevice" placeholder="请选择费用周期">
                        <el-option label="是固定设备" value="是固定设备"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="设备产地:">
                      <el-input v-model="form.producingArea" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="单位:">
                      <el-input v-model="form.company" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="存放地点:">
                      <el-input v-model="form.storageLocation" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="生产厂家:">
                      <el-input v-model="form.manufacturer" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="24">
                    <el-form-item label="申请状态:">
                      <el-select v-model="form.applicationStatus" placeholder="请选择申请状态">
                        <el-option label="已发" value="1"></el-option>
                        <el-option label="待发" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="其他" name="其他">
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="是否检定:" prop="personName">
                      <el-select v-model="form.verifiedStatus" placeholder="请选择费用周期">
                        <el-option label="非检定设备" value="非检定设备"></el-option>
                        <el-option label="需检定设备" value="需检定设备"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="检定单位:" prop="personName">
                      <el-input
                        v-model="form.verificationUnit"
                        autocomplete="off"
                        placeholder="请输入单据编码"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item label="检定周期:" prop="personName">
                      <el-select v-model="form.verificationPeriod" placeholder="请选择费用周期">
                        <el-option label="日" value="日"></el-option>
                        <el-option label="周" value="周"></el-option>
                        <el-option label="月" value="月"></el-option>
                        <el-option label="半年" value="半年"></el-option>
                        <el-option label="季度" value="季度"></el-option>
                        <el-option label="年" value="年"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="下次检定日期:">
                      <el-date-picker
                        type="date"
                        placeholder="选择时间"
                        v-model="form.nextVerificationDate"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="24">
                    <el-form-item label="资料确认">
                      <el-input type="textarea" v-model="form.dataConfirmation"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="24">
                    <el-form-item label="人员培训情况">
                      <el-input type="textarea" v-model="form.personnelTraining"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-trans" @click="isAcceptance = false ,resetForm('form')">取 消</el-button>
        <el-button class="btn-addmore" @click="submitForm('form')">确 定</el-button>
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
  data() {
    return {
      listLoading: false,
      checkedBox: [],
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          submissionMark: "",
          applicationStatus: "",
          documentCode: "",
          purchaseDate: "",
          acceptanceDate: "",
          devicename: "",
          specification: "",
          userDepartment: "",
          departmentPeople: "",
          deviceTypes: "",
          acceptanceQuantity: ""
        }
      ],
      form: {
        submissionMark: "",
        applicationStatus: "",
        documentCode: "",
        purchaseDate: "",
        acceptanceDate: "",
        devicename: "",
        specification: "",
        userDepartment: "",
        departmentPeople: "",
        deviceTypes: "",
        acceptanceQuantity: ""
      },
      isAcceptance: false,
      addacceptanceTitle: "",
      activeName: "设备信息",
      rules: {}
    };
  },
  methods: {
    // context menu
    handleSelectionChange: function(sels) {
      window.console.log(sels);
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //fenye
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
    },
    //tabs切换
    toclick(tab, event) {
      window.console.log(tab.label);
      window.console.log(event);
    },
    //deletall
    delectAll() {
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < this.tableData.length; i++) {
            const element = this.tableData[i];
            element.id = i;
          }
          this.checkedBox.forEach(element => {
            this.tableData.forEach((e, i) => {
              if (element.id == e.id) {
                this.tableData.splice(i, 1);
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
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    close(done) {
      this.$refs["form"].resetFields();
      done();
    },
    addNewAcceptance(formName) {
      this.addacceptanceTitle = "新增采购清单";
      this.form = {
        submissionMark: "",
        applicationStatus: "",
        documentCode: "",
        purchaseDate: "",
        acceptanceDate: "",
        devicename: "",
        specification: "",
        userDepartment: "",
        departmentPeople: "",
        deviceTypes: "",
        acceptanceQuantity: ""
      };
      this.resetForm(formName);
      this.isAcceptance = true;
    }
  }
};
</script>

<style lang="less" scope>
.acceptance {
  .el-tabs__item {
    color: rgba(255, 255, 255, 1);
  }
  .el-tabs__item.is-active {
    color: #4094ff;
  }
  .el-tabs__header {
    margin-bottom: 30px;
  }
}
</style>