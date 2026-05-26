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
    {
      path: '/codelab',
      name: 'codelab',
      component: () => import('@/views/CodeLab.vue'),
    },
    {
      path: '/mindmap',
      name: 'mindmap',
      component: () => import('@/views/MindMapView.vue'),
    },
    {
      path: '/universe',
      redirect: '/learning-path',
    },
  ],
})

export default router
