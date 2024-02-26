<template>
  <div class="dashboard-container">
    <div class="card">
      <div class="item item--1">
        <span class="quantity">{{ userNum }}</span>
        <span class="text"> 用户总数 </span>
        <span class="text text--1"> （包括管理员） </span>
      </div>
      <div class="item item--2">
        <span class="quantity">{{ treeholeNum }}</span>
        <span class="text"> 树洞总数 </span>
      </div>
      <div class="item item--3">
        <span class="quantity">{{ postNum }}</span>
        <span class="text"> 游记总数 </span>
      </div>
      <div class="item item--4">
        <span class="quantity">{{ postCommentNum }}</span>
        <span class="text"> 游记评论总数 </span>
      </div>
    </div>
    <div id="city-echart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import userApi from "@/api/user";
import treeholeApi from "@/api/treehole";
import postApi from "@/api/post";
import cityApi from "@/api/city";

export default {
  data() {
      return {
        userNum: 0, // 用户数量
        treeholeNum: 0, // 树洞数量
        postNum: 0, // 游记数量
        postCommentNum: 0,  // 游记评论数量
        cityData: {}, // 城市攻略数量数据
        chartDom: "",
        myChart: "",
        option: "",
      }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
      
      this.chartDom = document.getElementById("city-echart");
      this.myChart = echarts.init(this.chartDom);
    });
  },
  methods: {
    // 初始化数据
    initData() {
      // 初始化用户数量
      userApi.getUserCount().then(res => {
        this.userNum = res.data
      })
      // 初始化树洞数量
      treeholeApi.getTreeholeCount().then(res => {
        this.treeholeNum = res.data
      })
      // 初始化游记和游记评论数量
      postApi.getPostAndCommentCount().then(res => {
        this.postNum = res.data.postCount
        this.postCommentNum = res.data.postCommentCount
      })

      cityApi.getAllNum().then(res => {
        this.cityData =  res.data

        this.initChart()
      })
    },
    // 初始化图表数据
    initChart() {
      this.option = {
        xAxis: {
          type: 'category',
          data: ['城市','景点', '特色美食', '酒店', '餐馆', '节日', '购物点', '电话','医院']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.cityData.cityCount,
                itemStyle: {
                  color: '#E6E6FA'
                }
              },
              {
                value: this.cityData.scenicSpotCount,
                itemStyle: {
                  color: '#90EE90'
                }
              },
              {
                value: this.cityData.specialSnacksCount,
                itemStyle: {
                  color: '#FFD700'
                }
              },
              {
                value: this.cityData.hotelCount,
                itemStyle: {
                  color: '#FA8072'
                }
              },
              {
                value: this.cityData.restaurantCount,
                itemStyle: {
                  color: '#F4A460'
                }
              },
              {
                value: this.cityData.festivalCount,
                itemStyle: {
                  color: '#FF4500'
                }
              },
              {
                value: this.cityData.shoppingCount,
                itemStyle: {
                  color: '#FF69B4'
                }
              },
              {
                value: this.cityData.telICount,
                itemStyle: {
                  color: '#87CEFA'
                }
              },
              {
                value: this.cityData.hospCount,
                itemStyle: {
                  color: '#00FFFF'
                }
              },
            ],
            // 实现数字展示在柱状图
            label: {
              show: true,
              position: 'inside',
              color:'black'
            },
            type: 'bar'
          }
        ]
      };
      this.option && this.myChart.setOption(this.option);
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card {
  display: flex;
  width: 80vw;
  color: white;
  margin-bottom: 30px;
}

.card .item {
  border-radius: 10px;
  flex: 1;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.item:hover {
  transform: scale(0.98);
  transition: all 0.3s;
}

.item--1 {
  background: linear-gradient(135deg, #c7c7ff, #6495ED);
}

.item--2 {
  background: linear-gradient(135deg, #ffd8be, #F4A460);
}

.item--3 {
  background: linear-gradient(135deg, #a9ecbf, #00FF7F);
}

.item--4 {
  background: linear-gradient(135deg, #f3bbe1, #DB7093);
}

.quantity {
  font-size: 25px;
  font-weight: 600;
}

.text {
  font-size: 20px;
  font-family: inherit;
  font-weight: 600;
  color: white;
}

.text--1 {
  font-size: 13px;
}

// 城市攻略数据柱状图
#city-echart {
  width: 40vw;
  height: 600px;
}
</style>
