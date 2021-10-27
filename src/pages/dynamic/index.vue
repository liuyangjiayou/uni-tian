<template>
  <view-container back title="赛事动态">
    <view v-for="(item, index) in list" :key="index" class="flex mb60" @click="handlerView(item)">
      <view class="flex-1 mr20 flex flex-column justify-between">
        <view class="fs34">{{item.title}}</view>
        <view class="fs26 text-color-gray">{{item.publish_time}}</view>
      </view>
      <view v-if="item.cover_url" class="relative fs0">
        <al-image round="10rpx" width="245rpx" height="180rpx" :src="item.cover_url" />
        <view v-if="item.isLive" class="image-txt" :style="{ borderRadius: `10rpx 0 28rpx 0` }">实时</view>
      </view>
    </view>
  </view-container>
</template>

<script>
import { getDynamic } from '@/api';
export default {
  name: "list",
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 20,
      loadTxt: '',
      contentH: 800,
    };
  },
  // 触底触发
  onReachBottom() {
    this.page++
    this.getList({
      page: this.page,
      pagesize: 10,
    });
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getList();
  },
  created() {
    this.getList({
      page: 1,
      pagesize: 10,
    });
  },
  methods: {
    handlerView(item) {
      if (item.news_url) {
        this.$Router.push({ path: '/pages/index/webview', query: {url: item.news_url } });
      }else{
        $Router.push({path: '/pages/dynamic/detail', query: { id: item.id } })
      }
    },
    getList(data) {
      getDynamic(data).then(res => {
        this.list = this.list.concat(res.list)
      })
    },
  },
}
</script>

<style scoped>
.image-txt {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fa7615;
  color: white;
  padding: 6rpx 14rpx 6rpx 9rpx;
  font-size: 20rpx;
}
</style>
