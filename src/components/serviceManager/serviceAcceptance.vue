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
              <div class="state">
                <ul class="ul-list">
                  <span class="stateTxt">办理状态:</span>
                  <li :class="activeClass == index ? 'active':''"
                      v-for="(itme,index) in typeList"
                      :key="index"
                      @click="getItem(index)">
                    {{itme}}
                  </li>
                </ul>
              </div>
              <el-button  type="primary" class="btn-addmore" @click="approval" :disabled="selectionLengh !=1">审批</el-button>
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
    </section>
    <el-dialog title="投诉建议" :visible.sync="showTsDia" width="85%">
      <el-form ref="tsForm" :model="tsForm" :rules="tsFormRules" label-width="auto">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="用户名称">
              <el-input v-model="tsForm.userName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系人">
              <el-input v-model="tsForm.concact" placeholder="请输入联系人"></el-input>
            </el-form-item>
        </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="联系人电话">
              <el-input v-model="tsForm.concactPhone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="投诉类型">
                <el-select v-model="tsForm.tsType" placeholder="请选择投诉类型">
                  <el-option
                    v-for="item in tsTypeOption"
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
              <el-form-item label="用户类型">
                  <el-select v-model="tsForm.tsType" placeholder="请选择用户类型">
                    <el-option
                      v-for="item in usTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="投诉内容">
                <el-input type="textarea" v-model="tsForm.tsContent" :disabled="true"></el-input>
              </el-form-item>
           </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="回复">
                <el-input v-model="tsForm.reply"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="意见">
                <el-input v-model="tsForm.advise"></el-input>
              </el-form-item>
           </el-col>
         </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore">送 审</el-button>
        <el-button @click="showTsDia = false" class="btn-addmore">返 回</el-button>
        <el-button class="btn-addmore">直接回复</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物品放行" :visible.sync="showFxDia" width="85%">
      <el-form ref="fxForm" :model="fxForm" :rules="fxFormRules" label-width="auto">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="企业名称">
              <el-input v-model="fxForm.companyName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系人">
              <el-input v-model="fxForm.concact" placeholder="请输入联系人"></el-input>
            </el-form-item>
        </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="联系人电话">
              <el-input v-model="fxForm.concactPhone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="放行状态">
                <el-select v-model="fxForm.fxStatus" placeholder="请选择投诉类型">
                  <el-option
                    v-for="item in fxStatusOption"
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
              <el-form-item label="放行时间">
                  <el-date-picker
                    v-model="fxForm.fxTime"
                    type="datetime"
                    placeholder="选择放行日期时间">
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="申请时间">
                <el-input v-model="fxForm.applyTime"></el-input>
              </el-form-item>
           </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="申请类型">
                <el-select v-model="fxForm.applyType" placeholder="请选择申请类型">
                  <el-option
                    v-for="item in applyOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="携带人">
                <el-input v-model="fxForm.taker"></el-input>
              </el-form-item>
           </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="地址">
              <el-input v-model="fxForm.applyPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="内容">
              <el-input type="textarea" v-model="fxForm.content" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore">送 审</el-button>
        <el-button @click="showFxDia = false" class="btn-addmore">返 回</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物业报修" :visible.sync="showBxDia" width="85%">
      <el-form ref="bxForm" :model="bxForm" :rules="bxFormRules" label-width="120px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="企业名称">
              <el-input v-model="bxForm.companyName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系人">
              <el-input v-model="bxForm.concact" placeholder="请输入联系人"></el-input>
            </el-form-item>
        </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="联系人电话">
              <el-input v-model="bxForm.concactPhone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="内容">
                <el-input type="textarea" v-model="bxForm.content"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="报修图片">
                <img src="../../assets/logo.png" alt="">
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="报修地址">
                <el-input v-model="bxForm.place"></el-input>
              </el-form-item>
           </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="申请时间">
                <el-input v-model="bxForm.applyTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="报修结果图片">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove" 
                  accept=".jpg, .png, .gif"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button type="primary" class="btn-addmore" style="margin-left:8px;">上传照片</el-button>
                </el-upload>
              </el-form-item>
           </el-col>
         </el-row>
         <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="评价时间">
              <el-input v-model="bxForm.commentTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="评价内容">
              <el-input type="textarea" v-model="bxForm.commentContent" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore">送 审</el-button>
        <el-button @click="showBxDia = false" class="btn-addmore">返 回</el-button>
      </span>
    </el-dialog>
    <el-dialog title="装修申请" :visible.sync="showZxDia" width="85%">
      <el-form ref="bxForm" :model="zxForm" :rules="bxFormRules" label-width="120px" label-position="right">
        <el-card>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="申请企业">
                <el-input v-model="zxForm.companyName" placeholder="请输入企业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="申请时间">
                <el-date-picker
                  v-model="zxForm.applyDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="楼栋房间号">
                <el-input v-model="zxForm.floor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="装修面积(m²)">
                <el-input v-model="zxForm.floorArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="经办人">
                <el-input v-model="zxForm.handlePerson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="经办人电话">
                <el-input v-model="zxForm.handlePhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="施工单位名称">
                <el-input v-model="zxForm.workOrgan"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="装修合同金额(元)">
                <el-input v-model="zxForm.contractMoney"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="装修起始时间">
                <el-date-picker
                  v-model="zxForm.startEndDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <el-button type="text" @click="add">新建</el-button>
          <el-row>
            <el-col :span="24">
              <el-table
                :data="decorationTable.data"
                style="width: 100%;margin:auto"
                :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}"
              >
                <el-table-column type="index"></el-table-column>
                <el-table-column
                  v-for="(item,index) in decorationTable.columns"
                  :label="item.label"
                  :prop="item.prop"
                  :width="item.width"
                  :key="index"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input size="mini" placeholder="请输入内容" v-model="decorationTable.sel[item.prop]"></el-input>
                  </span>
                  <span v-else>{{scope.row[item.prop]}}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text"
                      class="table-show"
                      @click.stop="saveRow(scope.row,scope.$index)"
                    >保存</el-button>
                    <el-button type="text"
                      class="table-show"
                      @click="editRow(scope.row,scope.$index)"
                    >编辑</el-button>
                    <el-button type="text"
                      class="table-del"
                      @click="deleteRow(scope.$index,decorationTable.data)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="备注">
                <el-input v-model="zxForm.note"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="附件">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove" 
                  accept=".doc, .docx"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button type="primary" class="btn-addmore" style="margin-left:8px;">上传附件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="受理人">
                <el-select v-model="zxForm.handler" placeholder="请选择受理人">
                  <el-option
                    v-for="item in handlerOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="受理时间">
                <el-date-picker
                  v-model="zxForm.handleDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="受理意见">
                <el-input type="textarea" v-model="zxForm.handleOpinion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="领导审批意见">
                <el-input type="textarea" v-model="zxForm.handleOpinion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="紧急程度">
                <el-select v-model="zxForm.urgent" placeholder="请选择受理紧急程度">
                  <el-option
                    v-for="item in urgentOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="办理情况">
                <el-radio v-model="zxForm.isHandle" label="1">是</el-radio>
                <el-radio v-model="zxForm.isHandle" label="2">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="回复时间">
                <el-date-picker
                  v-model="zxForm.reviewDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="办理回复">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore">送 办</el-button>
        <el-button @click="showZxDia = false" class="btn-addmore">返 回</el-button>
      </span>
    </el-dialog>
    <el-dialog title="入园申请" :visible.sync="showRyDia" width="85%">
      <el-form ref="ryForm" :model="ryForm" :rules="ryFormRules" label-width="120px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="企业名称">
              <el-input v-model="ryForm.companyNmae"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="申请时间">
                <el-date-picker
                  v-model="ryForm.applyDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="联系人姓名">
              <el-input v-model="ryForm.concactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系人职务">
              <el-input v-model="ryForm.concactPosition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="联系电话">
              <el-input v-model="ryForm.concactPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="email">
              <el-input v-model="ryForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="需求办公面积">
              <el-input v-model="ryForm.officeArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="主营业务">
              <el-input v-model="ryForm.mainBusiness"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="企业简介">
              <el-input v-model="ryForm.briefIntroduction"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="附件">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove" 
                  accept=".doc, .docx"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button type="primary" class="btn-addmore" style="margin-left:8px;">上传附件</el-button>
                </el-upload>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="招商中心意见">
              <el-input v-model="ryForm.businessOpinion"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="物业管理">
              <el-input v-model="ryForm.propertyManager"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-addmore">送 办</el-button>
        <el-button @click="showRyDia = false" class="btn-addmore">返 回</el-button>
      </span>
    </el-dialog>
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
        activeClass: 0, // 0为默认选择第一个，-1为不选择
        typeList:['待受理','受理中','已办结'],
        selectionLengh:0,
        multipleSelection:[],
        isDisApproval:true,
        currentLabel:'',
        serviceTable:[],
        ////投诉弹窗
        serviceTable_ts:[
          // companyName title handleStatus buildDate
          {
            companyName:'红旗',
            title:'投诉建议001',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-18 12:30'
          },
          {
            companyName:'老干妈',
            title:'投诉建议002',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-20 14:30'
          },
          {
            companyName:'腾讯',
            title:'投诉建议003',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-20 15:30'
          }
        ],
        showTsDia:false,
        tsForm:{
          tsContent:'投诉xxxxxx'
        },
        tsFormRules:{},
        tsTypeOption:[
          // 产品质量投诉；bai服务投诉；价格投诉；诚信投诉；意外事故投诉
          {
            value:0,
            label:'产品质量投诉'
          },
          {
            value:1,
            label:'服务投诉'
          },
          {
            value:2,
            label:'价格投诉'
          },
          {
            value:3,
            label:'诚信投诉'
          },
          {
            value:4,
            label:'意外事故投诉'
          }
        ],
        usTypeOption:[
          {
            value:0,
            label:'个人'
          },
          {
            value:1,
            label:'公司'
          }
        ],
        //放行弹窗
        fxStatusOption:[
          {
            value:0,
            label:'未放行'
          },
          {
            value:1,
            label:'已放行'
          }
        ],
        applyOption:[
          {
            value:0,
            label:'进入'
          },
          {
            value:1,
            label:'出去'
          }
        ],
        serviceTable_fx:[
          {
            companyName:'意向登记',
            title:'物品放行',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-18 12:30'
          }
        ],
        fxForm:{
          applyTime:'2020-03-20 15:30',
          taker:'张三',
          applyPlace:'南方软件园',
          content:'电脑'
        },
        fxFormRules:{},
        showFxDia:false,
        //报修弹窗
        serviceTable_bx:[
          {
            companyName:'移动',
            title:'门报修',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-18 12:30'
          }
        ],
        showBxDia:false,
        fileList:[],
        bxForm:{
          content:'门把手坏了',
          place:'深圳固戍爱情公寓601',
          applyTime:'2020-5-20 17:20'
        },
        bxFormRules:{},
        //装修弹窗
        serviceTable_zx:[
          {
            companyName:'移动',
            title:'二楼装修',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-18 12:30'
          }
        ],
        showZxDia:false,
        zxForm:{
          companyName:'移动',
          applyDate:'2020-5-20',
          floor:'明珠商城101',
          floorArea:100,
          handlePerson:'周润发',
          handlePhone:18123065431,
          workOrgan:'土巴兔深圳一号',
          contractMoney:10000
        },
        zxFormRules:{},
        urgentOption:[
          {
            value:0,
            label:'轻微'
          },
          {
            value:1,
            label:'一般'
          },
          {
            value:2,
            label:'紧急'
          }
        ],
        handlerOption:[
          {
            value:0,
            label:'张三'
          },
          {
            value:1,
            label:'李四'
          },
          {
            value:2,
            label:'王五'
          }
        ],
        //装修表(动态添加)
        decorationTable: {
          sel: null, //选中行
          columns: [
            {
              prop: "project",
              label: "项目",

            },
            {
              prop: "decorateContent",
              label: "装修内容"
            },
            {
              prop: "note",
              label: "备注"
            }
          ],
          data: []
        },
        showRyDia:false,
        ryForm:{
          companyNmae:'阿里',
          applyDate:'2020-5-20',
          concactName:'张三'
        },
        ryFormRules:{},
        serviceTable_ry:[
          {
            companyName:'阿里',
            title:'入园申请',
            handleStatus:0,//0 待受理； 1 受理中； 1 已受理；
            buildDate:'2020-5-18 12:30'
          }
        ],
        listLoading:false,
        total: 0,
        page: 1,
        pageSize: 10
      };
    },
    mounted () {
      console.log(this.serviceTable_ts)
      this.serviceTable = this.serviceTable_ts
      this.currentLabel = '投诉建议'
    },
    methods: {
      getItem(index) {
        this.activeClass = index
      },
      handleNodeClick(data, event) {
        console.log(event,'event')
        console.log(data)
        let label = data.label
        this.currentLabel = label
        if(label == '投诉建议') {
          this.serviceTable = this.serviceTable_ts
        } else if(label == '物品放行') {
          this.serviceTable = this.serviceTable_fx
        } else if(label == '物业报修') {
          this.serviceTable = this.serviceTable_bx
        } else if(label == '装修申请') {
          this.serviceTable = this.serviceTable_zx
        } else if(label == '入园申请') {
          this.serviceTable = this.serviceTable_ry
        }
      },
      //审批
      approval() {
        if(this.currentLabel == '投诉建议') {
          this.showTsDia = true
        } else if(this.currentLabel == '物品放行') {
          console.log('显示物品放行弹窗')
          this.showFxDia = true
        } else if(this.currentLabel == '物业报修') {
          this.showBxDia = true
        } else if(this.currentLabel == '装修申请') {
          this.showZxDia = true
        } else if(this.currentLabel == '入园申请') {
          this.showRyDia = true
        }
      },
      handleSelectionChange(val) {
        this.selectionLengh = val.length
        this.multipleSelection = val
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
      },
      //文件上传--end
      //新增修改删除保存（装修动态表）--start
      add() {
        for (let i of this.decorationTable.data) {
          if (i.isSet) return this.$message.error("请先保存当前编辑项");
        }
        let j = {
          index: "",
          project:"",
          decorateContent:"",
          note:"",
          isSet: true
        };
        this.decorationTable.data.push(j);
        this.decorationTable.sel = JSON.parse(JSON.stringify(j));
      },
      saveRow(row, index) {
        //保存
        let data = JSON.parse(JSON.stringify(this.decorationTable.sel));
        for (let k in data) {
          row[k] = data[k];
        }
        row.isSet = false;
      },
      editRow(row) {
        //编辑
        for (let i of this.decorationTable.data) {
          if (i.isSet) return this.$message.error("请先保存当前编辑项");
        }
        this.decorationTable.sel = row;
        row.isSet = true;
      },
      deleteRow(index, rows) {
        //删除
        rows.splice(index, 1);
      },
      //新增修改删除保存（装修动态表）--end
      handleSizeChange() {
      },
      handleCurrentChange() {
      },

    }
  };
</script>

<style>

</style>