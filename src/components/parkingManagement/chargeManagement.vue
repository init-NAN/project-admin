<template>
  <div class="charge">
    <div class="current-page-title">
      <span>收费管理</span>
    </div>

    <el-form :model="searchForm"
             label-width="auto"
             label-position="left"
             ref="checkForm">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-form-item label="停车场:">
            <el-select v-model="searchForm.tpye"
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
        <el-col :span="7">
          <el-form-item label="通行类型:">
            <el-select v-model="searchForm.tpye"
                       placeholder="请选择类型">
              <el-option label="月卡缴费"
                         value="月卡缴费"></el-option>
              <el-option label="临时缴费"
                         value="临时缴费"></el-option>
              <el-option label="其他"
                         value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                :offset="3"
                class="text-align-right">
          <el-button class="btn-addmore">查询</el-button>
          <el-button class="btn-addmore">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30"
              class="margin-bottom">
        <el-col :span="7">
          <el-form-item label="入场时间:">
            <el-date-picker v-model="searchForm.rageDate"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="出场时间:">
            <el-date-picker v-model="searchForm.rageDate"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="车牌号:">
            <el-input v-model="searchForm.whitelistName"
                      autocomplete="off"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <section class="grid-content">
      <el-table :data="tableData"
                v-loading="listLoading"
                ref="table"
                @sort-change="handleSortChange"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">

        <el-table-column prop="parkingLot"
                         label="停车场">
        </el-table-column>
        <el-table-column prop="registrationNumber"
                         label="车牌号">
        </el-table-column>
        <el-table-column prop="parkingTime"
                         label="停车时长">
        </el-table-column>
        <el-table-column prop="admissionTime"
                         label="入场时间">
        </el-table-column>
        <el-table-column prop="outTime"
                         label="出场时间">
        </el-table-column>
        <el-table-column prop="accessTunnel"
                         label="缴费金额">
        </el-table-column>
        <el-table-column prop="exitChannel"
                         label="缴费方式">
        </el-table-column>
      </el-table>
    </section>
    <Pagings :total="total"
             :page="page"
             :pageSize="pageSize"
             @handleSizeChangeSub="handleSizeChange"
             @handleCurrentChangeSub="handleCurrentChange"></Pagings>

    <el-col class="hidden-card"
            :sm="22"
            :md="15"
            :offset="1">
    </el-col>
  </div>
</template>

<script>
import Pagings from "@/components/common/Pagings.vue";
export default {
  components: {
    Pagings
  },
  data () {
    return {
      searchForm: {},
      listLoading: false,
      page: 1,
      pageSize: 10,
      total: 1,
      tableData: [],
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
    //fenye
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getDeviceList();
    },
  },
}
</script>

<style lang="less" scope>
.charge {
  .el-input {
    width: 100%;
  }
}
</style>