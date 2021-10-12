<template>
  <view-container back :title="info.pro_name" class="pt0">
    <template #header>
      <view class="fs0">
        <video
            id="myVideo"
            :src="info.province_video"
            enable-danmu
            danmu-btn
            controls
            style="width: 100%;"
        />
      </view>
    </template>
    <view class="fs32 text-bold mb20">{{ info.pro_name }}</view>
    <divider height="1rpx" />
    <view class="text-left pt20 mb20">
      <view class="view-title">决赛动态</view>
    </view>
    <u-parse :content="info.province_text" />
  </view-container>
</template>

<script>
import { province } from '@/api';
export default {
  name: "detail",
  data() {
    return {
      info: {},
    };
  },
  onLoad(){
    province({
      project_id: this.$Route.query.id,
    }).then(res => {
      this.info = res.info;
    })
  },
  methods: {  }
}
</script>

<style scoped>

</style>
