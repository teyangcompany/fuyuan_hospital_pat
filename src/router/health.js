export default [
  {
    path: "/health",
    component: () => import('../pages/health/index.vue')
  },
  {
    path: "/health/news",
    component: () => import('../pages/health/news/list.vue')
  }

]
