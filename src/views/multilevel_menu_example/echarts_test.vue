<template>
  <div>
    <div id="main" class="myChart" style="width: 800px;height:800px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import api from "@/api";

const test = ref('')

api.get('/data/weather')

onMounted(() => {
  const dom = document.getElementById('main');
  if (dom) {
    const myChart = echarts.init(dom);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  } else {
    console.error('无法找到 #main 元素');
  }
});
</script>
