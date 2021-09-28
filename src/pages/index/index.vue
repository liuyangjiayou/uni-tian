<template>
	<view class="content">
    <!-- 轮播图   -->
    <swiper
      class="swiper"
      :style="{ height: '340rpx'}"
      indicator-dots
      autoplay
      circular
      :interval="3000"
      :duration="500"
    >
      <swiper-item><al-image width="100%" height="100%" src="/static/test/banner1.png" /></swiper-item>
    </swiper>
    <divider />
    <!--  页面导航  -->
    <view class="flex align-center my20">
      <icon-button class="flex flex-1 justify-center" title="赛事动态" src="/static/test/nav1.png" />
      <icon-button class="flex flex-1 justify-center" title="我要报名" src="/static/test/2.png" />
      <icon-button class="flex flex-1 justify-center" title="比赛进程" src="/static/test/3.png" />
      <icon-button class="flex flex-1 justify-center" title="个人信息" src="/static/test/4.png" @handlerClick="handlerInfo" />
    </view>
    <divider />
    <!-- 项目分类   -->
     <view class="class-list px20">
       <view v-for="(item, index) in classList" :key="index" class="mt10" @click="handlerRun('run')">
         <al-image width="100%" height="228rpx" :src="item.src"></al-image>
       </view>
     </view>
    <authorization v-if="authorDialogVisibility" @close="authorDialogVisibility = false" />
	</view>
</template>

<script>
import { launchOrload} from "../../utils/mixins";
import { mapGetters } from 'vuex';
export default {
  mixins: [launchOrload],
  data() {
    return {
      authorDialogVisibility: false,
      classList: [
        {
          title: '健步走',
          src: '/static/test/nav-list1.png',
        },
        // {
        //   title: '桌上冰壶',
        //   src: '/static/1.png',
        // },
        // {
        //   title: '冰球射门（陆地）',
        //   src: '/static/2.png',
        // },
        // {
        //   title: '陆地冰壶',
        //   src: '/static/3.png',
        // },
        // {
        //   title: '足球垫球',
        //   src: '/static/2.png',
        // },
        // {
        //   title: '定点投篮',
        //   src: '/static/3.png',
        // },
        // {
        //   title: '乒乓球掷准',
        //   src: '/static/1.png',
        // },
        // {
        //   title: '花毽接力',
        //   src: '/static/2.png',
        // }
      ]
    }
  },
  onLoad() {},
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    // 健步走
    handlerRun (type) {
      // 验证授权
      if (!this.token) {
        return this.authorDialogVisibility = true;
      }
      this.$Router.push({ path: `/pages/${type}/${type}`})
    },
    // 我的个人信息
    handlerInfo () {
      this.$Router.push({ path: `/pages/info/info`, query: { id: 123 } })
    },
  }
}
</script>

<style scoped>
</style>
