<template>
  <view class="flex align-center justify-center">
    <image style="width:111rpx;height:25rpx" src="/static/icon/line-l.png" mode="aspectFit" />
    <view class="title">{{ title }}</view>
    <image style="width:111rpx;height:25rpx" src="/static/icon/line-r.png" mode="aspectFit" />
  </view>
</template>

<script>
export default {
  name: "IconTitle",
  props: {
    title: '标题'
  }
}
</script>

<style scoped>
.title{
  margin: 0 28rpx;
  font-size: 42rpx;
  font-weight: bold;
}
</style>
