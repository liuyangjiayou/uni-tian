<template>
	<view class="content">
    <!-- 轮播图   -->
    <swiper
      class="swiper"
      indicator-dots
      autoplay
      circular
      :interval="3000"
      :duration="500"
    >
      <swiper-item><al-image width="100%" height="100%" src="/static/1.png"></al-image></swiper-item>
      <swiper-item><al-image width="100%" height="100%" src="/static/2.png"></al-image></swiper-item>
      <swiper-item><al-image width="100%" height="100%" src="/static/3.png"></al-image></swiper-item>
    </swiper>
    <!--  页面导航  -->
    <view class="flex align-center mt20">
      <icon-button class="flex flex-1 justify-center" title="赛事动态" />
      <icon-button class="flex flex-1 justify-center" title="我要报名" />
      <icon-button class="flex flex-1 justify-center" title="比赛进程" />
      <icon-button class="flex flex-1 justify-center" title="比赛规则" />
    </view>
    <!-- 项目分类   -->
     <view class="class-list px20">
       <view v-for="(item, index) in classList" :key="index" class="mt10">
         <al-image width="100%" height="120rpx" :src="item.src"></al-image>
         <p class="fs12">{{ item.title }}</p>
       </view>
     </view>
    
	</view>
</template>

<script>
	export default {
		data() {
			return {
        classList: [{
          title: '桌上冰壶',
          src: '/static/1.png',
        }, {
          title: '冰球射门（陆地）',
          src: '/static/2.png',
        },{
          title: '陆地冰壶',
          src: '/static/3.png',
        },{
          title: '足球垫球',
          src: '/static/2.png',
        },{
          title: '定点投篮',
          src: '/static/3.png',
        },{
          title: '乒乓球掷准',
          src: '/static/1.png',
        },{
          title: '花毽接力',
          src: '/static/2.png',
        }]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
</style>
