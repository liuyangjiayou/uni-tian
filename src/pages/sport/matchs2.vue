<template>
  <view-container back :title="query.title" custom-class="pt0">
    <view class="flex align-center bg-white pt20">
      <uni-search-bar :radius="100" v-model="form.search" placeholder="输入关键词" @confirm="refreshPage" @cancel="cancel" class="flex-1 fs26" />
      <view class="fs28" @click.native="open">筛选</view>
    </view>
    <uni-popup ref="popup" type="right">
      <scroll-view :scroll-y="true" scroll-with-animation="true" :scroll-into-view="viewId" class="scroll-Y" :style="[{paddingTop: barH + 'px'}]" @scroll="scroll">
<!--      <scroll-view :scroll-top="scrollTop"   :scroll-y="true" class="scroll-Y" :style="[{paddingTop: barH + 'px'}]" @scroll="scroll">-->
        <view class="flex justify-end pop-close" :style="[{top: barH + 'px'}]">
          <al-image width="24rpx" height="24rpx" src="/static/images/close.png" class="ml20 mt10" @click.native="close" />
        </view>
        <template v-for="(row, index) in tree">
          <view :key="index + 'a'"
                :class="['city-title', form.orgId === row.id ? 'text-color-blue' : '', index===0?'pt35':0]"
                :id="'view' + row.id"
                @click.native="() => setValue(row.id)">
            <span class="mr20">—</span>{{row.title}}<span class="ml20">—</span></view>
          <view :key="index + 'b'" class="city-list">
            <text v-for="(item, index2) in row.childs"
                  :id="'view' + item.id"
                  :key="index2"
                  :class="['city-item fs28', form.orgId === item.id ? 'active' : '']"
                  @click.native="() => setValue(item.id)">{{item.title}}</text>
          </view>
          <divider :key="index + 'c'" height="1rpx" />
        </template>
      </scroll-view>
    </uni-popup>
    <view-list ref="list" :fetch="fetch" :params="params" :vote="false" @play="play"  />
  </view-container>
</template>

<script>
import { match } from '@/api';
export default {
  name: "SportMatches",
  data() {
    return {
      query: {},
      params: {},
      page: 0, // 请求参数
      scrollTop: 0,
      form: {
        search: '',
        orgId: 0,
      },
      tree: [],
      barH: 0,
      viewid: '',
    };
  },
  onLoad() {
    this.barH = this.customBar;
    uni.setNavigationBarTitle({
      title:"市级比赛"
    })
    console.log('onLoad match2');
    this.query = this.$Route.query;
    this.params = {...this.query};
    match.tree().then(res => {
      this.tree = res;
    });
  },
  // 触底触发
  onReachBottom() {
    this.refresh();
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.refresh();
  },
  methods: {
    open(){
      this.$nextTick(() => {
        this.viewId = 'view' + this.form.orgId;
        this.scrollTop = this.scrollTop2;
      });
      this.form.orgId = '';
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close()
    },

    cancel() {
      this.$set(this.form, 'search', '');
      this.refreshPage();
    },
    setValue(id) {
      this.$set(this.form, 'orgId', this.form.orgId === id ? '' : id);
      this.$refs.popup.close();
      console.log(this.form.orgId);
      this.refreshPage();
    },
    refresh() {
      this.$nextTick(() => {
        this.$refs.list.refresh();
      });
    },
    refreshPage() {
      this.params = { ...this.params, ...this.form };
      console.log('before $nextTick');
      this.$nextTick(() => {
        this.$refs.list.refreshPage();
      });
    },
    // 获取数据
    fetch(params) {
      console.log({...params});
      return match.list(params);
    },
    play(item) {
      if (Number(item.id)) {
        this.$Router.push({path: '/pages/like/detail', query: {id: Number(item.id)}});
      }
    },
    scroll (e) {
      //记录scroll  位置
      this.scrollTop2 = e.detail.scrollTop

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
  &.active {
    color: #2a8cd0;
  }
}
.city-list {
  margin-right: -20rpx;
  .city-item {
    display: inline-block;
    min-width: 145rpx;
    height: 46rpx;
    line-height: 46rpx;
    text-align: center;
    background-color: #f6f6f6;
    border-radius: 26rpx;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    padding: 2rpx 20rpx;
    &.active {
      background-color: #22b7ef;
      color: white;
    }
  }
}


.pop-close{

  position: fixed;
  height: 65rpx;
  right: 47rpx;
  left: 0;
  background: #fff;
}
</style>
