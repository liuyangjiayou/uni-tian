<template>
  <view>
    <view class="waterfall-box h-flex-x h-flex-2 view-list">
      <view class="mr20">
        <water-fall
            v-for="(item,index) in leftList"
            :key="index"
            :params="item"
            :vote="item.pro_type==1 || vote"
            tag="left"
            :index="index"
            @height="onHeight"
            @play="onClick"
        ></water-fall>
      </view>
      <view>
        <water-fall
            v-for="(item,index) in rightList"
            :key="index"
            :params="item"
            :vote="item.pro_type==1 || vote"
            @height="onHeight"
            @play="onClick"
            tag="right"
            :index="index"
        ></water-fall>
      </view>
    </view>
    <view v-if="fetch" class="load-txt">{{ajax.loadTxt}}</view>
  </view>
</template>

<script>
export default {
  name: "ViewList",
  props: {
    fetch: {
      type: Function,
      default: undefined,
    },
    limit: {
      type: Number,
      default: 20,
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    vote: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
    };
  },
  watch: {
    list(val) {
      this.getList();
    },
  },
  mounted() {
    this.barH = this.customBar;
    this.getList();
  },
  methods: {
    play(item) {
      this.$emit('play', item);
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
    onClick(params){
      this.$emit('play', params);
    },
    refresh(a) {
      this.getList();
    },
    refreshPage() {
      this.leftHeight =  0;
      this.rightHeight =  0;
      this.leftList =  [];
      this.rightList =  [];
      this.ajax.page = 1;
      this.getList();
    },
    // 获取数据
    getList() {
      if (typeof this.fetch === 'function') {
        console.log(!this.ajax.load, '!this.ajax.load');
        if (!this.ajax.load) {
          return;
        }
        this.ajax.load = false;
        this.ajax.loadTxt = '加载中';
        this.fetch({...this.params, page: this.ajax.page || 1, limit: this.limit || 20}).then(res => {
          this.addList(res.list);
        });
      } else {
        this.ajax.load = true;
        this.addList(this.list);
      }
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
          left.push(item);
        }else{
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
  },
}
</script>

<style lang="scss" scoped>
.video-list {
  margin-right: -20rpx;
  padding-bottom: 20rpx;
  overflow: hidden;
}
.video-item {
  margin-top: 26rpx;
  float: left;
  width: calc(50% - 20rpx);
  margin-right: 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
}
.video-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.video-tag {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 24rpx;
  border-radius: 8rpx;
  background-color: #22b7ef;
  color: #FFFFFF;
  height: 44rpx;
  line-height: 44rpx;
  padding: 0 10rpx;
}
.button-score {
  display: inline-flex;
  border-radius: 10rpx;
  border: 1px solid #f55308;
  font-size: 24rpx;
  background-color: #fdeee6;
  color: #f55308;
  padding: 3rpx 10rpx;
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
