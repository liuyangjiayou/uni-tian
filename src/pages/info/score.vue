<template>
  <view-container ref="container" back title="成绩查询">
    <view class="flex align-center">
      <al-image width="75rpx" height="75rpx" round="50%" :src="user.avatar"/>
      <text class="fs28 ml20 text-bold">{{user.nickname}}</text>
    </view>
    <view v-for="(row, index) in list" :key="index" class="score-wrap mt28 shadow1">
      <view class="view-title my30">{{ row.project.pro_name }}</view>

      <template v-for="(row, index3) in row.score_info">
        <view :key="index3 + 'a'" class="flex justify-between px24">
          <view class="fs26">{{ row.ranks_name }}</view>
          <view class="fs24">排名：{{row.rownum === "null" || !row.rownum ? row.num_tmp : row.rownum}}</view>
        </view>
        <view :key="index3 + 'b'" class="flex justify-between align-center mt14 px24 mb30">
          <view class="flex flex-column justify-between">
            <view class="text-color-gray2 fs24">{{ row.ranks_org_name }}</view>
          </view>
          <view class="view-tag-blue">分数：{{ row.rank_score }}</view>
        </view>
      </template>

      <view class="px24">
        <divider height="1px" />
      </view>
      <view class="flex pb40">
        <view v-for="(row, index2) in row.rank_users" :key="index2" class="flex-1 inline-flex flex-column align-center mt25">
          <al-image width="65rpx" height="65rpx" round="50%" :src="row.avatar"/>
          <view class="fs22">{{ row.user_name }}</view>
        </view>
      </view>
    </view>
  </view-container>
</template>

<script>
import { getScore } from '@/api';
export default {
  name: "score",
  data() {
    return {
      list: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$refs.container.getAuth(() => {
      getScore().then(res => {
        this.list = res.list.map(item => {
          return {...item, score_info: Array.isArray(item.score_info) ? item.score_info : [item.score_info]};
        });
      });
    }, () => console.log('get token failure'));
  },
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