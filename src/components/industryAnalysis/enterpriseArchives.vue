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
            <el-button  type="primary" class="btn-addmore el-icon-search" @click="checkArchives" :disabled="disCheck">查看</el-button>
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
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="industryBigCategory" label="行业大类"></el-table-column>
        <el-table-column prop="enteringFloor" label="入驻楼盘"></el-table-column>
        <el-table-column prop="enteringDate" label="入驻时间"></el-table-column>
        <el-table-column prop="enterpriseStatus" label="企业状态"></el-table-column>
        <el-table-column prop="isRetired" label="是否退园">
          <template slot-scope="scope">
            <span v-if="scope.row.isRetired">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
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
    <el-dialog title="企业资料" :visible.sync="showNewDia" width="80%">
      <el-tabs tab-position="top" >
        <el-tab-pane label="基本信息">
          <el-form ref="basicForm" :model="basicForm" :rules="basicFormRules" label-width="150px" label-position="right">
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业名称:" prop="companyName">
                  <el-input v-model="basicForm.companyName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="曾用名:">
                  <el-input v-model="basicForm.usedName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业状态:" prop="companyStatus">
                  <el-select v-model="basicForm.companyStatus" placeholder="请选择">
                    <el-option
                      v-for="item in companyStatusOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="企业性质:">
                  <el-select v-model="basicForm.companyNature" placeholder="请选择">
                    <el-option
                      v-for="item in companyNatureOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="入驻园区:">
                  <el-select v-model="basicForm.enterArea" placeholder="请选择" @change="chooseArea">
                    <el-option
                      v-for="item in enterAreaOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.size">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="园区面积(m²):">
                  <el-input v-model="basicForm.enterAreaSize"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="入驻时间:">
                  <el-date-picker
                    v-model="basicForm.enterDate"
                    type="date"
                    placeholder="请选择入驻时间"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="建设规模(m²):">
                  <el-input v-model="basicForm.buildUpArea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="拟申请办公面积(m²):">
                  <el-input v-model="basicForm.applyOfficeArea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
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
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="来源方式:">
                  <el-select v-model="basicForm.sourceMode" placeholder="请选择">
                    <el-option
                      v-for="item in sourceModeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="来源类型:">
                  <el-select v-model="basicForm.sourceType" placeholder="请选择">
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
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="企业所属地区:">
                  <el-cascader
                    size="large"
                    :options="addressOptions"
                    v-model="selectedOptions"
                    @change="addressChange">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据生成来源:">
                  <el-select v-model="basicForm.sourceOriginType" placeholder="请选择">
                    <el-option
                      v-for="item in sourceOriginTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="行业大类:">
                  <el-select v-model="basicForm.industryBigType" placeholder="请选择">
                    <el-option
                      v-for="item in industryBigTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="行业小类:">
                  <el-select v-model="basicForm.industrySmallType" placeholder="请选择">
                    <el-option
                      v-for="item in industrySmallTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="联系人员:" prop="concactName">
                  <el-input v-model="basicForm.concactName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                 <el-form-item label="联系人部门:">
                  <el-input v-model="basicForm.concactDepartment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="联系人电话:" prop="concactPhone">
                  <el-input v-model="basicForm.concactPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                 <el-form-item label="联系人职务:">
                  <el-input v-model="basicForm.concactJob"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="联系QQ:">
                  <el-input v-model="basicForm.concactQQ"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                 <el-form-item label="邮箱地址:">
                  <el-input v-model="basicForm.concactEmail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="公司电话:">
                  <el-input v-model="basicForm.companyPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                 <el-form-item label="公司传真:">
                  <el-input v-model="basicForm.companyFax"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="公司网址:">
                  <el-input v-model="basicForm.companyWebSite"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                 <el-form-item label="企业法人:">
                  <el-input v-model="basicForm.companyLegalPerson"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="法人联系电话:">
                  <el-input v-model="basicForm.legalPersonPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                 <el-form-item label="法人身份证:">
                  <el-input v-model="basicForm.legalPersonIdCard"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="工商注册类型:">
                  <el-select v-model="basicForm.businessType" placeholder="请选择">
                    <el-option
                      v-for="item in businessTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="统一社会信用代码:">
                  <el-input v-model="basicForm.creditCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="登记状态:" prop="regitionType">
                  <el-select v-model="basicForm.regitionType" placeholder="请选择">
                    <el-option
                      v-for="item in regitionTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="登记机关:">
                  <el-input v-model="basicForm.regitionDepartment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="登记核准时间:">
                  <el-date-picker
                    v-model="basicForm.regitionDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="注册资本(万):">
                  <el-input v-model="basicForm.regitionMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="年销售额(万):">
                  <el-input v-model="basicForm.yearSaleMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="年纳税额(万):">
                  <el-input v-model="basicForm.yearTax"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="注册地址:">
                  <el-input v-model="basicForm.regitionAdress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
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
                    <el-button type="primary" class="btn-addmore" style="margin-left:10px;">上传视频</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="办公地址:">
                  <el-input v-model="basicForm.officeAdress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="成立时间:">
                  <el-date-picker
                    v-model="basicForm.establishDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="是否高新技术企业:">
                  <el-radio v-model="basicForm.isHighNewCompany" label="1">是</el-radio>
                  <el-radio v-model="basicForm.isHighNewCompany" label="2">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="高新技术证书编号:">
                  <el-input v-model="basicForm.highNewCompanyCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="高新技术认定时间:">
                  <el-date-picker
                    v-model="basicForm.highNewCompanyDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="股票名称:">
                  <el-input v-model="basicForm.StockName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="股票代码:">
                  <el-input v-model="basicForm.StockCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="上市情况:">
                  <el-select v-model="basicForm.inMarketStatus" placeholder="请选择">
                    <el-option
                      v-for="item in inMarketStatusOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="招商经理:">
                  <el-input v-model="basicForm.leasingManager"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="申请人:">
                  <el-input v-model="basicForm.applyer"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="申请时间:">
                  <el-date-picker
                    v-model="basicForm.applyDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否导入:">
                  <el-radio v-model="basicForm.isImported" label="1">是</el-radio>
                  <el-radio v-model="basicForm.isImported" label="2">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="10">
                <el-form-item label="导入人:">
                  <el-input v-model="basicForm.importPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="导入时间:">
                  <el-date-picker
                    v-model="basicForm.importDate"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
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
          <el-form ref="memberForm" :mode="partyForm" :rules="memberFormRules" label-position="right" label-width="120px">
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
            @selection-change="handleSelectionChange"
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
      inputSearch:'',
      isCanEdit:false,
      isCanDelete:true,
      disCheck:true,
      listLoading:false,
      showImportDia:false,
      showNewDia:false,
      fileList:[],
      importForm:{},
      profileForm:{},//企业简介表单
      basicForm:{},//企业基本信息表单
      memberForm:{},//人员情况表单
      memberFormRules:{},
      partyForm:{},//党建表单
      partyFormRules:{},
      addressOptions:regionData,
      selectedOptions: [],
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
          enterpriseName:'企业001',
          industryBigCategory:'互联网',
          enteringFloor:'楼盘001',
          enteringDate:'2020-5-20',
          enterpriseStatus:'正常',
          isRetired:true
        },
        {
          enterpriseName:'企业002',
          industryBigCategory:'医疗',
          enteringFloor:'楼盘002',
          enteringDate:'2020-5-21',
          enterpriseStatus:'正常',
          isRetired:false
        },
        {
          enterpriseName:'企业003',
          industryBigCategory:'教育',
          enteringFloor:'楼盘003',
          enteringDate:'2020-5-22',
          enterpriseStatus:'正常',
          isRetired:true
        },
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
    handleSelectionChange() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    chooseArea(size) {
      this.basicForm.enterAreaSize = size
    },
    //导入
    importExcell() {
      this.showImportDia = true
    },
    //新增
    addOne() {
      this.showNewDia = true
    },
    //修改
    editArchives() {

    },
    //删除企业档案
    deleteArchives() {

    },
    //查看
    checkArchives() {

    },
    //新增股东
    addBoss() {
      
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
  }
}
</script>

<style>

</style>