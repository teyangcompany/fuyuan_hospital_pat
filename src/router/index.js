import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*路由懒加载*/
export default new Router({
    routes: [
        {
            path: '/',
            component: () => import("../pages/index.vue")
        },
        {
            path:"/demo",
            component: () => import("../pages/demo.vue")
        }
    ]
})
