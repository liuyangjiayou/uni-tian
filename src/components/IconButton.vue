<template>
  <view class="flex flex-column align-center icon-button" @click="handlerClick">
    <al-image :width="width" :height="height " :src="src" />
    <text :class="fs">{{ title }}</text>
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
    width: {
      type: String,
      default: '93rpx'
    },
    height: {
      type: String,
      default: '93rpx'
    },
    src: {
      type: String,
      default: '/static/logo.png'
    },
    fs: {
      type: String,
      default: 'fs28'
    },
  },
  methods: {
    handlerClick(){
      this.$emit('handlerClick')
    }
  }
}
</script>

<style scoped>

</style>
