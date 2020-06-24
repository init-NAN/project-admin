<template>
  <div class="container">
    <i :class="[isRefresh?'loading el-icon-pms-Loading':'refresh el-icon-pms-ico_reset']"  @click="refresh" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRefresh:false
    }
  },
  methods:{
     refresh() {
       this.isRefresh = true
      setTimeout(()=>{
        this.isRefresh = false
      },1000)
    }
  }
}
</script>

<style lang="less">
.container {
  .refresh, .loading {
    width:21px;
    height: 21px;
    font-size: 21px;
    position: absolute;
    top: 10px;
    right: 15px;
    color: #fff;
    cursor: pointer;
  }
  .loading {
    animation: rotate 3s linear infinite;
  }
  @keyframes rotate{from{transform: rotate(0deg)}
  to{transform: rotate(360deg)}
  }
}
</style>