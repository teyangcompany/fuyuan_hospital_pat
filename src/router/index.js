import Vue from 'vue'
import Router from 'vue-router'
import {tokenCache} from "../lib/cache";

import MyDoc from "./my-doc"
import Health from "./health"
import My from "./my"
import Home from "./home"
import Account from "./account"
import teamCard from "./teamCard"
import inquiry from "./inquiry"
import checkReport from './checkReport'
import waitCallNumber from './waitCallNumber'
import hosService from './hosService'
import consultPay from './consultPay'
import doType from './doType'

Vue.use(Router)


/*路由懒加载*/
const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import("../pages/login/index")
    }, {
      path: '/home',
      name: "home",
      component: () => import("../pages/index")
    },
    ...MyDoc,
    ...Health,
    ...My,
    ...Home,
    ...Account,
    ...teamCard,
    ...inquiry,
    ...checkReport,
    ...waitCallNumber,
    ...hosService,
    ...consultPay,
    ...doType
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needLogin)) {
    let token = tokenCache.get();
    if (token) {
      next();
    } else {
      //fromCache.set(to.fullPath)
      next('/login');
    }
  } else {
    next();
  }
});

export default router;

