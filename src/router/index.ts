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
      path: '/dialogue',
      name: 'dialogue',
      component: () => import('@/views/DialoguePage.vue'),
    },
    {
      path: '/chat',
      redirect: '/dialogue',
    },
    {
      path: '/profile',
      redirect: '/dialogue',
    },
    {
      path: '/learning-path',
      name: 'learning-path',
      component: () => import('@/views/LearningPath.vue'),
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('@/views/Evaluation.vue'),
    },
    {
      path: '/knowledge-base',
      name: 'knowledge-base',
      component: () => import('@/views/KnowledgeBase.vue'),
    },
    {
      path: '/tutoring',
      name: 'tutoring',
      component: () => import('@/views/Tutoring.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
    },
    {
      path: '/edu-mind',
      name: 'edu-mind',
      component: () => import('@/views/EduMind.vue'),
    },
    {
      path: '/resources',
      name: 'Resources',
      component: () => import('@/views/EduMind.vue'),
    },
    {
      path: '/universe',
      redirect: '/learning-path',
    },
    {
      path: '/trainflow',
      name: 'trainflow',
      component: () => import('@/views/TrainFlow.vue'),
    },
  ],
})

export default router
