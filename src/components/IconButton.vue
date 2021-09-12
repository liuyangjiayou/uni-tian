<template>
  <view class="flex flex-column align-center" @click="handlerClick">
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
  methods: {
    handlerClick(){
      this.$emit('handlerClick')
    }
  }
}
</script>

<style scoped>

</style>
