<template>
	<view-container ref="container" :back="false" title="赛事" title-align="justify-center">
    <template #header>
      <!-- 轮播图   -->
      {{ banner.length }}
      <swiper
          v-if="banner.length"
          class="swiper"
          :style="{ height: '382rpx'}"
          indicator-dots
          autoplay
          circular
          :interval="3000"
          :duration="500"
      >
        <swiper-item v-for="(item, index) in banner" :key="index"><al-image width="100%" height="100%" :src="item.image" /></swiper-item>
      </swiper>
      <!--  页面导航  -->
      <view v-if="nav.length" class="flex align-center mt34 mb14">
        <icon-button
            v-for="(item, index) in nav"
            :key="index"
            class="flex flex-1 justify-center"
            fs="fs24 mt14"
            :title="item.title"
            :src="item.image"
            @handlerClick="handlerClick(item)" />
      </view>
    </template>
    <!-- 项目分类   -->
    <view
        v-for="(item, index) in pro_list"
        class="sport-item"
        @click="handlerSport(item)"
        :key="index"
    >
      <view class="z1">{{ item.pro_name }}</view>
      <al-image class="absolute z0" width="690rpx" height="228rpx" :src="item.pro_thumb"/>
    </view>
	</view-container>
</template>

<script>
import { launchOrload} from "../../utils/mixins";
import { mapGetters } from 'vuex';
import { index } from '@/api';
export default {
  mixins: [launchOrload],
  data() {
    return {
      banner: [],
      nav: [],
      pro_list: [],
    }
  },
  onBackPress(e) {
    console.log(1234564);
    return true;
  },
  onLoad() {
    index().then(res => {
      this.pro_list = res.pro_list;
      this.nav = res.nav;
      this.banner = res.banner;
    });
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    handlerClick(item) {
      const navPath = {
        1: '/pages/rule/index',
        2: '/pages/process/index',
        3: '/pages/dynamic/index',
        4: '/pages/like/index',
      };
      // 成绩查询
      if (item.id === 5) {
        this.$refs.container.getAuth(() => {
          this.$Router.push({path: '/pages/info/score'});
        }, () => console.log('get token failure'));
      } else if (navPath[item.id]) {
        this.$Router.push({path: navPath[item.id]});
      }
    },
    handlerSport(item) {
      if (parseInt(item.pro_type) === 3) {
        this.$refs.container.getAuth(() => {
          // #ifdef H5
          location.href = item.jump_url;
          // #endif
          // #ifdef MP-WEIXIN
          this.$Router.push({path: '/pages/run/run'});
          // #endif
        }, () => console.log('get token failure'));
      } else if (parseInt(item.pro_type) === 4) {
        this.$refs.container.getAuth(() => {
          this.$Router.push({ path: `/pages/game/list`, query: { id: item.id, title: item.pro_name }});
        }, () => console.log('get token failure'));
      } else {
        this.$Router.push({ path: `/pages/sport/index`, query: { id: item.id, pro_type: item.pro_type, sport: item.pro_name }})
      }
    },
  }
}
</script>

<style scoped>
</style>
