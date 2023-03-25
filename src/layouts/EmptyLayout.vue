<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
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
  }
}
</script>
