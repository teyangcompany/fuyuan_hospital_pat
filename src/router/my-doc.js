export default [
    {
        path: "/my-doc",
        component: () => import('../pages/my-doc/index.vue')
    }, {
        path: "/follow-doc",
        component: () => import('../pages/my-doc/follow-doc.vue')
    }, {
        path: "/chart",
        component: () => import('../pages/my-doc/chart.vue')
    }

]
