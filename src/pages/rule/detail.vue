{<template>
  <view-container back :title="info.pro_name">
    <view class="art-title fs34 text-bold">
      <span>{{info.pro_name}}</span>
    </view>
    <view class="dynamic-detail-content" v-html="info.pro_rule" />
  </view-container>
</template>

<script>
import { rule } from '@/api';
export default {
  name: "detail",
  data() {
    return {
      info: {},
    };
  },
  onLoad() {
    rule.detail({id: this.$Route.query.id}).then(res => {
      this.info = res;
    });
  },
}
</script>

<style lang="scss" scoped>
.art-title {
  padding: 8rpx 0 0;
  background: url("~@/static/images/bg2.png") center top no-repeat;
  background-size: 220rpx 24rpx;
  text-align: center;
  span {
    position: relative;
    padding: 0 35rpx;
  }
  span:before, span:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: inline-block;
    width: 22rpx;
    height: 22rpx;
    background-size: 100% 100%;
  }
  span:before {
    left: 0;
    background-image: url("~@/static/images/right.png");
  }
  span:after {
    right: 0;
    background-image: url("~@/static/images/left.png");
  }
}
</style>