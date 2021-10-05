<template>
  <view-container src-height="259rpx" :src="info.pro_thumb" back :title="info.pro_name"  custom-class="pt0">
    <template #header>
      <view class="bg-gray flex justify-center align-center px40">
        <!-- 自定义Placeholder -->
        <uni-search-bar :radius="100" v-model="searchValue" placeholder="输入关键词" @confirm="search" class="w-full fs26" />
      </view>
    </template>
    <view class="flex justify-between align-center py18 bb1-1 fs30 text-bold">
      <view :class="['flex-1 height40 lh40 text-center', form.sort === 0 ? 'active-tab' : '']" @click="setTab(0)">作品展示</view>
      <view :class="['flex-1 height40 lh40 text-center', form.sort === 1 ? 'active-tab' : '']" @click="setTab(1)" class="bl1-1">人气排行</view>
    </view>
    <view-list :list="list" @play="play"/>
  </view-container>
</template>

<script>
import { like } from '@/api';
const createForm = function () {
  return {
    sort: 0,
    limit: 20,
    page: 1,
    type: 1,
    data: '',
  }
}
export default {
name: "list",
  data() {
    return {
      searchValue: '',
      list: [],
      info: {},
      form: createForm(),
      query: {
        sport: '',
      },
    };
  },
  onLoad() {
    this.query = this.$Route.query;
    this.getList();
  },
  // 触底触发
  onReachBottom() {
    this.getList(true);
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getList();
  },
  methods: {
    search() {
      console.log('searchValue', this.searchValue);
      this.form.data = this.searchValue;
      this.form.page = 1;
      this.getList();
    },
    setTab(val) {
      this.form = createForm()
      this.form.data = this.searchValue;
      this.form.sort = val;
      this.form.page = 1;
      this.getList();
    },
    // type有为需要concat链接
    getList(type) {
      if (type) {
        this.form.page++
      }
      like.small({
        id: this.query.sport,
        ...this.form
      }).then(res => {
        this.list = type ? this.list.concat(res.pro_list.list) : res.pro_list.list
        this.info = res;
      })
    },
    play(item) {
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
