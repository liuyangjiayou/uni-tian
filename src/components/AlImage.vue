<template>
  <image :src="src" :mode="mode" :style="{ width, height }" />
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
    src: {
      type: String,
      default: '/static/logo.png',
    },
    mode: {
      type: String,
      default: 'aspectFill',
    }
  },
}
</script>

<style scoped>

</style>
