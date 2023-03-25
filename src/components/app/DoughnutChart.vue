<template>
  <Doughnut id="chart-id" :data="data" />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'BarChart',
  components: { Doughnut },
  data (props) {
    return {
      chartData: {
        labels: props.chartD.labels,
        datasets: [
          {
            label: 'расходы',
            borderColor: '#77b7cd', // цвет линии
            pointBackgroundColor: '#77b7cd',
            pointRadius: 4,
            data: props.chartD.datesets[0].data
          }
        ]
      }
    }
  },
  setup (props) {
    const data = {
      labels: props.chartD.labels,
      datasets: [{
        label: 'Расходы',
        data: props.chartD.datesets[0].data,
        backgroundColor: props.chartColors,
        hoverOffset: 5,
        pointRadius: 4
      }]
    }
    return { data }
  },
  props: {
    chartD: {
      type: Object,
      required: true
    },
    chartColors: {
      type: Object,
      required: true
    }
  }
}
</script>
