<template>
<view>
  <view v-if="head || src || $slots.header" class="web-header fs0">
    <view v-if="head" :style="[headStyle]">
      <view :class="['border-box flex align-center px20', 'title-wrap2']" :style="[titleStyle]">
        <al-image v-if="back" class="mr20" width="20rpx" height="35rpx" src="/static/images/back.png" @click.native="backFn" />
        <view :class="['flex flex-1 fs30', titleAlign]">{{title}}</view>
      </view>
    </view>
    <view v-if="src"><al-image width="100%" :height="srcHeight" :src="src" /></view>
    <swiper
        v-if="banner.length"
        class="swiper"
        :style="{ height: srcHeight }"
        indicator-dots
        autoplay
        circular
        :interval="3000"
        :duration="500"
    >
      <swiper-item v-for="(item, index) in banner" :key="index"><al-image width="100%" height="100%" :src="item[field]" /></swiper-item>
    </swiper>
    <slot name="header" />
  </view>
  <view :class="['web-body', customClass]" :style="[comStyle]">
    <slot/>
  </view>
  <authorization ref="auth" v-model="authorDialogVisibility"/>
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
      default: false,
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
    // 轮播图
    banner: {
      type: Array,
      default: () => [],
    },
    field: {
      type: String,
      default: 'image',
    },
  },
  data() {
    return {
      authorDialogVisibility: false,
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
    headStyle() {
      return {
        borderBottom: '2px solid #efefef',
        height: this.customBarHeight + 'px',
        ...(this.background ? {} : {}),
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
    getAuth(success, failure) {
      if (this.$store.getters.token) {
        typeof success === 'function' && success({token: this.$store.getters.token});
        return;
      }
      this.authorDialogVisibility = true;
      typeof success === 'function' && this.$refs.auth.$off('success').$on('success', success);
      typeof failure === 'function' && this.$refs.auth.$off('failure').$on('failure', failure);
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
    position: fixed;
    top: 0;
    z-index: 200;
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