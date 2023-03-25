import { getDatabase, ref, push, set, onValue, update } from 'firebase/database'
export default {
  state: {
    categories: {},
    categoryById: {}
  },
  getters: {
    categories: s => s.categories,
    categoryById: s => s.categoryById
  },
  mutations: {
    UPDATE_STATE_CATEGORIES (state, newCategoriesArr) {
      state.categories = newCategoriesArr
    },
    UPDATE_STATE_CATEGORY_BY_ID (state, category) {
      state.categoryById = category
    },
    CLIAR_CATEGORIES (state) {
      state.categories = {}
    },
    CLIAR_CATEGORIES_BY_ID (state) {
      state.categoryById = {}
    }
  },
  actions: {
    async CERATE_CATEGORY ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('GET_UID')
        const db = getDatabase()
        set(push(ref(db, `users/${uid}/category`)), {
          title: title,
          limit: limit
        }).then(() => {
          dispatch('GET_CATEGORIES')
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async UPDATE_CATEGORY ({ commit, dispatch }, { title, limit, id }) {
      const uid = await dispatch('GET_UID')
      const db = getDatabase()
      const categoryRef = ref(db, `users/${uid}/category/${id}`)
      update(categoryRef, {
        title: title,
        limit: limit
      }).then(() => {
        dispatch('GET_CATEGORIES')
      }).catch((e) => {
        commit('SET_ERROR', e)
        throw e
      })
    },
    async GET_CATEGORIES ({ commit, dispatch }) {
      try {
        const uid = await dispatch('GET_UID')
        const db = getDatabase()
        onValue(ref(db, `users/${uid}/category`), (snapshot) => {
          const categories = snapshot.val()
          const newCategoriesArr = Object.keys(categories).map(key => ({ ...categories[key], id: key }))
          commit('UPDATE_STATE_CATEGORIES', newCategoriesArr)
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async GET_CATEGORY_BY_ID ({ commit, dispatch }, id) {
      const uid = await dispatch('GET_UID')
      const db = getDatabase()
      onValue(ref(db, `users/${uid}/category/${id}`), (snapshot) => {
        const category = snapshot.val()
        commit('UPDATE_STATE_CATEGORY_BY_ID', category)
      })
    }
  }
}

// async CERATE_CATEGORY ({ commit, dispatch }, { title, limit }) {
//   const uid = await dispatch('GET_UID')
//   const db = getDatabase()
//   const categoryRef = ref(db, `users/${uid}/category`)
//   const newCategoryRef = push(categoryRef)
//   set(newCategoryRef, {
//     title: title,
//     limit: limit
//   }).then(() => {
//     alert('category create')
//   }).catch((e) => {
//     commit('SET_ERROR', e)
//     throw e
//   })
// }
// }
