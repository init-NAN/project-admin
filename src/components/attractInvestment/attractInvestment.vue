<template>
  <div class="attra">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.attra {
  .margin-bottom {
    margin-bottom: 20px;
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
  .el-input__inner,
  .el-textarea__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .el-input__inner {
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
  .table-show,
  .table-change {
    color: #49a9ff !important;
    text-decoration: underline;
  }

   .el-dialog__header {
    background: url("../../assets/comment/type(1).png") no-repeat;
    padding: 10px 20px 10px;
  }
   .el-dialog__footer {
    background: url("../../assets/comment/type(2).png") no-repeat right;
    padding: 50px 20px 20px;
  }

  .hidden-card {
    height: 100px;
    width: 100%;
  }
}
</style>