<template>
  <view-container back title="视频详情" class="pt0">
    <template #header>
      <view class="fs0">
        <video
            id="myVideo"
            :src="info.ranks_video_thumb"
            enable-danmu
            danmu-btn
            controls
            style="width: 100%;"
        />
      </view>
    </template>
    <view class="flex pt40 mb28">
      <view class="flex-1">
        <view class="fs32 text-bold">{{ info.ranks_video_name }}</view>
        <view class="mt30 flex align-center fs0">
          <al-image width="100rpx" height="33rpx" src="/static/images/team.png" />
          <span class="text-underline fs24 ml16">{{ info.ranks_name }}</span>
        </view>
        <view class="mt10 flex align-center fs0">
          <al-image width="100rpx" height="33rpx" src="/static/images/company.png" />
          <span class="text-underline fs24 ml16">{{ info.ranks_org_name }}</span>
        </view>
      </view>
      <view class="b1-1 flex flex-column">
        <view class="flex-1 flex justify-center align-center px20">
          <al-image width="27rpx" height="31rpx" src="/static/images/count.png" />
          <view class="flex flex-1 flex-column ml22 align-center">
            <span class="text-color-red fs24 text-bold">{{ info.give_up_num }}</span>
            <span class="fs20">当前票数</span>
          </view>
        </view>
        <divider height="1rpx" />
        <view class="flex-1 flex justify-center align-center px20">
          <al-image width="23rpx" height="25rpx" src="/static/images/number.png" />
          <view class="flex flex-1 flex-column ml22 align-center">
            <span class="text-color-yellow fs24 text-bold">{{ info.id }}</span>
            <span class="fs20">编号</span>
          </view>
        </view>
      </view>
    </view>
    <divider height="1rpx" />
    <view class="text-center pt30">
      <view class="view-title">为您推荐</view>
    </view>
    <view-list ref="list" :list="info.rec_list" @play="play" />
  </view-container>
</template>

<script>
import { like } from '@/api';
export default {
  name: "detail",
  data() {
    return {
      info: {
        rec_list: [],
      },
      list: [
        {
          src: '/static/test/01.png',
          title: '太极拳专22',
          desc: '队伍名收费收费的099',
          count: 12655,
          number: '222233',
          city: '石家庄工会',
          id: 3,
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
      ]
    };
  },
  onLoad(){

  },
  mounted() {
    like.details({
      id: this.$Route.query.id
    }).then(res => {
      this.info = res;
      this.$set(this.info, 'rec_list', res.rec_list);
      console.log(res)
      console.log(!this.info.rec_list, this.info.rec_list.length);
      this.$refs.list.refresh(this.info.rec_list);
    })
  },
  methods: {
    play(item){
      if (Number(item.id)) {
        this.$Router.push({path: '/pages/like/detail', query: {id: Number(item.id)}});
      }
    }
  }
}
</script>

<style scoped>

</style>
