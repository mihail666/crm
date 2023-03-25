import auth from '@/firebase/init'
import { getDatabase, ref, set } from 'firebase/database'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async LOGIN ({ commit, dispatch }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        dispatch('GET_CATEGORIES')
        dispatch('GET_RECORDS')
        console.log('LOGIN')
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    async LOGOUT ({ commit }) {
      await signOut(auth).then(() => {
        commit('CLEAR_INFO')
        commit('CLIAR_CATEGORIES')
        commit('CLIAR_RECORDS')
        console.log('LOGOUT')
      }).catch((e) => {
        commit('SET_ERROR', e)
        console.log(e)
      })
    },
    async REGISTER ({ commit, dispatch }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('GET_UID')
        const db = getDatabase()
        await set(ref(db, `users/${uid}/info`), {
          bill: 10000,
          username: name,
          email: email
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    GET_UID () {
      const user = auth.currentUser
      return user ? user.uid : null
    }
  }
}
