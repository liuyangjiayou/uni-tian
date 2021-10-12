export default{
    data(){
        return {
            //设置默认的分享参数
            //如果页面不设置share，就触发这个默认的分享
            shareInfo:{
                title:'分享',
                // path:'/pages/index/index',
                // imageUrl:'',
                // desc:'',
                // content:''
            },
        };
    },
    onShareTimeline() {
        return {
            title:this.shareInfo.title,
            path:this.$Route.path,
            // imageUrl:this.shareInfo.imageUrl,
            // desc:this.shareInfo.desc,
            // content:this.shareInfo.content,
            success(res){
                uni.showToast({
                    title:'分享成功',
                    duration: 3000, mask: true
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none',
                    duration: 3000, mask: true
                })
            }
        }
    },
    onShareAppMessage(res) {
        return {
            title:this.shareInfo.title,
            path:this.$Route.path,
            // imageUrl:this.shareInfo.imageUrl,
            // desc:this.shareInfo.desc,
            // content:this.shareInfo.content,
            success(res){
                uni.showToast({
                    title:'分享成功',
                    duration: 3000, mask: true
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none',
                    duration: 3000, mask: true
                })
            }
        }
    }
}