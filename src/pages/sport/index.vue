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
    <template v-if="query.pro_type == 2 || query.pro_type == 1">
      <view class="flex justify-start py30">
        <al-image v-if="info.province_video" width="335rpx" height="171rpx" src="/static/images/sheng.png" @click.native="toProvin" class="mr20" />
        <al-image width="335rpx" height="171rpx" src="/static/images/shi.png" @click.native="toCity" />
      </view>
      <divider height="1rpx" />
    </template>
    <view class="my30">赛事回放</view>
    <view>
      <view-list v-if="info.pro_list.length" ref="list" :list="info.pro_list" @play="play" />
      <view v-else class="fs26 py20 text-center text-color-gray">暂无参加队伍</view>
    </view>
<!--    <view v-if="show" class="video-wrap" :style="{top: barH + 'px'}" @click="() => {show = false}">
      <video id="myVideo" :src="src" enable-danmu danmu-btn controls @click.stop />
    </view>-->

  </view-container>
</template>

<script>
import { like } from '@/api';
export default {
name: "index",
  data() {
    return {
      show: false,
      query: {},
      info: {},
      barH: 0,
      src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
    };
  },
  onLoad() {
    this.barH = this.customBar;
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
      this.$Router.push({path: '/pages/like/provin', query: {id: this.query.id}});
    },
    toCity() {
      this.$Router.push({path: '/pages/sport/matchs2', query: {id: this.query.id, type: 1, title: '市级比赛'}});
    },
    click() {
      this.$Router.push({ path: '/pages/sport/rank', query: {id:this.query.id, type:this.query.pro_type} });
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
.video-wrap {
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
