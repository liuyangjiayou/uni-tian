<template>
  <view-container :head="false">
    <view class="flex align-center">
      <al-image width="75rpx" height="75rpx" round="50%" src="/static/test/user.png"/>
      <span class="fs28 ml20 text-bold">账号昵称</span>
    </view>
    <view v-for="index in 3" :key="index" class="score-wrap mt28 shadow1">
      <view class="view-title my30">健步走</view>
      <view class="flex justify-between px24">
        <view class="fs26">集美资拉吉对</view>
        <view class="fs24">排名：7</view>
      </view>
      <view class="flex justify-between align-end mt14 px24 mb30">
        <view class="flex flex-column justify-between">
          <view class="text-color-gray2 fs24">河北省石家庄某集团公司</view>
          <view class="fs24 text-color-gray3 mt25"><al-image class="mr10" width="22rpx" height="22rpx" src="/static/images/score.png"/>健步走总决赛</view>
        </view>
        <view class="view-tag-blue">分数：25236</view>
      </view>
      <view class="px24">
        <divider height="1px" />
      </view>
      <view class="flex pb40">
        <view class="flex-1 inline-flex flex-column align-center mt25">
          <al-image width="65rpx" height="65rpx" round="50%" src="/static/test/user.png"/>
          <view class="fs22">拉斯顿</view>
          <view class="text-color-blue2 fs24">3562</view>
        </view>
        <view class="flex-1 inline-flex flex-column align-center mt25">
          <al-image width="65rpx" height="65rpx" round="50%" src="/static/test/user.png"/>
          <view class="fs22">拉斯顿</view>
          <view class="text-color-blue2 fs24">3562</view>
        </view>
        <view class="flex-1 inline-flex flex-column align-center mt25">
          <al-image width="65rpx" height="65rpx" round="50%" src="/static/test/user.png"/>
          <view class="fs22">拉斯顿</view>
          <view class="text-color-blue2 fs24">3562</view>
        </view>
        <view class="flex-1 inline-flex flex-column align-center mt25">
          <al-image width="65rpx" height="65rpx" round="50%" src="/static/test/user.png"/>
          <view class="fs22">拉斯顿</view>
          <view class="text-color-blue2 fs24">3562</view>
        </view>
        <view class="flex-1 inline-flex flex-column align-center mt25">
          <al-image width="65rpx" height="65rpx" round="50%" src="/static/test/user.png"/>
          <view class="fs22">拉斯顿</view>
          <view class="text-color-blue2 fs24">3562</view>
        </view>
      </view>
    </view>
  </view-container>
</template>

<script>
export default {
name: "score"
}
</script>

<style lang="scss" scoped>
.score-wrap {
  border: 1px solid #ececec;
  border-radius: 20rpx;
}
.team-list {
  .team {
    display: inline-flex;
  }
}
</style>