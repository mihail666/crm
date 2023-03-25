<template>
  <crm-loader v-if="state.loading" />
    <p class="" v-else-if="state.categoriesEmpty">
      <router-link to="/Categories">создать категортю на данный момент у вас нет категорий</router-link>
    </p>
  <div v-else>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="createRecord">
      <div class="input-field" >
        <select
          ref="select"
          v-model="state.category"
        >
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

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="state.type"
          >
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="state.type"
          >
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="state.amount"
          :class="{invalid: v$.amount.$dirty && v$.amount.minValue.$invalid}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="this.v$.amount.$dirty && this.v$.amount.minValue.$invalid"
          class="helper-text invalid"
        >
          Укажите сумму больше минимальной
        </span>
      </div>

      <div class="input-field">
        <input
          type="text"
          v-model="state.desc"
          :class="{invalid: v$.desc.$dirty && v$.desc.required.$invalid}"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid"
            v-if="v$.desc.$dirty && v$.desc.required.$invalid"
          >
            Введите Описание
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import M from '../../node_modules/materialize-css/dist/js/materialize.min.js'
import crmLoader from '@/components/app/crmLoader.vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive, computed } from 'vue'
import { required, minValue } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  setup () {
    useMeta({ title: 'Запись' })
    const store = useStore()
    const state = reactive({
      loading: true,
      select: null,
      type: 'outcome',
      amount: 1,
      desc: '',
      category: null,
      selCat: null,
      categoriesEmpty: true
    })
    const rules = {
      desc: { required },
      amount: { minValue: minValue(1) }
    }
    const v$ = useVuelidate(rules, state)
    const userBill = computed(() => store.getters.info.bill)
    const categories = computed(() => store.getters.categories)
    const canCreateRec = computed(() => {
      if (state.type === 'income') {
        return true
      }
      return userBill.value >= state.amount
    })
    return { state, v$, userBill, categories, canCreateRec }
  },
  components: {
    crmLoader
  },
  methods: {
    async createRecord () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      if (this.canCreateRec) {
        try {
          await this.$store.dispatch('CREATE_RECORD', {
            categoryId: this.state.category,
            amount: this.state.amount,
            description: this.state.desc,
            type: this.state.type,
            date: new Date().toJSON()
          })
        } catch (e) {}

        const bill = this.state.type === 'income'
          ? this.userBill + this.state.amount
          : this.userBill - this.state.amount

        await this.$store.dispatch('UPDATE_INFO', { bill })
        this.$message('запись создана')
        this.v$.$reset()
        this.state.amount = 1
        this.state.desc = ''
      } else {
        this.$com('не хватает средств:' + `${this.userBill - this.state.amount}`)
      }
    }
  },
  watch: {},
  async mounted () {
    await this.$store.dispatch('GET_CATEGORIES')
    this.state.loading = false
    if (this.categories.length > 0) {
      this.state.category = this.categories[0].id
      this.state.categoriesEmpty = false
    }
    setTimeout(() => {
      this.state.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  unmounted () {}
}
</script>
