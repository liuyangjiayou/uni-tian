<template>
  <image :style="{ width, height }" :src="src" :mode="mode" />
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
  mounted() {
    console.log(this.$attrs);
  }
}
</script>

<style scoped>

</style>
