<template>
  <view class="video-list">
    <view v-for="(item, index) in list" :key="index" class="video-item shadow1">
      <view class="fs0 relative" @click="play(item)">
        <al-image width="100%" height="226rpx" :src="item.ranks_video" />
        <al-image width="53rpx" height="53rpx" src="/static/images/play.png" class="video-play" />
        <view class="video-tag fs24">{{item.org_name}}</view>
      </view>
      <view class="px24 pb20">
        <view class="fs26 mt20">{{item.ranks_video_name}}</view>
        <view class="fs22 text-color-gray mt10">{{item.ranks_name}}</view>
        <view class="fs22 text-color-gray3 b2-1 inline-block p5 my10">编号：{{item.id}}</view>
        <view class="flex align-center justify-between">
          <text class="text-color-blue fs30 mr10">{{item.rank_score || item.count}}</text>
          <text class="text-color-gray4 flex-1 fs22">当前票数</text>
          <view class="button-score">投票</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ViewList",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  methods: {
    play(item) {
      this.$emit('play', item);
    },
  },
}
</script>

<style lang="scss" scoped>
.video-list {
  margin-right: -20rpx;
  padding-bottom: 20rpx;
  overflow: hidden;
}
.video-item {
  margin-top: 26rpx;
  float: left;
  width: calc(50% - 20rpx);
  margin-right: 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
}
.video-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.video-tag {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 24rpx;
  border-radius: 8rpx;
  background-color: #22b7ef;
  color: #FFFFFF;
  height: 44rpx;
  line-height: 44rpx;
  padding: 0 10rpx;
}
.button-score {
  display: inline-flex;
  border-radius: 10rpx;
  border: 1px solid #f55308;
  font-size: 24rpx;
  background-color: #fdeee6;
  color: #f55308;
  padding: 3rpx 10rpx;
}
</style>
