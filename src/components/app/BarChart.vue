<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data (props) {
    return {
      chartData: {
        labels: props.chartD.labels,
        datasets: [
          {
            label: 'Расходы',
            backgroundColor: props.chartColors,
            pointRadius: 4,
            hoverOffset: 50,
            barPercentage: 0.5,
            maxBarThickness: 50,
            minBarLength: 2,
            data: props.chartD.datesets[0].data,
            skipNull: true
          }
        ]
      },
      chartOptions: {
        responsive: true,
        skipNull: true,
        legend: {
          display: false
        }
      }
    }
  },
  props: {
    chartD: {
      type: Object,
      required: true
    },
    chartColors: {
      type: Array,
      required: true
    }
  }
}
</script>
