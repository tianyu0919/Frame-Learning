import Vue from "vue";
import Router from "vue-router";

import nprogress from "nprogress";
import 'nprogress/nprogress.css'

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/index/home'
    },
    {
        path: "*",
        name: 'notFound',
        component: () => import('@/view/404.vue')
    },
    {
        path: "/index",
        name: "Index",
        component: () => import("@/view/index"),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("../view/Home/home.vue")
            },
            {
                path: 'about',
                name: 'About',
                component: () => import("../view/About/about.vue")
            }
        ]
    },
]

const router = new Router({
    routes
})


const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    if (typeof (location) == "string") {
        var Separator = "&";
        if (location.indexOf('?') == -1) { Separator = '?'; }
        // location = location + Separator + "random=" + Math.random();
    }
    return routerPush.call(this, location).catch(error => error)
}

router.beforeEach((to, from, next) => {
    // console.log(to, from);
    nprogress.start();
    next();
})

router.afterEach((to, from) => {
    // console.log(to, from)
    nprogress.done();
})

export default router;