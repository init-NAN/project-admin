<template>
  <div class="main-content">
    <div class="current-page-title">
      <span>意向金管理</span>
    </div>
    <section class="grid-content">
      <div class="btnHeader">
        <div class="left">
          <el-button  type="primary" class="btn-addmore" :disabled="disCheckIntention" @click="showIntention">查看意向金</el-button>
          <el-button  type="primary" class="btn-addmore" :disabled="disContract" @click="transformContract">转合同押金</el-button>
          <el-button  type="primary" class="btn-addmore" :disabled="disReturn" @click="returnIntention">退还</el-button>
          <!-- <el-button  type="primary" class="btn-addmore" :disabled="disCheckRecord">查看退还记录</el-button> -->
        </div>
        <div class="right">
          <el-input v-model="inputSearch"  placeholder="搜索..." class="searchInput"></el-input>
          <el-button  type="primary" class="el-icon-search btn-addmore"></el-button>
        </div>
      </div>
    </section>
    <el-table
        :data="intentionTable"
        v-loading="listLoading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="function(row){return ('row-'+ row.rowIndex % 2) ;}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="intentionCode" label="意向金编号"></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="preManagerArea" label="意向管理区"></el-table-column>
        <el-table-column prop="preFloor" label="意向楼宇"></el-table-column>
        <el-table-column prop="preRoomCode" label="意向房间代码"></el-table-column>
        <el-table-column prop="receivedIntetion" label="已收意向金(元)"></el-table-column>
        <el-table-column prop="receivedDate" label="收取时间"></el-table-column>
        <el-table-column prop="restMoney" label="剩余可用金"></el-table-column>
        <el-table-column prop="isReturned" label="是否退还">
          <template slot-scope="scope">
            <span v-if="scope.row.isReturned">是</span>
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
    <el-dialog title="意向金详情" :visible.sync="isShowIntention" width="85%">
      <el-form ref="intentionForm" :model="intentionForm" :rules="intentionFormRules" label-width="auto">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="意向管理区">
              <el-input v-model="intentionForm.preManagerArea" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="意向楼宇">
              <el-input v-model="intentionForm.preFloor" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="意向房间代码">
              <el-input v-model="intentionForm.preRoomCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收取意向金">
              <el-input v-model="intentionForm.preFloor" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="客户名称">
              <el-input v-model="intentionForm.customerName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收取意向金">
              <el-input v-model="intentionForm.receivedIntetion" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="收取时间">
              <el-input v-model="intentionForm.receivedDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="剩余可用金">
              <el-input v-model="intentionForm.restMoney" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowIntention = false" class="btn-trans">取 消</el-button>
        <el-button
          type="primary"
          @click="isShowIntention = false"
          class="btn-addmore"
        >确 定</el-button>
      </span>
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
      listLoading: false,
      inputSearch:'',
      selectionLengh:0,
      multipleSelection:[],
      arrayIndex:[],//多选按钮选中后index数组
      intentionForm:{},
      intentionFormRules:{},
      isShowIntention:false,//查看意向金弹窗
      disCheckIntention:true,//查看意向金不可点击
      disContract:true,//转合同押金不可点击
      disReturn:true,//退还按钮不可点击
      disCheckRecord:true,//查看退还记录不可点击
      intentionTable: [
        {
          intentionCode:'Z01',
          customerName:'张三',
          preManagerArea:'明珠城(商业)',
          preFloor:'A区5号楼',
          preRoomCode:'#FL101',
          receivedIntetion:'1000',
          receivedDate:'2020-6-17',
          restMoney:'200',
          isReturned:false
        },
        {
          intentionCode:'Z02',
          customerName:'李四',
          preManagerArea:'时代佳苑(住苑)',
          preFloor:'B区4号楼',
          preRoomCode:'#FL102',
          receivedIntetion:'2000',
          receivedDate:'2020-6-15',
          restMoney:'400',
          isReturned:false
        }
      ]
    }
  },
  methods:{
    handleSizeChange(size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDeviceList();
    },
    handleSelectionChange(val) {
      this.arrayIndex = [];
      this.selectionLengh = val.length;
      this.multipleSelection = val;
      val.forEach(value => {
        this.intentionTable.forEach((v, i) => {
          if (value.intentionCode == v.intentionCode) {
            this.arrayIndex.push(i);
          }
        });
      });
    },
    //展示意向金详情
    showIntention() {
      this.intentionForm = {...this.multipleSelection[0]}
      this.isShowIntention = true
    },
    //退还意向金
    returnIntention() {
      this.$confirm(`确定要退还意向押金吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.arrayIndex.forEach((item) => {
        this.intentionTable[item].receivedIntetion = 0
        this.intentionTable[item].restMoney = 0
        this.intentionTable[item].isReturned = true
        })
        this.$message({
          type: "success",
          message: "退还成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消退还"
        });
      });
    },
    //转合同押金（这里就暂时删除）
    transformContract() {
      this.$confirm(`确定要转合同押金吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        for (let i = 0; i < this.intentionTable.length; i++) {
          const element = this.intentionTable[i];
          element.id = i;
        }
        this.multipleSelection.forEach(element => {
          this.intentionTable.forEach((e, i) => {
            if (element.id == e.id) {
              this.intentionTable.splice(i,1)
            }
          });
        });
        this.$message({
          type: "success",
          message: "转移成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消转移"
        });
      });
    }
  },
  watch: {
    selectionLengh: function(newLen) {
      if (newLen != 0) {
        this.disReturn = false;
        this.disContract = false;
      } else {
        this.disReturn = true;
        this.disContract = true;
      }
      if (newLen === 1) {
        this.disCheckIntention = false;
        // this.disCheckRecord = false;
      } else {
        this.disCheckIntention = true;
        // this.disCheckRecord = true;
      }
    }
  }
}
</script>

<style>

</style>