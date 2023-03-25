<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="updateCategory">
        <div class="input-field">
          <select ref="select" v-model="state.current">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >
            {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field pt">
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

        <div class="input-field pt">
          <input
            id="limit"
            type="number"
            v-model="state.limit"
            :class="{ invalid: this.v$.limit.$dirty && this.v$.limit.minValue.$invalid }">
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="this.v$.limit.$dirty && this.v$.limit.minValue.$invalid"
          >
            Укажите величину больше минимальной
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">refresh</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
export default {
  setup (props) {
    const state = reactive({
      current: null,
      title: '',
      limit: ''
    })
    const rules = {
      title: { required },
      limit: { minValue: minValue(100) }
    }
    const v$ = useVuelidate(rules, state)

    const visibl = computed(() => {
      return !props.categories.length > 0
    })
    return { state, v$, visibl }
  },
  data: () => ({
    select: null
  }),
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  components: {},
  methods: {
    async updateCategory () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.state.current,
          title: this.state.title,
          limit: this.state.limit
        }
        await this.$store.dispatch('UPDATE_CATEGORY', categoryData)
        this.$message('Категоря была обновлена')
        this.$emit('updated').then(() => {
          const idx = this.categories.findIndex(c => c.id === categoryData.id)
          this.state.title = this.categories[idx].title
          this.state.limit = this.categories[idx].limit
        })
      } catch (e) {}
    }
  },
  watch: {
    current (value) {
      const { limit, title } = this.categories.find(c => c.id === value)
      this.state.limit = limit
      this.state.title = title
    }
  },
  created () {
    const { limit, title, id } = this.categories[0]
    this.state.limit = limit
    this.state.title = title
    this.state.current = id
  },
  mounted () {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  unmounted () {
    this.select.destroy()
  }
}
</script>
