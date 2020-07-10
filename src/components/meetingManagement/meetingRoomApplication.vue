<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>会议申请</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus"  @click="apply">申请</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit" :disabled="isDisEdit" @click="editCurrent">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isDisDelete" @click="deleteMeeting">删除</el-button>
            <!-- <el-button  type="primary" class="btn-addmore">待发</el-button>
            <el-button  type="primary" class="btn-addmore">已发</el-button> -->
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
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="showApplytitle" :visible.sync="showApplication" width="85%">
      <el-form ref="applicationForm" :model="applicationForm" :rules="applicationFormRules" label-width="150px" label-position="right">
        <el-card class="box-card">
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
                <el-select v-model="applicationForm.applyer" placeholder="请选择申请人员">
                  <el-option
                    v-for="item in hostOption"
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
              <el-form-item label="会议主题" prop="meetingTheme">
                <el-input v-model="applicationForm.meetingTheme" placeholder="请输入会议主题"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="会议室" prop="meetingRoom">
                <el-select v-model="applicationForm.meetingRoom" placeholder="请选择会议室">
                  <el-option
                    v-for="item in meetingRoomOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col>
              <el-form-item label="拟定会议起始时间" prop="startEndDate">
                <el-date-picker
                  v-model="applicationForm.startEndDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="主持人" prop="host">
                <el-select v-model="applicationForm.host" placeholder="请选择主持人">
                  <el-option
                    v-for="item in hostOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="记录人" prop="recorder">
                <el-select v-model="applicationForm.recorder" placeholder="请选择记录人">
                  <el-option
                    v-for="item in hostOption"
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
              <el-form-item label="会议提醒" prop="meetingRemind">
                <el-select v-model="applicationForm.meetingRemind" placeholder="请选择会议提醒时间">
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
              <el-form-item label="视频是否自动发起" prop="isVedioSelf">
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
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="参会人员" prop="meetingPersons">
                <el-input v-model="applicationForm.meetingPersons" @focus="showPersons = true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="议题文件">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  accept=".xls,.xlsx"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button type="primary" class="btn-addmore" style="margin-left:10px;">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <el-row type="flex" justify="space-between">
            <el-col>
              <el-form-item label="会议简要">
                <el-input type="textarea" v-model="applicationForm.meetingBrief"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col>
              <el-form-item label="苶水、投影等需求">
                <el-input type="textarea" v-model="applicationForm.provideResource"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col>
              <el-form-item label="会议管理员意见">
                <el-input type="textarea" v-model="applicationForm.managerOpinion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore" @click="sendExamine('applicationForm')">送 办</el-button>
        <el-button class="btn-addmore" @click="showApplication = false">返回</el-button>
      </span>
    </el-dialog>
    <el-dialog title="人员信息" :visible.sync="showPersons" width="50%">
      <el-transfer
        :filterable="true"
        :titles="['人员列表', '已选人员']"
        filter-placeholder="请输关键字"
        v-model="checkedIndexs"
        :data="data">
        <el-button class="btn-addmore" slot="right-footer" size="small" style="margin-left:15px;" @click="addPerson">确定</el-button>
      </el-transfer>
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
    const generateData = _ => {
      const data = [];
      const persons = ['张三', '李四', '王五', '刘六', '蔡七', '徐八'];
      persons.forEach((name, index) => {
        data.push({
          label: name,
          key: index,
        });
      });
      return data;
    };
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      data: generateData(),
      checkedIndexs: [],
      showPersons:false,
      listLoading:false,
      showApplication:false,
      isDisDelete:true,
      isDisEdit:true,
      showApplytitle:'',
      selectionLengh:0,
      multipleSelection:[],
      fileList:[],
      applicationForm:{},
      applicationFormRules:{
        meetingTheme:[{required: true, message: "请输入会议主题", trigger: "blur"}],
        meetingRoom:[{required: true, message: "请选择会议室", trigger: "blur"}],
        startEndDate:[{required: true, message: "请选择会议起始时间", trigger: "blur"}],
        host:[{required: true, message: "请选择主持人", trigger: "blur"}],
        recorder:[{required: true, message: "请选择记录人", trigger: "blur"}],
        meetingRemind:[{required: true, message: "请选择提醒时间", trigger: "blur"}],
        meetingPersons:[{required: true, message: "请选择参会人员", trigger: "blur"}]
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
      //文件上传--start
      handlePreview(file) {
        console.log('文件')
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning('当前限制选择1个文件');
      },
      //文件上传--end
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
      hostOption:[
        {
          value:0,
          label:'何炅'
        },
        {
          value:1,
          label:'谢娜'
        },
        {
          value:2,
          label:'张翰'
        }
      ],
      meetingRoomOption:[
        {
          value:0,
          label:'H105'
        },
        {
          value:1,
          label:'G201'
        },
        {
          value:2,
          label:'T109'
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
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
    // 取值树形下拉框
    getValue(value){
      this.valueId = value
      console.log(this.valueId);
    },
    //修改
    editCurrent() {
      this.showApplytitle = '会议室申请修改'
      this.showApplication = true
      this.applicationForm = this.multipleSelection[0]
    },
    //删除
    deleteMeeting() {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        for (let i = 0; i < this.meetingTable.length; i++) {
          const element = this.meetingTable[i];
          element.id = i;
        }
        this.multipleSelection.forEach(element => {
          this.meetingTable.forEach((e, i) => {
            if (element.id == e.id) {
              this.meetingTable.splice(i,1)
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
    sendExamine(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '申请已发送等待审核',
              type: 'warning'
            })
            this.showApplication = false
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    handleSelectionChange(val) {
      this.selectionLengh = val.length
      this.multipleSelection = val
    },
    //申请
    apply() {
      this.showApplytitle = '会议室申请'
      for (let key in this.applicationForm) {
        this.applicationForm[key] = "";
      }
      this.showApplication = true
    },
    addPerson() {
      let arr = []
      this.checkedIndexs.forEach((itm) => {
        this.data.forEach((item) => {
          if(itm == item.key) {
            arr.push(item.label)
          }
        })
      })
      this.showPersons = false
      this.applicationForm.meetingPersons = arr.join()
    }
  },
  watch:{
    selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isDisDelete = false
      } else {
        this.isDisDelete = true
      }
      if (newLen === 1) {
        this.isDisEdit = false;
      } else {
        this.isDisEdit = true;
      }
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

<style lang="less" scope>
@media only screen and (min-width: 768px) {
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
@media only screen and (max-width: 768px) {
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