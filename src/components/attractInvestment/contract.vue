<template>
  <div class="contract">
    <div class="current-page-title">
      <span>合同列表</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore"
                   @click="isInspection = true,form = {},inspectionTitle = '新建巡检计划',resetForm ('form')">新建合同</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="contract"
              v-loading="listLoading"
              ref="table"
              @selection-change="handleSelectionChange"
              @sort-change="handleSortChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="area"
                       label="管理区"></el-table-column>

      <el-table-column prop="num"
                       label="合同编号"></el-table-column>

      <el-table-column prop="name"
                       label="合同名称"></el-table-column>

      <el-table-column prop="peoName"
                       label="租户姓名"></el-table-column>

      <el-table-column prop="num"
                       label="资源代码"></el-table-column>

      <el-table-column prop="per"
                       label="收费标准"></el-table-column>

      <el-table-column prop="date"
                       label="费用应收日期"></el-table-column>

      <el-table-column prop="long"
                       label="费用周期"></el-table-column>

      <el-table-column prop="how"
                       label="应收金额"></el-table-column>

      <el-table-column prop="now"
                       label="已缴金额"></el-table-column>

      <el-table-column prop="tui"
                       label="退款金额"></el-table-column>

      <el-table-column prop="less"
                       label="欠费金额"></el-table-column>

      <el-table-column label="操作">

        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     class="table-show"
                     @click="showRole(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     size="small"
                     class="table-del"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="addDialogTitle"
               :visible.sync="addCustomerVisibel"
               :before-close="closeForm">
      <div class="flex-space-between____c">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>卡片名称</span>
          </div>
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="客户名称:"
                              prop="name">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所属行业:"
                              prop="industry">
                  <el-select v-model="form.industry">
                    <el-option label="餐饮"
                               value="餐饮"
                               selected></el-option>
                    <el-option label="IT"
                               value="IT"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="客户状态:"
                              prop="status">
                  <el-select v-model="form.status"
                             placeholder="请选择客户状态">
                    <el-option label="潜在客户"
                               value="潜在客户"></el-option>
                    <el-option label="签约客户"
                               value="签约客户"></el-option>
                    <el-option label="流失客户"
                               value="流失客户"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系人:">
                  <el-input v-model="form.contacts"
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
                                  v-model="form.date"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="来源渠道:">
                  <el-select v-model="form.source"
                             placeholder="请选择来源渠道">
                    <el-option label="上门"
                               value="上门"></el-option>
                    <el-option label="电话"
                               value="电话"></el-option>
                    <el-option label="网络"
                               value="网络"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="销售阶段:">
                  <el-select v-model="form.stage"
                             placeholder="请选择销售阶段">
                    <el-option label="初期沟通"
                               value="初期沟通"></el-option>
                    <el-option label="房源选择"
                               value="房源选择"></el-option>
                    <el-option label="价格谈判"
                               value="价格谈判"></el-option>
                    <el-option label="合同签约"
                               value="合同签约"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="客户需求:">
                  <el-input v-model="form.demand"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="备注:">
                  <el-input type="textarea"
                            v-model="form.remarks"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="resetForm('form')"
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
      contract: [{
        date: '2016-05-02',
        name: '名称',
        area: '上海市普陀区',
        num: '1231222',
        peoName: '王小虎',
        per: '0',
        long: '一年',
        how: '100000',
        now: '12322',
        tui: '0',
        less: '23123',
        id: 1
      }, {
        date: '2016-05-02',
        name: '名称',
        area: '上海市普陀区',
        num: '1231222',
        peoName: '王小虎2',
        per: '0',
        long: '一年',
        how: '100000',
        now: '12322',
        tui: '0',
        less: '23123',
        id: 2
      }, {
        date: '2016-05-02',
        name: '名称',
        area: '上海市普陀区',
        num: '1231222',
        peoName: '王小虎3',
        per: '0',
        long: '一年',
        how: '100000',
        now: '12322',
        tui: '0',
        less: '23123',
        id: 3
      },],
      page1: 1,
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,

      checkedBox: [],
      form:{},
      
      
      
      rules: {
        name: [
          { required: true, message: "请输入客户名称，不超过30个字符！", trigger: "blur" },
          { max: 30, message: "请输入客户名称，不超过30个字符！", trigger: "blur" }
        ],
        industry: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择客户状态', trigger: 'change' }
        ]
      },
      addDialogTitle:'123x ',
      addCustomerVisibel:true,
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
          this.contract.splice(index, 1);
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
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    //piliangshanchu
    delectAll () {
      for (let i = 0; i < this.contract.length; i++) {
        const element = this.contract[i];
        element.id = i
      }
      this.checkedBox.forEach(element => {
        this.contract.forEach((e, i) => {

          if (element.id == e.id) {
            this.contract.splice(i, 1)
          }
        });
      });
    },
    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
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
  }
}

</script>

<style lang="less">
.contract {
  .el-dialog {
    margin-top: 0;
    background-color: rgba(10, 13, 51, 0.7);
    color: #fff;
    transform-origin: 1281px 246px;
    .el-dialog__title {
      color: #fff;
    }
  }
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
  // .el-table .cell {
  //   white-space: nowrap; //强制不换行
  //   overflow: hidden; //溢出隐藏
  //   text-overflow: ellipsis; //替换为省略号
  // }
  //dialog 页眉页脚
  /deep/ .el-dialog__header {
    background: url("./../../assets/comment/type(1).png") no-repeat;
    padding: 10px 20px 10px;
  }
  /deep/ .el-dialog__footer {
    background: url("./../../assets/comment/type(2).png") no-repeat right;
    padding: 50px 20px 20px;
  }
}
</style>