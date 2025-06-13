<template>
    <Line :data="chartData" />
</template>
  
<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Line } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const { label, data, color} = defineProps<{ label: string; data: number[]; color: string }>()

const chartData = computed(() => {
  const recentData = data.slice(-8)
  return {
    labels: recentData.map((_, i) => `${i + 1}`),
    datasets: [{
      label: label,
      data: recentData,
      borderColor: color,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4
    }]
  }
})
</script>