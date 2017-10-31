/**
 * Created by Administrator on 2017/10/18.
 */
export default[
  {
    path:"/checkReport",
    component: () => import('../pages/checkReport/checkReport.vue')
  },
  {
    path:"/testReportDetail",
    component:()=>import('../pages/checkReport/testReportDetail.vue')
  },
  {
    path:"/checkReportDetail",
    component:()=>import('../pages/checkReport/checkReportDetail.vue')
  },
  {
    path:"/checkReportCard",
    component:()=>import('../pages/checkReport/checkReportCard.vue')
  },
  {
    path:"/testReportCard",
    component:()=>import('../pages/checkReport/testReportCard.vue')
  },
  {
    path:"/hosList",
    component:()=>import('../pages/checkReport/hosList.vue')
  }
]
