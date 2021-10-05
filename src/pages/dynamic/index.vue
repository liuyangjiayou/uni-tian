<template>
  <view-container back title="赛事动态">
    <view v-for="(item, index) in list" :key="index" class="flex mb60">
      <view class="flex-1 mr20 flex flex-column justify-between">
        <view class="fs34" @click="$Router.push({name: 'dynamic-detail'})">{{item.title}}</view>
        <view class="fs26 text-color-gray">{{item.time}}</view>
      </view>
      <view v-if="item.src" class="relative fs0">
        <al-image round="10rpx" width="245rpx" height="180rpx" :src="item.src" />
        <view v-if="item.isLive" class="image-txt" :style="{ borderRadius: `10rpx 0 28rpx 0` }">实时</view>
      </view>
    </view>
  </view-container>
</template>

<script>
import { random } from '@/utils';
export default {
  name: "list",
  data() {
    return {
      list: [],
      loadTxt: '',
      contentH: 800,
    };
  },
  // 触底触发
  onReachBottom() {
    this.getList();
  },
  // 下拉刷新
  onPullDownRefresh(){
    setTimeout(()=>{
      this.getList();
    },800);
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.list = this.list.concat([
        {
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },{
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },
        {
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },
        {
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },
        {
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },
        {
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },
        {
          title: '河北健儿闪耀陕西 第十四届全运会燕赵荣' + random(15, 60),
          src: `/static/test/img/${random(0,3)}.jpg`,
          time: random(15, 60) + '分钟前',
          isLive: true,
        },

      ]);
    },
  },
}
</script>

<style scoped>
.image-txt {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fa7615;
  color: white;
  padding: 6rpx 14rpx 6rpx 9rpx;
  font-size: 20rpx;
}
</style>