<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input
            id="title"
            type="text"
            v-model="state.title"
            :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
            >
          <label for="title">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && v$.title.required.$invalid"
          >
            Введите название
          </span>
        </div>
        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="state.limit"
            :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}">
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
          >
            Минимальная величина
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'
import { reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export default {
  setup () {
    const state = reactive({
      title: '',
      limit: 100
    })

    const rules = {
      title: { required },
      limit: { minValue: minValue(100) }
    }

    const v$ = useVuelidate(rules, state)

    onMounted(() => {
      M.updateTextFields()
    })
    return { state, v$ }
  },
  methods: {
    async createCategory () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        title: this.state.title,
        limit: this.state.limit
      }

      try {
        await this.$store.dispatch('CERATE_CATEGORY', formData)
        this.$message('Категория создана')
        this.state.title = ''
        this.state.limit = 100
        this.v$.reset()
        this.$emit('created')
      } catch (e) {}
    }
  }
}
</script>
