<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.margin-bottom {
  margin-bottom: 20px;
}

.el-table th,
.el-table tr {
  background-color: rgba(0, 0, 0);
}
.el-table .el-button {
  color: #fff;
  background-color: transparent;
}
.el-table__body tr.hover-row > td {
  background-color: rgba(158, 162, 192, 0.5);
}
.el-table td {
  border: transparent;
}
</style>