<template>
  <el-col class="toolbar">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   :page-sizes="[10, 20, 30, 40, 50, 100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </el-col>
</template>

<script>

export default {
  name: 'pagination', // 组件名
  props: {
    total: { // 总页数
      type: Number,
      default: 0
    },
    currentPage: { // 当前页
      type: Number,
      default: 1
    },
    pageSize: { // 每页显示条数
      type: Number,
      default: 10 // 默认10条
    }
  },
  data () {
    return {
      page: {
        total:'',
        currentPage:'',
        pageSize:'',
      }
    }
  },
  methods: {
    //fenye
    loadData(page = 1) {
      //请求之前有加载动画
      // this.loading = true;

      // this.$axios
      //   .get("", {
      //     params: {
      //       page,
      //       per_page: 6
      //     }
      //   })
      //   .then(res => {
      //     // console.log(res);
      //     // 数据回来了要改为false
      //     this.loading = false;

      //     this.list = res.data.data.results;
      //     this.total = res.data.data.total_count;
      //   });
    },
    handleSizeChange (size) {
      this.pageSize = size;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.loadData(val);
    },
  }

}
</script>

<style>
</style>