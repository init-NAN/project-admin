<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>企业档案</span>
    </div>
    <section class="grid-content">
      <el-row class="buttonHead">
        <el-col :span="12" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="left">
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="importExcell">导入</el-button>
            <el-button type="primary" class="el-icon-download btn-addmore">导出EXCEL表</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-plus" @click="addOne">新增</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-edit" :disabled="isCanEdit" @click="editArchives">修改</el-button>
            <el-button  type="primary" class="btn-addmore el-icon-delete" :disabled="isCanDelete" @click="deleteArchives">删除</el-button>
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
        <el-table-column prop="industryBigType" label="行业大类"></el-table-column>
        <el-table-column prop="enterArea" label="入驻园区"></el-table-column>
        <el-table-column prop="enterDate" label="入驻时间"></el-table-column>
        <el-table-column prop="companyStatus" label="企业状态"></el-table-column>
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
    <el-dialog title="企业档案导入" :visible.sync="showImportDia" width="50%">
      <el-form ref="importForm" :model="importForm" label-width="auto">
        <el-form-item label="文件：" prop="file"> 
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
        <el-form-item label="说明：">
          <span>
            1.附件格式必须是.xls或者.xlsx</br>
            2.如果电脑没有数据，可以在这里进行模板下载
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer"> 
        <el-button @click="cancelDialog('form')" class="btn-trans">取 消</el-button>
        <el-button class="btn-addmore">导入</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="newEditTile" :visible.sync="showNewEdit" width="80%">
      <div style="display: flex;justify-content: flex-end;">
        <el-button @click="showNewEdit = false" class="btn-trans">取 消</el-button>
        <el-button @click="submitAchivement" class="btn-addmore">保 存</el-button>
      </div>
      <el-tabs tab-position="top" >
        <el-tab-pane label="基本信息">
          <el-form ref="basicForm" :model="basicForm" :rules="basicFormRules" label-width="150px" label-position="right">
            <el-card class="box-card">
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="企业名称:" prop="companyName">
                    <el-input v-model="basicForm.companyName" placeholder="请输入企业名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="曾用名:">
                    <el-input v-model="basicForm.usedName" placeholder="请输入企业曾用名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业状态:" prop="companyStatus">
                    <el-select v-model="basicForm.companyStatus" placeholder="请选择企业状态">
                      <el-option
                        v-for="item in companyStatusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="企业性质:">
                    <el-select v-model="basicForm.companyNature" placeholder="请选择企业性质">
                      <el-option
                        v-for="item in companyNatureOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入驻园区:">
                    <el-select v-model="basicForm.enterArea" placeholder="请选择入驻园区" @change="chooseArea">
                      <el-option
                        v-for="item in enterAreaOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="园区面积(m²):">
                    <el-input v-model="basicForm.enterAreaSize" placeholder="请输入园区面积"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="入驻时间:">
                    <el-date-picker
                      v-model="basicForm.enterDate"
                      type="date"
                      placeholder="请选择入驻时间"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="建设规模(m²):">
                    <el-input v-model="basicForm.buildUpArea" placeholder="请输入建设规模面积"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟申请办公面积(m²):">
                    <el-input v-model="basicForm.applyOfficeArea" placeholder="请输入拟申请办公面积"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="合同类型:">
                    <el-select v-model="basicForm.contractType" placeholder="请选择合同类型" @change="chooseArea">
                      <el-option
                        v-for="item in contractTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来源方式:">
                    <el-select v-model="basicForm.sourceMode" placeholder="请选择来源方式">
                      <el-option
                        v-for="item in sourceModeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来源类型:">
                    <el-select v-model="basicForm.sourceType" placeholder="请选择来源类型">
                      <el-option
                        v-for="item in sourceTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="企业所属地区:">
                    <el-cascader
                      size="large"
                      :options="addressOptions"
                      v-model="selectedOptions"
                      placeholder="请选择企业所属地区"
                      @change="addressChange">
                    </el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="数据生成来源:">
                    <el-select v-model="basicForm.sourceOriginType" placeholder="请选择数据生成来源">
                      <el-option
                        v-for="item in sourceOriginTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行业大类:">
                    <el-select v-model="basicForm.industryBigType" placeholder="请选择行业大类">
                      <el-option
                        v-for="item in industryBigTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="行业小类:">
                    <el-select v-model="basicForm.industrySmallType" placeholder="请选择行业小类">
                      <el-option
                        v-for="item in industrySmallTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人员:" prop="concactName">
                    <el-input v-model="basicForm.concactName" placeholder="请输入联系人员名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人部门:">
                    <el-input v-model="basicForm.concactDepartment" placeholder="请输入联系人部门"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="联系人电话:" prop="concactPhone">
                    <el-input v-model="basicForm.concactPhone" placeholder="请输入联系人电话"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人职务:">
                    <el-input v-model="basicForm.concactJob" placeholder="请输入联系人职务"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人QQ:">
                    <el-input v-model="basicForm.concactQQ" placeholder="请输入联系人QQ"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="邮箱地址:">
                    <el-input v-model="basicForm.concactEmail" placeholder="请输入邮箱地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司电话:">
                    <el-input v-model="basicForm.companyPhone" placeholder="请输入公司电话"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司传真:">
                    <el-input v-model="basicForm.companyFax" placeholder="请输入公司传真"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          
            <el-card class="box-card">
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="公司网址:">
                    <el-input v-model="basicForm.companyWebSite" placeholder="请输入公司网址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业法人:">
                    <el-input v-model="basicForm.companyLegalPerson" placeholder="请输入企业法人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人联系电话:">
                    <el-input v-model="basicForm.legalPersonPhone" placeholder="请输入法人联系电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="法人身份证:">
                    <el-input v-model="basicForm.legalPersonIdCard" placeholder="请输入法人身份证"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="工商注册类型:">
                    <el-select v-model="basicForm.businessType" placeholder="请选择工商注册类型">
                      <el-option
                        v-for="item in businessTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="统一社会信用代码:">
                    <el-input v-model="basicForm.creditCode" placeholder="请输入统一社会信用代码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="登记状态:" prop="regitionType">
                    <el-select v-model="basicForm.regitionType" placeholder="请选择登记状态">
                      <el-option
                        v-for="item in regitionTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记机关:">
                    <el-input v-model="basicForm.regitionDepartment" placeholder="请输入登记机关"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="登记核准时间:">
                    <el-date-picker
                      v-model="basicForm.regitionDate"
                      type="date"
                      placeholder="请选择登记核准时间"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="注册资本(万):">
                    <el-input v-model="basicForm.regitionMoney" placeholder="请输入注册资本"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年销售额(万):">
                    <el-input v-model="basicForm.yearSaleMoney" placeholder="请输入年销售额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年纳税额(万):">
                    <el-input v-model="basicForm.yearTax" placeholder="请输入年纳税额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            
            <el-card class="box-card">
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="注册地址:">
                    <el-input v-model="basicForm.regitionAdress" placeholder="请输入注册地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="宣传视频:">
                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove" 
                      accept=".avi, .wmv, .mpeg, .mpg, .mov, .rm, .ram, .swf, .flv, .mp4"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="1"
                      :on-exceed="handleExceed"
                      :file-list="fileList">
                      <el-button type="primary" class="btn-addmore" style="margin-left:8px;">上传视频</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办公地址:">
                    <el-input v-model="basicForm.officeAdress" placeholder="请输入办公地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="成立时间:">
                    <el-date-picker
                      v-model="basicForm.establishDate"
                      type="date"
                      placeholder="请选择成立时间"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否高新技术企业:">
                    <el-radio v-model="basicForm.isHighNewCompany" label="1">是</el-radio>
                    <el-radio v-model="basicForm.isHighNewCompany" label="2">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="高新技术证书编号:">
                    <el-input v-model="basicForm.highNewCompanyCode" placeholder="请输入高新技术证书编号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="高新技术认定时间:">
                    <el-date-picker
                      v-model="basicForm.highNewCompanyDate"
                      type="date"
                      placeholder="请选择高新技术认定时间"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="股票名称:">
                    <el-input v-model="basicForm.StockName" placeholder="请输入股票名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="股票代码:">
                    <el-input v-model="basicForm.StockCode" placeholder="请输入股票代码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="上市情况:">
                    <el-select v-model="basicForm.inMarketStatus" placeholder="请选择上市情况">
                      <el-option
                        v-for="item in inMarketStatusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="招商经理:">
                    <el-input v-model="basicForm.leasingManager" placeholder="请输入招商经理"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人:">
                    <el-input v-model="basicForm.applyer" placeholder="请输入申请人"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <el-form-item label="申请时间:">
                    <el-date-picker
                      v-model="basicForm.applyDate"
                      type="date"
                      placeholder="请选择申请时间"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否导入:">
                    <el-radio v-model="basicForm.isImported" label="1">是</el-radio>
                    <el-radio v-model="basicForm.isImported" label="2">否</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="导入人:">
                    <el-input v-model="basicForm.importPerson" placeholder="请输入导入人"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" >
                <el-col :span="8">
                  <el-form-item label="导入时间:">
                    <el-date-picker
                      v-model="basicForm.importDate"
                      type="date"
                      placeholder="请选择导入时间"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="企业简介">
          <el-form ref="profileForm" :mode="profileForm" label-position="right" label-width="120px">
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业简介:">
                  <el-input type="textarea" v-model="profileForm.simpleDesc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="主要产品及服务:">
                  <el-input type="textarea" v-model="profileForm.mainProduct"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="经营范围:">
                  <el-input type="textarea" v-model="profileForm.businessScope"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="企业需求:">
                  <el-input type="textarea" v-model="profileForm.companyDemand"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业文化:">
                  <el-input type="textarea" v-model="profileForm.companyCulture"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="企业愿景:">
                  <el-input type="textarea" v-model="profileForm.vison"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="人员情况">
          <el-form ref="memberForm" :mode="memberForm" :rules="memberFormRules" label-position="right" label-width="120px">
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="公司总人数:">
                  <el-input v-model="memberForm.totalCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="博士人数:">
                  <el-input v-model="memberForm.doctorCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="硕士人数:">
                  <el-input v-model="memberForm.masterCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="本科人数:">
                  <el-input v-model="memberForm.benKeCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="大专人数:">
                  <el-input v-model="memberForm.daZhuanCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="大专以下人数:">
                  <el-input v-model="memberForm.underDaZhuanCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="海归人数:">
                  <el-input v-model="memberForm.seaReturnessCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="男员工人数:">
                  <el-input v-model="memberForm.manCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="女员工人数:">
                  <el-input v-model="memberForm.womanCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="外地户籍人数:">
                  <el-input v-model="memberForm.outCityCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="主要股东">
          <el-button  type="primary" class="btn-addmore el-icon-plus" @click="addBoss">新建</el-button>
          <el-table
            :data="bossTable"
            v-loading="listLoading"
            style="width: 100%"
            :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" class="table-del" 
                @click="deleteCurrentBoss(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="major" label="专业"></el-table-column>
            <el-table-column prop="education" label="学历"></el-table-column>
            <el-table-column prop="contribution" label="出资金额"></el-table-column>
            <el-table-column prop="ratio" label="占股比例(%)"></el-table-column>
            <el-table-column prop="position" label="职务"></el-table-column>
            <el-table-column prop="note" label="备注"></el-table-column>
          </el-table> 
        </el-tab-pane>
        <el-tab-pane label="党建情况">
          <el-form ref="partyForm" :mode="partyForm" :rules="partyFormRules" label-position="right" label-width="120px">
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="党支书:">
                  <el-input v-model="partyForm.partyLeader"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="党员人数:">
                  <el-input v-model="partyForm.doctorCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="积极分子人数:">
                  <el-input v-model="partyForm.positiverCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="团支部:">
                  <el-input v-model="partyForm.groupLeader"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="团员人数:">
                  <el-input v-model="partyForm.groupMemberCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="工会:">
                  <el-input v-model="partyForm.workParty"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane> 
      </el-tabs>
    </el-dialog>
    <el-dialog title="新增股东" :visible.sync="showNewBoss" width="80%">
      <el-form ref="newBossForm" :model="newBossForm" :rules="newBossFormRules" label-width="110px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="股东姓名" prop="name">
              <el-input v-model="newBossForm.name" placeholder="请输入股东姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="股东性别:" prop="sex">
              <el-radio v-model="newBossForm.sex" label="男">男</el-radio>
              <el-radio v-model="newBossForm.sex" label="女">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="股东年龄" prop="age">
              <el-input v-model="newBossForm.age" placeholder="请输入股东年龄"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="学历" prop="education">
              <el-input v-model="newBossForm.education" placeholder="请输入股东学历"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="专业:" prop="major">
              <el-input v-model="newBossForm.major" placeholder="请输入股东所学专业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="出资金额" prop="contribution">
              <el-input v-model="newBossForm.contribution" placeholder="请输入股东年龄"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <el-form-item label="占股比例(%)" prop="ratio">
              <el-input v-model="newBossForm.ratio" placeholder="请输入股东占股比例"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="职务:" prop="position">
              <el-input v-model="newBossForm.position" placeholder="请输入股东职务"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="备注" prop="note">
              <el-input v-model="newBossForm.note" placeholder="请输入股东备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelNewBoss('newBossForm')" class="btn-trans">取 消</el-button>
        <el-button @click="submitNewBoss('newBossForm')" class="btn-addmore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData,CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      selectionLengh:0,
      multipleSelection:[],
      inputSearch:'',
      isCanEdit:true,
      isCanDelete:true,
      listLoading:false,
      showImportDia:false,
      showNewEdit:false,
      newEditTile:'',
      fileList:[],
      importForm:{},
      profileForm:{},//企业简介表单
      basicForm:{},//企业基本信息表单
      memberForm:{},//人员情况表单
      memberFormRules:{},
      partyForm:{},//党建表单
      partyFormRules:{},
      addressOptions:regionData,//城市选择地址
      selectedOptions: [],//城市选择
      //新增股东表单开始
      showNewBoss:false,
      newBossForm:{},
      newBossFormRules:{
        name:[{required: true, message: "请输入股东姓名", trigger: "blur"}],
        sex:[{required: true, message: "请选择股东性别", trigger: "blur"}],
        age:[{required: true, message: "请输入股东年龄", trigger: "blur"}],
        major:[{required: true, message: "请输入股东专业", trigger: "blur"}],
        education:[{required: true, message: "请选择股东教育程度", trigger: "blur"}],
        contribution:[{required: true, message: "请输入股东出资占比", trigger: "blur"}],
        ratio:[{required: true, message: "请输入股东占股比例", trigger: "blur"}],
        position:[{required: true, message: "请选输入股东职务", trigger: "blur"}]
      },
      //新增股东表单结尾
      companyStatusOption:[
        {
          value: '0',
          label: '筹建'
        },
        {
          value: '1',
          label: '在建'
        },
        {
          value: '2',
          label: '投产'
        },
        {
          value: '3',
          label: '退园'
        },
        {
          value: '4',
          label: '正常'
        }
      ],
      companyNatureOption:[
        {
          value: '0',
          label: '个人'
        },
        {
          value: '1',
          label: '私营'
        },
        {
          value: '2',
          label: '内资'
        },
        {
          value: '3',
          label: '外资'
        },
        {
          value: '4',
          label: '分公司'
        },
        {
          value: '5',
          label: '中外合资'
        }
      ],
      enterAreaOption:[
        {
          value:'0',
          label:'楼盘001',
          size:'100'
        },
        {
          value:'1',
          label:'楼盘002',
          size:'200'
        }
      ],
      contractTypeOption:[
        {
          value: '0',
          label: '销售合同'
        },
        {
          value: '1',
          label: '物业合同'
        },
        {
          value: '2',
          label: '外包合同'
        },
        {
          value: '3',
          label: '租赁合同'
        },
        {
          value: '4',
          label: '返租合同'
        }
      ],
      sourceModeOption:[
        {
          value: '0',
          label: '自主开发'
        },
        {
          value: '1',
          label: '企业介绍'
        },
        {
          value: '2',
          label: '主动上门'
        },
        {
          value: '3',
          label: '招商会'
        },
        {
          value: '4',
          label: '其他渠道'
        },
      ],
      sourceTypeOption:[
        {
          value: '0',
          label: '内部'
        },
        {
          value: '1',
          label: '外部'
        },
        {
          value: '2',
          label: '谷川'
        }
      ],
      sourceOriginTypeOption:[
        {
          value:'0',
          label:'租赁'
        },
        {
          value:'1',
          label:'线下'
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
      businessTypeOption:[
        {
          value: '0',
          label: '国有经济'
        },
        {
          value: '1',
          label: '有限责任公司'
        },
        {
          value: '2',
          label: '集体经济'
        },
        {
          value: '3',
          label: '私营经济'
        },
        {
          value: '4',
          label: '个体经济'
        },
        {
          value: '5',
          label: '联营经济'
        },
        {
          value: '6',
          label: '股份制'
        },
        {
          value: '7',
          label: '外商投资'
        },
        {
          value: '8',
          label: '港澳台投资'
        },
        {
          value: '9',
          label: '其他经济'
        }
      ],
      regitionTypeOption:[
        {
          value: '0',
          label: '在营'
        },
        {
          value: '1',
          label: '吊销'
        },
        {
          value: '2',
          label: '注销'
        },
        {
          value: '3',
          label: '迁入'
        },
        {
          value: '4',
          label: '迁出'
        },
        {
          value: '5',
          label: '停业'
        },
        {
          value: '6',
          label: '清算'
        }
      ],
      inMarketStatusOption:[
        {
          value: '0',
          label: '未上市'
        },
        {
          value: '1',
          label: '新三板'
        },
        {
          value: '2',
          label: '创业板'
        },
        {
          value: '3',
          label: '中小板'
        },
        {
          value: '4',
          label: '主板'
        },
        {
          value: '5',
          label: '香港恒生'
        }
      ],
      basicFormRules:{
        companyName:[{ required: true, message: "请输入企业名称", trigger: "blur" }],
        companyStatus:[{ required: true, message: "请选择企业状态", trigger: "blur" }],
        concactName:[{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
        concactPhone:[{ required: true, message: "请输入联系人电话", trigger: "blur" }]
      },
      archivesTable:[
        // enterpriseName industryBigCategory enteringFloor enteringDate enterpriseStatus isRetired
        {
          companyName:'企业001',
          industryBigType:'互联网',
          enterArea:'楼盘001',
          enterDate:'2020-5-20',
          companyStatus:'筹建'
        },
        {
          companyName:'企业002',
          industryBigType:'金融',
          enterArea:'楼盘002',
          enterDate:'2020-5-21',
          companyStatus:'在建'
        },
        {
          companyName:'企业003',
          industryBigType:'教育',
          enterArea:'楼盘002',
          enterDate:'2020-5-22',
          companyStatus:'投产'
        }
      ],
      bossTable:[
        {
          name:'黄飞鸿',
          sex:'男',
          age: 28,
          major:'软件工程', 
          education:'博士',
          contribution: 280,
          ratio: 15,
          position: '总监',
          note:'一号老板'
        }
      ]
    }
  },
  methods:{
    //地址选择完触发(获取选择的地址)
    addressChange(arr) {
      console.log(arr);
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectionLengh = val.length;
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    chooseArea(label) {
      console.log(label,'label')
      this.enterAreaOption.forEach((item, index) => {
        if(item.label == label)
          this.basicForm.enterAreaSize = item.size
      })
    },
    //导入
    importExcell() {
      this.showImportDia = true
    },
    //重置企业表单数据
    resetCompanyForm() {
      for (let key in this.basicForm) {
        this.basicForm[key] = "";
      }
      for (let key in this.profileForm) {
        this.profileForm[key] = "";
      }
      for (let key in this.memberForm) {
        this.memberForm[key] = "";
      }
      for (let key in this.partyForm) {
        this.partyForm[key] = "";
      }
    },
    //新增
    addOne() {
      this.resetCompanyForm()
      this.newEditTile = '新增企业档案'
      this.showNewEdit = true
    },
    //保存企业档案
    submitAchivement() {
      console.log(this.basicForm,'基本信息表单')
      this.archivesTable.push({...this.basicForm})
      this.showNewEdit = false
    },
    //修改
    editArchives() {
      // console.log(this.multipleSelection,'selection')
      this.resetCompanyForm()
      this.newEditTile = '修改企业档案'
      this.showNewEdit = true
    },
    //删除企业档案
    deleteArchives() {
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
    //新增股东
    addBoss() {
      for (let key in this.newBossForm) {
        this.newBossForm[key] = "";
      }
      this.showNewBoss = true
    },
    cancelNewBoss(formName) {
      this.showNewBoss = false
      this.$refs[formName].resetFields();
    },
    submitNewBoss(formName) {
      console.log(this.newBossForm,'表单')
      this.bossTable.push({...this.newBossForm})
      this.showNewBoss = false
    },
    //删除股东
    deleteCurrentBoss(row, index) {
      this.$confirm(`确定要删除${row.name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.bossTable.splice(index, 1);
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
    },
    //文件上传--end
    cancelDialog(formName) {
      this.showImportDia = false
    }
  },
  watch:{
    selectionLengh: function(newLen) {
      if (newLen != 0) {
        this.isCanDelete = false;
      } else {
        this.isCanDelete = true;
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