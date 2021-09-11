<template>
  <view v-if="value" class="flex align-center justify-center al-dialog">
    <view class="content pb20 px20">
      <view v-if="title" class="flex align-center justify-center title relative">
        <text>{{ title }}</text>
        <text class="close absolute" @click="close">x</text>
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
  background: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  .title{
    height: 80rpx;
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
}
</style>