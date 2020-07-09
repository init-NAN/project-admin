<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>会议管理</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore" :disabled="isDisCollect" @click="collect">收藏</el-button>
            <el-button  type="primary" class="btn-addmore" @click="startMeeting">发起会议</el-button>
            <!-- <el-button  type="primary" class="btn-addmore">录入会议纪要</el-button> -->
            <el-button  type="primary" class="btn-addmore" :disabled="isDisUrge" @click="urge">催办</el-button>
            <el-button  type="primary" class="btn-addmore" :disabled="isDisEdit" @click="editCurrent">修改</el-button>
            <el-button  type="primary" class="btn-addmore" :disabled="isDisDelete" @click="deleteSelection">删除</el-button>
            <el-button  type="primary" class="btn-addmore" @click="publish" :disabled="isDisPub">发布</el-button>
            <!-- <el-button  type="primary" class="btn-addmore">查看</el-button> -->
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
    <el-dialog :title="showApplytitle" :visible.sync="showApplication" width="85%">
      <el-form ref="applicationForm" :model="applicationForm" :rules="applicationFormRules" label-width="150px" label-position="right">
         <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="会议主题" prop="meetingTheme">
                <el-input v-model="applicationForm.meetingTheme" placeholder="请输入会议主题"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="会议室类型" prop="meetingRoomType">
                <el-select v-model="applicationForm.meetingRoomType" placeholder="请选择会议室类型">
                  <el-option
                    v-for="item in meetingRoomTypeOption"
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
              <el-form-item label="提醒类型">
                <el-select v-model="applicationForm.meetingRemindType" placeholder="请选择会议提醒类型">
                  <el-option
                    v-for="item in meetingRemindTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="会议提醒">
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
              <el-form-item label="视频是否自动发起">
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
         <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="需要资源" prop="needResource">
                <el-input v-model="applicationForm.needResource"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="会议简介" prop="meetingBrief">
                <el-input v-model="applicationForm.meetingBrief"></el-input>
              </el-form-item>
            </el-col>
         </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore" @click="toStart('applicationForm')">发 布</el-button>
        <el-button class="btn-addmore" @click="showApplication = false">返 回</el-button>
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
export default {
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
      data: generateData(),
      checkedIndexs: [],
      isDisDelete:true,
      isDisCollect:true,
      isDisEdit:true,
      isDisUrge:true,
      isDisPub:true,
      selectionLengh:0,
      showApplytitle:'',
      applicationForm:{},
      fileList:[],
      showPersons:false,
      applicationFormRules:{
        meetingTheme:[{required: true, message: "请输入会议主题", trigger: "blur"}],
        meetingRoomType:[{required: true, message: "请选择会议室类型", trigger: "blur"}],
        meetingType:[{required: true, message: "请选择会议类型", trigger: "blur"}],
        meetingRoom:[{required: true, message: "请选择会议类型", trigger: "blur"}],
        host:[{required: true, message: "请选择主持人", trigger: "blur"}],
        meetingPersons:[{required: true, message: "请选择参会人员", trigger: "blur"}]
      },
      showApplication:false,
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
      ],
      meetingRoomTypeOption:[
        {
          value:0,
          label:'标准会议室'
        },
        {
          value:1,
          label:'临时会议室'
        },
      ],
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
      meetingRemindTypeOption:[
        {
          value:0,
          label:'短信提醒'
        },
        {
          value:1,
          label:'邮件提醒'
        }
      ],
      multipleSelection:[],
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
      this.selectionLengh = val.length
      this.multipleSelection = val
    },
    publish() {
      this.$message({
        message:'已发送发布请求',
        type:'success'
      })
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
      this.applicationForm.meetingPersons = arr
    },
    toStart(formName) {
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
    urge() {
      this.$message({
        message: '已催办',
        type: 'success'
      })
    },
    //发起会议
    startMeeting() {
      this.showApplytitle = '发起会议'
      for (let key in this.applicationForm) {
        this.applicationForm[key] = "";
      }
      this.showApplication = true
    },
    //修改
    editCurrent() {
      this.showApplytitle = '会议室申请修改'
      this.showApplication = true
      this.applicationForm = this.multipleSelection[0]
    },
    //收藏
    collect() {
      this.$message({
          message: '收藏成功！',
          type: 'success'
      });
    },
    //删除
    deleteSelection() {
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
      }
      //文件上传--end
  },
  watch:{
    selectionLengh: function(newLen, oldLen) {
      if(newLen != 0) {
        this.isDisDelete = false
        this.isDisPub = false
        this.isDisCollect = false
      } else {
        this.isDisDelete = true
        this.isDisPub = true
        this.isDisCollect = true
      }
      if (newLen === 1) {
        this.isDisEdit = false;
        this.isDisUrge = false;
      } else {
        this.isDisEdit = true;
        this.isDisUrge = true
      }
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