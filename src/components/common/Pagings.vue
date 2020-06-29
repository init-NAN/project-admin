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
  data () {
    return {

    }
  },
  props: {
    total: {      // 总条目数
      type: Number,
      default: 1   //默认值
    },
    pageSize: {      //每页显示条目个数
      type: Number,
      default: 10
    },
    page: {        //当前页数
      type: Number,
      default: 1
    },
  },
  methods: {
    handleSizeChange (val) {      //pageSize 改变时会触发
      this.$emit('handleSizeChangeSub', val);
    },
    handleCurrentChange (val) {   //currentPage 改变时会触发
      this.$emit('handleCurrentChangeSub', val);
    }
  },

}
</script>

<style>
</style>