<template>
  <view class="relative">
    <swiper
      :current.sync="current"
      class="swiper"
      :style="{ height: '100vh'}"
      indicator-dots
      :interval="3000"
      :duration="500"
      @change="change"
  >
    <swiper-item v-for="(item, index) in imgs" :key="index"><al-image width="100%" height="100%" :src="item" /></swiper-item>
  </swiper>
    <view v-if="current === imgs.length - 1" class="next-btn">
      <button type="default" @click="click">本页是引导页测试，进入下一步</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      current: 0,
      imgs: [
          '/static/images/bg4.png',
          '/static/images/bg1.png',
      ],
      show: false,
    };
  },
  methods: {
    change({detail}) {
      this.current = detail.current;
    },
    click() {
      uni.navigateTo({url: '/pages/index/start'});
    },
  },
}
</script>

<style scoped>
.next-btn {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15%;
  z-index: 1;
  left: 0;
  right: 0;
}
</style>