// router.js
import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    h5:{
        paramsToQuery: true,
        linkActiveClass: 'router-link-active',
        linkExactActiveClass: 'router-link-exact-active',
        scrollBehavior: (to, from, savedPostion) => ({ x: 0, y: 0 }),
    },
    routes: [{
        path: '/pages/index/index',
        name: 'index',
        aliasPath: '/'
    },{
        path: '/pages/info/info',
        name: 'info',
    },{
        path: '/pages/run/run',
        name: 'run',
    },{
        path: '/pages/join/index',
        name: 'join',
    },{
        path: '/',
        redirect: { name: 'index' },
    }]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}
