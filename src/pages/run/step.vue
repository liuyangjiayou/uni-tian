<template>
  <view-container ref="container" back title="今日步数">
    <view>
      <!-- 姓名 -->
      <view class="name-info flex align-center">
        <al-image width="76rpx" height="76rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
        <view class="ml18">刘杨</view>
      </view>
      <!-- 步数信息 -->
      <view class="step-info">
        <al-image width="690rpx" height="418rpx" round="8" class="image" src="/static/images/run-bg.png" />
        <view class="step flex align-end justify-center">
          <text class="num">99</text>
          <text class="num-text">步</text>
        </view>
        <view class="step-sign flex align-center justify-center">
          <view class="flex flex-column align-center">
            <view class="day">23</view>
            <view class="day-text">累计打开/天</view>
          </view>
          <view>
            <button class="sign-btn flex align-center justify-center" @click="handlerStep">立即签到</button>
          </view>
        </view>
      </view>
      <!-- 队伍信息 -->
      <view class="team-info">
        <view class="team-name flex align-center">健步走1队</view>
        <view class="flex align-center">
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
          <view class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" src="https://t10.baidu.com/it/u=2810075208,1121959218&fm=58" />
            <view class="name">队员</view>
            <view class="step">98ss步</view>
          </view>
        </view>
      </view>
      <view class="flex align-center justify-center">
        <view class="next-btn flex align-center justify-center" @click="handlerRun">
          继续点亮
        </view>
      </view>
    </view>
    <alert-dialog v-model="dialogVisible">
      <view class="answer-content">
        <view class="title flex justify-center align-center">
          <text>第</text>
          <text>1</text>
          <text>/1题</text>
        </view>
        <view class="answer-text">
          冬奥会滑冰大鲨科技的回复就开始环境肯定会
        </view>
        <view class="answer-list">
          <view>A.短道速滑</view>
          <view>B.短道速滑</view>
          <view>C.短道速滑</view>
          <view>D.短道速滑</view>
        </view>
      </view>
    </alert-dialog>
  </view-container>
</template>

<script>
export default {
  name: 'step',
  data(){
    return {
      dialogVisible: false,
    }
  },
  methods: {
    handlerRun(){
      // #ifdef H5
      // location.href = item.jump_url;
      // #endif
      // #ifdef MP-WEIXIN
      this.$Router.push({path: '/pages/run/run'});
      // #endif
    },
    handlerStep(){
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
/* 姓名 */
.name-info{
  margin-bottom: 36rpx;
  height: 76rpx;
}
/* 步数 */
.step-info{
  position: relative;
  margin-bottom: 52rpx;
  width: 690rpx;
  height: 418rpx;
}
.step-info .image{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.step-info .step{
  position: absolute;
  top: 94rpx;
  left: 0;
  width: 100%;
  z-index: 1;
}
.step-info .num{
  font-weight: 700;
  font-size: 76rpx;
  color: #fff;
  font-family: 'SimSun'
}
.step-info .num-text{
  margin-left: 16rpx;
  padding-bottom: 14rpx;
  font-size: 34rpx;
  color: #fff;
}
/* 累计天数 */
.step-sign{
  position: absolute;
  top: 290rpx;
  width: 100%;
}
.step-sign .sign-btn{
  margin-left: 174rpx;
  width: 220rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  color: #fff;
  background: #22b7ef;
  border-radius: 30rpx;
}
.step-sign .day, .day-text{
  color: #fff;
}
.step-sign .day{
  font-size: 36rpx;
}
.step-sign .day-text{
  font-size: 20rpx;
}
/* 队伍信息 */
.team-info{
  padding: 0 0 67rpx;
  overflow: hidden;
  width: 690rpx;
  max-width: 690rpx;
  min-height: 310rpx;
  border-radius: 8rpx;
  box-shadow: 0 0 20rpx #ebebeb;
  overflow-x: scroll;
}
.team-info::-webkit-scrollbar{ width:0; height:0 }
.team-info .team-name{
  padding: 0 27rpx 0;
  height: 106rpx;
  font-size: 28rpx;
}
.team-person{
  box-sizing: border-box;
  padding: 10rpx;
  width: 142rpx;
  min-width: 142rpx;
}
.team-person .name{
  margin: 18rpx 0 11rpx 0;
  font-size: 24rpx;
}
.team-person .step{
  font-size: 24rpx;
  color: #336d9e;
}
/* 继续点亮 */
.next-btn{
  margin-top: 92rpx;
  width: 592rpx;
  height: 84rpx;
  background: #22b7ef;
  border-radius: 42rpx;
  color: #fff;
}
.answer-content{
  padding: 0 52rpx;
}
.answer-content .title{
  height: 80rpx;
}
.answer-content .answer-text{
  font-size: 28rpx;
}
.answer-list{
  line-height: 50rpx;
  font-size: 28rpx;
}
</style>
