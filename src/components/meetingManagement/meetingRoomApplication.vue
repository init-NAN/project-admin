<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>会议申请</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus"  @click="showApplyDia">申请</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete">删除</el-button>
            <el-button  type="primary" class="btn-addmore">待发</el-button>
            <el-button  type="primary" class="btn-addmore">已发</el-button>
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
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
      <el-table-column prop="meetingRoom" label="会议室"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="host" label="主持人"></el-table-column>
      <el-table-column prop="recorder" label="会议记录人"></el-table-column>
    </el-table>
    <el-dialog title="会议室申请" :visible.sync="showApplication" width="80%">
      <el-form ref="applicationForm" :model="applicationForm" :rules="applicationFormRules" label-width="150px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="所属部门">
              <SelectTree 
              :props="props"
              :options="optionData"
              :value="valueId"
              :clearable="isClearable"
              :accordion="isAccordion"
              @getValue="getValue($event)"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="申请人员">
              <el-input v-model="applicationForm.applyer" placeholder="请输入申请人员姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="会议主题" prop="meetingTheme">
              <el-input v-model="applicationForm.meetingTheme" placeholder="请输入会议主题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="会议室">
              <el-input v-model="applicationForm.applyer" placeholder="请输入申请人员姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="拟定开始时间">
              <el-time-select
                placeholder="起始时间"
                v-model="applicationForm.startTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'}">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="拟定结束时间">
              <el-time-select
                placeholder="结束时间"
                v-model="applicationForm.endTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: applicationForm.startTime}">
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="主持人" prop="host">
              <el-input v-model="applicationForm.host" placeholder="请输入主持人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="记录人">
              <el-input v-model="applicationForm.recorder" placeholder="请输入记录人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="会议类型">
              <el-select v-model="applicationForm.meetingType" placeholder="请选择会议类型">
                <el-option
                  v-for="item in meetingTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="会议提醒">
              <el-select v-model="applicationForm.meetingType" placeholder="请选择会议提醒时间">
                <el-option
                  v-for="item in meetingRemindOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="视频是否自动发起" prop="meetingTheme">
              <el-radio v-model="applicationForm.isVedioSelf" label="1">是</el-radio>
              <el-radio v-model="applicationForm.isVedioSelf" label="2">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="视频会议参会密码">
              <el-input v-model="applicationForm.vedioPassWord"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SelectTree from "@/components/common/treeSelect.vue";
export default {
  components:{
    SelectTree
  },
  data() {
    return {
      listLoading:false,
      showApplication:false,
      applicationForm:{},
      applicationFormRules:{
        meetingTheme:[{required: true, message: "请输入会议主题", trigger: "blur"}]
      },
      meetingTable:[
        {
          meetingTheme:'团建',
          meetingRoom:'H103',
          startTime:'2020-7-10 10:30',
          endTime:'2020-7-10 11:00',
          host:'何炅',
          recorder:'谢娜'
        },
        {
          meetingTheme:'百川项目研发会',
          meetingRoom:'G205',
          startTime:'2020-7-11 14:30',
          endTime:'2020-7-11 16:30',
          host:'汪涵',
          recorder:'王一博'
        },
        {
          meetingTheme:'中秋福利抽奖会',
          meetingRoom:'T103',
          startTime:'2020-9-20 10:30',
          endTime:'2020-9-20 11:00',
          host:'张琪琪',
          recorder:'陈思卿'
        }
      ],
      //树形下拉框start
      isClearable:true,      // 可清空（可选）
      isAccordion:true,      // 可收起（可选）
      valueId:20,            // 初始ID（可选）
      props:{                // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children',
        // disabled:true
      },
      // 选项列表（必选）
      list:[
        {id:1,parentId:0,name:"百川智慧园",rank:1},
          {id:2,parentId:1,name:"中移物联网有限公司",rank:2},
          {id:3,parentId:2,name:"智慧网络技术中心",rank:3},
          {id:4,parentId:2,name:"飞企业",rank:3},
          {id:5,parentId:3,name:"智慧园团队",rank:4},
          {id:6,parentId:3,name:"软件创新团队",rank:4},
          {id:7,parentId:3,name:"穿戴定位团队",rank:4},
          {id:8,parentId:3,name:"测试团队",rank:4},
          {id:9,parentId:3,name:"产品团队",rank:4},
          {id:10,parentId:3,name:"设计团队",rank:4}
      ],
      //树形下拉框end
      meetingTypeOption:[
        {
          value:0,
          label:'研讨'
        },
        {
          value:1,
          label:'社团'
        },
        {
          value:2,
          label:'公益'
        }
      ],
      meetingRemindOption:[
        {
          value:0,
          label:'无'
        },
        {
          value:1,
          label:'20分钟'
        },
        {
          value:2,
          label:'30分钟'
        },
        {
          value:3,
          label:'1小时'
        },
        {
          value:4,
          label:'2小时'
        },
        {
          value:5,
          label:'12小时'
        },
        {
          value:6,
          label:'1天'
        },
        {
          value:7,
          label:'2天'
        },
        {
          value:8,
          label:'1周'
        }
      ]
    }
  },
  methods:{
    // 取值树形下拉框
    getValue(value){
      this.valueId = value
      console.log(this.valueId);
    },
    handleSelectionChange() {
    },
    showApplyDia() {
      console.log(111)
      this.showApplication = true
    }
  },
  computed:{
    /* 转树形数据 */
    optionData(){
      let cloneData = JSON.parse(JSON.stringify(this.list))      // 对源数据深度克隆
      return  cloneData.filter(father=>{                      // 循环所有项，并添加children属性
          let branchArr = cloneData.filter(child=>father.id == child.parentId);       // 返回每一项的子级数组
          branchArr.length>0 ? father.children=branchArr : ''   //给父级添加一个children属性，并赋值
          return father.parentId==0;      //返回第一层
      });
    }
  },
}
</script>

<style>

</style>