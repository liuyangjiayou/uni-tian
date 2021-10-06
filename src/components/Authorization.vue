<template>
  <al-dialog :value="value" @close="handlerClose" :title="title">
    <template v-slot:content>
      <!-- #ifdef MP_WEIXIN-->
      <view v-if="type === 1">首次使用小程序，是否微信登录</view>
      <button v-if="type === 1" class="mt20 primary" type="primary" @click="handlerUserInfo">确认登录</button>
      <view v-if="type === 2">需要获取手机号授权</view>
      <button v-if="type === 2" class="mt20 primary" type="primary" open-type="getPhoneNumber" @getphonenumber="getphonenumber">确认获取手机号</button>
      <!-- #endif-->
      <!-- #ifdef H5-->
      <uni-forms ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item name="phone" class="bottom-line">
          <view class="flex align-center">
            <al-image width="52rpx" height="52rpx" src="/static/images/phone.png" />
            <uni-easyinput type="text" :inputBorder="false" v-model="formData.phone" :clearable="false" placeholder="请填写您的手机号码" />
          </view>
        </uni-forms-item>
        <uni-forms-item name="sms_code">
          <view class="flex align-center">
            <al-image width="52rpx" height="52rpx" src="/static/images/sms.png"/>
            <uni-easyinput type="text" :inputBorder="false" v-model="formData.sms_code" :clearable="false" placeholder="请输入验证码" />
            <button type="primary" plain="true" @click="getCode">{{smsTitle}}</button>
          </view>
        </uni-forms-item>
      </uni-forms>
      <button class="primary" type="primary" @click="loginH5">确定</button>
      <!-- #endif-->
    </template>
  </al-dialog>
</template>

<script>
import { login, bindPhone, sendSms, h5login} from "../api";
import store from "../store";
export default {
  name: 'Authorization',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisibility: true,
      type: 1,
      formData: {
        phone: '',
        sms_code: '',
      },
      rules: {
        phone: {
          rules: [{
            required: true,
            errorMessage: '请输入手机号码',
          },{
            pattern: '^[1-9]\\d{10}$',
            errorMessage: '请输入11位手机号码',
          }]
        },
        sms_code: {
          rules: [{
            required: true,
            errorMessage: '请输入手机验证码',
          }]
        }
      },
      send: {
        status: 0,
        dura: 0,
      },
    }
  },
  computed: {
    smsTitle() {
      if (this.send.status === 0 ) {
        return "获取验证码";
      } else {
        return this.send.dura > 0 ? this.send.dura + '秒后重新发送' : '重新发送';
      }
    },
    title() {
      // #ifdef H5
      return '手机号登录';
      // #endif
      // #ifdef MP_WEIXIN
      return '授权登录';
      // #endif
    },
  },
  methods: {
    // 小程序登录
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
                  this.$emit('success', {});
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
              this.$emit('success', {});
              this.handlerClose();
            }
          })
        }
      })
    },
    // h5登录
    loginH5() {
      this.$refs.form.validate().then(res=>{
        h5login(this.formData).then(res => {
          const { token, user } = res;
          store.commit('SET_INFO', user);
          store.commit('SET_TOKEN', token);
          store.commit('SET_OPENID', user.openid);
          this.success();
        }).catch(err => {
          console.log('h5登录错误信息：', err);
          this.failure();
        });
      }).catch(err =>{
        console.log('表单错误信息：', err);
      })

    },
    handlerClose(flag) {
      this.$emit('input', false);
      this.$emit('close');
    },
    // 成功后的回调
    success() {
      this.$emit('success', {});
    },
    // 失败后的回调
    failure() {
      this.$emit('failure', {});
    },
    getCode() {
      if (!this.formData.phone) {
        uni.showToast({
          icon: 'none',
          title: '请输入手机号码',
          duration: 2000
        });
        return;
      }
      if (this.send.dura > 0) return;
      sendSms({phone: this.formData.phone}).then(res => {
        clearInterval(this.interval);
        this.send.status = 1;
        this.send.dura = 60;
        this.interval = setInterval(() => {
          this.send.dura = this.send.dura - 1;
        }, 1000);
      }).catch(() => {
        uni.showToast({
          icon: 'none',
          title: '发送失败！',
          duration: 2000
        });
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss" scoped>
.primary {
  background-color: #22b7ef; height: 80rpx; line-height: 80rpx; font-size: 30rpx;
}
::v-deep uni-button[type=primary][plain] {
  width: 222rpx;
  padding: 0;
  height: 64rpx;
  line-height: 64rpx;
  color: #22b7ef;
  font-weight: normal;
  background: #fff;
  border: 1px solid #22b7ef;
  font-size: 24rpx;
  &::after {
    border: none;
  }
}
::v-deep .uni-error-message {
  left: 36px;
  top: 25px;
}
::v-deep .bottom-line .uni-forms-item__inner {
  border-bottom: 1rpx solid #d9d9d9;
  padding-bottom: 26rpx;
  margin-bottom: 26rpx;
}
</style>
