<template>
  <view>
    <view-container ref="container" src-height="274rpx" :src="info.s_thumb" share back :title="info.s_name">
      <view class="flex align-center mt10">
        <al-image width="40rpx" height="31rpx" :src="require('@/static/images/game.png')" />
        <text class="ml25 fs32 text-bold">游戏介绍</text>
      </view>
      <view :class="['game-info mt20 fs30', show?'':'game-info-es']" v-html="info.s_desc" />

      <view class="more-info flex align-center flex-column mt10" @click="moreFn">
        <view>{{show?'收起':'查看更多'}}</view>
        <al-image width="18rpx" height="19rpx" :src="require('@/static/images/more'+(show?'':'1')+'.png')" />
      </view>
      <view class="flex justify-center mt20">
        <al-image width="267rpx" height="98rpx" :src="require('@/static/images/bisai.png')" @click.native="goMatch(1)" />
        <al-image width="267rpx" height="98rpx" :src="require('@/static/images/lianxi.png')" class="ml60" @click.native="goMatch(2)" />
      </view>
    </view-container>
    <divider height="10rpx" />
    <view-container :head="false" :back="false">
      <view class="flex justify-between mt10 mb20">
        <view class="flex align-center">
          <al-image width="30rpx" height="38rpx" :src="require('@/static/images/paihang.png')" />
          <text class="ml25 fs32 text-bold">排行榜</text>
        </view>
        <view class="flex align-center" @click="click">
          <text class="fs24 mr10" style="color: #999">查看更多</text>
          <al-image width="13rpx" height="24rpx" :src="require('@/static/images/more2.png')" />
        </view>
      </view>
      <divider height="1rpx" />
      <view class="mb30">
        <view class="flex fs24 mt50 pb8" style="color: #b1b1b1;">
          <view class="flex-1">排名</view>
          <view class="flex-3">队伍名</view>
          <view class="flex-2">单位名</view>
          <view class="flex-1">分数</view>
        </view>
        <view v-for="(item, index) in info.ranks_ranking" :key="index" class="flex py12 align-center">
          <view :class="['flex-1 text-cut fs0' ]">
            <i :class="'team-index fs24' + ' team-'+ (item.rownum)">{{item.rownum}}</i>
          </view>
          <view class="flex-3 text-cut fs24">{{item.ranks_name}}</view>
          <view class="flex-2 text-cut fs24">{{item.ranks_org_name}}</view>
          <view class="flex-1 text-cut fs24">{{item.rank_score}}</view>
        </view>
      </view>
<!--      <view class="flex flex-wrap pt20 pb30">

        <view v-for="(item, index) in info.ranks_ranking" :key="index" class="flex flex-column align-center mt20" style="width: 33%">
          <view class="team-pic relative">
            <al-image width="100rpx" height="100rpx" :src="require('@/static/images/team-pic.png')" />
            <al-image width="46rpx" height="46rpx" :src="require('@/static/images/0'+ (item.rownum) +'.png')" class="pic-icon" />
          </view>
          <view class="fs30 mt10">{{item.ranks_name}}</view>
        </view>
      </view>-->
      <template v-if="info.my_rank && info.my_rank.length">
        <view class="flex justify-between mt10 mb20">
          <view class="flex align-center">
            <al-image width="35rpx" height="34rpx" :src="require('@/static/images/zudui.png')" />
            <text class="ml25 fs32 text-bold">组队信息</text>
          </view>
          <view class="flex align-center fs24">
            总分数：<text class="fs30 text-bold mr6" style="color: #fa8f06">{{info.rank_f_score}}</text>分
          </view>
        </view>
        <divider height="1rpx" />
        <view v-for="(item, index) in info.my_rank" :key="index" class="flex align-center mt35">
          <al-image v-if="item.avatar" width="150rpx" height="150rpx" :src="item.avatar" />
          <view class="flex fs30 flex-1 ml30 flex-column">
            <text>名称：{{item.user_name}}</text>
            <text class="mt10">成绩：<text class="text-bold" style="color: #fa8f06">{{item.max_score}}</text></text>
          </view>
        </view>
      </template>
    </view-container>
  </view>
</template>

<script>
import { game } from '@/api';
import ShareMixin from "@/mixins/share";
export default {
  name: "list",
  mixins: [ShareMixin],
  data() {
    return {
      show: false,
      query: {},
      info: {},
      token: this.$store.getters.token,
      showRank: false,
    };
  },
  onLoad() {
    this.query = this.$Route.query;
  },
  onShow(){
    game.detail({id: this.query.id}).then(res => {
      this.shareInfo = {
        title: res.s_name,
        imageUrl: res.s_thumb,
      };
      this.info = res;
    });
  },
  methods: {
    moreFn() {
      this.show = !this.show;
    },
    click() {
      this.$Router.push({ path: '/pages/sport/rank', query: {id:this.query.id, type:4} });
    },
    goMatch(val) {
      const url = val === 1 ? this.info.s_url : this.info.s_lx_url;
      if (val === 1) {
        // 比赛模式
        this.$refs.container.getAuth(({token}) => {
          game.start({game_id: this.query.id}).then(res => {
            this.$Router.push({ path: '/pages/index/webview', query: {url: url + '?token=' + token } });
          });
        }, () => console.log('get token failure'));
      } else {
        // 练习模式
        this.$Router.push({ path: '/pages/index/webview', query: {url: url } });
      }

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
