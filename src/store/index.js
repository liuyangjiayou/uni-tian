import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
Vue.use(Vuex);

const files = require.context('./modules', true, /\.js$/);
const modules = files.keys().reduce((modules, path) => {
    // 将 './app.js' 转为 'app'
    const key = path.replace(/^\.\/(.*)\.\w+$/, '$1');
    modules[key] = files(path);
    return modules;
}, {});

export default new Vuex.Store({
    strict: true,
    getters,
    modules,
})

