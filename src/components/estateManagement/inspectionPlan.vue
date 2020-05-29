<template>
  <div class="inspectionPlan">
    <el-row class="margin-bottom">
      <el-col :span="2">
        <el-button class="btn-addmore"
                   @click="isInspection = true">新建</el-button>
      </el-col>
      <el-col :span="3">
        <el-button :disabled='this.checkedBox.length===0' class="btn-trans">批量删除</el-button>
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
                         label="计划名称"
                         width="150"></el-table-column>

        <el-table-column prop="date"
                         label="计划有效期"
                         width="150"></el-table-column>
        <el-table-column prop="insName"
                         label="设备名称"
                         width="150"></el-table-column>
        <el-table-column prop="how"
                         label="设备类型"
                         width="150"></el-table-column>
        <el-table-column prop="insType"
                         label="规格型号"
                         width="150"></el-table-column>
        <el-table-column prop="once"
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
                         label="保养地点"
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
                       @click="isInspection = true">编辑</el-button>
            <el-button type="text"
            class="table-del"
                       @click="handleDelete(scope.row)"
                       size="small">停用</el-button>
            <el-button type="text"
                       size="small"
                       class="table-change"
                       @click="isInspection = true">复制</el-button>
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
               :visible.sync="isInspection">
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
                   hide-required-asterisk
                   label-position='left'
                   label-width="auto"
                   ref="form">
            <el-row :gutter="30">
              <el-col :span="11">
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
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="计划名称:">
                  <el-input v-model="form.wornum"
                            placeholder="请输入名称"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="计划有效期:">
                  <el-date-picker v-model="value1"
                                  type="daterange"
                                  range-separator="~"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="11">
                <el-form-item label="设备名称:">
                  <el-select v-model="form.name"
                             placeholder="">
                    <el-option label="暂无数据"
                               value="out"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="设备类型:">
                  <el-input v-model="form.dat"
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
                               value="shanghai"></el-option>
                    <el-option label="设备巡检"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="保养频率:">
                  <el-select v-model="form.type"
                             placeholder="">
                    <el-option label="每日"
                               value="shanghai"></el-option>
                    <el-option label="每周"
                               value="beijing"></el-option>
                    <el-option label="每月"
                               value="beijing"></el-option>
                    <el-option label="每年"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="保养:">
                  <el-input v-model="form.mounth"
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
                  <el-input v-model="form.dat"
                            autocomplete="off"
                            @focus="addPerson=true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="预算费用:">
                  <el-input v-model="form.mounth"
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
                  <el-input v-model="form.dat"
                            autocomplete="off"
                            @focus="addPerson=true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="创建人:">
                  <el-select v-model="form.type"
                             placeholder="">
                    <el-option label="企业版"
                               value="shanghai"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="保养地点:">
                  <el-input v-model="form.dat"
                            autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="核查人:">
                  <el-input type="textarea"
                            v-model="form.desc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isInspection = false" class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore">确 定</el-button>
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


      value1: '',
      checkedBox: [],
      input: '',
      isInspection: false,
      listLoading: false,
      addPerson: false,
      tableData: [{
        management: '绿岛物业',
        insName: '水泵机',
        date: '2016-05-02',
        name: '水泵机',
        type: '保养类型',
        insType: '日常保养',
        how: '排水设备',
        once:'每日',
        people:'企业版',
        mounth: '0',
        dat: 1,
        where: '1栋',
        crDate:'2016-05-02',
        label:'	已启用'
      },{
        management: '绿岛物业',
        insName: '水泵机',
        date: '2016-05-02',
        name: '水泵机',
        type: '保养类型',
        insType: '日常保养',
        how: '排水设备',
        once:'每日',
        people:'企业版',
        mounth: '0',
        dat: 1,
        where: '1栋',
        crDate:'2016-05-02',
        label:'	已启用'
      },{
        management: '绿岛物业',
        insName: '水泵机',
        date: '2016-05-02',
        name: '水泵机',
        type: '保养类型',
        insType: '日常保养',
        how: '排水设备',
        once:'每日',
        people:'企业版',
        mounth: '0',
        dat: 1,
        where: '1栋',
        crDate:'2016-05-02',
        label:'	已启用'
      }],
      total: 0,
      page: 1,
      pageSize: 10,
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
    // context menu
    handleSelectionChange: function (sels) {
      window.console.log(sels)
      this.checkedBox = sels;

      //console.log(this.ids);
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
    handleChange (value) {
      console.log(value);
    }
  }
}
</script>

<style lang="less" scope>
.el-dialog {
  width: 900px;
}
</style>