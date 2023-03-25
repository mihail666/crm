import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createMetaManager } from 'vue-meta'
import './registerServiceWorker'
// plugins
import messagePlugin from './plugins/messages.plugin.js'
// firebase module
import auth from '@/firebase/init'
// materialize
import '../node_modules/materialize-css/dist/js/materialize.min.js'
// toast
import Toast from 'vue3-toast-single'
import 'vue3-toast-single/dist/toast.css'
auth.onAuthStateChanged(() => {
  const app = createApp(App)
  app.use(store)
  app.use(router)
  app.use(Toast)
  app.use(messagePlugin)
  app.use(createMetaManager())
  app.mount('#app')
})
