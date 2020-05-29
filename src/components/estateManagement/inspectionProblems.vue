<template>
  <div class="insPro">
    <el-row>
      <ul class="ul-list">
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
             :rules="rules"
             hide-required-asterisk
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
          <el-form-item label="设备名称:">
            <el-input v-model="form.name"
                      autocomplete="off"
                      placeholder="请输入执行人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="执行人:">
            <el-input v-model="form.person"
                      disabled
                      autocomplete="off"
                      placeholder="请输入执行人"></el-input>
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
          <el-form-item label="设备编码:">
            <el-input v-model="form.person"
                      autocomplete="off"
                      placeholder="请输入设备编码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30"
              v-if="!isMore">
        <el-col :span="8">
          <el-form-item label="提交日期:">
            <el-date-picker v-model="value1"
                            type="daterange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="解决日期:">
            <el-date-picker v-model="value1"
                            type="daterange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5"
                :offset="3">
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
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column prop="management"
                         label="管理区"
                         width="150"></el-table-column>
        <el-table-column prop="pro"
                         label="问题描述"
                         width="250"></el-table-column>
        <el-table-column prop="link"
                         label="关联任务"
                         width="150"></el-table-column>
        <el-table-column prop="name"
                         label="设备名称"
                         width="150"></el-table-column>
        <el-table-column prop="num"
                         label="设备编码"
                         width="150"></el-table-column>
        <el-table-column prop="who"
                         label="提交人"
                         width="150"></el-table-column>
        <el-table-column prop="time"
                         label="提交时间"
                         width="150"></el-table-column>
        <el-table-column prop="how"
                         label="解决方式"
                         width="150"></el-table-column>
        <el-table-column prop="picture"
                         header-align="center"
                         align="center"
                         width="150px"
                         label="解决图片">
          <template slot-scope="scope">
            <el-popover placement="right"
                        title=""
                        trigger="hover">
              <img :src="scope.row.picture" />
              <img slot="reference"
                   :src="scope.row.picture"
                   :alt="scope.row.picture"
                   style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="endTime"
                         label="解决时间"
                         width="150"></el-table-column>
        <el-table-column prop="doPer"
                         label="执行人"
                         width="150"></el-table-column>
        <el-table-column prop="pType"
                         label="状态"
                         width="150"></el-table-column>
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

    <el-dialog title="分派"
               :visible.sync="isInscection"
               width="30%">
      <el-form :model="form">
        <el-form-item label="执行人">
          <el-select v-model="form.region"
                     placeholder="请选择执行人">
            <el-option label="企业版"
                       value="shanghai"></el-option>
            <el-option label="企业版111"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isInscection = false">取 消</el-button>
        <el-button type="primary"
                   @click="isInscection = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注"
               :visible.sync="isVisit"
               width="30%">
      <el-form :model="form">
        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isVisit = false">取 消</el-button>
        <el-button type="primary"
                   @click="isVisit = false">确 定</el-button>
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
      itmeList: ['全部', '未解决', '已解决'],
      listLoading: false,
      tableData: [{
        management: '绿岛物业',
        pro: '	测试',
        link: '水泵保养4-20200422-1',
        name: '水泵机',
        num: 'Sc1585830530',
        who: '企业版',
        time: '	2020/04/22 16:11',
        how: '已搞定',
        picture: require('../../assets/img/login-poto.gif'),
        endTime: '2020/04/22 16:35',
        doPer: '企业版',
        pType: '已解决'
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
      value1: '',
      isMore: true,
      isInscection: false,
      isVisit: false,
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

    //fenye
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
  }
}
</script>

<style lang="less" scope>
.el-popover {
  img {
    width: 250px;
  }
}
</style>