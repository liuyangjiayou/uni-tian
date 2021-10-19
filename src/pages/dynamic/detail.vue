<template>
  <view-container src="/static/images/bg1.png" back share title="新闻详情" customClass="dynamic-detail shadow2">
    <view class="fs34 my34">{{ details.title }}</view>
    <view class="mb40">
      <al-image width="24rpx" height="24rpx" src="/static/images/sc.png" @click.native="toProvin" />
      <text class="text-color-gray fs26 ml28">{{ details.publish_time }}</text>
    </view>
    <divider height="1rpx" />
    <view class="dynamic-detail-content">
      <u-parse :content="details.content" />
    </view>
  </view-container>
</template>

<script>
import { getDynamicDetail } from '@/api'
import Share from '@/mixins/share';
import uParse from "@/components/u-parse/u-parse.vue"
export default {
  name: "detail",
  components: { uParse },
  mixins: [Share],
  data(){
    return {
      details: {},
    }
  },
  onLoad(){
    getDynamicDetail({
      id: this.$Route.query.id
    }).then(res => {
      this.shareInfo = {
        title: res.info.title,
        imageUrl: '/static/images/bg1.png',
      };
      res.info.content = res.info.content.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
          .replace(/<p>/ig, '<p style="font-size: 15px; line-height: 25px;">')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img style="width: 100%;" $1');
      this.details = res.info;
      this.shareInfo.title = this.details.title;
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
