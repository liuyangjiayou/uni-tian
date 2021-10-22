<template>
  <view-container ref="container" back title="云端健步走">
    <view>
      <!-- 姓名 -->
      <view class="name-info flex align-center">
        <al-image width="76rpx" height="76rpx" round="50%" :src="data.userinfo.avatar" />
        <view class="ml18">{{ data.userinfo.nickname }}</view>
      </view>
      <!-- 步数信息 -->
      <view class="step-info">
        <al-image width="690rpx" height="418rpx" round="8" class="image" src="/static/images/run-bg.png" />
        <view class="step flex align-end justify-between">
          <view class="flex flex-column align-center">
            <text class="num">{{ data.step }}</text>
            <text class="num-text">团队今日步数</text>
          </view>
          <view class="flex flex-column align-center">
            <text class="num">{{ data.user_all_scores }}</text>
            <text class="num-text">团队今日分数</text>
          </view>
        </view>
        <view class="step-sign flex align-center justify-center">
          <view class="flex flex-column align-center">
            <view class="day">{{ data.sum_count }}</view>
            <view class="day-text">累计打卡/天</view>
          </view>
          <view>
            <button :class="['sign-btn flex align-center justify-center', data.left_dk_times === 0 ? 'disabled' : 'active']" @click="handlerStep">立即签到</button>
          </view>
        </view>
      </view>
      <view class="notice">{{ data.jbz_bz }}</view>
      <view class="change-btn flex align-center justify-center">
        <view :class="['next-btn flex align-center justify-center', teamDataType === 1 ? 'active' : '']" @click="handlerTeamData(1)">队员今日步数</view>
        <view :class="['next-btn flex align-center justify-center', teamDataType === 2 ? 'active' : '']" @click="handlerTeamData(2)">队员今日分数</view>
      </view>
      <!-- 队伍信息 -->
      <view class="team-info">
        <view class="team-name flex align-center">{{ data.ranks_name }}</view>
        <view class="flex align-center">
          <view v-for="item in data.my_group" class="team-person flex flex-column align-center">
            <al-image width="70rpx" height="70rpx" round="50%" :src="item.avatar" />
            <view class="name">{{ item.user_name }}</view>
            <view class="step">{{ teamDataType === 1 ? item.user_steps : item.user_scores }}</view>
          </view>
        </view>
      </view>
      <view class="flex align-center justify-center">
        <view class="next-btn flex align-center justify-center" @click="handlerRun">
          继续点亮
        </view>
      </view>
    </view>
    <alert-dialog v-model="dialogVisible" :prev="answerStatus === 1 ? '确定' : '下一题'" @sub="handlerSub" @next="handlerNext" @close="handlerClose">
      <view v-for="(item, index) in answerData" class="answer-content" :key="`${item.id}_${+new Date()}`">
        <view v-if="index === answerIndex">
          <view class="title flex justify-center align-center">
            <text>第</text>
            <text>{{ index+1 }}</text>
            <text>/{{ answerData.length }}题</text>
          </view>
          <view class="answer-text">
            {{ item.type === 1 ? '【单选】' : '【多选】' }} {{ item.item_nasme }}
          </view>
          <view v-for="item2 in item.item_da" :key="item2.id" class="answer-list" @click="handlerClick(`${item2.id}`, `${item.type}`)">
            <view :class="answerResult.includes(item2.id)? 'active' : ''" >{{ item2.id }}. {{ item2.name }}</view>
          </view>
          <view v-if="answerTips" :class="['tips', answerTips.status === 1 ? 'error'  : '']">{{ answerTips.tips }}</view>
        </view>
      </view>
    </alert-dialog>
  </view-container>
</template>

<script>
import {getRun, getStepAnswer, subAnswer} from "../../api";

export default {
  name: 'step',
  data(){
    return {
      dialogVisible: false,
      data: {
        my_group: [],
        left_dk_times: 0
      },
      teamDataType: 1,
      answertime: 30,
      cloneanswertime: 30,
      answerData: [],
      answerResult: [],
      answerIndex: 0,
      answerStatus: 1,
      answerTips: {
        tips: '',
        status: 0,
      },
    }
  },
  onLoad(){
    this.loginStep()
  },
  methods: {
    // 切换队伍信息
    handlerTeamData(num) {
      this.teamDataType = num;
    },
    // 重置步数
    loginStep() {
      uni.login({
        success: (res) => {
          const { code } = res;
          uni.authorize({
            scope: 'scope.werun',
            success: (e) => {
              if (e.errMsg === 'authorize:ok') {
                wx.getWeRunData({
                  success: (run) => {
                    const { encryptedData, iv } = run;
                    getRun({
                      code,
                      encryptedData,
                      iv,
                    }).then(res => {
                      this.data = res
                    })
                  }
                })
              }
            }
          })
        }
      });
    },
    // 下一题
    handlerSub() {
      if (!this.answerResult.toString()) {
        return uni.showToast({
          title: '请选择一个答案',
          icon: 'none'
        })
      }
      // 当前是确定的时候
      if (this.answerStatus === 1) {
        const answer = this.answerData[this.answerIndex]
        subAnswer({
          answer: answer.type === 1 ? this.answerResult.toString() : this.answerResult.join('|'),
          test_id: answer.id,
          type: 2,
        }).then((res) => {
          this.answerTips.tips = res.msg;
          this.answerTips.status = res.status;
          this.answerStatus = 2;
        })
        return
      }

      // 当前是下一题的时候
      if (this.answerStatus !== 1) {
        this.answerResult = [];
        this.answerTips = {
          tips: '',
          status: 0,
        }
        if (this.answerData[this.answerIndex + 1]) {
          this.answerStatus = 1;
          this.answerIndex++;
        }else {
          this.dialogVisible = false
          this.answerData = [];
          this.answerIndex = 0;
          this.loginStep()
        }
        return
      }
    },
    // 点击关闭的时候
    handlerClose() {
      // 当前是下一题的时候
      this.answerTips = {
        tips: '',
        status: 0,
      }
      this.dialogVisible = false
      this.answerData = [];
      this.answerIndex = 0;
      this.answerResult = [];
      this.answerStatus = 1
      this.loginStep()
    },
    // 跳过
    handlerNext() {
      this.answerTips = {
        tips: '',
        status: 0,
      }
      this.answerResult = [];
      if (this.answerData[this.answerIndex + 1]) {
        this.answerIndex++;
      }else {
        this.dialogVisible = false
        this.answerData = [];
        this.answerIndex = 0;
        this.loginStep()
      }
      this.answerStatus = 1
    },
    // 选择题
    handlerClick(id, type) {
      if (this.answerStatus !== 1) return
      if (Number(type) === 1) {
        this.answerResult = [id];
      } else {
        if(this.answerResult.includes(id)) {
          this.answerResult = this.answerResult.filter(item => item !== id)
        } else {
          this.answerResult.push(id);
        }
      }
    },
    handlerRun(){
      // #ifdef H5
      location.href = data.h5;
      // #endif
      // #ifdef MP-WEIXIN
      this.$Router.push({path: '/pages/run/run'});
      // #endif
    },
    handlerStep(){
      if (this.data.left_dk_times === 0) return false;
      getStepAnswer().then(res => {
        this.answerData = res.data;
        this.answertime = res.answertime;
        this.data.left_dk_times = this.data.left_dk_times--
      })
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
/* 注意 */
.notice{
  padding: 5rpx 15rpx;
  font-size: 22rpx;
}
/* 切换按钮 */
.change-btn .next-btn{
  margin: 20rpx 40rpx 20rpx 0;
  width: max-content;
  padding: 10rpx 10rpx;
  height: max-content;
  line-height: max-content;
  font-size: 24rpx;
  border-radius: 8rpx;
  background: #e0e0e0;
}
.change-btn .next-btn.active{
  background: #1eb9f2;
}
/* 姓名 */
.name-info{
  margin-bottom: 36rpx;
  height: 76rpx;
}
/* 步数 */
.step-info{
  position: relative;
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
  padding: 0 140rpx;
  box-sizing: border-box;
  width: 100%;
  z-index: 1;
}
.step-info .num{
  font-weight: 700;
  font-size: 40rpx;
  color: #fff;
  /*font-family: 'SimSun'*/
}
.step-info .num-text{
  margin-left: 16rpx;
  padding-bottom: 14rpx;
  font-size: 24rpx;
  color: #fff;
}
/* 累计天数 */
.step-sign{
  position: absolute;
  top: 290rpx;
  width: 100%;
}
.tips{
  padding: 0 5rpx;
  font-size: 24rpx;
  line-height: 62rpx;
  background: #e8f9ff;
  color: #0087b8;
  border-radius: 3rpx;
}
.tips.error{
  background: #e9e9e9;
  color: #000;
}
.step-sign .sign-btn{
  margin-left: 174rpx;
  width: 220rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  color: #fff;
  border-radius: 30rpx;
}
.step-sign .sign-btn.disabled{
  background-color: #a0a0a0;
}
.step-sign .sign-btn.active{
  background: #22b7ef;
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
  padding: 0 0 30rpx;
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
  margin-top: 60rpx;
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
.answer-list .active{
  color: #1eb9f2;
}
</style>
