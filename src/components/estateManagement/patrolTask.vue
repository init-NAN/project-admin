<template>
  <div class="patrolTask">
    <div class="current-page-title">
      <span>巡查任务</span>
    </div>
    <el-row>
      <ul class="ul-list margin-bottom">
        <span class="type-title">状态:</span>
        <li :class="activeClass == index ? 'active':''"
            v-for="(itme,index) in itmeList"
            :key="index"
            @click="getItme(index)">
          {{itme}}
        </li>
      </ul>
    </el-row>
    <el-form :model="checkForm"
             label-width="auto"
             label-position="left"
             ref="checkForm">
      <el-row :gutter="30"
              class="margin-bottom">
        <el-col :span="6">
          <el-form-item label="管理区:">
            <el-select v-model="checkForm.tpye"
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
        <el-col :span="6">
          <el-form-item label="经办人:">
            <el-select v-model="checkForm.who"
                       placeholder="请选择核查人">
              <el-option label="维修工岗位"
                         value="维修工岗位"></el-option>
              <el-option label="投诉处理岗位"
                         value="投诉处理岗位"></el-option>
              <el-option label="测试岗位"
                         value="测试岗位"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="计划开始日期:">
            <el-date-picker v-model="checkForm.rageDate"
                            type="daterange"
                            range-separator="~"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5"
                v-if="isMore">
          <el-button class="btn-addmore">查询</el-button>
          <el-button class="btn-addmore">重置</el-button>
          <el-button type="text"
                     @click="isMore = false">更多 <i class="el-icon-arrow-down"></i></el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30"
              class="margin-bottom"
              v-if="!isMore">
        <el-col :span="6">
          <el-form-item label="任务批次:">
            <el-input v-model="checkForm.person"
                      autocomplete="off"
                      placeholder="请输入任务批次"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="任务名称:">
            <el-input v-model="checkForm.person"
                      autocomplete="off"
                      placeholder="请输入任务名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"
                :offset="7">
          <el-button class="btn-addmore">查询</el-button>
          <el-button class="btn-addmore">重置</el-button>
          <el-button type="text"
                     @click="isMore = true">更多 <i class="el-icon-arrow-up"></i></el-button>
        </el-col>
      </el-row>

    </el-form>

    <el-row class="margin-bottom">
      <el-col :span="6">
        <el-button class="btn-addmore"
                   @click="isTask = true">新建</el-button>
        <el-button class="btn-trans">导出Excel</el-button>
      </el-col>
    </el-row>

    <section class="grid-content">
      <el-table :data="tableData"
                v-loading="listLoading"
                ref="table"
                @selection-change="handleSelectionChange"
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column prop="management"
                         label="管理区"
                         width="150"></el-table-column>
        <el-table-column prop="tag"
                         label="任务批次"
                         width="250"></el-table-column>
        <el-table-column prop="num"
                         label="任务编号"
                         width="250"></el-table-column>
        <el-table-column prop="name"
                         label="任务名称"
                         width="150"></el-table-column>
        <el-table-column prop="peo"
                         label="经办人"
                         width="150"></el-table-column>
        <el-table-column prop="pStart"
                         label="计划开始时间"
                         width="150"></el-table-column>
        <el-table-column prop="pEnd"
                         label="计划结束时间"
                         width="150"></el-table-column>
        <el-table-column prop="doStart"
                         label="实际开始时间"
                         width="150"></el-table-column>
        <el-table-column prop="doEnd"
                         label="实际结束时间"
                         width="150"></el-table-column>
        <el-table-column prop="score"
                         label="巡查得分"
                         width="150"></el-table-column>
        <el-table-column prop="pType"
                         label="状态"
                         width="150"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="80">
          <template slot-scope="scope">
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.$index,scope.row)"
                       size="small">删除</el-button>
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

    <el-dialog title="新建保养巡检计划"
               :visible.sync="isTask">
      <div class="add-files">
        <el-card class="box-card margin-bottom">

          <el-form :model="form"
                   :rules="rules"
                   label-position='left'
                   label-width="auto"
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="24">
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
              <el-col :span="24">
                <el-form-item label="任务计划时间:"
                              prop="rageDate">
                  <el-date-picker v-model="form.rageDate"
                                  type="datetimerange"
                                  range-separator="~"
                                  format="yyyy-MM-dd HH:mm"
                                  value-format="yyyy-MM-dd HH:mm"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="经办人:">
                  <el-select v-model="form.peo"
                             placeholder="请选择经办人">
                    <el-option label="暂无数据"
                               value="暂无数据"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">

                <el-form-item label="巡查事项:">
                  <el-cascader v-model="form.name"
                               :options="options"
                               :props="{ multiple: true, checkStrictly: true }"
                               clearable
                               placeholder="请选择巡查事项"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="巡查说明:">
                  <el-input type="textarea"
                            v-model="form.desc"
                            placeholder="请输入巡查说明"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isTask = false"
                   class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="addPatrolTask('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isTask: false,
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      itmeList: ['全部', '未开始', '待处理', '处理中', '正常完成', '超时完成'],
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,
      checkForm: {},
      form: {
        pEnd: '',
        pStart: '',
        rageDate: [],
      },
      rules: {
        management: [
          { required: true, message: "请选择管理区", trigger: "change" },

        ],
        rageDate: [
          { required: true, message: "请选择周期", trigger: "change" },
        ]
      },
      isMore: true,
      tableData: [{
        management: '绿岛物业',
        tag: '工程进展检查计划20200529',
        num: 'QUAI20200529P3R6203O1',
        name: '工程检查',
        peo: '赵敏',
        date: '2016-05-02',
        doPer: '',
        link: '	水泵保养2',
        inName: '	水泵机',
        type: '日常保养',
        address: '1栋',
        rageDate: ['2020/05/28 14:45', '2020/05/28 17:50'],
        pStart: '2020/05/28 14:45',
        pEnd: '2020/05/28 17:50',
        pType: '未开始'
      }, {
        management: '绿岛物业',
        tag: '工程进展检查计划20200529',
        num: 'QUAI20200529P3R6203O1',
        name: '工程检查',
        peo: '赵敏',
        date: '2016-05-02',
        doPer: '',
        link: '	水泵保养2',
        inName: '	水泵机',
        type: '日常保养',
        address: '1栋',
        pStart: '2020/05/28 14:45',
        pEnd: '2020/05/28 17:50',
        pType: '未开始'
      }],
      //级联数据
      options: [{
        value: '工程检查',
        label: '工程检查',
        children: [{
          value: '工程检查',
          label: '工程检查',
        }, {
          value: '锦园',
          label: '锦园'
        }, {
          value: '工程进展检查',
          label: '工程进展检查'
        }]
      },]
    }
  },
  methods: {
    getItme (index) {
      this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
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


    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },


    closeForm (done) {
      this.$refs['form'].resetFields();
      done();
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    addPatrolTask (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.pStart = this.form.rageDate[0]
          this.form.pEnd = this.form.rageDate[1]
          this.tableData.unshift({...this.form})
          this.$message('新增成功')
          this.isTask = false
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>

<style lang="less" scope>
.patrolTask {
  .el-dialog {
    width: 900px;
  }
  .el-cascader {
    width: 100%;
    /deep/ .el-input__inner {
      width: 100%;
    }
  }
}
</style>