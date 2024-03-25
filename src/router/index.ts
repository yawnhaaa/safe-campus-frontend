import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue';
import AdminPage from '@/admin-pages/AdminPage.vue'
import { getToken } from '@/utils/auth';
import { verifyUser } from '@/api/request';

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
    // {
    //   path: '/visual',
    //   name: 'visual',
    //   component: () => import('@/pages/VisualPage.vue')
    // },
    {
      path: '/issue',
      name: 'issue',
      component: () => import('@/pages/IssuePage.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/pages/MyPage.vue'),
      meta: { requiresAuth: true }
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
    },
    {
      path: '/materia/image/:id',
      name: 'imageMateria',
      component: () => import('@/pages/ImagePage.vue')
    },
    {
      path: '/materia/video/:id',
      name: 'videoMateria',
      component: () => import('@/pages/VideoPage.vue')
    },
    {
      path: '/materia/audio/:id',
      name: 'audioMateria',
      component: () => import('@/pages/AudioPage.vue')
    },
    {
      path: '/aLogin',
      name: 'adminLogin',
      component: () => import('@/admin-pages/ALoginPage.vue')
    },
    {
      path: '/admin/',
      name: 'admin',
      component: AdminPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/audios',
      name: 'audios',
      component: () => import('@/admin-pages/AudiosPage.vue')
    },
    {
      path: '/admin/audiosReview',
      name: 'audiosReview',
      component: () => import('@/admin-pages/AudiosReview.vue')
    },
    {
      path: '/admin/images',
      name: 'images',
      component: () => import('@/admin-pages/ImagesPage.vue')
    },
    {
      path: '/admin/imagesReview',
      name: 'imagesReview',
      component: () => import('@/admin-pages/ImagesReview.vue')
    },
    {
      path: '/admin/info',
      name: 'info',
      component: () => import('@/admin-pages/InfoPage.vue')
    },
    {
      path: '/admin/infoReview',
      name: 'infoReview',
      component: () => import('@/admin-pages/InfoReview.vue')
    },
    {
      path: '/admin/questions',
      name: 'questions',
      component: () => import('@/admin-pages/QuestionsPage.vue')
    },
    {
      path: '/admin/videos',
      name: 'videos',
      component: () => import('@/admin-pages/VideosPage.vue')
    },
    {
      path: '/admin/videosReview',
      name: 'videosReview',
      component: () => import('@/admin-pages/VideosReview.vue')
    },
    {
      path: '/admin/user',
      name: 'user',
      component: () => import('@/admin-pages/UserPage.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isUser = await verifyUser()
  if (to.meta.requiresAuth && !isUser) {
    if (to.path.includes('admin')) {
      next('/aLogin')
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
