<template>
  <form class="card auth-card" @submit.prevent="registerUser">
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
            class="validate"
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
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model="state.name"
            :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}">
        <label for="name">Имя</label>
        <small
            class="helper-text invalid"
            v-if="v$.name.$dirty && v$.name.required.$invalid"
        >
          Введите Ваше имя
        </small>
      </div>
        <label>
          <input
              type="checkbox"
              v-model="state.conf"
              />
          <span>С правилами согласен</span>
        </label>
        <small
            class="helper-text invalid"
            v-if="v$.conf.$dirty && v$.conf.required.$invalid"
        >
          <br>
          <span>подтвердите</span>
        </small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/Login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { useMeta } from 'vue-meta'
export default {
  name: 'registerUser',
  setup () {
    useMeta({ title: 'Регистрация' })
    const state = reactive({
      password: '',
      email: '',
      name: '',
      conf: ''
    })
    const rules = {
      password: { required, minLength: minLength(8) },
      email: { required, email },
      name: { required },
      conf: { required }
    }

    const v$ = useVuelidate(rules, state)
    async function registerUser () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: state.email,
        password: state.password,
        name: state.name
      }
      try {
        await store.dispatch('REGISTER', formData)
        router.push('/')
      } catch (e) {}
    }
    return { state, v$, registerUser }
  }
}
</script>
