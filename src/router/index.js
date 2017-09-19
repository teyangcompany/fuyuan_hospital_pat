import Vue from 'vue'
import Router from 'vue-router'



import MyDoc from "./my-doc"
import Health from "./health"
import My from "./my"
import Home from "./home"
import Account from "./account"
import teamCard from "./teamCard"
import inquiry from "./inquiry"

Vue.use(Router)


/*路由懒加载*/
export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import("../pages/login/index")
    }, {
      path: '/',
        name:"home",
      component: () => import("../pages/index")
    },
    ...MyDoc,
    ...Health,
    ...My,
    ...Home,
  ...Account,
  ...teamCard,
  ...inquiry
  ]

})
