<template>
  <view-container :head="false" custom-class="pt0">
    <view class="flex align-center bg-white pt20">
      <uni-search-bar :radius="100" v-model="value" placeholder="输入关键词" @confirm="getData(1)" class="flex-1 fs26" />
      <view class="fs28" @click.native="open">筛选</view>
    </view>
    <uni-popup ref="popup" type="right">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
        <view class="flex justify-end">
          <al-image width="24rpx" height="24rpx" src="/static/images/close.png" class="ml20" @click.native="close" />
        </view>
        <view class="city-title"><span class="mr20">—</span>石家庄市<span class="ml20">—</span></view>
        <view class="city-list">
          <span :class="['city-item', value2 === '桥西去' ? 'active' : '']" @click.native="setValue2('桥西去')">桥西去</span>
          <span :class="['city-item', value2 === '桥西去' ? 'active' : '']" @click.native="setValue2('新华区')">新华区</span>
          <span class="city-item" @click.native="setValue2('石家庄市')">桥西去</span>
          <span class="city-item" @click.native="setValue2('石家庄市')">新华区</span>
          <span class="city-item" @click.native="setValue2('石家庄市')">桥西去</span>
        </view>
        <divider height="1rpx" />
        <view class="city-title"><span class="mr20">—</span>石家庄市<span class="ml20">—</span></view>
        <view class="city-list">
          <span class="city-item">桥西去</span>
          <span class="city-item">新华区</span>
          <span class="city-item">桥西去</span>
          <span class="city-item">新华区</span>
          <span class="city-item">桥西去</span>
        </view>
        <divider height="1rpx" />
      </scroll-view>
    </uni-popup>
    <view-list :list="list" @play="play"/>
  </view-container>
</template>

<script>
export default {
  name: "SportMatches",
  data() {
    return {
      page: 0, // 请求参数
      imgArr: [],
      scrollTop: 0,
      value: '', // 搜索关键词
      value2: '', // 筛选的值
      list: [],
    };
  },
  onReady() {
    this.getList();
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
    this.getList();
  },
  methods: {
    open(){
      console.log('open');
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close()
    },
    setValue2(title) {
      this.value2 = this.value2 ? '' : title;
      this.$refs.popup.close();
      this.getList(1);
    },
    getList(page) {
      if (!isNaN(page)) this.page = Number(page);
      console.log('getData', 'this.value', this.value, 'this.value2', this.value2, 'this.page', this.page);
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
  }
}
</script>

<style lang="scss" scoped>
.scroll-Y {
  height: 100vh;
  width: 535rpx;
  background: white;
  padding: 0 30rpx;
  box-sizing: border-box;
}
.city-title {
  height: 50rpx;
  line-height: 50rpx;
  font-size: 32rpx;
  font-weight: bold;
  margin: 20rpx 0;
  span {
    color: #c3c3c3;
  }
}
.city-list {
  margin-right: -20rpx;
  .city-item {
    display: inline-block;
    width: 145rpx;
    height: 46rpx;
    line-height: 46rpx;
    text-align: center;
    background-color: #f6f6f6;
    border-radius: 30rpx;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    &.active {
      background-color: #22b7ef;
      color: white;
    }
  }
}

::v-deep .uni-searchbar {
  padding: 0 !important;
  margin-right: 20rpx;
}
</style>