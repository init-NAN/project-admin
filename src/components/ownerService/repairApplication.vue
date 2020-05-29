<template>
  <div class="main-content">
    <section class="grid-content">
      <div class="state">
        <ul class="ul-list">
          <span class="stateTxt">状态:</span>
          <li :class="activeClass == index ? 'active':''"
              v-for="(itme,index) in typeList"
              :key="index"
              @click="getItem(index)">
            {{itme}}
          </li>
        </ul>
      </div>
      <div class="searchArea">
        <el-tooltip class="item" effect="dark" content="报修单号" placement="bottom">
          <span class="numTxt txt">报修单号:</span>
        </el-tooltip>
        <el-input v-model="repaireNum" placeholder="请输入报修单号" class="repaireNumInput input"></el-input>
        <el-tooltip class="item" effect="dark" content="报修人" placement="bottom">
          <span class="repairerTxt txt">报修人:</span>
        </el-tooltip>
        <el-input v-model="repairePhone" placeholder="请输入报修人/电话" class="repairePhoneInput input"></el-input>
        <el-tooltip class="item" effect="dark" content="工单大类" placement="bottom">
          <span class="bigCategoryTxt txt">工单大类:</span>
        </el-tooltip>
        <el-select v-model="bigCategory" clearable placeholder="所选工单大类" class="input bigCategorySelect">
          <el-option
            v-for="item in bigCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" class="btn-addmore">查询</el-button>
        <el-button size="small" type="primary" class="btn-addmore">重置</el-button>
        <el-button size="small" class="more" type="text" >更多<i class="el-icon-arrow-down"></i></el-button>
      </div>
      <div class="newExport">
        <el-button size="small" type="primary" class="el-icon-plus btn-addmore">   新建报修</el-button>
        <el-button size="small" type="primary" class="el-icon-download btn-addmore">导出EXCEL</el-button>
      </div>
      
      <el-table
        :data="tableData"
        v-loading="listLoading"
        style="width: 100%"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
      >
        <el-table-column prop="orderNum" label="报修单号" width="140"></el-table-column>
        <el-table-column prop="state" label="状态" width="140"></el-table-column>
        <el-table-column prop="oderPerson" label="报修人" width="140"></el-table-column>
        <el-table-column prop="concatPhone" label="联系电话" width="140"></el-table-column>
        <el-table-column prop="orderStartDate" label="报修时间" width="140"></el-table-column>
        <el-table-column prop="assignor" label="分配人" width="140"></el-table-column>
        <el-table-column prop="repairer" label="维修人" width="140"></el-table-column>
        <el-table-column prop="repaireLimitTime" label="工单限时" width="140"></el-table-column>
        <el-table-column prop="bigCategory" label="工单大类" width="140"></el-table-column>
        <el-table-column prop="smallCategory" label="工单小类" width="140"></el-table-column>
        <el-table-column prop="oderOrigin" label="报修来源" width="140"></el-table-column>
        <el-table-column prop="needHandle" label="要求处理事项" width="140"></el-table-column>
        <el-table-column prop="resultNote" label="回单说明情况" width="140"></el-table-column>
        <el-table-column prop="managerAria" label="管理区" width="140"></el-table-column>
        <el-table-column prop="floorHouse" label="楼栋" width="140"></el-table-column>
        <el-table-column prop="reVistor" label="回访人员" width="140"></el-table-column>
        <el-table-column prop="reVistorDate" label="回访时间" width="140"></el-table-column>
        <el-table-column prop="comment" label="评价" width="140"></el-table-column>
        <el-table-column prop="commentContent" label="评价" width="140"></el-table-column>
        <el-table-column prop="commentContent" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="table-show">编辑</el-button>
            <el-button type="text" size="small" class="table-del">删除</el-button>
            <el-button type="text" size="small" class="table-show">派工</el-button>&nbsp;&nbsp;
            <el-dropdown>
              <span class="el-dropdown-link moreOperation">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>转交</el-dropdown-item>
                <el-dropdown-item>添加说明</el-dropdown-item>
                <el-dropdown-item>作废</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
         <!-- fixed="right" -->
      </el-table>
    </section>

    <el-col class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          orderNum: "bxa12301293",
          state: "待分配",
          oderPerson: "看看",
          concatPhone: "15797706475",
          orderStartDate: "2020/05/27 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          oderOrigin:'微信端',
          needHandle:'窗户坏了',
          resultNote:'搞定',
          managerAria:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020/3/21 15:30',
          comment:'好评',
          commentContent:'服务好'
        },
        {
          orderNum: "bxa12301293",
          state: "待分配",
          oderPerson: "看看",
          concatPhone: "15797706475",
          orderStartDate: "2020/05/27 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          oderOrigin:'微信端',
          needHandle:'窗户坏了',
          resultNote:'搞定',
          managerAria:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020/3/21 15:30',
          comment:'好评',
          commentContent:'服务好'
        },
        {
          orderNum: "bxa12301293",
          state: "待分配",
          oderPerson: "看看",
          concatPhone: "15797706475",
          orderStartDate: "2020/05/27 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          oderOrigin:'微信端',
          needHandle:'窗户坏了',
          resultNote:'搞定',
          managerAria:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020/3/21 15:30',
          comment:'好评',
          commentContent:'服务好'
        },
        {
          orderNum: "bxa12301293",
          state: "待分配",
          oderPerson: "看看",
          concatPhone: "15797706475",
          orderStartDate: "2020/05/27 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          oderOrigin:'微信端',
          needHandle:'窗户坏了',
          resultNote:'搞定',
          managerAria:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020/3/21 15:30',
          comment:'好评',
          commentContent:'服务好'
        },
        {
          orderNum: "bxa12301293",
          state: "待分配",
          oderPerson: "看看",
          concatPhone: "15797706475",
          orderStartDate: "2020/05/27 18:36",
          assignor: "admin",
          repairer:'小王',
          repaireLimitTime:'8小时内处理',
          bigCategory:'报修业务',
          smallCategory:'一般单',
          oderOrigin:'微信端',
          needHandle:'窗户坏了',
          resultNote:'搞定',
          managerAria:'时代佳苑(住宅)',
          floorHouse:'1幢',
          reVistor:'小李',
          reVistorDate:'2020/3/21 15:30',
          comment:'好评',
          commentContent:'服务好'
        }
      ],
      total: 0,
      page: 1,				
      pageSize: 10,
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      repaireNum:'',//报修单号
      repairePhone:'',//报修人电话
      bigCategoryOptions: [{
          value: '1',
          label: '报修业务'
        }, {
          value: '2',
          label: '家政服务'
        }, {
          value: '3',
          label: '清洁服务'
        }, {
          value: '4',
          label: '故障处理'
        }, {
          value: '5',
          label: '维护'
        }],
        bigCategory:'',//所选工单大类
      listLoading: false,
      bigCategory:'',//所选工单大类
      typeList:['全部','待分配','已分配','处理中','已处理','已确认已完成','已确认未完成','已关闭','已撤销','已作废']
    };
  },
  mounted() {

  },
  methods: {
    getItem(index) {
      this.activeClass = index
    },
    handleSizeChange(size) {
			this.pageSize = size				
			this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.page = val				
      this.getDeviceList()
		}
  }
}
</script>

<style lang="less" scope>
@font-color:#ffffff;
.main-content {
  .grid-content {
    .state {
      .stateTxt {
        color: @font-color;
        line-height: 32px;
        margin-right: 5px;
      }
    }
    .searchArea {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      .more {
        background: transparent !important;
        border-color: transparent;
      }
      .txt {
        color: @font-color;
        line-height: 32px;
        margin-right: 5px;
        overflow: hidden;
        white-space: nowrap;
      }
      .input {
        width: 130px;
        margin-right: 15px;
        .el-input__inner {
          height: 32px;
        }
      }
      .repairePhoneInput {
        width: 150px;
      }
      .bigCategorySelect {
        width: 140px;
      }
    }
    .newExport {
      display: flex;
      justify-content: flex-start;
    }
    .el-table {
      .moreOperation {
        color:#fff;
      }
    }
  }

}
</style>