import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';
import IssuePage from '@/pages/IssuePage.vue';
import LearnPage from '@/pages/LearnPage.vue';
import MaterialPage from '@/pages/MaterialPage.vue';
import MyPage from '@/pages/MyPage.vue';
import VisualPage from '@/pages/VisualPage.vue';

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
  ]
})

export default router
