<template>
  <view :style="{ height }" class="divider" />
</template>

<script>
export default {
  name: 'Divider',
  props: {
    height: {
      type: String,
      default: '12rpx'
    }
  }
}
</script>

<style scoped>
.divider{
  background: #eee;
}
</style>
