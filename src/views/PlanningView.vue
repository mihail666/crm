<template>
  <crm-loader v-if="state.loader" />
  <div v-else-if="!records.length > 0">
    <router-link to="/Record">создать запись</router-link>
  </div>
  <div v-else>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ userBill }} Руб.</h4>
    </div>

    <section>
      <div
        v-for="cat in state.categories"
        :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend }} P из {{ cat.limit }} p
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
        ></div>
        </div>
      </div>
    </section>
  </div>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large blue" href="#">
      <i class="large material-icons">add</i>
    </a>
  </div>
</template>

<script>
import crmLoader from '@/components/app/crmLoader.vue'
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  setup () {
    useMeta({ title: 'Планирование' })
    const store = useStore()
    const state = reactive({
      loading: true,
      recordEmpty: true,
      categories: []
    })
    const userBill = computed(() => store.getters.info.bill)
    const categories = computed(() => store.getters.categories).value
    const records = computed(() => store.getters.records).value

    onMounted(async () => {
      await store.dispatch('GET_CATEGORIES')
      await store.dispatch('GET_RECORDS')

      state.categories = categories.map(cat => {
        const spend = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) =>
            total + record.amount, 0)
        const percent = 100 * spend / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend
        }
      })

      state.loading = false
    })
    return { state, userBill, categories, records }
  },
  components: {
    crmLoader
  }
}
</script>
