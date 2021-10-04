<template>
  <view-container src="/static/images/bg1.png" :back="false" customClass="dynamic-detail shadow2">
    <view class="fs34 my34">河北省第十五界运动会闭幕</view>
    <view class="mb34">
      <al-image width="24rpx" height="24rpx" src="/static/images/sc.png" @click.native="toProvin" />
      <span class="text-color-gray fs26 ml28">30分钟前</span>
    </view>
    <divider height="1rpx" />
    <div class="dynamic-detail-content">
      这里是动态内容，这里是动态内容，这里是动态内容，这里是动态内容，这里是动态内容
    </div>
  </view-container>
</template>

<script>
export default {
name: "detail"
}
</script>

<style lang="scss" scoped>

</style>