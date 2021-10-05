<template>
  <view-container src="/static/images/img1.png" back :title="query.sport">
    <view class="flex justify-between align-center pb35">
      <view>
        <view class="view-title">{{ query.sport }}{{ query.id }}</view>
        <view class="view-tag-gray fs22 ml30 mt8">冰球技术术语</view>
      </view>
      <view class="flex-none flex">
        <icon-button fs="fs24" src="/static/images/icon_sc.png" width="40rpx" height="40rpx" title="赛程" @handlerClick="$Router.push({name:'process'})" />
        <icon-button fs="fs24" src="/static/images/icon_ph.png" width="40rpx" height="40rpx" title="排行" class="ml50" @handlerClick="$Router.push({name:'rank'})" />
      </view>
    </view>
    <divider height="1rpx" />
    <view class="mt30">简介</view>
    <view class="my30 fs26">这里是简介，冰球的基本技术之一，射门技术的练习...这里是简介，冰球的基本技术之一，射门技术的练习...这里是简介，冰球的基本技术之一，射门技术的练习...</view>
    <divider height="1rpx" />
    <view class="flex justify-center py30">
      <al-image width="335rpx" height="171rpx" src="/static/images/sheng.png" @click.native="toProvin" />
      <al-image width="335rpx" height="171rpx" src="/static/images/shi.png" @click.native="toCity" class="ml20" />
    </view>
    <divider height="1rpx" />
    <view class="my30">赛事回放</view>
    <view class="flex justify-between">
      <view>
        <al-image width="335rpx" height="180rpx" src="/static/test/img1.png" />
        <view class="fs24">新乐市工会</view>
      </view>
      <view>
        <al-image width="335rpx" height="180rpx" src="/static/test/img1.png" />
        <view class="fs24">新乐市工会</view>
      </view>
    </view>
  </view-container>
</template>

<script>
export default {
name: "index",
  data() {
    return {
      query: {},
    };
  },
  onLoad() {
    this.query = this.$Route.query;
  },
  created() {
    console.log('$Route', this.$Route);
  },
  methods: {
    toProvin() {
      this.$Router.push({path: '/pages/sport/matchs', query: {title: '省级比赛'}});
    },
    toCity() {
      this.$Router.push({path: '/pages/sport/matchs', query: {title: '市级比赛'}});
    },
  },
}
</script>

<style scoped>

</style>