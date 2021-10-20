<template>
  <view v-if="value" class="alert-dialog">
    <view class="content">
      <view class="header flex flex-column align-center justify-center">
        <al-image width="80rpx" height="78rpx" src="/static/images/answer.png" />
        <text class="header-text">签到成功</text>
      </view>
      <view>
        <slot />
      </view>
      <view class="wrap-btn flex align-center">
        <view class="prev flex align-center justify-center" @click="handlerSub">{{ prev }}</view>
        <view class="next flex align-center justify-center" @click="handlerNext">{{ next }}</view>
      </view>
      <view class="close-image">
        <al-image width="48rpx" height="48rpx" src="/static/images/answer-close.png" @click.native="close" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AlertDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    prev: {
      type: String,
      default: '下一题',
    },
    next: {
      type: String,
      default: '跳过',
    },
  },
  methods:{
    close(){
      this.$emit('input', false)
      this.$emit('close')
    },
    handlerNext() {
      this.$emit('input', false)
      this.$emit('Next')
    },
    handlerSub() {
      this.$emit('sub')
    }
  }
}
</script>

<style scoped>
.alert-dialog{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  z-index: 100;
}
.header{
  height: 183rpx;
  background: #42c1ef;
}
.header-text{
  color: #fff;
}
.content{
  position: absolute;
  top: 400rpx;
  left: 50%;
  width: 490rpx;
  margin-left: -225rpx;
  background: #fff;
  border-radius: 10rpx;
  z-index: 120;
}
.wrap-btn{
  height: 83rpx;
}
.wrap-btn .prev, .wrap-btn .next{
  box-sizing: border-box;
  margin-left: 64rpx;
  width: 150rpx;
  height: 46rpx;
  background: #42c1ef;
  border-radius: 23rpx;
  color: #fff;
  font-size: 28rpx;
}
.wrap-btn .next{
  color: #a0a0a0;
  border: 2rpx solid #a0a0a0;
  background: #fff;
}
.close-image{
  position: absolute;
  bottom: -78rpx;
  left: 50%;
  margin-left: -24rpx;
  z-index: 101;
}
</style>
