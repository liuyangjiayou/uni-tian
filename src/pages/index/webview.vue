<template>
  <web-view :src="url" :progress="false" />
</template>

<script>
export default {
  data() {
    return {
      url:'',
      title:''
    }
  },
  onLoad(res) {
    this.url = decodeURIComponent(res.url);
  },
  onReady(){
    uni.setNavigationBarTitle({
      title:this.title
    })
  }
}
</script>