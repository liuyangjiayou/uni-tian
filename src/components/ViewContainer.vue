<template>
<view>
  <view v-if="head || src || $slots.header" class="web-header fs0">
    <view v-if="head" :class="['border-box flex align-center px20', background ? 'title-wrap' : 'title-wrap2']" :style="[titleStyle]">
      <al-image v-if="back" class="mr20" width="20rpx" height="35rpx" src="/static/images/back.png" @click.native="backFn" />
      <view :class="['flex flex-1 fs30', titleAlign]">{{title}}</view>
      <button v-if="share" data-name="shareBtn" open-type="share">
        <al-image class="mr20" width="36rpx" height="36rpx" src="/static/images/share.png" />
      </button>
    </view>
    <view v-if="src"><al-image width="100%" :height="srcHeight" :src="src" /></view>
    <slot name="header" />
  </view>
  <view :class="['web-body', customClass]" :style="[comStyle]">
    <slot/>
  </view>
</view>
</template>

<script>
export default {
  name: "ViewContainer",
  props: {
    // 是否显示头部-标题栏
    head: {
      type: Boolean,
      default: true,
    },
    // 是否显示返回按钮
    back: {
      type: Boolean,
      default: true,
    },
    // 是否分享
    share: {
      type: Boolean,
      default: true,
    },
    // 标题
    title: {
      type:String,
      default: '',
    },
    // 标题位置
    titleAlign: {
      type: String,
      default: 'justify-start',
    },
    // 视图banner图，为空时不显示banner
    src: {
      type: String,
      default: '',
    },
    // 视图banner图高度
    srcHeight: {
      type: String,
      default: '383rpx'
    },
    // 图片是否作为头部的背景
    background: {
      type: Boolean,
      default: false,
    },
    // 头部背景颜色
    backgroundColor: {
      type: String,
      default: '#FFF'
    },
    // 内容容器style样式
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },
    // 内容容器class样式
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      customBarHeight: 60,
      statusBarHeight: 20,
    };
  },
  computed: {
    comStyle() {
      return {
        ...this.bodyStyle,
      };
    },
    titleStyle() {
      return {
        height: this.customBarHeight + 'px',
        paddingTop: this.statusBarHeight + 'px',
        ...(this.background ? {} : {backgroundColor: this.backgroundColor}),
      };
    },
  },
  created() {
    this.customBarHeight = this.customBar;
    this.statusBarHeight = this.statusBar;
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
  }
  .title-wrap2 {
    width: 100%;
  }
  .web-body {
    position: relative;
    background: #ffffff;
    padding: 30rpx 30rpx;
    overflow: hidden;
  }
  .web-body.pt0 {
    padding-top: 0;
  }
  .web-body.py0 {
    padding-top: 0;
    padding-bottom: 0;
  }
  button{
    margin: 0;
    padding: 2rpx;
    height: initial;
    background: initial;
    font-size: 0;
  }
  button::after { border: none }
</style>