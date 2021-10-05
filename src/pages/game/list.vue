<template>
  <view-container src-height="337rpx" src="/static/images/bg7.png" :back="true" title="冰雪大挑战">
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
      list: [],
    }
  },
  onLoad() {
    console.log('game onLoad', this.customBar);
    game.list().then(res => {
      this.list = res;
    });
  },
  methods: {
    handlerSport(item) {
      this.$Router.push({ path: '/pages/game/detail', query: {id:item.id} });
    },
  },

}
</script>

<style scoped>

</style>