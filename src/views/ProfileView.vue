<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>
    <div class="row">
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="page-title">
              <h3>Информация об акаунте</h3>
            </div>
            <p>E-mail: {{ userInfo.email }}</p>
            <p>имя: {{ userInfo.username }}</p>
            <p>Счет: {{ userInfo.bill }} P</p>
          </div>
        </div>
      </div>
      <div class="col s12 l10">
        <div class="">
          <div class="cart-content">
            <h5>Изменить имя</h5>
            <form class="form" @submit.prevent="updateUserName">
              <div class="input-field">
                <input
                  id="description"
                  type="text"
                  v-model="state.userName"
                  :class="{invalid: v$.userName.$dirty && v$.userName.required.$invalid}"
                >
                <label for="description">Имя</label>
                <span
                  v-if="this.v$.userName.$dirty && this.v$.userName.required.$invalid"
                  class="helper-text invalid"
                >
                  name
                </span>
              </div>
              <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </form>
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
</template>

<script>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  setup () {
    useMeta({ title: 'Профиль' })
    const store = useStore()
    const state = reactive({
      userName: ''
    })
    const rules = { userName: { required } }
    const v$ = useVuelidate(rules, state)
    const userInfo = computed(() => store.getters.info)
    return { state, v$, userInfo }
  },
  methods: {
    async updateUserName () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const username = this.state.userName
        await this.$store.dispatch('UPDATE_INFO', { username })
        this.$message('Имя обновлено')
        this.v$.$reset()
        this.state.userName = ''
      } catch (e) {}
    }
  }
}
</script>
