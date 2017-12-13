/**
 * Created by Administrator on 2017/12/4.
 */
export default[
  {
    path:"/hosService",
    component:()=>import('../pages/hosService/index.vue')
  },
  {
    path:"/handbook",
    component:()=>import('../pages/hosService/handbook.vue')
  },
  {
    path:"/prePay",
    component:()=>import('../pages/hosService/prePay.vue')
  },
  {
    path:"/payLog",
    component:()=>import('../pages/hosService/payLog.vue')
  }
]
