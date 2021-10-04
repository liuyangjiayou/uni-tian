<template>
  <view-container src-height="274rpx" src="/static/images/bg7.png" :back="false">
  <!--接口返-->
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport3.png')})`}" @click="click(3)">太极拳</view>
    <view class="sport-item" :style="{backgroundImage: `url(${require('@/static/images/sport/sport1.png')})`}" @click="click(1)">八段锦</view>
  </view-container>
</template>

<script>
export default {
  name: "list",
  methods: {
    click(item) {
      this.$Router.push({ path: '/pages/game/detail' });
    },
  },

}
</script>

<style scoped>

</style>