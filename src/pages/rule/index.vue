<template>
  <view-container back title="比赛规则">
    <view
        v-for="(item, index) in list"
        :key="index"
        class="sport-wrap"
        @click="viewDetail(item)"
    >
<!--      <view class="text-bold fs32 z1">{{ item.pro_name }}</view>-->
<!--      <view class="fs24 mt20 z1">点击查看比赛规则</view>-->
      <al-image class="image-bg z0" width="677rpx" height="222rpx" :src="item.pro_thumb"/>
    </view>
  </view-container>
</template>

<script>
import { rule } from '@/api';
export default {
  name: "index",
  data() {
    return {
      list: [
        {
          title: '陆地冰球射门',
          index: 1,
        },
        {
          title: '桌上冰壶投掷',
          index: 2,
        },
        {
          title: '大众轮滑接力赛',
          index: 3,
        },
        {
          title: '自由式轮滑（花式绕桩）',
          index: 4,
        },
        {
          title: '云上冰雪体验小程序',
          index: 5,
        },
      ],
    };
  },
  onLoad() {
    rule.list().then(res => {
      this.list = res;
    });
  },
  methods: {
    handlerSport(item) {

    },
    viewDetail(sport) {
      this.$Router.push({ path: '/pages/rule/detail', query: { id: sport.id } });
    },
  },
}
</script>

<style scoped>

</style>
