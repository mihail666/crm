import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCY3HPndyRNdgtLXdrq2JGiS6uEALEzaXA',
  authDomain: 'vue-crm-ddb3e.firebaseapp.com',
  projectId: 'vue-crm-ddb3e',
  storageBucket: 'vue-crm-ddb3e.appspot.com',
  messagingSenderId: '694947077131',
  appId: '1:694947077131:web:04722c38654877d31fbb0e',
  measurementId: 'G-VFNPPMLYDB',
  databaseURL: 'https://vue-crm-ddb3e-default-rtdb.firebaseio.com'
}

initializeApp(firebaseConfig)

const auth = getAuth()

export default auth
