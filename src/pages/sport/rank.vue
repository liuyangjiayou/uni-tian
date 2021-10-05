<template>
  <view-container :src="banner.image" back :title="banner.title" customClass="dynamic-detail shadow2">
    <view class="rank-title text-color-blue text-bold fs26">{{project_name}}</view>
    <view>
      <view class="flex fs24 mt50 pb8" style="color: #b1b1b1;">
        <span class="flex-1">排名</span>
        <span class="flex-3">队伍名</span>
        <span class="flex-2">单位名</span>
        <span class="flex-1">分数</span>
      </view>
      <view v-for="(item, index) in list" :key="index" class="flex py12 align-center">
        <span :class="['flex-1 text-cut fs0' ]"><i :class="'team-index fs24' + ' team-'+ (item.rownum === 'null' || !item.rownum ? item.num_tmp : item.rownum)">
          {{item.rownum === "null" || !item.rownum ? item.num_tmp : item.rownum}}
        </i></span>
        <span class="flex-3 text-cut fs24">{{item.ranks_name}}</span>
        <span class="flex-2 text-cut fs24">{{item.ranks_org_name}}</span>
        <span class="flex-1 text-cut fs24">{{item.rank_score}}</span>
      </view>
    </view>
  </view-container>
</template>

<script>
import { ranks } from '@/api';
export default {
  name: "rank",
  data() {
    return {
      list: [],
      banner: {},
      project_name: '',
      query: {},
    };
  },
  onLoad() {
    this.query = this.$Route.query;
    if (!['1', '2', '3', '4'].includes(this.query.type?.toString())) {
      this.list = [];
      return;
    }
    ranks[this.query.type.toString()]({project_id: this.query.id}).then(res => {
      this.list = res.list;
      this.banner = res.banner;
      this.project_name = res.project_name;
    });
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