import Vue from 'vue'
import App from './App'
// 全局注册组件
import AlImage from '../src/components/AlImage';
import IconButton from '../src/components/IconButton';
// 全局图片组件
Vue.component('al-image', AlImage);
// 图片导航组件
Vue.component('icon-button', IconButton);

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
