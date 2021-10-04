<template>
  <view>
    <view-container src-height="274rpx" src="/static/images/bg7.png" :back="false">
      <view class="flex align-center mt10">
        <al-image width="40rpx" height="31rpx" :src="require('@/static/images/game.png')" />
        <span class="ml25 fs32 text-bold">游戏介绍</span>
      </view>
      <view :class="['game-info mt20 fs30', show?'':'game-info-es']">
        游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍
        游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍
      </view>
      <view class="more-info flex align-center flex-column mt10" @click="moreFn">
        <view>{{show?'收起':'查看更多'}}</view>
        <al-image width="18rpx" height="19rpx" :src="require('@/static/images/more'+(show?'':'1')+'.png')" />
      </view>
      <view class="flex justify-center mt20">
        <al-image width="267rpx" height="98rpx" :src="require('@/static/images/bisai.png')" />
        <al-image width="267rpx" height="98rpx" :src="require('@/static/images/lianxi.png')" class="ml60" />
      </view>
    </view-container>
    <divider height="10rpx" />
    <view-container :head="false" :back="false">
      <view class="flex justify-between mt10 mb20">
        <view class="flex align-center">
          <al-image width="30rpx" height="38rpx" :src="require('@/static/images/paihang.png')" />
          <span class="ml25 fs32 text-bold">排行榜</span>
        </view>
        <view class="flex align-center">
          <span class="fs24 mr10" style="color: #999">查看更多</span>
          <al-image width="13rpx" height="24rpx" :src="require('@/static/images/more2.png')" />
        </view>
      </view>
      <divider height="1rpx" />
      <view class="flex pt40 pb30">
        <view v-for="(item) in 4" class="flex-1 flex flex-column align-center">
          <view class="team-pic relative">
            <al-image width="100rpx" height="100rpx" :src="require('@/static/images/team-pic.png')" />
            <al-image width="46rpx" height="46rpx" :src="require('@/static/images/0'+ (item + 1) +'.png')" class="pic-icon" />
          </view>
          <view class="fs30 mt10">队伍名称</view>
        </view>
      </view>
      <view class="flex justify-between mt10 mb20">
        <view class="flex align-center">
          <al-image width="30rpx" height="38rpx" :src="require('@/static/images/zudui.png')" />
          <span class="ml25 fs32 text-bold">组队信息</span>
        </view>
        <view class="flex align-center fs24">
          总分数：<span class="fs30 text-bold mr6" style="color: #fa8f06">999</span>分
        </view>
      </view>
      <divider height="1rpx" />
      <view v-for="(item, index) in 5" :key="index" class="flex align-center mt35">
        <al-image width="150rpx" height="150rpx" :src="require('@/static/test/tu.png')" />
        <view class="flex fs30 flex-1 ml30 flex-column">
          <span>名称：石家庄工会队</span>
          <span class="mt10">成绩：<span class="text-bold" style="color: #fa8f06">100</span></span>
        </view>
        <al-image width="13rpx" height="24rpx" :src="require('@/static/images/more2.png')" />
      </view>
    </view-container>
  </view>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    moreFn() {
      this.show = !this.show;
      console.log(this.show);
    },
    click(item) {
      this.$Router.push({ path: '/pages/game/detail' });
    },
  },

}
</script>

<style lang="scss" scoped>
.more-info {
  color: #f16702;
}
.game-info {
  line-height: 60rpx;
}
.game-info-es {
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp: 2;
}
.pic-icon {
  position: absolute;
  right: -18rpx;
  top: -18rpx;
}
</style>