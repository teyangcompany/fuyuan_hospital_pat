
export default [
    {
        path: "/my",
       
        component: () => import("../pages/my/index.vue")
    }, {
        path: "/allergyHistory",
        name:'allergyHistory',
        component: () => import("../pages/my/archives/allergyHistory.vue")
    },{
        path: "/familyHistory",
        name:'familyHistory',
        component: () => import("../pages/my/archives/familyHistory.vue")
    },{
        path: "/pastHistory",
        name:'pastHistory',
        component: () => import("../pages/my/archives/pastHistory.vue")
    },{
        path: "/presentingComplaint",
        name:'presentingComplaint',
        component: () => import("../pages/my/archives/presentingComplaint.vue")
    },
    {
        path: "/my/archives",
          name:'healthRecord',
        component: () => import("../pages/my/archives/index.vue")
    },
    {
        path: "/my/archives/save-record/:type",
        component: () => import("../pages/my/archives/save-record.vue")
    }, {
        path: "/my/archives/caseDetail",
          name:"caseDetail",
        component: () => import("../pages/my/archives/caseDetail.vue")
    },
    {
        path: "/my/common-visitperson",
        component: () => import("../pages/my/common-visitperson/index.vue")
    }, {
        path: "/my/addUser",
          name:'addUser',
        component: () => import("../pages/my/common-visitperson/addUser.vue")
    },{
        path: "/my/editUser",
          name:'editUser',
        component: () => import("../pages/my/common-visitperson/editUser.vue")
    },{
        path: "/my/editPhone",
          name:'editPhone',
        component: () => import("../pages/my/common-visitperson/editPhone.vue")
    },
]