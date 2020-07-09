<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>会议类型</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="12" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore" @click="addType">新增</el-button>
            <el-button  type="primary" class="btn-addmore" :disabled="isDisEdit" @click="editCurrent">修改</el-button>
            <el-button  type="primary" class="btn-addmore" :disabled="isDisDelete" @click="deleteSelection">删除</el-button>
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
      :data="meetingTypeTable"
      v-loading="listLoading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="meetingType" label="类型名称"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="allowPerson" label="允许发起人"></el-table-column>
    </el-table>
    <el-dialog :title="typeTitle" :visible.sync="showTypeDia" width="80%">
      <el-form ref="typeForm" :model="typeForm" :rules="typeFormRules" label-width="150px" label-position="right">
        <el-row>
          <el-col>
            <el-form-item label="类型名称" prop="meetingType">
              <el-input v-model="typeForm.meetingType" placeholder="请输入会议类型名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="类型描述" prop="desc">
              <el-input v-model="typeForm.desc" placeholder="请输入类型描述" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="允许发起人" prop="allowPerson">
                <el-input v-model="typeForm.allowPerson" @focus="showPersons = true"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col>
            <el-form-item label="说明:">
              <span style="color:#ffffff;">不填写允许发起人，即所有人可以发起这类会议。</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore" @click="save('typeForm')">保 存</el-button>
        <el-button class="btn-addmore" @click="showTypeDia = false">返 回</el-button>
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
      checkedIndexs:[],
      isDisEdit:true,
      isDisDelete:true,
      listLoading:false,
      showTypeDia:false,
      showPersons:false,
      typeTitle:'',
      typeForm:{},
      typeFormRules:{
        meetingType:[{required: true, message: "请输入会议类型名称", trigger: "blur"}],
        desc:[{required: true, message: "请输入类型描述", trigger: "blur"}]
      },
      meetingTypeTable:[
        {
          meetingType:'工作研讨',
          desc:'讨论项目进展和需求',
          allowPerson:'张三'
        },
        {
          meetingType:'福利活动',
          desc:'讨论福利发放情况',
          allowPerson:'李四'
        },
        {
          meetingType:'人事调度',
          desc:'讨论人事调度',
          allowPerson:'王五'
        }
      ]
    }
  },
  methods:{
    handleSelectionChange() {
      
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.meetingTypeTable.push(this.typeForm)
            this.showTypeDia = false
          } else {
            console.log('error submit!!');
            return false;
          }
      });      
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
      this.typeForm.allowPerson = arr
    },
    addType() {
      this.typeTitle = '新增会议类型'
      this.showTypeDia = true
    },
    editCurrent() {

    },
    deleteSelection() {

    }
  }
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