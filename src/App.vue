<script>
  import { getToken, h5login } from "./api";
  import store from './store'
  import Vue from 'vue';
  export default {
		onLaunch: function() {
			console.log('App Launch')
          // 获取导航栏高度
      uni.getSystemInfo({
        success: function(e) {
          Vue.prototype.statusBar = e.statusBarHeight

          // #ifdef MP-WEIXIN
          let custom = wx.getMenuButtonBoundingClientRect()
          Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
          // #endif

          // #ifdef H5
          Vue.prototype.customBar = 40
          // #endif
        }
      });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
  @import '../src/style/base.scss';
  @import '../src/style/index.scss';
	/*每个页面公共css */
</style>
