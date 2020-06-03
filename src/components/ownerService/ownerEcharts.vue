<template>
  <div class="main-content">
    <el-row class="overviewItem" type="flex">
      <el-col :span="12" class="overviewCard">
        <div class="cardHead">交房总览</div>
        <div class="cardBody">
          <div ref="handoverOverView" style="width:100%;height:280px;" class="handoverOverView">
          </div>
        </div>
        </el-col>
      <el-col :span="12" class="overviewCard" :offset="1">
        <div class="cardHead">收房总览</div>
        <div class="cardBody">
          内容<br/>
          内容<br/>
          内容<br/>
          内容<br/>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="10" class="overviewCard">
        <div class="cardHead">入住总览</div>
        <div class="cardBody">
          <div class="item">
          内容<br/>
          内容<br/>
          内容<br/>
          内容<br/>
          </div>
        </div>
        </el-col>
      <el-col :span="13" class="overviewCard" :offset="1">
        <div class="cardHead">装修总览</div>
        <div class="cardBody">
          内容<br/>
          内容<br/>
          内容<br/>
          内容<br/>
        </div>
      </el-col>
    </el-row>
    <el-row class="overviewItem" type="flex">
      <el-col :span="15" class="overviewCard">
        <div class="cardHead">报修总览</div>
        <div class="cardBody">
          <div class="item">
            <div class="left">
              内容<br/>
              内容<br/>
              内容<br/>
              内容<br/>
            </div>
            <div class="line"></div>
            <div class="right"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    let ec = echarts.init(this.$refs.handoverOverView)
    let option = 
    {
    title: {
        text: '交房面积',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#fff'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '交房面积',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: [
                {value: 335, name: '明珠城'},
                {value: 310, name: '绿岛城'},
                {value: 274, name: '商业中心'},
                {value: 235, name: '办公区'},
                {value: 400, name: '住宅区'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.8)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#3e7bec',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
    };
    ec.setOption(option)
  }
}
</script>

<style lang="less" scope>
.main-content {
  .overviewItem {
    height: 320px;
    margin-bottom: 20px;
    .overviewCard {
      .cardHead {
        color:#fff;
        padding-top: 6px;
        padding-left: 10px;
        box-sizing: border-box;
        height: 37px;
        width: 100%;
        background-size: 100%;
        background-position: center 0;
        background:url("../../assets/type.png")  no-repeat rgba(10,13,51,0.3);
      }
      .cardBody {
        background:rgba(10,13,51,0.7);
        color: #9EA2C0;
      }
    }
  }
}
</style>