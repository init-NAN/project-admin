<template>
  <div class="container">
    <img :class="[isRefresh?'loading':'refresh']" :src="isRefresh?require('@/assets/img/loading.png'):require('@/assets/img/refresh.png')" @click="refresh">
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
    position: absolute;
    top: 10px;
    right: 15px;
    color: #fff;
    cursor: pointer;
  }
  .loading {
    width: 18px;
    height: 18px;
    top: 12px;
    right: 17px;
    animation: rotate 3s linear infinite;
  }
  @keyframes rotate{from{transform: rotate(0deg)}
  to{transform: rotate(360deg)}
  }
}
</style>