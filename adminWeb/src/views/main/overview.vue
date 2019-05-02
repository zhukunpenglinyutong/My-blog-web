<template>
  <div>

    <!-- 1. 服务器信息，各个平台的连接情况 -->
    <el-row :gutter="24">
      <el-col :lg="16" >
        <el-card class="one1">
          服务器信息：CPU信息, 内存使用信息, 硬盘使用情况, 服务器负载状况（可以利用 node来做，并用Echarts进行渲染)
        </el-card>
      </el-col>
      <!-- 知识预警信息，安全层报警预警（分析异常信息） -->
      <el-col :lg="8">
        <el-card class="one2">
          各个平台的连接情况，yapi.itzkp.com, gitlab.itzkp.com, jenkins.itzkp.com，itzkp.com
        </el-card>
      </el-col>
    </el-row>

    <!-- 2. 计划 -->
    <el-row :gutter="24">
      <el-col :lg="12">
        <el-card class="one3">
          <!-- 计划：一个 element.ui 周日历 -->
          <el-calendar :range="['2019-04-29', '2019-05-05']">
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''" @click="clickFun(data)">
                {{ data.day.split('-')[2] }} 
              </p>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
        
      <el-col :lg="12">
        <el-card class="one4">
          其他
        </el-card>
      </el-col>
    </el-row>

    <!-- 3. 网站访问量大致情况统计 -->
    <el-row :gutter="24">
      <el-col :lg="24" class="one5">
        <!-- 网站大致访问情况：访问量统计，一个Echarts实时的曲线，放到最下面 -->
        <!-- <div id="myChart" style="width:100%;height:100%;"></div> -->
        <highcharts :options="options"></highcharts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 图标数据（暂时模拟）
let options = {
	chart: {
		type: 'area'
	},
	title: {
		text: '网站访问量统计'
	},
	xAxis: {
		allowDecimals: false
	},
	yAxis: {
		title: {
			text: '访问量'
		},
	},
	// tooltip: {
	// 	pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
	// },
	plotOptions: {
		area: {
			pointStart: 1,
			marker: {
				enabled: false,
				symbol: 'circle',
				radius: 2,
				states: {
					hover: {
						enabled: true
					}
				}
			}
		}
	},
	series: [{
		name: '访问量',
		data: [ 6, 11, 32, 110, 235, 369, 640,105, 146, 203, 3057, 468, 644, 922, 1568, 2034, 2426, 10, 20,30,10,300,40,100,300]
	}]
}

export default {

  data () {
    return {
      options: options
    }
  },

  mounted(){
    // this.drawLine();  // 初始化
    
  },

  methods: {

    clickFun (data) {
      this.$message.success(`当前点击日期：${data.day}，查询这一天的计划，会弹出框整理计划啥的`)
      console.log(data)
    },

    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
          title: {
              text: '直接访问量'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data:['直接访问量']
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'直接访问量',
                  type:'line',
                  stack: '总量',
                  itemStyle:{
                    normal:{
                        color:'#333399',
                        borderColor:'#00FFCC',
                    }
                  },
                  label: {
                      normal: {
                          show: true,
                          position: 'top'
                      }
                  },
                  areaStyle: {normal: {}},
                  data:[820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 90]
              }
          ]
      });
    }
  }
}
</script>


<style scoped>
  .one1 {
    color: #fff;
    background: #0000CC;
    height: 300px;
    margin-bottom: 20px;
  }
  .one2 {
    color: #fff;
    background: #0033FF;
    height: 300px;
  }
  .one3 {
    color: #fff;
    background: #0099FF;
    height: 250px;
    margin-bottom: 20px;
  }
  .one4 {
    color: #fff;
    background: #0099CC;
    height: 250px;
  }
  .one5 {
    padding: 0px 12px;
    color: #fff;
    /* background: #2d2c2e; */
    height: 300px;
  }
</style>
