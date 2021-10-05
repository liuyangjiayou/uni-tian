<template>
  <view-container back title="视频详情" class="pt0">
    <template #header>
      <view class="fs0">
        <video
            id="myVideo"
            src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
            enable-danmu
            danmu-btn
            controls
            style="width: 100%;"
        />
      </view>
    </template>
    <view class="flex pt40 mb28">
      <view class="flex-1">
        <view class="fs32 text-bold">这里是视频名称，这里是视频名称</view>
        <view class="mt30 flex align-center fs0">
          <al-image width="100rpx" height="33rpx" src="/static/images/team.png" />
          <text class="text-underline fs24 ml16">这里是队伍名称</text>
        </view>
        <view class="mt10 flex align-center fs0">
          <al-image width="100rpx" height="33rpx" src="/static/images/company.png" />
          <text class="text-underline fs24 ml16">这里是单位名称</text>
        </view>
      </view>
      <view class="b1-1 flex flex-column">
        <view class="flex-1 flex justify-center align-center px20">
          <al-image width="27rpx" height="31rpx" src="/static/images/count.png" />
          <view class="flex flex-1 flex-column ml22 align-center">
            <text class="text-color-red fs24 text-bold">2055</text>
            <text class="fs20">当前票数</text>
          </view>
        </view>
        <divider height="1rpx" />
        <view class="flex-1 flex justify-center align-center px20">
          <al-image width="23rpx" height="25rpx" src="/static/images/number.png" />
          <view class="flex flex-1 flex-column ml22 align-center">
            <text class="text-color-yellow fs24 text-bold">0058</text>
            <text class="fs20">编号</text>
          </view>
        </view>
      </view>
    </view>
    <divider height="1rpx" />
    <view class="text-center pt30">
      <view class="view-title">为您推荐</view>
    </view>
    <view-list :list="list" />
  </view-container>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
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
}
</script>

<style scoped>

</style>