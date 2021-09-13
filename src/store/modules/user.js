const state = {
    info: {},
    token: '',
    openid: '',
}

const mutations = {
    SET_INFO (state, INFO) {
        state.info = INFO
    },
    SET_TOKEN (state, token) {
        state.token = token
    },
    SET_OPENID (state, OPENID) {
        state.openid = OPENID
    },
}

const actions = {
    setUser({ commit }, info) {
        commit('SET_INFO', info)
    }
}

module.exports = {
    namespace: true,
    state,
    actions,
    mutations
}
