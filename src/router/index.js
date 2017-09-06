import Vue from 'vue'
import Router from 'vue-router'

import MyDoc from "./my-doc"
import Health from "./health"

Vue.use(Router)


/*路由懒加载*/
export default new Router({
  routes: [
    {
      path: '/',
      component: () => import("../pages/index.vue")
    },
    {
      path: '*',
      redirect: "/"
    },
    ...MyDoc,
    ...Health
  ]
})
