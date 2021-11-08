<template>
  <!-- 一般用法 -->
  <uni-card class="card">
    <uni-forms ref="form" :modelValue="formData" :rules="rules">
      <uni-forms-item name="acc" label="赛事名称">
        <uni-combox :candidates="candidates" placeholder="请选择所在城市" v-model="formData.pwd" />
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
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item name="pwd" label="报名成绩">
        <uni-easyinput type="text" v-model="formData.pwd" placeholder="请输入姓名" />
      </uni-forms-item>
      <view>
        <button type="primary">提交</button>
      </view>
    </uni-forms>
  </uni-card>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      candidates: ['1', '2', '3'],
      formData: {
        pwd: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
