import http from '../utils/request'

// 获取token
export function getToken(code) {
    return http({
        url: '/user/codetotoken',
        data: {
            code,
        }
    })
}
// 用户登录
export function login(data) {
    return http({
        url: '/user/login',
        data,
    })
}


// 绑定手机号
export function bindPhone(data) {
    return http({
        url: '/user/bindphone',
        data,
    })
}

// 获取个人信息
export function getInfo(data) {
    return http({
        url: '/user/me',
        data,
    })
}

// 获取用户步数
export function getRun(data) {
    return http({
        url: '/user/updatestep',
        data,
    })
}

// H5的页面 首页登录
export function h5login(data) {
    return http({
        url: '/user/h5login',
        data,
    })
}

// 首页
export const index = function (data) {
    return http({
        url: '/index',
        data,
    })
};

// 比赛规则
export const rule = {
    list: function (data) {
        return http({
            url: '/pro/rule/list',
            data,
        })
    },
    detail: function (data) {
        return http({
            url: '/pro/rule/desc',
            data,
        })
    },
};
// 点赞投票
export const like = {
    sport: function (data) {
        return http({
            url: '/pro/click/list',
            data,
        })
    },
};
// 小游戏
export const game = {
    list: function (data) {
        return http({
            url: '/small/game/list',
            data,
        })
    },
    detail: function (data) {
        return http({
            url: '/small/game/desc',
            data,
        })
    },
};