<template>
  <view-container src-height="274rpx" :banner="banner" back title="点赞投票">
    <view
        v-for="(item, index) in list"
        class="sport-item"
        @click="click(item)"
        :key="index"
    >
      <view class="z1">{{ item.pro_name }}</view>
      <al-image class="absolute z0" width="690rpx" height="228rpx" :src="item.pro_thumb"/>
    </view>
  </view-container>
</template>

<script>
import { like } from '@/api';
export default {
  name: "index",
  data() {
    return {
      list: [],
      banner: [],
    };
  },
  onLoad() {
    like.sport().then(res => {
      console.log(res);
      this.list = res.list;
      this.banner = res.banner;
    });
  },
  methods: {
    click(item) {
      this.$Router.push({path: '/pages/like/list', query: { sport: item.id }});
    },
  },
}
</script>

<style scoped>

</style>
