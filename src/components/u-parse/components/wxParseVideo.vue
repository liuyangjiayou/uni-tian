<template>
  <!--增加video标签支持，并循环添加-->
  <view :class="node.classStr + ' flex-video'" :style="node.styleStr">
    <video :class="node.classStr" class="video-video" :src="node.attr.src"></video>
  </view>
</template>

<script>
export default {
  name: 'wxParseVideo',
  props: {
    node: {},
  },
};
</script>
<style lang="scss">
.flex-video {
  display: flex;
  justify-content: center;
}
</style>
