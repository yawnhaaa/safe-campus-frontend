<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref} from 'vue'
import '../styles/page.scss'
import {request} from "@/api/request";
import * as echarts from 'echarts'
import 'echarts/theme/macarons' // 导入echarts主题
import '../styles/page.scss'
import {pieOption, barOption, pie2Option} from '@/assets/data/visual-data'


interface Visual {
  title: string;
  number: number;
}

export default defineComponent({
  name: "VisualPage",

  setup() {
    const visualList = ref<Visual[]>([]);
    let pieChart: echarts.ECharts | null = null;
    let barChart: echarts.ECharts | null = null;
    let pie2Chart: echarts.ECharts | null = null;

    const getVisualList = () => {
      request.get("/getVisualList").then((res) => {
        if (res.data.code === 200) {
          visualList.value = res.data.data;
        }
      });
    };

    const drawPieChart = () => {
      const chartDom = document.getElementById('pie-chart') as HTMLDivElement;
      if (!chartDom) return;
      if (pieChart) {
        pieChart.dispose(); // Dispose previous instance if exists
      }
      pieChart = echarts.init(chartDom);
      pieChart.setOption(pieOption); // 使用上面定义的option配置绘制饼图
    };

    const drawBarChart = () => {
      const chartDom = document.getElementById('bar-chart') as HTMLDivElement;
      if (!chartDom) return;
      if (barChart) {
        barChart.dispose(); // Dispose previous instance if exists
      }
      barChart = echarts.init(chartDom);
      barChart.setOption(barOption); // 使用上面定义的option配置绘制饼图
    };

    const drawPie2Chart = () => {
      const chartDom = document.getElementById('pie2-chart') as HTMLDivElement;
      if (!chartDom) return;
      if (pie2Chart) {
        pie2Chart.dispose(); // Dispose previous instance if exists
      }
      pie2Chart = echarts.init(chartDom);
      pie2Chart.setOption(pie2Option); // 使用上面定义的option配置绘制饼图
    };

    const initChart = () => {
      drawPieChart();
      drawPie2Chart();
      drawBarChart();
    };

    onMounted(() => {
      getVisualList();
      initChart();
    });

    // Ensure to dispose of the charts when the component is unmounted
    onBeforeUnmount(() => {
      if (pieChart) {
        pieChart.dispose();
      }
      if (barChart) {
        barChart.dispose();
      }
      if (pie2Chart) {
        pie2Chart.dispose();
      }
    });

    return {
      visualList,
    };
  }
});

</script>

<template>
  <div class="page-contain">
    <div class="header">
      <div class="data-box" v-for="(item, index) in visualList" :key="index">
        <div>{{ item.title }}</div>
        <div>{{ item.number }}</div>
      </div>
    </div>
    <div>
      <div class="chart-title">近半年各地区易感人群分布</div>
      <div id="pie-chart" style="width: 100%; height: 400px;"></div>
    </div>
    <div>
      <div class="chart-title">近半年易感人群数量趋势</div>
      <div id="bar-chart" style="width: 100%; height: 400px;"></div>
    </div>
    <div>
      <div class="chart-title">近半年各地区易感人群分布</div>
      <div id="pie2-chart" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
}

.data-box {
  flex: 1;
  padding: 2px;
  margin: 5px 5px 5px 0;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: center;
}

.chart-title {
  text-align: center;
  margin-top: 20px;
  font-size: 28px;
}
</style>