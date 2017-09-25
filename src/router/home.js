export default [
  {
    path: "/home/server/book",
    component: () => import("../pages/home/server/book/index.vue")
  },
  {
    path: "/home/server/book/dept",
    component: () => import("../pages/home/server/book/dept.vue")
  },
  {
    path: "/home/server/book/doc",
    component: () => import("../pages/home/server/book/doc.vue")

  },  {
    path: "/home/moreSel",
      name:'moreSel',
    component: () => import("../pages/home/moreSel.vue")
  },


  {
    path:"/home/server/quickConsult/index",
    component:()=> import("../pages/home/server/quickConsult/index.vue")
  },
  // {
  //   path:"/my/home/server/consultService/consultDoc",
  //   component:()=> import("../pages/home/server/consultService/consultDoc.vue")
  // },
  // {
  //   path:"/my/home/server/consultService/myConsult",
  //   component:()=> import("../pages/home/server/consultService/myConsult.vue")
  // },
  {
    path:"/my/home/server/consultService/whole",
    component:()=> import("../pages/home/server/consultService/whole.vue"),
    children:[
      {
        path:"/my/home/server/consultService/myConsult",
        component:()=> import("../pages/home/server/consultService/myConsult.vue")
      },
      {
        path:"/my/home/server/consultService/consultDoc",
        component:()=> import("../pages/home/server/consultService/consultDoc.vue")
      },
      {
        path:"/my/home/server/consultService/bestPick",
        component:()=> import("../pages/home/server/consultService/bestPick.vue")
      },
    ]
  }

]
