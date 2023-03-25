<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <div @click.prevent="$emit('isOpenSide')">
          <a href="#">
            <i class="material-icons black-text">dehaze</i>
          </a>
        </div>
        <span class="padding-left black-text">{{ date }}</span>
      </div>
      <div class="index-100">
        <ul class="right hide-on-small-and-down index-100">
          <li>
            <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
              {{ getUserName }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/Profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a @click.prevent="Logout" class="black-text">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script>
import dateFilter from '../../filters/date.filter'
import M from '../../../node_modules/materialize-css/dist/js/materialize.min.js'
export default {
  data: () => ({
    date: 'загрузка',
    interval: null,
    doropdowm: null
  }),
  methods: {
    async Logout () {
      await this.$store.dispatch('LOGOUT')
      this.$message('Вы вышли из системы')
      this.$router.push('/Login')
    }
  },
  computed: {
    getUserName () {
      return this.$store.getters.info.username
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = dateFilter(new Date(), 'date time')
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeUnmount () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroyed) {
      this.doropdowm.destroyed()
    }
  }
}
</script>
