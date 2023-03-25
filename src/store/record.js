import { getDatabase, ref, push, set, onValue } from 'firebase/database'
export default {
  state: {
    records: {},
    recordById: {}
  },
  getters: {
    records: s => s.records,
    recordById: s => s.recordById
  },
  mutations: {
    UPDATE_STATE_RECORDS (state, newRecordsArr) {
      state.records = newRecordsArr
    },
    UPDATE_STATE_RECORD_BY_ID (state, record) {
      state.recordById = record
    },
    CLIAR_RECORDS (state) {
      state.records = {}
    },
    CLIAR_RECORDS_BY_ID (state) {
      state.recordById = {}
    }
  },
  actions: {
    async CREATE_RECORD ({ commit, dispatch }, record) {
      const uid = await dispatch('GET_UID')
      const db = getDatabase()
      await set(push(ref(db, `/users/${uid}/record`)), record).catch((e) => {
        commit('SET_ERORR', e)
        throw e
      })
    },
    async GET_RECORDS ({ commit, dispatch }) {
      const uid = await dispatch('GET_UID')
      const db = getDatabase()
      onValue(ref(db, `users/${uid}/record`), (snapshot) => {
        const records = snapshot.val()
        const newRecordsArr = Object.keys(records).map(key => ({ ...records[key], id: key }))
        commit('UPDATE_STATE_RECORDS', newRecordsArr)
      })
    },
    async GET_RECORD_BY_ID ({ commit, dispatch }, id) {
      const uid = await dispatch('GET_UID')
      const db = getDatabase()
      onValue(ref(db, `users/${uid}/record/${id}`), (snapshot) => {
        const record = snapshot.val()
        commit('UPDATE_STATE_RECORD_BY_ID', record)
      })
    }
  }
}
