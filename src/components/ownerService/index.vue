<template>
  <div class="rec">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scope>
// 右边固定的操作列样式
.rec {
  .margin-bottom {
    margin-bottom: 20px;
  }
  .el-table th,
  .el-table tr {
    background-color: rgba(0, 0, 0);
  }
  .el-table .el-button {
    color: #fff;
    background: transparent;
  }
  .el-table__body tr.hover-row > td {
    background-color: rgba(158, 162, 192, 0.5);
  }
  .el-table td {
    border: transparent;
  }
  #dropdown {
    margin-left: 0;
  }
  // .searchInput,
  // .input {
  //   .el-input__inner {
  //     background-color: transparent;
  //     border: 1px solid #9ea2c0;
  //   }
  // }
  // .is-disabled,
  // #dropdown {
  //   background-color: transparent !important;
  // }
  // 状态选择样式
  .ul-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 0;
    li {
      margin-right: 20px;
      line-height: 40px;
      list-style: none;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      padding: 0 5px;
      border-radius: 4px;
    }
    .active {
      color: #409eff;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
  /deep/ .el-input__inner,.el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .el-table .el-button {
    color: #fff;
    background-color: transparent;
    font-size: 13px;
  }
  //btn
  .btn-addmore {
    border: none;
    background: linear-gradient(
      323deg,
      rgb(40, 120, 240) 29%,
      rgba(87, 200, 255, 1) 100%
    );
    color: #fff;
    &:hover {
      background: linear-gradient(
        323deg,
        rgb(80, 144, 240) 29%,
        rgb(128, 213, 255) 100%
      );
    }
  }
  .btn-trans {
    border: 1px solid rgba(158, 162, 192, 1);
    background-color: transparent;
    color: #9ea2c0;
    &:hover {
      border-color: rgb(40, 120, 240);
      color: rgb(40, 120, 240);
    }
  }
  .table-del {
    color: #eb6370 !important;
    text-decoration: underline;
  }
  /deep/ .table-show,
  /deep/ .table-change {
    color: #49a9ff !important;
    text-decoration: underline;
  }
}
</style>