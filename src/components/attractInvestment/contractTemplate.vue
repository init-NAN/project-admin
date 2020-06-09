<template>
  <div class="model">
    <div class="current-page-title">
      <span>合同模板</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="addList btn-addmore"
                   @click="dialogAddList = true">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary"
                   class="del-btn btn-trans"
                   :disabled="this.checkedBox.length == 0"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              v-loading="listLoading"
              @sort-change="handleSortChange"
              :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column label="适用管理区"
                       prop="address">
      </el-table-column>
      <el-table-column prop="name"
                       label="模板名称">
      </el-table-column>
      <el-table-column prop="disc"
                       label="备注"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button type="text"
                     size="small"
                     class="table-del"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button type="text"
                     size="small"
                     class="table-show"
                     @click="filerightDown(index,fileName1)">下载</el-button>
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

    <el-dialog title="新建合同模板"
               :visible.sync="dialogAddList">
      <div class="todolist">
        <el-form :model="form"
                 :rules="rules"
                 ref="form">
          <el-form-item label="模板名称:"
                        :label-width="formLabelWidth"
                        prop="name">
            <el-input v-model="form.name"
                      autocomplete="off"
                      placeholder="请输入模板名称"></el-input>
          </el-form-item>
          <el-form-item label="上传模板文本:"
                        :label-width="formLabelWidth"
                        prop="upload">
            <el-upload ref="upload"
                       :show-upload-list="false"
                       :default-file-list="defaultList"
                       :on-success="handleSuccess"
                       :on-error="handleError"
                       :format="['xlsx','xls']"
                       :max-size="fileSize"
                       :on-format-error="handleFormatError"
                       :on-exceeded-size="handleMaxSize"
                       :before-upload="handleBeforeUpload"
                       action="//jsonplaceholder.typicode.com/posts/"
                       style="display: inline-block;width:58px;">
              <div style="width:100px; color:#0ff">点击上传文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="适用管理区:"
                        :label-width="formLabelWidth"
                        prop="region">
            <el-select v-model="form.region"
                       placeholder="请选择适用管理区">
              <el-option label="明珠城"
                         value="明珠城"></el-option>
              <el-option label="明珠城"
                         value="明珠城"></el-option>
              <el-option label="明珠城"
                         value="明珠城"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:"
                        :label-width="formLabelWidth">
            <el-input v-model="form.name"
                      autocomplete="off"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddList = false"
                   class="btn-trans">取 消</el-button>
        <el-button type="primary"
                   @click="dialogAddList = false"
                   class="btn-addmore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        disc: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        disc: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        disc: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        disc: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1516 弄',
        id: 4
      }],
      listLoading: false,
      isDisabled: true,
      page1: 1,
      dialogAddList: false,
      form: {
        name: '',

      }, rules: {
        name: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
          { min: 1, message: "模板名称不能为空", trigger: "blur" }
        ],
        upload: [
          { required: true, message: "请上传文件", trigger: "change" }
        ],
        region: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      //shangchuan
      fileName: '',
      fileTemArr: ['购买明细表', '索赔记录表'],
      fileSize: 10,
      defaultList: [],
      total: 4,
      page: 1,
      pageSize: 10,
      checkedBox: [],
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
    handleSelectionChange (sels) {
      window.console.log(sels)
      this.checkedBox = sels;
      //console.log(this.ids);
    },
    delectAll () {
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
    //download
    filerightDown (index, fileName1) {//index 接口参数  fileName文件名字
      // var _this = this;
      var fileName = fileName1;
      this.$http({
        method: "post",
        // url: this.HOST + api.download,
        params: {
          fileId: index
        },
        responseType: 'arraybuffer'
      })
        .then(res => {
          this.download(res.data, fileName);
        })
        .catch(req => {
          window.console.log("下载失败", req);
        });
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //shangchuan
    handleSuccess (res, file) {
      if (res.errcode === 0) {
        window.console.log(file)
        this.$Message.success("数据导入成功！")
        this.$refs.upload.clearFiles()
      }
    },
    handleError (error, file) {
      this.$Message.error("数据导入失败！")
      window.console.log(error)
      window.console.log(file)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小错误',
        desc: 'File  ' + file.name + ' 文件大小不得超过' + this.fileSize + 'M'
      });
    },
    pro (file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$Notice.warning({
            title: '文件名称错误',
            desc: 'File  ' + file.name
          });
          reject(new Error('err'))
        }, 100)
      })
    },
    //阻止上传//上传前判断用户选择的模板与实际上传的模板是否相同（文件名判断）
    handleBeforeUpload (file) {
      let name = '';
      if (file.name) {
        // name = file.name.replace(/\s/g,"").split('.')[0]
        name = file.name.split('.')[0]
        alert(name)
        if (name !== this.fileName) {
          return this.pro(file)
        }
      }
    }

  }
}

</script>

<style lang="less" scope>
// .el-table {
//   /* 表格字体颜色 */
//   font-size: 13px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(158, 162, 192, 1);
//   line-height: 18px;
//   /* 表格边框颜色 */
//   /* border: 0.5px solid #758a99; */
// }
// .model /deep/ .el-table__row > td {
//   /* 去除表格线 */
//   border: none;
// }
// .model /deep/ .el-table th.is-leaf {
//   /* 去除上边框 */
//   border: none;
// }
// .el-table th {
//   background-color: transparent;
//   font-size: 13px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(255, 255, 255, 1);
//   line-height: 18px;
// }
// .el-table--enable-row-hover .el-table__body tr:hover > td {
//   background-color: rgba(0, 0, 0, 0) !important;
// }
// .model /deep/ .el-table--fit {
//   padding: 20px;
// }
// .model /deep/ .el-table,
// .el-table__expanded-cell {
//   background-color: transparent;
// }

// .model /deep/ .el-table tr {
//   background-color: transparent !important;
// }
// .model /deep/ .el-table--enable-row-transition .el-table__body td,
// .el-table .cell {
//   background-color: transparent;
// }
// .el-table--border::after,
// .el-table--group::after,
// .el-table::before {
//   background-color: transparent;
// }
// .el-table--striped .el-table__body tr.el-table__row--striped td {
//   background-color: rgba(158, 162, 192, 0.05);
// }
// // fenye
// .pager-box {
//   text-align: right;
// }
// .pager-box /deep/ button,
// .pager-box /deep/ .el-pager li {
//   background-color: transparent !important;
// }
// .pager-box
//   /deep/
//   .el-pagination.is-background
//   .el-pager
//   li:not(.disabled).active {
//   background-color: #0ffff3 !important;
// }
// .pager-box /deep/ .btn-next,
// .btn-prev {
//   color: #fff;
// }
// .pager-box /deep/.el-pagination {
//   color: rgba(255, 255, 255, 1);
// }
// .pager-box /deep/ button {
//   color: rgba(255, 255, 255, 1);
// }
// .pager-box /deep/.el-pagination button:disabled {
//   color: rgba(0, 0, 0, 0.35);
// }
// .pager-box /deep/ .el-pager {
//   color: rgba(255, 255, 255, 0.65);
// }
// .el-select .el-input.is-focus .el-input__inner,
// .el-pagination__sizes .el-input .el-input__inner:hover,
// .el-select .el-input__inner:focus {
//   border-color: #fff;
//   background-color: transparent;
// }
// .el-dialog {
//   margin-top: 0;
//   background-color: rgba(10, 13, 51, 0.7);
//   color: #fff;
//   width: 1200px;
//   transform-origin: 1281px 246px;
//   .el-dialog__title {
//     color: #fff;
//   }
// }

.model {
  position: relative;
  .el-dialog {
    margin-top: 0;
    background-color: rgba(10, 13, 51, 0.7);
    color: #fff;
    width: 1200px;
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
      text-align: left;
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
    /deep/ .el-dialog__header {
      background: url("./../../assets/comment/type(1).png") no-repeat;
    }
  }

  // .addList,
  // .del-btn {
  //   position: absolute;
  // }
  // .addList {
  //   top: 15px;
  //   right: 120px;
  // }
  // .del-btn {
  //   top: 15px;
  //   right: 0;
  // }

  .todolist {
    min-height: 200px;
    text-align: left;
    padding: 30px;
    padding-left: 80px;
    padding-right: 200px;
  }
  .el-form-item__label {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

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