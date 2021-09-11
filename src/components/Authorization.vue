<template>
  <al-dialog v-model="dialogVisibility" @close="handlerClose">
    <template v-slot:content>
      <view>首次使用小程序，是否微信授权?</view>
    </template>
  </al-dialog>
</template>

<script>
export default {
  name: 'Authorization',
  data() {
    return {
      dialogVisibility: true,
    }
  },
  methods: {
    handlerClose(flag) {
      console.log(flag)
    }
  }
}
</script>

<style scoped>

</style>