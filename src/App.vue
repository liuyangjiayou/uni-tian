<script>
import { getToken, h5login } from "./api";
  import store from './store'
  export default {
		onLaunch: function() {
			console.log('App Launch')
      // #ifdef MP-WEIXIN
      uni.login({
        success(res) {
          if (res.errMsg === 'login:ok') {
            const { code } = res;
            getToken(code).then(res =>{
              const { openid, token, user } = res;
              store.commit('SET_INFO', user)
              store.commit('SET_TOKEN', token)
              store.commit('SET_OPENID', openid)
              console.log(res);
              getApp().globalData.onLaunchEnd = true;
              if (getApp().pageCallback) {
                getApp().pageCallback();
              }
            }).catch(() => {
              if (getApp().pageCallback) {
                getApp().pageCallback();
              }
            })
          }
        }
      })
      // #endif
      // #ifdef H5
      h5login({
        uid: 4
      }).then(res => {
        const { openid, token, user } = res;
        store.commit('SET_INFO', user)
        store.commit('SET_TOKEN', token)
        store.commit('SET_OPENID', openid)
        getApp().globalData.onLaunchEnd = true;
        if (getApp().pageCallback) {
          getApp().pageCallback();
        }
      }).catch(() => {
        if (getApp().pageCallback) {
          getApp().pageCallback();
        }
      })
      // #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
  @import '../src/style/base.scss';
	/*每个页面公共css */
</style>
