export default [
  {
    path: "/my",
    component: () => import("../pages/my/index.vue")
  },
  {
    path: "/my/archives",
    component: () => import("../pages/my/archives/index.vue")
  },
  {
    path: "/my/archives/save-record/:type",
    component: () => import("../pages/my/archives/save-record.vue")
  },
  {
    path: "/my/common-visitperson",
    component: () => import("../pages/my/common-visitperson/index.vue")
  }
]
