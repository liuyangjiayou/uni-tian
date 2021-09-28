<template>
  <view>
    <view class="flex flex-column align-center pt100 mb40">
      <al-image :src="user.avatar"/>
    </view>
    <view class="flex flex-column pl40">
      <view class="mt20">姓名：{{ user.nickname }} </view>
      <view class="mt20">电话: {{ user.phone }} </view>
    </view>
  </view>
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
      getInfo().then(res => {
        this.user = res.user;
      })
    }
  }
}
</script>

<style scoped>

</style>
