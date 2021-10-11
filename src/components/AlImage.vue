<template>
  <image :src="src" :mode="mode" :style="{ width, height, borderRadius: round }" />
</template>

<script>
export default {
  name: 'AlImage',
  props: {
    width: {
      type: String,
      default: '120rpx',
    },
    height: {
      type: String,
      default: '120rpx',
    },
    round: {
      type: String,
      default: '0',
    },
    src: {
      type: String,
      default: '/static/logo.png',
    },
    mode: {
      type: String,
      default: 'aspectFill',
    },
  },
}
</script>

<style scoped>
</style>
