<template>
  <view class="flex flex-column align-center">
    <al-image :src="src" />
    <text class="fs14">{{ title }}</text>
  </view>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    title: {
      type: String,
      default: '描述'
    },
    src: {
      type: String,
      default: '/static/logo.png'
    },
  },
}
</script>

<style scoped>

</style>
