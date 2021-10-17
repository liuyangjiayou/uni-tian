<template>
  <view-container ref="container" back title="比赛进程">
    <view v-for="item in list" :key="item.type_name" class="process-wrap mb28">
      <view class="pro-title flex align-center justify-center fs36 text-bold text-color-white">{{ item.type_name }}</view>
      <view class="pro-body shadow1">
        <view v-for="(child, index) in item.type_list" :key="index">
          <view @click="handlerClick(child)">
            <view class="fs30 mt40">{{ child.pro_name }}</view>
            <view class="fs24 minute mt22 text-color-gray">{{ child.sch_s_time }}{{  child.sch_e_time ? ` -- ${child.sch_e_time}` : '' }}</view>
          </view>
        </view>
      </view>
    </view>
  </view-container>
</template>

<script>
import { getProcess, check } from "@/api";
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
      pro_id: pid || ''
    }).then(res => {
      this.list = res
    })
  },
  methods: {
    handlerClick(item) {
      console.log(item, 123123);
      if (parseInt(item.pro_type) === 3) {
        this.$refs.container.getAuth(() => {
          check().then(res => {
            // #ifdef H5
            location.href = item.jump_url;
            // #endif
            // #ifdef MP-WEIXIN
            this.$Router.push({path: '/pages/run/run'});
            // #endif
          });
        }, () => console.log('get token failure'));
      } else if (parseInt(item.pro_type) === 4) {
        this.$Router.push({ path: `/pages/game/list`, query: { id: item.sch_pro_id, title: item.pro_name }});
      } else {
        this.$Router.push({ path: `/pages/sport/index`, query: { id: item.sch_pro_id, pro_type: item.pro_type, sport: item.pro_name }})
      }
    }
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
