<template>
  <view-container :src="info.bm_img" back>
    <!-- 报名须知 -->
    <view class="icon-title">
      <icon-title title="报名须知" />
    </view>
    <view :class="[flag ? 'view-detail' : '']">
      <rich-text :nodes="info.bm_intro"></rich-text>
    </view>
    <view class="more-info flex align-center flex-column mt20" @click="flag = !flag">
      <view>{{flag?'查看更多':'收起'}}</view>
      <al-image width="18rpx" height="19rpx" :src="require('@/static/images/more'+(flag?'1':'')+'.png')" />
    </view>
    <!--  信息认证 -->
    <view class="icon-title">
      <icon-title title="信息认证" />
    </view>
    <view>
      <!-- 一般用法 -->
      <uni-card class="card" :isShadow="true">
        <uni-forms ref="form" :modelValue="formData" :rules="rules">
          <uni-forms-item name="name">
            <view class="line">
              <al-image class="image" width="25rpx" height="29rpx" src="/static/icon/icon-account.png" />
              <uni-easyinput type="text" v-model="formData.name" placeholder="请输入基层工会账号" />
            </view>
          </uni-forms-item>
          <uni-forms-item class="last-forms-item" name="pass">
            <view class="line">
              <al-image class="image" width="25rpx" height="29rpx" src="/static/icon/icon-pass.png" />
              <uni-easyinput type="text" v-model="formData.pass" placeholder="请输入基层工会密码" />
            </view>
          </uni-forms-item>
        </uni-forms>
      </uni-card>
      <view class="flex align-center justify-center">
        <view class="text">没有工会基层账号?</view>
        <view class="register" @click="handlerRegister">立即注册</view>
      </view>
      <view class="flex align-center justify-center">
        <al-image width="348rpx" height="82rpx" src="/static/icon/start-check.png" @click.native="submit" />
      </view>
    </view>
  </view-container>
</template>

<script>
import { getRz } from "../../api";
export default {
  name: "detail",
  data() {
    return {
      info: {},
      formData: {
        name: '',
        pass: '',
      },
      flag: true,
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: '请输入基层工会账号',
          }]
        },
        pass: {
          rules: [{
            required: true,
            errorMessage: '请输入基层工会密码',
          }]
        }
      }
    };
  },
  onLoad() {
    getRz().then(res => {
      this.info = res;
      this.info.bm_intro = this.info.bm_intro
          .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
          .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
          .replace(/<p>/ig, '<p style="line-height: 1.5; text-indent: 20px" class="p_class">')
          .replace(/<span([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<span')
          .replace(/<span([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<span')
          .replace(/<span>/ig, '<span style="font-size: 12px">')
    })
  },
  methods: {
    // 提交认证
    async submit() {
      await this.$refs.form.validate();
      console.log('提交表单')
    },
    // 跳转的到立即注册
    handlerRegister() {
      this.$Router.push({ path: '/pages/index/webview', query: {url: this.info.bm_zc_url } });
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep{
  .card .uni-card__content{
    padding: 58rpx 54rpx 30rpx;
  }
  .card .uni-easyinput__content{
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .icon-title{
    margin: 50rpx 0 42rpx 0;
  }
}
::v-deep{
  .uni-easyinput__content-input{
    padding-left: 40rpx !important;
  }
}
.line{
  position: relative;
  .image{
    position: absolute;
    top: 18rpx;
    left: 0;
  }
}
.text{
  margin-top: 26rpx;
  margin-bottom: 46rpx;
  margin-right: 26rpx;
  font-size: 26rpx;
  color: #9ea6ad;
}
.register{
  margin-top: 26rpx;
  margin-bottom: 46rpx;
  font-size: 24rpx;
  color: #0088ff;
}
.view-detail{
  max-height: 150rpx;
  overflow: hidden;
}
.more-info {
  font-size: 24rpx;
  color: #f16702;
}
</style>
