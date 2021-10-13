<template>
  <view-container ref="container" src-height="337rpx" :banner="banner" :back="true" :title="query.title">
    <!-- 项目分类   -->
    <view
        v-for="(item, index) in list"
        class="sport-item"
        @click="handlerSport(item)"
        :key="index"
    >
      <view class="z1">{{ item.s_name }}</view>
      <al-image class="absolute z0" width="690rpx" height="228rpx" :src="item.s_thumb"/>
    </view>
  </view-container>
</template>

<script>
import { game } from '@/api';
import ShareMixin from "@/mixins/share";
export default {
  name: "list",
  mixins: [ShareMixin],
  data() {
    return {
      query: {},
      list: [],
      banner: [],
    }
  },
  onLoad() {
    this.query = this.$Route.query;
    game.list().then(res => {
      this.list = res.list;
      this.banner = res.banner;
    });
  },
  methods: {
    handlerSport(item) {
      if (item.is_open === 1) {
        uni.showToast({title: `该游戏暂未开放！`, icon: 'none', duration: 3000, mask: true});
        return;
      }
      this.$Router.push({ path: '/pages/game/detail', query: {id:item.id} });
    },
  },

}
</script>

<style scoped>

</style>
