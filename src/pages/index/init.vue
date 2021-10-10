<template>

</template>

<script>
export default {
  name: "init",
  onLoad() {
    // 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
    const value = uni.getStorageSync('launchFlag');
    console.log('load load load load');
    if (value) {
      console.log('launchFlag', value);
      // 如何已经有，直接去home首页
      uni.reLaunch({
        url: '/pages/index/start'
      });
    } else {
      // 没有值，跳到引导页，并存储，下次打开就不会进去引导页
      uni.setStorage({
        key: 'launchFlag',
        data: true
      });
      uni.redirectTo({
        url: '/pages/index/guide'
      });
    }
  }
}
</script>

<style scoped>

</style>