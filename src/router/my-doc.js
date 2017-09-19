export default [
  {
    path: "/my-doc",
    component: () => import('../pages/my-doc/index.vue')
  },{
    path: "/docList", 
      name:'docList',
    component: () => import('../pages/my-doc/docList.vue')
  },{
    path: "/docChat/:id", 
      name:'docChat',
    component: () => import('../pages/my-doc/docChat.vue')
  },


]
