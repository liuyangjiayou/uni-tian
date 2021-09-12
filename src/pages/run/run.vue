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
      src: 'https://testh5ydh.zhyell.com/index.html'
    }
  },
  methods: {
    // 验证授权
    launchEnd() {
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
                      console.log(res);
                      this.src = `${this.src}?step=${res.step}&add_step=${res.add_step}`
                    })
                    console.log(run);
                  }
                })
              }
            }
          })
        }
      });
    }
  },
}
</script>

<style scoped>

</style>
