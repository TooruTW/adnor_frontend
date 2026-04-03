import { createRouter, createWebHistory } from 'vue-router'

import BackstageLayout from '@/views/backstage/BackstageLayout.vue'
import HomeView from '@/views/backstage/HomeView.vue'
import LoginView from '@/views/backstage/LoginView.vue'
import FrontstageView from '@/views/frontstage/FrontstageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/frontstage' },
    {
      path: '/frontstage',
      name: 'frontstage',
      component: FrontstageView,
    },
    {
      path: '/backstage',
      component: BackstageLayout,
      children: [
        { path: 'login', name: 'backstage-login', component: LoginView },
        { path: 'home', name: 'backstage-home', component: HomeView },
      ],
    },
  ],
})

export default router
