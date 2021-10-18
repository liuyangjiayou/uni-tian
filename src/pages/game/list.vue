<template>
  <view-container ref="container" src-height="337rpx" :banner="banner" :back="true" custom-class="py0" :title="query.title">
    <!-- 项目分类   -->
    <view class="flex flex-column" :style="[{height: 'calc(100vh - 337rpx - '+ barH +'px)'}]">
      <view class="flex-1" />
      <template v-for="(item, index) in list">
        <view
            :key="index + 'a'"
            class="sport-item2 flex justify-center align-center flex-none"
            @click="handlerSport(item)"
            :key="index"
        >
          <view class="z1">{{ item.s_name }}</view>
          <al-image class="absolute z0" width="609rpx" height="240rpx" :src="item.s_thumb"/>
        </view>
        <view :key="index + 'b'" class="flex-1" />
      </template>
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
