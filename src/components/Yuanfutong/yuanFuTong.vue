<template>
  <div class="yuan">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.yuan {
  .margin-bottom {
    margin-bottom: 20px;
  }
  .el-table__fixed-right:before,
  .el-table__fixed:before {
    height: 0;
  }
  .el-table th,
  .el-table tr {
    background-color: rgba(0, 0, 0, 1);
  }
  .el-table .el-button {
    color: #fff;
    background-color: transparent;
    font-size: 13px;
  }
  .el-table__body tr.hover-row > td {
    background-color: rgba(158, 162, 192, 0.5);
  }
  .el-table td {
    border: transparent;
  }
  .el-input-group__append {
    background-color: transparent;
    color: #fff;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: transparent;
  }
  //日期选择器
  .el-range-input {
    background-color: transparent;
  }

  .el-range-separator {
    color: #fff;
  }
  .el-dialog__title {
    color: #fff;
  }

  .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
    background: #000\9; /*IE*/
    filter: alpha(opacity=50); /*IE*/
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
  .el-date-editor.el-input{
    width: 100%;
  }
  .el-dialog {
    background-color: rgba(19, 24, 55, 1);
    transform-origin: 141px 134.563px;

    .el-input-group__append {
      background-color: transparent;
      color: #fff;
    }
    .el-input.is-disabled .el-input__inner {
      background-color: transparent;
    }
    //日期选择器
    .el-range-input {
      background-color: transparent;
    }

    .el-range-separator {
      color: #fff;
    }
    .el-dialog__title {
      color: #fff;
    }

    .el-input__inner,
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

    .el-card__header {
      border: none;
      color: #fff;
      text-align: left;
    }
    .el-card {
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

  .el-dialog__header {
    background: url("../../assets/comment/type(1).png") no-repeat;
    padding: 10px 20px 10px;
  }
  .el-dialog__footer {
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
  .table-show,
  .table-change {
    color: #49a9ff !important;
    text-decoration: underline;
  }
  .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
  .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
  }
  .el-range-input {
    color: #fff;
  }
  .hidden-card {
    height: 100px;
    width: 100%;
    background-color: transparent;
  }
}
</style>