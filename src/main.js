import Vue from 'vue'
import App from './App'
import store from './store'
import { router, RouterMount } from './router.js'
// 全局注册组件
import AlImage from '../src/components/AlImage';
import IconButton from '../src/components/IconButton';
import AlDialog from '../src/components/AlDialog';
import Authorization from '../src/components/Authorization';
import Divider from '../src/components/Divider';
import ViewContainer from "./components/ViewContainer";
import ViewList from "./components/ViewList";
Vue.use(router);

// 全局图片组件
Vue.component('al-image', AlImage);
// 图片导航组件
Vue.component('icon-button', IconButton);
// 弹窗组件
Vue.component('al-dialog', AlDialog);
// 授权弹窗组件
Vue.component('authorization', Authorization);
// 分割线
Vue.component('divider', Divider);
// 视图容器
Vue.component('ViewContainer', ViewContainer);
// 视频列表
Vue.component('ViewList', ViewList);
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
