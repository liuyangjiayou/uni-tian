<template>
	<view-container src="/static/images/ss.png" :back="false">
    <template #header>
      <!--  页面导航  -->
      <view class="flex align-center mt34 mb14">
        <icon-button class="flex flex-1 justify-center" fs="fs24 mt14" title="比赛规则" src="/static/images/ss1.png"  @handlerClick="$Router.push({name:'match-rule'})" />
        <icon-button class="flex flex-1 justify-center" fs="fs24 mt14" title="赛事进程" src="/static/images/ss2.png"  @handlerClick="$Router.push({name:'process'})" />
        <icon-button class="flex flex-1 justify-center" fs="fs24 mt14" title="赛事动态" src="/static/images/ss3.png"  @handlerClick="$Router.push({name:'dynamic'})" />
        <icon-button class="flex flex-1 justify-center" fs="fs24 mt14" title="点赞投票" src="/static/images/ss4.png"  @handlerClick="$Router.push({name:'likes'})" />
        <icon-button class="flex flex-1 justify-center" fs="fs24 mt14" title="成绩查询" src="/static/images/ss5.png" @handlerClick="handlerInfo" />
      </view>
    </template>

    <!-- 项目分类   -->
    <view
        v-for="(item, index) in classList"
        :key="index"
        class="sport-item"
        :style="{backgroundImage: `url(${require('@/static/images/sport/sport'+item.index+'.png')})`}"
        @click="handlerClick(item)">{{item.name}}</view>
    <authorization v-if="authorDialogVisibility" @close="authorDialogVisibility = false" />
	</view-container>
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
        {index: 4, name: '集体跳绳'},
        {index: 6, name: '冰球射门'},
        {index: 7, name: '大众轮滑'},
        {index: 8, name: '足球颠球'},
        {index: 9, name: '定点投篮'},

        {index: 10, name: '兵乓球'},
        {index: 11, name: '花式大白键'},
        {index: 5, name: '桌上冰壶'},
        {index: 12, name: '广播体操'},
        {index: 3, name: '太极拳'},

        {index: 1, name: '八段锦'},
        {index: 2, name: '广场舞'},
        {index: 13, name: '健步走'},
        {index: 14, name: '冰雪大挑战'},
        {index: 15, name: '自由式轮滑'},
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
    handlerClick(item) {
      if (item.index === 13) {
        this.$Router.push({path: '/pages/run/run'});
      } else {
        this.$Router.push({path: '/pages/sport/index', query: {id: item.index, sport: item.name}});
      }
    },
    handlerSport() {
      this.$Router.push({ name: `sport`, params: { id: 2, title: '冰球射门' }})
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
