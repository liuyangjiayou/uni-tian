<template>
  <view-container ref="container" back title="成绩查询" class="">
    <view v-for="(row, index) in list" :key="index" >
      <view class="score-wrap mt28 shadow3">
        <view class="view-title my30">{{ row.project.pro_name }}</view>
        <template>
          <template>
            <view class=" px24">
              <view class="fs26">
                <al-image class="mr10" width="22rpx" height="22rpx" src="/static/images/score.png"/>
                工会: {{ row.rank_info.ranks_org_name }}
              </view>
              <view class="fs26">
                <al-image class="mr10" width="22rpx" height="22rpx" src="/static/images/score.png"/>
                队名: {{ row.rank_info.ranks_name }}
              </view>
              <view class="fs26">
                <al-image class="mr10" width="22rpx" height="22rpx" src="/static/images/score.png"/>
                队员:
              </view>
            </view>
          </template>
        </template>
        <view class="flex pb40">
          <view v-for="(row2, index2) in row.rank_users" :key="index2" class="flex-1 inline-flex flex-column align-center mt25">
            <al-image width="65rpx" height="65rpx" round="50%" :src="row2.avatar"/>
            <view class="fs22">{{ row2.user_name }}</view>
          </view>
        </view>
      </view>
      <view class="score-wrap mt28 shadow3">
        <view class="view-title my30">
          <al-image class="mr10" width="22rpx" height="22rpx" src="/static/images/score.png"/>
          成绩
        </view>
        <template>
          <template>
            <view class="pl24 pr24 pb35">
              <view v-for="chengji in row.score_info.chengji" class="fs26 inline-block mr60">
                {{ chengji }}
              </view>
            </view>
          </template>
        </template>
      </view>
      <view class="score-wrap mt28 shadow3">
        <view class="view-title my30">
          <al-image class="mr10" width="22rpx" height="22rpx" src="/static/images/score.png"/>
          排名
        </view>
        <template>
          <template>
            <view class="pl24 pr24 pb35">
              <view v-for="miongci in row.score_info.miongci" class="fs26 inline-block mr60">
                {{ miongci }}
              </view>
            </view>
          </template>
        </template>
      </view>
      <view v-if="index !== list.length - 1" class="mt30">
        <al-image width="700rpx" height="70rpx" src="/static/icon/run.png" />
      </view>
    </view>
    <view class="flex align-center justify-center">
      <view class="view-tag-blue flex justify-center">查看视频</view>
    </view>
  </view-container>
</template>

<script>
import { getScore, getTeamScore } from '@/api';
export default {
  name: "score",
  data() {
    return {
      list: [],
      user: {},
    };
  },
  // computed: {
  //   user() {
  //     return this.$store.getters.user;
  //   },
  // },
  mounted() {
    getTeamScore().then(res => {
      this.list = res.list;
    })
    // this.$refs.container.getAuth(() => {
    //   getScore().then(res => {
    //     this.list = res.list.map(item => {
    //       let score_info = item.score_info;
    //       if (item.project.pro_type === 3 || item.project.pro_type === 4) {
    //         score_info = Array.isArray(item.score_info) ? item.score_info : [item.score_info];
    //       }
    //       return {...item, score_info };
    //     });
    //     this.user = res.user;
    //   });
    // }, () => console.log('get token failure'));
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
.view-tag-blue{
  margin: 40rpx 0 70rpx;
  width: 380rpx;
  height: 56rpx;
  border-radius: 20rpx;
}
</style>
