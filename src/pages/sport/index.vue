<template>
  <view-container :src="info.pro_thumb" back :title="info.pro_name">
    <view class="flex justify-between align-center pb35">
      <view>
        <view class="view-title">{{ info.pro_name }}</view>
      </view>
      <view class="flex-none flex">
        <icon-button fs="fs24" src="/static/images/icon_sc.png" width="40rpx" height="40rpx" title="赛程" @handlerClick="click2" />
        <icon-button fs="fs24" src="/static/images/icon_ph.png" width="40rpx" height="40rpx" title="排行" class="ml50" @handlerClick="click" />
      </view>
    </view>
    <divider height="1rpx" />
    <view class="mt30">简介</view>
    <rich-text :nodes="info.pro_desc"></rich-text>
    <divider height="1rpx" />
    <template v-if="query.pro_type == 2">
      <view class="flex justify-start py30">
  <!--      <al-image width="335rpx" height="171rpx" src="/static/images/sheng.png" @click.native="toProvin" class="mr20" />-->
        <al-image width="335rpx" height="171rpx" src="/static/images/shi.png" @click.native="toCity" />
      </view>
      <divider height="1rpx" />
    </template>
    <view class="my30">赛事回放</view>
    <view class="mr-20">
      <view-list ref="list" :list="info.pro_list" @play="play" />
    </view>
  </view-container>
</template>

<script>
import { like } from '@/api';
export default {
name: "index",
  data() {
    return {
      query: {},
      info: {},
    };
  },
  onLoad() {
    this.query = this.$Route.query;
    like.small({
      id: this.$Route.query.id
    }).then(res => {
      this.info = res;
      this.info.pro_desc = this.info.pro_desc
          .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
          .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
          .replace(/<p>/ig, '<p style="line-height: 1.5; text-indent: 20px" class="p_class">')
          .replace(/<span([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<span')
          .replace(/<span([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<span')
          .replace(/<span>/ig, '<span style="font-size: 14px">')
    })
  },
  methods: {
    toProvin() {
      this.$Router.push({path: '/pages/sport/matchs2', query: {id: this.query.id, type: 2, title: '省级比赛'}});
    },
    toCity() {
      this.$Router.push({path: '/pages/sport/matchs2', query: {id: this.query.id, type: 1, title: '市级比赛'}});
    },
    click() {
      this.$Router.push({ path: '/pages/sport/rank', query: {id:this.query.id, type:1} });
    },
    click2() {
      this.$Router.push({ path: '/pages/process/index', query: {pid:this.query.id} });
    },
    play(item){
      if (Number(item.id)) {
        this.$Router.push({path: '/pages/like/detail', query: {id: Number(item.id)}});
      }
    }
  },
}
</script>

<style scoped>
.item-image{
  display: inline-block;
  margin-right: 14rpx;
  margin-bottom: 15rpx;
}
</style>
