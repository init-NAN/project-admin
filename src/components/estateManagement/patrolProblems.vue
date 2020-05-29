<template>
  <div class="patrolPro">
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
             hide-required-asterisk
             label-width="auto"
             label-position="left"
             ref="form">
      <el-row :gutter="30">
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
                            type="daterange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

        </el-col>
        <el-col :span="7">
          <el-form-item label="计划开始日期:">
            <el-date-picker v-model="value1"
                            type="daterange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button class="btn-addmore">查询</el-button>
          <el-button class="btn-addmore">重置</el-button>
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
        <el-table-column prop="miaoshu"
                         label="问题描述"
                         width="250"></el-table-column>
        <el-table-column prop="link"
                         label="关联任务"
                         width="250"></el-table-column>
        <el-table-column prop="time"
                         label="提交时间"
                         width="180"></el-table-column>
        <el-table-column prop="how"
                         label="解决方式"
                         width="100"></el-table-column>
        <el-table-column prop="picture"
                         header-align="center"
                         align="center"
                         width="150"
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
                         width="180"></el-table-column>
        <el-table-column prop="doPer"
                         label="经办人"
                         width="150"></el-table-column>
        <el-table-column prop="pType"
                         label="状态"
                         width="150"></el-table-column>
      </el-table>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      itmeList: ['全部', '未解决', '已解决'],
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      value1: '',

      listLoading: false,
      tableData: [{
        miaoshu: '123123123123123',
        link: '水泵保养4-20200422-1',
        time: '	2020/04/22 16:11',
        how: '已搞定',
        picture: require('../../assets/img/login-poto.gif'),
        endTime: '2020/04/22 16:35',
        doPer: '企业版',
        pType: '已解决'
      }],
    }
  },
  methods: {
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