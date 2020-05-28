<template>
  <div class="estate">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.estate {
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
  /deep/ .el-input-group__append {
    background-color: transparent;
    color: #fff;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: transparent;
  }
  //日期选择器
  /deep/.el-range-input {
    background-color: transparent;
  }

  /deep/ .el-range-separator {
    color: #fff;
  }
  .el-dialog__title {
    color: #fff;
  }

  /deep/ .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }

  .el-input-number__decrease,
  .el-input-number__increase {
    background-color: transparent;
    color: #fff !important;
  }
  .el-input-number__decrease.is-disabled,
  .el-input-number__increase.is-disabled {
    color: #c0c4cc !important;
  }
  .el-form {
    .el-form-item__label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }

  .el-select {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
  .el-radio-group {
    width: 100%;
  }
  .el-dialog {
    background-color: rgba(10, 13, 51, 0.7);
    transform-origin: 141px 134.563px;

    /deep/ .el-input-group__append {
      background-color: transparent;
      color: #fff;
    }
    .el-input.is-disabled .el-input__inner {
      background-color: transparent;
    }
    //日期选择器
    /deep/.el-range-input {
      background-color: transparent;
    }

    /deep/ .el-range-separator {
      color: #fff;
    }
    .el-dialog__title {
      color: #fff;
    }

    /deep/ .el-input__inner,
    .el-textarea__inner {
      background-color: transparent;
      border: 1px solid rgba(158, 162, 192, 1);
      color: #fff;
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      background-color: transparent;
      color: #fff !important;
    }
    .el-input-number__decrease.is-disabled,
    .el-input-number__increase.is-disabled {
      color: #c0c4cc !important;
    }
  }

  .add-files {
    .el-select {
      width: 100%;
    }
    .el-input-number {
      width: 100%;
    }
    .el-radio-group {
      width: 100%;
    }

    /deep/ .el-card__header {
      border: none;
      color: #fff;
      text-align: left;
    }
    /deep/ .el-card {
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
      .el-form {
        .el-form-item__label {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  /deep/ .el-dialog__header {
    background: url("../../assets/comment/type(1).png") no-repeat;
    padding: 10px 20px 10px;
  }
  /deep/ .el-dialog__footer {
    background: url("../../assets/comment/type(2).png") no-repeat right;
    padding: 50px 20px 20px;
  }
  .type-title {
    line-height: 40px;
    color: #fff;
    font-size: 20px;
    margin-right: 20px;
  }
  .ul-list {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

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
}
</style>