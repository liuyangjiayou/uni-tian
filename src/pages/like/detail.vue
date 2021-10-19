<template>
  <view-container back title="视频详情" class="pt0">
    <template #header>
      <view class="fs0">
        <video
            id="myVideo"
            :src="info[is_up?'ranks_video_up':'ranks_video']"
            controls
            style="width: 100%;"
        />
      </view>
    </template>
    <view class="flex pt40 mb28">
      <view class="flex-1 mr10">
        <view class="fs32 text-bold">{{ info[is_up?'ranks_video_name_up':'ranks_video_name'] }}</view>
        <view class="mt30 flex align-center fs0">
          <al-image width="100rpx" height="33rpx" src="/static/images/team.png" />
          <span class="text-color-gray fs24 ml16">{{ info.ranks_name }}</span>
        </view>
        <view class="mt10 flex align-center fs0">
          <al-image width="100rpx" height="33rpx" src="/static/images/company.png" />
          <span class="text-color-gray fs24 ml16">{{ info.ranks_org_name }}</span>
        </view>
      </view>
      <view class="b1-1 flex flex-column">
        <view class="flex-1 flex justify-center align-center px20">
          <al-image width="27rpx" height="31rpx" src="/static/images/count.png" />
          <view class="flex flex-1 flex-column ml22 align-center">
            <span class="text-color-red fs24 text-bold">{{ info[is_up ? 'rank_score_up' : 'rank_score'] }}</span>
            <span class="fs20">{{info.pro_type === 1 ? '当前票数' : '当前分数'}}</span>
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
        <template v-if="info.pro_type === 1">
          <divider height="1rpx" />
          <view class="flex-1 flex justify-center align-center lh24 fs24 px20  py16 ">
            <view class="text-color-red text-bold" @click="voteSubmit2(info.id)">投票</view>
          </view>
        </template>
      </view>
    </view>
    <divider height="1rpx" />
    <view class="text-center pt30 mb20">
      <view class="view-title">为您推荐</view>
    </view>
    <view-list ref="list" :list="info.rec_list" :is-up="!!is_up" @play="play" />
  </view-container>
</template>

<script>
import { like } from '@/api';
import VoteMixins from "@/mixins";
import ShareMixin from "@/mixins/share";
export default {
  name: "detail",
  mixins: [VoteMixins, ShareMixin],
  data() {
    return {
      info: {
        rec_list: [],
      },
      is_up: 0,
    };
  },
  onLoad(){
    this.is_up = this.$Route.query.is_up || 0;
  },
  mounted() {
    let data = {};
    if (this.is_up) data.is_up = 1;
    like.details({
      id: this.$Route.query.id,
      ...data,
    }).then(res => {
      this.shareInfo.title = res[this.is_up?'ranks_video_name_up':'ranks_video_name'];
      if (res[this.is_up?'ranks_video_thumb_up':'ranks_video_thumb']) {
        this.shareInfo.imageUrl = res[this.is_up?'ranks_video_thumb_up':'ranks_video_thumb'];
      }
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
    },

    voteSubmit2(id) {
      this.voteSubmit(id).then(res => {
        this.info.rank_score = this.info.rank_score + 1;
      });
    },
  }
}
</script>

<style scoped>

</style>
