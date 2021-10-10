<template>
    <view>
      <web-view :src="src"></web-view>
    </view>
</template>

<script>
import { getRun } from '../../api'
import { launchOrload } from "../../utils/mixins";

export default {
  name: "run",
  mixins: [launchOrload],
  data() {
    return {
      src: ''
    }
  },
  onLoad(){
    uni.login({
      success: (res) => {
        const { code } = res;
        uni.authorize({
          scope: 'scope.werun',
          success: (e) => {
            if (e.errMsg === 'authorize:ok') {
              wx.getWeRunData({
                success: (run) => {
                  const { encryptedData, iv } = run;
                  getRun({
                    code,
                    encryptedData,
                    iv,
                  }).then(res => {
                      this.src = decodeURIComponent(`https://testh5ydh.zhyell.com/jbz/index.html?token=${this.$store.getters.token}&time=${+new Date()}`)
                  })
                }
              })
            }
          }
        })
      }
    });
  },
  methods: {},
}
</script>

<style scoped>
.btn-wrap{
  position: absolute;
  top: 100px;
  left: 100px;
  background: #fff;
  z-index: 10000;
}
</style>
