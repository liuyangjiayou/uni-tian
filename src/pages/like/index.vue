<template>
  <view-container src-height="274rpx" src="/static/images/tp.jpg" :back="false">
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport3.png')})`}" @click="click(3)">太极拳</view>
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport1.png')})`}" @click="click(1)">八段锦</view>
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport2.png')})`}" @click="click(2)">广场舞</view>
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport12.png')})`}" @click="click(12)">广播体操</view>
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport4.png')})`}" @click="click(4)">集体跳绳</view>
  </view-container>
</template>

<script>
export default {
  name: "index",
  methods: {
    click(index) {
      this.$Router.push({path: '/pages/like/list', query: {sport:index}});
    },
  },
}
</script>

<style scoped>

</style>