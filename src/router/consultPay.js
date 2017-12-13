/**
 * Created by Administrator on 2017/12/5.
 */
export default[
  {
    path:"/consultPay",
    component:()=>import('../pages/consultPay/index.vue')
  },
  {
    path:"/payItem",
    component:()=>import('../pages/consultPay/payItem.vue'),
    children:[
      {
        path:"waitPay",
        component:()=>import('../pages/consultPay/waitPay.vue')
      },
      {
        path:"payed",
        component:()=>import('../pages/consultPay/payed.vue')
      },
    ]
  },
  {
    path:"/waitPayDetail",
    component:()=>import('../pages/consultPay/waitPayDetail.vue')
  }
]
