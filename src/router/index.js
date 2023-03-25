import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/firebase/init'
const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/DetailRecord/:id',
    name: 'DetailRecord',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/DetailRecordView.vue')
  },
  {
    path: '/Record',
    name: 'Record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/RecordView.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true, title: 'profile' },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/Planning',
    name: 'Planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/PlanningView.vue')
  },
  {
    path: '/History',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/HistoryView.vue')
  },
  {
    path: '/Categories',
    name: 'Categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/CategoriesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  const requireAuth = to.matched.some(Record => Record.meta.auth)
  if (requireAuth && !user) {
    next('/Login')
    this.$com('войдите в ситему')
  } else {
    next()
  }
})

export default router
