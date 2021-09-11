<template>
  <view class="al-dialog">
    <view :style="{ ...initBgConfig, ...bgConfig }" class="bg" />
    <view>
      <text>我是title</text>
      <text>x</text>
    </view>
    <view class="content">
      我是内容插槽
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    bgConfig: {
      type: Object,
      default: () => ()
    }
  },
  data() {
    return {
      initBgConfig: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
      }
    };
  }
}
</script>

<style scoped>
.al-dialog{
  position: fixed;
  width: 100%;
  height: 100%;
}
.bg{
  background: #000;
  opacity: 1;
}
</style>