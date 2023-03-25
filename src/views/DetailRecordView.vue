<template>
  <crm-loader v-if="loader" />
  <div v-else-if="state.recordArr === 'null'">
    у данноуй категории нет записи {{ }}
  </div>
  <div v-else>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ state.r.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="[state.r.typeClass]"
          >
            <div class="card-content white-text">
              <p>Описание: {{ state.r.description }}</p>
              <p>Сумма: {{state.r.amount }} </p>
              <p>Категория: {{ state.r.title }}</p>
              <small>{{ state.r.filterDate }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import crmLoader from '@/components/app/crmLoader.vue'
import dateFilter from '../filters/date.filter'
import { reactive, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  components: { crmLoader },
  setup () {
    useMeta({ title: 'Информация о записи' })
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      loading: true,
      r: ''
    })
    onMounted(async () => {
      const id = route.params.id
      await store.dispatch('GET_RECORD_BY_ID', id)
      const record = await store.getters.recordById
      await store.dispatch('GET_CATEGORY_BY_ID', record.categoryId)
      const category = await store.getters.categoryById
      state.loading = false
      if (record) {
        state.r = await {
          ...record,
          title: category.title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
          filterDate: dateFilter(record.date, 'date time')
        }
      } else {
        console.log('e')
      }
    })
    onUnmounted(() => {})
    return { state }
  }
}
</script>
