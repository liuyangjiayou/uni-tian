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

// 获取个人信息
export function getScore(data) {
    return http({
        url: '/user/scores',
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
export function sendSms(data) {
    return http({
        url: '/sys/sendsms',
        data,
    })
}
// 获取赛事动态
export function getDynamic(data) {
    return http({
        url: '/news/list',
        data,
    })
}

// 获取赛事详情
export function getDynamicDetail(data) {
    return http({
        url: '/news/info',
        data,
    })
}

// 比赛进程列表
export function getProcess(data) {
    return http({
        url: '/pro/sch/list',
        data,
    })
}
// 比赛点赞专区
export function getClick(data) {
    return http({
        url: '/pro/click/list',
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
export const check = function (data) {
    return http({
        url: '/step/startjbz',
        data,
    })
};
export const start = function (data) {
    return http({
        url: '/start',
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
    // 点赞项目列表 或者 首页项目详情
    small: function (data) {
        return http({
            url: '/pro/desc',
            data,
        })
    },
    // 点赞项目详情
    details: function (data) {
        return http({
            url: '/pro/video/desc',
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
    start: function (data) {
        return http({
            url: '/game/start',
            data,
        })
    },
};
// 排行榜
export const ranks = {
    // 1 2 投票点赞类项目，云上评审类项目
    '1': function (id) {
        return http({
            url: '/pro/rank/scores',
            data: { project_id: id },
        })
    },
    '2': function (id, data) {
        return http({
            url: '/pro/rank/scores',
            data: { project_id: id, ...data },
        })
    },
    // 健步走
    '3': function () {
        return http({
            url: '/pro/rank/stepscores',
            data: {},
        })
    },
    // 小游戏
    '4': function (id) {
        return http({
            url: '/pro/rank/gamescores',
            data: { game_id: id },
        })
    },
};

export const orgs = function (data) {
    return http({
        url: '/pro/rank/org',
        data,
    })
};
export const match = {
    list: function ({search, orgId, ...data}) {

        return http({
            url: '/pro/video/list',
            data: { ...data, 'data[search]': search || '', 'data[orgId]': orgId || '' },
        })
    },
    tree: function () {
        return http({
            url: '/org/tree',
            data: {},
        })
    },
};

export const voteFn = function (data) {
    return http({
        url: '/go/api/vote',
        data,
    })
};

export const settings = function (data) {
    return http({
        url: '/sys/getsetting',
        data,
    })
};

export const province = function (data) {
    return http({
        url: '/pro/video/province ',
        data,
    })
};
export const province_list = function (data) {
    return http({
        url: '/pro/video/list',
        data: {
            type: 2,
            'data[search]': '',
            'data[orgId]': '',
            'data[isUp]': 1,
            ...data,
        },
    })
};
// 测算两个点的坐标
export const distance = function (data) {
    return http({
        url: '/pro/video/province ',
        method: 'GET',
        data,
    })
};

// 获取答题
export const getStepAnswer = function () {
    return http({
        url: '/geme/exam/list',
        method: 'POST',
        data: {
            is_dk: 1
        }
    })
};
// 开始答题
export const subAnswer = function ({ answer, test_id }) {
    return http({
        url: '/step/answer',
        method: 'POST',
        data: {
            answer: answer,
            test_id,
        }
    })
};

