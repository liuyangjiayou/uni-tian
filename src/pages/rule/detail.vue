<template>
  <view-container :head="false">
    <view class="art-title fs34 text-bold">
      <span>桌上冰壶</span>
    </view>
    <view class="dynamic-detail-content">
      <p>1.参赛人数：5人</p>
      <p>2.报名方式：团体报名</p>
      <p>3.比赛方式及规则：比赛方式及规则比赛方式，及规则比赛方式及规。则比赛方式及规？则比赛方式及规则！比赛方式及规则比赛方式，及规则比赛方式及规。则比赛方式及规？则比赛方式及规则！比赛方式及规则比赛方式，及规则比赛方式及规。则比赛方式及规？则比赛方式及规则！</p>
    </view>
  </view-container>
</template>

<script>
export default {
  name: "detail",
}
</script>

<style lang="scss" scoped>
.art-title {
  padding: 8rpx 0 0;
  background: url("~@/static/images/bg2.png") center top no-repeat;
  background-size: 220rpx 24rpx;
  text-align: center;
  span {
    position: relative;
    padding: 0 35rpx;
  }
  span:before, span:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: inline-block;
    width: 22rpx;
    height: 22rpx;
    background-size: 100% 100%;
  }
  span:before {
    left: 0;
    background-image: url("~@/static/images/right.png");
  }
  span:after {
    right: 0;
    background-image: url("~@/static/images/left.png");
  }
}
</style>