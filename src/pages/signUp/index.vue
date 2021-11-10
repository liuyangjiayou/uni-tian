<template>
  <!-- 一般用法 -->
  <uni-card class="card">
    <uni-forms ref="form" :modelValue="formData">
      <uni-forms-item name="acc" label="项目名称">
        <picker class="flex align-center picker" @change="bindPickerChange" range-key="label" :value="raceIndex" :range="race">
          <view v-if="race[raceIndex]" class="uni-picker flex align-center">{{ race[raceIndex]['label'] }}</view>
          <view v-else class="uni-picker plh flex align-center">请选择项目名称</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item name="pwd" label="队伍名称">
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入队伍名称" />
      </uni-forms-item>
      <view>队员信息</view>
      <uni-forms-item name="pwd" label="队员(队长)">
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item name="pwd">
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入手机号" />
      </uni-forms-item>
      <uni-forms-item name="pwd">
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入身份证号" />
      </uni-forms-item>
      <uni-forms-item name="pwd" label="报名视频">
        <view class="flex align-center">
          <button :class="['update-btn']" @click="uploadVid">{{ fileName ? '替换文件' : '选择文件' }}</button>
          <text :class="[fileName ? 'isUp' : '']">{{ fileName || '未选择任何文件' }}</text>
        </view>
      </uni-forms-item>
      <uni-forms-item name="pwd" label="报名成绩">
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入姓名" />
      </uni-forms-item>
      <view>
        <button class="sub-btn" type="primary">提交</button>
      </view>
    </uni-forms>
  </uni-card>
</template>

<script>
import { getSYS, getSelect } from '@/api/index.js'
import crypto from 'crypto-js';
import { Base64 } from 'js-base64';

function computeSignature(accessKeySecret, canonicalString) {
  return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
}

// 添加文件名后缀方法，例如 .png
function getSuffix(filename) {
  console.log(filename, 'liuyang')
  let pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}
// 自定义文件夹（file）
function getFileName(file, filename) {
  return (
      file + Math.random()
          .toString(36)
          .substring(3, 20) + new Date().getTime() +
      getSuffix(filename)
  );
}

// 文件上传
function fileUpload(type, path, stroeAs) {
  console.log(stroeAs);
  uni.showLoading({
    title: '文件上传中'
  });
  return new Promise((resolve, reject) => {
    getSYS().then(res => {
      let data = res?.[0] || {};
      const policyText = {
        expiration: data.Expiration, // 设置policy过期时间。
        conditions: [
          // 限制上传大小。
          ["content-length-range", 0, 1024 * 1024 * 1024],
        ],
      };
      const policy = Base64.encode(JSON.stringify(policyText));
      uni.uploadFile({
        url: 'https://jtyw-sghysydh.oss-cn-zhangjiakou.aliyuncs.com', //后台返回的阿里云存储的上传地址
        formData: {
          key: stroeAs, //文件名
          policy: policy, //后台获取超时时间
          OSSAccessKeyId: data.AccessKeyId,
          success_action_status: '200', //让服务端返回200,不然，默认会返回204
          signature: computeSignature(data.AccessKeySecret, policy) ,
          secure: true,
          'x-oss-security-token': data.SecurityToken
        },
        filePath: path,
        fileType: type,
        name: 'file',
        success: res => {
          uni.hideLoading();
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          });
          resolve({
            stroeAs: data.host + stroeAs,
            path: path,
          }) // 返回保存在阿里oss上的地址
        },
        fail: err => {
          reject(err)
          uni.hideLoading();
          uni.showModal({
            content: err.errMsg,
            showCancel: false
          });
        }
      });
    })
  });
}
export default {
  name: "index",
  data() {
    return {
      raceIndex: "",
      race: [
          { label: 'a', key: '1' },
          { label: 'b', key: '2' },
          { label: 'c', key: '3' }
      ],
      formData: {
        pwd: '',
      },
      dataObj: null,
      fileName: '',
    }
  },
  onLoad(){
    getSelect().then(res => {
      this.race = res.list;
      console.log(res.list, 'lkiuyang');
    })
  },
  methods: {
    bindPickerChange(e){
      this.raceIndex = e.detail.value
    },
    uploadVid() {
      const _self = this;
      return new Promise((resolve, reject) => {
        uni.chooseVideo({
          count: 1,
          sourceType: ['camera', 'album'],
          success: function(res) {
            let videoSrc = res.tempFilePath;
            let reg = /\.\w+$/g
            let fileName = getFileName("zuopin/", videoSrc.match(reg)[0] || '.mp4', videoSrc);
            fileUpload("video",videoSrc, fileName).then(res => {
              _self.fileName = '上传成功';
            }).catch(err => {
              reject(err)
            });
          },
          fail: (err) => {
            reject(err)
            uni.showToast({
              title: '取消选择视频',
              icon: 'none',
              duration: 2000
            });
          }
        })
      })
    },
  }
}
</script>

<style scoped>
.picker, .uni-picker{
  display: block;
  height: 72rpx;
  line-height: 72rpx;
  box-sizing: border-box;
}
.picker{
  padding-left: 20rpx;
  border: 1px solid #e5e5e5;
}
.uni-picker.plh{
  color: rgb(51, 51, 51, 0.8);
}
.update-btn{
  margin: 0 16rpx 0 0;
  font-size: 28rpx;
  width: 170rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: #7d7d7d;
  color: #fff;
}
.isUp{
  color: #4cd964;
}
/*.update-btn.isUp{*/
/*  background: #4cd964;*/
/*  color: #fff;*/
/*}*/
.sub-btn{
  background: #27a5e6;
}
</style>
