<template>
  <view v-if="value" class="flex align-center justify-center al-dialog">
    <view class="content pb20 px50">
      <view v-if="title" class="flex align-center title relative">
        <text class="flex-1 text-center pl22">{{ title }}</text>
        <al-image width="44rpx" height="44rpx" src="/static/images/close2.png" @click.native="close" />
      </view>
      <slot name="content" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'AlDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示',
    }
  },
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit('input', false);
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  min-width: 400rpx;
  max-width: 600rpx;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  .title{
    height: 125rpx;
    background: #fff;
  }
  .close{
    position: absolute;
    right: 0rpx;
  }
}
.al-dialog{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  z-index: 1000;
}
</style>
