<template>
  <view-container ref="container" src-height="337rpx" :banner="banner" :back="true" :title="query.title">
    <!-- 项目分类   :style="[{height: 'calc(100vh - 337rpx - '+ barH +'px)'}]" -->
      <view
          v-for="(item, index) in list"
          :key="index"
          class="sport-item2 flex justify-center"
          @click.native="handlerSport(item)"
      >
        <view class="z1">{{ item.s_name }}</view>
        <al-image class="absolute z0" width="667rpx" height="255rpx" round="24rpx" :src="item.s_thumb" @click.native="handlerSport(item)"/>
      </view>
  </view-container>
</template>

<script>
import { game } from '@/api';
export default {
  name: "list",
  data() {
    return {
      query: {},
      list: [],
      banner: [],
      barH: 0,

    }
  },
  onLoad() {
    this.query = this.$Route.query;
    this.barH = this.customBar;
    game.list().then(res => {
      this.list = res.list;
      this.banner = res.banner;
    });
  },
  methods: {
    handlerSport(item) {
      console.log('item', item);
      if (item.is_open === 1) {
        uni.showModal({
          title: '提示',
          content: `该游戏暂未开放！`,
          showCancel: false
        });
        // uni.showToast({title: `该游戏暂未开放！`, icon: 'none', duration: 3000, mask: true});
        return;
      }
      this.$Router.push({ path: '/pages/game/detail', query: {id:item.id} });
    },
  },

}
</script>

<style scoped>

</style>
