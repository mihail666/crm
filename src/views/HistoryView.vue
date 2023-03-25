<template>
  <crm-loader v-if="state.loadin" />
    <div v-else-if="state.recordsNotNull">
      <p>создайте хотябы одну записть</p>
      <router-link to="/Record">
        Перейти к созданию новой записи
      </router-link>
    </div>
  <div v-else>
    <div>
      <div class="page-title">
        <h3>История расходов</h3>
      </div>
      <div class="page-subtitle">
          <h4>Статистика расходов</h4>
        </div>
      <div class="row history-charts-container">
        <div class="col s12 history-chart">
          <BarChart
            :chartD="state.chartData"
            :chartColors="state.arrColors"
          />
        </div>
        <div class="col s12 history-chart">
          <DoughnutChart
            :chartD="state.chartData"
            :chartColors="state.arrColors"
          />
        </div>
      </div>
      <section>
        <div class="page-subtitle">
          <h4>Таблица записей</h4>
        </div>
        <crm-history-table :recordArr="state.newRecordArr"/>
      </section>
    </div>
    <div class="fixed-action-btn">
      <a @click.prevent class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/app/BarChart.vue'
import DoughnutChart from '@/components/app/DoughnutChart.vue'
import crmLoader from '@/components/app/crmLoader.vue'
import crmHistoryTable from '@/components/crmHistoryTable.vue'
import dateFilter from '../filters/date.filter'
import { reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  components: { crmHistoryTable, crmLoader, BarChart, DoughnutChart },
  setup (page) {
    useMeta({ title: 'История' })
    const store = useStore()
    const state = reactive({
      newRecordArr: null,
      loadin: false,
      recordsNotNull: true,
      chartData: [],
      arrColors: []
    })

    const categoriesArr = computed(() => store.getters.categories).value
    const recordsArr = computed(() => store.getters.records).value

    function getColors () {
      for (let i = 0; i < categoriesArr.length; i++) {
        state.arrColors.push(`#${(Math.ceil(Math.random(155, 255) * 1000000))}`)
      }
    }

    function getChartData () {
      state.chartData = {
        labels: categoriesArr.map(c => c.title),
        datesets: [{
          label: 'Data One',
          data: categoriesArr.map(c => {
            return recordsArr
              .filter(r => r.categoryId === c.id)
              .filter(r => r.type === 'outcome')
              .reduce((total, record) =>
                total + record.amount, 0)
          })
        }]
      }
    }
    onMounted(async () => {
      await store.dispatch('GET_CATEGORIES')
      await store.dispatch('GET_RECORDS')
      if (recordsArr.length) {
        state.newRecordArr = recordsArr.map(record => {
          return {
            ...record,
            categoryName: categoriesArr.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход',
            filterDate: dateFilter(record.date, 'date time')
          }
        })
        state.recordsNotNull = false
      }
      getColors()
      getChartData()
      state.loadin = false
    })
    return {
      state,
      categoriesArr,
      recordsArr
    }
  }
}
</script>
