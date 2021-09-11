import Vue from 'vue'
import App from './App'
// 全局注册组件
import AlImage from '../src/components/AlImage';
import IconButton from '../src/components/IconButton';
import AlDialog from '../src/components/AlDialog';
import Authorization from '../src/components/Authorization';
// 全局图片组件
Vue.component('al-image', AlImage);
// 图片导航组件
Vue.component('icon-button', IconButton);
// 弹窗组件
Vue.component('al-dialog', AlDialog);
// 授权弹窗组件
Vue.component('authorization', Authorization);

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
