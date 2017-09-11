import Vue from 'vue'
import Router from 'vue-router'
import my from './my'
Vue.use(Router)
/*路由懒加载*/
export default new Router({
    routes: [
      ...my
    ]
})
