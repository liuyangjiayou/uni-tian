<template>
  <view-container :head="false">
    <view
        v-for="(item, index) in list"
        :key="index"
        class="sport-wrap"
        :style="{backgroundImage: `url(${require('@/static/images/sport/'+item.index+'.png')})`}"
        @click="viewDetail(item)"
    >
        <view class="text-bold fs32">{{ item.title }}</view>
        <view class="fs24 mt20">点击查看比赛规则</view>
        <al-image class="sport-icon" width="62rpx" height="59rpx" :src="require('@/static/images/sport/'+item.index+'_icon.png')" />
    </view>
  </view-container>
</template>

<script>
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
  methods: {
    viewDetail(sport) {
      this.$Router.push({ name: 'rule-detail' });
    },
  },
}
</script>

<style scoped>

</style>