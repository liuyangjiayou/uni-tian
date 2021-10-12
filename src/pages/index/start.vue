<template>
  <view>
    <al-image width="100%" height="100%" class="start" :src="info.start_the_thumb" />

    <custom-audio v-if="info.start_the_music !== 'null' && info.start_the_music" ref="audio" loop autoplay :src="info.start_the_music" :style="[{top: barH + 'px'}]" class="relative audio"/>
    <al-image width="278rpx" height="79rpx" src="/static/images/enter.png" @click.native="enter" class="enter" />
    <al-image width="72rpx" height="72rpx" src="/static/images/team-pic.png" class="logo" :style="[{top: barH + 'px'}]" />
  </view>
</template>

<script>
import { start } from '@/api';
export default {
  name: "start",
  data() {
    return {
      audioAction: {
        method: 'pause'
      },
      barH: 0,
      info: {
        start_the_thumb: '',
        start_the_music: '', // 测试 https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3
      },
    };
  },
  onLoad() {
    this.barH = this.customBar;
    start().then(res => {
      this.info = res;
      // if(!this.info.start_the_thumb) this.info.start_the_thumb = '/static/images/start.png';
    });
  },
  methods: {
    enter() {
      this.$refs.audio && this.$refs.audio?.pause();
      uni.reLaunch({url: 'pages/index/index'});
    },
  },
}
</script>

<style lang="scss" scoped>
.start {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.audio {
  position: fixed;
  top: 78rpx;
  right: 78rpx;
}
.logo {
  position: fixed;
  top: 78rpx;
  left: 78rpx;
}
// #ifdef MP_WEIXIN
.audio {
  position: fixed;
  top: 170rpx;
  right: 78rpx;
}
.logo {
  position: fixed;
  top: 170rpx;
  left: 78rpx;
}
// #endif

.enter{
  display: block;
  text-align: center;
  position: fixed;
  bottom: 126rpx;
  left: 0;
  right: 0;
  margin: 0 auto;
}

</style>