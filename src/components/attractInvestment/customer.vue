<template>
  <div class="customer">

    <el-table :data="tableData"
              resizable
              ref="table"
              v-loading="listLoading"
              @selection-change="handleSelectionChange"
              @sort-change="handleSortChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column prop="name"
                       label="客户名称">
      </el-table-column>
      <el-table-column prop="tip"
                       label="所属行业">
      </el-table-column>
      <el-table-column prop="people"
                       label="联系人">
      </el-table-column>
      <el-table-column prop="tel"
                       label="联系电话">
      </el-table-column>
      <el-table-column prop="date"
                       label="来访时间">
      </el-table-column>
      <el-table-column prop="help"
                       label="客户需求">
      </el-table-column>
      <el-table-column prop="where"
                       label="意向房源">
      </el-table-column>
      <el-table-column prop="from"
                       label="来源">
      </el-table-column>
      <el-table-column prop="what"
                       label="客户状态">
      </el-table-column>
      <el-table-column prop="from"
                       label="销售阶段">
      </el-table-column>
      <el-table-column prop="from"
                       label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary"
                   @click="showRole(scope.row)">编辑</el-link>
          <el-link type="primary"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-link>
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
    <el-button type="primary"
               class="add-customer"
               @click="dialogFormVisible=true">新建用户</el-button>
    <el-dialog title="新建/编辑用户"
               :visible.sync="dialogFormVisible">
      <div class="flex-space-between____c">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>卡片名称</span>
          </div>
          <el-form :model="form"
                   :rules="rules"
                   hide-required-asterisk
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="客户名称:">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所属行业:">
                  <el-select v-model="form.region">
                    <el-option label="餐饮"
                               value="shanghai"
                               selected></el-option>
                    <el-option label="IT"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="客户状态:">
                  <el-select v-model="form.tpye"
                             placeholder="请选择活动区域">
                    <el-option label="潜在客户"
                               value="shanghai"></el-option>
                    <el-option label="签约客户"
                               value="beijing"></el-option>
                    <el-option label="流失客户"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系人:">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="联系电话:">
                  <el-input v-model="form.tel"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="来访时间:">
                  <el-date-picker type="date"
                                  placeholder="选择时间"
                                  v-model="form.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="来源渠道:">
                  <el-select v-model="form.region"
                             placeholder="请选择活动区域">
                    <el-option label="上门"
                               value="shanghai"></el-option>
                    <el-option label="电话"
                               value="beijing"></el-option>
                    <el-option label="网络"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="销售阶段:">
                  <el-select v-model="form.region"
                             placeholder="请选择活动区域">
                    <el-option label="初期沟通"
                               value="shanghai"></el-option>
                    <el-option label="房源选择"
                               value="beijing"></el-option>
                    <el-option label="价格谈判"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="联系电话:">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="备注:">
                  <el-input type="textarea"
                            v-model="form.desc"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>意向房源</span>
          </div>
          <el-button class="addChose">+添加</el-button>
          <div class="digo-list-title">
            <p>时代佳苑(住宅)</p>
            <el-table :data="tableData"
                      resizable
                      ref="table"
                      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
              <el-table-column prop="date"
                               label="楼栋/房号">
              </el-table-column>
              <el-table-column prop="name"
                               label="面积">
              </el-table-column>
              <el-table-column prop="address"
                               label="房间状态">
              </el-table-column>
              <el-table-column prop="address"
                               label="空置时间">
              </el-table-column>
              <el-table-column prop="address">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                             type="text"
                             size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      listLoading:false,
      page1: 1,
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }, rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18|17)[0-9]{9}",
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 6, message: "验证码必须为6位", trigger: "blur" }
        ]
      },
      total: 4,
      page: 1,
      pageSize: 10,
    }
  },
  methods: {
    handleEdit (index, row) {
      window.console.log(index, row);
    },
    handleDelete (index, row) {
      // 设置类似于console类型的功能
      window.console.log(row)
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
      this.sels = sels;
      this.ids = _.map(this.sels, (device) => device.deviceNo);
      //console.log(this.ids);
    },
    handleSortChange (col) {
      if (col.prop == null) {
        return;
      }
      this.order = (col.order === 'ascending') ? 'asc' : 'desc';
      this.sort = col.prop;
      this.searchDevice();
    },
    searchDevice () {
      this.page = 1;
      this.getDeviceList();
    },
    getDeviceList () {

      var searchParams = _.omitBy(this.searchForm, (item) => item == "" || _.isNil(item));
      searchParams.page = this.page - 1;
      searchParams.size = this.pageSize;
      searchParams.sort = this.sort;//"deviceNo";
      searchParams.order = this.order;//"asc";

      this.listLoading = true;
      AdminAPI.searchDevice(searchParams).then(({
        data: jsonData
      }) => {
        if (jsonData.status === 0) {
          this.total = jsonData.data.total;
          this.devices = jsonData.data.content;
          this.total = jsonData.data.totalElements;
          this.listLoading = false;
        } else {
          this.$message({
            messsage: `获取设备列表失败:${data.msg}`,
            type: 'error'
          })
        }
      });
    },

    showRole (item) {
      window.console.log(item);

      this.dialogFormVisible = true;
    },

  }
}

</script>

<style lang="less" scope>
//模态框
.el-dialog {
  margin-top: 0;
  background-color: rgba(10, 13, 51, 0.7);
  color: #fff;
  width: 1200px;
  transform-origin: 1281px 246px;
  .el-dialog__title {
    color: #fff;
  }
  /deep/ .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
}

.customer {
  //   position: relative;
  .flex-space-between____c {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-card {
      width: 570px;
      height: 704px;

      .addChose {
        width: 100%;
      }

      .digo-list-title {
        margin-top: 25px;
      }
    }
    .el-select {
      width: 100%;
    }
    /deep/ .el-card__header {
      border: none;
      color: #fff;
    }
    /deep/ .el-card {
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
      .el-form {
        .el-form-item__label {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  // .add-customer {
  //   position: absolute;
  //   top: -20px;
  //   right: 0;
  // }

  //dialog 页眉页脚
  /deep/ .el-dialog__header {
    background: url("./../../assets/comment/type(1).png") no-repeat;
    padding: 10px 20px 10px;
  }
   /deep/ .el-dialog__footer {
     background: url('./../../assets/comment/type(2).png') no-repeat right;
     padding: 50px 20px 20px;
  }
}
</style>