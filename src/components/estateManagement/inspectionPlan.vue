<template>
  <div class="inspectionPlan">
    <div class="current-page-title">
      <span>保养巡检计划</span>
    </div>
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore"
                   @click="isInspection = true,form = {},inspectionTitle = '新建巡检计划',resetForm ('form')">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0'
                   class="btn-trans"
                   @click="delectAll()">批量删除</el-button>
      </el-col>
      <el-col :span="6"
              :offset="7">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2"
              :offset="1">
        <el-button type="text">高级搜索</el-button>
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
                         label="计划名称"
                         width="150"></el-table-column>

        <el-table-column prop="dateValidity"
                         label="计划有效期"
                         width="150"></el-table-column>
        <el-table-column prop="insName"
                         label="设备名称"
                         width="150"></el-table-column>
        <el-table-column prop="status"
                         label="设备类型"
                         width="150"></el-table-column>
        <el-table-column prop="insType"
                         label="规格型号"
                         width="150"></el-table-column>
        <el-table-column prop="frequency"
                         label="保养频率"
                         width="150"></el-table-column>
        <el-table-column prop="dat"
                         label="保养次数"
                         width="150"></el-table-column>
        <el-table-column prop="people"
                         label="经办人"
                         width="150"></el-table-column>
        <el-table-column prop="where"
                         label="保养地点"
                         width="150"></el-table-column>
        <el-table-column prop="crDate"
                         label="创建日期"
                         width="150"></el-table-column>
        <el-table-column prop="label"
                         label="状态"
                         width="150"></el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         width="130">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       class="table-change"
                       @click.native.prevent="editList(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.$index,scope.row)"
                       size="small">
              {{scope.row.label=='已启用'?'停止':''}}
            </el-button>
            <el-button type="text"
                       size="small"
                       class="table-change"
                       @click.native.prevent="editList(scope.$index, scope.row)">复制</el-button>
          </template>
        </el-table-column>

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

    <el-dialog :title="inspectionTitle"
               :visible.sync="isInspection"
               :before-close="closeInspection">
      <!-- <el-dialog title="添加"
                 :visible.sync="addPerson"
                 class="addPerson">
        <el-transfer filterable
                     :filter-method="filterMethod"
                     filter-placeholder="请输入城市拼音"
                     v-model="value"
                     :data="data">
        </el-transfer>
      </el-dialog> -->
      <div class="add-files">
        <el-card class="box-card margin-bottom">

          <el-form :model="form"
                   :rules="rules"
                   label-position='left'
                   label-width="auto"
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="管理区:"
                              prop="management">
                  <el-select v-model="form.management"
                             placeholder="请选择区域">
                    <el-option label="明珠城"
                               value="明珠城"></el-option>
                    <el-option label="绿岛物业"
                               value="绿岛物业"></el-option>
                    <el-option label="其他"
                               value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="计划名称:"
                              prop="name">
                  <el-input v-model="form.name"
                            placeholder="请输入名称"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="计划有效期:">
                  <el-date-picker v-model="form.dateValidity"
                                  type="datetimerange"
                                  range-separator="~"
                                  format="yyyy-MM-dd HH:mm:ss"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="设备名称:">
                  <el-select v-model="form.insName"
                             placeholder="">
                    <el-option label="暂无数据"
                               value="暂无数据"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="设备类型:">
                  <el-input v-model="form.status"
                            autocomplete="off"
                            disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="保养类型:">
                  <el-select v-model="form.type"
                             placeholder="">
                    <el-option label="日常保养"
                               value="日常保养"></el-option>
                    <el-option label="设备巡检"
                               value="设备巡检"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="保养频率:">
                  <el-select v-model="form.frequency"
                             placeholder="">
                    <el-option label="每日"
                               value="每日"></el-option>
                    <el-option label="每周"
                               value="每周"></el-option>
                    <el-option label="每月"
                               value="每月"></el-option>
                    <el-option label="每年"
                               value="每年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="保养:">
                  <el-input v-model="form.dat"
                            placeholder="请输入"
                            autocomplete="off">
                    <template slot="append">次</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="经办人:">
                  <el-input v-model="form.people"
                            autocomplete="off"
                            @focus="addPerson=true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="预算费用:">
                  <el-input v-model="form.money"
                            placeholder="请输入"
                            autocomplete="off">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="核查人:">
                  <el-input v-model="form.verifier"
                            autocomplete="off"
                            @focus="addPerson=true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="创建人:">
                  <el-select v-model="form.created"
                             placeholder="">
                    <el-option label="企业版"
                               value="企业版"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="保养地点:">
                  <el-input v-model="form.where"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="备注:">
                  <el-input type="textarea"
                            v-model="form.desc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item prop="label"
                              label="保养状态:">
                  <el-select v-model="form.label"
                             placeholder="">
                    <el-option label="已启用"
                               value="已启用"></el-option>
                    <el-option label="已停用"
                               value="已停用"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isInspection = false"
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
    // const generateData = () => {
    //   const data = [];
    //   const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
    //   const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
    //   cities.forEach((city, index) => {
    //     data.push({
    //       label: city,
    //       key: index,
    //       pinyin: pinyin[index]
    //     });
    //   });
    //   return data;
    // };
    return {
      //穿梭框
      // data: generateData(),
      // value: [],
      // filterMethod (query, item) {
      //   return item.pinyin.indexOf(query) > -1;
      // },

      inspectionTitle: '',
      checkedBox: [],
      input: '',
      isInspection: false,
      listLoading: false,
      addPerson: false,
      tableData: [{
        management: '绿岛物业1',
        insName: '水泵机',
        dateValidity: '2016-05-02',
        name: '水泵机',
        status: '保养类型',
        insType: '日常保养',
        how: '排水设备',
        frequency: '每日',
        people: '企业版',
        mounth: '0',
        dat: 1,
        where: '1栋',
        crDate: '2016-05-02',
        label: '已启用',
        id: 1
      }, {
        management: '绿岛物业2',
        insName: '水泵机',
        dateValidity: '2016-05-02',
        name: '水泵机',
        status: '保养类型',
        insType: '日常保养',
        how: '排水设备',
        frequency: '每日',
        people: '企业版',
        mounth: '0',
        dat: 1,
        where: '1栋',
        crDate: '2016-05-02',
        label: '已启用',
        id: 2
      },],
      total: 0,
      page: 1,
      pageSize: 10,
      form: {},
      rules: {
        management: [
          { required: true, message: "请选择管理区", trigger: "change" },

        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" },
          { min: 1, message: "名称不能为空", trigger: "blur" }
        ],
        label: [{ required: true, message: "请选择状态", trigger: "change" },]
      },
      inspectionIndex: '',
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
    searchDevice () {
      this.page = 1;
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
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    //计数器
    // handleChange (value) {
    //   console.log(value);
    // },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    closeInspection (done) {
      this.$refs['form'].resetFields();
      done();
    },
    editList (index, item) {
      // window.console.log(item)
      // window.console.log(index)
      this.isInspection = true
      this.form = { ...item }
      this.inspectionIndex = index
      // window.console.log(this.form)
      this.inspectionTitle = '编辑巡检计划'
    },
    handleDelete (index, row) {
      window.console.log('row' + row)
      window.console.log(index)
      this.$confirm("永久停用该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData[index].label = '已停用';
          this.$message({
            type: "success",
            message: "停用成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用"
          });
        });
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit')
          if (this.inspectionTitle == '新建巡检计划') {
            this.tableData.unshift({ ...this.form });
            this.isInspection = false
          } else if (this.inspectionTitle == '编辑巡检计划') {
            this.tableData[this.inspectionIndex] = { ...this.form }
            this.isInspection = false
          } else {
            this.$message('页面已关闭')
            this.isInspection = false
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
.el-dialog {
  width: 900px;
}
</style>