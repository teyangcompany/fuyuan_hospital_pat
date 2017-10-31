export default [
  {
    path: "/my",
    component: () => import("../pages/my/index.vue")
  }, {
    path: "/allergyHistory",
    name: 'allergyHistory',
    component: () => import("../pages/my/archives/allergyHistory.vue")
  }, {
    path: "/familyHistory",
    name: 'familyHistory',
    component: () => import("../pages/my/archives/familyHistory.vue")
  }, {
    path: "/pastHistory",
    name: 'pastHistory',
    component: () => import("../pages/my/archives/pastHistory.vue")
  }, {
    path: "/presentingComplaint",
    name: 'presentingComplaint',
    component: () => import("../pages/my/archives/presentingComplaint.vue")
  },
  {
    path:"/my/personInfo",
    component:()=>import("../pages/my/personInfo.vue")
  },
  {
    path:"/my/profile",
    component:()=>import('../pages/my/profile.vue')
  },
  {
    path:"/my/addHosNum",
    component:()=>import('../pages/my/addHosNum.vue')
  },
  {
     path:"/my/costLog",
     component:()=>import("../pages/my/costLog.vue")
  },
  {
    path: "/my/archives",
    name: 'healthRecord',
    component: () => import("../pages/my/archives/index.vue")
  },
  {
    path: "/my/archives/save-record/:type",
    component: () => import("../pages/my/archives/save-record.vue")
  }, {
    path: "/my/archives/caseDetail",
    name: "caseDetail",
    component: () => import("../pages/my/archives/caseDetail.vue")
  },
  {
    path: "/my/common-visitperson",
    component: () => import("../pages/my/common-visitperson/index.vue")
  }, {
    path: "/my/addUser",
    name: 'addUser',
    component: () => import("../pages/my/common-visitperson/addUser.vue")
  }, {
    path: "/my/editUser",
    name: 'editUser',
    component: () => import("../pages/my/common-visitperson/editUser.vue")
  },{
     path:"/my/addHosNum",
     component:()=>import("../pages/my/common-visitperson/addHosNum.vue")
  },
  {
    path: "/my/editPhone",
    name: 'editPhone',
    component: () => import("../pages/my/common-visitperson/editPhone.vue")
  }, {
    path: '/my/changePhone',
    name: 'changePhone',
    component: () => import("../pages/my/accountAbout/changePhone.vue")
  }, {
    path: '/my/confrimPhone',
    name: 'confrimPhone',
    component: () => import("../pages/my/accountAbout/confrimPhone.vue")
  }, {
    path: '/my/changePhoneSucc',
    name: 'changePhoneSucc',
    component: () => import("../pages/my/accountAbout/changePhoneSucc.vue")
  }, {
    path: '/my/changePassword',
    name: 'changePassword',
    component: () => import("../pages/my/accountAbout/changePassword.vue")
  }, {
    path: '/my/modificationPassword',
    name: 'modificationPassword',
    component: () => import("../pages/my/accountAbout/modificationPassword.vue")
  }, {
    path: '/my/succeed',
    name: 'succeed',
    component: () => import("../pages/my/accountAbout/succeed.vue")
  }, {
    path: '/my/accountAbout',
    name: 'accountAbout',
    component: () => import("../pages/my/accountAbout/accountAbout.vue")
  }, {
    path: '/my/myRegistration',
    name: 'myRegistration',
    component: () => import("../pages/my/accountAbout/myRegistration.vue")
  },
  {
    path: '/my/edit',
    component: () => import("../pages/my/edit.vue")
  }
]
