/**
 * Created by 李康飞 on 2017/9/14.
 */
export default[
  {
    path:"/imageInquiry",
    name:"imageInquiry",
    component:()=>import("../pages/inquiry/imageInquiry.vue")
  }, {
    path:"/fastConsult",
    name:"fastConsult",
    component:()=>import("../pages/inquiry/fastConsult.vue")
  },{
    path:"/consultTeam",
    name:"consultTeam",
    component:()=>import("../pages/inquiry/consultTeam.vue")
  },{
    path:"/officeConsult",
    name:"officeConsult",
    component:()=>import("../pages/inquiry/officeConsult.vue")
  },{
    path:"/consultOffice/:id",
    name:"consultOffice",
    component:()=>import("../pages/inquiry/consultOffice.vue")
  },{
    path:"/illName",
    name:"illName",
    component:()=>import("../pages/inquiry/changeName.vue")
  },{
    path:"/oneConsult/:id",
    name:"oneConsult",
    component:()=>import("../pages/oneConsult/index.vue")
  },{
    path:"/pay/:id",
    name:"pay",
    component:()=>import("../pages/oneConsult/pay.vue")
  },{
    path:"/evaluate/:id",
    name:"evaluate",
    component:()=>import("../pages/oneConsult/evaluate.vue")
  },{
    path:"/consuitDetail/:id",
    name:"consuitDetail",
    component:()=>import("../pages/teamConsult/consuitDetail.vue")
  },
  {
    path:"/consultService/whole",
    component:()=> import("../pages/home/server/consultService/whole.vue"),
    children:[
      {
        path:"/consultService/myConsult",
        component:()=> import("../pages/home/server/consultService/myConsult.vue")
      },
      {
        path:"/consultService/consultDoc",
        component:()=> import("../pages/home/server/consultService/consultDoc.vue")
      },
      {
        path:"/consultService/bestPick",
        component:()=> import("../pages/home/server/consultService/bestPick.vue")
      },
    ]
  },
]
