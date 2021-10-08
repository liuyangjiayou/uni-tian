const defaultToken = uni.getStorageSync('token');


const state = {
    info: {},
    token: defaultToken,
    openid: '',
}

const mutations = {
    SET_INFO (state, INFO) {
        state.info = INFO
    },
    SET_TOKEN (state, token) {
        state.token = token;
        uni.setStorageSync('token', token);
    },
    CLEAR_TOKEN(state) {
        state.token = '';
        uni.removeStorageSync('token');
        state.info = {};
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
