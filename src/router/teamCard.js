/**
 * Created by 李康飞 on 2017/9/12.
 */
export default[
  {
    path:'/articleList',
    name:"articleList",
    component:()=>import('../pages/docCard/articleList.vue')
},{
    path:'/articleDetail/:id',
    name:"articleDetail",
    component:()=>import('../pages/docCard/articleDetail.vue')
},
  {
    path: "/teamCard/:id",
    component: () => import("../pages/teamCard/index.vue"),
    children:[
      {
        path:'',
        name:'intro',
        component:()=>import('../pages/teamCard/intro.vue')
      }, {
        path:'choiceness',
          name:'choiceness',
        component:()=>import('../pages/teamCard/choiceness.vue')
      },{
        path:'dynamic',
          name:'dynamic',
        component:()=>import('../pages/teamCard/dynamic.vue')
      },
    ]
},{
  path:'/docCard/:id',
  component:()=>import('../pages/docCard/index.vue'),
    children:[
    {
      path:'',
      name:'docIntro',
      component:()=>import('../pages/docCard/docIntro.vue')
  }, {
      path:'docChoiceness',
      name:'docChoiceness',
      component:()=>import('../pages/docCard/docChoiceness.vue')
  },{
      path:'docDynamic',
      name:'docDynamic',
      component:()=>import('../pages/docCard/docDynamic.vue')
  },
]
},
  {
     path:"/DoconsultList",
     component:()=>import('../pages/docCard/DoconsultList.vue')
  },
  {
    path:"/docConsultDetail",
    component:()=>import('../pages/docCard/docConsultDetail.vue')
  },
  {
    path:"/share",
    component:()=>import('../pages/docCard/share.vue')
  }
]
