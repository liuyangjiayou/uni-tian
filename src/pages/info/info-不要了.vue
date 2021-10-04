<template>
  <view-container src="/static/images/bg1.png" :back="false">
    <template #header>
      <view class="my-header flex flex-column justify-center align-center">
        <al-image width="125rpx" height="125rpx" round="50%" src="/static/test/user.png"/>
        <view class="mt20 fs30 text-color-white">账号昵称</view>
      </view>
    </template>
    <view class="flex align-center justify-between fs0">
      <view class="flex align-center fs26"><al-image class="mr20" width="51rpx" height="51rpx" src="/static/images/team1.png"/>我的成绩</view>
      <al-image width="20rpx" height="34rpx" src="/static/images/arrow2.png" @click.native="$Router.push({name:'score'})" />
    </view>
  </view-container>
</template>

<script>
import { getInfo } from "../../api";
import { launchOrload } from '../../utils/mixins'
export default {
  name: "info",
  mixins: [launchOrload],
  data() {
    return {
      user: {
        nickname: '',
        phone: '',
      }
    }
  },
  methods: {
    // 验证授权
    launchEnd() {
      console.log(this.$Route.query.id);
      getInfo().then(res => {
        this.user = res.user;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
