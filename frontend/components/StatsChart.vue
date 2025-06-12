<template>
    <Line :data="chartData" />
</template>
  
<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref, watchEffect } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const { label, data, color} = defineProps<{ label: string; data: number[]; color: string }>()

const chartData = ref({
  labels: Array.from({ length: 5 }, (_, i) => `${i + 1}`),
  datasets: [{
    label: '',
    data: [],
    borderColor: color,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    fill: true,
    tension: 0.4
  }]
})

watchEffect(() => {
  chartData.value.datasets[0].label = label
  chartData.value.datasets[0].data = data
})
</script>