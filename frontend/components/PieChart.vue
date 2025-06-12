

<template>
  <Pie :data="chartData" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { ref, watchEffect } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { labels, values, title } = defineProps<{
  labels: string[]
  values: number[]
  title?: string
}>()

const chartData = ref({
  labels,
  datasets: [
    {
      label: title ?? 'Répartition',
      data: values,
      backgroundColor: [
        '#10b981',
        '#8b5cf6',
      ],
      borderWidth: 1
    }
  ]
})

watchEffect(() => {
  chartData.value.labels = labels
  chartData.value.datasets[0].data = values
  chartData.value.datasets[0].label = title ?? 'Répartition'
})
</script>