export default [
    {
        path: "/login",
        component: () => import("../pages/user/login.vue")
    },
    {
        path: "/reg",
        component: () => import("../pages/user/reg.vue"),
        children: [
            {
                path: 'step1',
                name: 'step1',
                component: () => import("../pages/user/reg1.vue")
            },
            {
                path: 'step2',
                name: 'step2',
                component: () => import("../pages/user/reg2.vue")
            }
        ]
    }
]