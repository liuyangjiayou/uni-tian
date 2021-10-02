<template>
<view>
  <view v-if="head" class="web-header fs0">
    <view v-if="src"><al-image width="100%" :height="srcHeight" :src="src" /></view>
    <view v-if="back" class="title-wrap flex align-center px20">
      <al-image width="20rpx" height="35rpx" src="/static/images/back.png" @click.native="backFn" />
      <view :class="['flex flex-1 ml20', titleAlign]">{{title}}</view>
    </view>
    <slot name="header" />
  </view>
  <view :class="['web-body', customClass]" :style="comStyle">
    <slot/>
  </view>
</view>
</template>

<script>
export default {
  name: "ViewContainer",
  props: {
    head: {
      type: Boolean,
      default: true,
    },
    back: {
      type: Boolean,
      default: true,
    },
    title: {
      type:String,
      default: '',
    },
    titleAlign: {
      type: String,
      default: 'justify-start',
    },
    src: {
      type: String,
      default: '',
    },
    srcHeight: {
      type: String,
      default: '383rpx'
    },
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    comStyle() {
      return { backgroundColor: '#ddd' };
    },
  },
  methods: {
    backFn() {
      this.$Router.back(1);
    },
  },
}
</script>

<style lang="scss" scoped>
  .web-header {
    position: relative;
  }
  .title-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
  }
  .web-body {
    position: relative;
    background: #ffffff;
    padding: 30rpx 30rpx;
  }
  .web-body.pt0 {
    padding-top: 0;
  }
  .web-body.py0 {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>