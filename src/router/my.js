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
  },
  {
    path: "/my/my-consult",
    component: () => import("../pages/my/my-consult/index.vue")
  },
  {
    path: "/my/my-book",
    component: () => import("../pages/my/my-book/index.vue")
  },
  {
    path: "/my/wallet",
    component: () => import("../pages/my/wallet/index.vue")
  }
]
