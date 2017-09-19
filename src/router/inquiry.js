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
  },

]