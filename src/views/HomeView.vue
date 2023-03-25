<template>
  <div class="home">
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small" @click.prevent="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <crm-loader v-if="loading" />
      <div v-else class="row">

        <crmHomeBill :rates="getRates" />

        <crmHomeCurrency :date="getDate" :rates="getRates" />

      </div>
    </div>
  </div>

  <div class="fixed-action-btn">
    <a class="btn-floating btn-large blue" href="#">
      <i class="large material-icons">add</i>
    </a>
  </div>
</template>

<script>
import crmHomeBill from '@/components/crmHomeBill'
import crmHomeCurrency from '@/components/crmHomeCurrency'
import crmLoader from '@/components/app/crmLoader.vue'
import { useMeta } from 'vue-meta'
export default {
  setup () {
    useMeta({ title: 'Счёт' })
  },
  name: 'HomeView',
  components: {
    crmHomeBill,
    crmHomeCurrency,
    crmLoader
  },
  data: () => ({
    loading: true,
    getRates: null,
    getDate: null

  }),
  computed: {},
  methods: {
    async refresh () {
      this.loading = true
      this.$message('Данные обновлены')
      await this.$store.dispatch('GET_CURRENCY')
      this.getRates = this.$store.getters.currency.rates
      this.getDate = this.$store.getters.currency.date
      console.log('REFRESH')
      this.loading = false
    }
  },
  async mounted () {
    await this.$store.dispatch('GET_CURRENCY')
    this.getRates = this.$store.getters.currency.rates
    this.getDate = this.$store.getters.currency.date
    this.loading = false
  }
}
</script>
