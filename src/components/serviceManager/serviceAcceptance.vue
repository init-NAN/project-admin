<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>服务受理</span>
    </div>
    <section class="grid-content">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="width:150px"></el-tree>
      <div class="table">
        <el-row class="buttonHead">
          <el-col :span="12" :xs="24" :sm="24" :lg="12" :xl="12">
            <div class="left">
              <el-button  type="primary" class="btn-addmore">查看</el-button>
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="24" :lg="12" :xl="12">
            <div class="right">
              <el-input  placeholder="搜索..." class="searchInput"></el-input>
              <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="serviceTable"
          v-loading="listLoading"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="companyName" label="企业名称"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="handleStatus" label="办理状态">
            <template slot-scope="scope">
              <span v-if="scope.row.handleStatus == 0">待受理</span>
              <span v-else-if="scope.row.handleStatus == 1">受理中</span>
              <span v-else-if="scope.row.handleStatus == 0">已办结</span>
            </template>
          </el-table-column>
          <el-table-column prop="buildDate" label="创建时间"></el-table-column>
        </el-table>
      </div>
    </section>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    data() {
      return {
        data: [
          {
            label: '服务分类',
            children: [
              {
                label: '投诉建议'
              },
              {
                label: '物品放行'
              },
              {
                label: '园内宣传'
              },
              {
                label: '物业报修'
              },
              {
                label: '来访预约'
              }
            ]
          }, 
          {
            label: '云表单菜单类型',
            children: [
              {
                label: '入驻申请审批',
              }
            ]
          }, 
          {
            label: '物业服务',
            children: [
              {
                label: '物品放行'
              },
              {
                label: '看房预约'
              },
              {
                label: '装修申请'
              },
              {
                label: '入园申请'
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        serviceTable:[
          // companyName title handleStatus buildDate
          {
            companyName:'红旗',
            title:'投诉建议001',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-18'
          },
          {
            companyName:'老干妈',
            title:'投诉建议002',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-20'
          },
          {
            companyName:'腾讯',
            title:'投诉建议003',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-20'
          }
        ],
        listLoading:false,
        total: 0,
        page: 1,
        pageSize: 10
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleSelectionChange() {
      },
      handleSizeChange() {
      },
      handleCurrentChange() {
      },

    }
  };
</script>

<style>

</style>