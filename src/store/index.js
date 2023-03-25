import { createStore } from 'vuex'
import errorHandler from './errorHandler'
import authUser from './authUser'
import infoUser from './infoUser'
import categories from './categories'
import record from './record'

export default createStore({
  state: {
    currency: null
    // or static
    // {
    //   success: true,
    //   timestamp: 1676993103,
    //   base: 'EUR',
    //   date: '2023-02-21',
    //   rates: {
    //     EUR: 1,
    //     USD: 1.066769,
    //     RUB: 79.824195
    //   }
    // }
  },
  getters: {
    currency: s => s.currency
  },
  mutations: {
    SET_CURRENCY (state, result) {
      state.currency = result
    }
  },
  actions: {
    // GET_CURRENCY
    async GET_CURRENCY ({ commit }) {
      const myHeaders = new Headers()
      const key = process.env.VUE_APP_FIXER
      myHeaders.append('apikey', key)

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      }

      await fetch('https://api.apilayer.com/fixer/latest?symbols=EUR%2CUSD%2CRUB&base=EUR', requestOptions)
        .then(response => response.json())
        .then((result) => {
          commit('SET_CURRENCY', result)
        }).catch(error => console.log('error', error))
    }
  },
  modules: {
    errorHandler,
    authUser,
    infoUser,
    categories,
    record
  }
})
