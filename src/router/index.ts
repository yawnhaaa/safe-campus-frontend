import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/material',
      name: 'material',
      component: () => import('@/pages/MaterialPage.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('@/pages/LearnPage.vue')
    },
    {
      path: '/visual',
      name: 'visual',
      component: () => import('@/pages/VisualPage.vue')
    },
    {
      path: '/issue',
      name: 'issue',
      component: () => import('@/pages/IssuePage.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/pages/MyPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/info/:id',
      name: 'infoDetail',
      component: () => import('@/pages/InfoDetail.vue')
    }
  ]
})

export default router
