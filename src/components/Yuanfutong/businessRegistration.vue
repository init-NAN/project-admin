<template>
  <div class="businessRegistration">
    <div class="current-page-title">
      <span>商家注册</span>
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
        <el-table-column prop="businessName"
                         label="商家名称"></el-table-column>
        <el-table-column prop="businessCode"
                         label="商家编码"></el-table-column>
        <el-table-column prop="businessPhone"
                         label="商家电话"></el-table-column>
        <el-table-column prop="businessAddress"
                         label="商家地址"></el-table-column>
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
                       class="table-show">生成二维码</el-button>
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

    <el-dialog :title="addBusinessTitle"
               :visible.sync="isBusiness"
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
                <el-form-item label="商家名称:"
                              prop="businessName">
                  <el-input v-model="form.businessName"
                            autocomplete="off"
                            placeholder="请输入商家名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="商家手机号:"
                              prop="businessPhone">
                  <el-input v-model="form.businessPhone"
                            autocomplete="off"
                            placeholder="请输入商家手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商家编码:">
                  <el-input v-model="form.businessCode"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="商家地址:"
                              prop="businessAddress">
                  <el-input v-model="form.businessAddress"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="商城用户:">
                  <el-input v-model="form.mallUsers"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商城用户密码:">
                  <el-input v-model="form.mallUsersPassword"
                            autocomplete="off"
                            show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="isBusiness = false ,resetForm('form')">取 消</el-button>
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
          businessName: '喜茶',
          businessCode: '159203923810283409',
          businessPhone: '13284934920',
          businessAddress: '上海市虹梅路122号',
          id:1
        }

      ],
      checkedBox: [],
      input: '',
      page: 1,
      pageSize: 10,
      total: 0,
      form: {},
      isBusiness: false,
      addBusinessTitle: '',
      businessIndex:[],
      rules: {
        businessName: [
          { required: true, message: '请输入商家名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        businessPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18|17)[0-9]{9}",
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        businessAddress: [
          { required: true, message: '请输入商家地址', trigger: 'blur' }
        ],
      }
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
      this.isBusiness = true
    },
    //编辑
    editList (index, item) {
      this.form = { ...item }
      this.isBusiness = true
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
            this.isBusiness = false
          }else if (this.addBusinessTitle == '编辑商家') {
            this.tableData[this.businessIndex] = { ...this.form }
            this.isBusiness = false
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

<style lang="less">
.businessRegistration {
}
</style>