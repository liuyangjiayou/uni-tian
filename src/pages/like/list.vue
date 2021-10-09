<template>
  <view-container src-height="259rpx" :src="info.pro_thumb" back :title="info.pro_name"  custom-class="pt0">
    <template #header>
      <view :style="[{height: '104rpx'}]">
        <view class="bg-gray flex justify-center align-center px40 " :style="[searchStyle]">
          <!-- 自定义Placeholder -->
          <uni-search-bar ref="search" :radius="100" v-model="searchValue" placeholder="输入关键词" @confirm="search"  @cancel="cancel" class="w-full fs26" />
        </view>
      </view>
    </template>
    <view class="flex justify-between align-center py18 bb1-1 fs30 text-bold mb20">
      <view :class="['flex-1 height40 lh40 text-center', form.sort === 0 ? 'active-tab' : '']" @click="setTab(0)">作品展示</view>
      <view :class="['flex-1 height40 lh40 text-center', form.sort === 1 ? 'active-tab' : '']" @click="setTab(1)" class="bl1-1">人气排行</view>
    </view>
    <view-list ref="list" :fetch="fetch" :params="params" @play="play" />
  </view-container>
</template>

<script>
import { like } from '@/api';
const createForm = function () {
  return {
    sort: 0,
    type: 1,
    data: '',
  }
}
let $vm ;
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
      params: {},
      barH: 0,
      searchStyle: {},
    };
  },
  onPageScroll({scrollTop}) {
  // todo 动画有延迟
    if (scrollTop >= this.customBar) {
      this.searchStyle = {
        position: 'fixed',
        left: 0,
        right: 0,
        zIndex: 10,
        top: this.barH + 'px'};
    } else {
      this.searchStyle = {};
    }
  },
  onLoad() {
    this.barH = this.customBar;
    this.query = this.$Route.query;
    this.params = {id: this.query.sport, ...this.form};
    $vm = this;
  },
  // 触底触发
  // 触底触发
  onReachBottom() {
    this.refresh();
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.refresh();
  },
  methods: {
    cancel() {
      this.form.data = '';
      this.refreshPage();
    },
    refresh() {
      this.$nextTick(() => {
        this.$refs.list.refresh();
      });
    },
    refreshPage() {
      this.$set(this, 'params', { ...this.params, ...this.form });
      this.$nextTick(() => {
        this.$refs.list.refreshPage();
      });
    },
    search() {
      console.log('searchValue', this.searchValue);
      this.form.data = this.searchValue;
      this.refreshPage();
    },
    setTab(val) {
      this.form = createForm()
      this.form.data = this.searchValue;
      this.form.sort = val;
      this.refreshPage();
    },
    // type有为需要concat链接
    fetch(params) {
      return like.small(params).then(res => {
        $vm.info = res;
        return Promise.resolve({list: res.pro_list.list || res.pro_list});
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
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
