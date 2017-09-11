export default[
  {
    path: '/',
    name:'myDetail',
    component:()=>import("../pages/my/myDetail")
}, {
    path: '/test',
    name:'test',
    component:()=>import("../pages/my/test")
}, {
    path: '/patientUser',
    name:'patientUser',
    component:()=>import("../pages/my/patientUser")
},
]