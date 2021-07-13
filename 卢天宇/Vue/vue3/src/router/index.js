import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../views/home')
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('../views/about')
    },
]

let router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;