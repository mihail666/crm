<template>
  <div>
    <form class="card auth-card" @submit.prevent="loginUser">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
              id="email"
              type="text"
              v-model="state.email"
              :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid)}"
          >
          <label for="email">Email</label>
          <small class="helper-text invalid"
            v-if="v$.email.$dirty && v$.email.required.$invalid"
            >Поле Email не должно быть пустым
          </small>
          <small
            class="helper-text invalid"
            v-else-if="v$.email.$dirty && v$.email.email.$invalid"
          >Введите корретный Email</small>
        </div>
        <div class="input-field">
          <input
              id="password"
              type="password"
              v-model="state.password"
              :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"
          >
          <label for="password">Пароль</label>
          <small
              class="helper-text invalid"
              v-if="v$.password.$dirty && v$.password.required.$invalid"
          >
            Введите пароль
          </small>
          <small
            class="helper-text invalid"
            v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
          >
            Пароль должен быть {{v$.password.minLength.$params.min}} символов. Сейчас он {{state.password.length}}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button class="btn waves-effect waves-light auth-submit" type="submit">
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/Register" href="/">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { useMeta } from 'vue-meta'
export default {
  name: 'loginUser',
  setup () {
    useMeta({ title: 'Вход' })
    const state = reactive({
      password: '',
      email: ''
    })
    const rules = {
      password: { required, minLength: minLength(8) },
      email: { required, email }
    }

    const v$ = useVuelidate(rules, state)
    return { state, v$ }
  },
  methods: {
    async loginUser () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.state.email,
        password: this.state.password
      }

      try {
        await this.$store.dispatch('LOGIN', formData)
        this.$message('Добро пожаловать')
        this.$router.push('/')
      } catch (e) {}
    }
  }
}

</script>
