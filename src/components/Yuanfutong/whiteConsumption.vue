<template>
  <div class="white">
    <div class="current-page-title">
      <span>消费白名单</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore "
                   @click="addNewWhite('form')">新建</el-button>
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
        <el-table-column prop="whitelistName"
                         label="白名单名称">
        </el-table-column>
        <el-table-column prop="startTime"
                         label="开始时间">
        </el-table-column>
        <el-table-column prop="failureTime"
                         label="失效时间">
        </el-table-column>
        <el-table-column prop="configuredMembers"
                         label="所有配置会员">
        </el-table-column>
        <el-table-column prop="enable"
                         label="是否启用">
        </el-table-column>
        <el-table-column prop="contentDescription"
                         label="内容描述">
        </el-table-column>
        <el-table-column prop="creationTime"
                         label="创建时间">
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

    <el-dialog :title="addWhiteTitle"
               :visible.sync="isWhite"
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
              <span>白名单配置</span>
            </div>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="白名单名称:"
                              prop="whitelistName">
                  <el-input v-model="form.whitelistName"
                            autocomplete="off"
                            placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="开始时间:"
                              prop="startTime">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.startTime"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="失效时间:"
                              prop="failureTime">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.failureTime"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="所有配置会员:"
                              prop="configuredMembers">
                  <el-select v-model="form.configuredMembers">
                    <el-option label="是"
                               value="是"></el-option>
                    <el-option label="否"
                               value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用:"
                              prop="enable">
                  <el-select v-model="form.enable">
                    <el-option label="是"
                               value="是"></el-option>
                    <el-option label="否"
                               value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="叠加用户">
                  <el-input type="textarea"
                            v-model="form.text"
                            autocomplete="off"
                            :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="内容描述:"
                              prop="contentDescription">
                  <el-input type="textarea"
                            v-model="form.contentDescription"
                            autocomplete="off"
                            :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24"
                      class="text-aline-center margin-bottom">
                <span class="redWorld">以下重要提示</span>
              </el-col>
              <el-col :span="24"
                      class="precautions">
                <span>注意:</span>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;所有配置会员:是,则包含所有折扣会员里面的启用用户,否则不包含里面的用户</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;叠加用户: 指定的白名单会员账号,用英文的逗号隔开,必须是开通了园付通卡号的会员</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;*请谨慎配置该数据内容,配置后只有白名单才能使用消费功能</p>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="btn-trans"
                   @click="isWhite = false ,resetForm('form')">取 消</el-button>
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
      checkedBox: [],
      searchInput: '',
      listLoading: false,
      tableData: [
        {
          whitelistName: '端午活动',
          startTime: '2020-06-20',
          failureTime: '2020-06-24',
          configuredMembers: '否',
          enable: '是',
          contentDescription: '端午促销买一送一',
          creationTime: '2020-03-12'
        }
      ],
      page: 1,
      pageSize: 10,
      total: 0,
      form: {
        whitelistName: '',
        startTime: '',
        failureTime: '',
        configuredMembers: '',
        enable: '',
        contentDescription: '',
        creationTime: '', text: ''
      },
      isDisabled: false,
      //dialog
      addWhiteTitle: '',
      isWhite: false,
      whiteIndex: '',
      rules: {
        whitelistName: [
          { required: true, message: "请输入名称！", trigger: "blur" },
          { max: 30, message: "请输入名称！", trigger: "blur" }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        failureTime: [
          { required: true, message: '请选择失效时间', trigger: 'change' }
        ],
        configuredMembers: [
          { required: true, message: '请选择配置会员', trigger: 'change' }
        ],
        enable: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        contentDescription: [
          { required: true, message: "请输入内容描述！", trigger: "blur" },
          { min: 1, message: "请输入内容描述！", trigger: "blur" }
        ],
      },
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
    addNewWhite (formName) {
      this.isDisabled = false
      this.addWhiteTitle = '新增白名单'
      this.form = {
        whitelistName: '',
        startTime: '',
        failureTime: '',
        configuredMembers: '',
        enable: '',
        contentDescription: '',
        creationTime: '',
        text: ''
      }
      this.resetForm(formName)
      this.isWhite = true
    },
    //编辑
    editList (index, item) {
      this.isDisabled = false
      this.form = { ...item }
      this.isWhite = true
      this.addWhiteTitle = '编辑白名单'
      this.whiteIndex = index
    },
    showList (index, item) {
      this.isDisabled = true
      this.form = { ...item }
      this.isWhite = true
      this.addWhiteTitle = '查看白名单'
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
    //提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.addWhiteTitle == '新增白名单') {
            this.form.creationTime = this.getTimeNow();
            this.tableData.unshift({ ...this.form });
            this.isWhite = false
          } else if (this.addWhiteTitle == '编辑白名单') {
            this.tableData[this.whiteIndex] = { ...this.form }
            this.isWhite = false
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
.white {
  .text-aline-center {
    text-align: center;
  }
  .redWorld {
    color: #f00;
    font-size: 12px;
  }
  .precautions {
    span,
    p {
      line-height: 20px;
    }
  }
}
</style>