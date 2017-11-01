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
  {
     path:"/healthModule",
     component:()=>import('../pages/health/healthModule.vue')
  },
  {
    path:"/healthInfoDetail",
    component:()=>import('../pages/health/healthInfoDetail.vue')
  }
]
