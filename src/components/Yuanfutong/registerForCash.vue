<template>
  <div class="">
    <div class="current-page-title">
      <span>收银机注册</span>
    </div>

    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore"
                   @click="addBusiness('form')">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
      <el-col :span="6"
              :offset="10">
        <el-input v-model="input"
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
                @selection-change="handleSelectionChange"
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="equipmentNumber"
                         label="设备编号"></el-table-column>
        <el-table-column prop="equipmentName"
                         label="设备名称"></el-table-column>
        <el-table-column prop="affiliatedBusinesses"
                         label="所属商家"></el-table-column>
        <el-table-column prop="deviceKey"
                         label="设备key"></el-table-column>
        <el-table-column label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-show"
                       @click="editList(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            <el-button type="text"
                       class="table-show">商家收款码</el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="dState"
                         label="合同状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.dState"
                       :active-value=0
                       :inactive-value=1
                       @change="onoffDevice($event,scope.row,4)"
                       active-color="#13ce66"
                       inactive-color="#ff4949" />
          </template>
        </el-table-column> -->

      </el-table>
    </section>

    <Pagings :total="total"
             :page="page"
             :pageSize="pageSize"
             @handleSizeChangeSub="handleSizeChange"
             @handleCurrentChangeSub="handleCurrentChange"></Pagings>

    <el-dialog :title="addRegisterTitle"
               :visible.sync="isRegister"
               :before-close="close"
               width="600px">
      <div class="add-files">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 label-width="100px"
                 label-position="left">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>商家信息</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="所属商家:"
                              prop="affiliatedBusinesses">
                  <el-select v-model="form.affiliatedBusinesses"
                             placeholder="请选择所属商家">
                    <el-option v-for="(item,index) in affiliatedBusinessesOption"
                               :label="item.label"
                               :key="index"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="设备名称:"
                              prop="equipmentName">
                  <el-input v-model="form.equipmentName"
                            autocomplete="off"
                            placeholder="请输入商家手机号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="设备编号:"
                              prop="equipmentNumber">
                  <el-input v-model="form.equipmentNumber"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="设备key:">
                  <el-input v-model="form.deviceKey"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="店铺类型:">
                  <el-input v-model="form.shopType"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <span>店铺类型,如:餐厅消费、小卖部、咖啡厅</span>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="resetForm('form')">取 消</el-button>
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
      listLoading: false,
      tableData: [
        {
          affiliatedBusinesses: '喜茶',
          equipmentNumber: '21312',
          equipmentName: '支付宝1号',
          deviceKey: '0e3d34asd234e099423das',
          shopType:'奶茶店',
          id: 1
        }

      ],
      checkedBox: [],
      input: '',
      page: 1,
      pageSize: 10,
      total: 0,
      form: {},
      isRegister: false,
      addRegisterTitle: '',
      businessIndex: [],
      rules: {
        affiliatedBusinesses: [
          { required: true, message: "请选择所属商家!", trigger: "change" }
        ],
        equipmentName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        equipmentNumber: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      affiliatedBusinessesOption: [
        {
          label: 'ccc',
          value: 'ccc'
        }
      ]
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
    addBusiness (formName) {
      this.addBusinessTitle = '新增商家'
      this.form = {}
      this.resetForm(formName)
      this.isRegister = true
    },
    //编辑
    editList (index, item) {
      this.form = { ...item }
      this.isRegister = true
      this.addBusinessTitle = '编辑商家'
      this.businessIndex = index
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
          if (this.addBusinessTitle == '新增商家') {
            this.tableData.unshift({ ...this.form });
            this.isRegister = false
          } else if (this.addBusinessTitle == '编辑商家') {
            this.tableData[this.businessIndex] = { ...this.form }
            this.isRegister = false
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

<style>
</style>