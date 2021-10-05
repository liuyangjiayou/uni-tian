<template>
  <view-container src="/static/images/bg1.png" back share title="新闻详情" customClass="dynamic-detail shadow2">
    <view class="fs34 my34">{{ details.title }}</view>
    <view class="mb40">
      <al-image width="24rpx" height="24rpx" src="/static/images/sc.png" @click.native="toProvin" />
      <span class="text-color-gray fs26 ml28">{{ details.publish_time }}</span>
    </view>
    <divider height="1rpx" />
    <view class="dynamic-detail-content">
      <rich-text :nodes="details.content"></rich-text>
    </view>
  </view-container>
</template>

<script>
import { getDynamicDetail } from '@/api'
export default {
  name: "detail",
  data(){
    return {
      details: {}
    }
  },
  onLoad(){
    getDynamicDetail({
      id: this.$Route.query.id
    }).then(res => {
      res.info.content = res.info.content.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
          .replace(/<p>/ig, '<p style="font-size: 15px; line-height: 25px;">')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img style="width: 100%;" $1');
      this.details = res.info;
    })
  },
}
</script>

<style lang="scss" scoped>
.dynamic-detail-content{
  .rich-img{
    display: block;
    width: 100% !important;
    height: auto;
  }
}
</style>
