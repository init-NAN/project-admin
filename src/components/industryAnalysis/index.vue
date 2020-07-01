<template>
  <div class="industry">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
.industry {
  .main-content {
    .grid-content {
      margin-bottom: 15px;
      .buttonHead {
        margin-bottom: 20px;
        .left {
          display: flex;
          justify-content: flex-start;
        }
        .right {
          display: flex;
          justify-content: flex-end;
          .searchInput {
            .el-input__inner {
              background-color: transparent;
              border: 1px solid #9ea2c0;
            }
            width: 40%;
          }
        }
      }
    }
  }
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
  .el-form {
    .el-form-item {
      .el-form-item__label-wrap {
        margin-left: 0 !important;
        .el-form-item__label {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .el-table th,
  .el-table tr {
    background-color: rgba(0, 0, 0);
  }
  .el-table td {
    border-bottom: none;
  }
  .el-dialog {
    background-color: rgba(10, 13, 51, 0.7);
    transform-origin: 141px 134.563px;
    .el-form {
      .superiorOrganization {
        .el-select {
          width: 100%;
        }
      }
      .el-form-item__label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .el-form-item {
        .el-form-item__content {
          .el-date-editor {
            .el-range-input,
            .el-range-separator {
              background-color: transparent;
              color: rgba(255, 255, 255, 1);
            }
          }
          .el-textarea {
            .el-textarea__inner {
              background: transparent;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
    /deep/ .el-dialog__header {
      padding: 10px 20px 10px;
      background: url("../../assets/comment/type(1).png") no-repeat;
      .el-dialog__title {
        color: #fff;
      }
    }
    /deep/ .el-dialog__footer {
      background: url("../../assets/comment/type(2).png") no-repeat right;
      padding: 50px 20px 20px;
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
  .el-table__fixed-right::before {
    height: 0;
  }
  .el-table__body tr.hover-row > td {
    background-color: rgba(158, 162, 192, 0.5);
    border-bottom: none;
  }
  .table-del {
    color: #eb6370 !important;
    text-decoration: underline;
    background: transparent;
  }
  /deep/ .table-show,
  /deep/ .table-change {
    color: #49a9ff !important;
    text-decoration: underline;
    background: transparent;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-input__inner,
  .el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border: 1px solid rgba(158, 162, 192, 1);
    color: #fff;
  }
  .margin-bottom {
    margin-bottom: 20px;
  }
  .margin-top {
    margin-top: 20px;
  }
  .hidden-card {
    height: 100px;
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-tabs__item {
    color: rgba(255, 255, 255, 1);
  }
  .el-tabs__item.is-active {
    color: #4094ff;
  }
@media only screen and (min-width: 1200px) {
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          .searchInput {
            width: 40%;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          .searchInput {
            width: 100%;
          }
        }
      }
    }
  }
  .main-content {
    .grid-content {
      .buttonHead {
        .right {
          margin-top: 10px;
        }
      }
    }
  }
}
}
</style>