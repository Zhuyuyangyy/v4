import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/Welcome.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/Chat.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('@/views/Resources.vue'),
    },
    {
      path: '/learning-path',
      name: 'learning-path',
      component: () => import('@/views/LearningPath.vue'),
    },
    {
      path: '/tutoring',
      name: 'tutoring',
      component: () => import('@/views/Tutoring.vue'),
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('@/views/Evaluation.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
    },
  ],
})

export default router
