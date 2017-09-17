export default [
    {
        path: "/my-doc",
        component: () => import('../pages/my-doc/index.vue')
    }, {
        path: "/follow-doc",
        component: () => import('../pages/my-doc/follow-doc.vue')
    }

]
