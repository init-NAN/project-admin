function deleteAll(tableDate, checkedBox) {
  this.$confirm("永久删除数据, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
      for (let i = 0; i < tableDate.length; i++) {
        const element = tableDate[i];
        element.id = i
      }
      checkedBox.forEach(element => {
        tableDate.forEach((e, i) => {

          if (element.id == e.id) {
            this.tableDate.splice(i, 1)
          }
        });
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    })
    .catch(() => {
      this.$message({
        type: "info",
        message: "已取消删除"
      });
    });
}
export default deleteAll