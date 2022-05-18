<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="name">admin</p>
            <p class="access">super manager</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2021-7-20</span></p>
          <p>上次登陆地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 0">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ padding: 0 }"
          style="margin-top: 10px; padding: 10px"
        >
          <div class="detail-card">
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="sum">${{ item.value }}</p>
              <p class="text">{{ item.name }}</p>
            </div>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin-top: 15px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 300px; width: 48%">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height: 300px; width: 48%">
          <div style="height: 280px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '@/api/data'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      userImg: require('@/assets/img/avatar.png'),
      tableData: [],
      // tableData: [
      //   {
      //     name: 'oppo',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'vivo',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'iphone',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'samsung',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'huawei',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'xiaomi',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   }
      // ],
      tableLabel: {
        name: 'type',
        todayBuy: 'today',
        monthBuy: 'month',
        totalBuy: 'total'
      },
      countData: [
        {
          name: 'Pay order today',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: 'collect order today',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: 'No pay order today',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: 'Pay order this month',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: 'collect order this month',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: 'No pay order this month',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data
      if (code === 20000) {
        // 折线图
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
        })
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          tooltip: {
            trigger: 'item'
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)

        // 柱状图
        const userOption = {
          legend: {
            textStyle: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: data.userData.map((item) => item.date),
            axisLine: {
              color: '#17b3a3'
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            }
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [
            {
              name: 'New',
              data: data.userData.map((item) => item.new),
              type: 'bar'
            },
            {
              name: 'Active',
              data: data.userData.map((item) => item.active),
              type: 'bar'
            }
          ]
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)

        // 饼图
        const videoOption = {
          tooltip: {
            trigger: 'item'
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series: [
            {
              data: data.videoData,
              roseType: 'angle',
              type: 'pie'
            }
          ]
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;
  img {
    width: 150px;
    border-radius: 80px;
    background-color: rgb(145, 195, 238);
  }
  .user-info {
    margin-left: 50px;
    margin-top: 50px;
    align-items: center;
    width: 100%;
    text-transform: capitalize;
    .name {
      font-size: 24px;
      margin-bottom: 5px;
    }
    .access {
      font-size: 16px;
      color: #aaa;
      text-shadow: 1px 1px 1px black;
    }
  }
}
.login-info {
  margin-top: 20px;
  color: #aaa;
  p {
    margin-top: 5px;
  }
  span {
    margin-left: 50px;
    color: rgb(15, 15, 15);
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detail-card {
    width: 300px;
    display: flex;
    .icon {
      font-size: 50px;
      padding: 10px;
    }
    .detail {
      margin-left: 50px;
      align-items: center;
      .sum {
        font-size: 26px;
      }
      .text {
        margin-top: 10px;
        font-size: 14px;
        color: #aaa;
      }
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
