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
    }
    /deep/ .el-dialog__header  {
      background: url("../../assets/comment/type(1).png") no-repeat;
      .el-dialog__title {
        color: #FFF;
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
  .el-drawer {
    background-color: rgba(10, 13, 51, 0.7);
    transform-origin: 141px 134.563px;
    min-width: 820px;
    overflow-y: auto;
    :focus {
      outline: 0;
    }
    /deep/ .el-drawer__header {
      background: url("../../assets/comment/type(1).png") no-repeat;
      padding: 10px 20px 10px;
      :first-child {
        color: #fff;
        font-size: 18px;
      }
    }
    /deep/ .el-drawer__body {
      .roomCodeDetail {
        .simpData {
          .el-card__body {
            justify-content: space-between;
            display: flex;
            .simpleRoomData {
              span {
                height: 40px;
                line-height: 40px;
              }
            }
          }
        }
        .baseData {
          .el-card__header {
            text-align: left;
          }
          .el-row {
            .item {
              text-align: left;
              margin-bottom: 23px;
            }
          }
        }
        .ownerTab {
          #tab-owner, #tab-currentMember {
            font-size: 18px;
          }
        }
      }
    }
    /deep/ .el-drawer__footer {
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
      margin-bottom: 15px;
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
}
</style>