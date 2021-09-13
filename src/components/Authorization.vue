<template>
  <al-dialog v-model="dialogVisibility" @close="handlerClose">
    <template v-slot:content>
      <view v-if="type === 1">首次使用小程序，是否微信登录</view>
      <button v-if="type === 1" class="mt20" type="primary" @click="handlerUserInfo">确认登录</button>
      <view v-if="type === 2">需要获取手机号授权</view>
      <button v-if="type === 2" class="mt20" type="primary" open-type="getPhoneNumber" @getphonenumber="getphonenumber">确认获取手机号</button>
    </template>
  </al-dialog>
</template>

<script>
import { login, bindPhone} from "../api";
export default {
  name: 'Authorization',
  data() {
    return {
      dialogVisibility: true,
      type: 1,
    }
  },
  methods: {
    handlerUserInfo () {
      uni.getUserProfile({
        desc: '获取信息用于展示',
        success: (e) => {
          const userInfo = e.userInfo;
          const { nickName, avatarUrl } = userInfo;
          uni.login({
            success: (res) => {
              const { code } = res;
              login({
                code,
                nickname: nickName,
                avatar: avatarUrl,
              }).then(data => {
                this.$store.commit('SET_INFO', data.user);
                this.$store.commit('SET_TOKEN', data.token);
                const { phone } = data.user;
                if (!phone){
                  this.type = 2;
                } else {
                  this.type = 1;
                  this.handlerClose();
                }
              });
            }
          })
        }
      })
    },
    getphonenumber(e) {
      const { encryptedData, iv } = e.detail;
      uni.login({
        success: (res) => {
          const { code } = res;
          bindPhone({
            code,
            encryptedData,
            iv
          }).then(data => {
            this.$store.commit('SET_INFO', data.user);
            this.$store.commit('SET_TOKEN', data.token);
            const { phone } = data.user;
            if (!phone){
              this.type = 2;
            } else {
              this.type = 1;
              this.handlerClose();
            }
          })
        }
      })
    },
    handlerClose(flag) {
      this.dialogVisibility = false;
      this.$emit('close', false);
    }
  }
}
</script>

<style scoped>

</style>
