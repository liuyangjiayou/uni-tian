<template>
  <view-container src-height="259rpx" :src="`/static/images/sport/sport12img.png`" back title="广播体操"  custom-class="pt0">
    <template #header>
      <view class="bg-gray flex justify-center align-center px40">
        <!-- 自定义Placeholder -->
        <uni-search-bar :radius="100" v-model="searchValue" placeholder="输入关键词" @confirm="search" class="w-full fs26" />
      </view>
    </template>
    <view class="flex justify-between align-center py18 bb1-1 fs30 text-bold">
      <view :class="['flex-1 height40 lh40 text-center', tab === 1 ? 'active-tab' : '']" @click="setTab(1)">作品展示</view>
      <view :class="['flex-1 height40 lh40 text-center', tab === 2 ? 'active-tab' : '']" @click="setTab(2)" class="bl1-1">人气排行</view>
    </view>
    <view-list :list="list" @play="play"/>
  </view-container>
</template>

<script>
export default {
name: "list",
  data() {
    return {
      searchValue: '',
      tab: 1,
      list: [],
      query: {
        sport: '',
      },
    };
  },
  onLoad() {
    this.query = this.$Route.query;
    console.log('this.$Route.query', this.$Route.query);
  },
  // 触底触发
  onReachBottom() {
    this.getList();
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getList();
  },
  created() {
    console.log('this.query', this.query);
    this.getList();
  },
  methods: {
    search() {
      console.log('searchValue', this.searchValue);
      this.getList();
    },
    setTab(val) {
      this.tab = val;
      this.getList();
    },
    getList() {
      console.log(this.tab, this.searchValue);
      this.list = this.list.concat([
        {
          src: '/static/test/01.png',
          title: '太极拳专区2',
          desc: '队伍名收费2442的',
          count: 12655,
          number: '222233',
          city: '石家庄工会',
          id: 1,
        },
        {
          src: '/static/test/02.png',
          title: '太极拳专区3',
          desc: '队伍名收费收费的232',
          count: 12655,
          number: '222233',
          city: '石家庄工会',
          id: 2,
        },
        {
          src: '/static/test/01.png',
          title: '太极拳专22',
          desc: '队伍名收费收费的099',
          count: 12655,
          number: '222233',
          city: '石家庄工会',
          id: 3,
        },
      ]);
    },
    play(item) {
      console.log('播放', item.id);
      if (Number(item.id)) {
        this.$Router.push({path: '/pages/like/detail', query: {id: Number(item.id)}});
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.active-tab {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -10rpx;
    left: 50%;
    transform: translateX(-50%);
    height: 6rpx;
    width: 30rpx;
    border-radius: 2rpx;
    background-color: #1eb9f2;
  }
}
</style>