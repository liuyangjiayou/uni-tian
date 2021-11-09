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
          <button class="update-btn" @click="uploadVid('./test_liuyang')">选择文件</button><text>未选择任何文件</text>
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
import { getSYS } from '@/api/index.js'
// 添加文件名后缀方法，例如 .png
function getSuffix(filename) {
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
  uni.showLoading({
    title: '文件上传中'
  });
  return new Promise((resolve, reject) => {
    getSYS().then(res => {
      var data = res?.[0] || {};
      console.log(data, 'liuyang')
      uni.uploadFile({
        url: 'http://jtyw-sghysydh.oss-cn-zhangjiakou.aliyuncs.com', //后台返回的阿里云存储的上传地址
        formData: {
          key: stroeAs, //文件名
          policy: data.Expiration, //后台获取超时时间
          OSSAccessKeyId: data.AccessKeyId,
          success_action_status: '200', //让服务端返回200,不然，默认会返回204
          signature: data.AccessKeySecret,
          secure: true,
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
          resolve(data.host + stroeAs) // 返回保存在阿里oss上的地址
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
    }
  },
  methods: {
    bindPickerChange(e){
      this.raceIndex = e.detail.value
    },
    uploadVid(file) {
      return new Promise((resolve, reject) => {
        uni.chooseVideo({
          count: 1,
          sourceType: ['camera', 'album'],
          success: function(res) {
            let videoSrc = res.tempFilePath;
            if (res.size > 1024 * 1024 * 15) {
              uni.showToast({
                title: '文件大小超过系统上传限制：15M',
                icon: 'none',
                duration: 1000
              });
              return;
            }
            let fileName = getFileName("video", file, videoSrc);
            fileUpload("video",videoSrc, fileName).then(res => {
              resolve(res)
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
    uploadFile(){
      var self = this;
      uni.chooseVideo({
        count: 1,
        sourceType: ['camera', 'album'],
        success:  (res) => {
          self.src = res.tempFilePath;
          // 分片上传文件
          const client = Client(this.dataObj);
          console.log(res);
          client.multipartUpload('test_liuyang', res.tempFile, {
            checkpoint: this.checkpoint,
            progress: async function(p, cpt) {
              // this.checkpoint = cpt
              // const e = {}
              // e.percent = p * 100
              // option.onProgress(e)
              console.log(p, cpt, 1)
            }
          }).then(({ res }) => {
            if (res.statusCode === 200) {
              // option.onSuccess(random_name)
              console.log('上传成功', 2, res)
              return res
            } else {
              // vm.disabled = false
              // option.onError('上传失败')
            }
          }).catch(error => {
            // console.error(error)
            // vm.disabled = false
            // option.onError('上传失败')
          })
          // AccessKeyId: "STS.NU6LCTr9bGRHSrLLVMwtTr1Mx"
          // AccessKeySecret: "HsiHHrCXKWrBMZeVtdjp5YALt8e361MScsu35q4pMHyv"
          // Expiration: "2021-11-09T14:48:40Z"
          // SecurityToken:
          // uni.uploadFile({
          //   url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
          //   filePath: res.tempFilePath,
          //   name: 'file',
          //   formData: {
          //     'user': 'test'
          //   },
          //   success: (uploadFileRes) => {
          //     console.log(uploadFileRes.data);
          //   }
          // });
        }
      });
    }
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
.sub-btn{
  background: #27a5e6;
}
</style>
