<template>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row" >
      <crm-categories-create />
      <crm-loader v-if="loading" class="col s12 m6"/>
      <div v-else>
        <crm-categories-update
          v-if="categories.length > 0"
          :categories="categories"
          @updated="updatedCategories"
          :key="categories.length + state.count"
        />
      </div>
    </div>
  </section>
</template>

<script>
import crmLoader from '@/components/app/crmLoader.vue'
import crmCategoriesCreate from '@/components/crmCategoriesCreate'
import crmCategoriesUpdate from '@/components/crmCategoriesUpdate'
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import { useMeta } from 'vue-meta'
export default {
  components: {
    crmCategoriesCreate,
    crmCategoriesUpdate,
    crmLoader
  },
  setup () {
    useMeta({ title: 'Категории' })
    const state = reactive({
      count: ''
    })
    const store = useStore()
    const categories = computed(() => store.getters.categories)
    function updatedCategories () {
      state.count++
    }
    return { categories, updatedCategories, state }
  },
  data: () => ({
    loading: true
  }),
  async mounted () {
    this.$store.dispatch('GET_CATEGORIES')
    this.loading = false
  }
}
</script>
