/**
 * Created by 李康飞 on 2017/9/11.
 */
export default[
  {
    path:"/login",
    name:'login',
    component:() => import("../pages/login/index")
  },{
    path:"/forgetPassword",
    name:'forgetPassword',
    component:() => import("../pages/login/forgetPassword")
  },{
    path:"/myDetail",
    name:'myDetail',
    component:() => import("../pages/login/myDetail")
  },{
    path:"/password",
    name:'password',
    component:() => import("../pages/login/password")
  },{
    path:"/register",
    name:'register',
    component:() => import("../pages/login/register")
  },
]