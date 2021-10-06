<template>
  <view-container back :title="query.title" custom-class="pt0">
    <view class="flex align-center bg-white pt20">
      <uni-search-bar :radius="100" v-model="form.search" placeholder="输入关键词" @confirm="getData(1)" class="flex-1 fs26" />
      <view class="fs28" @click.native="open">筛选</view>
    </view>
    <uni-popup ref="popup" type="right">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" :style="[{paddingTop: barH + 'px'}]">
        <view class="flex justify-end pop-close" :style="[{top: barH + 'px'}]">
          <al-image width="24rpx" height="24rpx" src="/static/images/close.png" class="ml20 mt10" @click.native="close" />
        </view>
        <template v-for="(row, index) in tree">
          <view :key="index + 'a'" :class="['city-title', index===0?'pt35':0]"><span class="mr20">—</span>{{row.title}}<span class="ml20">—</span></view>
          <view :key="index + 'b'" class="city-list">
            <text v-for="(item, index2) in row.childs"
                  :key="index2"
                  :class="['city-item fs28', form.orgId === item.id ? 'active' : '']"
                  @click.native="() => setValue2(item.id)">{{item.title}}</text>
          </view>
          <divider :key="index + 'c'" height="1rpx" />
        </template>
      </scroll-view>
    </uni-popup>
    <view class="waterfall-box h-flex-x h-flex-2 view-list">
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
import { match } from '@/api';
export default {
  name: "SportMatches",
  data() {
    return {
      query: {},
      page: 0, // 请求参数
      imgArr: [],
      scrollTop: 0,
      form: {
        search: '',
        orgId: 0,
      },
      tree: [],
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
      },
      barH: 0,
    };
  },
  onReady() {
    this.barH = this.customBar;
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
  onLoad() {
    console.log('onLoad match2');
    this.query = this.$Route.query;
    match.tree().then(res => {
      this.tree = res;
    });
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
    setValue2(id) {
      this.form.orgId = this.form.orgId === id ? '' : id;
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
      if (!this.ajax.load) {
        return;
      }
      this.ajax.load = false;
      this.ajax.loadTxt = '加载中';
      console.log('getList');
      match.list({...this.query}).then(res => {
        this.addList(res.list);
      });

    },
    addList(res) {

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
    min-width: 145rpx;
    height: 46rpx;
    line-height: 46rpx;
    text-align: center;
    background-color: #f6f6f6;
    border-radius: 26rpx;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
    padding: 2rpx 20rpx;
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

.pop-close{

  position: fixed;
  height: 65rpx;
  right: 47rpx;
  left: 0;
  background: #fff;
}
</style>