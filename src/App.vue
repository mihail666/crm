<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | crm FMR` : `crm FMR` }}</template>
  </metainfo>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import { useMeta } from 'vue-meta'
export default {
  setup () {
    useMeta({
      title: 'crm FMR',
      htmlAttrs: { lang: 'en', amp: true }
    })
  },
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/materialize-css/dist/css/materialize.min.css';
@import '@/assets/index.css'
</style>
