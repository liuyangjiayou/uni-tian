{<template>
  <view-container back :title="info.pro_name">
    <view class="art-title fs40 text-bold">
      <text>{{info.pro_name}}</text>
    </view>
    <view v-if="info['gz_url']" class="fs0 mt10">
      <video
          id="myVideo"
          :src="info['gz_url']"
          controls
          style="width: 100%;"
      />
    </view>
    <rich-text :nodes="info.pro_rule"></rich-text>
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
      this.info.pro_rule = this.info.pro_rule
          .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
          .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
          .replace(/<p>/ig, '<p style="line-height: 1.5; text-indent: 20px" class="p_class">')
          .replace(/<span([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<span')
          .replace(/<span([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<span')
          .replace(/<span>/ig, '<span style="font-size: 14px">')
      console.log(this.info.pro_rule)
    })
  },
}
</script>

<style lang="scss" scoped>
.art-title {
  padding: 8rpx 0 0;
  background-size: 220rpx 24rpx;
  text-align: center;
  text {
    position: relative;
    padding: 0 35rpx;
  }
  text:before, text:after {
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
  text:before {
    left: 0;
    background-image: url("~@/static/images/right.png");
  }
  text:after {
    right: 0;
    background-image: url("~@/static/images/left.png");
  }
}
</style>
