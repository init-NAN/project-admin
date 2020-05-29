<template>
  <div class="equipmentFiles">
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore "
                   @click="isEquipment = true">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="btn-addmore ">导入Excel</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans">批量删除</el-button>
      </el-col>
      <el-col :span="6"
              :offset="7">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="3">
        <span>高级搜索</span>
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
        <el-table-column prop="management"
                         label="管理区"
                         width="200"></el-table-column>

        <el-table-column prop="name"
                         label="设备名称"
                         width="150"></el-table-column>

        <el-table-column prop="num"
                         label="设备编码"
                         width="150"></el-table-column>
        <el-table-column prop="type"
                         label="设备类型"
                         width="150"></el-table-column>
        <el-table-column prop="good"
                         label="设备状态"
                         width="150"></el-table-column>
        <el-table-column prop="how"
                         label="规格型号"
                         width="150"></el-table-column>
        <el-table-column prop="mounth"
                         label="已用月数"
                         width="150"></el-table-column>
        <el-table-column prop="dat"
                         label="已有保养次数"
                         width="150"></el-table-column>
        <el-table-column prop="deviceNo"
                         label="已有维修次数"
                         width="150"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       class="table-show"
                       @click="isEquipment = true">编辑</el-button>
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.row)"
                       size="small">删除</el-button>
            <el-button type="text"
                       size="small"
                       class="table-show"
                       @click="isEquipment = true">复制</el-button>
            <el-button type="text"
                       class="table-show"
                       size="small">查看二维码</el-button>
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

    <el-dialog title="新建设备档案"
               :visible.sync="isEquipment">
      <div class="add-files">
        <el-card class="box-card margin-bottom">
          <div slot="header"
               class="clearfix">
            <span>基本信息</span>
          </div>
          <el-form :model="form"
                   :rules="rules"
                   hide-required-asterisk
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="管理区:">
                  <el-select v-model="form.tpye"
                             placeholder="请选择区域">
                    <el-option label="明珠城"
                               value="shanghai"></el-option>
                    <el-option label="绿岛物业"
                               value="beijing"></el-option>
                    <el-option label="其他"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="设备名称:">
                  <el-input v-model="form.name"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="设备编码:">
                  <el-input v-model="form.num"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="设备类型:">
                  <el-select v-model="form.tpye"
                             placeholder="请选择活动区域">
                    <el-option label="供电"
                               value="shanghai"></el-option>
                    <el-option label="消防"
                               value="beijing"></el-option>
                    <el-option label="空调"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="特殊资源"
                              prop="resource">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="正常"></el-radio>
                    <el-radio label="故障"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="规格型号:">
                  <el-input v-model="form.wornum"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预计保养周期:">
                  <el-select v-model="form.tpye"
                             placeholder="请选择保养周期">
                    <el-option label="日"
                               value="shanghai"></el-option>
                    <el-option label="周"
                               value="beijing"></el-option>
                    <el-option label="月"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="材料:">
                  <el-input v-model="form.liao"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="重量(Kg):">
                  <el-input-number v-model="num"
                                   controls-position="right"
                                   @change="handleChange"
                                   :min="1"
                                   :max="9999"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="安装地点:">
                  <el-input v-model="form.dat"
                            autocomplete="off"
                            placeholder="请输入安装地点"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-card>
        <el-card class="box-card margin-bottom">
          <div slot="header"
               class="clearfix">
            <span>使用情况</span>
          </div>
          <el-form :model="form"
                   hide-required-asterisk
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="安装日期:">
                  <el-date-picker type="date"
                                  placeholder="请选择日期"
                                  v-model="form.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报废日期:">
                  <el-date-picker type="date"
                                  placeholder="请选择日期"
                                  v-model="form.date2"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="使用年限:">
                  <el-input v-model="form.years"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已用月数:">
                  <el-input v-model="form.mounth"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="已有维修次数:">
                  <el-input v-model="form.fix"
                            autocomplete="off"
                            placeholder="请输入已有维修次数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已有保养次数:">
                  <el-input v-model="form.help"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="设备原值:">
                  <el-input v-model="form.ogher"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="已提旧值:">
                  <el-input v-model="form.old"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="设备净值:">
                  <el-input v-model="form.ower"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>维保单位</span>
          </div>
          <el-form :model="form"
                   hide-required-asterisk
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="维保单位:">
                  <el-input v-model="form.work"
                            autocomplete="off"
                            placeholder="请输入维保单位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="维保单位电话:">
                  <el-input v-model="form.workNum"
                            autocomplete="off"
                            placeholder="请输入维保单位电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="维保单位地址:">
                  <el-input v-model="form.wordAdress"
                            autocomplete="off"
                            placeholder="请输入维保单位地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="设备维保人:">
                  <el-input v-model="form.peo"
                            autocomplete="off"
                            placeholder="请输入设备维保人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产厂家:">
                  <el-input v-model="form.Manufacturer"
                            autocomplete="off"
                            placeholder="请输入生产厂家"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="厂家地址:">
                  <el-input v-model="form.address"
                            autocomplete="off"
                            placeholder="请输入厂家地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isEquipment = false"
                   class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: false,
      isDisabled: true,
      num: 1,
      tableData: [{
        management: '绿岛物业',
        num: '1#',
        date: '2016-05-02',
        name: '曳引驱动乘客电梯1',
        type: '乘客电梯',
        good: '正常',
        how: 'dec2',
        mounth: '0',
        dat: 0,
        deviceNo: 0
      }, {
        management: '绿岛物业',
        num: '1#',
        date: '2016-05-02',
        name: '曳引驱动乘客电梯1',
        type: '乘客电梯',
        good: '正常',
        how: 'dec2',
        mounth: '0',
        dat: 0,
        deviceNo: 0
      }, {
        management: '绿岛物业',
        num: '1#',
        date: '2016-05-02',
        name: '曳引驱动乘客电梯1',
        type: '乘客电梯',
        good: '正常',
        how: 'dec2',
        mounth: '0',
        dat: 0,
        deviceNo: 0
      },],
      isEquipment: false,
      checkedBox: [],
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
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
    }
  },
  methods: {
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

    //biaodan 
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
    //计数器
    handleChange (value) {
      console.log(value);
    }
  }
}
</script>

<style lang="less" scope>
//模态框
.equipmentFiles {
  .el-dialog {
    width: 1200px;
  }
}
</style>