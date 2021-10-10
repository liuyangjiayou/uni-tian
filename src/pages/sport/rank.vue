<template>
  <view-container :src="banner.image" back :title="project_name" customClass="dynamic-detail shadow2">
    <view v-if="orgs.length" class="rank-title text-color-blue text-bold fs26">
      <easy-select class="flex justify-center" size="mini" :options="orgs" :value="org_name" @selectOne="selectOne" />
    </view>
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
import { ranks, orgs } from '@/api';
export default {
  name: "rank",
  data() {
    return {
      list: [],
      banner: {},
      project_name: '',
      query: {},
      orgs: [],
      org_id: '',
      org_name: '',
    };
  },
  async onLoad() {
    this.query = this.$Route.query;
    if (this.query.type == 2) {
      const res = await orgs();
      const list = res.list.map(item => ({ value: item.id, label: item.org_name }));
      this.orgs = list;
      this.org_id = this.orgs?.[0]?.value || '';
      this.org_name = this.orgs?.[0]?.label || '';
    }
    this.getList();
  },
  methods: {
    selectOne(options) {
      this.org_name = options.label;
      this.org_id = options.value;
      this.getList();
    },
    getList() {
      const data = {};
      if (this.query.type == 2) {
        data.org_id = this.org_id;
      }
      ranks[this.query.type.toString()]?.(this.query.id, data).then(res => {
        this.list = res.list;
        this.banner = res.banner;
        this.project_name = res.project_name;
      });
    },
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