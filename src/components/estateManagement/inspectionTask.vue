<template>
  <div class="insTask">
    <div class="current-page-title">
      <span>保养巡检任务</span>
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

    <el-form :model="form"
             label-width="auto"
             label-position="left"
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
          <el-form-item label="经办人:">
            <el-select v-model="form.tpye"
                       placeholder="请选择经办人">
              <el-option label="维修工岗位"
                         value="shanghai"></el-option>
              <el-option label="投诉处理岗位"
                         value="beijing"></el-option>
              <el-option label="测试岗位"
                         value="out"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="计划开始日期:">
            <el-date-picker v-model="value1"
                            type="datetimerange"
                                  range-separator="~"
                                  format="yyyy-MM-dd HH:mm"
                                  value-format="yyyy-MM-dd HH:mm"
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
              v-if="!isMore">
        <el-col :span="6">
          <el-form-item label="执行人:">
            <el-input v-model="form.person"
                      autocomplete="off"
                      placeholder="请输入执行人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="保养类型:">
            <el-select v-model="form.tpye"
                       placeholder="请选择保养类型">
              <el-option label="日常保养"
                         value="shanghai"></el-option>
              <el-option label="设备巡检"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="保养地点:">
            <el-input v-model="form.person"
                      autocomplete="off"
                      placeholder="请输入保养地点"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30"
              v-if="!isMore">
        <el-col :span="6">
          <el-form-item label="设备名称:">
            <el-input v-model="form.person"
                      autocomplete="off"
                      placeholder="请输入设备名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"
                :offset="13">
          <el-button class="btn-addmore">查询</el-button>
          <el-button class="btn-addmore">重置</el-button>
          <el-button type="text"
                     @click="isMore = true">更多 <i class="el-icon-arrow-up"></i></el-button>
        </el-col>
      </el-row>
    </el-form>

    <section class="grid-content">
      <el-table :data="tableData"
                v-loading="listLoading"
                ref="table"
                @selection-change="handleSelectionChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column prop="management"
                         label="管理区"
                         width="150"></el-table-column>
        <el-table-column prop="name"
                         label="任务名称"
                         width="250"></el-table-column>
        <el-table-column prop="peo"
                         label="经办人"
                         width="150"></el-table-column>
        <el-table-column prop="doPer"
                         label="执行人"
                         width="150"></el-table-column>
        <el-table-column prop="link"
                         label="关联计划"
                         width="150"></el-table-column>
        <el-table-column prop="inName"
                         label="设备名称"
                         width="150"></el-table-column>
        <el-table-column prop="type"
                         label="保养类型"
                         width="150"></el-table-column>
        <el-table-column prop="address"
                         label="保养地点"
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
        <el-table-column prop="pType"
                         label="任务状态"
                         width="150"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button type="text"
                         
                       class="table-change"
                       @click="assignment(scope.$index,scope.row)">分派</el-button>
            <el-button type="text"
                       class="table-del"
                       @click="handleDelete(scope.$index,scope.row)"
                         >删除</el-button>
            <el-button type="text"
                         
                       class="table-change"
                       @click="assignmentVisit(scope.$index,scope.row)">添加备注</el-button>
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
<el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
    <el-dialog title="分派"
               :visible.sync="isInscection"
               width="30%"
               :before-close="closeInspection">
      <el-form :model="form"
               :rules="rules"
               ref="form">
        <el-form-item label="执行人" prop="doPer">
          <el-select v-model="form.doPer"
                     placeholder="请选择执行人">
            <el-option label="企业版"
                       value="企业版"></el-option>
            <el-option label="企业版111"
                       value="企业版111"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isInscection = false,resetForm ('form')"
                   class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="changeRegion('form')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注"
               :visible.sync="isVisit"
               width="30%"
               :before-close="closeInspection">
      <el-form :model="form"
               ref="form">
        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isVisit = false,resetForm ('form')"
                   class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore"
                   @click="changeVisit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iscontent: true,
      isactive: false,
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      itmeList: ['全部', '未分派', '未开始', '待处理', '处理中', '已过期', '正常完成', '超时完成'],
      listLoading: false,
      tableData: [{
        management: '绿岛物业',
        name: '水泵保养2-20200528-1',
        peo: '经办人',
        date: '2016-05-02',
        doPer: '',
        link: '水泵保养2',
        inName: '水泵机',
        type: '日常保养',
        address: '1栋',
        pStart: '2020/05/28 14:45',
        pEnd: '2020/05/28 17:50',
        pType: '未分配'
      }, {
        management: '绿岛物业',
        name: '水泵保养2-20200528-1',
        peo: '经办人',
        date: '2016-05-02',
        doPer: '',
        link: '水泵保养2',
        inName: '水泵机',
        type: '日常保养',
        address: '1栋',
        pStart: '2020/05/28 14:45',
        pEnd: '2020/05/28 17:50',
        pType: '未分配'
      },],
      total: 0,
      page: 1,
      pageSize: 10,
      form: {},
      rules: {
        doPer: [
          { required: true, message: "请选择执行人", trigger: "change" },
        ],
      },
      value1: '',
      isMore: true,
      isInscection: false,
      isVisit: false,
      inTaskIndex:'',
    }
  },
  methods: {
    getItme (index) {
      this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
    },
    // context menu
    handleSelectionChange: function (sels) {
      // window.console.log(sels)
      this.checkedBox = sels;
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

    //fenye
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
    resetForm (formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    closeInspection (done) {
      this.$refs['form'].resetFields();
      done();
    },
    // fenpai
    assignment (index, item) {
      this.resetForm ('form') 
      this.isInscection = true
      this.form = { ...item }
      this.inTaskIndex = index
    },
    changeRegion(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData[this.inTaskIndex] = { ...this.form }
          this.tableData[this.inTaskIndex].pType = '已分配'
          this.$message('分派成功')
          this.isInscection = false
          
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    assignmentVisit(index,item) {
      this.resetForm ('form') 
      this.isVisit = true
      this.form = { ...item }
      this.inTaskIndex = index
    },
    changeVisit() {
          this.tableData[this.inTaskIndex] = { ...this.form }
          this.$message('备注成功')
          this.isVisit = false
    },
    
  }
}
</script>

<style lang="less" scope>
</style>