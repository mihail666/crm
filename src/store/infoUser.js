import { getDatabase, ref, child, get, update } from 'firebase/database'
export default {
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  },
  mutations: {
    SET_INFO (state, info) {
      state.info = info
    },
    CLEAR_INFO (state) {
      state.info = {}
    }
  },
  actions: {
    async GET_INFO ({ commit, dispatch }) {
      const uid = await dispatch('GET_UID')
      const dbRef = ref(getDatabase())
      get(child(dbRef, `/users/${uid}/info`)).then((snapshot) => {
        if (snapshot.exists()) {
          const info = snapshot.val()
          commit('SET_INFO', info)
        } else {
          console.log('No data available')
        }
      }).catch((e) => {})
    },
    async UPDATE_INFO ({ commit, dispatch, getters }, toUpdate) {
      const uid = await dispatch('GET_UID')
      const db = getDatabase()
      const updateData = { ...getters.info, ...toUpdate }
      update(ref(db, `/users/${uid}/info`), updateData).then(() => {
        commit('SET_INFO', updateData)
      }).catch((e) => {
        commit('SET_ERROR', e)
        throw e
      })
    }
  }
}
