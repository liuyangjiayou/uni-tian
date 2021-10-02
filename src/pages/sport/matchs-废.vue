<template>
  <view-container :head="false" :style="{paddingTop: 0}">
    <view class="flex align-center sticky-top bg-white py20">
      <uni-easyinput class="flex-1" v-model="value" placeholder="请输入内容" prefixIcon="search" confirmType="搜索" @iconClick="getData(0)" @confirm="getData(0)" />
      <al-image width="50rpx" height="50rpx" src="/static/test/icon1.png" class="ml20" @click.native="open" />
    </view>
    <uni-popup ref="popup" type="right">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
        <view class="flex justify-end">
          <al-image width="50rpx" height="50rpx" src="/static/test/icon1.png" class="ml20" @click.native="close" />
        </view>
        <view class="city-title"><span class="mr20">—</span>石家庄市<span class="ml20">—</span></view>
        <view class="city-list">
          <span :class="['city-item', value2 === '桥西去' ? 'active' : '']" @click.native="setValue2('桥西去')">桥西去</span>
          <span :class="['city-item', value2 === '桥西去' ? 'active' : '']" @click.native="setValue2('新华区')">新华区</span>
          <span class="city-item" @click.native="setValue2('石家庄市')">桥西去</span>
          <span class="city-item" @click.native="setValue2('石家庄市')">新华区</span>
          <span class="city-item" @click.native="setValue2('石家庄市')">桥西去</span>
        </view>
        <divider height="1rpx" />
        <view class="city-title"><span class="mr20">—</span>石家庄市<span class="ml20">—</span></view>
        <view class="city-list">
          <span class="city-item">桥西去</span>
          <span class="city-item">新华区</span>
          <span class="city-item">桥西去</span>
          <span class="city-item">新华区</span>
          <span class="city-item">桥西去</span>
        </view>
        <divider height="1rpx" />
      </scroll-view>
    </uni-popup>
    <view class="waterfall-box h-flex-x h-flex-2">
      <view class="mr20">
        <water-fall
            v-for="(item,index) in leftList"
            :key="index"
            :params="item"
            tag="left"
            :index="index"
            @height="onHeight"
            @click="onClick"
        ></water-fall>
      </view>
      <view>
        <water-fall
            v-for="(item,index) in rightList"
            :key="index"
            :params="item"
            @height="onHeight"
            @click="onClick"
            tag="right"
            :index="index"
        ></water-fall>
      </view>
    </view>
    <view class="load-txt">{{ajax.loadTxt}}</view>
  </view-container>
</template>

<script>
// import WaterFall from "./components/WaterFall";
export default {
  name: "SportMatches",
  components: {
    WaterFall,
  },
  data() {
    return {
      page: 0, // 请求参数
      imgArr: [],
      scrollTop: 0,
      value: '', // 搜索关键词
      value2: '', // 筛选的值
      // waterfall data
      leftHeight: 0,
      rightHeight: 0,
      leftList: [],
      rightList: [],
      ajax: {
        // 是否可以加载
        load: true,
        // 加载中提示文字
        loadTxt: '',
        // 每页的请求条件
        rows:10,
        // 页码
        page:1,
      }
    };
  },
  onReady() {
    this.getList();
  },
  // 触底触发
  onReachBottom() {
    this.getList();
  },
  // 下拉刷新
  onPullDownRefresh(){
    // 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
    setTimeout(()=>{
      this.ajax.page = 1;
      this.leftHeight = 0;
      this.rightHeight = 0;
      this.ajax.load = true;
      this.getList();
    },800);
  },
  methods: {
    getData(page) {
      if (!isNaN(page)) this.page = Number(page);
      console.log('getData', 'this.value', this.value, 'this.value2', this.value2, 'this.page', this.page);
    },
    open(){
      console.log('open');
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close()
    },
    setValue2(title) {
      this.value2 = this.value2 ? '' : title;
      this.$refs.popup.close();
      this.getData();
    },

    // 监听高度变化
    onHeight(height, tag) {
      if (tag == 'left') {
        this.leftHeight += height;
      } else {
        this.rightHeight += height;
      }
    },
    // 组件点击事件
    onClick(index, tag){
      console.log(index, tag);
      // 对应的数据
      if(tag == 'left'){
        console.log(this.leftList[index]);
      }else{
        console.log(this.rightList[index]);
      }
      let direction = {
        "left":'左',
        "right":'右'
      }
      uni.showToast({
        title:`${direction[tag]}侧列表第${index+1}个被点击`,
        icon:'none'
      })
    },
    // 获取数据
    getList() {
      /*
        无真实数据，当前由 setTimeout 模拟异步请求、
        自行替换 请求方法将数据 传入 addList() 方法中
        自行解决数据格式，自行修改组件内布局和内容绑定
      */
      if (!this.ajax.load) {
        return;
      }
      this.ajax.load = false;
      this.ajax.loadTxt = '加载中';

      setTimeout(() => {
        // 生成随机数方法
        let random = (min = 0, max) => {
          return Math.floor(Math.random() * max) + min;
        }
        // 待选的图片数据
        let imgs = [];
        // 待选的标题数据
        let titles = [
          '桃花坞里桃花庵，桃花庵里桃花仙；',
          '桃花仙人种桃树，又摘桃花卖酒钱。',
          '酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。',
          '但愿老死花酒间，不愿鞠躬车马前；',
          '车尘马足富者趣，酒盏花枝贫者缘。若将富贵比贫贱，',
          '一在平地一在天；若将贫贱比车马，他得驱驰我得闲。',
          '别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。'
        ];

        let res = [];
        for (let i = 0; i < 10; i++) {
          res.push({
            url: `/static/test/img/${random(0,3)}.jpg`,
            title: titles[random(0, titles.length)],
            money: random(9, 9999),
            label:'官方自营',
            shop:'唐诗三百首旗舰店'
          })
        }
        this.addList(res)
      }, 1000);

    },
    addList(res) {
      // 获取到的数据，请注意数据结构
      console.log(res);

      if(!res || res.length < 1){
        this.ajax.loadTxt = '没有更多了';
        return;
      }

      // 左右列表高度的差
      let differ = this.leftHeight - this.rightHeight;
      // 计算差值，用于确定优先插入那一边
      let differVal = 0;

      // 初始化左右列表的数据
      let i = differ > 0 ? 1 : 0;

      let [left, right] = [
        [],
        []
      ];


      // 获取插入的方向
      let getDirection = (index)=>{
        /* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
        if(differ>= 600 && index < 3){
          differVal = 1;
          return 'right';
        }

        /* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
        if(differ <= -600 && index < 3){
          differVal = -1;
          return 'left';
        }

        /* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
        if(differ >= 350 && index < 2){
          return 'right';
        }
        /* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
        if(differ <= -350 && index < 2){
          differVal = -1;
          return 'left';
        }

        /* 当前数据序号为偶数时，则插入到左边 */
        if ((i+differVal) % 2 == 0) {
          return 'left';
        } else {
          /* 当前数据序号为奇数时，则插入到右边 */
          return 'right';
        }
      }

      // 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
      res.forEach((item, index) => {
        if(getDirection(index) == 'left'){
          //console.log(`差值：${differ},方向：left，序号${index}`)
          left.push(item);
        }else{
          //console.log(`差值：${differ},方向：right，序号${index}`)
          right.push(item);
        }
        i++;
      });

      // 将左右列表的数据插入，第一页时则覆盖
      if(this.ajax.page == 1){
        this.leftList = left;
        this.rightList = right;
        uni.stopPullDownRefresh();
      }else{
        this.leftList = [...this.leftList, ...left];
        this.rightList = [...this.rightList, ...right];
      }

      this.ajax.load = true;
      this.ajax.loadTxt = '上拉加载更多';
      this.ajax.page++;
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-Y {
  height: 100vh;
  width: 535rpx;
  background: white;
  padding: 0 30rpx;
  box-sizing: border-box;
}
.city-title {
  height: 50rpx;
  line-height: 50rpx;
  font-size: 32rpx;
  font-weight: bold;
  margin: 20rpx 0;
  span {
    color: #c3c3c3;
  }
}
.city-list {
  margin-right: -20rpx;
  .city-item {
    display: inline-block;
    width: 145rpx;
    height: 46rpx;
    line-height: 46rpx;
    text-align: center;
    background-color: #f6f6f6;
    border-radius: 30rpx;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    &.active {
      background-color: #22b7ef;
      color: white;
    }
  }
}


.waterfall-box {
 //padding: 20rpx 10rpx;
 box-sizing: border-box;

 >view {
   //padding: 0 10rpx;
 }
}

.h-flex-x {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  &.h-flex-2 {
    >view {
      width: 50%;
    }
  }
}


</style>