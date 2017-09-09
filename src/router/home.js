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
  }
]
