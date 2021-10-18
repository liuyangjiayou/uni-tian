<template>
  <view-container back :title="info.pro_name" class="pt0">
    <template #header>
      <view class="fs0">
        <video
            id="myVideo"
            :src="info.province_video"
            controls
            style="width: 100%;"
        />
      </view>
    </template>
    <view class="fs32 text-bold mb20">{{ info.pro_name }}</view>
    <divider height="1rpx" />
    <view-list ref="list" :fetch="fetch" :params="params" @play="play" :is-up="true" />

<!--    <view class="text-left pt20 mb20">
      <view class="view-title">决赛动态</view>
    </view>
    <u-parse :content="info.province_text" />-->
  </view-container>
</template>

<script>
import {province, province_list} from '@/api';
export default {
  name: "detail",
  data() {
    return {
      info: {},
      params: {},
    };
  },
  onLoad(){
    this.params = {id: this.$Route.query.id};
    province({
      project_id: this.$Route.query.id,
    }).then(res => {
      this.info = res.info;
    })
  },
  methods: {
    fetch(params) {
      return province_list(params);
    },
    play(item) {
      if (Number(item.id)) {
        this.$Router.push({path: '/pages/like/detail', query: {id: Number(item.id), is_up: 1}});
      }
    },
  }
}
</script>

<style scoped>

</style>
