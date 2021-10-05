<template>
  <view-container back title="比赛进程" >
    <view class="process-wrap">
      <view class="pro-title flex align-center justify-center fs36 text-bold text-color-white">市级比赛</view>
      <view class="pro-body shadow1">
        <view class="fs30 mt40">足球颠球比赛初赛</view>
        <view class="fs24 minute mt22 text-color-gray">2021-09-08 -- 2021-9-12</view>

        <view class="fs30 mt40">足球颠球比赛初赛</view>
        <view class="fs24 minute mt22 text-color-gray">2021-09-08 -- 2021-9-12</view>

        <view class="fs30 mt40">足球颠球比赛初赛</view>
        <view class="fs24 minute mt22 text-color-gray">2021-09-08 -- 2021-9-12</view>
      </view>
    </view>
    <view class="process-wrap mt28">
      <view class="pro-title flex align-center justify-center fs36 text-bold text-color-white">省级比赛</view>
      <view class="pro-body shadow1">
        <view class="fs30 mt40">足球颠球比赛初赛</view>
        <view class="fs24 minute mt22 text-color-gray">2021-09-08 -- 2021-9-12</view>

        <view class="fs30 mt40">足球颠球比赛初赛</view>
        <view class="fs24 minute mt22 text-color-gray">2021-09-08 -- 2021-9-12</view>

        <view class="fs30 mt40">足球颠球比赛初赛</view>
        <view class="fs24 minute mt22 text-color-gray">2021-09-08 -- 2021-9-12</view>
      </view>
    </view>
  </view-container>
</template>

<script>
export default {
name: "index"
}
</script>

<style lang="scss" scoped>
.process-wrap {
  .pro-title {
    background-image: url("~@/static/images/bg3.png");
    background-position: top;
    background-size: 100%;
    height: 128rpx;
  }
  .pro-body {
    border-radius: 0 0 32rpx 32rpx;
    padding: 0 40rpx 40rpx;
    background-color: #f8fdff;
    overflow: hidden;
    box-sizing: border-box;
    .minute {
      color: #aaa;
    }
    .minute::before {
      content: '';
      display: inline-block;
      width: 30rpx;
      height: 30rpx;
      background-image: url("~@/static/images/process1.png");
      background-size: 100% 100%;
      vertical-align: bottom;
      margin-right: 20rpx;
    }
  }

}
</style>