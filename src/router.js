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
        aliasPath: '/index'
    },{
        path: '/pages/run/run',
        name: 'run',
    },{
        path: '/pages/sport/index',
        name: 'sport',
    },{
        path: '/pages/sport/matchs',
        name: 'sport-matches',
    },{
        path: '/pages/sport/matchs2',
        name: 'sport-matches',
    },{
        path: '/pages/dynamic/index',
        name: 'dynamic',
    },{
        path: '/pages/dynamic/detail',
        name: 'dynamic-detail',
    },{
        path: '/pages/rule/index',
        name: 'match-rule',
    },{
        path: '/pages/rule/detail',
        name: 'rule-detail',
    },{
        path: '/pages/process/index',
        name: 'process',
    },{
        path: '/pages/like/index',
        name: 'likes',
    },{
        path: '/pages/sport/rank',
        name: 'rank',
    },{
        path: '/pages/info/score',
        name: 'score',
    },{
        path: '/pages/like/list',
        name: 'like-list',
    },{
        path: '/pages/like/detail',
        name: 'like-detail',
    },{
        path: '/pages/game/list',
        name: 'games',
    },{
        path: '/pages/game/detail',
        name: 'game-detail',
    },{
        path: '/pages/index/start',
        name: 'start',
        aliasPath: '/',
    },{
        path: '/',
        redirect: { name: 'start' },
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
