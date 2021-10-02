<template>
  <view-container src="/static/images/bg4.png" :back="false" customClass="dynamic-detail shadow2">
    <view class="rank-title text-color-blue text-bold fs26">陆地冰球射门</view>
    <view>
      <view class="flex fs24 mt50 pb8" style="color: #b1b1b1;">
        <span class="flex-1">排名</span>
        <span class="flex-2">队伍名</span>
        <span class="flex-3">单位名</span>
        <span class="flex-1">分数</span>
      </view>
      <view v-for="(item, index) in list" :key="index" class="flex py12 align-center">
        <span :class="['flex-1 text-cut fs0' ]"><i :class="['team-index fs24', `team-${index+1}`]">{{item.index}}</i></span>
        <span class="flex-2 text-cut fs24">{{item.team}}</span>
        <span class="flex-3 text-cut fs24">{{item.company}}</span>
        <span class="flex-1 text-cut fs24">{{item.score}}</span>
      </view>
    </view>
  </view-container>
</template>

<script>
export default {
  name: "rank",
  data() {
    return {
      list: [
        {
          index: 1,
          team: '队伍名字1',
          company: '单位名字1单位名字3',
          score: 32654,
        },
        {
          index: 2,
          team: '队伍名字2',
          company: '单位名字2单位名字3',
          score: 32654,
        },
        {
          index: 3,
          team: '队伍名字3',
          company: '单位名字3单位名字3',
          score: 32654,
        },
        {
          index: 4,
          team: '队伍名字4',
          company: '单位名字4',
          score: 32654,
        },
        {
          index: 5,
          team: '队伍名字5',
          company: '单位名字5',
          score: 32654,
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.rank-title {
  background: url("~@/static/images/bg5.png") center top no-repeat;
  background-size: 474rpx 45rpx;
  text-align: center;
}
.team-index {
  height: 51rpx;
  width: 51rpx;
  text-align: center;
  display: inline-block;
  text-align: center;
  line-height: 51rpx;
  &.team-1 {
    background: url("~@/static/images/team1.png") left center no-repeat;
    background-size: 51rpx 51rpx;
    font-size: 0;

  }
  &.team-2 {
    background: url("~@/static/images/team2.png") left center no-repeat;
    background-size: 51rpx 51rpx;
    font-size: 0;
  }
  &.team-3 {
    background: url("~@/static/images/team3.png") left center no-repeat;
    background-size: 51rpx 51rpx;
    font-size: 0;
  }
}

</style>