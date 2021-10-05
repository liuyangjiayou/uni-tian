<template>
  <view-container back title="比赛进程">
    <view v-for="item in list" :key="item.type_name" class="process-wrap mb28">
      <view class="pro-title flex align-center justify-center fs36 text-bold text-color-white">{{ item.type_name }}</view>
      <view class="pro-body shadow1">
        <view v-for="child in item.type_list" :key="pro_name">
          <view class="fs30 mt40">{{ child.pro_name }}</view>
          <view class="fs24 minute mt22 text-color-gray">{{ child.sch_s_time }}{{  child.sch_e_time ? ` -- ${child.sch_e_time}` : '' }}</view>
        </view>
      </view>
    </view>
  </view-container>
</template>

<script>
import {getProcess} from "../../api";
export default {
  name: "index",
  data(){
    return {
      list: [],
    }
  },
  onLoad(){
    const { pid } = this.$Route.query
    getProcess({
      pid: pid || ''
    }).then(res => {
      this.list = res
    })
  }
}
</script>

<style lang="scss" scoped>
.process-wrap {
  .pro-title {
    background-image: url("~@/static/images/bg3.png");
    background-position: top;
    background-size: 100%;
    height: 128rpx;
  }
  .pro-body {
    border-radius: 0 0 32rpx 32rpx;
    padding: 0 40rpx 40rpx;
    background-color: #f8fdff;
    overflow: hidden;
    box-sizing: border-box;
    .minute {
      color: #aaa;
    }
    .minute::before {
      content: '';
      display: inline-block;
      width: 30rpx;
      height: 30rpx;
      background-image: url("~@/static/images/process1.png");
      background-size: 100% 100%;
      vertical-align: bottom;
      margin-right: 20rpx;
    }
  }

}
</style>
