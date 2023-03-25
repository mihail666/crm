<template>
  <ul class="sidenav app-sidenav" :class="{open: modelValue}">
    <li
      v-for="link in links"
      :key="link.url"
      >
      <router-link
        :to="link.url"
        :exact="link.exact"
        class="waves-effect waves-orange pointer"
        >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/History' },
      { title: 'Планирование', url: '/Planning' },
      { title: 'Новая запись', url: '/Record' },
      { title: 'Категории', url: '/Categories' }
    ],
    open: ''
  }),
  props: ['modelValue']
}
</script>

<style>
a.router-link-active {
background: #f0f0f0;

}
</style>
