export default [
  {
    path: "/health",
    component: () => import('../pages/health/index.vue')
  },
{
    path: "/consultList",
      name:"consultList",
    component: () => import('../pages/health/consultList.vue')
  },{
    path: "/consultDetail/:id",
      name:"consultDetail",
    component: () => import('../pages/health/consultDetail.vue')
  },

]
