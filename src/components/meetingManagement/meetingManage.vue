<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>会议管理</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore" >收藏</el-button>
            <el-button  type="primary" class="btn-addmore">发起会议</el-button>
            <el-button  type="primary" class="btn-addmore">录入会议纪要</el-button>
            <el-button  type="primary" class="btn-addmore">催办</el-button>
            <el-button  type="primary" class="btn-addmore">修改</el-button>
            <el-button  type="primary" class="btn-addmore">发布</el-button>
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
    </section>
    <el-table
      :data="meetingTable"
      v-loading="listLoading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="meetingTheme" label="会议主题"></el-table-column>
      <el-table-column prop="meetingType" label="会议类型"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="meetingRoom" label="会议地点"></el-table-column>
      <el-table-column prop="host" label="主持人"></el-table-column>
      <el-table-column prop="meetingStatus" label="会议状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meetingTable:[
        {
          // meetingTheme meetingType startTime endTime meetingRoom host meetingStatus
          meetingTheme:'团建',
          meetingType:'研讨',
          startTime:'2020-7-8 20:30',
          endTime:'2020-7-8 21:30',
          meetingRoom:'H105',
          host:'李湘',
          meetingStatus:'未进行'
        },
        {
          // meetingTheme meetingType startTime endTime meetingRoom host meetingStatus
          meetingTheme:'募捐',
          meetingType:'公益',
          startTime:'2020-7-9 20:30',
          endTime:'2020-7-9 21:30',
          meetingRoom:'G105',
          host:'张翰',
          meetingStatus:'未进行'
        }
      ],
      listLoading:false,
    }
  },
  methods:{
    handleSelectionChange(val) {

    }
  }
}
</script>

<style lang="less" scope>
@media only screen and (min-width: 1200px) {
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          .searchInput {
            width: 40%;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          .searchInput {
            width: 100% !important;
          }
        }
      }
    }
  }
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>