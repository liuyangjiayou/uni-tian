<template>
  <view>
    <map style="width: 100%; height: 600px;" :latitude="latitude" :longitude="longitude" :polyline="polyline" :markers="covers">
    </map>
    <view>当前移动了{{step}}米</view>
  </view>
</template>

<script>
import {distance} from "../../api";

export default {
  name: "index",
  data() {
    return {
      title: 'map',
      latitude: 38.0509,
      longitude: 114.46312,
      polyline: {
        points: [],
        color: '#000000',
        width: 10,
        arrowLine: true,
      },
      covers: [],
      step: 0,
    }
  },
  onLoad() {
    uni.getSetting({
      success: (res) => {
        console.log(res, 1)
      }
    })
    uni.startLocationUpdateBackground({
      success: res => {
        // 开启成功
      },
      fail: err => {
        wx.showModal({content: "当前选择不支持后台，请去设置中进行选择，或继续，(如果不是后台模式：推出小程序后将不能获取最新位置)）"})
      }
    })
    uni.getLocation({
      success: res => {
        console.log(res, 2)
      }
    });
    uni.offLocationChange()
    uni.onLocationChange(res => {
      const _this = this;
      const{ latitude, longitude } = res;
      console.log(res)
      console.log(longitude, latitude);
      uni.request({
        url: `https://apis.map.qq.com/ws/distance/v1/matrix`,
        data: {
          mode: 'walking',
          from: `${this.latitude},${this.longitude}`,
          to: `${latitude},${longitude}`,
          key: 'AJGBZ-RRQKW-IYBR6-ORUA4-GU6YK-R5FU2'
        },
        method: 'GET',
        timeout: 60000,
        // 请求成功
        success({ data, statusCode, header, cookies}) {
          console.log(data)
          if (data.status === 0) {
            const newStep = data.result.rows[0].elements[0].distance
            _this.step = _this.step + newStep;
          }
        },
      })

      this.longitude = longitude;
      this.latitude = latitude;

      this.polyline.points.push({
        latitude,
        longitude,
      });
      console.log(this.polyline.points)
      this.covers = [{
        latitude,
        longitude,
      }];
    })
  }
}
</script>

<style scoped>

</style>
