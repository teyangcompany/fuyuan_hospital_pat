export default [
  {
    path: "/home/server/book",
    component: () => import("../pages/home/server/book/index.vue")
  },
  {
    path: "/home/server/today",
    component: () => import("../pages/home/server/todayBook/index.vue")
  },
  {
    path: "/home/server/todayList",
    component: () => import("../pages/home/server/todayBook/todayList.vue")
  },
  {
    path:"/home/server/confirmPage",
    component: () => import("../pages/home/server/todayBook/confirmPage.vue")
  },
  {
    path:"/home/server/todayPay",
    component: () => import("../pages/home/server/todayBook/todayPay.vue")
  },
  {
    path:"/home/server/paySucc",
    component: () => import("../pages/home/server/todayBook/paySucc.vue")
  },
  {
    path: "/home/server/book/dept",
    component: () => import("../pages/home/server/book/dept.vue")
  },
  {
    path: "/home/server/book/doc",
    component: () => import("../pages/home/server/book/doc.vue"),
    children:[
      {
        path:"date",
        component:()=> import("../pages/home/server/book/date.vue"),

      },
      {
        path:"expert",
        component:()=>import("../pages/home/server/book/expert.vue")
      },
    ]
  },
  {
    path:"/home/server/book/famousPage",
    component:()=> import("../pages/home/server/book/famousPage.vue")
  },
  {
    path:"/home/server/book/commonDetail",
    component:()=>import("../pages/home/server/book/commonDetail.vue")
  },
  {
    path:"/home/server/book/confirmOrder",
    component:()=>import("../pages/home/server/book/confirmOrder.vue")
  },
  {
     path:"/home/server/book/bookSuccess",
     component:()=>import("../pages/home/server/book/bookSuccess.vue")
  },
  {
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
    path:"/consultDetail",
    component:()=> import("../pages/home/server/consultService/consultDetail.vue"),
  }

]
