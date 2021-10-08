<template>
  <view class="waterfall-item video-item shadow1" @tap="onTap">
    <view class="fs0 relative" @click="play(params)">
      <image  mode="widthFix" @load="emitHeight" @error="emitHeight" :src="params.ranks_video_thumb" />
      <al-image width="53rpx" height="53rpx" src="/static/images/play.png" class="video-play" />
      <view class="video-tag fs24">{{params.ranks_org_name || params.org_name}}</view>
    </view>
    <view class="px24 pb20">
      <view class="fs26 mt20">{{params.ranks_video_name}}</view>
      <view class="fs22 text-color-gray mt10">{{params.ranks_name}}</view>
      <view class="fs22 text-color-gray3 b2-1 inline-block p5 mt10">编号：{{params.id}}</view>
      <view v-if="vote" class="flex align-center justify-between mt10">
        <text class="text-color-blue fs30 mr10">{{params.rank_score || params.count}}</text>
        <text class="text-color-gray4 flex-1 fs22">当前票数</text>
        <view class="button-score" @click="voteSubmit">投票</view>
      </view>
    </view>
  </view>
</template>

<script>
import { voteFn, settings  } from '@/api';
export default {
  name:"WaterFall",
  props:{
    params:{
      type: Object,
      default(){
        return {}
      },
    },
    tag:{
      type:String | Number,
      default:''
    },
    index:{
      type:Number,
      default:-1
    },
    vote: {
      type: Boolean,
      default: true,
    },
  },
  methods:{
    // 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
    emitHeight(e){
      const query = uni.createSelectorQuery().in(this);
      query.select('.waterfall-item').boundingClientRect(data => {
        let height = Math.floor(data.height);
        this.$emit("height",height,this.$props.tag);
      }).exec();
    },
    onTap(){
      this.$emit("click",this.$props.index,this.$props.tag);
    },
    play() {
      this.$emit('play', this.params);
    },
    async voteSubmit() {
      const config = await settings();
      const voteMax = config?.setting?.vote_num || 0;
      const voteInfo = uni.getStorageSync('vote');
      const ling = new Date(new Date().toLocaleDateString()).getTime(); // 今天零点
      const currentCount = voteInfo?.time && voteInfo.time > ling ? (voteInfo?.count || 0) : 0;
      console.log('已经投了', currentCount, '最大投票次数', voteMax);
      if (currentCount >= voteMax) {
        uni.showToast({title: `已达到最大投票次数${voteMax}次！`, icon: 'none'});
        return;
      }
      uni.showLoading({title: '', mask: true});
      voteFn({rank_id: this.params.id}).then(res => {
        uni.setStorageSync('vote', {time: Date.now(), count: currentCount + 1});
        console.log('投票成功，用掉次数', currentCount + 1);
        uni.showToast({
          title: '投票成功',
          icon: 'success',
        });
      }).finally(() => {
        uni.hideLoading();
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.video-list {
  margin-right: -20rpx;
  padding-bottom: 20rpx;
  overflow: hidden;
}

.video-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.video-tag {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 24rpx;
  border-radius: 8rpx;
  background-color: #22b7ef;
  color: #FFFFFF;
  height: 44rpx;
  line-height: 44rpx;
  padding: 0 10rpx;
}
.button-score {
  display: inline-flex;
  border-radius: 10rpx;
  border: 1px solid #f55308;
  font-size: 24rpx;
  background-color: #fdeee6;
  color: #f55308;
  padding: 3rpx 10rpx;
}
.waterfall-item{
  //padding: 16rpx;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;

  image{
    display: block;
    width: 100%;
    // 默认设置一个图片的大约值
    height: 350rpx;
  }

  .content{
    margin-top: 16rpx;

    .money{
      color: #fa3534;
      margin-top: 8rpx;
    }

    .label{
      background-color: #fa3534;
      color: #fff;
      font-size: 20rpx;
      padding: 4rpx 16rpx;
      border-radius: 20rpx;
    }

    .shop-name{
      font-size: 20rpx;
      color: #999;
    }
  }
}
</style>
