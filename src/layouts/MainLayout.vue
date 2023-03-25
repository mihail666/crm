<template>
  <div>
    <crm-loader v-if="loading"/>
      <div class="app-main-layout" v-else>
        <crmNavbar
        @isOpenSide="isOpenSide"/>
        <crmSidebar v-model="isOpen"/>

        <main class="app-content" :class="{full : !isOpen}">
          <div class="app-page">
            <router-view />
          </div>
        </main>

        <div class="fixed-action-btn">
          <router-link class="btn-floating btn-large blue" to="/Record">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import crmSidebar from '@/components/app/crmSidebar'
import crmNavbar from '@/components/app/crmNavbar'
import crmLoader from '@/components/app/crmLoader'
import { useStore } from 'vuex'
import { computed } from 'vue'
import messages from '@/plugins/messages'

export default {
  setup () {
    const store = useStore()
    const error = computed(() => store.getters.error)
    return { error }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'что-то пошло не так')
    }
  },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  components: {
    crmNavbar,
    crmSidebar,
    crmLoader
  },
  methods: {
    isOpenSide () {
      this.isOpen = !this.isOpen
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).value) {
      await this.$store.dispatch('GET_INFO')
    }

    this.loading = false
  }

}
</script>
