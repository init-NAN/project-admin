<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>退园申请</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="applyRetire">申请</el-button>
            <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit" :disabled="isCanEdit" @click="editRetire">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteRetire">删除</el-button>
            <!-- <el-button  type="primary" class="btn-addmore el-icon-search" @click="checkRetire" :disabled="disCheck">查看</el-button> -->
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="right">
            <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
            <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
          </div>
        </el-col>
      </el-row>
    </section>
    <el-table
        :data="archivesTable"
        v-loading="listLoading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="industryCategory" label="行业类型"></el-table-column>
        <el-table-column prop="enterArea" label="入驻园区"></el-table-column>
        <el-table-column prop="enterDate" label="入驻时间"></el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="applicationTitle" :visible.sync="showApplication" width="80%">
      <el-form ref="applicationForm" :model="applicationForm" :rules="applicationFormRules" label-width="150px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-form-item label="企业名称：">
              <el-select v-model="applicationForm.companyName" placeholder="请选择退园企业">
                <el-option
                  v-for="item in companyNameOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业类型：">
              <el-input v-model="applicationForm.industryBigType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业细分：">
              <el-input v-model="applicationForm.industrySmallType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-form-item label="入驻园区：">
              <el-input v-model="applicationForm.enterArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入驻时间:">
              <el-input v-model="applicationForm.enterDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业性质:">
              <el-input v-model="applicationForm.companyNature"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-form-item label="注册资本(万元)：">
              <el-input v-model="applicationForm.regitionMoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上市情况:">
              <el-input v-model="applicationForm.inMarketStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退园时间:">
              <el-date-picker
                v-model="applicationForm.retiredDate"
                type="date"
                placeholder="请选择退园时间"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="退园原因：">
              <el-input type="textarea" v-model="applicationForm.retireReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="领导意见：">
              <el-input type="textarea" v-model="applicationForm.leaderOpinion"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer"> 
        <el-button class="btn-trans" @click="showApplication = false">返 回</el-button>
        <el-button class="btn-addmore">送 办</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      inputSearch:'',
      isCanEdit:false,
      isCanDelete:true,//编辑按钮能否点击
      isCanDelete:true,//删除按钮能否点击
      disCheck:true,
      listLoading:false,
      selectionLengh: 0,
      applicationTitle:'',
      multipleSelection:[],
      //退园申请-start
      pickerOptions: {
        disabledDate(time) {
          return time.getTime()  <  Date.now() 
        },
        shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
        }]
      },
      isCanEdit:true,
      showApplication:false,
      applicationForm:{},
      applicationFormRules:{},
      companyNameOption:[
        {
          value:'0',
          label:'测试企业001'
        },
        {
          value:'1',
          label:'测试企业002'
        },
        {
          value:'2',
          label:'测试企业003'
        }
      ],
      industryBigTypeOption:[
        {
          value:'0',
          label:'互联网'
        },
        {
          value:'1',
          label:'金融'
        },
        {
          value:'2',
          label:'教育'
        }
      ],
      industrySmallTypeOption:[
        {
          value:'0',
          label:'互联网销售'
        },
        {
          value:'1',
          label:'金融数据'
        },
        {
          value:'2',
          label:'教育培训'
        }
      ],
      //退园申请-end
      archivesTable:[
        {
          companyName:'企业001',
          industryBigType:'互联网',
          enterArea:'园区001',
          enterDate:'2020-5-20',
          enterpriseStatus:'正常',
          isRetired:true
        },
        {
          companyName:'企业002',
          industryBigType:'医疗',
          enterArea:'园区002',
          enterDate:'2020-5-21',
          enterpriseStatus:'正常',
          isRetired:false
        },
        {
          companyName:'企业003',
          industryBigType:'教育',
          enterArea:'园区003',
          enterDate:'2020-5-22',
          enterpriseStatus:'正常',
          isRetired:true
        },
      ],
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.selectionLengh = val.length;
      this.multipleSelection = val;
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    //申请
    applyRetire() {
      for (let key in this.applicationForm) {
        this.applicationForm[key] = "";
      }
      this.applicationTitle = '退园申请'
      this.showApplication = true
    },
    //导入
    importExcell() {
    },
    //修改
    editRetire() {
      this.applicationTitle = '修改退园信息'
      this.showApplication = true
      this.applicationForm = this.multipleSelection[0]
    },
    //删除
    deleteRetire() {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        for (let i = 0; i < this.archivesTable.length; i++) {
          const element = this.archivesTable[i];
          element.id = i;
        }
        this.multipleSelection.forEach(element => {
          this.archivesTable.forEach((e, i) => {
            if (element.id == e.id) {
              this.archivesTable.splice(i,1)
            }
          });
        });
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
    //查看
    checkRetire() {

    }
  },
  watch:{
    selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isCanDelete = false
      } else {
        this.isCanDelete = true
      }
      if (newLen === 1) {
        this.isCanEdit = false;
      } else {
        this.isCanEdit = true;
      }
    }
  }
}
</script>

<style>

</style>